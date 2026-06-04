import { chromium } from "@playwright/test";

const targetUrl = process.argv[2] || "http://127.0.0.1:3347/#section-overview";
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sections = ["agents", "desktop", "source", "tools", "overview"];

function percentile(values, ratio) {
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);
  return sorted[index] ?? 0;
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
await page.waitForSelector('.desktop-viewport[data-section-content-ready="true"]', { timeout: 15_000 });

const results = [];

for (const target of sections) {
  await page.evaluate((targetSection) => {
    const probe = {
      activeMs: null,
      readyMs: null,
      sawTransitionShell: false,
      start: 0,
      target: targetSection
    };
    window.__tabResponseProbe = probe;
    const button = document.querySelector(`[data-section-id="${targetSection}"]`);
    const observe = () => {
      const viewport = document.querySelector(".desktop-viewport");
      const active =
        viewport?.getAttribute("data-active-section") === targetSection &&
        document.querySelector(`[data-section-id="${targetSection}"]`)?.classList.contains("active");
      const ready = active && viewport?.getAttribute("data-section-content-ready") === "true";
      if (document.querySelector("[data-section-transition-shell]")) {
        probe.sawTransitionShell = true;
      }
      if (active && probe.activeMs === null) {
        probe.activeMs = performance.now() - probe.start;
      }
      if (ready && probe.readyMs === null) {
        probe.readyMs = performance.now() - probe.start;
        return;
      }
      requestAnimationFrame(observe);
    };
    button?.addEventListener(
      "pointerdown",
      () => {
        probe.start = performance.now();
        requestAnimationFrame(observe);
      },
      { once: true }
    );
  }, target);

  await page.locator(`[data-section-id="${target}"]`).click();
  await page.waitForFunction(
    () => {
      const probe = window.__tabResponseProbe;
      return Boolean(probe?.readyMs !== null);
    },
    { timeout: 15_000 }
  );
  const result = await page.evaluate(() => window.__tabResponseProbe);
  results.push(result);
}

const activeTimes = results.map((result) => result.activeMs);
const readyTimes = results.map((result) => result.readyMs);
const summary = {
  targetUrl,
  viewport: "1280x820",
  cpuThrottle: 6,
  activeAverageMs: Math.round((activeTimes.reduce((total, value) => total + value, 0) / activeTimes.length) * 10) / 10,
  activeP95Ms: Math.round(percentile(activeTimes, 0.95) * 10) / 10,
  readyAverageMs: Math.round((readyTimes.reduce((total, value) => total + value, 0) / readyTimes.length) * 10) / 10,
  readyP95Ms: Math.round(percentile(readyTimes, 0.95) * 10) / 10,
  results: results.map((result) => ({
    target: result.target,
    activeMs: Math.round(result.activeMs * 10) / 10,
    readyMs: Math.round(result.readyMs * 10) / 10,
    sawTransitionShell: result.sawTransitionShell
  }))
};

await browser.close();

console.log(JSON.stringify(summary, null, 2));
