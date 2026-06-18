# AI Data Center Value Chain 3D Explainer Requirements

Status: current implementation baseline  
Last updated: 2026-06-19  
Local preview URL: http://127.0.0.1:8124/  
Primary files: `index.html`, `styles.css`, `app.js`, `vendor/`

## 1. Project Purpose

This project is an interactive 3D explainer for the AI data center value chain. It is designed for investors, technology industry analysts, semiconductor professionals, AI infrastructure teams, and senior readers who want to understand how AI compute demand is reshaping infrastructure.

The core message:

AI compute growth is not only a GPU demand cycle. Workloads, system architecture, supply-chain bottlenecks, and energy infrastructure are being reorganized at the same time.

Primary English H1:

From GPUs to the Grid: The AI Compute Race Enters Its Infrastructure Era

Primary Chinese H1:

從 GPU 到電網：AI 算力競賽進入基礎設施時代

## 2. Current Experience Summary

The page opens in an immersive desktop layout:

- Left panel: title, intro, language selector, six value-chain layer controls, reset, exploded-view slider.
- Center stage: interactive Three.js 3D exploded model.
- Right insight panel: hidden on initial load to keep the first view focused on the 3D model.
- Progressive reveal: the right insight panel appears after the user interacts with the model or controls.

The current design intentionally prioritizes:

- Immersive first impression.
- Progressive disclosure of dense analysis.
- Compact professional information design.
- Multilingual accessibility for English, Traditional Chinese, Korean, and Japanese.
- SEO/GEO groundwork without disrupting the visual experience.
- Low-profile About drawer for author context and contact.

## 3. Target Audience

Primary audiences:

- Public market investors.
- Technology and semiconductor analysts.
- Semiconductor and AI server supply-chain professionals.
- AI infrastructure, cloud, and data center teams.
- Advanced readers interested in AI data center supply chains.

Audience expectations:

- Clear industry structure.
- Real company names and ticker symbols.
- Infrastructure context beyond GPU headlines.
- Visual explanation that is richer than a static article.
- Dense but readable professional UI.

## 4. Information Architecture

The value chain is organized into six layers:

1. Power & Grid
2. Cooling Systems
3. Compute Equipment
4. Network Interconnect
5. Site & Construction
6. Operations & Platform

Default state:

- Default language: English.
- Default active layer: Compute Equipment 03.
- Default 3D setting: exploded view at 72%.
- Auto-rotation: always enabled.
- Flow animation: always enabled.
- Right insight panel: hidden until interaction.

## 5. Layout Requirements

### Desktop

Desktop layout uses a three-zone architecture:

- Left panel: fixed control and navigation column.
- Stage: primary 3D model area.
- Right panel: insight details, initially collapsed to `0px` width.

Before interaction:

- The right insight panel must not visually appear.
- The stage should expand to use the freed width.
- The user should visually focus on the 3D model and value-chain controls.

After interaction:

- The right panel slides/reveals into view.
- The selected layer insight appears.
- The right panel should remain visible after the first reveal.

Desktop left-panel refinements:

- No visible scrollbar in normal desktop sizes.
- Maintain `overflow-y: auto` as a safety mechanism.
- Compact vertical density.
- Keep additional spacing below the language selector before the six layer cards.
- Keep at least 10px spacing between the chapter selector and the visible card list in Chapter 1, Chapter 2, and Chapter 3.

### About Drawer

The page includes a low-visual-weight About entry in the left panel. It opens an in-page drawer rather than navigating away from the 3D experience.

Current About requirements:

- Entry label:
  - English: `About`
  - Traditional Chinese: `關於作者`
  - Korean: `소개`
  - Japanese: `このサイトについて`
- Drawer title renders as two lines:
  - English: `Curated by` / `DanDanStop`
  - Traditional Chinese: `策展與製作：` / `DanDanStop`
  - Korean: `기획 및 제작:` / `DanDanStop`
  - Japanese: `企画・制作：` / `DanDanStop`
- Contact link text: `Contact`
- Contact link target: `mailto:hello@dandanstop.me`
- About text is localized in English, Traditional Chinese, Korean, and Japanese.
- Author metadata is represented in JSON-LD through `author`, `creator`, and `dateModified`.

Verified desktop sizes:

- 1440x900: no left-panel scrolling required.
- 1280x720: no left-panel scrolling required.

### Tablet and Mobile

At narrower viewports:

- Layout becomes single-column.
- Body scrolling is enabled.
- Right insight panel is hidden before interaction.
- Stage height uses a mobile-friendly viewport height.
- Language selector becomes two columns on small screens.
- Metric cards become one column.

## 6. Interaction Requirements

The right insight panel must reveal after any of the following:

- Pointer down or click on the 3D canvas.
- Dragging the 3D model.
- Mouse wheel zoom on the 3D model.
- Clicking a 3D model component.
- Clicking any left-panel layer button.
- Adjusting the exploded-view slider.

After reveal:

- `appShell` removes `insight-is-hidden`.
- `rightPanel` receives `is-revealed`.
- `rightPanel aria-hidden` changes to `false`.
- `insightContent aria-hidden` changes to `false`.
- The insight panel remains visible for the session.

Reset behavior:

- Reset button returns camera to the default view.
- Reset button returns active layer to Compute Equipment 03.
- Reset button returns exploded view to 72%.

## 7. 3D Model Requirements

Technology:

- Three.js.
- Local vendored modules in `vendor/`.
- Must be served through local or production HTTP server.
- Direct `file://` open should redirect users to `http://127.0.0.1:8124/` because ES modules can be blocked when opening `index.html` directly.

Core model requirements:

- Use recognizable 3D component analogs, aiming for realistic simplified models rather than abstract icons.
- Current model style target: approximately 80% similarity to real-world objects while staying performant and readable.
- Use high-recognition colorful palette.
- Do not expose color scheme selector in the UI.

Layer model examples:

- Power & Grid: transformer, UPS cabinets, PDU panels, battery cabinet, high-voltage structures, cables.
- Cooling Systems: cooling tower, fans, CDU/chiller-like components, liquid pipes.
- Compute Equipment: AI server racks, server drawers, GPU/server boards, cable bundles.
- Network Interconnect: switches, optical modules, NIC/network hardware, fiber/cable paths.
- Site & Construction: data center building, roof mechanical platform, road, loading dock, fencing, water/fire tank.
- Operations & Platform: cloud/platform visual elements, dashboards, monitoring/security/service components.

3D behavior:

- Auto-rotation always enabled.
- Flow lines always visible and animated.
- Active or hovered layer uses stronger emissive intensity.
- Labels are overlaid in 2D and track 3D layer positions.
- Clicking model components should focus/select the corresponding layer.

## 8. Content Requirements

Each layer must provide:

- Layer name.
- Layer role/subtitle.
- Signal sentence shown in the 3D HUD.
- Insight lead paragraph.
- Supplier/company list with real companies and ticker symbols where available.
- Four metric cards.
- Industry context / key observation paragraph.

Current layer examples:

- Power & Grid: Schneider Electric, Eaton, ABB, Siemens Energy, Vertiv, Caterpillar, Cummins, GE Vernova, Quanta Services, NextEra Energy, Duke Energy, Constellation Energy.
- Cooling Systems: Vertiv, Schneider Electric, Johnson Controls, Trane, Carrier, Modine, nVent, Daikin, Delta Electronics, CoolIT, Asetek, Xylem.
- Compute Equipment: NVIDIA, AMD, Broadcom, Marvell, TSMC, ASML, Applied Materials, Lam Research, SK hynix, Micron, Samsung, Super Micro Computer, Dell, HPE, Quanta, Wiwynn, Foxconn.
- Network Interconnect: Arista, Cisco, NVIDIA Networking, Broadcom, Marvell, Intel, Coherent, Lumentum, Fabrinet, Innolight, Amphenol, TE Connectivity, Molex.
- Site & Construction: Equinix, Digital Realty, GDS, NEXTDC, Keppel DC REIT, NTT Data, KDDI, Quanta Services, AECOM, Jacobs, Fluor, Vantage Data Centers, QTS, CyrusOne, DataBank.
- Operations & Platform: Amazon, Microsoft, Alphabet, Oracle, Meta, CoreWeave, Nebius, Lambda, Crusoe, Snowflake, Datadog, ServiceNow, Cloudflare, Databricks, Palo Alto Networks, CrowdStrike, Zscaler, Okta.

## 9. Multilingual Requirements

Supported languages:

- English
- Traditional Chinese
- Korean
- Japanese

Language selector behavior:

- Located in the left panel.
- Does not navigate to a new URL in the current implementation.
- Updates visible UI text, layer labels, insight content, document title, and HTML lang attribute.

Current H1 translations:

