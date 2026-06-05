import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "../../..");
const outDir = path.join(projectRoot, "out");
const developerSnapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const adminHistoryIndexPath = path.join(projectRoot, "public", "admin-history-index.json");
const screenshotPath =
  process.env.SOURCE_CONTROL_SMOKE_SCREENSHOT ||
  path.join(repoRoot, "outputs", "workspace-monitor-source-controls-smoke.png");

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  throw new Error("Workspace monitor static output is missing. Run `corepack pnpm --dir platform-desktop-app run renderer:build` first.");
}

if (!fs.existsSync(developerSnapshotPath)) {
  throw new Error("Developer workspace snapshot is missing. Run `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort` first.");
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-source-controls-"));
const browser = await chromium.launch({ headless: true });
let server;

try {
  fs.cpSync(outDir, tempDir, { recursive: true });
  fs.copyFileSync(developerSnapshotPath, path.join(tempDir, "workspace-snapshot.json"));
  if (fs.existsSync(adminHistoryIndexPath)) {
    fs.copyFileSync(adminHistoryIndexPath, path.join(tempDir, "admin-history-index.json"));
  }

  server = await serveStaticDirectory(tempDir);
  const port = server.address().port;
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(`http://127.0.0.1:${port}/?section=source#source`, { waitUntil: "networkidle" });
  await page.waitForSelector(".source-file-picker-trigger", { timeout: 20_000 });

  const activeSection = await page.locator(".desktop-viewport").getAttribute("data-active-section");
  const contentReady = await page.locator(".desktop-viewport").getAttribute("data-section-content-ready");
  const sourceSelectCount = await page.locator(".native-source-controls select").count();
  const actionButtonCount = await page.locator(".source-editor-action-group [data-ui-button]").count();
  const explorerButtonCount = await page.locator(".workspace-explorer-actions [data-ui-button]").count();
  const trigger = page.locator(".source-file-picker-trigger").first();
  const triggerDisabled = await trigger.evaluate((node) => node.disabled);

  assert.equal(activeSection, "source", "source section should be active");
  assert.equal(contentReady, "true", "section content should be ready");
  assert.equal(sourceSelectCount, 0, "source workbench must not render native select controls");
  assert.equal(actionButtonCount, 4, "source action group should expose four app button primitives");
  assert.equal(explorerButtonCount, 3, "workspace explorer actions should expose three app button primitives");
  assert.equal(triggerDisabled, false, "developer snapshot should provide files so the file picker can open");

  await trigger.click();
  await page.waitForSelector(".source-file-picker-menu", { timeout: 5_000 });

  const menuCount = await page.locator(".source-file-picker-menu").count();
  const itemCount = await page.locator(".source-file-picker-item").count();
  const menuBox = await page.locator(".source-file-picker-menu").first().boundingBox();
  const triggerBox = await trigger.boundingBox();

  assert.equal(menuCount, 1, "source file picker menu should open");
  assert.ok(itemCount > 0, "source file picker menu should include file items");
  assert.ok(menuBox?.width > 320, "source file picker menu should have a usable width");
  assert.ok(menuBox?.height > 160, "source file picker menu should have a usable height");
  assert.ok(triggerBox?.height >= 40, "source file picker trigger should meet the control target size");

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: false });

  console.log(
    JSON.stringify(
      {
        status: "source_controls_playwright_ok",
        url: page.url(),
        sourceSelectCount,
        actionButtonCount,
        explorerButtonCount,
        itemCount,
        triggerBox,
        menuBox,
        screenshotPath,
        consoleErrors,
        pageErrors
      },
      null,
      2
    )
  );

  assert.deepEqual(pageErrors, [], "source controls smoke should not emit page errors");
} finally {
  await browser.close();
  await new Promise((resolve) => {
    if (!server) {
      resolve();
      return;
    }
    server.close(resolve);
  });
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function serveStaticDirectory(rootDir) {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
    const pathname = decodeURIComponent(requestUrl.pathname);
    const requestedPath = pathname === "/" ? "/index.html" : pathname;
    const filePath = path.resolve(rootDir, `.${requestedPath}`);

    const relativePath = path.relative(rootDir, filePath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentTypeForPath(filePath) });
    fs.createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function contentTypeForPath(filePath) {
  const extension = path.extname(filePath);
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".js") return "text/javascript; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".woff2") return "font/woff2";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".png") return "image/png";
  return "application/octet-stream";
}
