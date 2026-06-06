import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const tauriLib = fs.readFileSync(path.resolve(projectRoot, "..", "..", "src-tauri", "src", "lib.rs"), "utf8");

test("agent chat exposes user-selectable model routing and constraints", () => {
  assert.match(monitorShell, /modelRouteOptions/);
  assert.match(monitorShell, /constraintProfileOptions/);
  assert.match(monitorShell, /connectorPolicyOptions/);
  assert.match(monitorShell, /agent-routing-control-strip/);
  assert.match(monitorShell, /data-model-route-summary="true"/);
  assert.match(monitorShell, /resolveModelRouteDecision/);
  assert.match(monitorShell, /recommendedModelForTier/);
});

test("provider API runs persist routing and token controls", () => {
  assert.match(tauriLib, /model_route_id: String/);
  assert.match(tauriLib, /constraint_profile_id: String/);
  assert.match(tauriLib, /connector_policy_id: String/);
  assert.match(tauriLib, /max_output_tokens: Option<u64>/);
  assert.match(tauriLib, /normalize_provider_task_output_tokens/);
  assert.match(tauriLib, /estimate_text_tokens/);
  assert.match(tauriLib, /"model_route_id": report\.model_route_id\.clone\(\)/);
  assert.match(tauriLib, /"max_output_tokens": report\.max_output_tokens/);
});

test("routing controls have responsive layout rules", () => {
  assert.match(css, /\.agent-routing-control-strip \{/);
  assert.match(css, /\.agent-route-summary \{/);
  assert.match(css, /\.agent-route-summary\.premium/);
  assert.match(css, /\.agent-route-summary\.small/);
  assert.match(css, /@media \(max-width: 1080px\)[\s\S]*?\.agent-routing-control-strip/);
  assert.match(css, /@media \(max-width: 960px\)[\s\S]*?\.agent-routing-control-strip/);
  assert.ok(
    (css.match(/\.agent-routing-control-strip/g) ?? []).length >= 3,
    "routing controls should keep base and responsive layout coverage",
  );
});
