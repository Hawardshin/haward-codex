import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

test("desktop scaffold has the selected Tauri entry points", () => {
  assert.equal(existsSync(join(root, "src-tauri/tauri.conf.json")), true);
  assert.equal(existsSync(join(root, "src-tauri/src/lib.rs")), true);

  const config = readJson("src-tauri/tauri.conf.json");
  assert.equal(config.productName, "Agent Workspace Platform");
  assert.equal(config.identifier, "com.personalagentplatform.desktop");
  assert.equal(config.build.frontendDist, "../../workspace-monitor/out");
});

test("desktop registry points to macOS and Windows execution profiles", () => {
  const registry = readJson("configs/desktop-distribution-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.recommended_initial_path.id, "tauri_first_cross_platform_shell");
  assert.match(serialized, /configs\/macos-execution-profile\.json/);
  assert.match(serialized, /configs\/windows-execution-profile\.json/);
});

test("execution profiles keep optional CLI adapters non-blocking", () => {
  for (const profilePath of ["configs/macos-execution-profile.json", "configs/windows-execution-profile.json"]) {
    const profile = readJson(profilePath);
    const serialized = JSON.stringify(profile);

    assert.match(serialized, /capability_missing/);
    assert.match(serialized, /workspace/);
    assert.ok(profile.smoke_tests.length >= 5);
  }
});

