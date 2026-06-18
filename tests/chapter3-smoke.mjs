import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const url = process.env.APP_URL || "http://127.0.0.1:8123/";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});

const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(String(error.message || error)));

await page.goto(url, { waitUntil: "load", timeout: 15000 });
await page.waitForTimeout(1000);
await page.click('[data-chapter="chapter3"]');
await page.waitForTimeout(900);

const state = await page.evaluate(() => ({
  title: document.querySelector("#pageTitle")?.textContent?.trim() || "",
  intro: document.querySelector("#introText")?.textContent?.trim() || "",
  activeChapter: document.querySelector(".chapter-button.is-active")?.dataset.chapter || "",
  activeMode: document.querySelector(".mode-button.is-active")?.dataset.mode || "",
  modeLabels: [...document.querySelectorAll(".mode-title")].map((item) => item.textContent.trim()),
  audioDockVisible: !document.querySelector("#audioDock")?.hidden,
  transcriptCollapsed: document.querySelector("#transcriptPanel")?.getAttribute("aria-hidden") === "true",
  rightHidden: document.querySelector("#rightPanel")?.getAttribute("aria-hidden") === "true",
  audioTitle: document.querySelector("#audioSegmentTitle")?.textContent?.trim() || ""
}));

assert(state.activeChapter === "chapter3", "Chapter 3 tab should be active.");
assert(state.title.includes("Response") && state.title.includes("Action"), "Chapter 3 title should render.");
assert(state.intro.includes("agent") || state.intro.includes("Agentic"), "Chapter 3 intro should render.");
assert(state.activeMode === "overview", "Chapter 3 should default to Agent Overview mode.");
assert(state.modeLabels.includes("Agent Overview"), "Agent Overview mode should exist.");
assert(state.modeLabels.includes("Agent Core"), "Agent Core mode should exist.");
assert(state.modeLabels.includes("Infrastructure View"), "Infrastructure View mode should exist.");
assert(state.audioDockVisible, "Audio dock should be visible in Chapter 3.");
assert(state.transcriptCollapsed, "Transcript should be collapsed by default.");
assert(state.rightHidden, "Insight panel should stay hidden before interaction.");
assert(state.audioTitle.includes("Agentic AI") || state.audioTitle.includes("workflow"), "Audio title should describe Chapter 3.");

await page.click('[data-mode="infrastructure"]');
await page.waitForTimeout(600);
const insightState = await page.evaluate(() => ({
  activeMode: document.querySelector(".mode-button.is-active")?.dataset.mode || "",
  rightHidden: document.querySelector("#rightPanel")?.getAttribute("aria-hidden") === "true",
  riskHeading: document.querySelector("#riskHeading")?.textContent?.trim() || "",
  labels: [...document.querySelectorAll(".scene-label")]
    .filter((el) => getComputedStyle(el).display !== "none" && getComputedStyle(el).opacity !== "0")
    .map((el) => el.textContent.trim())
}));

assert(insightState.activeMode === "infrastructure", "Infrastructure mode should become active.");
assert(!insightState.rightHidden, "Insight panel should reveal after selecting a Chapter 3 mode.");
assert(/Key finding|關鍵|핵심|重要/.test(insightState.riskHeading), "Key finding heading should render.");
assert(insightState.labels.some((label) => /Laptop|Command Window|Agent|Workflow|Task Running|工作流|任務執行中/.test(label)), "Chapter 3 scene labels should render.");

await page.click("#analysisOpen");
await page.waitForTimeout(300);
const analysisState = await page.evaluate(() => ({
  hidden: document.querySelector("#analysisDrawer")?.hidden || false,
  supplierHeading: document.querySelector("#analysisSupplierHeading")?.textContent?.trim() || "",
  supplierText: document.querySelector("#analysisSupplierList")?.textContent || ""
}));

assert(!analysisState.hidden, "Full analysis drawer should open.");
assert(/Value-chain|價值鏈|가치사슬|バリューチェーン/i.test(analysisState.supplierHeading), "Value-chain role heading should render in full analysis.");
assert(/Intel|AMD|NVDA|Microsoft|MSFT|Snowflake|Datadog/.test(analysisState.supplierText), "Company and ticker examples should render in full analysis.");

await page.click("#analysisClose");
await page.waitForTimeout(250);
await page.click("#languageMenuButton");
await page.click('[data-lang="zh"]');
await page.waitForTimeout(300);
const zhState = await page.evaluate(() => ({
  title: document.querySelector("#pageTitle")?.textContent?.trim() || "",
  audioTitle: document.querySelector("#audioSegmentTitle")?.textContent?.trim() || ""
}));

assert(zhState.title.includes("回應") && zhState.title.includes("行動"), "Chinese Chapter 3 title should be localized.");
assert(zhState.audioTitle.length > 0, "Chinese audio title should update.");
assert(pageErrors.length === 0, `Unexpected page errors: ${pageErrors.join("; ")}`);

await browser.close();
console.log("Chapter 3 smoke test passed.");
