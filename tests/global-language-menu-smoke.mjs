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

const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message || String(error)));

await page.goto(url, { waitUntil: "load", timeout: 15000 });
await page.waitForTimeout(500);

const initial = await page.evaluate(() => ({
  globalExists: Boolean(document.querySelector("#globalLanguageMenu")),
  triggerText: document.querySelector("#languageMenuButton")?.textContent?.trim() || "",
  leftPanelHasLanguagePanel: Boolean(document.querySelector(".left-panel .language-panel")),
  languagePanelHidden: document.querySelector("#languagePanel")?.hidden || false,
  languageLabelVisible: getComputedStyle(document.querySelector("#languageLabel")).display !== "none",
  menuHidden: document.querySelector("#languageTabs")?.hidden || false
}));

assert(initial.globalExists, "Global language menu should exist.");
assert(initial.triggerText.includes("EN"), "Language trigger should show the active language.");
assert(!initial.leftPanelHasLanguagePanel, "Language selector should be removed from the left content panel.");
assert(initial.languagePanelHidden, "Language panel should be hidden by default.");
assert(!initial.languageLabelVisible, "Language label should not render as a separate box.");
assert(initial.menuHidden, "Language option list should be collapsed by default.");

await page.click("#languageMenuButton");
await page.waitForTimeout(150);
const expanded = await page.evaluate(() => ({
  languagePanelHidden: document.querySelector("#languagePanel")?.hidden || false,
  menuHidden: document.querySelector("#languageTabs")?.hidden || false,
  expanded: document.querySelector("#languageMenuButton")?.getAttribute("aria-expanded")
}));

assert(!expanded.languagePanelHidden, "Language panel should appear only after clicking the trigger.");
assert(!expanded.menuHidden, "Language options should open after clicking the trigger.");
assert(expanded.expanded === "true", "Language trigger should expose expanded state.");

await page.click('[data-lang="zh"]');
await page.waitForTimeout(250);
const afterChinese = await page.evaluate(() => ({
  title: document.querySelector("#pageTitle")?.textContent?.trim() || "",
  triggerText: document.querySelector("#languageMenuButton")?.textContent?.trim() || "",
  menuHidden: document.querySelector("#languageTabs")?.hidden || false
}));

assert(afterChinese.title.includes("AI 競賽") && afterChinese.title.includes("電網"), "Chinese language switch should update page title.");
assert(afterChinese.triggerText.includes("中文"), "Language trigger should update to the active language.");
assert(afterChinese.menuHidden, "Language options should collapse after selecting a language.");
assert(pageErrors.length === 0, `Unexpected page errors: ${pageErrors.join("; ")}`);

await browser.close();
console.log("Global language menu smoke test passed.");
