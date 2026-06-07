import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const tauriSrcRoot = path.resolve(projectRoot, "..", "..", "src-tauri", "src");

function readTauriRuntimeSource() {
  const lib = fs.readFileSync(path.join(tauriSrcRoot, "lib.rs"), "utf8");
  const partsRoot = path.join(tauriSrcRoot, "lib_parts");
  const parts = fs.existsSync(partsRoot)
    ? fs.readdirSync(partsRoot)
      .filter((file) => file.endsWith(".rs"))
      .sort()
      .map((file) => fs.readFileSync(path.join(partsRoot, file), "utf8"))
    : [];
  return [lib, ...parts].join("\n");
}

const searchAgentWorkChatPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "SearchAgentWorkChatPanel.tsx"),
  "utf8"
);
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const tauriLib = readTauriRuntimeSource();
const tauriProviders = fs.readFileSync(path.resolve(projectRoot, "..", "..", "src-tauri", "src", "features", "providers.rs"), "utf8");
const tauriRuntimeSource = `${tauriLib}\n${tauriProviders}`;

test("agent chat exposes user-selectable model routing and constraints", () => {
  assert.match(searchAgentWorkChatPanel, /modelRouteOptions/);
  assert.match(searchAgentWorkChatPanel, /constraintProfileOptions/);
  assert.match(searchAgentWorkChatPanel, /connectorPolicyOptions/);
  assert.match(searchAgentWorkChatPanel, /agent-routing-control-strip/);
  assert.match(searchAgentWorkChatPanel, /data-model-route-summary="true"/);
  assert.match(searchAgentWorkChatPanel, /resolveModelRouteDecision/);
  assert.match(searchAgentWorkChatPanel, /recommendedModelForTier/);
});

test("provider API runs persist routing and token controls", () => {
  assert.match(tauriRuntimeSource, /model_route_id: String/);
  assert.match(tauriRuntimeSource, /constraint_profile_id: String/);
  assert.match(tauriRuntimeSource, /connector_policy_id: String/);
  assert.match(tauriRuntimeSource, /max_output_tokens: Option<u64>/);
  assert.match(tauriRuntimeSource, /normalize_provider_task_output_tokens/);
  assert.match(tauriRuntimeSource, /estimate_text_tokens/);
  assert.match(tauriRuntimeSource, /"model_route_id": report\.model_route_id\.clone\(\)/);
  assert.match(tauriRuntimeSource, /"max_output_tokens": report\.max_output_tokens/);
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
