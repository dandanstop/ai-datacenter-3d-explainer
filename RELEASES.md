# Releases

This file summarizes notable release-ready project milestones in a reader-friendly format.

## Upcoming Release - 2026-06-22

### Release theme

Chapter 2 editorial and localization sync

### Summary

This release brings Chapter 2 into alignment with the current product direction: `One AI System, Two Workload Modes`. The chapter now explains training AI, inference AI, and CPU coordination with clearer educational framing across English, Traditional Chinese, Korean, and Japanese.

### Highlights

- Renamed the Chapter 2 editorial framing from `From Training Factories to Inference Networks` to `One AI System, Two Workload Modes`.
- Replaced the older `Compare Both` wording with `Overview` in transcript and documentation flows while keeping current audio file ids stable.
- Updated static Chapter 2 SEO / JSON-LD summaries so search-facing metadata matches the live chapter experience.
- Localized residual Chapter 2 labels in Traditional Chinese, Korean, and Japanese, including region labels, metrics, and component terms.
- Clarified the CPU role in the Chapter 2 overview so the chapter reads more clearly as a system-level explainer rather than a GPU-only comparison.
- Expanded official reference coverage to include Google Cloud TPU, AWS Trainium, AWS Inferentia, Intel Xeon / AMX, and Apple Silicon.
- Updated transcript maintenance and TTS extraction rules so future ElevenLabs regeneration remains compatible with the current chapter structure.

### Reader-facing outcome

- Chapter 2 now reads more consistently as a science / infrastructure explainer.
- Multilingual readers see fewer mixed-language artifacts.
- Search engines and AI retrieval systems receive more accurate Chapter 2 summaries.
- Future voice-over generation is less brittle because transcript headings and script expectations now match.

### Files updated

- `app.js`
- `index.html`
- `docs/chapter2-audio-transcripts.md`
- `scripts/generate-chapter2-chinese-tts.mjs`
- `scripts/generate-chapter2-3-english-tts.mjs`
- `scripts/generate-chapter2-3-korean-tts.mjs`
- `scripts/generate-chapter2-3-japanese-tts.mjs`
- `REQUIREMENTS.md`
- `CHANGELOG.md`

## 1.0.0 - 2026-06-17

### Release theme

Interactive 3D AI infrastructure explainer launch

### Summary

Initial public foundation of `Compute to Grid`, including:

- Three interactive chapters
- Four-language UI
- Audio briefing support
- About / Updates drawers
- SEO / GEO foundation for static discovery
- Vercel-ready deployment structure

### Production URL

`https://dandanstop.me/datacenter-3d`
