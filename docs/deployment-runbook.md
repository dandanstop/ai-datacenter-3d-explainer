# Deployment Runbook

Status: ready for first public deployment  
Version target: `v1.0.0`  
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
- `vercel.json`

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

The existing `vercel.json` uses:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

## 4. Post-Deploy Checks

After deployment, verify:

- Home page loads.
- 3D scene renders.
- Chapter 1, Chapter 2, and Chapter 3 switch correctly.
- Language menu works.
- Audio files load.
- About drawer opens and Contact points to `mailto:hello@dandanstop.me`.
- `/robots.txt` returns 200.
- `/sitemap.xml` returns 200.
- `/og-image.png` returns 200.
- JSON-LD parses successfully.
- `og:image` and `twitter:image` resolve to the production domain.

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

`vercel.json` rewrites `/datacenter-3d` to the static app root. `index.html` normalizes canonical, `og:url`, `og:image`, `twitter:image`, and JSON-LD URL fields at runtime based on the production explainer path.

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
