-- Policies for the Lumina admin area.
-- Run this in Supabase SQL Editor if authenticated admins cannot create,
-- edit, delete products, or upload images to the public "imagens" bucket.

alter table public.products enable row level security;

drop policy if exists "Public can read available products" on public.products;
create policy "Public can read available products"
on public.products
for select
to anon, authenticated
using (available = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated admins can insert products" on public.products;
create policy "Authenticated admins can insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update products" on public.products;
create policy "Authenticated admins can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete products" on public.products;
create policy "Authenticated admins can delete products"
on public.products
for delete
to authenticated
using (true);

drop policy if exists "Public can read imagens" on storage.objects;
create policy "Public can read imagens"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'imagens');

drop policy if exists "Authenticated admins can upload imagens" on storage.objects;
create policy "Authenticated admins can upload imagens"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'imagens');

drop policy if exists "Authenticated admins can update imagens" on storage.objects;
create policy "Authenticated admins can update imagens"
on storage.objects
for update
to authenticated
using (bucket_id = 'imagens')
with check (bucket_id = 'imagens');

drop policy if exists "Authenticated admins can delete imagens" on storage.objects;
create policy "Authenticated admins can delete imagens"
on storage.objects
for delete
to authenticated
using (bucket_id = 'imagens');
