# Deployment Runbook

Status: release candidate preparation  
Version target: `v1.0.x`  
Local project path: `/Users/daniel/Projects/Stocks/ai-datacenter-3d`

## 1. Local Git Status

The project is initialized as a Git repository on branch `main`.

Ignored local-only files:

- `.env`
- `.vercel/`
- `.DS_Store`
- `*.swp`
- `source/`

Tracked deployment files include:

- `index.html`
- `styles.css`
- `app.js`
- `audio/`
- `vendor/`
- `robots.txt`
- `sitemap.xml`
- `og-image.png`
- `vercel.mjs`

Current release-candidate checks already verified locally:

- `node --check app.js` passes
- local preview responds on `http://127.0.0.1:8128/`
- canonical is pinned to `https://dandanstop.me/datacenter-3d`
- JSON-LD `dateModified` is updated to `2026-06-21`
- `sitemap.xml` `lastmod` is updated to `2026-06-21`
- only one `<h1>` remains in `index.html`
- Vercel preview deployments are configured to return `X-Robots-Tag: noindex, nofollow`

## 2. GitHub Setup

Recommended GitHub repository name:

```text
ai-datacenter-3d-explainer
```

If using GitHub CLI:

```bash
cd /Users/daniel/Projects/Stocks/ai-datacenter-3d
gh auth login
gh repo create ai-datacenter-3d-explainer --public --source=. --remote=origin --push
git push origin v1.0.0
```

If using the GitHub website:

1. Create a new empty repository named `ai-datacenter-3d-explainer`.
2. Do not initialize it with README, `.gitignore`, or license because the local repo already has files.
3. Copy the repository SSH or HTTPS URL.
4. Run:

```bash
cd /Users/daniel/Projects/Stocks/ai-datacenter-3d
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
git push origin v1.0.0
```

## 3. Vercel Setup

Recommended flow:

1. Open Vercel dashboard.
2. Select `Add New Project`.
3. Import the GitHub repository.
4. Use these settings:
   - Framework preset: `Other`
   - Build command: leave blank
   - Output directory: `.`
   - Install command: leave blank
   - Production branch: `main`
5. Deploy.

The current Vercel config is `vercel.mjs`.

It handles:

- clean URLs
- no trailing slash
- rewrite from `/datacenter-3d` to the static app root
- preview-only `X-Robots-Tag: noindex, nofollow`

## 4. Post-Deploy Checks

After deployment, verify:

- Home page loads.
- 3D scene renders.
- Chapter 1, Chapter 2, and Chapter 3 switch correctly.
- Chapter 1 default view opens as a whole-campus overview.
- Chapter 1 drag rotation feels smooth and does not trigger accidental focus clicks.
- Language menu works.
- `Updates` drawer and `About` drawer open and close correctly.
- Audio files load.
- About drawer opens and Contact points to `mailto:hello@dandanstop.me`.
- `/robots.txt` returns 200.
- `/sitemap.xml` returns 200.
- `/og-image.png` returns 200.
- JSON-LD parses successfully.
- `og:image` and `twitter:image` resolve to the production domain.
- GA4 base tag uses Measurement ID `G-2CJ15FLWPY`.
- GA4 custom events include `project_slug = datacenter-3d`.
- Preview deployments send `X-Robots-Tag: noindex, nofollow`.

## 5. Production URL Follow-Up

Current SEO files use this production URL for the AI data center explainer:

```text
https://dandanstop.me/datacenter-3d
```

The root domain `https://dandanstop.me/` is reserved for the future DanDanStop main site and should not redirect to this explainer.

If the production domain changes, update:

- `robots.txt`
- `sitemap.xml`
- Any future production documentation references

`vercel.mjs` rewrites `/datacenter-3d` to the static app root and adds preview-only noindex headers. `index.html` now keeps canonical, `og:url`, `og:image`, `twitter:image`, and JSON-LD URL fields pinned to the production explainer path.

## 5.1 Current Release Scope

This release candidate includes:

- Chapter 1 information architecture refinement
- Chapter 1 desktop overview framing and subtle focus transitions
- smoother Chapter 1 drag rotation behavior
- mobile stage chip + layer dock experience
- About + Updates low-profile metadata links
- SEO quick wins:
  - production canonical
  - refreshed `dateModified`
  - refreshed sitemap `lastmod`
  - single-H1 cleanup
  - preview deployment noindex protection

## 6. Future Versioning

Suggested versioning:

- `v1.0.0`: first public deployment.
- `v1.1.0`: meaningful feature addition, such as Chapter 4 or visible reading section.
- `v1.0.1`: small bug fix, copy fix, SEO metadata fix, or deployment config patch.

Suggested branch naming:

- `feature/chapter-4`
- `feature/visible-reading-section`
- `fix/audio-source`
- `fix/seo-metadata`

Suggested commit message examples:

```text
feat: add chapter 4 visible reading layer
fix: update sitemap production URL
docs: update deployment runbook
style: refine about drawer spacing
```