- English: From GPUs to the Grid: The AI Compute Race Enters Its Infrastructure Era
- Traditional Chinese: 從 GPU 到電網：AI 算力競賽進入基礎設施時代
- Korean: GPU에서 전력망까지: AI 컴퓨팅 경쟁은 인프라 시대로 진입했다
- Japanese: GPU から電力網へ：AI コンピュート競争はインフラの時代へ

Important future SEO note:

The current multilingual implementation is good for UX, but not ideal for SEO because all languages share one URL and are switched by JavaScript. For multilingual SEO, future versions should use language-specific URLs such as:

- `/en/`
- `/zh/`
- `/ko/`
- `/ja/`

Each URL should have self-referencing canonical and reciprocal hreflang annotations.

## 10. SEO and GEO Requirements

Current implemented SEO foundation:

- `title`
- `meta description`
- `robots`
- `theme-color`
- canonical link
- Open Graph tags
- Twitter Card tags
- `og:image` and `twitter:image`
- JSON-LD structured data
- `noscript` static summary
- static SEO/GEO text layer in HTML
- About author and contact metadata
- `robots.txt`
- `sitemap.xml`
- Google Analytics 4 tracking tag and project-level events

## 10.1 Analytics Requirements

GA4 is installed through Measurement ID `G-2CJ15FLWPY`. The implementation uses one site-level GA4 property and separates projects through event parameters.

Current project analytics identity:

- `project_slug`: `datacenter-3d`
- `project_name`: `AI Data Center 3D Explainer`
- `page_path`: `/datacenter-3d`

Tracked events:

- `project_view`: initial project exposure.
- `chapter_select`: user changes Chapter 1, Chapter 2, or Chapter 3.
- `layer_select`: user selects a Chapter 1 value-chain layer from the menu or 3D model.
- `mode_select`: user selects a Chapter 2 or Chapter 3 mode from the menu.
- `model_select`: user clicks a Chapter 2 or Chapter 3 3D model node.
- `language_select`: user changes language.
- `audio_play`: user starts audio from the player or by clicking a 3D model node that triggers audio.
- `transcript_open`: user opens the transcript panel.
- `analysis_open`: user opens the full analysis drawer.
- `about_open`: user opens the About drawer.
- `contact_click`: user clicks the Contact mail link.

Recommended GA4 custom dimensions:

- `project_slug`
- `project_name`
- `chapter_id`
- `language`
- `segment_id`
- `interaction_source`

Current JSON-LD:

- Type: `WebPage` and `LearningResource`.
- Topic: AI data center value chain.
- Audience: investors, analysts, semiconductor professionals, AI infrastructure teams.
- `author`: DanDanStop.
- `creator`: DanDanStop.
- `dateModified`: 2026-06-19.
- `hasPart`: nine items:
  - Chapter 1 learning resource.
  - Chapter 2 learning resource.
  - Chapter 3 learning resource.
  - Six value-chain layers.
- Chapter-level `AudioObject` entries include English transcript summaries.
- URL and `@id` are normalized at runtime to the current origin and path.

Current meta description:

Explore the AI data center value chain from GPUs to the grid with an interactive 3D map of power, cooling, compute, networking, sites, and operations.

SEO/GEO limitation:

The interactive insight panel is hidden until user interaction. This is good for immersive UX, so the implementation now includes a static `seo-index-content` HTML section with Chapter 1, Chapter 2, and Chapter 3 text summaries. This gives crawlers and AI answer engines a readable text layer without forcing long-form content into the first visual viewport.

Current static SEO/GEO text layer:

- Location: `index.html`, class `seo-index-content`.
- Purpose: make Chapter 1/2/3 arguments available as real HTML.
- Styling: visually hidden using clipping, not generated only after user interaction.
- Contains:
  - Chapter 1 value-chain summary and company examples.
  - Chapter 2 training vs inference workload summary and transcript summary.
  - Chapter 3 Agentic AI summary, value-chain roles, company examples, and transcript summary.

Remaining SEO/GEO recommendations:

- Production domain: `https://dandanstop.me/`.
- Production canonical path for this explainer: `https://dandanstop.me/datacenter-3d`.
- Root domain `/` is reserved for the future DanDanStop main site and should not redirect to this explainer.
- Vercel rewrites `/datacenter-3d` to the current static app root; static assets continue to load from root paths such as `/app.js`, `/styles.css`, `/audio/...`, and `/vendor/...`.
- If production multilingual SEO becomes important, move from one JavaScript-switched URL to language-specific URLs with canonical and hreflang.
- Consider a visible below-the-fold editorial reading section if the page evolves from an immersive demo into a content hub.

## 11. Accessibility Requirements

Current accessibility considerations:

- Single visible H1.
- Main regions use semantic `section` and `aside`.
- Layer list uses tablist/tab roles.
- Sliders use labels.
- Right insight panel uses `aria-hidden=true` before reveal and switches to `false` after reveal.
- 3D labels are marked `aria-hidden` because they are visual overlays.

Future accessibility improvements:

- Add stronger keyboard support for selecting layers and revealing insights.
- Add visible focus states for all controls.
- Consider a non-3D text fallback for core explanation.
- Ensure color contrast remains AA compliant.
- Consider `prefers-reduced-motion` behavior that keeps content usable without strong animation.

## 12. Performance Requirements

Current asset profile:

- `app.js`: approximately 71 KB.
- Three.js vendored modules: approximately 750 KB combined.
- CSS: approximately 12 KB.
- Total local JS/CSS/vendor payload is under 1 MB before transfer compression.

Production recommendations:

- Serve with gzip or Brotli.
- Add long-lived cache headers for `vendor/`.
- Consider bundling and tree-shaking if migrating to Vite/Next.js.
- Consider code splitting if the future page adds long-form content sections or analytics.
- Keep the initial model performant on laptop GPUs.
- Avoid high-polygon imported 3D assets unless optimized.

## 13. Browser and Runtime Requirements

The project must be served over HTTP:

```bash
cd /Users/daniel/Projects/Stocks/ai-datacenter-3d
python3 -m http.server 8124
```

Preview URL:

```text
http://127.0.0.1:8124/
```

Direct file open behavior:

- Opening `index.html` through `file://` is not supported for normal use.
- The page redirects to the local HTTP server if opened directly.
- The file warning explains why the HTTP server is required.
- Current file-open redirect target: `http://127.0.0.1:8124/`.

## 14. Current File Map

```text
ai-datacenter-3d/
  index.html              HTML shell, SEO tags, JSON-LD, main layout, About drawer, noscript summary, SEO text layer
  styles.css              Layout, responsive design, reveal states, panels, cards, About drawer
  app.js                  Data, translations, Three.js scene, model creation, interactions, About content
  vendor/
    three.module.min.js   Vendored Three.js module
    three.core.min.js     Vendored Three.js core
    OrbitControls.js      Camera interaction controls
```

Note:

There is currently a `.app.js.swp` file in the folder. It appears to be an editor swap file and should not be deployed.

## 15. Acceptance Criteria

The current baseline should pass the following checks:

- Page loads at `http://127.0.0.1:8124/`.
- Direct `file://` open redirects to the local HTTP server.
- Default language is English.
- Default selected layer is Compute Equipment 03.
- Initial desktop view hides the right insight panel.
- First interaction reveals the right insight panel.
- Auto-rotation is enabled after load.
- Flow animation is enabled after load.
- Six layer cards are visible in the left panel.
- About link opens and closes the About drawer.
- About title renders as two lines.
- Contact link points to `mailto:hello@dandanstop.me`.
- Language switching updates H1, intro, layer labels, insight text, and document title.
- Desktop left panel has no visible scrollbar and fits at 1280x720.
- Network Interconnect metric cards do not overflow.
- SEO tags exist in rendered DOM.
- JSON-LD parses successfully and includes nine `hasPart` items.
- Static SEO/GEO text layer exists in the HTML DOM.
- Console has no application-breaking errors.

## 16. Open Questions

These should be decided before a production launch:

- What is the final production domain?
- Should the site be a single-page explainer or part of a larger content hub?
- Should multilingual SEO use separate URLs?
- Should the static SEO/GEO content become a visible below-the-fold `Industry Analysis` section?
- Should the generated `og-image.png` be replaced with a custom designed 1200x630 share image?
- Should analytics events track layer clicks, reveal interaction, language changes, and slider usage?
- Should the 3D models be replaced with imported GLB/GLTF assets in a future version?

## 17. Suggested Roadmap

### Phase 1: Current Baseline

- Interactive 3D value-chain explainer.
- Six-layer model and insight content.
- Four-language UI.
- Progressive reveal of insight panel.
- Basic SEO tags, expanded JSON-LD, noscript summary, static SEO/GEO text layer, and About drawer.

