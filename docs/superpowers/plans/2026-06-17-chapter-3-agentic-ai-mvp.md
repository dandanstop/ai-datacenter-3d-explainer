# Chapter 3 Agentic AI MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Chapter 3 as an interactive 3D Agentic AI exploded-model chapter with readable insight, value-chain roles, multilingual audio/transcript support, and realistic-enough 3D component direction.

**Architecture:** Extend the current static Three.js app without restructuring the whole project. Add a separate `chapter3Root`, localized Chapter 3 content, shared mode controls, reusable audio/transcript behavior, and a Playwright smoke test. Keep Chapter 1 and Chapter 2 behavior stable.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Three.js, Playwright smoke tests.

---

### Task 1: Chapter 3 Smoke Test

**Files:**
- Create: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/tests/chapter3-smoke.mjs`

- [ ] **Step 1: Write a failing Playwright smoke test**

Test requirements:
- Page loads at `http://127.0.0.1:8123/`.
- Clicking `data-chapter="chapter3"` activates Chapter 3.
- Chapter 3 title includes `Response` and `Action`.
- Default active mode is `overview`.
- Audio dock is visible but transcript is collapsed.
- Mode controls include `Agent Overview`, `Agent Core`, and `Infrastructure View`.
- Right insight panel remains hidden until interaction.
- Value-chain role heading exists after interaction.
- Company/ticker examples appear in the value-chain list.
- Language switch to Chinese updates the Chapter 3 title.

- [ ] **Step 2: Run the test and confirm it fails before implementation**

Run:

```bash
NODE_PATH=/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/chapter3-smoke.mjs
```

Expected before implementation: failure because Chapter 3 controls do not exist.

### Task 2: Add Chapter 3 UI Entry

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/index.html`
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/styles.css`

- [ ] **Step 1: Add a third chapter button**

Add:

```html
<button class="chapter-button" type="button" data-chapter="chapter3">Chapter 3</button>
```

- [ ] **Step 2: Adjust `.chapter-tabs` to three columns**

Change:

```css
.chapter-tabs {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

### Task 3: Add Chapter 3 Content Data

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Add `chapter3Content`**

Add localized English, Traditional Chinese, Korean, and Japanese content with:
- title
- intro
- mode labels
- node labels
- insight title
- value-chain heading
- key finding heading
- audio labels
- modes: `overview`, `core`, `infrastructure`
- value-chain role examples with company names/tickers

- [ ] **Step 2: Add helper functions**

Add:
- `chapter3Copy()`
- `chapter3Mode()`
- `chapter3Node()`
- `chapter3BriefingTitle()`
- `chapter3BriefingText()`

### Task 4: Add Chapter 3 Three.js Root And Models

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Add `chapter3Root`, maps, flow lines, and particles**

Create a separate root group so Chapter 3 can be hidden independently from Chapter 1 and Chapter 2.

- [ ] **Step 2: Build realistic-enough primitive 3D models**

Create recognizable objects:
- Central AI robot with dark glass faceplate, glowing eyes, side sensor modules, chest circuit panel.
- Agent Core layers: Perceive, Reason, Plan, Act.
- Data source modules: database cylinder/storage, document stack, API gateway/cloud plug, laptop with chat bubbles.
- Multi-agent pods above the robot.
- Infrastructure Base modules: CPU chip, GPU accelerator tray, memory/retrieval stack, network switch/latency meter.
- Output modules: gear workflow, decision dashboard, command console, collaboration panel.

- [ ] **Step 3: Add animated flows**

Add particle paths:
- Inputs to Perceive.
- Agent Core sequence.
- CPU routing to GPU, memory, network.
- Act layer to outputs.
- Multi-agent delegation pulse.

### Task 5: Integrate Chapter 3 State, UI, Audio, And Insight

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Add Chapter 3 state**

Add:
- `selectedChapter3Mode = "overview"`
- `selectedChapter3Node = "overview"`
- `activeChapter3SegmentId = "overview"`

- [ ] **Step 2: Update existing UI functions**

Update:
- `updateStaticText()`
- `hydrateUi()`
- `selectChapter()`
- `updateAudioDock()`
- `activeBriefingTitle()`
- `activeBriefingText()`
- `activeAudioSource()`

- [ ] **Step 3: Add Chapter 3 insight renderer**

Add `updateChapter3Insight()` so the right panel shows:
- Eyebrow
- `Agentic AI insight`
- Short lede
- Metrics
- Value-chain role examples with company/ticker names
- Key finding

### Task 6: Verify And Polish

**Files:**
- Modify as needed:
  - `/Users/daniel/Projects/Stocks/ai-datacenter-3d/index.html`
  - `/Users/daniel/Projects/Stocks/ai-datacenter-3d/styles.css`
  - `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`
  - `/Users/daniel/Projects/Stocks/ai-datacenter-3d/tests/chapter3-smoke.mjs`

- [ ] **Step 1: Run syntax check**

Run:

```bash
/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check app.js
```

- [ ] **Step 2: Run Chapter 3 smoke test**

Run:

```bash
NODE_PATH=/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/chapter3-smoke.mjs
```

- [ ] **Step 3: Run Chapter 2 smoke test**

Run:

```bash
NODE_PATH=/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/chapter2-smoke.mjs
```

- [ ] **Step 4: Capture desktop screenshot**

Use Playwright to capture Chapter 3 overview and confirm:
- Robot is centered.
- Inputs are left.
- Outputs are right.
- Multi-agent pods are top.
- Infrastructure Base is below.
- Labels do not overlap badly.

## Self-Review

Spec coverage:
- The plan implements the approved Chapter 3 3D Agent exploded model.
- The plan preserves Chapter 1-style value-chain roles and company/ticker examples.
- The plan keeps audio/transcript behavior consistent with Chapter 1 and Chapter 2.

No placeholders remain.

Known implementation constraint:
- The current project is not a git repository, so commit steps are intentionally omitted. Verification will rely on syntax checks, Playwright smoke tests, and screenshots.
