# Chapter 2 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable Chapter 2 experience for "From GPU Training to Inference" inside the existing static Three.js app.

**Architecture:** Keep the current static app structure and add Chapter 2 as a second scene state, with separate chapter controls, workload mode controls, localized content data, 3D workload nodes, insight cards, and a compact audio-briefing UI. Avoid a large file split in this iteration so the deployed Chapter 1 behavior remains easy to compare.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Three.js, Playwright smoke test.

---

### Task 1: Add Chapter 2 Smoke Test

**Files:**
- Create: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/tests/chapter2-smoke.mjs`

- [ ] **Step 1: Write failing test**

Create a Playwright smoke test that loads the local page, clicks Chapter 2, verifies Compare mode is default, verifies the right panel remains hidden until interaction, verifies the audio dock is compact, and checks Chinese/Korean/Japanese title switching.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
NODE_PATH=/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/chapter2-smoke.mjs
```

Expected: FAIL because Chapter 2 controls do not exist yet.

### Task 2: Add Chapter 2 UI Shell

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/index.html`
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/styles.css`

- [ ] **Step 1: Add chapter tabs, workload mode list, compact audio dock, and collapsed transcript placeholder**
- [ ] **Step 2: Style the new controls so they follow the current compact desktop layout and do not crowd the 3D stage**

### Task 3: Add Chapter 2 Content And State

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Add localized Chapter 2 content for English, Traditional Chinese, Korean, and Japanese**
- [ ] **Step 2: Add chapter state, workload mode state, and UI render functions**
- [ ] **Step 3: Preserve Chapter 1 default behavior and allow switching between chapters**

### Task 4: Add Chapter 2 Three.js Workload Model

**Files:**
- Modify: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Add a separate Chapter 2 root group**
- [ ] **Step 2: Create training lane nodes and inference lane nodes**
- [ ] **Step 3: Add distinct training and inference flow animations**
- [ ] **Step 4: Map 3D clicks to workload node focus, insight reveal, and audio segment labels**

### Task 5: Verify And Polish

**Files:**
- Modify as needed: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/index.html`
- Modify as needed: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/styles.css`
- Modify as needed: `/Users/daniel/Projects/Stocks/ai-datacenter-3d/app.js`

- [ ] **Step 1: Run Chapter 2 smoke test and fix failures**
- [ ] **Step 2: Verify no JavaScript page errors**
- [ ] **Step 3: Check desktop and mobile visual layout**
- [ ] **Step 4: Summarize remaining limitations, especially real audio files**
