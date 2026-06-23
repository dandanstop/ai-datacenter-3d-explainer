# DandanStop Root-Domain Starter

This folder is a minimal starter for the future root-domain repository that will eventually own:

- `https://www.dandanstop.me/robots.txt`
- `https://www.dandanstop.me/sitemap.xml`

It is intentionally small so the root domain can manage shared SEO discovery without being coupled to any single subproject.

## Current live subprojects

- `https://www.dandanstop.me/datacenter-3d`
- `https://www.dandanstop.me/space-economy`

## Files

- `robots.txt`: open crawl policy with explicit AI bot allow rules
- `sitemap.xml`: sitemap index referencing each project sitemap

## Future usage

When a new project launches under `https://www.dandanstop.me/<slug>`:

1. Add the new project's own `/sitemap.xml` inside that project repo
2. Add a new `<sitemap>` entry to this root `sitemap.xml`
3. Keep `robots.txt` pointing to the root sitemap index

## Deployment note

Do not delete or replace these shared files from a subproject repo once the root-domain repo becomes the long-term owner.
