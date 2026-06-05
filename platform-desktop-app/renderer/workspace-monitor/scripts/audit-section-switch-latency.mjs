import { chromium } from "@playwright/test";

const targetUrl = process.argv.find((argument) => /^https?:\/\//.test(argument)) || "http://127.0.0.1:3348/#section-overview";
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const preferredSections = ["agents", "desktop", "source", "tools", "history", "documents", "overview"];
const maxResidentPanels = 5;
const maxMountedPanels = 5;
const maxP95SettleMs = 1400;

function percentile(values, ratio) {
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);
  return sorted[index] ?? 0;
}

function round(value) {
  return Math.round(value * 10) / 10;
}

async function waitForMonitorReady(page) {
  await page.waitForFunction(
    () =>
      Boolean(document.querySelector(".desktop-viewport")) &&
      Boolean(document.querySelector("[data-section-id='overview']")),
    { timeout: 20_000 }
  );
  await page.waitForSelector(".desktop-viewport[data-section-content-ready='true']", { timeout: 20_000 });
}

async function openSection(page, section) {
  const startedAt = await page.evaluate(() => performance.now());
  await page.locator(`[data-section-id="${section}"]`).click();
  await page.waitForFunction(
    (targetSection) => {
      const viewport = document.querySelector(".desktop-viewport");
      const activePanel = document.querySelector(`[data-mounted-section="${targetSection}"][data-section-visible="true"]`);
      return (
        viewport?.getAttribute("data-active-section") === targetSection &&
        viewport?.getAttribute("data-section-content-ready") === "true" &&
        Boolean(activePanel)
      );
    },
    section,
    { timeout: 20_000 }
  );
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const endedAt = await page.evaluate(() => performance.now());
  const counts = await page.evaluate(() => {
    const viewport = document.querySelector(".desktop-viewport");
    return {
      residentCount: Number(viewport?.getAttribute("data-resident-section-count") || 0),
      residentLimit: Number(viewport?.getAttribute("data-resident-section-limit") || 0),
      mountedPanelCount: document.querySelectorAll("[data-mounted-section]").length
    };
  });
  return {
    section,
    settleMs: round(endedAt - startedAt),
    ...counts
  };
}

const browser = await chromium.launch({
  executablePath: chromeExecutable,
  headless: true
});
const context = await browser.newContext({ viewport: { width: 1280, height: 820 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });

await page.goto(targetUrl, { waitUntil: "load" });
await waitForMonitorReady(page);

const availableSections = await page.evaluate(() =>
  Array.from(document.querySelectorAll("[data-section-id]"))
    .map((element) => element.getAttribute("data-section-id"))
    .filter(Boolean)
);
const sections = preferredSections.filter((section) => availableSections.includes(section));
if (sections.length < 2) {
  throw new Error(`Not enough visible monitor sections to audit. Visible: ${availableSections.join(", ") || "none"}`);
}

const samples = [];
for (const section of sections) {
  samples.push(await openSection(page, section));
}

await browser.close();

const settleTimes = samples.map((sample) => sample.settleMs);
const summary = {
  targetUrl,
  viewport: "1280x820",
  cpuThrottle: 6,
  maxResidentPanels,
  maxMountedPanels,
  maxP95SettleMs,
  settleAverageMs: round(settleTimes.reduce((total, value) => total + value, 0) / settleTimes.length),
  settleP95Ms: round(percentile(settleTimes, 0.95)),
  maxObservedResidentCount: Math.max(...samples.map((sample) => sample.residentCount)),
  maxObservedMountedPanelCount: Math.max(...samples.map((sample) => sample.mountedPanelCount)),
  samples
};

console.log(JSON.stringify(summary, null, 2));

if (
  summary.maxObservedResidentCount > maxResidentPanels ||
  summary.maxObservedMountedPanelCount > maxMountedPanels ||
  summary.settleP95Ms > maxP95SettleMs
) {
  process.exitCode = 1;
}
