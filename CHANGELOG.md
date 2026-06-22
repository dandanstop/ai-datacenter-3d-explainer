# Changelog

All notable changes to this project are documented here.

## [Unreleased] - 2026-06-22

### Changed

- Reframed Chapter 1 from an investment-style value-chain view into an educational infrastructure explainer organized around function, operating principle, role, and future signals.
- Renamed the six Chapter 1 layers to `Power & Energy Backbone`, `Cooling & Heat Removal`, `Compute & AI Chips`, `Networking & Data Movement`, `Campus & Buildout`, and `Cloud & AI Operations`.
- Replaced Chapter 1 `Value-chain roles` copy with `Who builds this layer` and linked representative companies to their official websites.
- Added a Chapter 1 `Future signal` section plus a `Signals to watch` module inside the full analysis drawer.
- Updated Chapter 1 intro and static SEO text to match the new educational framing.
- Expanded `Compute & AI Chips` to include at least three representative companies for both `Foundry and advanced packaging` and `High-bandwidth memory reference`.
- Expanded the other Chapter 1 `Who builds this layer` groups so power, cooling, networking, campus, and operations each include broader representative company coverage with official links.
- Added a low-profile Chapter 1 `Learn more` section in the analysis drawer with official external reading links for each infrastructure layer.
- Rewrote Chapter 1 metric-card labels across languages to be more educational and explanatory for general AI readers.
- Updated Chapter 1 multilingual audio transcripts, TTS extraction headings, and cache-busted audio asset URLs so narration now matches the new educational layer framing.
- Rebranded the project header and metadata around `Compute to Grid`, replacing the previous Chapter 1 hero title with `The AI Race Now Runs Through Power, Cooling, and the Grid`.
- Refined Chapter 1 educational copy across languages so each layer now reads more clearly as a teaching unit focused on function, principle, and future signal rather than only constraints or bottlenecks.
- Updated About identity from `Daniel Chen` to `DanDanStop`.
- Rewrote About copy as a personal tech lab introduction across English, Traditional Chinese, Korean, and Japanese.
- Updated Contact mail link to `mailto:hello@dandanstop.me`.
- Updated SEO author/creator metadata and sitemap modified date.
- Updated production SEO references to `https://dandanstop.me/`.
- Moved the explainer canonical URL to `https://dandanstop.me/datacenter-3d` while reserving the root domain for the future main site.
- Added a Vercel rewrite from `/datacenter-3d` to the current static app root.
- Added GA4 tracking for the `datacenter-3d` project with project-level event parameters.
- Updated About copy and added the amber DanDanStop profile icon.
- Refined Chapter 1 default desktop composition so the first frame shows a full AI campus overview instead of immediately pushing into a single focused layer.
- Softened Chapter 1 focus behavior so zoom, lift, dimming, and scale emphasis now feel more editorial and less demo-like.
- Added desktop mouse-wheel layer switching for Chapter 1.
- Shifted Chapter 1 interaction sequencing so layer focus only begins after real user intent.
- Evolved Chapter 1 desktop navigation into a compact rail with low-friction scanning and a persistent stage summary.
- Simplified the mobile first viewport so the 3D model gets more space before long copy appears.
- Added the compact mobile stage chip (`C1/C2/C3`) beside the language control to hide chapter switching and Chapter 1 utilities until requested.
- Moved Chapter 1 mobile exploration to a fixed bottom layer dock with an active summary card and closeable mobile insight sheet.
- Reduced mobile visual weight for `Exploded view`, `Reset`, and chapter switching by moving them behind expandable controls instead of showing everything at load.
- Added a low-profile `Updates` link beside `About`, opening a lightweight project-updates drawer with recent maintenance highlights in English, Traditional Chinese, Korean, and Japanese.
- Reframed Chapter 2 around `One AI System, Two Workload Modes`, replacing the older `From Training Factories to Inference Networks` wording in static summaries and project documents.
- Switched Chapter 2 default editorial naming from `Compare Both` to `Overview` while preserving existing audio file ids and runtime mappings for compatibility.
- Refined Chapter 2 multilingual copy across English, Traditional Chinese, Korean, and Japanese so the overview now emphasizes workload imbalance, CPU coordination, and machine-level role shifts.
- Localized remaining Chapter 2 UI and scene terminology in Traditional Chinese, Korean, and Japanese, including metrics, region labels, and component labels.
- Expanded Chapter 2 editorial references to include Google Cloud TPU, AWS Trainium, AWS Inferentia, Intel Xeon / AMX, and Apple Silicon.
- Updated Chapter 2 transcript-source conventions so all four languages now use `Overview` as the first audio segment heading.
- Updated Chapter 2 TTS extraction scripts to read the new `Overview` heading without changing current output filenames or runtime audio URLs.
- Synchronized `REQUIREMENTS.md` with the live Chapter 2 product state, including overview-first interaction, desktop wheel mode switching, mobile bottom-dock navigation, and shell-transparency focus behavior.

### Fixed

- Fixed a Chapter 1 runtime initialization-order bug that could prevent the 3D scene from rendering in the browser.
- Fixed Chapter 1 drag-to-rotate feeling by pausing camera assist while orbiting, separating click from drag intent, delaying auto-rotate resume, tuning OrbitControls damping, and disabling pan.
- Replaced static `vercel.json` with programmatic `vercel.mjs` so Vercel preview deployments now return `X-Robots-Tag: noindex, nofollow` while production keeps normal indexability.
- Fixed Chapter 2 multilingual drift where zh / ko / ja still contained older English labels, stale overview transcript wording, and outdated static summary content.
- Fixed a future-maintenance issue where Chapter 2 TTS generation scripts would fail after the transcript heading rename from `Compare Both` to `Overview`.

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
- About title now renders as two lines with `DanDanStop` on the second line.
- Contact link changed to `mailto:hello@dandanstop.me`.

### Fixed

- Fixed stale file-open redirect pointing to the old `8123` port.
- Fixed hidden insight overflow by moving long analysis into a drawer.
- Fixed audio transcript switching for selected cards and segments.
- Fixed Chapter 3 Japanese and Korean localization gaps.

### Deployment Notes

- Static site intended for Vercel deployment.
- Production URL: `https://dandanstop.me/datacenter-3d`.
