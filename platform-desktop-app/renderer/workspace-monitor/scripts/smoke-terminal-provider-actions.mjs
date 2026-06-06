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
  process.env.TERMINAL_PROVIDER_SMOKE_SCREENSHOT ||
  path.join(repoRoot, "outputs", "workspace-monitor-terminal-provider-smoke.png");

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  throw new Error("Workspace monitor static output is missing. Run `corepack pnpm --dir platform-desktop-app run renderer:build` first.");
}

if (!fs.existsSync(developerSnapshotPath)) {
  throw new Error("Developer workspace snapshot is missing. Run `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort` first.");
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-terminal-provider-"));
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
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.addInitScript((workspacePath) => {
    const now = "2026-06-06T00:00:00.000Z";
    const providerReport = () => ({
      schemaVersion: "provider-credentials.v1",
      status: window.__smokeOpenAiConfigured ? "provider_credentials_ready" : "provider_credentials_required",
      source: "smoke_native_mock",
      credentialFilePath: `${workspacePath}/.smoke/provider-credentials.v1.json`,
      storageWarning: "Smoke mock only.",
      configuredCount: window.__smokeOpenAiConfigured ? 2 : 1,
      providers: [
        {
          providerId: "ollama",
          label: "Ollama / Local",
          authMethod: "local_http",
          envVar: "",
          defaultModel: "llama3.2",
          configured: true,
          environmentAvailable: true,
          status: "local_runtime_configured",
          accountHint: "local runtime",
          secretPreview: "no API key",
          lastUpdatedAt: now,
          storage: "local_http_runtime",
          credentialSource: "local_runtime",
          setupUrl: "https://ollama.com/download",
          loginUrl: "https://ollama.com/download",
          docsUrl: "https://docs.ollama.com/api",
          caution: "Smoke local runtime."
        },
        {
          providerId: "openai",
          label: "ChatGPT / OpenAI",
          authMethod: "api_key",
          envVar: "OPENAI_API_KEY",
          defaultModel: "gpt-5.2",
          configured: Boolean(window.__smokeOpenAiConfigured),
          environmentAvailable: false,
          status: window.__smokeOpenAiConfigured ? "configured" : "not_connected",
          accountHint: window.__smokeOpenAiConfigured ? "smoke account" : "",
          secretPreview: window.__smokeOpenAiConfigured ? "sk-...moke" : "",
          lastUpdatedAt: window.__smokeOpenAiConfigured ? now : "",
          storage: window.__smokeOpenAiConfigured ? "app_config_file" : "not_configured",
          credentialSource: window.__smokeOpenAiConfigured ? "app_config_file" : "not_configured",
          setupUrl: "https://platform.openai.com/api-keys",
          loginUrl: "https://platform.openai.com/api-keys",
          docsUrl: "https://platform.openai.com/docs/api-reference/authentication",
          caution: "Smoke OpenAI provider."
        },
        {
          providerId: "anthropic",
          label: "Claude / Anthropic",
          authMethod: "api_key",
          envVar: "ANTHROPIC_API_KEY",
          defaultModel: "claude-sonnet-4-6",
          configured: false,
          environmentAvailable: false,
          status: "not_connected",
          accountHint: "",
          secretPreview: "",
          lastUpdatedAt: "",
          storage: "not_configured",
          credentialSource: "not_configured",
          setupUrl: "https://console.anthropic.com/settings/keys",
          loginUrl: "https://claude.ai/login",
          docsUrl: "https://platform.claude.com/docs/en/api/authentication/overview",
          caution: "Smoke Anthropic provider."
        },
        {
          providerId: "google-gemini",
          label: "Gemini / Google",
          authMethod: "api_key",
          envVar: "GEMINI_API_KEY",
          defaultModel: "gemini-3.5-flash",
          configured: false,
          environmentAvailable: false,
          status: "not_connected",
          accountHint: "",
          secretPreview: "",
          lastUpdatedAt: "",
          storage: "not_configured",
          credentialSource: "not_configured",
          setupUrl: "https://aistudio.google.com/api-keys",
          loginUrl: "https://aistudio.google.com/api-keys",
          docsUrl: "https://ai.google.dev/gemini-api/docs/api-key",
          caution: "Smoke Gemini provider."
        }
      ]
    });
    const nativePtyReport = (input = "") => ({
      sessionId: "native-pty-smoke",
      label: "PTY smoke",
      command: "/bin/zsh",
      status: "running",
      exitCode: null,
      elapsedMs: 42,
      output: input ? `$ ${input}` : "native pty smoke ready\n",
      outputTruncated: false,
      workingDir: workspacePath,
      rows: 28,
      cols: 100,
      pid: 4242,
      terminalKind: "native_pty"
    });
    const desktopPreferencesReport = (preferences) => ({
      schemaVersion: "desktop-preferences.v1",
      status: "loaded",
      source: "smoke_native_mock",
      preferencesPath: `${workspacePath}/.smoke/desktop-preferences.v1.json`,
      preferences: preferences || {
        schemaVersion: "desktop-preferences.v1",
        uiLanguage: "ko",
        themeMode: "dark",
        sidebarMode: "collapsed",
        terminalDrawerOpen: false,
        runtimeInitDefaults: {
          adapterId: "codex-cli",
          sessionModeId: "platform-improvement",
          taskPipeKind: "platform_improvement_pipe",
          autoDeferQuestions: true
        },
        pinnedSections: ["overview", "desktop", "agents", "source", "eval", "history"]
      }
    });
    const resourceSnapshot = {
      status: "ready",
      schemaVersion: "desktop-resource-snapshot.v1",
      sampledAt: now,
      systemSupported: true,
      appPid: 4242,
      processName: "smoke",
      processMemoryBytes: 128000000,
      processVirtualMemoryBytes: 256000000,
      processCpuUsage: 1,
      processRunTimeSeconds: 10,
      processTaskCount: 4,
      cpuThreads: 8,
      availableParallelism: 8,
      parallelWorkers: 4,
      globalCpuUsage: 5,
      totalMemoryBytes: 16000000000,
      availableMemoryBytes: 12000000000,
      usedMemoryBytes: 4000000000,
      memoryBudgetBytes: 8000000000,
      preloadByteLimit: 128000000,
      preloadFileLimit: 512,
      preloadStrategy: "smoke",
      workspaceCache: {
        cacheStatus: "ready",
        rootPath: workspacePath,
        generatedAt: now,
        scannedEntries: 1,
        totalCount: 1,
        cachedTextFiles: 1,
        cachedBytes: 64,
        scanDurationMs: 1,
        entryBuildDurationMs: 1,
        preloadDurationMs: 1
      },
      semanticMetrics: [],
      warmupStatus: "ready",
      warmupSource: "smoke",
      warmupError: ""
    };
    const sourceCatalog = {
      status: "ready",
      source: "smoke",
      rootPath: workspacePath,
      totalCount: 0,
      returnedCount: 0,
      truncated: false,
      files: []
    };
    const workspaceWarmupReport = {
      schemaVersion: "workspace-os-resource-cache.v1",
      status: "ready",
      source: "smoke",
      rootPath: workspacePath,
      startedAt: now,
      finishedAt: now,
      cachedTextFiles: 0,
      cachedBytes: 0,
      memoryBudgetBytes: 8000000000,
      cpuThreads: 8,
      availableParallelism: 8,
      parallelWorkers: 4,
      totalMemoryBytes: 16000000000,
      availableMemoryBytes: 12000000000,
      usedMemoryBytes: 4000000000,
      scanDurationMs: 1,
      entryBuildDurationMs: 1,
      preloadDurationMs: 1,
      preloadStrategy: "smoke",
      systemSupported: true,
      error: ""
    };
    const workspacePrepareReport = {
      status: "ready",
      source: "smoke",
      schemaVersion: "workspace-os-resource-cache.v1",
      rootPath: workspacePath,
      generatedAt: now,
      scannedEntries: 0,
      totalCount: 0,
      returnedCount: 0,
      cachedTextFiles: 0,
      cachedBytes: 0,
      preloadFileLimit: 512,
      preloadByteLimit: 128000000,
      memoryBudgetBytes: 8000000000,
      cpuThreads: 8,
      availableParallelism: 8,
      parallelWorkers: 4,
      totalMemoryBytes: 16000000000,
      availableMemoryBytes: 12000000000,
      usedMemoryBytes: 4000000000,
      scanDurationMs: 1,
      entryBuildDurationMs: 1,
      preloadDurationMs: 1,
      preloadStrategy: "smoke",
      systemSupported: true,
      warmupStatus: "ready",
      truncated: false,
      catalog: sourceCatalog
    };
    const workspaceState = {
      schemaVersion: "desktop-workspace-state.v1",
      status: "ready",
      activeWorkspacePath: workspacePath,
      activeWorkspaceSource: "smoke",
      statePath: `${workspacePath}/.smoke/workspace-state.json`,
      managedWorkspaceRoot: workspacePath,
      fallbackWorkspacePath: workspacePath,
      gitAvailable: true,
      gitVersion: "git version smoke",
      repositoryUrl: "",
      lastOperation: "smoke",
      lastStatus: "ready",
      updatedAt: now,
      summary: ["smoke workspace"]
    };
    const gitStatus = {
      schemaVersion: "desktop-git-status.v1",
      status: "ready",
      workspacePath,
      gitAvailable: true,
      gitVersion: "git version smoke",
      repositoryRoot: workspacePath,
      branch: "main",
      upstream: "origin/main",
      ahead: 0,
      behind: 0,
      clean: true,
      conflicted: false,
      stagedCount: 0,
      unstagedCount: 0,
      untrackedCount: 0,
      files: [],
      remotes: [],
      history: [],
      stashes: [],
      lastCommandStatus: "ready",
      lastCommandOutput: "",
      lastCommandError: "",
      refreshedAt: now,
      summary: ["smoke git"]
    };

    window.__nativeCalls = [];
    window.__smokeOpenAiConfigured = false;
    window.__TAURI__ = {
      core: {
        invoke: async (command, args = {}) => {
          window.__nativeCalls.push({ command, args });
          switch (command) {
            case "get_desktop_preferences":
              return desktopPreferencesReport();
            case "save_desktop_preferences":
              return desktopPreferencesReport(args.preferences);
            case "list_provider_credentials":
              return providerReport();
            case "list_provider_models":
              return {
                providerId: args.providerId || "openai",
                providerLabel: args.providerId || "OpenAI",
                status: "default_models",
                source: "smoke",
                defaultModel: args.providerId === "google-gemini" ? "gemini-3.5-flash" : "gpt-5.2",
                models: [],
                error: null
              };
            case "save_provider_credential":
              window.__smokeOpenAiConfigured = args.input?.providerId === "openai" || window.__smokeOpenAiConfigured;
              return providerReport();
            case "open_provider_auth_url":
              return {
                providerId: args.providerId,
                purpose: args.purpose || "setup",
                url: args.providerId === "google-gemini" ? "https://aistudio.google.com/api-keys" : "https://platform.openai.com/api-keys",
                status: "opened"
              };
            case "read_system_clipboard_text":
              return { status: "read", text: "echo native clipboard smoke\n", textLength: 28 };
            case "write_system_clipboard_text":
              return { status: "written", text: "", textLength: String(args.text || "").length };
            case "start_native_pty_terminal":
              return nativePtyReport();
            case "poll_native_pty_terminal_session":
              return nativePtyReport();
            case "write_native_pty_terminal_input":
              return nativePtyReport(args.input || "");
            case "resize_native_pty_terminal":
              return nativePtyReport();
            case "cancel_native_pty_terminal":
              return { ...nativePtyReport(), status: "canceled", exitCode: 0 };
            case "list_native_pty_terminal_sessions":
            case "list_cli_adapter_sessions":
            case "list_cli_task_run_records":
              return [];
            case "list_cli_adapters":
              return [
                { adapterId: "codex-cli", label: "Codex CLI", command: "codex", available: true, resolvedPath: "/usr/local/bin/codex", version: "smoke" }
              ];
            case "list_cli_task_pipeline_presets":
              return [
                {
                  taskKind: "platform_improvement_pipe",
                  label: "Platform improvement",
                  intent: "Smoke preset",
                  laneCount: 1,
                  adapterIds: ["codex-cli"],
                  mergeGate: "manual"
                }
              ];
            case "list_human_decision_inbox":
              return { status: "loaded", totalCount: 0, openCount: 0, answeredCount: 0, decisions: [], updatedId: null };
            case "list_runtime_data_roots":
              return { status: "ready", roots: [], taskRunStorePath: "", supportBundleStorePath: "", installerPayloadAuditPath: "" };
            case "get_accumulated_data_overview":
              return {
                schemaVersion: "accumulated-data-overview.v1",
                storageFormatVersion: "1",
                status: "ready",
                generatedAt: now,
                indexPath: "",
                formatMigrationStatus: "ready",
                totalRecords: 0,
                totalBytes: 0,
                boundedScanMaxFiles: 0,
                stores: [],
                summary: []
              };
            case "get_service_readiness_report":
              return {
                status: "ready",
                releaseLane: "internal",
                score: 100,
                generatedAt: now,
                groups: [],
                blockers: [],
                publicBlockers: [],
                warnings: [],
                nextActions: [],
                payloadAuditPath: "",
                payloadFlaggedCount: 0,
                serviceClaim: "smoke"
              };
            case "get_desktop_workspace_state":
              return workspaceState;
            case "get_desktop_git_status":
              return gitStatus;
            case "get_desktop_resource_snapshot":
              return resourceSnapshot;
            case "warm_workspace_os_resources":
              return workspaceWarmupReport;
            case "prepare_workspace_os_resources":
              return workspacePrepareReport;
            case "app_health":
              return { status: "ok", shell: "tauri-smoke", uiSource: "static" };
            default:
              return {};
          }
        }
      }
    };
  }, repoRoot);

  await page.goto(`http://127.0.0.1:${port}/?section=desktop#desktop`, { waitUntil: "networkidle" });
  await page.waitForSelector(".desktop-viewport[data-active-section='desktop']", { timeout: 20_000 });

  await page.locator(".activity-settings[aria-label='설정'], .activity-settings[aria-label='Settings']").last().click();
  await page.getByRole("button", { name: /핵심 설정|Core Setup/ }).first().click();
  await page.getByRole("tab", { name: /계정 연결|Provider accounts/ }).click();
  await page.waitForSelector("[data-provider-login-fast-lane]", { timeout: 10_000 });

  await page.locator("[data-provider-login-card='openai'] .provider-login-card-actions button").first().click();
  await page.locator("[data-provider-account-row='openai'] input[type='password']").fill("sk-smoke-native-action");
  await page.locator("[data-provider-account-row='openai'] .provider-account-actions button", { hasText: /저장|Save/ }).click();
  await page.waitForSelector("[data-provider-account-row='openai'].connected", { timeout: 10_000 });
  await page.locator(".settings-dialog header button").click();

  await page.locator(".terminal-drawer-launcher").click();
  await page.getByRole("tab", { name: /PTY/ }).click();
  await page.locator(".native-pty-placeholder button").click();
  await page.waitForSelector(".native-pty-terminal-shell", { timeout: 10_000 });
  await page.locator("[data-terminal-action='paste']").click();

  const calls = await page.evaluate(() => window.__nativeCalls || []);
  const commandNames = calls.map((call) => call.command);

  assert.ok(commandNames.includes("open_provider_auth_url"), "provider login action should invoke native URL opener command");
  assert.ok(commandNames.includes("save_provider_credential"), "provider save action should invoke native credential command");
  assert.ok(commandNames.includes("start_native_pty_terminal"), "PTY start action should invoke native PTY command");
  assert.ok(commandNames.includes("read_system_clipboard_text"), "terminal paste should read native clipboard text first");
  assert.ok(commandNames.includes("write_native_pty_terminal_input"), "terminal paste should write clipboard text into PTY");
  assert.deepEqual(pageErrors, [], "terminal/provider action smoke should not emit page errors");

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: false });

  console.log(
    JSON.stringify(
      {
        status: "terminal_provider_actions_smoke_ok",
        url: page.url(),
        commandNames,
        screenshotPath,
        consoleErrors,
        pageErrors
      },
      null,
      2
    )
  );
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
