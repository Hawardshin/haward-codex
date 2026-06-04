import { chromium } from "@playwright/test";

const targetUrl = process.argv.find((argument) => /^https?:\/\//.test(argument)) || "http://127.0.0.1:3348/#section-overview";
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sections = ["overview", "agents", "desktop", "source", "tools"];
const sampleLimit = 67;
const buttonSelector = "button:not(:disabled), [role='button'], summary, a[href]";

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
    { timeout: 15_000 }
  );
  await page.waitForSelector(".desktop-viewport[data-section-content-ready='true']", { timeout: 15_000 });
}

async function openSection(page, section) {
  await page.locator(`[data-section-id="${section}"]`).click();
  await page.waitForFunction(
    (targetSection) => {
      const viewport = document.querySelector(".desktop-viewport");
      return (
        viewport?.getAttribute("data-active-section") === targetSection &&
        viewport?.getAttribute("data-section-content-ready") === "true"
      );
    },
    section,
    { timeout: 15_000 }
  );
}

async function collectSyntheticPressSamples(page, section, remaining) {
  return page.evaluate(
    async ({ buttonSelector: selector, remainingCount, sectionId }) => {
      const visibleElements = Array.from(document.querySelectorAll(selector)).filter((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          rect.width >= 16 &&
          rect.height >= 16 &&
          rect.bottom > 0 &&
          rect.right > 0 &&
          rect.top < window.innerHeight &&
          rect.left < window.innerWidth &&
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          style.pointerEvents !== "none"
        );
      });
      const selected = visibleElements.slice(0, remainingCount);
      const results = [];
      for (const [index, element] of selected.entries()) {
        element.setAttribute("data-button-audit-id", `${sectionId}-${index}`);
        element.removeAttribute("data-instant-button-feedback");
        element.removeAttribute("data-instant-button-painted");
        const start = performance.now();
        element.dispatchEvent(
          new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true,
            button: 0,
            buttons: 1
          })
        );
        const feedbackMs =
          element.getAttribute("data-instant-button-feedback") === "active" ? performance.now() - start : null;
        let paintedMs = null;
        for (let frame = 0; frame < 6; frame += 1) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
          if (element.getAttribute("data-instant-button-painted") === "true") {
            paintedMs = performance.now() - start;
            break;
          }
        }
        element.dispatchEvent(
          new PointerEvent("pointerup", {
            bubbles: true,
            cancelable: true,
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true,
            button: 0,
            buttons: 0
          })
        );
        results.push({
          section: sectionId,
          label: (element.textContent || element.getAttribute("aria-label") || element.getAttribute("title") || "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 80),
          tagName: element.tagName.toLowerCase(),
          feedbackActive: feedbackMs !== null,
          feedbackMs,
          painted: paintedMs !== null,
          paintedMs
        });
      }
      return results;
    },
    { buttonSelector, remainingCount: remaining, sectionId: section }
  );
}

async function measureRealClickFeedback(page, selector, label, settleSection) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: "visible", timeout: 10_000 });
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error(`No bounding box for ${label}`);
  }
  const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await page.mouse.move(center.x, center.y);
  const start = await page.evaluate(() => performance.now());
  await page.mouse.down();
  await page.waitForFunction(
    (targetSelector) => document.querySelector(targetSelector)?.getAttribute("data-instant-button-feedback") === "active",
    selector,
    { timeout: 2_000 }
  );
  const feedbackMs = await page.evaluate((startedAt) => performance.now() - startedAt, start);
  await page.mouse.up();
  if (settleSection) {
    await page.waitForFunction(
      (targetSection) => {
        const viewport = document.querySelector(".desktop-viewport");
        return (
          viewport?.getAttribute("data-active-section") === targetSection &&
          viewport?.getAttribute("data-section-content-ready") === "true"
        );
      },
      settleSection,
      { timeout: 15_000 }
    );
  }
  return { label, selector, feedbackMs: round(feedbackMs) };
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

const syntheticResults = [];
for (const section of sections) {
  await openSection(page, section);
  syntheticResults.push(...(await collectSyntheticPressSamples(page, section, sampleLimit - syntheticResults.length)));
  if (syntheticResults.length >= sampleLimit) {
    break;
  }
}

await openSection(page, "overview");
const realClickResults = [];
for (const section of ["agents", "desktop", "source", "tools", "overview"]) {
  realClickResults.push(await measureRealClickFeedback(page, `[data-section-id="${section}"]`, `nav:${section}`, section));
}

const syntheticFeedbackTimes = syntheticResults
  .map((result) => result.feedbackMs)
  .filter((value) => typeof value === "number");
const syntheticPaintedTimes = syntheticResults
  .map((result) => result.paintedMs)
  .filter((value) => typeof value === "number");
const realClickTimes = realClickResults.map((result) => result.feedbackMs);
const failedFeedback = syntheticResults.filter((result) => !result.feedbackActive);

const summary = {
  targetUrl,
  viewport: "1280x820",
  cpuThrottle: 6,
  syntheticSampleCount: syntheticResults.length,
  syntheticFeedbackAverageMs: round(
    syntheticFeedbackTimes.reduce((total, value) => total + value, 0) / syntheticFeedbackTimes.length
  ),
  syntheticFeedbackP95Ms: round(percentile(syntheticFeedbackTimes, 0.95)),
  syntheticPaintedP95Ms: round(percentile(syntheticPaintedTimes, 0.95)),
  realClickFeedbackAverageMs: round(realClickTimes.reduce((total, value) => total + value, 0) / realClickTimes.length),
  realClickFeedbackP95Ms: round(percentile(realClickTimes, 0.95)),
  failedFeedbackCount: failedFeedback.length,
  realClickResults,
  slowestSyntheticSamples: [...syntheticResults]
    .sort((left, right) => (right.feedbackMs ?? 0) - (left.feedbackMs ?? 0))
    .slice(0, 8)
    .map((result) => ({
      section: result.section,
      label: result.label,
      feedbackMs: round(result.feedbackMs ?? 0),
      paintedMs: result.paintedMs === null ? null : round(result.paintedMs)
    }))
};

await browser.close();

console.log(JSON.stringify(summary, null, 2));

if (
  summary.syntheticSampleCount < sampleLimit ||
  summary.failedFeedbackCount > 0 ||
  summary.syntheticFeedbackP95Ms > 60 ||
  summary.realClickFeedbackP95Ms > 60
) {
  process.exitCode = 1;
}