### Phase 2: SEO/GEO Content Layer

- Decide whether the current static SEO/GEO text layer should become a visible below-the-fold `Industry Analysis` section.
- Convert current chapter and insight summaries into visible editorial HTML if the project shifts toward a content hub.
- Add internal anchors for each layer.
- Expand each layer into source-backed and GEO-friendly paragraphs.
- Add FAQ or glossary if content strategy requires it.

### Phase 3: Production SEO

- Add production canonical URL.
- Confirm production URL in `sitemap.xml` remains `https://dandanstop.me/datacenter-3d`.
- Confirm `robots.txt` points to `https://dandanstop.me/sitemap.xml`.
- Replace `og-image.png` with a designed social image if needed.
- Add hreflang if using separate language URLs.
- Validate with Google Rich Results Test and PageSpeed Insights.

### Phase 4: Productization

- Add analytics.
- Add share state in URL, such as `?layer=compute&lang=en`.
- Add downloadable snapshot or report export.
- Add deeper company/ticker profiles.
- Add optional industry timeline or CapEx flow view.

### Phase 5: Advanced 3D and Content

- Upgrade models with optimized GLB/GLTF assets.
- Add richer interaction states and annotations.
- Add scenario modes such as training cluster, inference cluster, hyperscaler campus, colocation facility.
- Add data-driven metrics by region, power density, or supplier category.

### Phase 6: Multi-Chapter Expansion

- Chapter 2: compare GPU training and inference serving through a 3D workload simulator.
- Chapter 3: explain agentic AI as a workflow system with robot, laptop, command window, workflow, task-running, and sub-agent elements.
- Keep the same interaction principle across chapters: prioritize the 3D visual first, then reveal insight and transcript content progressively.
- Keep four-language support across chapter titles, subtitles, controls, 3D labels, insight copy, audio briefing copy, and transcript content.

## 18. Webpage Copy Inventory

This section records the current on-page copy in all supported languages. Use this as the copy source when handing the project to design, localization, SEO, GEO, or frontend teams.

Source of truth: generated from `app.js` current `uiText`, base layer data, and `layerTranslations`.

### 18.1 Global UI Copy

#### English (en)

- HTML lang: en
- Page title / H1: From GPUs to the Grid: The AI Compute Race Enters Its Infrastructure Era
- Intro: Explore power, cooling, GPU servers, networking, sites, and operations through an interactive 3D value-chain model.
- Language label: Language
- Reset button: Reset
- Reset title: Reset view
- Exploded view label: Exploded view
- File warning title: Switching to the local HTTP server
- File warning text: Opening index.html directly blocks the 3D module. If the redirect does not happen, open http://127.0.0.1:8124/.
- 3D hint, drag: Drag to rotate
- 3D hint, zoom: Wheel to zoom
- 3D hint, click: Click to focus
- Insight reveal prompt: Interact with the 3D model to reveal this layer's insight.
- Insight title: Insight
- Supplier heading: Value-chain roles
- Risk/context heading: Industry context
- Layer list label: Value-chain layers

#### Traditional Chinese (zh)

- HTML lang: zh-Hant
- Page title / H1: 從 GPU 到電網：AI 算力競賽進入基礎設施時代
- Intro: 從電力、冷卻、GPU 伺服器、網路到營運服務，點選任一層級查看價值鏈角色與投資觀察。
- Language label: 語言
- Reset button: Reset
- Reset title: 重置視角
- Exploded view label: 拆解程度
- File warning title: 正在切換到本機 HTTP server
- File warning text: 直接開啟 index.html 時瀏覽器會封鎖 3D 模組。若沒有自動跳轉，請開啟 http://127.0.0.1:8124/。
- 3D hint, drag: 拖曳旋轉
- 3D hint, zoom: 滾輪縮放
- 3D hint, click: 點選聚焦
- Insight reveal prompt: 與 3D 模型互動後，將顯示此層級的產業洞察。
- Insight title: 洞察
- Supplier heading: 價值鏈角色
- Risk/context heading: 關鍵觀察
- Layer list label: 產業鏈層級

#### Korean (ko)

- HTML lang: ko
- Page title / H1: GPU에서 전력망까지: AI 컴퓨팅 경쟁은 인프라 시대로 진입했다
- Intro: 전력, 냉각, GPU 서버, 네트워크, 부지, 운영 플랫폼을 인터랙티브 3D 밸류체인 모델로 살펴보세요.
- Language label: 언어
- Reset button: 초기화
- Reset title: 시점 초기화
- Exploded view label: 분해 정도
- File warning title: 로컬 HTTP 서버로 이동 중
- File warning text: index.html을 직접 열면 브라우저가 3D 모듈을 차단합니다. 자동 이동이 되지 않으면 http://127.0.0.1:8124/ 을 여세요.
- 3D hint, drag: 드래그 회전
- 3D hint, zoom: 휠 확대
- 3D hint, click: 클릭 포커스
- Insight reveal prompt: 3D 모델과 상호작용하면 이 레이어의 인사이트가 표시됩니다.
- Insight title: 인사이트
- Supplier heading: 밸류체인 역할
- Risk/context heading: 산업 배경
- Layer list label: 밸류체인 레이어

#### Japanese (ja)

- HTML lang: ja
- Page title / H1: GPU から電力網へ：AI コンピュート競争はインフラの時代へ
- Intro: 電力、冷却、GPU サーバー、ネットワーク、用地、運用基盤を、インタラクティブな 3D バリューチェーンモデルで確認できます。
- Language label: 言語
- Reset button: リセット
- Reset title: 視点をリセット
- Exploded view label: 分解度
- File warning title: ローカル HTTP サーバーへ切り替えています
- File warning text: index.html を直接開くとブラウザが 3D モジュールをブロックします。自動で移動しない場合は http://127.0.0.1:8124/ を開いてください。
- 3D hint, drag: ドラッグで回転
- 3D hint, zoom: ホイールでズーム
- 3D hint, click: クリックでフォーカス
- Insight reveal prompt: 3D モデルを操作すると、この層のインサイトが表示されます。
- Insight title: インサイト
- Supplier heading: バリューチェーンの役割
- Risk/context heading: 産業背景
- Layer list label: バリューチェーン層

### 18.2 Layer Content By Language

#### English (en)

##### Power & Grid 01

- Role: Utilities, substations, UPS, PDU
- Signal: Power availability and grid interconnection timelines are the first bottlenecks for large AI campuses.
- Lede: AI clusters turn data centers into power infrastructure projects. Grid access, transformers, switchgear, and backup power determine whether a campus can go live on time.
- Value-chain roles:
  - Grid and electrical equipment: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)
  - Backup power and critical infrastructure: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)
  - Power EPC and interconnection: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - Energy and utility partners: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)
- Metrics:
  - 30-150MW: Common power range for one AI campus
  - N+1: Redundancy design for critical power
  - 18-36M: Grid and equipment lead-time risk
  - PUE: Core energy-efficiency metric
- Industry context / risk: AI demand increasingly depends on power delivery, not only GPU procurement. The key constraints are transformers, switchgear, grid approvals, and long-term power contracts. A practical way to read this layer is to ask how many megawatts can actually be delivered, at what reliability level, and at what cost.

##### Cooling Systems 02

- Role: Chillers, CDU, cold plates, cooling towers
- Signal: Rising GPU heat density pushes upgrades in cold plates, CDU, pumps, and cooling towers.
- Lede: AI rack density is moving facilities from air cooling toward hybrid and liquid cooling. The cooling architecture affects uptime, water use, energy cost, and room layout.
- Value-chain roles:
  - Data center thermal management: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)
  - Chillers, HVAC, and heat exchange: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)
  - Liquid cooling components: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)
  - Pumps, valves, and water treatment: Xylem (XYL), Pentair (PNR), Watts Water (WTS)
- Metrics:
  - 40-120kW: AI rack power-density range
  - Liquid: Preferred path for high-end GPU clusters
  - WUE: Water-usage effectiveness
  - Delta T: Efficiency variable for cooling loops
- Industry context / risk: Cooling is a full thermal path: chip heat source, cold plate, rack manifold, CDU, chiller, and cooling tower. Any failure in quick connectors, pumps, or water quality can reduce cluster availability, so reliability engineering matters as much as capacity.

##### Compute Equipment 03

- Role: GPU, HBM, advanced packaging, AI server
- Signal: GPU supply, advanced packaging, and rack-scale server delivery set the buildout pace.
- Lede: The compute layer includes GPUs, HBM, advanced packaging, motherboards, power supplies, racks, and system integration. It is usually the most capital-intensive layer.
- Value-chain roles:
  - AI accelerators and platforms: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)
  - Foundry, equipment, and advanced packaging: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)
  - HBM and memory: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)
  - AI server/ODM and systems: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)
