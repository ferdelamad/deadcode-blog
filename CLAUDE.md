# DeadCode Blog

Fernando's personal blog: Next.js 15 App Router + Tailwind + shadcn/ui, posts stored in Supabase Postgres, deployed on Vercel. Coding conventions live in `.cursorrules`.

Node 24 (`.nvmrc`, `engines.node`). Vercel builds fail on Node 20.

## Publishing a post from the CLI

Fernando pastes a post into the chat and expects it inserted into the live `posts` table. The site is production, so treat every insert as a publish.

1. Write the post to `drafts/<slug>.md` (git-ignored) with front matter:

   ```markdown
   ---
   title: Before You Launch, Do the Job Yourself
   category: ENTREPRENEURSHIP
   excerpt: One to three sentences; shown on the post list.
   ---

   Post body in Markdown, exactly as pasted.
   ```

   Optional front matter: `slug` (default: slugified title), `image_url`, `reading_time`, `published_at` (default: insert time).

2. Dry run, which inserts inside a transaction and rolls it back:

   ```bash
   npm run publish-post drafts/<slug>.md
   ```

3. Show Fernando the resulting row and wait for explicit confirmation.

4. Publish:

   ```bash
   npm run publish-post drafts/<slug>.md -- --commit
   ```

The post page is live immediately. The homepage lists it within the hour, since `app/page.tsx` sets `revalidate = 3600`; a redeploy shows it sooner.

### Conventions from existing rows

- `category` is uppercase and renders verbatim (`AI`, `NEWSLETTER`, `ENTREPRENEURSHIP`). Fix spelling before inserting.
- `excerpt` is always set; `image_url` and `reading_time` are left null.
- Content is Markdown with `##` section headings; no H1, since the page renders the title.
- Fix typos in what Fernando pastes, but keep his wording and voice otherwise.

## Database access

`.env` (git-ignored) holds `SUPABASE_DB_URL` and `SUPABASE_DB_PW`. The URL must be the **Session pooler** host (`aws-0-us-west-1.pooler.supabase.com:5432/postgres`); the direct host `db.<ref>.supabase.co` is IPv6-only and unreachable from Fernando's network. `psql` is not installed, so use `pg` from Node with `node --env-file=.env`.

Never print the password or the full connection string in output; redact them when reporting errors.

The password is not viewable in the Supabase dashboard. It can only be reset, under Database → Settings (not Project Settings).

`posts` columns: `id`, `slug` (unique), `title`, `content`, `published_at`, `created_at`, `updated_at`, `image_url`, `category`, `excerpt`, `reading_time`. RLS allows public reads; the anon key the app uses cannot write.

## Local builds

`.env` has no `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`, which only Vercel holds, so `npm run build` fails at prerendering with "Invalid API key" after compiling and type checking. That failure is expected locally and is not a regression.
