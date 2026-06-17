# Changelog

All notable changes to this project are documented here.

## [1.0.0] - 2026-06-17

### Added

- Interactive Three.js AI data center value-chain explainer.
- Chapter 1: AI data center infrastructure chain from GPUs to the grid.
- Chapter 2: Training AI vs Inference AI workload comparison.
- Chapter 3: Agentic AI workflow and infrastructure explainer.
- Four-language UI: English, Traditional Chinese, Korean, and Japanese.
- Progressive insight reveal focused on the 3D model first.
- Summary Rail plus full analysis drawer.
- Audio briefing player and transcripts across chapters and languages.
- ElevenLabs-generated audio assets for supported transcript segments.
- Low-profile About drawer with author context and Contact mail link.
- Static SEO/GEO text layer for Chapter 1, Chapter 2, and Chapter 3.
- Expanded JSON-LD with chapter-level `LearningResource`, `AudioObject`, `author`, `creator`, and `dateModified`.
- Social sharing image: `og-image.png`.
- `robots.txt` and `sitemap.xml`.

### Changed

- Default local preview port standardized to `8124`.
- Direct `file://` opens redirect to `http://127.0.0.1:8124/`.
- Desktop left-panel card spacing improved for Chapter 1, Chapter 2, and Chapter 3.
- About title now renders as two lines with `Daniel Chen` on the second line.
- Contact link changed to `mailto:diren.chen@gmail.com`.

### Fixed

- Fixed stale file-open redirect pointing to the old `8123` port.
- Fixed hidden insight overflow by moving long analysis into a drawer.
- Fixed audio transcript switching for selected cards and segments.
- Fixed Chapter 3 Japanese and Korean localization gaps.

### Deployment Notes

- Static site intended for Vercel deployment.
- Recommended production URL placeholder: `https://ai-datacenter-3d.vercel.app/`.
- If Vercel assigns a different production URL, update `robots.txt`, `sitemap.xml`, and any production SEO references.