- Metrics:
  - 60-75%: AI data center CapEx is often led by IT equipment
  - HBM: High-sensitivity GPU bottleneck
  - Rack-scale: Next-generation delivery model
  - Yield: Packaging yield affects shipment timing
- Industry context / risk: Compute bottlenecks are not limited to GPUs. A server also depends on HBM, advanced packaging, PCB, power, thermal design, rack integration, and testing. Strong analysis connects silicon, memory, packaging, and ODM delivery rather than reading GPU orders alone.

##### Network Interconnect 04

- Role: Switches, NIC, optical modules, fiber
- Signal: Training-cluster bottlenecks often emerge in east-west traffic and optical interconnects.
- Lede: Large model training requires low-latency, high-bandwidth GPU-to-GPU interconnect. Switches, NICs, optics, and topology directly affect cluster utilization.
- Value-chain roles:
  - Data center switches and systems: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)
  - Network silicon, DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)
  - Optical modules and photonics: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)
  - Connectors, cables, and high-speed interfaces: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)
- Metrics:
  - 400G/800G: Mainstream high-speed AI interconnect
  - East-West: Dominant traffic pattern in GPU clusters
  - Latency: Sensitive driver of training efficiency
  - Topology: Clos/Fat-tree affects scalability
- Industry context / risk: Large training clusters are networked systems, not just piles of GPUs. As clusters scale, switch radix, optics speed, topology, NIC/DPU design, and congestion control can explain why two sites with similar GPU counts deliver very different effective throughput.

##### Site & Construction 05

- Role: Land, water rights, facility, EPC
- Signal: Buildable land, water, power distance, and construction capacity determine supply speed.
- Lede: Data centers are heavy infrastructure. Land, civil works, electrical/mechanical systems, fire safety, security, and permits convert AI demand into multi-year construction pipelines.
- Value-chain roles:
  - Data center REITs and developers: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)
  - Regional and sovereign-cloud operators: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)
  - Civil, electrical, mechanical EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - Private large-scale platforms: Vantage Data Centers, QTS, CyrusOne, DataBank
- Metrics:
  - 24-48M: Typical cycle from planning to go-live
  - MW/acre: Land-use density indicator
  - Permits: Hidden delivery bottleneck
  - Tier: Reliability and redundancy standard
- Industry context / risk: Data center supply is not instant capacity; it is a multi-year infrastructure pipeline. Land, grid access, water, environmental review, tax incentives, labor, fire codes, and pre-lease contracts all determine when capacity becomes real.

##### Operations & Platform 06

- Role: Cloud, colocation, MLOps, monitoring, security
- Signal: The real product is dispatchable, billable, monitored compute service, not the building itself.
- Lede: The operations layer converts infrastructure into GPU cloud, training platforms, inference services, and managed solutions. Security, scheduling, maintenance, and SLA shape customer stickiness.
- Value-chain roles:
  - Hyperscalers and cloud platforms: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)
  - GPU cloud and AI infrastructure: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)
  - Data, MLOps, and observability: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)
  - Security and compliance: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)
- Metrics:
  - SLA: Core enterprise contract term
  - Utilization: Key driver of GPU rental margin
  - Inference: Demand expands from training to inference
  - Security: Sovereign data and compliance need
- Industry context / risk: Operations turn hardware into governed, billable compute. Long-term advantage comes from utilization, scheduling efficiency, model tooling, data security, SLA quality, contract duration, and energy-cost management.

#### Traditional Chinese (zh)

##### 電力與電網 01

- Role: Utility、變電站、UPS、PDU
- Signal: 電力可得性與併網時程，是大型 AI 資料中心擴張的第一瓶頸。
- Lede: AI 叢集把資料中心從 IT 專案推向電力專案。從高壓併網、變壓器、開關設備到備援電源，決定園區能否準時上線。
- Value-chain roles:
  - 電力與電網設備：Schneider Electric (SU.PA)、Eaton (ETN)、ABB (ABBN.SW/ABB)、Siemens Energy (ENR.DE)
  - 備援電源與熱管理基礎設施：Vertiv (VRT)、Caterpillar (CAT)、Cummins (CMI)、GE Vernova (GEV)
  - 電力工程與併網施工：Quanta Services (PWR)、AECOM (ACM)、Jacobs (J)、Fluor (FLR)
  - 能源與公用事業夥伴：NextEra Energy (NEE)、Duke Energy (DUK)、Constellation Energy (CEG)
- Metrics:
  - 30-150MW: 單一 AI 園區常見電力級距
  - N+1: 關鍵電力設備備援架構
  - 18-36M: 大型併網與設備交期風險
  - PUE: 能源效率與營運成本核心指標
- Industry context / risk: AI 資料中心的需求從 GPU 採購延伸到電力供給，常見瓶頸是變壓器、開關設備、併網審批與長期電價合約。教育性觀察：資料中心真正的可交付容量通常不是土地面積，而是可取得的 MW、電網穩定度、備援設計與用電成本；因此電力設備商、EPC 與公用事業會成為 AI 基礎建設週期的重要受益環節。

##### 冷卻系統 02

- Role: Chiller、CDU、液冷板、冷卻塔
- Signal: GPU 熱密度上升，推動冷板、CDU、泵浦與冷卻塔升級。
- Lede: AI 伺服器讓機櫃功率密度快速提高，風冷逐步走向混合冷卻與液冷。冷卻架構影響可靠度、用水、能耗與機房布局。
- Value-chain roles:
  - 資料中心熱管理：Vertiv (VRT)、Schneider Electric (SU.PA)、Johnson Controls (JCI)、Trane Technologies (TT)
  - 冷水機、熱交換與 HVAC：Carrier Global (CARR)、Modine (MOD)、nVent Electric (NVT)、Daikin (6367.T)
  - 液冷與電源整合零組件：Delta Electronics (2308.TW)、CoolIT Systems (private)、Asetek (ASTK.CO)
  - 泵浦、閥件與水處理：Xylem (XYL)、Pentair (PNR)、Watts Water (WTS)
- Metrics:
  - 40-120kW: AI 機櫃功率密度區間
  - Liquid: 高階 GPU 叢集主要升級方向
  - WUE: 水資源壓力評估指標
  - Delta T: 冷卻迴路效率關鍵變數
- Industry context / risk: AI 機櫃功率密度提高後，風冷會面臨氣流、噪音與能耗限制，液冷、CDU、冷板、快接頭與水處理的重要性上升。教育性觀察：冷卻不是單一零件，而是從晶片熱源、伺服器內部液冷板、機櫃歧管、CDU、冷水主機到冷卻塔的完整熱路徑；任何接頭漏液、泵浦故障或水質問題都可能影響叢集可用率。

##### 算力設備 03

- Role: GPU、HBM、先進封裝、AI Server
- Signal: GPU 供給、先進封裝與整機交付決定建置節奏。
- Lede: 算力層包含 GPU、HBM、CoWoS/先進封裝、伺服器主板、電源、機櫃與整機組裝，是資本支出最密集的核心。
- Value-chain roles:
  - AI 加速器與平台：NVIDIA (NVDA)、AMD (AMD)、Broadcom (AVGO)、Marvell (MRVL)
  - 晶圓代工、設備與先進封裝：TSMC (TSM/2330.TW)、ASML (ASML)、Applied Materials (AMAT)、Lam Research (LRCX)
  - HBM 與記憶體：SK hynix (000660.KS)、Micron (MU)、Samsung Electronics (005930.KS)
  - AI Server/ODM 與整機：Super Micro Computer (SMCI)、Dell (DELL)、HPE (HPE)、Quanta (2382.TW)、Wiwynn (6669.TW)、Foxconn (2317.TW)
- Metrics:
  - 60-75%: AI 資料中心 CapEx 常由 IT 設備主導
  - HBM: GPU 供給的高敏感零組件
  - Rack-scale: 新一代整櫃交付模式
  - Yield: 封裝良率牽動出貨節奏
- Industry context / risk: 算力層是 AI 資料中心 CapEx 的核心，但瓶頸不只在 GPU。教育性觀察：一台 AI 伺服器同時依賴 GPU、HBM、先進封裝、PCB、電源、散熱、機櫃與整機測試；只看 GPU 訂單容易忽略 HBM 供給、CoWoS/先進封裝產能、伺服器良率與 rack-scale 交付節奏。真正的產業鏈分析要把晶片、封裝、記憶體與 ODM 同時串起來看。

##### 網路互連 04

