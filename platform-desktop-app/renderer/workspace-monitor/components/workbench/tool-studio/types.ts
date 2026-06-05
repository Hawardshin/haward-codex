import type { LucideIcon } from "lucide-react";

export type ToolStudioMode = "build" | "environment" | "deploy" | "registry";

export type ToolStudioStage = "create" | "ship";

export type ToolStudioModeRequest = {
  mode: ToolStudioMode;
  requestId: number;
};

export type ToolMode = {
  id: ToolStudioMode;
  stage: ToolStudioStage;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  shortcut: string;
  icon: LucideIcon;
};

export type ToolStage = {
  id: ToolStudioStage;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  icon: LucideIcon;
};

export type ToolCard = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  status: "ready" | "draft" | "review";
  runtime: string;
  path: string;
  mode: ToolStudioMode;
  icon: LucideIcon;
};

export type ToolBuildStep = {
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  icon: LucideIcon;
};

export type ToolBuilderBlueprint = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  packageName: string;
  moduleName: string;
  entrypoint: string;
  pyprojectPath: string;
  testPath: string;
  initCommand: string;
  sourcePath: string;
  schemaPath: string;
  runCommand: string;
  packageCommand: string;
  gatewayKo: string;
  gatewayEn: string;
  riskKo: string;
  riskEn: string;
  manifest: string;
  editTargets: string[];
  sourceChecklistKo: string[];
  sourceChecklistEn: string[];
  outputs: string[];
  icon: LucideIcon;
};

export type ToolDeployTarget = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  target: string;
  command: string;
  artifact: string;
  authKo: string;
  authEn: string;
  observabilityKo: string;
  observabilityEn: string;
  rollback: string;
  preflight: string[];
  icon: LucideIcon;
};

export type PythonEnvironmentProfile = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  interpreter: string;
  venvPath: string;
  dependencyFile: string;
  lockfile: string;
  installCommand: string;
  runCommand: string;
  sandboxKo: string;
  sandboxEn: string;
  cacheKo: string;
  cacheEn: string;
  healthChecks: string[];
  icon: LucideIcon;
};

export type VirtualEnvironmentLifecycleStep = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  evidenceKo: string;
  evidenceEn: string;
  command: (environment: PythonEnvironmentProfile) => string;
  icon: LucideIcon;
};

export type ToolEnvironmentRow = {
  labelKo: string;
  labelEn: string;
  value: string;
  detailKo: string;
  detailEn: string;
};
