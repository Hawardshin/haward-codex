import { chromium } from "@playwright/test";

const targetUrl = process.argv.find((argument) => /^https?:\/\//.test(argument)) || "http://127.0.0.1:3348/#section-overview";
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const preferredSections = ["agents", "desktop", "source", "tools", "history", "documents", "overview"];
const maxResidentPanels = 5;
const maxMountedPanels = 5;
const maxP95SettleMs = 1400;
const maxObservedLongTaskMs = 1500;
const maxTotalLongTaskMsPerSection = 2500;
const runs = parsePositiveIntegerArg("--runs", 1);

function parsePositiveIntegerArg(name, fallback) {
  const raw = process.argv.find((argument) => argument.startsWith(`${name}=`))?.slice(name.length + 1);
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function percentile(values, ratio) {
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);
  return sorted[index] ?? 0;
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function summarizeNumbers(values) {
  if (values.length === 0) {
    return {
      average: 0,
      max: 0,
      p95: 0
    };
  }
  return {
    average: round(values.reduce((total, value) => total + value, 0) / values.length),
    max: round(Math.max(...values)),
    p95: round(percentile(values, 0.95))
  };
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
  const longTasks = await page.evaluate(
    ({ end, start }) => {
      const entries = Array.isArray(window.__workspaceMonitorLongTasks) ? window.__workspaceMonitorLongTasks : [];
      return entries.filter((entry) => entry.startTime >= start && entry.startTime <= end + 50);
    },
    { start: startedAt, end: endedAt }
  );
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
    longTaskCount: longTasks.length,
    longTaskMaxMs: round(Math.max(0, ...longTasks.map((entry) => entry.duration))),
    longTaskTotalMs: round(longTasks.reduce((total, entry) => total + entry.duration, 0)),
    ...counts
  };
}

const browser = await chromium.launch({
  executablePath: chromeExecutable,
  headless: true
});
const context = await browser.newContext({ viewport: { width: 1280, height: 820 } });
const page = await context.newPage();
await page.addInitScript(() => {
  window.__workspaceMonitorLongTaskSupported = false;
  window.__workspaceMonitorLongTasks = [];
  const normalizeLongTask = (entry) => ({
    duration: Math.round(entry.duration * 10) / 10,
    name: entry.name,
    startTime: Math.round(entry.startTime * 10) / 10
  });
  if (typeof PerformanceObserver === "undefined" || !PerformanceObserver.supportedEntryTypes?.includes("longtask")) {
    return;
  }
  window.__workspaceMonitorLongTaskSupported = true;
  const observer = new PerformanceObserver((list) => {
    window.__workspaceMonitorLongTasks.push(...list.getEntries().map(normalizeLongTask));
  });
  observer.observe({ type: "longtask", buffered: true });
});
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
for (let runIndex = 1; runIndex <= runs; runIndex += 1) {
  for (const section of sections) {
    samples.push({
      run: runIndex,
      ...(await openSection(page, section))
    });
  }
}

const longTaskSupported = await page.evaluate(() => window.__workspaceMonitorLongTaskSupported === true);
await browser.close();

const settleTimes = samples.map((sample) => sample.settleMs);
const longTaskMaxTimes = samples.map((sample) => sample.longTaskMaxMs);
const longTaskTotalTimes = samples.map((sample) => sample.longTaskTotalMs);
const sectionStats = Object.fromEntries(
  sections.map((section) => {
    const sectionSamples = samples.filter((sample) => sample.section === section);
    return [
      section,
      {
        longTaskMax: summarizeNumbers(sectionSamples.map((sample) => sample.longTaskMaxMs)),
        longTaskTotal: summarizeNumbers(sectionSamples.map((sample) => sample.longTaskTotalMs)),
        settle: summarizeNumbers(sectionSamples.map((sample) => sample.settleMs))
      }
    ];
  })
);
const summary = {
  targetUrl,
  viewport: "1280x820",
  cpuThrottle: 6,
  runs,
  maxResidentPanels,
  maxMountedPanels,
  maxP95SettleMs,
  maxObservedLongTaskMs,
  maxTotalLongTaskMsPerSection,
  longTaskSupported,
  settleAverageMs: round(settleTimes.reduce((total, value) => total + value, 0) / settleTimes.length),
  settleP95Ms: round(percentile(settleTimes, 0.95)),
  longTaskMaxMs: round(Math.max(0, ...longTaskMaxTimes)),
  longTaskTotalP95Ms: round(percentile(longTaskTotalTimes, 0.95)),
  maxObservedResidentCount: Math.max(...samples.map((sample) => sample.residentCount)),
  maxObservedMountedPanelCount: Math.max(...samples.map((sample) => sample.mountedPanelCount)),
  sectionStats,
  samples
};

console.log(JSON.stringify(summary, null, 2));

if (
  summary.maxObservedResidentCount > maxResidentPanels ||
  summary.maxObservedMountedPanelCount > maxMountedPanels ||
  summary.settleP95Ms > maxP95SettleMs ||
  summary.longTaskMaxMs > maxObservedLongTaskMs ||
  summary.longTaskTotalP95Ms > maxTotalLongTaskMsPerSection
) {
  process.exitCode = 1;
}