- Role: Switch、NIC、光模組、光纖
- Signal: 訓練叢集的瓶頸常出現在東西向流量與光互連。
- Lede: 大模型訓練需要低延遲、高頻寬的 GPU-to-GPU 互連。交換器、NIC、光模組與布線拓樸直接影響叢集利用率。
- Value-chain roles:
  - 資料中心交換器與網通系統：Arista Networks (ANET)、Cisco (CSCO)、NVIDIA Networking (NVDA)
  - 網路晶片、DPU/NIC：Broadcom (AVGO)、Marvell (MRVL)、Intel (INTC)、NVIDIA (NVDA)
  - 光模組與光通訊：Coherent (COHR)、Lumentum (LITE)、Fabrinet (FN)、Innolight (300308.SZ)
  - 連接器、線纜與高速介面：Amphenol (APH)、TE Connectivity (TEL)、Molex (Koch private)
- Metrics:
  - 400G/800G: AI 叢集主流高速互連
  - East-West: GPU 叢集主要流量型態
  - Latency: 訓練效率敏感指標
  - Topology: Clos/Fat-tree 影響擴充性
- Industry context / risk: 大模型訓練不是把 GPU 堆在一起就好，GPU 之間需要大量東西向流量。教育性觀察：當叢集從數千顆 GPU 擴到數萬顆 GPU，交換器 radix、光模組速率、拓樸設計、NIC/DPU 與 congestion control 會決定有效利用率；同樣 GPU 數量下，網路延遲與封包丟失可能讓訓練效率差很多。

##### 土地與建築 05

- Role: 土地、水權、機房、EPC
- Signal: 可建地、水資源、電力距離與施工能力共同決定供給速度。
- Lede: 資料中心是重資產基礎建設。土地取得、土建、機電工程、消防、安控與法規審批，會把 AI 需求轉換成多年期工程管線。
- Value-chain roles:
  - 資料中心 REITs 與開發商：Equinix (EQIX)、Digital Realty (DLR)、GDS Holdings (GDS/9698.HK)、NEXTDC (NXT.AX)
  - 主權雲/區域型營運商：Keppel DC REIT (AJBU.SI)、NTT Data (9613.T)、KDDI (9433.T)
  - 土建、機電與 EPC：Quanta Services (PWR)、AECOM (ACM)、Jacobs (J)、Fluor (FLR)
  - 私有大型平台：Vantage Data Centers、QTS、CyrusOne、DataBank
- Metrics:
  - 24-48M: 大型園區從規劃到上線的常見週期
  - MW/acre: 土地使用效率與密度衡量
  - Permits: 審批是隱形交付瓶頸
  - Tier: 可靠度與冗餘設計標準
- Industry context / risk: 資料中心供給不是即時商品，而是多年期基礎建設專案。教育性觀察：一個園區能不能上線，取決於土地、電力、水資源、環評、稅務誘因、施工人力、消防安規與客戶預租合約。相同的 AI 需求，在不同區域會因併網速度與地方政策而產生完全不同的供給曲線。

##### 營運與平台 06

- Role: Cloud、Colo、MLOps、監控資安
- Signal: 真正的商品不是機房，而是可被調度、計費、監控的算力服務。
- Lede: 營運層把基礎設施轉成雲端 GPU、訓練平台、推論服務與託管方案。資安、調度、維修與 SLA 影響客戶黏著度。
- Value-chain roles:
  - Hyperscaler 與雲端平台：Amazon (AMZN)、Microsoft (MSFT)、Alphabet (GOOGL)、Oracle (ORCL)、Meta (META)
  - GPU Cloud 與 AI 基礎設施：CoreWeave (CRWV)、Nebius (NBIS)、Lambda (private)、Crusoe (private)
  - 資料、MLOps 與可觀測性：Snowflake (SNOW)、Datadog (DDOG)、ServiceNow (NOW)、Cloudflare (NET)、Databricks (private)
  - 資安與合規：Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Zscaler (ZS)、Okta (OKTA)
- Metrics:
  - SLA: 企業客戶採購核心條款
  - Utilization: 算力租賃毛利關鍵
  - Inference: 需求逐步從訓練擴展至推論
  - Security: 主權資料與合規需求
- Industry context / risk: 營運平台把硬體轉換成可被客戶使用、計費與治理的算力服務。教育性觀察：長期競爭力不只來自擁有 GPU，而是來自利用率、排程效率、模型工具鏈、資料安全、SLA、客戶合約年限與能源成本管理。當硬體供給變多，差異化會從『誰有卡』逐步轉向『誰能把卡穩定、高利用率、合規地賣給客戶』。

#### Korean (ko)

##### 전력 및 전력망 01

- Role: 전력회사, 변전소, UPS, PDU
- Signal: 전력 확보와 계통 접속 일정은 대형 AI 데이터센터의 첫 번째 병목입니다.
- Lede: AI 클러스터는 데이터센터를 IT 프로젝트가 아니라 전력 인프라 프로젝트로 바꿉니다.
- Value-chain roles:
  - 전력망 장비: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)
  - 백업 전원과 핵심 인프라: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)
  - 전력 EPC와 계통 접속: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - 에너지 및 유틸리티 파트너: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)
- Metrics:
  - 30-150MW: 단일 AI 캠퍼스의 일반 전력 범위
  - N+1: 핵심 전력 이중화 구조
  - 18-36M: 계통 및 장비 리드타임 리스크
  - PUE: 에너지 효율 핵심 지표
- Industry context / risk: AI 수요는 GPU 조달뿐 아니라 실제 전력 공급 능력에 좌우됩니다. 변압기, 스위치기어, 계통 승인, 장기 전력계약을 함께 봐야 실제 가동 가능 용량을 이해할 수 있습니다.

##### 냉각 시스템 02

- Role: 칠러, CDU, 콜드플레이트, 냉각탑
- Signal: GPU 열밀도 상승은 콜드플레이트, CDU, 펌프, 냉각탑 업그레이드를 촉진합니다.
- Lede: AI 랙 밀도가 높아지며 공랭에서 하이브리드 및 액체냉각으로 이동하고 있습니다.
- Value-chain roles:
  - 데이터센터 열관리: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)
  - 칠러/HVAC/열교환: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)
  - 액체냉각 부품: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)
  - 펌프/밸브/수처리: Xylem (XYL), Pentair (PNR), Watts Water (WTS)
- Metrics:
  - 40-120kW: AI 랙 전력밀도 범위
  - Liquid: 고성능 GPU 클러스터 방향
  - WUE: 물 사용 효율
  - Delta T: 냉각 루프 효율 변수
- Industry context / risk: 냉각은 칩, 콜드플레이트, 랙 매니폴드, CDU, 칠러, 냉각탑으로 이어지는 열 경로입니다. 커넥터 누수, 펌프 고장, 수질 문제는 클러스터 가용률에 직접 영향을 줄 수 있습니다.

##### 컴퓨팅 장비 03

- Role: GPU, HBM, 첨단 패키징, AI 서버
- Signal: GPU 공급, 첨단 패키징, 랙 단위 서버 납품이 구축 속도를 결정합니다.
- Lede: 컴퓨팅 계층은 GPU, HBM, 패키징, 서버 보드, 전원, 랙, 시스템 통합으로 구성됩니다.
- Value-chain roles:
  - AI 가속기와 플랫폼: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)
  - 파운드리/장비/첨단 패키징: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)
  - HBM 및 메모리: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)
  - AI 서버/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)
- Metrics:
  - 60-75%: AI 데이터센터 CapEx는 IT 장비가 주도
  - HBM: GPU 공급의 민감 병목
  - Rack-scale: 차세대 납품 방식
  - Yield: 패키징 수율이 출하를 좌우
- Industry context / risk: 컴퓨팅 병목은 GPU에만 있지 않습니다. HBM, 첨단 패키징, PCB, 전원, 냉각, 랙 통합, 테스트를 함께 봐야 실제 납품 속도를 이해할 수 있습니다.

##### 네트워크 인터커넥트 04

- Role: 스위치, NIC, 광모듈, 광섬유
- Signal: 훈련 클러스터 병목은 동서 트래픽과 광 인터커넥트에서 자주 발생합니다.
- Lede: 대형 모델 훈련은 저지연·고대역폭 GPU 간 연결이 필요합니다.
- Value-chain roles:
  - 데이터센터 스위치: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)
  - 네트워크 칩/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)
  - 광모듈 및 포토닉스: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)
  - 커넥터/케이블/고속 인터페이스: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)
- Metrics:
  - 400G/800G: AI 고속 인터커넥트
  - East-West: GPU 클러스터 주요 트래픽
  - Latency: 훈련 효율 민감 변수
  - Topology: 확장성 결정 요인
- Industry context / risk: 대형 훈련 클러스터는 GPU 더미가 아니라 네트워크 시스템입니다. 스위치, 광모듈, 토폴로지, NIC/DPU, 혼잡 제어가 실제 처리량을 좌우합니다.

