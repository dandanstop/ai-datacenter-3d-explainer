# SEO, GEO, And About Maintenance Notes

Status: current implementation baseline  
Last updated: 2026-06-17  
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

- `robots.txt` and `sitemap.xml` use `https://ai-datacenter-3d.vercel.app/` as the expected production URL. Confirm and update them if Vercel assigns a different URL.
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
  - Name: Daniel Chen
  - URL: `#about`
- Added `dateModified`: `2026-06-17`
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
- Link target: `mailto:diren.chen@gmail.com`

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
Daniel Chen
```

Body:

```text
This interactive 3D explainer maps how AI data center infrastructure is evolving from GPU demand into a broader system-level transformation across power, cooling, compute equipment, networking, operations platforms, workloads, and agentic AI workflows.

I’m a product builder and growth marketer who enjoys transforming great ideas into products people love.

My focus is simple: turn complex technology into clear, compelling customer value. From taking products from 0→1 to scaling them across regions and markets.

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
Daniel Chen
```

Body:

```text
這個互動式 3D 解說專案，描繪 AI 資料中心基礎設施如何從 GPU 需求，演變成橫跨電力、冷卻、算力設備、網路、營運平台、workload 與 Agentic AI 工作流的系統性重組。

我是一位 product builder 與 growth marketer，喜歡把好的想法轉化成讓人真正喜愛的產品。

我的關注很單純：把複雜技術轉化成清楚、有吸引力的客戶價值。從產品 0→1，到跨區域、跨市場的成長擴張。

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
Daniel Chen
```

Body:

```text
이 인터랙티브 3D 해설은 AI 데이터센터 인프라가 GPU 수요에서 출발해 전력, 냉각, 컴퓨팅 장비, 네트워크, 운영 플랫폼, 워크로드, Agentic AI 워크플로를 아우르는 더 큰 시스템 차원의 전환으로 진화하는 과정을 보여줍니다.

저는 좋은 아이디어를 사람들이 사랑하는 제품으로 바꾸는 일을 즐기는 product builder이자 growth marketer입니다.

제가 집중하는 일은 단순합니다. 복잡한 기술을 명확하고 설득력 있는 고객 가치로 바꾸는 것. 제품을 0→1로 만들고, 여러 지역과 시장으로 확장하는 일까지 포함합니다.

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
Daniel Chen
```

Body:

```text
このインタラクティブな 3D 解説は、AI データセンターインフラが GPU 需要から、電力、冷却、計算設備、ネットワーク、運用基盤、ワークロード、Agentic AI ワークフローを含む、より大きなシステム変革へ進化している様子を示します。

私は、優れたアイデアを人々に愛されるプロダクトへ変えることを楽しむ product builder であり growth marketer です。

私の関心はシンプルです。複雑なテクノロジーを、明確で魅力的な顧客価値へ変えること。プロダクトを 0→1 で立ち上げ、地域や市場をまたいで拡大することまで含みます。

アイデア交換、イノベーションについての議論、新しい機会の探索をいつでも歓迎しています。お気軽にご連絡ください。😎

最終更新：2026年6月

Contact
```

## Verification Checklist

Use these checks after About or SEO changes:

- `node --check app.js`
- JSON-LD parses successfully.
- JSON-LD includes `author.name = Daniel Chen`.
- JSON-LD includes nine `hasPart` items.
- `.seo-index-content` exists in rendered DOM.
- About drawer opens and closes.
- About title contains a line break before `Daniel Chen`.
- Contact link resolves to `mailto:diren.chen@gmail.com`.
- Language switching updates About copy in English, Traditional Chinese, Korean, and Japanese.
- Console has no application-breaking errors.

## Remaining SEO Tasks

Recommended next implementation items:

1. Confirm final Vercel production URL and update `robots.txt` / `sitemap.xml` if needed.
2. Replace `og-image.png` with a custom designed 1200x630 image if needed.
3. Decide whether static SEO/GEO text should become a visible below-the-fold reading section.
4. If production multilingual SEO is required, implement language-specific URLs plus canonical and hreflang.
