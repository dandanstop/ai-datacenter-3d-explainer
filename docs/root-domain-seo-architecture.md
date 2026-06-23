# Root-Domain SEO Architecture

Date: 2026-06-23

## Goal

Support multiple projects under the same domain without forcing one subproject repo to permanently own all root-domain SEO files.

Current public project paths:

- `https://www.dandanstop.me/datacenter-3d`
- `https://www.dandanstop.me/space-economy`

Future projects should be able to join this structure with minimal changes.

## Recommended Ownership Model

### Root domain owner

One root-level deployment should publish:

- `/robots.txt`
- `/sitemap.xml`

This root sitemap should be a sitemap index, not a single-project sitemap.

### Each project repo

Each project should publish and maintain its own:

- subpath page
- subpath sitemap
- optional `llms.txt`
- optional `llms-full.txt`
- optional `humans.txt`
- canonical and metadata for its own public URL

## Current Recommended Structure

### Root files

`https://www.dandanstop.me/robots.txt`

Should:

- allow standard crawlers
- explicitly allow major AI bots if the policy is open
- point to `https://www.dandanstop.me/sitemap.xml`

`https://www.dandanstop.me/sitemap.xml`

Should be a sitemap index containing:

- `https://www.dandanstop.me/datacenter-3d/sitemap.xml`
- `https://www.dandanstop.me/space-economy/sitemap.xml`

### Project files

`datacenter-3d` repo should own:

- `https://www.dandanstop.me/datacenter-3d`
- `https://www.dandanstop.me/datacenter-3d/sitemap.xml`

`space-economy-atlas` repo should own:

- `https://www.dandanstop.me/space-economy`
- `https://www.dandanstop.me/space-economy/sitemap.xml`
- project-specific AI-readable files if used

## Why This Scales Better

- New projects only need to add their own subpath metadata
- Root discovery stays centralized
- Search engines get one stable sitemap entry point
- AI crawlers get one stable robots entry point
- No single content project needs to know the full details of every other project

## Future Add-Project Checklist

When adding a new project, for example `https://www.dandanstop.me/future-project`:

1. In the new project repo:
   - publish the new subpath
   - add `/future-project/sitemap.xml`
   - set canonical metadata to the public `www` URL
   - add `llms.txt` if desired

2. In the root-domain owner:
   - add the new sitemap entry to `/sitemap.xml`
   - keep `/robots.txt` pointing to the root sitemap index

3. Verify live:
   - `/robots.txt` returns 200
   - `/sitemap.xml` returns 200
   - `/future-project/sitemap.xml` returns 200
   - canonical is correct
   - `og:url` is correct

## Suggested Root Sitemap Index

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.dandanstop.me/datacenter-3d/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.dandanstop.me/space-economy/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
```

## Suggested Open Robots Policy

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://www.dandanstop.me/sitemap.xml
```

## Long-Term Recommendation

In the short term, one existing project repo can temporarily publish the root files.

In the long term, move root-domain SEO assets into either:

- the future main-site repo, or
- a tiny dedicated root-domain repo

That keeps subprojects independent and makes future expansion cleaner.