##### 부지 및 건설 05

- Role: 토지, 수자원, 시설, EPC
- Signal: 건설 가능한 토지, 물, 전력 거리, 시공 능력이 공급 속도를 결정합니다.
- Lede: 데이터센터는 토지, 토목, 전기/기계, 소방, 보안, 인허가가 결합된 중자산 인프라입니다.
- Value-chain roles:
  - 데이터센터 REITs/개발사: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)
  - 지역/주권 클라우드 운영사: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)
  - 토목/전기/기계 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - 민간 대형 플랫폼: Vantage Data Centers, QTS, CyrusOne, DataBank
- Metrics:
  - 24-48M: 계획부터 가동까지의 일반 주기
  - MW/acre: 토지 사용 밀도
  - Permits: 숨은 납품 병목
  - Tier: 신뢰성 및 이중화 기준
- Industry context / risk: 데이터센터 공급은 즉시 생기는 용량이 아니라 다년 인프라 파이프라인입니다. 토지, 전력, 물, 환경심사, 세제 혜택, 인력, 소방 규정, 선임대 계약이 모두 중요합니다.

##### 운영 및 플랫폼 06

- Role: 클라우드, 코로케이션, MLOps, 모니터링, 보안
- Signal: 실제 상품은 건물이 아니라 스케줄링·과금·모니터링 가능한 컴퓨팅 서비스입니다.
- Lede: 운영 계층은 인프라를 GPU 클라우드, 훈련 플랫폼, 추론 서비스, 관리형 솔루션으로 전환합니다.
- Value-chain roles:
  - 하이퍼스케일러와 클라우드: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)
  - GPU 클라우드와 AI 인프라: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)
  - 데이터/MLOps/가시성: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)
  - 보안 및 컴플라이언스: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)
- Metrics:
  - SLA: 기업 계약 핵심 조건
  - Utilization: GPU 임대 수익성 변수
  - Inference: 훈련에서 추론으로 수요 확대
  - Security: 주권 데이터와 규제 요구
- Industry context / risk: 운영 플랫폼은 하드웨어를 과금 가능한 서비스로 바꿉니다. 장기 경쟁력은 GPU 보유량보다 이용률, 스케줄링, 도구 생태계, 보안, SLA, 전력비 관리에서 나옵니다.

#### Japanese (ja)

##### 電力・電力網 01

- Role: 電力会社、変電所、UPS、PDU
- Signal: 電力確保と系統接続の時期が、大型 AI データセンターの最初の制約になります。
- Lede: AI クラスターはデータセンターを IT プロジェクトから電力インフラプロジェクトへ変えます。
- Value-chain roles:
  - 電力網・電気設備: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)
  - バックアップ電源と重要インフラ: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)
  - 電力 EPC と系統接続: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - エネルギー・公益事業パートナー: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)
- Metrics:
  - 30-150MW: AI キャンパスの一般的な電力規模
  - N+1: 重要電源の冗長設計
  - 18-36M: 系統・設備リードタイムリスク
  - PUE: エネルギー効率の中核指標
- Industry context / risk: AI 需要は GPU 調達だけでなく、実際に供給できる電力に左右されます。変圧器、開閉装置、系統承認、長期電力契約を確認することで、実稼働可能な容量を理解できます。

##### 冷却システム 02

- Role: チラー、CDU、冷却板、冷却塔
- Signal: GPU の熱密度上昇により、冷却板、CDU、ポンプ、冷却塔の更新が進みます。
- Lede: AI ラック密度の上昇により、空冷からハイブリッド冷却・液冷へ移行しています。
- Value-chain roles:
  - データセンター熱管理: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)
  - チラー/HVAC/熱交換: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)
  - 液冷部品: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)
  - ポンプ/バルブ/水処理: Xylem (XYL), Pentair (PNR), Watts Water (WTS)
- Metrics:
  - 40-120kW: AI ラックの電力密度範囲
  - Liquid: 高性能 GPU クラスターの方向性
  - WUE: 水使用効率
  - Delta T: 冷却ループ効率の変数
- Industry context / risk: 冷却はチップ、冷却板、ラックマニホールド、CDU、チラー、冷却塔まで続く熱経路です。コネクタ漏れ、ポンプ故障、水質問題はクラスター稼働率に直結します。

##### 計算設備 03

- Role: GPU、HBM、先端パッケージング、AI サーバー
- Signal: GPU 供給、先端パッケージング、ラック単位の納入が構築速度を決めます。
- Lede: 計算層は GPU、HBM、先端パッケージング、サーバーボード、電源、ラック、統合テストで構成されます。
- Value-chain roles:
  - AI アクセラレーターとプラットフォーム: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)
  - ファウンドリ/装置/先端パッケージング: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)
  - HBM とメモリ: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)
  - AI サーバー/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)
- Metrics:
  - 60-75%: AI データセンター CapEx は IT 機器が主導
  - HBM: GPU 供給の敏感な制約
  - Rack-scale: 次世代納入モデル
  - Yield: パッケージング歩留まりが出荷を左右
- Industry context / risk: 計算設備の制約は GPU だけではありません。HBM、先端パッケージング、PCB、電源、冷却、ラック統合、テストを同時に見る必要があります。

##### ネットワーク相互接続 04

- Role: スイッチ、NIC、光モジュール、光ファイバー
- Signal: 学習クラスターの制約は東西トラフィックと光接続に現れやすいです。
- Lede: 大規模モデル学習には低遅延・高帯域の GPU 間接続が必要です。
- Value-chain roles:
  - データセンタースイッチ: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)
  - ネットワークチップ/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)
  - 光モジュールとフォトニクス: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)
  - コネクタ/ケーブル/高速インターフェース: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)
- Metrics:
  - 400G/800G: AI 高速相互接続
  - East-West: GPU クラスターの主要トラフィック
  - Latency: 学習効率に敏感な要素
  - Topology: 拡張性を左右する設計
- Industry context / risk: 大規模学習クラスターは GPU の集合ではなくネットワークシステムです。スイッチ、光モジュール、トポロジー、NIC/DPU、輻輳制御が実効スループットを左右します。

##### 用地・建設 05

- Role: 土地、水利、施設、EPC
- Signal: 建設可能な土地、水、電力距離、施工能力が供給速度を決めます。
- Lede: データセンターは土地、土木、電気・機械、消防、セキュリティ、許認可を含む重資産インフラです。
- Value-chain roles:
  - データセンター REIT/開発会社: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)
  - 地域・主権クラウド事業者: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)
  - 土木/電気/機械 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)
  - 民間大型プラットフォーム: Vantage Data Centers, QTS, CyrusOne, DataBank
- Metrics:
  - 24-48M: 計画から稼働までの一般的期間
  - MW/acre: 土地利用密度
  - Permits: 隠れた納入制約
  - Tier: 信頼性と冗長性の標準
- Industry context / risk: データセンター供給は即時容量ではなく、複数年のインフラパイプラインです。土地、電力、水、環境審査、税制、人材、消防規制、事前リース契約が重要です。

##### 運用・プラットフォーム 06

- Role: クラウド、コロケーション、MLOps、監視、セキュリティ
- Signal: 実際の商品は建物ではなく、配分・課金・監視できる計算サービスです。
- Lede: 運用層はインフラを GPU クラウド、学習基盤、推論サービス、マネージドソリューションへ変換します。
- Value-chain roles:
  - ハイパースケーラーとクラウド: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)
  - GPU クラウドと AI インフラ: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)
  - データ/MLOps/可観測性: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)
  - セキュリティとコンプライアンス: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)
- Metrics:
  - SLA: 企業契約の中核条件
  - Utilization: GPU レンタル収益性の鍵
  - Inference: 学習から推論へ需要拡大
  - Security: 主権データと規制要件
- Industry context / risk: 運用プラットフォームはハードウェアを課金可能なサービスに変えます。長期優位性は GPU 保有量だけでなく、利用率、スケジューリング、ツール、セキュリティ、SLA、電力コスト管理から生まれます。

### 18.3 Chapter 2 Content Inventory

Chapter 2 current theme:

From Training Factories to Inference Networks

Core message:

Training AI and inference AI both run models, but they stress infrastructure in different ways. Training is compute- and throughput-oriented because it builds model capability. Inference is memory-, latency-, and efficiency-oriented because it serves users in real time.

Current Chapter 2 interaction model:

