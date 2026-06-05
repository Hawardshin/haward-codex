import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const monitorShellPath = path.join(projectRoot, "components", "MonitorShell.tsx");

const lazyBoundaryTargets = [
  { component: "OperatorCenterDialog", modulePath: "@/components/features/OperatorCenterDialog" },
  { component: "ProductFeatureArchitecturePanel", modulePath: "@/components/features/ProductFeatureArchitecturePanel" },
  { component: "CoreFeatureDrilldown", modulePath: "@/components/workbench/CoreFeatureDrilldown" },
  { component: "WorkspaceExplorerPane", modulePath: "@/components/workbench/WorkspaceExplorerPane" },
  { component: "NativeGitWorkbench", modulePath: "@/components/workbench/NativeGitWorkbench" },
  { component: "RuntimeTerminalDrawer", modulePath: "@/components/workbench/RuntimeTerminalDrawer" },
  { component: "ToolStudioPanel", modulePath: "@/components/workbench/ToolStudioPanel" },
  { component: "AgentCollaborationBoardPanel", modulePath: "@/components/workbench/AgentDetailPanels" },
  { component: "AgentInventoryPanel", modulePath: "@/components/workbench/AgentDetailPanels" },
  { component: "AgentRuntimeOverviewPanel", modulePath: "@/components/workbench/AgentDetailPanels" },
  { component: "AgentCoreBlueprintPanel", modulePath: "@/components/workbench/AgentBuilderPanels" },
  { component: "AgentFactoryWizard", modulePath: "@/components/workbench/AgentBuilderPanels" },
  { component: "LearningFeedbackLoopPanel", modulePath: "@/components/workbench/AgentBuilderPanels" }
];

function main() {
  const monitorShell = fs.readFileSync(monitorShellPath, "utf8");
  const failures = [];
  const importDeclarations = [...monitorShell.matchAll(/import\s+([\s\S]*?)\s+from\s+["']([^"']+)["'];/g)].map((match) => ({
    modulePath: match[2],
    source: match[0],
    specifier: match[1].trim()
  }));
  const targetModulePaths = new Set(lazyBoundaryTargets.map((target) => target.modulePath));

  for (const declaration of importDeclarations) {
    if (targetModulePaths.has(declaration.modulePath) && !declaration.specifier.startsWith("type ")) {
      failures.push(`MonitorShell must type-only import ${declaration.modulePath}; found ${declaration.source}`);
    }
  }

  for (const target of lazyBoundaryTargets) {
    const dynamicPattern = new RegExp(
      `const\\s+${target.component}\\s*=\\s*dynamic(?:<[^>]+>)?\\([\\s\\S]*?import\\("${escapeRegExp(target.modulePath)}"\\)[\\s\\S]*?module\\.${target.component}`
    );
    if (!dynamicPattern.test(monitorShell)) {
      failures.push(`MonitorShell must dynamic import ${target.component} from ${target.modulePath}`);
    }
  }

  for (const modulePath of targetModulePaths) {
    const preloadPattern = new RegExp(`void\\s+import\\("${escapeRegExp(modulePath)}"\\)`);
    if (!preloadPattern.test(monitorShell)) {
      failures.push(`MonitorShell must keep an explicit preload path for ${modulePath}`);
    }
  }

  if (failures.length > 0) {
    console.error(JSON.stringify({ status: "lazy_boundary_contract_failed", failures }, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log(
    JSON.stringify(
      {
        status: "lazy_boundary_contract_ok",
        checkedTargets: lazyBoundaryTargets.length,
        checkedModules: targetModulePaths.size
      },
      null,
      2
    )
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
