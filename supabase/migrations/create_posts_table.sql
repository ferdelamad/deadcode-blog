-- Create the posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  image_url text,
  category text not null,
  excerpt text,
  reading_time text
);

-- Enable Row Level Security (RLS)
alter table posts enable row level security;

-- Create a policy that allows anyone to read posts
create policy "Allow public read access" on posts
  for select using (true);

-- Create an index on slug for faster lookups
create index posts_slug_idx on posts (slug);

-- Function to automatically update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to call the function before update
create trigger update_posts_updated_at
  before update on posts
  for each row
  execute function update_updated_at_column(); 