- Default mode: Compare Both.
- 3D model: two workload lanes, visually separated as Training AI and Inference AI.
- Compare Both: shows both lanes with clear labels and a larger gap between the two flow systems.
- Training AI mode: shows only the training workload lane and hides the inference lane.
- Inference AI mode: shows only the inference workload lane and hides the training lane.
- Insight panel: available like Chapter 1, with the visual heading pattern `{mode name} + Insight`.
- Audio briefing: compact player, no autoplay, transcript collapsed by default.
- Audio behavior: player transcript switches by selected mode or clicked 3D node.
- Audio transcript source file: `docs/chapter2-audio-transcripts.md`.

#### English (en)

- Title: From Training Factories to Inference Networks
- Intro: Use an interactive 3D workload model to compare compute-driven AI training with memory- and efficiency-driven inference: training builds models, while inference serves users.
- Mode labels:
  - Compare Both
  - Training AI
  - Inference AI
- Compare Both signal: The real dividing line in AI hardware choices: training and inference may both look like running AI, but they demand entirely different hardware worlds.
- Training AI signal: Training rewards high GPU utilization, east-west bandwidth, checkpoint throughput, and power density.
- Inference AI signal: Inference rewards routing, concurrency, high-bandwidth memory, retrieval speed, and predictable response time.
- Lane labels:
  - Training AI
  - Inference AI
- 3D node labels:
  - Dataset lake
  - Preprocessing
  - GPU training cluster
  - Interconnect fabric
  - Checkpoint storage
  - Model artifact
  - User requests
  - Gateway / load balancer
  - Model serving rack
  - High Bandwidth Memory
  - Retrieval / vector database
  - Response edge
- Audio briefing segments:
  - Compare Both: Training AI and inference AI both run models, but they stress infrastructure in very different ways. Training is about throughput: using large GPU clusters to build model capability. Inference is about latency and efficiency: serving users quickly while they wait. That is why AI infrastructure is no longer just a GPU story. It is a system-wide rebuild across compute, memory, networking, and orchestration.
  - Training AI: Training AI works like a throughput factory. Massive datasets move through synchronized GPU clusters, and the goal is to keep expensive accelerators highly utilized. The bottleneck is not only GPUs. It also includes HBM, interconnect, checkpoint storage, power, and cooling.
  - Inference AI: Inference AI works more like real-time traffic. It handles many user requests, and every routing decision, memory access, retrieval step, and model response can affect latency. The key challenge is balancing quality, cost, and response speed.

#### Traditional Chinese (zh)

- Title: 從訓練工廠到推論網路
- Intro: 用互動式 3D workload 模型，比較算力導向的 AI 訓練與記憶體、效率導向的 AI 推論：訓練建立模型，推論服務使用者。
- Mode labels:
  - 兩者比較
  - 訓練 AI
  - 推論 AI
- Compare Both signal: AI 硬體選擇的真正分水嶺：這兩件事看起來都在「跑 AI」，但對硬體的需求，卻是完全不同的世界。
- Training AI signal: 訓練重視 GPU 利用率、東西向頻寬、checkpoint 吞吐量與功率密度。
- Inference AI signal: 推論重視路由、併發、高頻寬記憶體、檢索速度與可預期回應時間。
- Lane labels:
  - 訓練 AI
  - 推論 AI
- 3D node labels:
  - 資料湖
  - 資料前處理
  - GPU 訓練叢集
  - 互連網路
  - Checkpoint 儲存
  - 模型成果
  - 使用者請求
  - Gateway / 負載平衡
  - 模型服務機櫃
  - 高頻寬記憶體
  - 檢索 / 向量資料庫
  - 回應邊緣
- Audio briefing segments:
  - 兩者比較: 訓練 AI 和推論 AI 都在跑模型，但壓力完全不同。訓練重視吞吐量，目標是用大量 GPU 建立模型能力；推論重視延遲與效率，目標是在使用者等待時快速回應。這就是為什麼 AI 基礎設施不只是 GPU 需求增加，而是算力、記憶體、網路與系統編排一起重組。
  - 訓練 AI: 訓練 AI 像一座吞吐量工廠。大量資料被送進同步化 GPU 叢集，核心目標是讓昂貴的加速器保持高利用率。瓶頸不只在 GPU，還包括 HBM、互連網路、儲存 checkpoint、電力與冷卻。
  - 推論 AI: 推論 AI 像即時交通系統。它要處理大量使用者請求，每一次路由、記憶體存取、檢索與模型回應，都會影響延遲。推論的競爭重點，是在品質、成本與回應速度之間取得平衡。

#### Korean (ko)

- Title: 훈련 공장에서 추론 네트워크로
- Intro: 인터랙티브 3D 워크로드 모델로 컴퓨팅 중심의 AI 훈련과 메모리·효율 중심의 추론을 비교합니다. 훈련은 모델을 만들고, 추론은 사용자를 서비스합니다.
- Mode labels:
  - 둘 다 비교
  - 훈련 AI
  - 추론 AI
- Compare Both signal: AI 하드웨어 선택의 진짜 분기점: 둘 다 AI를 실행하는 것처럼 보이지만, 필요한 하드웨어는 완전히 다른 세계입니다.
- Training AI signal: 훈련은 GPU 이용률, 동서 대역폭, 체크포인트 처리량, 전력 밀도가 중요합니다.
- Inference AI signal: 추론은 라우팅, 동시성, 고대역폭 메모리, 검색 속도, 예측 가능한 응답시간이 중요합니다.
- Lane labels:
  - 훈련 AI
  - 추론 AI
- 3D node labels:
  - 데이터 레이크
  - 전처리
  - GPU 훈련 클러스터
  - 인터커넥트 패브릭
  - 체크포인트 저장소
  - 모델 산출물
  - 사용자 요청
  - 게이트웨이 / 로드밸런서
  - 모델 서빙 랙
  - 고대역폭 메모리
  - 검색 / 벡터 DB
  - 응답 엣지
- Audio briefing segments:
  - 둘 다 비교: 훈련 AI와 추론 AI는 모두 모델을 실행하지만, 인프라에 주는 압력은 매우 다릅니다. 훈련은 처리량이 핵심이며, 대규모 GPU 클러스터로 모델 능력을 만듭니다. 추론은 지연시간과 효율이 핵심이며, 사용자가 기다리는 동안 빠르게 응답해야 합니다. 그래서 AI 인프라는 단순한 GPU 수요가 아니라 컴퓨팅, 메모리, 네트워크, 오케스트레이션의 재구성입니다.
  - 훈련 AI: 훈련 AI는 처리량 공장과 같습니다. 대규모 데이터가 동기화된 GPU 클러스터를 지나가고, 목표는 비싼 가속기를 최대한 바쁘게 유지하는 것입니다. 병목은 GPU만이 아닙니다. HBM, 인터커넥트, 체크포인트 저장소, 전력, 냉각도 함께 중요합니다.
  - 추론 AI: 추론 AI는 실시간 교통 시스템에 가깝습니다. 많은 사용자 요청을 처리해야 하며, 라우팅, 메모리 접근, 검색, 모델 응답의 모든 단계가 지연시간에 영향을 줍니다. 핵심은 품질, 비용, 응답 속도 사이의 균형입니다.

#### Japanese (ja)

- Title: 学習工場から推論ネットワークへ
- Intro: インタラクティブな 3D ワークロードモデルで、計算力中心の AI 学習とメモリ・効率中心の推論を比較します。学習はモデルを作り、推論はユーザーに提供します。
- Mode labels:
  - 両方を比較
  - 学習 AI
  - 推論 AI
- Compare Both signal: AI ハードウェア選択の本当の分岐点：どちらも「AI を動かす」ように見えますが、求めるハードウェアはまったく別の世界です。
- Training AI signal: 学習では GPU 利用率、東西帯域、チェックポイント処理、電力密度が重要です。
- Inference AI signal: 推論ではルーティング、同時実行、高帯域メモリ、検索速度、予測可能な応答時間が重要です。
- Lane labels:
  - 学習 AI
  - 推論 AI
- 3D node labels:
  - データレイク
  - 前処理
  - GPU 学習クラスター
  - 相互接続ファブリック
  - チェックポイント保存
  - モデル成果物
  - ユーザー要求
  - ゲートウェイ / 負荷分散
  - モデルサービングラック
  - 高帯域メモリ
  - 検索 / ベクトルDB
  - 応答エッジ
- Audio briefing segments:
  - 両方を比較: 学習 AI と推論 AI はどちらもモデルを動かしますが、インフラへの負荷は大きく異なります。学習はスループットが重要で、大規模な GPU クラスターでモデル能力を作ります。推論は遅延と効率が重要で、ユーザーが待っている間に素早く応答する必要があります。つまり AI インフラは、GPU だけでなく、計算、メモリ、ネットワーク、オーケストレーション全体の再構成です。
  - 学習 AI: 学習 AI はスループット工場のようなものです。大量のデータが同期された GPU クラスターを通り、高価なアクセラレーターを高い利用率で動かすことが目標です。ボトルネックは GPU だけではありません。HBM、相互接続、チェックポイント保存、電力、冷却も重要です。
  - 推論 AI: 推論 AI はリアルタイム交通システムに近いものです。大量のユーザー要求を処理し、ルーティング、メモリアクセス、検索、モデル応答の各ステップが遅延に影響します。重要なのは、品質、コスト、応答速度のバランスです。

