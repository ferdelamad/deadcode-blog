// Publish a Markdown post to the Supabase `posts` table.
//
//   node --env-file=.env scripts/publish-post.mjs <post.md>            # dry run
//   node --env-file=.env scripts/publish-post.mjs <post.md> --commit   # insert
//
// The file starts with a `---` front matter block (title and category are
// required; slug, excerpt, image_url, published_at and reading_time optional),
// followed by the post body in Markdown.
//
// Without --commit the insert runs inside a transaction that is rolled back, so
// it reports exactly what would be written without touching the live table.
import fs from 'node:fs'
import pg from 'pg'

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const parsePost = (raw) => {
  const match = raw.match(FRONT_MATTER)
  if (!match) throw new Error('Missing --- front matter block at the top of the file')

  const meta = {}
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const at = line.indexOf(':')
    if (at === -1) throw new Error(`Malformed front matter line: ${line}`)
    meta[line.slice(0, at).trim()] = line
      .slice(at + 1)
      .trim()
      .replace(/^["'](.*)["']$/, '$1')
  }

  return { meta, content: raw.slice(match[0].length).trim() }
}

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const [filePath, ...flags] = process.argv.slice(2)
if (!filePath) throw new Error('Usage: node --env-file=.env scripts/publish-post.mjs <post.md> [--commit]')
const commit = flags.includes('--commit')

const { meta, content } = parsePost(fs.readFileSync(filePath, 'utf8'))
for (const field of ['title', 'category']) {
  if (!meta[field]) throw new Error(`Front matter is missing required field: ${field}`)
}

const row = {
  slug: meta.slug || slugify(meta.title),
  title: meta.title,
  content,
  // Categories render verbatim on the site and existing rows are uppercase.
  category: meta.category.toUpperCase(),
  excerpt: meta.excerpt || null,
  image_url: meta.image_url || null,
  reading_time: meta.reading_time || null,
}

const client = new pg.Client({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
})
await client.connect()

try {
  await client.query('begin')

  const columns = [...Object.keys(row), ...(meta.published_at ? ['published_at'] : [])]
  const values = [...Object.values(row), ...(meta.published_at ? [meta.published_at] : [])]
  const { rows } = await client.query(
    `insert into posts (${columns.join(', ')})
     values (${columns.map((_, i) => `$${i + 1}`).join(', ')})
     returning id, slug, title, category, published_at, length(content) as content_chars`,
    values,
  )

  console.log(rows[0])
  await client.query(commit ? 'commit' : 'rollback')
  console.log(commit ? `COMMITTED — live at /blog/${rows[0].slug}` : 'DRY RUN: rolled back, nothing saved')
} catch (error) {
  await client.query('rollback').catch(() => {})
  console.error('ERROR:', error.message)
  process.exitCode = 1
} finally {
  await client.end()
}
