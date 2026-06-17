import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const url = process.env.APP_URL || "http://127.0.0.1:8123/";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
assert(!appSource.includes('"user head"'), "Inference user requests icon should not include a user head mesh.");
assert(!appSource.includes('"user body"'), "Inference user requests icon should not include a user body mesh.");
assert(appSource.includes('"notebook screen"'), "Inference user requests icon should keep a notebook screen mesh.");
assert(appSource.includes('"data volume block"'), "Training dataset icon should include many data volume blocks.");

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});

const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message || String(error)));

await page.goto(url, { waitUntil: "load", timeout: 15000 });
await page.waitForTimeout(600);

const chapter2Button = page.locator('[data-chapter="chapter2"]');
await chapter2Button.click();
await page.waitForTimeout(500);

const state = await page.evaluate(() => {
  const text = (selector) => document.querySelector(selector)?.textContent?.trim() || "";
  const exists = (selector) => Boolean(document.querySelector(selector));
  const hasClass = (selector, className) => document.querySelector(selector)?.classList.contains(className) || false;

  return {
    title: text("#pageTitle"),
    intro: text("#introText"),
    activeMode: document.querySelector(".mode-button.is-active")?.dataset.mode || "",
    rightHidden: document.querySelector("#appShell")?.classList.contains("insight-is-hidden") || false,
    audioDockVisible: !document.querySelector("#audioDock")?.hidden,
    transcriptExpanded: document.querySelector("#transcriptPanel")?.getAttribute("aria-hidden") === "false",
    modeListVisible: !document.querySelector("#modeList")?.hidden,
    layerListHidden: document.querySelector("#layerList")?.hidden || false,
    chapter2Active: hasClass('[data-chapter="chapter2"]', "is-active"),
    hasCompareButton: exists('[data-mode="compare"]'),
    audioTitle: text("#audioSegmentTitle")
  };
});

assert(state.title.includes("Training") && state.title.includes("Inference"), "Chapter 2 title should render after selecting Chapter 2.");
assert(state.activeMode === "compare", "Chapter 2 should default to Compare mode.");
assert(state.rightHidden, "Insight panel should remain hidden before Chapter 2 interaction.");
assert(state.audioDockVisible, "Compact audio dock should be visible in Chapter 2.");
assert(!state.transcriptExpanded, "Transcript should remain collapsed by default.");
assert(state.modeListVisible, "Chapter 2 workload mode controls should be visible.");
assert(state.layerListHidden, "Chapter 1 layer list should be hidden in Chapter 2.");
assert(state.chapter2Active, "Chapter 2 tab should be active.");
assert(state.hasCompareButton, "Compare mode button should exist.");
assert(state.audioTitle.length > 0, "Audio segment title should be present.");

const laneState = await page.evaluate(() => {
  const visibleLabelEls = [...document.querySelectorAll(".scene-label")]
    .filter((el) => getComputedStyle(el).display !== "none" && getComputedStyle(el).opacity !== "0")
  const visibleLabels = visibleLabelEls.map((el) => el.textContent.trim());
  const labelCenter = (text) => {
    const el = visibleLabelEls.find((item) => item.textContent.trim() === text);
    if (!el) return null;
    const box = el.getBoundingClientRect();
    return box.left + box.width / 2;
  };
  const trainingX = labelCenter("Training AI");
  const inferenceX = labelCenter("Inference AI");
  return {
    hasTrainingLane: visibleLabels.some((label) => label.includes("Training AI")),
    hasInferenceLane: visibleLabels.some((label) => label.includes("Inference AI")),
    laneDistance: trainingX !== null && inferenceX !== null ? Math.abs(inferenceX - trainingX) : 0
  };
});

assert(laneState.hasTrainingLane, "Compare mode should label the Training AI lane.");
assert(laneState.hasInferenceLane, "Compare mode should label the Inference AI lane.");
assert(laneState.laneDistance >= 340, "Compare mode should visually separate Training AI and Inference AI lanes.");

await page.click('[data-mode="training"]');
await page.waitForTimeout(400);
const trainingOnly = await page.evaluate(() => ({
  activeMode: document.querySelector(".mode-button.is-active")?.dataset.mode || "",
  visibleInferenceNodes: [...document.querySelectorAll(".scene-label")]
    .filter((el) => getComputedStyle(el).display !== "none" && getComputedStyle(el).opacity !== "0")
    .some((el) => /Gateway|Inference AI|Model serving|High Bandwidth Memory|Retrieval|Response edge|User requests/.test(el.textContent))
}));

assert(trainingOnly.activeMode === "training", "Training AI mode should be active after click.");
assert(!trainingOnly.visibleInferenceNodes, "Training AI mode should hide inference-side 3D labels.");

await page.click('[data-mode="inference"]');
await page.waitForTimeout(400);
const inferenceOnly = await page.evaluate(() => ({
  activeMode: document.querySelector(".mode-button.is-active")?.dataset.mode || "",
  labels: [...document.querySelectorAll(".scene-label")]
    .filter((el) => getComputedStyle(el).display !== "none" && getComputedStyle(el).opacity !== "0")
    .map((el) => el.textContent.trim())
}));

assert(inferenceOnly.activeMode === "inference", "Inference AI mode should be active after click.");
assert(!inferenceOnly.labels.some((label) => /Dataset|Training AI|Preprocessing|GPU training|Checkpoint|Model artifact/.test(label)), "Inference AI mode should hide training-side 3D labels.");
assert(inferenceOnly.labels.includes("User requests"), "Inference AI mode should label user requests without API wording.");
assert(inferenceOnly.labels.includes("High Bandwidth Memory"), "Inference AI mode should label High Bandwidth Memory.");
assert(!inferenceOnly.labels.includes("User/API requests"), "Inference AI mode should not show the old User/API requests label.");
assert(!inferenceOnly.labels.includes("KV cache"), "Inference AI mode should not show the old KV cache label.");

await page.click("#languageMenuButton");
await page.click('[data-lang="zh"]');
await page.waitForTimeout(200);
const zhTitle = await page.locator("#pageTitle").textContent();
assert(zhTitle.includes("訓練") && zhTitle.includes("推論"), "Chinese Chapter 2 title should be localized.");

await page.click("#languageMenuButton");
await page.click('[data-lang="ko"]');
await page.waitForTimeout(200);
const koTitle = await page.locator("#pageTitle").textContent();
assert(koTitle.includes("훈련") && koTitle.includes("추론"), "Korean Chapter 2 title should be localized.");

await page.click("#languageMenuButton");
await page.click('[data-lang="ja"]');
await page.waitForTimeout(200);
const jaTitle = await page.locator("#pageTitle").textContent();
assert(jaTitle.includes("学習") && jaTitle.includes("推論"), "Japanese Chapter 2 title should be localized.");

assert(pageErrors.length === 0, `Unexpected page errors: ${pageErrors.join("; ")}`);

await browser.close();
console.log("Chapter 2 smoke test passed.");
