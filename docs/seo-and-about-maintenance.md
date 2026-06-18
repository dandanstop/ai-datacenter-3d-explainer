# SEO, GEO, And About Maintenance Notes

Status: current implementation baseline  
Last updated: 2026-06-19  
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
- The page renders successfully over the local HTTP server.

Current risks and remaining work:

- `robots.txt` points to `https://dandanstop.me/sitemap.xml`.
- `sitemap.xml` lists `https://dandanstop.me/datacenter-3d` as the production URL for this explainer.
- The root domain `https://dandanstop.me/` is reserved for the future main site and should not redirect to this explainer.
- `og-image.png` is generated from the current page. It can be replaced with a custom designed 1200x630 social image later.
- Multilingual UX currently uses one JavaScript-switched URL. This is good for the current interactive demo but not ideal for multilingual SEO. A production multilingual version should use language-specific URLs such as `/en/`, `/zh/`, `/ko/`, and `/ja/` with self-canonical and reciprocal hreflang.
- The 3D experience relies on JavaScript and canvas, so important explanatory text should also exist as real HTML.

## Implemented SEO/GEO Updates

Implemented in `index.html`:

- Expanded JSON-LD from six value-chain layer items to nine `hasPart` items:
  - Chapter 1: From GPUs to the Grid
  - Chapter 2: From Training Factories to Inference Networks
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
- Added `dateModified`: `2026-06-19`
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
- Chapter 2 training vs inference workload summary.
- Chapter 2 audio briefing summary.
- Chapter 3 Agentic AI workflow summary.
- Chapter 3 value-chain roles and company examples.
- Chapter 3 audio briefing summary.

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
Hi, the name DanDanStop is actually an internal warning to myself: "DanDan, stop me from pulling another all-nighter geeking out over new tech!"

This is my personal tech lab and hub for inspiration, driven by a "move fast and iterate" agile mindset.

I’m always hands-on, testing the latest AI tools and MarTech experiments just for you.

Always happy to exchange ideas, discuss innovation, or explore new opportunities—feel free to get in touch. 😎

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
嗨，DanDanStop 這個名字，其實是我給自己的內部警示：「DanDan，別再因為研究新科技而熬整晚了！」

這裡是我的個人科技實驗室，也是靈感基地。我用「快速行動、持續迭代」的敏捷心態，親自測試最新 AI 工具與 MarTech 實驗。

我會把這些第一手觀察整理給你，讓新科技變得更容易理解，也更能啟發下一步行動。

很樂意交流想法、討論創新，或探索新的合作機會，歡迎聯繫。😎

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
안녕하세요. DanDanStop이라는 이름은 사실 저 자신에게 보내는 내부 경고입니다. "DanDan, 새 기술에 빠져 또 밤새우는 건 이제 그만!"

이곳은 제 개인 테크 랩이자 영감의 허브입니다. "빠르게 움직이고 계속 반복한다"는 애자일 마인드로 최신 AI 도구와 MarTech 실험을 직접 테스트합니다.

그 과정에서 얻은 첫 손의 관찰을 여러분에게 전해, 새로운 기술을 더 쉽게 이해하고 다음 행동으로 이어갈 수 있게 합니다.

아이디어를 나누고, 혁신을 논의하거나, 새로운 기회를 함께 탐색하는 대화를 언제나 환영합니다. 편하게 연락 주세요. 😎

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
こんにちは。DanDanStop という名前は、実は自分への内なる警告です。「DanDan、新しいテクノロジーに夢中になって、また徹夜するのはそろそろやめよう！」

ここは私の個人的なテックラボであり、インスピレーションのハブです。「素早く動き、改善を重ねる」アジャイルな姿勢で、最新の AI ツールや MarTech の実験を実際に手を動かして試しています。

その一次体験から得た気づきを共有し、新しいテクノロジーをより理解しやすく、次の行動につながるものにしていきます。

アイデア交換、イノベーションについての議論、新しい機会の探索をいつでも歓迎しています。お気軽にご連絡ください。😎

最終更新：2026年6月

Contact
```

## Verification Checklist

Use these checks after About or SEO changes:

- `node --check app.js`
- JSON-LD parses successfully.
- JSON-LD includes `author.name = DanDanStop`.
- JSON-LD includes nine `hasPart` items.
- `.seo-index-content` exists in rendered DOM.
- About drawer opens and closes.
- About title contains a line break before `DanDanStop`.
- Contact link resolves to `mailto:hello@dandanstop.me`.
- Language switching updates About copy in English, Traditional Chinese, Korean, and Japanese.
- Console has no application-breaking errors.

## Remaining SEO Tasks

Recommended next implementation items:

1. Confirm `robots.txt` points to `https://dandanstop.me/sitemap.xml` and `sitemap.xml` lists `https://dandanstop.me/datacenter-3d`.
2. Replace `og-image.png` with a custom designed 1200x630 image if needed.
3. Decide whether static SEO/GEO text should become a visible below-the-fold reading section.
4. If production multilingual SEO is required, implement language-specific URLs plus canonical and hreflang.