### 18.4 Chapter 3 Content Inventory

Chapter 3 current theme:

From Response to Action: How Agentic AI Turns Models Into Workflows

Core message:

Agentic AI is not only a model response. It turns data, documents, APIs, user requests, planning, tool calls, memory, verification, and execution into a coordinated workflow. The infrastructure question shifts from "how fast can a model answer?" toward "how reliably can a system coordinate many steps before acting?"

Current Chapter 3 interaction model:

- Default mode: Agent Overview.
- 3D model: friendly AI robot workstation scene with laptop, command window, workflow card, task-running card, and sub-agent pods.
- Main robot: humanoid and cute, with body and hands, simplified face, and no glasses.
- Laptop and command window: replace the earlier bottom hardware Infrastructure Base as the primary visual metaphor for execution infrastructure.
- Workflow card: shows how the agent turns work into connected steps.
- Task Running card: shows execution progress and a check icon; three sub-agent pods behind it communicate independent division of work.
- Four capability labels sit below the laptop: Autonomous Planning, Tool Use, Memory Management, Continuous Execution.
- Insight panel: available like Chapter 1, with the visual heading pattern `{mode name} + Insight`.
- Audio briefing: compact player, no autoplay, transcript collapsed by default.
- Audio transcript source file: `docs/chapter3-audio-transcripts.md`.

Current Chapter 3 value-chain framing:

- Model and agent platforms: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private), Cohere (private).
- Enterprise workflow and tools: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitHub via Microsoft (MSFT), GitLab (GTLB).
- Cloud and inference platforms: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET).
- CPU and orchestration silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL).
- GPU inference and accelerators: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN).
- Data, retrieval, and memory: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS).
- Observability, security, and governance: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA).

#### English (en)

- Title: From Response to Action: How Agentic AI Turns Models Into Workflows
- Intro: Explore how agentic AI receives data, reasons, plans, acts, and depends on orchestration infrastructure beneath the model.
- Mode labels:
  - Agent Overview
  - Agent Core
  - Infrastructure View
- Agent Overview signal: Agentic AI moves from answering prompts toward coordinating data, tools, and business actions.
- Agent Core signal: The agent core translates raw context into structured steps before it calls models, tools, memory, or external systems.
- Infrastructure View signal: Behind the friendly agent is a control layer that routes model calls, retrieval, tools, memory, and verification under a latency budget.
- 3D node labels:
  - AI Agent
  - Laptop
  - Command Window
  - Workflow
  - Task Running
  - Autonomous Planning
  - Tool Use
  - Memory Management
  - Continuous Execution
- Audio briefing segments:
  - Agent Overview: Agentic AI is not just about answering prompts. It turns data, documents, APIs, and user requests into workflows that can act. The value chain expands from model platforms to enterprise tools, cloud services, and inference infrastructure.
  - Agent Core: The agent core turns context into action. It perceives inputs, reasons about intent, plans the task, and calls tools to execute. The key question is not only whether the model is smart, but whether each step can be authorized, tracked, verified, and completed safely.
  - Infrastructure View: Behind the agent is a coordination layer. CPUs manage the control flow, GPUs run inference, memory and retrieval provide context, and networks keep the workflow reliable. As agents perform more steps, bottlenecks expand beyond GPUs into CPU orchestration, memory, storage, networking, and latency.

#### Traditional Chinese (zh)

- Title: 從回應到行動：Agentic AI 如何把模型變成工作流
- Intro: 透過 3D Agent 拆解圖，理解 Agentic AI 如何接收資料、推理、規劃、執行，並依賴模型下方的協調基礎設施。
- Mode labels:
  - Agent 總覽
  - Agent Core
  - 基礎設施視圖
- Agent 總覽 signal: Agentic AI 從回答問題，走向協調資料、工具與商業行動。
- Agent Core signal: Agent Core 會先把外部情境轉成可執行步驟，再呼叫模型、工具、記憶與外部系統。
- 基礎設施視圖 signal: 友善的 Agent 背後，是一層負責模型呼叫、檢索、工具、記憶與驗證的控制系統。
- 3D node labels:
  - AI Agent
  - 筆記型電腦
  - 指令視窗
  - 工作流
  - 任務執行中
  - 自主規劃
  - 工具調用
  - 記憶管理
  - 持續執行
- Audio briefing segments:
  - Agent 總覽: Agentic AI 不只是回答問題，而是開始把資料、文件、API 和使用者指令，串成可以執行的工作流。它把模型能力變成自動化、決策、行動與協作。價值鏈角色也因此擴大，從模型平台、企業工具，到雲端與推論平台都會參與其中。
  - Agent Core: Agent Core 是代理式 AI 的核心。它先感知外部資訊，再推理使用者意圖，接著規劃任務，最後呼叫工具去執行。真正的關鍵，不只是模型聰不聰明，而是每一步能不能被授權、追蹤、驗證，並安全完成。
  - 基礎設施視圖: 在 Agent 背後，是一整套協調基礎設施。CPU 負責控制流程，GPU 負責模型推論，記憶體與檢索系統提供上下文，網路與可觀測性維持穩定。當 Agent 開始多步驟執行，瓶頸會從 GPU 擴展到 CPU、記憶體、儲存、網路與延遲。

#### Korean (ko)

- Title: 응답에서 행동으로: Agentic AI는 모델을 워크플로로 바꾼다
- Intro: 3D 에이전트 분해도로 Agentic AI가 데이터를 받고, 추론하고, 계획하고, 실행하며, 아래의 조정 인프라에 의존하는 방식을 보여줍니다.
- 3D node labels:
  - AI 에이전트
  - 노트북
  - 명령 창
  - 워크플로
  - 작업 실행 중
  - 자율 계획
  - 도구 호출
  - 메모리 관리
  - 지속 실행
- Audio briefing segments:
  - Agent Overview: Agentic AI는 단순히 질문에 답하는 것이 아닙니다. 데이터, 문서, API, 사용자 요청을 실행 가능한 워크플로로 바꿉니다. 그래서 가치사슬은 모델 플랫폼을 넘어 기업 도구, 클라우드 서비스, 추론 인프라까지 확장됩니다.
  - Agent Core: Agent Core는 맥락을 행동으로 바꾸는 중심입니다. 입력을 감지하고, 의도를 해석하고, 작업을 계획한 뒤, 도구를 호출해 실행합니다. 중요한 것은 모델의 성능뿐 아니라, 각 단계가 승인되고, 추적되고, 검증되며, 안전하게 완료될 수 있는지입니다.
  - Infrastructure View: Agent 뒤에는 조정 인프라가 있습니다. CPU는 흐름을 제어하고, GPU는 추론을 수행하며, 메모리와 검색 시스템은 맥락을 제공합니다. Agent가 여러 단계를 수행할수록 병목은 GPU를 넘어 CPU 조정, 메모리, 저장장치, 네트워크, 지연시간으로 확장됩니다.

#### Japanese (ja)

- Title: 応答から行動へ：Agentic AI はモデルをワークフローへ変える
- Intro: 3D エージェント分解図で、Agentic AI がデータを受け取り、推論し、計画し、実行し、下層の調整インフラに依存する仕組みを示します。
- 3D node labels:
  - AI エージェント
  - ノートPC
  - コマンド画面
  - ワークフロー
  - タスク実行中
  - 自律計画
  - ツール呼び出し
  - メモリ管理
  - 継続実行
- Audio briefing segments:
  - Agent Overview: Agentic AI は、ただ質問に答えるだけではありません。データ、文書、API、ユーザーの依頼を、実行できるワークフローへ変えます。そのため価値チェーンは、モデル基盤から企業ツール、クラウド、推論インフラへ広がります。
  - Agent Core: Agent Core は、文脈を行動に変える中核です。入力を受け取り、意図を理解し、作業を計画し、ツールを呼び出して実行します。重要なのはモデルの賢さだけでなく、各ステップを承認、追跡、検証し、安全に完了できるかです。
  - Infrastructure View: Agent の背後には、全体を調整するインフラがあります。CPU は制御を担当し、GPU は推論を実行し、メモリと検索システムが文脈を支えます。Agent が多段階で動くほど、ボトルネックは GPU だけでなく、CPU、メモリ、ストレージ、ネットワーク、遅延へ広がります。
