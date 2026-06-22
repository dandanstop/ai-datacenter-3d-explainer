# SEO, GEO, And About Maintenance Notes

Status: current implementation baseline  
Last updated: 2026-06-22  
Local preview URL: http://127.0.0.1:8124/

## Purpose

This document records the SEO/GEO updates and the About drawer requirements for the AI data center 3D explainer. It is intended for future frontend, SEO, content, localization, and product teams.

## SEO Audit Summary

Current strengths:

- One visible H1 on the default page.
- Meta title and description exist.
- Canonical URL is normalized at runtime.
- Open Graph and Twitter Card metadata exist.
- `robots` meta is set to `index, follow`.
- JSON-LD is present and parseable.
- GA4 tracking is installed with project-level event parameters.
- The page renders successfully over the local HTTP server.

Current risks and remaining work:

- `robots.txt` points to `https://dandanstop.me/sitemap.xml`.
- `sitemap.xml` lists `https://dandanstop.me/datacenter-3d` as the production URL for this explainer.
- The root domain `https://dandanstop.me/` is reserved for the future main site and should not redirect to this explainer.
- `og-image.png` is generated from the current page. It can be replaced with a custom designed 1200x630 social image later.
- Multilingual UX currently uses one JavaScript-switched URL. This is good for the current interactive demo but not ideal for multilingual SEO. A production multilingual version should use language-specific URLs such as `/en/`, `/zh/`, `/ko/`, and `/ja/` with self-canonical and reciprocal hreflang.
- The 3D experience relies on JavaScript and canvas, so important explanatory text should also exist as real HTML.

## Analytics Notes

GA4 Measurement ID:

```text
G-2CJ15FLWPY
```

Project-level event parameters:

```text
project_slug = datacenter-3d
project_name = AI Data Center 3D Explainer
page_path = /datacenter-3d
```

Tracked custom events include `project_view`, `chapter_select`, `layer_select`, `mode_select`, `model_select`, `language_select`, `audio_play`, `transcript_open`, `analysis_open`, `about_open`, and `contact_click`.

Recommended GA4 custom dimensions: `project_slug`, `project_name`, `chapter_id`, `language`, `segment_id`, and `interaction_source`.

## Implemented SEO/GEO Updates

Implemented in `index.html`:

- Expanded JSON-LD from six value-chain layer items to nine `hasPart` items:
  - Chapter 1: From GPUs to the Grid
  - Chapter 2: One AI System, Two Workload Modes
  - Chapter 3: From Response to Action
  - Power & Grid
  - Cooling Systems
  - Compute Equipment
  - Network Interconnect
  - Site & Construction
  - Operations & Platform
- Added `author` and `creator` as `Person`:
  - Name: DanDanStop
  - URL: `#about`
- Added `dateModified`: `2026-06-22`
- Added chapter-level `AudioObject` entries with English transcript summaries:
  - `/audio/chapter1/en-compute.mp3`
  - `/audio/chapter2/en-compare.mp3`
  - `/audio/chapter3/en-overview.mp3`
- Added static SEO/GEO text layer:
  - Selector: `.seo-index-content`
  - Purpose: expose Chapter 1, Chapter 2, and Chapter 3 analysis as real HTML.
  - Styling: visually hidden using clipping so it does not disrupt the immersive 3D layout.
- Added deploy SEO files:
  - `robots.txt`
  - `sitemap.xml`
  - `og-image.png`
- Added social preview tags:
  - `og:image`
  - `twitter:image`

Current static SEO/GEO text includes:

- Chapter 1 AI data center value-chain summary.
- Chapter 1 company examples across power, cooling, compute, networking, site construction, and operations.
- Chapter 2 overview-first workload summary built around training AI, inference AI, and CPU coordination.
- Chapter 2 audio briefing summary aligned to the `Overview` segment naming.
- Chapter 3 Agentic AI workflow summary.
- Chapter 3 value-chain roles and company examples.
- Chapter 3 audio briefing summary.

## Chapter 2 Maintenance Notes

As of the current baseline, Chapter 2 has been editorially reframed and should be maintained using the following rules:

- Canonical Chapter 2 title:
  - `One AI System, Two Workload Modes`
- Canonical first mode label:
  - `Overview`
- Editorial thesis:
  - one AI machine may support both training and inference, but the hardware balance changes by workload
  - CPU coordination is part of the chapter thesis, not a secondary footnote
- Static SEO summary, JSON-LD chapter summary, visible transcript copy, and TTS extraction headings should remain synchronized.
- Transcript heading convention:
  - the first segment heading is `Overview` in all four languages
  - the runtime audio file id remains `compare` for backward compatibility
- Official Chapter 2 reference coverage should continue to include:
  - Google Cloud TPU
  - AWS Trainium
  - AWS Inferentia
  - Intel Xeon / AMX
  - Apple Silicon

If Chapter 2 copy changes again, update these files together:

- `app.js`
- `index.html`
- `docs/chapter2-audio-transcripts.md`
- `scripts/generate-chapter2-chinese-tts.mjs`
- `scripts/generate-chapter2-3-english-tts.mjs`
- `scripts/generate-chapter2-3-korean-tts.mjs`
- `scripts/generate-chapter2-3-japanese-tts.mjs`

## About Drawer

Location:

- Entry point: left panel, low-visual-weight text link.
- Drawer: in-page overlay drawer.
- The drawer should not navigate away from the 3D experience.

Contact:

- Link text: `Contact`
- Link target: `mailto:hello@dandanstop.me`

Schema:

- About author identity is also reflected in JSON-LD through `author` and `creator`.

Updates drawer:

- Entry point: low-profile text link beside `About`.
- Drawer: in-page overlay drawer using the same visual family as the About drawer.
- Purpose: show compact visitor-facing release highlights without competing with the main 3D experience.
- Current editorial focus:
  - recent Chapter 2 reframing
  - multilingual sync
  - Chapter 2 interaction clarification
  - SEO / transcript / TTS maintenance sync
- Language coverage:
  - English
  - Traditional Chinese
  - Korean
  - Japanese

Profile icon:

- File: `/assets/dandan-stop-profile-amber.png`
- Placement: About drawer header beside the title.

## About Copy

### English

Entry label:

```text
About
```

Title:

```text
Curated by
DanDanStop
```

Body:

```text
Hi - DanDanStop is basically a note-to-self: "DanDan, stop before this turns into another all-nighter geeking out over new tech."

This is my personal tech lab and inspiration hub, built around a simple mindset: move fast, stay curious, and keep iterating.

I’m usually hands-on, testing the latest AI tools, MarTech ideas, and little experiments just for fun.

If something here sparks an idea, let’s talk. I’m always happy to swap thoughts on innovation, creative technology, and what might be worth building next.

Last updated: June 2026

Contact
```

### Traditional Chinese

Entry label:

```text
關於作者
```

Title:

```text
策展與製作：
DanDanStop
```

Body:

```text
Hi - DanDanStop 基本上是我給自己的提醒：「DanDan，在又因為研究新科技熬成通宵之前，先停一下。」

這裡是我的個人科技實驗室與靈感基地，核心心態很簡單：快速行動、保持好奇、持續迭代。

我通常會親自動手測試最新 AI 工具、MarTech 想法，還有一些只是因為好玩而做的小實驗。

如果這裡的內容激發了你的想法，歡迎聊聊。我一直很樂意交流創新、創意科技，以及下一個值得打造的東西。

最後更新：2026 年 6 月

Contact
```

### Korean

Entry label:

```text
소개
```

Title:

```text
기획 및 제작:
DanDanStop
```

Body:

```text
Hi - DanDanStop은 사실 저 자신에게 보내는 메모입니다. "DanDan, 새 기술에 빠져 또 밤새우기 전에 멈추자."

이곳은 제 개인 테크 랩이자 영감의 허브입니다. 빠르게 움직이고, 호기심을 유지하며, 계속 반복한다는 단순한 마음가짐으로 운영합니다.

저는 보통 직접 손을 움직여 최신 AI 도구, MarTech 아이디어, 그리고 재미로 해보는 작은 실험들을 테스트합니다.

이곳의 어떤 내용이 아이디어를 떠올리게 했다면 함께 이야기해요. 혁신, 크리에이티브 테크놀로지, 그리고 다음에 만들어볼 만한 것에 대해 생각을 나누는 일을 늘 환영합니다.

마지막 업데이트: 2026년 6월

Contact
```

### Japanese

Entry label:

```text
このサイトについて
```

Title:

```text
企画・制作：
DanDanStop
```

Body:

```text
Hi - DanDanStop は、基本的には自分へのメモです。「DanDan、新しいテクノロジーに夢中になって、また徹夜になる前に止まろう。」

ここは私の個人的なテックラボであり、インスピレーションのハブです。素早く動き、好奇心を持ち続け、改善を重ねるというシンプルな姿勢でつくっています。

私は普段、最新の AI ツール、MarTech のアイデア、そして純粋に楽しい小さな実験を、実際に手を動かして試しています。

ここにある何かがアイデアのきっかけになったなら、ぜひ話しましょう。イノベーション、クリエイティブテクノロジー、そして次に何をつくる価値があるのかについて、考えを交換するのはいつでも歓迎です。

最終更新：2026年6月

Contact
```

## Verification Checklist

Use these checks after About or SEO changes:

- `node --check app.js`
- JSON-LD parses successfully.
- JSON-LD includes `author.name = DanDanStop`.
- JSON-LD includes nine `hasPart` items.
- JSON-LD Chapter 2 entry uses `One AI System, Two Workload Modes`.
- `.seo-index-content` exists in rendered DOM.
- About drawer opens and closes.
- Updates drawer opens and closes.
- Updates drawer content reflects the latest release-worthy change set.
- About title contains a line break before `DanDanStop`.
- Contact link resolves to `mailto:hello@dandanstop.me`.
- Language switching updates About copy in English, Traditional Chinese, Korean, and Japanese.
- Language switching updates Updates drawer copy in English, Traditional Chinese, Korean, and Japanese.
- Console has no application-breaking errors.

## Remaining SEO Tasks

Recommended next implementation items:

1. Confirm `robots.txt` points to `https://dandanstop.me/sitemap.xml` and `sitemap.xml` lists `https://dandanstop.me/datacenter-3d`.
2. Replace `og-image.png` with a custom designed 1200x630 image if needed.
3. Decide whether static SEO/GEO text should become a visible below-the-fold reading section.
4. If production multilingual SEO is required, implement language-specific URLs plus canonical and hreflang.
