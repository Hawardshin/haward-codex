import { chromium } from "@playwright/test";

const targetUrl = process.argv.find((argument) => /^https?:\/\//.test(argument)) || "http://127.0.0.1:4182/#section-overview";
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const primarySections = ["overview", "agents", "tools", "desktop", "source", "intent"];
const operatorSections = [
  { label: "프로젝트", section: "projects" },
  { label: "구조", section: "structure" },
  { label: "작업 기록", section: "history" },
  { label: "문서", section: "documents" },
  { label: "요구사항", section: "requirements" }
];

async function waitReady(page, section) {
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

async function openPrimarySection(page, section) {
  await page.locator(`[data-section-id="${section}"]`).click({ force: true });
  await waitReady(page, section);
}

async function openOperatorSection(page, target) {
  await page.locator('button[aria-label="운영 센터 열기"]').first().click({ force: true });
  await page.waitForSelector(".operator-center-dialog", { timeout: 5_000 });
  const clicked = await page.evaluate((label) => {
    const card = Array.from(document.querySelectorAll(".operator-section-card")).find(
      (item) => item.querySelector("strong")?.textContent?.trim() === label
    );
    if (!card) {
      return false;
    }
    card.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    return true;
  }, target.label);
  if (!clicked) {
    throw new Error(`Operator Center section was not found: ${target.label}`);
  }
  await waitReady(page, target.section);
}

async function inspectSurface(page, label) {
  return page.evaluate((surfaceLabel) => {
    const viewport = document.querySelector(".desktop-viewport");
    const root = document.querySelector(".desktop-app-root");
    const rootRect = root?.getBoundingClientRect();
    const horizontalOverflow = Math.max(
      document.documentElement.scrollWidth - window.innerWidth,
      document.body.scrollWidth - window.innerWidth,
      root ? root.scrollWidth - Math.ceil(rootRect?.width || window.innerWidth) : 0
    );
    const visibleControls = Array.from(document.querySelectorAll('button, [role="button"], a[href], summary')).filter(
      (element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        );
      }
    );
    const undersizedControls = visibleControls
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const label = (element.textContent || element.getAttribute("aria-label") || element.getAttribute("title") || "").trim();
        return label && (rect.width < 32 || rect.height < 32);
      })
      .slice(0, 8)
      .map((element) => ({
        label: (element.textContent || element.getAttribute("aria-label") || element.getAttribute("title") || "")
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 80),
        width: Math.round(element.getBoundingClientRect().width),
        height: Math.round(element.getBoundingClientRect().height)
      }));
    const clippedControls = visibleControls
      .filter((element) => {
        const text = (element.textContent || "").trim();
        return text && (element.scrollWidth > element.clientWidth + 4 || element.scrollHeight > element.clientHeight + 4);
      })
      .slice(0, 8)
      .map((element) => ({
        label: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight
      }));
    const timelineDocs = Array.from(document.querySelectorAll(".timeline-docs")).map((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        overflowY: style.overflowY,
        overscrollBehavior: style.overscrollBehavior,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight
      };
    });
    return {
      label: surfaceLabel,
      activeSection: viewport?.getAttribute("data-active-section"),
      ready: viewport?.getAttribute("data-section-content-ready"),
      horizontalOverflow,
      visibleControls: visibleControls.length,
      undersizedControls,
      clippedControls,
      timelineDocs
    };
  }, label);
}

function collectFailures(results) {
  const failures = [];
  for (const result of results) {
    if (result.horizontalOverflow > 1) {
      failures.push(`${result.label}: horizontal overflow ${result.horizontalOverflow}`);
    }
    if (result.undersizedControls.length > 0) {
      failures.push(`${result.label}: undersized controls ${JSON.stringify(result.undersizedControls)}`);
    }
    if (result.clippedControls.length > 0) {
      failures.push(`${result.label}: clipped controls ${JSON.stringify(result.clippedControls)}`);
    }
    for (const pane of result.timelineDocs) {
      if (pane.overflowY !== "auto" || pane.overscrollBehavior !== "contain" || pane.height > 430) {
        failures.push(`${result.label}: timeline docs must be a bounded scroll pane ${JSON.stringify(pane)}`);
      }
    }
  }
  return failures;
}

const browser = await chromium.launch({ executablePath: chromeExecutable, headless: true });
const desktop = await browser.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1 });
await desktop.goto(targetUrl, { waitUntil: "load" });
await waitReady(desktop, "overview");

const results = [];
for (const section of primarySections) {
  if (section !== "overview") {
    await openPrimarySection(desktop, section);
  }
  results.push(await inspectSurface(desktop, `desktop:${section}`));
}
for (const target of operatorSections) {
  await openOperatorSection(desktop, target);
  results.push(await inspectSurface(desktop, `desktop:${target.section}`));
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
await mobile.goto(targetUrl, { waitUntil: "load" });
await waitReady(mobile, "overview");
await openOperatorSection(mobile, operatorSections[2]);
results.push(await inspectSurface(mobile, "mobile:history"));

await browser.close();

const failures = collectFailures(results);
console.log(
  JSON.stringify(
    {
      targetUrl,
      viewportCount: 2,
      surfaces: results.length,
      failures,
      results
    },
    null,
    2
  )
);
if (failures.length > 0) {
  process.exit(1);
}
