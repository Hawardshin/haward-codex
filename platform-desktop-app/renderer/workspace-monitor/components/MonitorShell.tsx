"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileSearch,
  FolderOpen,
  FolderKanban,
  GitBranch,
  History,
  Inbox,
  KeyRound,
  Layers,
  Languages,
  LayoutDashboard,
  ListFilter,
  Network,
  PlayCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SquareTerminal,
  Trash2,
  Wrench,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import { memo, useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { ProductFeatureArchitecturePanelProps } from "@/components/features/ProductFeatureArchitecturePanel";
import type { OperatorCenterDialogProps } from "@/components/features/OperatorCenterDialog";
import type { EvaluationReportPanelProps } from "@/components/features/EvaluationReportPanel";
import { preloadAdminHistoryIndex, useAdminHistoryIndex } from "@/components/history/useAdminHistoryIndex";
import { SnapshotLoadingShell } from "@/components/SnapshotLoadingShell";
import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import type {
  AgentCoreBlueprintPanelProps,
  AgentFactoryWizardProps,
  LearningFeedbackLoopPanelProps
} from "@/components/workbench/AgentBuilderPanels";
import type {
  AgentCollaborationBoardPanelProps,
  AgentInventoryPanelProps,
  AgentRuntimeOverviewPanelProps
} from "@/components/workbench/AgentDetailPanels";
import type { CoreFeatureDrilldownItem, CoreFeatureDrilldownProps } from "@/components/workbench/CoreFeatureDrilldown";
import type {
  DesktopGitActionReport,
  DesktopGitStatusReport,
  DesktopGitWorkbenchActionPayload,
  DesktopGitWorkbenchAction,
  NativeGitWorkbenchProps
} from "@/components/workbench/NativeGitWorkbench";
import { PathDisclosure } from "@/components/workbench/PathDisclosure";
import type {
  RuntimeNativePtySession,
  RuntimeTerminalDrawerProps,
  RuntimeTextChoice
} from "@/components/workbench/RuntimeTerminalDrawer";
import type { ToolStudioMode, ToolStudioModeRequest, ToolStudioPanelProps } from "@/components/workbench/ToolStudioPanel";
import type { WorkspaceExplorerPaneProps } from "@/components/workbench/WorkspaceExplorerPane";
import { writeClipboardText } from "@/lib/clipboard.mjs";
import { installInstantButtonFeedback, scheduleAfterFirstPaint } from "@/lib/motion";
import {
  categoryLabel,
  formatDate,
  formatDay,
  type WorkspaceSnapshot,
  type WorkspaceSourceFile
} from "@/lib/snapshot";

type SectionId =
  | "overview"
  | "desktop"
  | "eval"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "tools"
  | "requirements"
  | "agents";

const maxResidentSectionPanels = 12;
const startupSurfaceReadyMinMs = 2600;
const retainedResidentSections: SectionId[] = ["agents", "desktop", "eval", "source", "tools"];
const nonRetainedResidentSections: SectionId[] = [];
const startupResidentPreloadSections: SectionId[] = [
  "agents",
  "desktop",
  "eval",
  "source",
  "tools",
  "intent",
  "projects",
  "history",
  "structure",
  "documents",
  "requirements",
  "overview"
];

function normalizeResidentSectionIds(candidates: SectionId[], activeSection: SectionId) {
  const ordered = [activeSection, ...retainedResidentSections, ...candidates];
  const nonRetained = new Set(nonRetainedResidentSections);
  const seen = new Set<SectionId>();
  const normalized: SectionId[] = [];
  for (const candidate of ordered) {
    if (!sectionIds.has(candidate) || seen.has(candidate)) {
      continue;
    }
    if (candidate !== activeSection && nonRetained.has(candidate)) {
      continue;
    }
    seen.add(candidate);
    normalized.push(candidate);
    if (normalized.length >= maxResidentSectionPanels) {
      break;
    }
  }
  return normalized;
}

type FeatureGroupId = "core" | "workspace" | "knowledge" | "governance";
type SidebarMode = "expanded" | "collapsed";
type SettingsTabId = "appearance" | "navigation" | "execution" | "data";
type SettingsSubsectionId =
  | "display"
  | "language"
  | "view"
  | "rail"
  | "terminal"
  | "pinned"
  | "quick"
  | "providers"
  | "adapter"
  | "session"
  | "pipe"
  | "questions"
  | "filters"
  | "snapshot"
  | "store"
  | "operator";
type AppThemeMode = "system" | "light" | "dark";
type UiLanguage = "ko" | "en";
type DesktopActionFeedbackStatus = "running" | "done" | "failed";
type DesktopActionFeedbackId =
  | "choose-workspace"
  | "check-adapters"
  | "open-search-agent"
  | "open-terminal"
  | "start-selected-lane"
  | "init-task-pipe"
  | "refresh-decisions"
  | "refresh-task-runs"
  | "refresh-accumulated-data"
  | "refresh-runtime-roots"
  | "audit-payload"
  | "create-support-bundle"
  | "refresh-service-readiness"
  | "refresh-workspace-host"
  | "defer-questions"
  | "open-source-review"
  | "import-workspace"
  | "clone-workspace"
  | "start-cockpit-adapter";
type DesktopActionFeedback = {
  id: DesktopActionFeedbackId;
  label: string;
  scope: string;
  status: DesktopActionFeedbackStatus;
  detail: string;
  result: string;
  next: string;
  updatedAt: string;
};
type SourceWorkbenchView = "files" | "editor" | "results";
type AgentDetailViewId = "collaboration" | "blueprint" | "builder" | "learning" | "flow" | "inventory" | "runtime";

type Section = {
  id: SectionId;
  label: string;
  labelEn: string;
  shortLabel: string;
  shortLabelEn: string;
  icon: LucideIcon;
  group: FeatureGroupId;
  purpose: string;
  purposeEn: string;
};

function MountedSectionPanel({
  active,
  children,
  id
}: {
  active: boolean;
  children: ReactNode;
  id: SectionId;
}) {
  return (
    <div
      className="mounted-section-panel"
      data-mounted-section={id}
      data-section-visible={active ? "true" : "false"}
      hidden={!active}
      aria-hidden={active ? undefined : true}
    >
      {children}
    </div>
  );
}

type AppChoiceOption = {
  value: string;
  label: string;
  detail?: string;
};

function AppChoiceButtonGroup({
  className = "",
  density = "regular",
  label,
  onChange,
  options,
  value
}: {
  className?: string;
  density?: "regular" | "compact";
  label: string;
  onChange: (value: string) => void;
  options: AppChoiceOption[];
  value: string;
}) {
  const classes = ["app-choice-button-group", density === "compact" ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="listbox" aria-label={label}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={active ? "active" : ""}
            role="option"
            aria-selected={active}
            title={option.detail || option.label}
            onClick={() => onChange(option.value)}
          >
            <span>{option.label}</span>
            {option.detail && <small>{option.detail}</small>}
          </button>
        );
      })}
    </div>
  );
}

function AppChoiceMenu({
  className = "",
  fallbackLabel,
  icon: Icon,
  label,
  onChange,
  options,
  value
}: {
  className?: string;
  fallbackLabel?: string;
  icon?: LucideIcon;
  label: string;
  onChange: (value: string) => void;
  options: AppChoiceOption[];
  value: string;
}) {
  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label || fallbackLabel || label;
  const classes = ["app-choice-menu-field", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <span className="app-choice-menu-label">{label}</span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="app-choice-menu-trigger"
            disabled={options.length === 0}
            aria-label={label}
            title={selectedOption?.detail || displayLabel}
          >
            {Icon && <Icon size={16} aria-hidden="true" />}
            <span className="app-choice-menu-copy">
              <strong>{displayLabel}</strong>
              {selectedOption?.detail && <small>{selectedOption.detail}</small>}
            </span>
            <ChevronDown size={15} aria-hidden="true" className="app-choice-menu-caret" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="app-choice-menu" align="start" sideOffset={6} collisionPadding={12}>
            <DropdownMenu.Label className="app-choice-menu-heading">
              <span>{label}</span>
              <strong>{options.length}</strong>
            </DropdownMenu.Label>
            <DropdownMenu.Separator className="app-choice-menu-separator" />
            {options.map((option) => {
              const active = option.value === value;
              return (
                <DropdownMenu.Item
                  key={option.value}
                  className="app-choice-menu-item"
                  data-selected={active ? "true" : "false"}
                  onSelect={() => onChange(option.value)}
                >
                  <span>
                    <strong>{option.label}</strong>
                    {option.detail && <small>{option.detail}</small>}
                  </span>
                  {active && <CheckCircle2 size={14} aria-hidden="true" />}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

type CommandItem = {
  id: string;
  label: string;
  detail: string;
  group: string;
  icon: LucideIcon;
  badge?: string;
  keywords: string[];
  run: () => void;
};

type TaskIntentItem = {
  id: string;
  label: string;
  detail: string;
  actionLabel: string;
  badge: string;
  targetSection: SectionId;
  nextStep: string;
  flowSteps: TaskIntentFlowStep[];
  icon: LucideIcon;
  keywords: string[];
  run: () => void;
};

type TaskIntentFlowStep = {
  id: string;
  label: string;
  actionLabel?: string;
  run?: () => void;
};

type RuntimeInitDefaults = {
  adapterId: string;
  sessionModeId: string;
  taskPipeKind: string;
  autoDeferQuestions: boolean;
};

type RuntimeLaunchRequest = {
  id: string;
  label: string;
  adapterId: string;
  modeId: string;
  taskKind: string;
  prompt: string;
  openTerminal: boolean;
  autoStart: boolean;
};

type DesktopPreferences = {
  schemaVersion: string;
  uiLanguage: UiLanguage;
  themeMode: AppThemeMode;
  sidebarMode: SidebarMode;
  terminalDrawerOpen: boolean;
  runtimeInitDefaults: RuntimeInitDefaults;
  pinnedSections: SectionId[];
};

type DesktopPreferencesReport = {
  schemaVersion: string;
  status: string;
  source: string;
  preferencesPath: string;
  preferences: DesktopPreferences;
};

type ProviderCredentialSummary = {
  providerId: string;
  label: string;
  authMethod: string;
  envVar: string;
  defaultModel: string;
  configured: boolean;
  environmentAvailable: boolean;
  status: string;
  accountHint: string;
  secretPreview: string;
  lastUpdatedAt: string;
  storage: string;
  credentialSource: string;
  setupUrl: string;
  loginUrl: string;
  docsUrl: string;
  caution: string;
};

type ProviderCredentialReport = {
  schemaVersion: string;
  status: string;
  source: string;
  credentialFilePath: string;
  storageWarning: string;
  configuredCount: number;
  providers: ProviderCredentialSummary[];
};

type ProviderModelSummary = {
  providerId: string;
  id: string;
  label: string;
  size?: number | null;
  modifiedAt: string;
};

type ProviderModelCatalogReport = {
  providerId: string;
  providerLabel: string;
  status: string;
  source: string;
  defaultModel: string;
  models: ProviderModelSummary[];
  error?: string | null;
};

type ProviderActionKind = "refresh" | "setup" | "login" | "docs" | "save" | "clear" | "models" | "use";

type ProviderActionFeedback = {
  providerId: string;
  action: ProviderActionKind;
  tone: "error" | "success" | "info";
  message: string;
};

const providerPanelFeedbackId = "__provider_accounts_panel__";

type ProviderCredentialInputState = {
  accountHint: string;
  secret: string;
};

type AgentFactoryForm = {
  agentId: string;
  label: string;
  goal: string;
  role: string;
  tools: string;
  guardrails: string;
  validationCommands: string;
  outputContract: string;
  ownerProject: string;
  targetPath: string;
  rollbackPlan: string;
};

type SearchAgentRunForm = {
  objective: string;
  questions: string;
  searchChannels: string;
  captureTargets: string;
  notes: string;
  providerId: string;
  model: string;
};

type AgentCoreBlueprint = {
  id: string;
  label: string;
  sourceLabel: string;
  sourceUrl: string;
  summaryKo: string;
  summaryEn: string;
  primaryUseKo: string;
  primaryUseEn: string;
  agentId: string;
  factoryLabel: string;
  factoryGoalKo: string;
  factoryGoalEn: string;
  role: string;
  capabilities: string[];
  lifecycle: string[];
  outputRecords: string[];
  safetyGates: string[];
  defaultObjectiveKo: string;
  defaultObjectiveEn: string;
  defaultQuestionsKo: string;
  defaultQuestionsEn: string;
  defaultNotesKo: string;
  defaultNotesEn: string;
};

type AgentCoreCapabilityOption = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  resourceKo: string;
  resourceEn: string;
  lifecycleKo: string;
  lifecycleEn: string;
  localCapability: string;
  guardrailKo: string;
  guardrailEn: string;
};

type SearchAgentChatMessage = {
  id: string;
  role: "agent" | "user" | "system";
  title: string;
  body: string;
  meta: string;
};

type ProviderAgentTaskReport = {
  taskRunId: string;
  providerId: string;
  providerLabel: string;
  model: string;
  status: string;
  httpStatus?: number | null;
  durationMs: number;
  output: string;
  stderr: string;
  outputTruncated: boolean;
  workingDir: string;
  taskKind: string;
  taskRecordPath?: string | null;
  stdoutLogPath?: string | null;
  stderrLogPath?: string | null;
  persistenceError?: string | null;
  requestId: string;
};

type AgentFactoryProposalReport = {
  status: string;
  proposalId: string;
  proposalPath: string;
  targetPath: string;
  createdAt: string;
  agentId: string;
  label: string;
  validationCommand: string;
  rollbackPlan: string;
  spec: unknown;
};

type LearningImprovementCandidate = {
  id: string;
  label: string;
  source: string;
  impact: string;
  evidence: string[];
  assetType: string;
  targetPath: string;
  validationCommand: string;
  rollbackPlan: string;
};

type LearningImprovementDecisionReport = {
  status: string;
  decisionId: string;
  decisionPath: string;
  createdAt: string;
  candidateId: string;
  action: string;
  assetType: string;
  targetPath: string;
  validationCommand: string;
  rollbackPlan: string;
  record: unknown;
};

const agentDetailViews: Array<{
  id: AgentDetailViewId;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  icon: LucideIcon;
}> = [
  {
    id: "collaboration",
    labelKo: "협업",
    labelEn: "Collab",
    detailKo: "3D 작업판",
    detailEn: "3D board",
    icon: Network
  },
  {
    id: "blueprint",
    labelKo: "블루프린트",
    labelEn: "Blueprints",
    detailKo: "능력 묶음",
    detailEn: "Capability map",
    icon: LayoutDashboard
  },
  {
    id: "builder",
    labelKo: "생성기",
    labelEn: "Builder",
    detailKo: "제안 작성",
    detailEn: "Proposal",
    icon: Wrench
  },
  {
    id: "learning",
    labelKo: "학습",
    labelEn: "Learning",
    detailKo: "피드백 루프",
    detailEn: "Feedback loop",
    icon: BookOpenText
  },
  {
    id: "flow",
    labelKo: "흐름",
    labelEn: "Flow",
    detailKo: "작업 연결",
    detailEn: "Work links",
    icon: GitBranch
  },
  {
    id: "inventory",
    labelKo: "인벤토리",
    labelEn: "Inventory",
    detailKo: "구성 맵",
    detailEn: "Config map",
    icon: Bot
  },
  {
    id: "runtime",
    labelKo: "런타임",
    labelEn: "Runtime",
    detailKo: "상태 점검",
    detailEn: "Status",
    icon: Layers
  }
];

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.default), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco editor</div>
});

const MonacoDiffEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.DiffEditor), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco diff</div>
});

const ToolStudioPanel = dynamic<ToolStudioPanelProps>(
  () => import("@/components/workbench/ToolStudioPanel").then((module) => module.ToolStudioPanel),
  {
    ssr: false,
    loading: () => (
      <div className="tool-studio-loading" data-tool-studio-loading>
        Loading Tool Studio
      </div>
    )
  }
);

const MemoizedToolStudioPanel = memo(ToolStudioPanel);

function preloadToolStudioPanel() {
  void import("@/components/workbench/ToolStudioPanel");
}

const OperatorCenterDialog = dynamic<OperatorCenterDialogProps>(
  () => import("@/components/features/OperatorCenterDialog").then((module) => module.OperatorCenterDialog),
  {
    ssr: false,
    loading: () => null
  }
);

const ProductFeatureArchitecturePanel = dynamic<ProductFeatureArchitecturePanelProps>(
  () => import("@/components/features/ProductFeatureArchitecturePanel").then((module) => module.ProductFeatureArchitecturePanel),
  {
    ssr: false,
    loading: () => (
      <div className="panel wide product-feature-panel" data-product-feature-loading>
        Loading product structure
      </div>
    )
  }
);

const EvaluationReportPanel = dynamic<EvaluationReportPanelProps>(
  () => import("@/components/features/EvaluationReportPanel").then((module) => module.EvaluationReportPanel),
  {
    ssr: false,
    loading: () => (
      <div className="panel wide eval-loading" data-eval-loading>
        Loading evaluation report
      </div>
    )
  }
);

const CoreFeatureDrilldown = dynamic<CoreFeatureDrilldownProps>(
  () => import("@/components/workbench/CoreFeatureDrilldown").then((module) => module.CoreFeatureDrilldown),
  {
    ssr: false,
    loading: () => (
      <div className="panel wide quick-start-panel main-workbench-panel" data-core-feature-drilldown-loading>
        Loading feature
      </div>
    )
  }
);

const WorkspaceExplorerPane = dynamic<WorkspaceExplorerPaneProps>(
  () => import("@/components/workbench/WorkspaceExplorerPane").then((module) => module.WorkspaceExplorerPane),
  {
    ssr: false,
    loading: () => (
      <aside className="workspace-explorer-pane" data-workspace-explorer-loading>
        Loading workspace explorer
      </aside>
    )
  }
);

const NativeGitWorkbench = dynamic<NativeGitWorkbenchProps>(
  () => import("@/components/workbench/NativeGitWorkbench").then((module) => module.NativeGitWorkbench),
  {
    ssr: false,
    loading: () => (
      <section className="native-git-workbench-loading" data-native-git-workbench-loading>
        Loading Git workbench
      </section>
    )
  }
);

const RuntimeTerminalDrawer = dynamic<RuntimeTerminalDrawerProps>(
  () => import("@/components/workbench/RuntimeTerminalDrawer").then((module) => module.RuntimeTerminalDrawer),
  {
    ssr: false,
    loading: () => null
  }
);

const AgentCollaborationBoardPanel = dynamic<AgentCollaborationBoardPanelProps>(
  () => import("@/components/workbench/AgentDetailPanels").then((module) => module.AgentCollaborationBoardPanel),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading collaboration board</p>
  }
);

const AgentInventoryPanel = dynamic<AgentInventoryPanelProps>(
  () => import("@/components/workbench/AgentDetailPanels").then((module) => module.AgentInventoryPanel),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading agent inventory</p>
  }
);

const AgentRuntimeOverviewPanel = dynamic<AgentRuntimeOverviewPanelProps>(
  () => import("@/components/workbench/AgentDetailPanels").then((module) => module.AgentRuntimeOverviewPanel),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading runtime overview</p>
  }
);

const AgentCoreBlueprintPanel = dynamic<AgentCoreBlueprintPanelProps>(
  () => import("@/components/workbench/AgentBuilderPanels").then((module) => module.AgentCoreBlueprintPanel),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading blueprint builder</p>
  }
);

const AgentFactoryWizard = dynamic<AgentFactoryWizardProps>(
  () => import("@/components/workbench/AgentBuilderPanels").then((module) => module.AgentFactoryWizard),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading agent factory</p>
  }
);

const LearningFeedbackLoopPanel = dynamic<LearningFeedbackLoopPanelProps>(
  () => import("@/components/workbench/AgentBuilderPanels").then((module) => module.LearningFeedbackLoopPanel),
  {
    ssr: false,
    loading: () => <p className="empty-state">Loading learning loop</p>
  }
);

function preloadDesktopRuntimePanels() {
  void import("@/components/workbench/WorkspaceExplorerPane");
  void import("@/components/workbench/NativeGitWorkbench");
  void import("@/components/workbench/RuntimeTerminalDrawer");
}

function preloadHomeFeaturePanels() {
  void import("@/components/features/OperatorCenterDialog");
  void import("@/components/features/ProductFeatureArchitecturePanel");
  void import("@/components/features/EvaluationReportPanel");
  void import("@/components/workbench/CoreFeatureDrilldown");
}

function preloadAgentDetailPanels() {
  void import("@/components/workbench/AgentDetailPanels");
}

function preloadAgentBuilderPanels() {
  void import("@/components/workbench/AgentBuilderPanels");
}

const AgentCollaborationScene = dynamic(
  () => import("@/components/workbench/AgentCollaborationScene").then((module) => module.AgentCollaborationScene),
  {
    ssr: false,
    loading: () => (
      <div className="agent-collaboration-scene-loading" data-agent-collaboration-scene-loading>
        Loading agent collaboration scene
      </div>
    )
  }
);

const monacoEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  bracketPairColorization: { enabled: true },
  copyWithSyntaxHighlighting: true,
  cursorBlinking: "smooth",
  formatOnPaste: true,
  formatOnType: true,
  fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace",
  fontSize: 13,
  glyphMargin: true,
  guides: { bracketPairs: true, indentation: true },
  lineHeight: 22,
  minimap: { enabled: false },
  mouseWheelZoom: true,
  padding: { bottom: 14, top: 12 },
  renderLineHighlight: "all",
  renderWhitespace: "selection",
  rulers: [100, 120],
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  stickyScroll: { enabled: true },
  tabSize: 2,
  wordWrap: "on",
  wordWrapColumn: 120,
  wrappingIndent: "same"
};

const monacoReadOnlyOptions: editor.IStandaloneEditorConstructionOptions = {
  ...monacoEditorOptions,
  domReadOnly: true,
  minimap: { enabled: false },
  readOnly: true
};

const monacoDiffEditorOptions: editor.IStandaloneDiffEditorConstructionOptions = {
  automaticLayout: true,
  diffAlgorithm: "advanced",
  enableSplitViewResizing: true,
  originalEditable: false,
  readOnly: true,
  renderSideBySide: true,
  scrollBeyondLastLine: false
};

const platformMonacoTheme = "agent-platform-workbench";

const definePlatformMonacoTheme = (monaco: typeof import("monaco-editor")) => {
  monaco.editor.defineTheme(platformMonacoTheme, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8ea6b8" },
      { token: "keyword", foreground: "7dd3fc" },
      { token: "string", foreground: "b7e4c7" },
      { token: "number", foreground: "f4a261" }
    ],
    colors: {
      "editor.background": "#101923",
      "editor.foreground": "#d7e0ea",
      "editor.lineHighlightBackground": "#172435",
      "editorLineNumber.foreground": "#637386",
      "editorLineNumber.activeForeground": "#d7e0ea",
      "editorCursor.foreground": "#9bd5ff",
      "editor.selectionBackground": "#245173",
      "editorIndentGuide.background1": "#263546",
      "editorIndentGuide.activeBackground1": "#55677a",
      "minimap.background": "#101923"
    }
  });
};

type SourceTemplateId =
  | "requirement-row"
  | "spec-section"
  | "validation-record"
  | "tauri-command"
  | "agent-config"
  | "decision-inbox-item";

type SourceTemplate = {
  id: SourceTemplateId;
  label: string;
  detail: string;
  body: string;
};

type SourceEditorProfile = {
  label: string;
  detail: string;
  accent: "governance" | "spec" | "runtime" | "config" | "source";
  templateId: SourceTemplateId;
};

const sourceTemplates: SourceTemplate[] = [
  {
    id: "requirement-row",
    label: "Requirement Row",
    detail: "Baselined requirement table row",
    body:
      "| REQ-PLATFORM-000 | {{date}} | {{path}} | The platform shall ... | must | planned | spec: TBD | validation: TBD |\n"
  },
  {
    id: "spec-section",
    label: "Spec Section",
    detail: "Scope, acceptance, trace",
    body:
      "## Goal\n\n- User outcome:\n- Owner surface:\n\n## Scope\n\n- Included:\n- Excluded:\n\n## Acceptance\n\n- [ ] Requirement linked\n- [ ] Implementation path named\n- [ ] Validation command recorded\n- [ ] Rollback or backup path clear\n"
  },
  {
    id: "validation-record",
    label: "Validation Record",
    detail: "Command and browser evidence",
    body:
      "## Validation\n\n- Static check:\n- Build check:\n- Runtime smoke:\n- Browser viewport check:\n- Regression risk:\n- Evidence path:\n"
  },
  {
    id: "tauri-command",
    label: "Tauri Command",
    detail: "Workspace-scoped command stub",
    body:
      "#[tauri::command]\nfn command_name() -> Result<(), String> {\n    Ok(())\n}\n"
  },
  {
    id: "agent-config",
    label: "Agent Config",
    detail: "Bounded capability config",
    body:
      "{\n  \"id\": \"agent-id\",\n  \"label\": \"Agent Label\",\n  \"role\": \"bounded_capability\",\n  \"inputs\": [],\n  \"outputs\": [],\n  \"validation\": {\n    \"required_evidence\": [],\n    \"rollback\": \"\"\n  }\n}\n"
  },
  {
    id: "decision-inbox-item",
    label: "Decision Item",
    detail: "Human arbitration packet",
    body:
      "{\n  \"id\": \"decision-id\",\n  \"status\": \"open\",\n  \"priority\": \"normal\",\n  \"question\": \"\",\n  \"impact\": \"\",\n  \"options\": [],\n  \"resume_action\": \"\"\n}\n"
  }
];

const sourceTemplateById = sourceTemplates.reduce(
  (lookup, template) => ({ ...lookup, [template.id]: template }),
  {} as Record<SourceTemplateId, SourceTemplate>
);

function sourceEditorProfileForPath(relativePath: string): SourceEditorProfile {
  const normalized = relativePath.toLowerCase();
  if (normalized.includes("/docs/requirements/") || normalized.includes("_requirements/")) {
    return {
      label: "Requirements",
      detail: "baseline, status, trace",
      accent: "governance",
      templateId: "requirement-row"
    };
  }
  if (normalized.includes("/specs/") || normalized.includes("_specs/")) {
    return {
      label: "Spec Work",
      detail: "scope, acceptance, validation",
      accent: "spec",
      templateId: "spec-section"
    };
  }
  if (normalized.includes("src-tauri") || normalized.endsWith(".rs")) {
    return {
      label: "Runtime Command",
      detail: "Tauri boundary, Result contract",
      accent: "runtime",
      templateId: "tauri-command"
    };
  }
  if (normalized.includes("/configs/") || normalized.endsWith(".json")) {
    return {
      label: "Platform Config",
      detail: "schema, validation, rollback",
      accent: "config",
      templateId: "agent-config"
    };
  }
  if (normalized.includes("/validation") || normalized.includes("_history/evaluations/")) {
    return {
      label: "Validation",
      detail: "commands, evidence, risk",
      accent: "governance",
      templateId: "validation-record"
    };
  }
  return {
    label: "Source Patch",
    detail: "draft, diff, handoff",
    accent: "source",
    templateId: "spec-section"
  };
}

function renderSourceTemplate(template: SourceTemplate, relativePath: string) {
  return template.body
    .split("{{date}}")
    .join(new Date().toISOString().slice(0, 10))
    .split("{{path}}")
    .join(relativePath || "workspace-relative-path");
}

function appendSourceTemplate(content: string, templateBody: string) {
  const separator = content.length === 0 ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  return `${content}${separator}${templateBody}`;
}

const DESKTOP_PREFERENCES_SCHEMA_VERSION = "desktop-preferences.v1";
const defaultPinnedSections: SectionId[] = ["overview", "agents", "desktop", "eval", "source", "intent"];
type OperatorCenterSection = OperatorCenterDialogProps["sections"][number];
type OperatorCenterSectionId = OperatorCenterSection["id"];
const operatorSectionIds = new Set<OperatorCenterSectionId>(["projects", "history", "structure", "documents", "requirements"]);

function isOperatorCenterSection(section: Section): section is Section & { id: OperatorCenterSectionId } {
  return operatorSectionIds.has(section.id as OperatorCenterSectionId);
}

function isOperatorSectionId(sectionId: SectionId) {
  return operatorSectionIds.has(sectionId as OperatorCenterSectionId);
}

const featureGroups: Array<{
  id: FeatureGroupId;
  label: string;
  labelEn: string;
  purpose: string;
  purposeEn: string;
}> = [
  {
    id: "core",
    label: "핵심 기능",
    labelEn: "Core Features",
    purpose: "에이전트 코어와 CLI 작업 연속성",
    purposeEn: "Agent Core and CLI work continuity."
  },
  {
    id: "workspace",
    label: "루트 툴",
    labelEn: "Root Tools",
    purpose: "모든 에이전트와 CLI가 공유하는 도구, 계정, 파일",
    purposeEn: "Shared tools, accounts, and files for every agent and CLI lane."
  },
  {
    id: "knowledge",
    label: "개선 루프",
    labelEn: "Improvement Loop",
    purpose: "반복 작업을 다음 자동화 후보로 바꿉니다.",
    purposeEn: "Turn repeated work into the next automation candidate."
  },
  {
    id: "governance",
    label: "운영 보조",
    labelEn: "Operator Support",
    purpose: "문서, 히스토리, 요구사항, 배포 점검",
    purposeEn: "Documents, history, requirements, and release readiness."
  }
];

const sections: Section[] = [
  {
    id: "overview",
    label: "핵심 홈",
    labelEn: "Core Home",
    shortLabel: "홈",
    shortLabelEn: "Home",
    icon: Activity,
    group: "core",
    purpose: "핵심 2가지, 설정 상태, 현재 작업량을 한눈에 봅니다.",
    purposeEn: "See the two core capabilities, setup state, and current workload at a glance."
  },
  {
    id: "agents",
    label: "에이전트 코어",
    labelEn: "Agent Core",
    shortLabel: "에이전트",
    shortLabelEn: "Agent",
    icon: Bot,
    group: "core",
    purpose: "커스텀 에이전트, 서브에이전트, 작업별 공유 구성을 쉽게 만듭니다.",
    purposeEn: "Create custom agents, subagents, and per-task shared configurations easily."
  },
  {
    id: "desktop",
    label: "CLI 오케스트레이션",
    labelEn: "CLI Orchestration",
    shortLabel: "CLI",
    shortLabelEn: "CLI",
    icon: Network,
    group: "core",
    purpose: "Claude Code 같은 게스트 CLI 실행 경로, 결정 보류, 연속 실행을 조율합니다.",
    purposeEn: "Coordinate guest CLI lanes, deferred decisions, and continuous runs."
  },
  {
    id: "eval",
    label: "AI 평가",
    labelEn: "AI Eval",
    shortLabel: "EVAL",
    shortLabelEn: "EVAL",
    icon: ClipboardCheck,
    group: "core",
    purpose: "현재 작업, 히스토리, 토큰/툴 사용, 오픈소스 EVAL 후보를 비교합니다.",
    purposeEn: "Compare current work, history, token/tool usage, and open-source eval candidates."
  },
  {
    id: "tools",
    label: "툴 스튜디오",
    labelEn: "Tool Studio",
    shortLabel: "툴스",
    shortLabelEn: "Studio",
    icon: Wrench,
    group: "core",
    purpose: "툴 제작, 배포, Python 실행 환경, 가상 환경, 툴 전용 관리를 한 화면 흐름으로 다룹니다.",
    purposeEn: "Build, deploy, and manage tools, Python runtime, venv, and registry in one focused work surface."
  },
  {
    id: "source",
    label: "루트 툴/파일",
    labelEn: "Root Tools / Files",
    shortLabel: "툴",
    shortLabelEn: "Tools",
    icon: Code2,
    group: "workspace",
    purpose: "모든 에이전트와 CLI가 함께 쓰는 루트 도구, 파일, 소스 작업면입니다.",
    purposeEn: "Shared root tools, files, and source workspace used by agents and CLI lanes."
  },
  {
    id: "intent",
    label: "개선 루프",
    labelEn: "Improvement Loop",
    shortLabel: "개선",
    shortLabelEn: "Improve",
    icon: GitBranch,
    group: "knowledge",
    purpose: "누적된 실행, 평가, 의도 기록에서 다음 자동화 후보를 뽑습니다.",
    purposeEn: "Extract the next automation candidates from accumulated runs, evaluations, and intent records."
  },
  {
    id: "projects",
    label: "프로젝트",
    labelEn: "Projects",
    shortLabel: "프로젝트",
    shortLabelEn: "Projects",
    icon: FolderKanban,
    group: "governance",
    purpose: "등록된 root project와 소유 경계를 확인합니다.",
    purposeEn: "Inspect registered root projects and ownership boundaries."
  },
  {
    id: "structure",
    label: "구조",
    labelEn: "Structure",
    shortLabel: "구조",
    shortLabelEn: "Structure",
    icon: Layers,
    group: "governance",
    purpose: "플랫폼 계층, 경계 규칙, 복잡도 압력을 관측합니다.",
    purposeEn: "Inspect platform layers, boundary rules, and complexity pressure."
  },
  {
    id: "history",
    label: "작업 기록",
    labelEn: "Learning History",
    shortLabel: "기록",
    shortLabelEn: "History",
    icon: History,
    group: "governance",
    purpose: "날짜별 작업 기록과 개선 근거를 추적합니다.",
    purposeEn: "Track dated work history and improvement evidence."
  },
  {
    id: "documents",
    label: "문서",
    labelEn: "Documents",
    shortLabel: "문서",
    shortLabelEn: "Docs",
    icon: BookOpenText,
    group: "governance",
    purpose: "문서, 검색 기록, 평가 근거를 탐색합니다.",
    purposeEn: "Browse docs, web searches, and evaluation evidence."
  },
  {
    id: "requirements",
    label: "요구사항",
    labelEn: "Requirements",
    shortLabel: "요구",
    shortLabelEn: "Reqs",
    icon: ClipboardCheck,
    group: "governance",
    purpose: "요구사항과 스펙 기준의 이행 상태를 봅니다.",
    purposeEn: "Inspect requirements and spec-driven delivery status."
  }
];

function sectionForLanguage(section: Section, uiLanguage: UiLanguage): Section {
  if (uiLanguage === "ko") {
    return section;
  }
  return {
    ...section,
    label: section.labelEn,
    shortLabel: section.shortLabelEn,
    purpose: section.purposeEn
  };
}

function featureGroupForLanguage(group: (typeof featureGroups)[number], uiLanguage: UiLanguage) {
  if (uiLanguage === "ko") {
    return group;
  }
  return {
    ...group,
    label: group.labelEn,
    purpose: group.purposeEn
  };
}

type MonitorViewMode = NonNullable<WorkspaceSnapshot["viewModeCatalog"]>["modes"][number];
type MonitorLanguageMode = NonNullable<WorkspaceSnapshot["languageModeCatalog"]>["modes"][number];
type CollaborationBoard = NonNullable<WorkspaceSnapshot["collaborationBoard"]>;
type UnifiedOps = NonNullable<WorkspaceSnapshot["unifiedOps"]>;
type ModeFunctionCatalog = NonNullable<WorkspaceSnapshot["modeFunctionCatalog"]>;
type ClaudeCodeDesignTransfer = NonNullable<WorkspaceSnapshot["claudeCodeDesignTransfer"]>;
type PhilosophyFeatureExtraction = NonNullable<WorkspaceSnapshot["philosophyFeatureExtraction"]>;
type IntentFeatureMap = NonNullable<WorkspaceSnapshot["intentFeatureMap"]>;
type StructureOverview = NonNullable<WorkspaceSnapshot["structureOverview"]>;
type ProductFeatureArchitecture = NonNullable<WorkspaceSnapshot["productFeatureArchitecture"]>;
type ReferencePlatformAdvantages = NonNullable<WorkspaceSnapshot["referencePlatformAdvantages"]>;
type OpenSourceFeatureReferences = NonNullable<WorkspaceSnapshot["openSourceFeatureReferences"]>;
type HistoryInsightLoop = NonNullable<WorkspaceSnapshot["historyInsightLoop"]>;
type FundamentalImprovementStructure = NonNullable<WorkspaceSnapshot["fundamentalImprovementStructure"]>;

const fallbackViewModes: MonitorViewMode[] = [
  {
    id: "user",
    label: "User View",
    intent: "Work-first desktop view for running, editing, creating, and improving agents.",
    allowedSections: ["overview", "agents", "desktop", "eval", "source", "intent"],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "developer",
    label: "Developer View",
    intent: "Implementation, requirements, specs, agents, and verification surfaces.",
    allowedSections: [
      "overview",
      "tools",
      "desktop",
      "eval",
      "projects",
      "history",
      "intent",
      "structure",
      "documents",
      "source",
      "requirements",
      "agents"
    ],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "superadmin_developer",
    label: "Super Admin Dev",
    intent: "Full owner/operator view for building the platform itself.",
    allowedSections: [
      "overview",
      "tools",
      "desktop",
      "eval",
      "projects",
      "history",
      "intent",
      "structure",
      "documents",
      "source",
      "requirements",
      "agents"
    ],
    visibilityRules: {},
    securityNotes: []
  }
];

const fallbackLanguageModes: MonitorLanguageMode[] = [
  {
    id: "all",
    label: "전체",
    intent: "Show Korean, English, and language-neutral documents together.",
    includedLanguages: ["ko", "en"],
    includeUnknown: true,
    documentRule: "Show documents tagged ko, en, or unknown."
  },
  {
    id: "ko",
    label: "한국어만",
    intent: "Show only Korean documents.",
    includedLanguages: ["ko"],
    includeUnknown: false,
    documentRule: "Show only documents tagged ko."
  },
  {
    id: "en",
    label: "English Only",
    intent: "Show only English documents.",
    includedLanguages: ["en"],
    includeUnknown: false,
    documentRule: "Show only documents tagged en."
  },
  {
    id: "unknown",
    label: "미분류",
    intent: "Show language-neutral or not-yet-tagged records.",
    includedLanguages: [],
    includeUnknown: true,
    documentRule: "Show documents tagged unknown."
  }
];

const nativeWorkspaceCopy = {
  ko: {
    eyebrow: "작업공간 Explorer",
    title: "파일시스템을 끌어와서 처리하기",
    description:
      "왼쪽 탐색기에서 실제 작업공간 파일 시스템을 확인하고, 오른쪽 편집기에서 파일을 열어 수정/저장합니다.",
    chooseFolder: "작업공간 접근 권한 요청",
    choosingFolder: "권한 요청 중",
    permissionDetail: "네이티브 폴더 선택 창에서 허용하면 이 앱이 해당 작업공간을 바로 읽고 저장합니다.",
    permissionGranted: "작업공간 접근 권한을 받았습니다.",
    refreshWorkspace: "작업공간 새로고침",
    refreshFiles: "파일 목록 새로고침",
    openSelected: "선택 파일 열기",
    saveCurrent: "현재 파일 저장",
    saveAll: "열린 변경 모두 저장",
    copyFile: "내용 복사",
    activeWorkspace: "현재 작업공간",
    workspaceState: "작업공간 상태",
    folderSource: "선택 방식",
    fileSearch: "파일명, 폴더, 언어 검색",
    fileList: "파일 목록",
    fileTree: "파일 트리",
    uploadDropzone: "작업공간 접근 권한 요청",
    uploadDropzoneDetail: "네이티브 폴더 선택 창에서 허용하면 탐색기가 실제 파일 시스템을 읽고 편집/저장에 바로 사용합니다.",
    explorerHint: "탐색기에서 파일을 누르면 오른쪽 편집기에 열립니다.",
    openedDrafts: "열린 파일",
    editorSettings: "편집 설정",
    wordWrap: "줄바꿈",
    minimap: "미니맵",
    foldAll: "코드 접기",
    unfoldAll: "코드 펼치기",
    diffMode: "변경 비교",
    editMode: "편집",
    noRuntime: "Tauri 런타임이 없어서 저장은 비활성화됩니다. 지금은 스냅샷 파일만 볼 수 있습니다.",
    noFiles: "표시할 파일이 없습니다. 작업공간 폴더를 선택하거나 검색어를 바꿔보세요.",
    noFileOpen: "왼쪽 파일 목록에서 파일을 클릭하세요.",
    savedWithBackup: "저장 완료. 백업 파일을 만들었습니다.",
    chooseCanceled: "폴더 선택을 취소했습니다.",
    fallbackSource: "스냅샷 대체 데이터",
    runtimeSource: "실제 작업공간",
    dirty: "수정됨",
    clean: "변경 없음",
    loading: "불러오는 중",
    saving: "저장 중"
  },
  en: {
    eyebrow: "Workspace Explorer",
    title: "Bring the filesystem into the platform",
    description:
      "Like VS Code, the left Explorer owns the real workspace filesystem and the editor on the right opens files for processing and saving.",
    chooseFolder: "Request Workspace Access",
    choosingFolder: "Requesting Access",
    permissionDetail: "Use the native folder picker to grant this app access to the workspace for reading and saving.",
    permissionGranted: "Workspace access granted.",
    refreshWorkspace: "Refresh Workspace",
    refreshFiles: "Refresh Files",
    openSelected: "Open Selected",
    saveCurrent: "Save Current",
    saveAll: "Save All Open Changes",
    copyFile: "Copy Content",
    activeWorkspace: "Active Workspace",
    workspaceState: "Workspace State",
    folderSource: "Source",
    fileSearch: "Search file, folder, or language",
    fileList: "File List",
    fileTree: "File Tree",
    uploadDropzone: "Request workspace access",
    uploadDropzoneDetail: "Grant access from the native folder picker, then the Explorer can read, edit, and save real workspace files.",
    explorerHint: "Click a file in Explorer to open it in the editor.",
    openedDrafts: "Open Files",
    editorSettings: "Editor Settings",
    wordWrap: "Word Wrap",
    minimap: "Minimap",
    foldAll: "Fold Code",
    unfoldAll: "Unfold Code",
    diffMode: "Diff",
    editMode: "Edit",
    noRuntime: "Tauri runtime is unavailable. Saving is disabled and snapshot files are shown as fallback.",
    noFiles: "No files to show. Choose a workspace folder or change the search text.",
    noFileOpen: "Click a file from the list on the left.",
    savedWithBackup: "Saved with a backup file.",
    chooseCanceled: "Folder selection was canceled.",
    fallbackSource: "snapshot fallback",
    runtimeSource: "real workspace",
    dirty: "dirty",
    clean: "clean",
    loading: "loading",
    saving: "saving"
  }
} satisfies Record<UiLanguage, Record<string, string>>;

const emptyCollaborationBoard: CollaborationBoard = {
  summary: {
    agents: 0,
    activeAgents: 0,
    activeTasks: 0,
    blockedTasks: 0,
    queuedTasks: 0,
    completedTasks: 0,
    handoffs: 0,
    blockers: 0
  },
  agents: [],
  lanes: [],
  flows: [],
  blockers: [],
  nextActions: []
};

const emptyUnifiedOps: UnifiedOps = {
  summary: {
    totalEvents: 0,
    historyEvents: 0,
    monitorEvents: 0,
    evidenceEvents: 0,
    decisionEvents: 0,
    openSignals: 0,
    criticalSignals: 0,
    latestEventAt: "",
    historyDays: 0
  },
  lanes: [],
  signalTypes: [],
  sourceTypes: [],
  events: []
};

const emptyModeFunctionCatalog: ModeFunctionCatalog = {
  summary: {
    totalGroups: 0,
    totalOptions: 0,
    explicitSelectors: 0,
    registryBackedGroups: 0,
    desktopGroups: 0
  },
  groups: []
};

const emptyClaudeCodeDesignTransfer: ClaudeCodeDesignTransfer = {
  sourcePath: "platform-desktop-app/configs/claude-code-design-transfer-registry.json",
  sourceBoundary: {
    policy: "public_sources_only",
    excluded_sources: ["leaked_or_non_public_material"]
  },
  summary: {
    totalPatterns: 0,
    readyNow: 0,
    queued: 0,
    highPriority: 0
  },
  patterns: []
};

const emptyPhilosophyFeatureExtraction: PhilosophyFeatureExtraction = {
  sourcePath: "",
  defaultCommand: "",
  summary: {
    requiredPrinciples: 0,
    totalFlows: 0,
    totalStages: 0,
    totalCandidates: 0,
    implemented: 0,
    planned: 0,
    queued: 0,
    mediumRisk: 0,
    highRisk: 0
  },
  stages: [],
  flows: [],
  qualityGates: [],
  candidates: []
};

const emptyIntentFeatureMap: IntentFeatureMap = {
  sourcePath: "",
  summary: {
    totalIntents: 0,
    totalThemes: 0,
    now: 0,
    next: 0,
    later: 0,
    sourceDate: "",
    updatedAt: "",
    availableMaps: 0
  },
  themes: [],
  roadmap: {
    now: [],
    next: [],
    later: []
  },
  sourceLimits: []
};

const emptyStructureOverview: StructureOverview = {
  summary: {
    totalPlanes: 0,
    totalBoundaryRules: 0,
    totalPressurePoints: 0,
    topSourceHotspots: 0
  },
  planes: [],
  boundaryRules: [],
  pressurePoints: [],
  sourceHotspots: []
};

const emptyProductFeatureArchitecture: ProductFeatureArchitecture = {
  sourcePath: "",
  productPosition: {
    primaryProduct: "agent_capability_platform",
    productClaim:
      "Agent Core makes custom agents easy to create, and CLI orchestration keeps long-running guest CLI work continuous through deferred decisions and task-run records. Root tools, workbench, learning, and observability support those two core capabilities.",
    monitoringRole: "supporting_observability"
  },
  desktopHomeSurface: {
    firstViewPriority: [
      "agent_factory",
      "agent_orchestration",
      "root_tool_management",
      "work_visibility"
    ],
    supportingSurfaces: ["observability_monitoring"],
    homeCopyRule: "Show Agent Core, CLI orchestration continuity, root tool setup, and current workload before monitoring details.",
    configurationRule: "Expose core setup for accounts, CLI adapters, root tools, and question deferral in dedicated settings."
  },
  summary: {
    totalFeatures: 8,
    primaryFeatures: 2,
    supportingFeatures: 6,
    automationLoops: 1
  },
  featureLayers: [
    {
      id: "agent_orchestration",
      label: "CLI Orchestration",
      role: "primary",
      status: "fallback",
      purpose: "Coordinate agents and optional CLI lanes as supervised work.",
      userOutcome: "Start one task and let the platform coordinate specialist lanes.",
      primarySection: "desktop",
      primarySurfaces: ["Desktop Runtime", "Task Pipe", "Decision Inbox"],
      currentAssets: [],
      automationTargets: ["multi-lane task intake", "decision routing", "merge gates"],
      learningSignals: ["task-run records"],
      validationGates: []
    },
    {
      id: "agent_work_environment",
      label: "Agent Work Environment",
      role: "supporting",
      status: "fallback",
      purpose: "Host selected workspaces, runtime data, decisions, task runs, and support diagnostics.",
      userOutcome: "Use an app-owned workspace and accumulated data plane instead of a terminal-first clone.",
      primarySection: "desktop",
      primarySurfaces: ["Workspace Host", "Accumulated Data", "Runtime Data"],
      currentAssets: [],
      automationTargets: ["workspace import", "runtime data indexing"],
      learningSignals: ["task-run count"],
      validationGates: []
    },
    {
      id: "agent_development_environment",
      label: "Agent Development Environment",
      role: "supporting",
      status: "fallback",
      purpose: "Provide a workbench for source, diffs, templates, requirements, specs, and validation.",
      userOutcome: "Shape agent platform behavior inside one development workbench.",
      primarySection: "source",
      primarySurfaces: ["Source Review", "Diff Review", "Requirements"],
      currentAssets: [],
      automationTargets: ["file index", "draft queue", "save with backup"],
      learningSignals: ["diff summary"],
      validationGates: []
    },
    {
      id: "agent_factory",
      label: "Agent Core",
      role: "primary",
      status: "fallback",
      purpose: "Promote repeated work into prompts, workflows, templates, tools, skills, agents, and features.",
      userOutcome: "Create reusable agents and capabilities without repeating the same instructions.",
      primarySection: "agents",
      primarySurfaces: ["Agents", "Capability Center", "Evidence / Promotion"],
      currentAssets: [],
      automationTargets: ["candidate intake", "smallest asset selection", "agent definition creation"],
      learningSignals: ["candidate backlog"],
      validationGates: []
    },
    {
      id: "learning_improvement_loop",
      label: "Learning & Evaluation Loop",
      role: "supporting",
      status: "fallback",
      purpose: "Accumulate requests, evidence, timings, evaluations, and intent maps into improvement loops.",
      userOutcome: "See why the platform improved and what should improve next.",
      primarySection: "intent",
      primarySurfaces: ["Intent Map", "Evaluations", "Work Timings"],
      currentAssets: [],
      automationTargets: ["intent structuring", "evaluation capture", "bottleneck detection"],
      learningSignals: ["intent themes"],
      validationGates: []
    },
    {
      id: "root_tool_management",
      label: "Root Tool Management",
      role: "supporting",
      status: "fallback",
      purpose: "Keep shared provider accounts, CLI adapters, workspace files, source tools, and decision defaults outside individual tasks.",
      userOutcome: "Configure root tools once so custom agents and guest CLI lanes can reuse the same base.",
      primarySection: "source",
      primarySurfaces: ["Root Tools", "Provider Accounts", "CLI Adapter Settings", "Workspace Explorer"],
      currentAssets: [],
      automationTargets: ["provider setup", "CLI adapter selection", "workspace access setup", "tool sharing"],
      learningSignals: ["configured provider count", "selected CLI adapter", "workspace file count"],
      validationGates: []
    },
    {
      id: "work_visibility",
      label: "Work Visibility",
      role: "supporting",
      status: "fallback",
      purpose: "Show active work, deferred decisions, task-run records, and available agents at a glance.",
      userOutcome: "Immediately see what is running, blocked, recorded, and ready to resume.",
      primarySection: "overview",
      primarySurfaces: ["Core Home Workload Strip", "Decision Inbox", "Task Run Store", "Run Status Bar"],
      currentAssets: [],
      automationTargets: ["active task summarization", "decision count", "task-run count", "agent count"],
      learningSignals: ["active task count", "blocked task count", "deferred decision count"],
      validationGates: []
    },
    {
      id: "observability_monitoring",
      label: "Observability & Monitoring",
      role: "supporting",
      status: "fallback",
      purpose: "Expose structure, documents, source inventory, service readiness, and status as supporting observability.",
      userOutcome: "Inspect platform state without treating the monitoring layer as the product.",
      primarySection: "structure",
      primarySurfaces: ["Structure", "Documents", "History", "Service Readiness"],
      currentAssets: [],
      automationTargets: ["snapshot collection", "customer snapshot sanitization"],
      learningSignals: ["service blockers"],
      validationGates: []
    }
  ],
  promotionLoop: {
    stages: ["observe_repetition_or_gap", "select_smallest_useful_asset", "implement_with_validation"],
    recordTargets: [],
    improvementRule: "Promote repeated work into the smallest useful durable asset first.",
    assetOrder: ["prompt", "workflow", "template", "tool", "skill", "agent", "project_feature"]
  },
  qualitySignals: [],
  validationGates: []
};

const emptyReferencePlatformAdvantages: ReferencePlatformAdvantages = {
  sourcePath: "",
  productPosition: {
    purpose: "",
    primaryRule: "레퍼런스 앱의 장점은 에이전트 작업 루프에 맞춰 제품 기능으로 흡수한다.",
    customerPromise: "앱에서 워크스페이스, 파일, 터미널, 에이전트, 검증, 학습을 바로 다룬다.",
    monitoringBoundary: "모니터링은 운영자 보조면으로 분리한다."
  },
  sourceBoundary: {
    policy: "public_sources_only",
    customerVisibility: "summary_only",
    excludedSources: [],
    acceptedSourceTypes: []
  },
  summary: {
    totalSources: 0,
    platformGroups: 0,
    totalPatterns: 0,
    implemented: 0,
    integratedContract: 0,
    queuedP0: 0,
    highPriority: 0
  },
  referenceLinks: [],
  platformGroups: [],
  transferPatterns: []
};

const emptyOpenSourceFeatureReferences: OpenSourceFeatureReferences = {
  sourcePath: "",
  sourceBoundary: {
    policy: "public_sources_only",
    customerVisibility: "summary_allowed",
    excludedSources: [],
    acceptedSourceTypes: []
  },
  summary: {
    totalLayers: 0,
    totalRepositories: 0,
    installReady: 0,
    directExplorationRequired: 0,
    highPriority: 0
  },
  referenceLinks: [],
  featureReferenceLayers: []
};

const emptyHistoryInsightLoop: HistoryInsightLoop = {
  sourcePath: "",
  summary: {
    sourceDocuments: 0,
    totalPatterns: 0,
    appliedPatterns: 0,
    queuedPatterns: 0,
    activeRecommendations: 0,
    totalEvidenceLinks: 0,
    latestInsightAt: ""
  },
  inferenceStages: [],
  signalGroups: []
};

const emptyFundamentalImprovementStructure: FundamentalImprovementStructure = {
  sourcePath: "",
  summary: {
    sourceDocuments: 0,
    sourcePatterns: 0,
    totalStructuralPrinciples: 0,
    highPriorityPrinciples: 0,
    totalImprovementPackages: 0,
    totalFitnessChecks: 0,
    totalEvidenceLinks: 0,
    latestInsightAt: ""
  },
  operatingModel: [],
  structuralPrinciples: [],
  improvementPackages: [],
  fitnessChecks: []
};

const sectionIds = new Set<SectionId>(sections.map((section) => section.id));
function normalizeSectionId(value: string | null | undefined): SectionId | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().replace(/^#/, "").replace(/^section-/, "");
  return sectionIds.has(normalized as SectionId) ? (normalized as SectionId) : null;
}

type TauriInvoke = <T>(command: string, args?: Record<string, unknown>) => Promise<T>;

declare global {
  interface Window {
    __TAURI__?: {
      core?: {
        invoke?: TauriInvoke;
      };
    };
  }
}

type DesktopHealthStatus = {
  status: string;
  shell: string;
  uiSource: string;
};

type CliAdapterStatus = {
  adapterId: string;
  label: string;
  command: string;
  available: boolean;
  resolvedPath?: string | null;
  version?: string | null;
  lastError?: string | null;
};

type CliDecisionPrompt = {
  question: string;
  lane: string;
  impact: string;
  deferMessage: string;
  resumeAction: string;
};

type CliRunReport = {
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  durationMs: number;
  output: string;
  stderr: string;
  decisionPrompts: CliDecisionPrompt[];
  bounded: boolean;
  maxOutputBytes: number;
};

type CliSessionReport = {
  sessionId: string;
  taskRunId: string;
  taskKind: string;
  pipelineId?: string | null;
  laneId?: string | null;
  laneRole?: string | null;
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  elapsedMs: number;
  stdout: string;
  stderr: string;
  decisionPrompts: CliDecisionPrompt[];
  bounded: boolean;
  maxOutputBytes: number;
  outputTruncated: boolean;
  workingDir: string;
  deferMessageSent: boolean;
  autoDeferQuestions: boolean;
  autoDeferTriggered: boolean;
  decisionInboxItems: number;
  pendingDecisionPrompts: number;
  deferredPromptCount: number;
  decisionCaptureError?: string | null;
  taskRecordPath?: string | null;
  stdoutLogPath?: string | null;
  stderrLogPath?: string | null;
  persistenceError?: string | null;
};

type CliTaskPipelinePresetReport = {
  taskKind: string;
  label: string;
  intent: string;
  laneCount: number;
  adapterIds: string[];
  mergeGate: string;
};

type CliTaskPipelineLaneReport = {
  laneId: string;
  adapterId: string;
  role: string;
  status: string;
  session?: CliSessionReport | null;
  error?: string | null;
};

type CliPipeEdgeReport = {
  pipeId: string;
  fromNode: string;
  toNode: string;
  stream: string;
  mode: string;
  status: string;
};

type CliTaskPipelineInitReport = {
  pipelineId: string;
  taskKind: string;
  label: string;
  status: string;
  intent: string;
  workingDir: string;
  promptBytes: number;
  startedSessions: number;
  missingLanes: number;
  mergeGate: string;
  bounded: boolean;
  maxOutputBytes: number;
  lanes: CliTaskPipelineLaneReport[];
  pipes: CliPipeEdgeReport[];
};

type CliTaskRunRecordReport = {
  recordId: string;
  sessionId: string;
  taskRunId: string;
  taskKind: string;
  pipelineId?: string | null;
  laneId?: string | null;
  laneRole?: string | null;
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  startedAt: string;
  updatedAt: string;
  elapsedMs: number;
  workingDir: string;
  stdoutBytes: number;
  stderrBytes: number;
  outputTruncated: boolean;
  decisionInboxItems: number;
  pendingDecisionPrompts: number;
  deferredPromptCount: number;
  autoDeferQuestions: boolean;
  autoDeferTriggered: boolean;
  recordPath: string;
  stdoutLogPath: string;
  stderrLogPath: string;
};

type CliTaskRunDetailReport = {
  record: CliTaskRunRecordReport;
  recordJson: string;
  stdoutPreview: string;
  stderrPreview: string;
  stdoutTruncated: boolean;
  stderrTruncated: boolean;
  maxLogPreviewBytes: number;
};

type CliTaskRunPruneReport = {
  status: string;
  keepCount: number;
  beforeCount: number;
  afterCount: number;
  removedCount: number;
  removedTaskRunIds: string[];
  errors: string[];
};

type RuntimeDataRootReport = {
  id: string;
  label: string;
  plane: string;
  path: string;
  exists: boolean;
  created: boolean;
  visibility: string;
  purpose: string;
};

type RuntimeDataBoundaryReport = {
  status: string;
  roots: RuntimeDataRootReport[];
  taskRunStorePath: string;
  supportBundleStorePath: string;
  installerPayloadAuditPath: string;
};

type AccumulatedDataStoreReport = {
  id: string;
  label: string;
  recordType: string;
  plane: string;
  path: string;
  status: string;
  count: number;
  sizeBytes: number;
  latestUpdatedAt: string;
  visibility: string;
  purpose: string;
  actionLabel: string;
};

type AccumulatedDataOverviewReport = {
  schemaVersion: string;
  storageFormatVersion: string;
  status: string;
  generatedAt: string;
  indexPath: string;
  formatMigrationStatus: string;
  totalRecords: number;
  totalBytes: number;
  boundedScanMaxFiles: number;
  stores: AccumulatedDataStoreReport[];
  summary: string[];
};

type InstallerPayloadFinding = {
  ruleId: string;
  severity: string;
  path: string;
  reason: string;
};

type InstallerPayloadAuditReport = {
  status: string;
  scannedPaths: string[];
  scannedFiles: number;
  scannedBytes: number;
  flaggedCount: number;
  findings: InstallerPayloadFinding[];
  skippedDirs: string[];
  maxScanFiles: number;
  auditPath: string;
  createdAt: string;
};

type SupportDiagnosticBundleReport = {
  status: string;
  bundleId: string;
  bundleDir: string;
  manifestPath: string;
  runtimeRootsPath: string;
  installerPayloadAuditPath: string;
  taskRunSummaryPath: string;
  recentEventsPath: string;
  includedFiles: string[];
  redacted: boolean;
  createdAt: string;
};

type ServiceReadinessCheck = {
  id: string;
  label: string;
  status: string;
  detail: string;
  requiredForPublic: boolean;
  requiredForInternal: boolean;
};

type ServiceReadinessGroup = {
  id: string;
  label: string;
  status: string;
  passedChecks: number;
  totalChecks: number;
  checks: ServiceReadinessCheck[];
};

type ServiceReadinessNextAction = {
  checkId: string;
  label: string;
  status: string;
  action: string;
};

type ServiceReadinessReport = {
  status: string;
  releaseLane: string;
  score: number;
  generatedAt: string;
  groups: ServiceReadinessGroup[];
  blockers: string[];
  publicBlockers: string[];
  warnings: string[];
  nextActions: ServiceReadinessNextAction[];
  payloadAuditPath: string;
  payloadFlaggedCount: number;
  serviceClaim: string;
};

type WorkspaceTextFile = {
  relativePath: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
};

type WorkspaceWriteReport = {
  relativePath: string;
  sizeBytes: number;
  backupPath: string;
  status: string;
};

type WorkspaceTextFileListReport = {
  status: string;
  source: string;
  totalCount: number;
  returnedCount: number;
  truncated: boolean;
  files: WorkspaceSourceFile[];
};

type WorkspaceResourcePrepareReport = {
  status: string;
  source: string;
  schemaVersion: string;
  rootPath: string;
  generatedAt: string;
  scannedEntries: number;
  totalCount: number;
  returnedCount: number;
  cachedTextFiles: number;
  cachedBytes: number;
  preloadFileLimit: number;
  preloadByteLimit: number;
  memoryBudgetBytes: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
  preloadStrategy: string;
  systemSupported: boolean;
  warmupStatus: string;
  truncated: boolean;
  catalog: WorkspaceTextFileListReport;
};

type WorkspaceResourceWarmupReport = {
  schemaVersion: string;
  status: string;
  source: string;
  rootPath: string;
  startedAt: string;
  finishedAt: string;
  cachedTextFiles: number;
  cachedBytes: number;
  memoryBudgetBytes: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
  preloadStrategy: string;
  systemSupported: boolean;
  error: string;
};

type SharedWorkspacePrepareResult = {
  prepareReport: WorkspaceResourcePrepareReport | null;
  fallbackReport: WorkspaceTextFileListReport | null;
};

type SharedWorkspaceRequestCache<T> = {
  key: string;
  result: T;
  storedAtMs: number;
};

type SharedWorkspaceRequestInFlight<T> = {
  key: string;
  promise: Promise<T>;
};

const SHARED_WORKSPACE_PREPARE_CACHE_TTL_MS = 30_000;
const SHARED_WORKSPACE_WARMUP_CACHE_TTL_MS = 8_000;
let sharedWorkspacePrepareCache: SharedWorkspaceRequestCache<SharedWorkspacePrepareResult> | null = null;
let sharedWorkspacePrepareInFlight: SharedWorkspaceRequestInFlight<SharedWorkspacePrepareResult> | null = null;
let sharedWorkspaceWarmupCache: SharedWorkspaceRequestCache<WorkspaceResourceWarmupReport> | null = null;
let sharedWorkspaceWarmupInFlight: SharedWorkspaceRequestInFlight<WorkspaceResourceWarmupReport> | null = null;

function sharedWorkspacePrepareKey(filter: string, forceRefresh: boolean) {
  return JSON.stringify({ filter, forceRefresh, limit: 240, preloadContents: true });
}

function sharedWorkspaceWarmupKey(forceRefresh: boolean) {
  return JSON.stringify({ forceRefresh });
}

function isFreshSharedCache<T>(cache: SharedWorkspaceRequestCache<T> | null, key: string, ttlMs: number) {
  return Boolean(cache && cache.key === key && Date.now() - cache.storedAtMs <= ttlMs);
}

async function prepareWorkspaceOsResourcesShared(
  tauriInvoke: TauriInvoke,
  options: { filter: string; forceRefresh: boolean }
): Promise<SharedWorkspacePrepareResult> {
  const filter = options.filter.trim();
  const key = sharedWorkspacePrepareKey(filter, options.forceRefresh);
  if (!options.forceRefresh && isFreshSharedCache(sharedWorkspacePrepareCache, key, SHARED_WORKSPACE_PREPARE_CACHE_TTL_MS)) {
    return sharedWorkspacePrepareCache!.result;
  }
  if (sharedWorkspacePrepareInFlight?.key === key) {
    return sharedWorkspacePrepareInFlight.promise;
  }

  const promise = tauriInvoke<WorkspaceResourcePrepareReport>("prepare_workspace_os_resources", {
    filter: filter || null,
    limit: 240,
    preloadContents: true,
    forceRefresh: options.forceRefresh
  })
    .then((prepareReport) => ({ prepareReport, fallbackReport: null }))
    .catch(async (caught) => {
      const message = String(caught instanceof Error ? caught.message : caught);
      if (!/unknown command|command not found|prepare_workspace_os_resources/i.test(message)) {
        throw caught;
      }
      const fallbackReport = await tauriInvoke<WorkspaceTextFileListReport>("list_workspace_text_files", {
        filter: filter || null,
        limit: 240
      });
      return { prepareReport: null, fallbackReport };
    })
    .then((result) => {
      sharedWorkspacePrepareCache = { key, result, storedAtMs: Date.now() };
      return result;
    })
    .finally(() => {
      if (sharedWorkspacePrepareInFlight?.key === key) {
        sharedWorkspacePrepareInFlight = null;
      }
    });

  sharedWorkspacePrepareInFlight = { key, promise };
  return promise;
}

async function warmWorkspaceOsResourcesShared(
  tauriInvoke: TauriInvoke,
  options: { forceRefresh: boolean }
): Promise<WorkspaceResourceWarmupReport> {
  const key = sharedWorkspaceWarmupKey(options.forceRefresh);
  if (!options.forceRefresh && isFreshSharedCache(sharedWorkspaceWarmupCache, key, SHARED_WORKSPACE_WARMUP_CACHE_TTL_MS)) {
    return sharedWorkspaceWarmupCache!.result;
  }
  if (sharedWorkspaceWarmupInFlight?.key === key) {
    return sharedWorkspaceWarmupInFlight.promise;
  }

  const promise = tauriInvoke<WorkspaceResourceWarmupReport>("warm_workspace_os_resources", {
    forceRefresh: options.forceRefresh
  })
    .then((result) => {
      sharedWorkspaceWarmupCache = { key, result, storedAtMs: Date.now() };
      return result;
    })
    .finally(() => {
      if (sharedWorkspaceWarmupInFlight?.key === key) {
        sharedWorkspaceWarmupInFlight = null;
      }
    });

  sharedWorkspaceWarmupInFlight = { key, promise };
  return promise;
}

type WorkspaceResourceSnapshotCache = {
  cacheStatus: string;
  rootPath: string;
  generatedAt: string;
  scannedEntries: number;
  totalCount: number;
  cachedTextFiles: number;
  cachedBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
};

type DesktopResourceSnapshotReport = {
  status: string;
  schemaVersion: string;
  sampledAt: string;
  systemSupported: boolean;
  appPid: number;
  processName: string;
  processMemoryBytes: number;
  processVirtualMemoryBytes: number;
  processCpuUsage: number;
  processRunTimeSeconds: number;
  processTaskCount: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  globalCpuUsage: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  memoryBudgetBytes: number;
  preloadByteLimit: number;
  preloadFileLimit: number;
  preloadStrategy: string;
  workspaceCache: WorkspaceResourceSnapshotCache;
  semanticMetrics: Array<{
    name: string;
    value: number;
    unit: string;
    source: string;
  }>;
  warmupStatus: string;
  warmupSource: string;
  warmupError: string;
};

type DesktopWorkspaceStateReport = {
  schemaVersion: string;
  status: string;
  activeWorkspacePath: string;
  activeWorkspaceSource: string;
  statePath: string;
  managedWorkspaceRoot: string;
  fallbackWorkspacePath: string;
  gitAvailable: boolean;
  gitVersion: string;
  repositoryUrl: string;
  lastOperation: string;
  lastStatus: string;
  updatedAt: string;
  summary: string[];
};

type SourceDraftEntry = {
  relativePath: string;
  baseContent: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
  loadedAt: string;
  lastSavedBackupPath?: string;
  status?: string;
};

type HumanDecisionItem = {
  id: string;
  status: string;
  priority: string;
  source: string;
  createdAt: string;
  question: string;
  impact: string;
  resumeAction: string;
  sessionId?: string | null;
  adapterId?: string | null;
  answerType?: string | null;
  answerText?: string | null;
  answeredAt?: string | null;
  blockedWorkCount: number;
  unblockedWorkCount: number;
};

type HumanDecisionInboxReport = {
  status: string;
  totalCount: number;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
  updatedId?: string | null;
};

type DecisionResumeReport = {
  inbox: HumanDecisionInboxReport;
  session?: CliSessionReport | null;
  resumeStatus: string;
  resumeDetail: string;
};

type AdapterSetupGuide = {
  installHint: string;
  authHint: string;
  verifyCommand: string;
  firstRunCommand: string;
  expectedResult: string;
  sourceUrl: string;
  caution: string;
};

type OutputEvent = {
  id: string;
  type: "question" | "error" | "warning" | "test" | "file" | "info";
  lane: string;
  label: string;
  detail: string;
};

type RuntimeRunTimelineItem = {
  id: string;
  title: string;
  detail: string;
  meta: string;
  status: string;
  tone: "green" | "blue" | "amber" | "red" | "slate" | "violet";
  icon: LucideIcon;
  priority: number;
  timeMs: number;
  actionLabel?: string;
  onAction?: () => void;
};

type DecisionGroup = {
  id: string;
  label: string;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
};

type SourceDiffSummary = {
  dirty: boolean;
  addedLines: number;
  removedLines: number;
  changedLines: number;
  preview: Array<{
    line: number;
    before: string;
    after: string;
  }>;
};

type SessionModePreset = {
  id: string;
  label: string;
  intent: string;
  prompt: string;
};

const SESSION_POLL_INTERVAL_MS = 2000;
const NATIVE_PTY_POLL_INTERVAL_MS = 500;
const SESSION_POLL_IDLE_UPDATE_BUCKET_MS = 5000;
const INBOX_REFRESH_THROTTLE_MS = 4000;
const SESSION_OUTPUT_SIGNATURE_CHARS = 2048;
const TASK_RUN_REFRESH_THROTTLE_MS = 5000;
const SOURCE_DRAFT_UI_SYNC_MS = 180;

const fallbackDesktopAdapters: CliAdapterStatus[] = [
  { adapterId: "claude-code-cli", label: "Claude Code CLI", command: "claude", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "gemini-cli", label: "Gemini CLI", command: "gemini", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "codex-cli", label: "Codex CLI", command: "codex", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "opencode-cli", label: "OpenCode", command: "opencode", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "claw-code-cli", label: "Claw Code", command: "claw", available: false, lastError: "Desktop runtime unavailable." }
];

const adapterSetupGuides: Record<string, AdapterSetupGuide> = {
  "claude-code-cli": {
    installHint: "npm install -g @anthropic-ai/claude-code",
    authHint: "claude login",
    verifyCommand: "claude --version",
    firstRunCommand: "claude",
    expectedResult: "Interactive Claude Code session opens in the selected workspace.",
    sourceUrl: "https://docs.claude.com/en/docs/claude-code/setup",
    caution: "Node.js and account auth are required."
  },
  "gemini-cli": {
    installHint: "npm install -g @google/gemini-cli",
    authHint: "gemini auth login",
    verifyCommand: "gemini --version",
    firstRunCommand: "gemini",
    expectedResult: "Gemini CLI starts with the current workspace as its command context.",
    sourceUrl: "https://github.com/google-gemini/gemini-cli",
    caution: "Verify the package scope before install."
  },
  "codex-cli": {
    installHint: "npm install -g @openai/codex",
    authHint: "codex login",
    verifyCommand: "codex --version",
    firstRunCommand: "codex",
    expectedResult: "Codex CLI starts as a guest execution lane; the platform keeps task state.",
    sourceUrl: "https://help.openai.com/en/articles/11096431",
    caution: "Use the official package and account auth."
  },
  "opencode-cli": {
    installHint: "npm install -g opencode-ai",
    authHint: "Set the provider API key, then run the CLI auth check documented by OpenCode.",
    verifyCommand: "opencode --version",
    firstRunCommand: "opencode",
    expectedResult: "OpenCode starts with the selected provider key and workspace boundary.",
    sourceUrl: "https://opencode.ai/docs/cli/",
    caution: "Confirm PATH resolves the expected binary."
  },
  "claw-code-cli": {
    installHint: "Use the project-documented Claw Code install path, then ensure `claw` is on PATH.",
    authHint: "Follow the project-documented account or provider-key setup before use.",
    verifyCommand: "claw --version",
    firstRunCommand: "claw",
    expectedResult: "Claw Code starts only after source, license, and binary provenance are checked.",
    sourceUrl: "https://github.com/Hawardshin/claw-code",
    caution: "The referenced repository was disabled for clone during review; verify source, license, and binary provenance before installing or bundling."
  }
};

const fallbackProviderCredentialReport: ProviderCredentialReport = {
  schemaVersion: "provider-credentials.v1",
  status: "provider_credentials_ready",
  source: "browser_fallback",
  credentialFilePath: "",
  storageWarning: "Provider credentials are stored by the native desktop runtime, not by the static browser preview.",
  configuredCount: 1,
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
      lastUpdatedAt: "",
      storage: "local_http_runtime",
      credentialSource: "local_runtime",
      setupUrl: "https://ollama.com/download",
      loginUrl: "https://ollama.com/download",
      docsUrl: "https://docs.ollama.com/api",
      caution: "127.0.0.1:11434에서 실행되는 로컬 Ollama 런타임을 사용합니다. API key는 저장하지 않습니다."
    },
    {
      providerId: "openai",
      label: "ChatGPT / OpenAI",
      authMethod: "api_key",
      envVar: "OPENAI_API_KEY",
      defaultModel: "gpt-5.2",
      configured: false,
      environmentAvailable: false,
      status: "not_connected",
      accountHint: "",
      secretPreview: "",
      lastUpdatedAt: "",
      storage: "not_configured",
      credentialSource: "not_configured",
      setupUrl: "https://platform.openai.com/api-keys",
      loginUrl: "https://platform.openai.com/api-keys",
      docsUrl: "https://platform.openai.com/docs/api-reference/authentication",
      caution: "Open the OpenAI Platform API keys page, sign in with the target account, create a restricted project key, then save it here. Do not store ChatGPT web session cookies."
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
      caution: "Use a Claude API key or provider-supported federation; consumer web OAuth tokens are not stored here."
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
      caution: "Open Google AI Studio API keys, sign in with the target Google account, create a restricted Gemini key, then save it here. Vertex AI OAuth or ADC remains a separate production provider flow."
    }
  ]
};

const providerIdsByAdapter: Record<string, string[]> = {
  "codex-cli": ["ollama", "openai"],
  "claude-code-cli": ["anthropic"],
  "gemini-cli": ["google-gemini"],
  "opencode-cli": ["ollama", "openai", "anthropic", "google-gemini"],
  "claw-code-cli": ["ollama", "openai", "anthropic", "google-gemini"]
};

const researchInsightAgentId = "research-insight-planner-agent";
const researchInsightAgentConfigPath = "agent-platform/configs/agents/research-insight-planner-agent.json";
const researchInsightPlanTemplatePath = "agent-platform/configs/planning/research-insight-plan-template.json";

const defaultSearchAgentRunForm: SearchAgentRunForm = {
  objective: "사용자 요청을 조사해서 실행 가능한 계획과 검증 기준으로 정리하기",
  questions:
    "현재 요청을 처리하려면 어떤 외부 근거가 필요한가?\n기존 저장소 지식 중 무엇을 재사용해야 하는가?\n실행 전에 보류해야 할 사용자 결정은 무엇인가?",
  searchChannels: "web search\nrepository search",
  captureTargets: "_history/web-searches/YYYY/\n_research/\n_history/plans/YYYY/",
  notes: "출처, 한계, 계획 영향을 분리하고 약한 근거는 실행 근거로 쓰지 않습니다.",
  providerId: "ollama",
  model: "llama3.2"
};

const defaultSearchAgentChatMessages: SearchAgentChatMessage[] = [
  {
    id: "research-agent-ready",
    role: "agent",
    title: "검색 에이전트",
    body: "여기에 작업을 입력하면 기존 research-insight-planner-agent가 외부 검색, 저장소 근거 확인, 실행 계획 작성을 맡습니다.",
    meta: researchInsightAgentId
  },
  {
    id: "research-agent-runtime",
    role: "system",
    title: "작업 방식",
    body: "Ollama 같은 로컬 모델이나 연결된 제공자 계정이 있으면 이 채팅에서 바로 작업하고, 결과는 작업 실행 저장소에 저장됩니다. CLI는 보조 실행 경로로만 사용됩니다.",
    meta: "local/provider model + optional CLI lane + task-run store"
  }
];

const agentCoreSampleSourceUrl = "https://github.com/awslabs/agentcore-samples";

const agentCoreCapabilityOptions: AgentCoreCapabilityOption[] = [
  {
    id: "runtime",
    labelKo: "런타임",
    labelEn: "Runtime",
    detailKo: "긴 작업 실행과 상태 기록",
    detailEn: "Long-running execution and state records",
    resourceKo: "런타임",
    resourceEn: "Runtime",
    lifecycleKo: "생성 -> 호출",
    lifecycleEn: "Create -> Invoke",
    localCapability: "local_agent_runtime",
    guardrailKo: "긴 실행은 작업 실행 기록과 취소/복구 경계를 가져야 합니다",
    guardrailEn: "Long runs need task-run records plus cancel and recovery boundaries"
  },
  {
    id: "memory",
    labelKo: "메모리",
    labelEn: "Memory",
    detailKo: "작업 기억과 선호 재사용",
    detailEn: "Reusable task memory and preferences",
    resourceKo: "메모리",
    resourceEn: "Memory",
    lifecycleKo: "설정 -> 호출",
    lifecycleEn: "Configure -> Invoke",
    localCapability: "workspace_memory",
    guardrailKo: "메모리 후보는 출처, 만료, 민감정보 제외 기준을 가져야 합니다",
    guardrailEn: "Memory candidates need provenance, expiry, and sensitive-data exclusion rules"
  },
  {
    id: "gateway",
    labelKo: "게이트웨이",
    labelEn: "Gateway",
    detailKo: "MCP/API/CLI 도구 연결",
    detailEn: "MCP, API, and CLI tool access",
    resourceKo: "게이트웨이",
    resourceEn: "Gateway",
    lifecycleKo: "설정 -> 호출",
    lifecycleEn: "Configure -> Invoke",
    localCapability: "tool_gateway_catalog",
    guardrailKo: "도구 호출은 권한 범위와 호출 추적 기록을 남겨야 합니다",
    guardrailEn: "Tool calls need scoped authorization and invocation traces"
  },
  {
    id: "browser",
    labelKo: "브라우저",
    labelEn: "Browser",
    detailKo: "웹 탐색과 화면 검증",
    detailEn: "Web browsing and visual verification",
    resourceKo: "기본 제공 도구",
    resourceEn: "Built-in Tools",
    lifecycleKo: "호출 -> 관측",
    lifecycleEn: "Invoke -> Observe",
    localCapability: "browser_verification_lane",
    guardrailKo: "브라우저 작업은 사용자가 볼 수 있는 상태와 위험 동작 확인을 분리해야 합니다",
    guardrailEn: "Browser work must separate visible state checks from risky-action confirmation"
  },
  {
    id: "code_interpreter",
    labelKo: "코드 실행기",
    labelEn: "Code Interpreter",
    detailKo: "Python/JS 실행과 산출물 검증",
    detailEn: "Python/JS execution and artifact checks",
    resourceKo: "기본 제공 도구",
    resourceEn: "Built-in Tools",
    lifecycleKo: "호출 -> 검증",
    lifecycleEn: "Invoke -> Validate",
    localCapability: "sandboxed_code_execution",
    guardrailKo: "코드 실행은 샌드박스, 입출력 기록, 자원 정리 기준을 가져야 합니다",
    guardrailEn: "Code execution needs sandboxing, I/O records, and resource cleanup rules"
  },
  {
    id: "identity",
    labelKo: "계정/권한",
    labelEn: "Identity",
    detailKo: "계정/권한/커넥터 범위",
    detailEn: "Account, permission, and connector scope",
    resourceKo: "계정/권한",
    resourceEn: "Identity",
    lifecycleKo: "설정 -> 승인",
    lifecycleEn: "Configure -> Authorize",
    localCapability: "scoped_identity_broker",
    guardrailKo: "계정과 커넥터 권한은 최소 권한과 회수 경로를 가져야 합니다",
    guardrailEn: "Accounts and connector permissions need least privilege and revocation paths"
  },
  {
    id: "policy",
    labelKo: "정책",
    labelEn: "Policy",
    detailKo: "행동 경계와 승인 규칙",
    detailEn: "Action boundaries and approval rules",
    resourceKo: "정책",
    resourceEn: "Policy",
    lifecycleKo: "승인 -> 관리",
    lifecycleEn: "Authorize -> Govern",
    localCapability: "action_policy_gate",
    guardrailKo: "고위험 작업은 정책 게이트와 사용자 승인 기록을 통과해야 합니다",
    guardrailEn: "High-risk actions must pass policy gates and user approval records"
  },
  {
    id: "observability",
    labelKo: "관측",
    labelEn: "Observability",
    detailKo: "추적, 로그, 병목 관측",
    detailEn: "Trace, logs, and bottleneck visibility",
    resourceKo: "관측",
    resourceEn: "Observability",
    lifecycleKo: "관측 -> 디버그",
    lifecycleEn: "Observe -> Debug",
    localCapability: "agent_observability_trace",
    guardrailKo: "관측 데이터는 민감정보를 숨기고 작업, 실행, 평가 기록에 연결돼야 합니다",
    guardrailEn: "Observability data must redact sensitive values and connect to task, run, and evaluation records"
  },
  {
    id: "evaluation",
    labelKo: "평가",
    labelEn: "Evaluations",
    detailKo: "품질 게이트와 재작업 판단",
    detailEn: "Quality gates and rework decisions",
    resourceKo: "평가",
    resourceEn: "Evaluations",
    lifecycleKo: "평가 -> 개선",
    lifecycleEn: "Evaluate -> Improve",
    localCapability: "evaluation_quality_gate",
    guardrailKo: "평가는 검증 명령, 근거 부족 항목, 롤백 조건을 함께 남겨야 합니다",
    guardrailEn: "Evaluations need validation commands, grounding gaps, and rollback conditions"
  }
];

const agentCoreCapabilityOptionById = new Map(agentCoreCapabilityOptions.map((option) => [option.id, option]));

const agentCoreBlueprints: AgentCoreBlueprint[] = [
  {
    id: "agentcore_production_research_agent",
    label: "Production Research Agent",
    sourceLabel: "awslabs/agentcore-samples · getting-started + runtime",
    sourceUrl: agentCoreSampleSourceUrl,
    summaryKo: "검색/조사 에이전트를 로컬 실행, 결과 기록, 배포 사전점검, 평가까지 이어지는 제품 흐름으로 만듭니다.",
    summaryEn: "Turns a research agent into a product flow with local run, records, deployment preflight, and evaluation.",
    primaryUseKo: "이미 만든 검색 에이전트를 팔 수 있는 기본 작업 에이전트로 다듬을 때",
    primaryUseEn: "Use when turning the existing search agent into the default sellable work agent.",
    agentId: "production-research-agent",
    factoryLabel: "Production Research Agent",
    factoryGoalKo: "외부 검색, 저장소 근거, 실행 계획, 검증 기준을 작업 실행 기록과 평가 기록으로 남기는 검색 에이전트를 만듭니다.",
    factoryGoalEn: "Create a research agent that stores external evidence, repository context, execution plans, and validation criteria as task-run and evaluation records.",
    role: "production research and planning agent with runtime records, validation, and evaluation gates",
    capabilities: ["runtime", "direct_provider_task", "task_run_store", "evaluation", "observability"],
    lifecycle: ["create", "dev", "invoke", "evaluate", "package"],
    outputRecords: ["task-run record", "web-search record", "plan", "validation", "request trace"],
    safetyGates: ["web-first evidence", "source ranking", "secret redaction", "validation before close-out"],
    defaultObjectiveKo: "AgentCore 샘플 구조를 참고해 기존 검색 에이전트를 상용 조사 에이전트로 제품화하는 실행 계획과 검증 기준을 작성하기",
    defaultObjectiveEn: "Use AgentCore sample structure to productize the existing search agent as a production research agent with an execution plan and validation criteria.",
    defaultQuestionsKo: "이 에이전트가 생성/개발/호출/평가 흐름에서 어떤 데이터를 남겨야 하는가?\n로컬 제공자 API 실행과 선택형 CLI 실행 경로의 책임은 어떻게 나눌 것인가?\n배포 전 어떤 검증과 사용자 결정이 필요한가?",
    defaultQuestionsEn: "What data should this agent leave across create/dev/invoke/evaluate?\nHow should direct provider API work and optional CLI lanes divide responsibility?\nWhat validation and user decisions are required before deployment?",
    defaultNotesKo: "AgentCore는 AWS 선택형 배포 어댑터로 취급하고, 기본 작업 상태와 기록은 데스크톱 앱이 소유합니다.",
    defaultNotesEn: "Treat AgentCore as an optional AWS deployment adapter while the desktop app owns default task state and records."
  },
  {
    id: "agentcore_memory_agent",
    label: "Memory-Enabled Work Agent",
    sourceLabel: "awslabs/agentcore-samples · memory",
    sourceUrl: agentCoreSampleSourceUrl,
    summaryKo: "작업 기록, 사용자 선호, 반복 결정, 검증 결과를 다음 실행에 재사용하는 메모리 중심 에이전트입니다.",
    summaryEn: "A memory-centered agent that reuses task history, preferences, repeated decisions, and validation outcomes.",
    primaryUseKo: "반복 작업을 줄이고 누적 데이터로 성능이 좋아지는 구조가 필요할 때",
    primaryUseEn: "Use when accumulated data should reduce repeated work and improve future runs.",
    agentId: "memory-enabled-work-agent",
    factoryLabel: "Memory Enabled Work Agent",
    factoryGoalKo: "작업 실행 저장소, 결정함, 평가 기록에서 재사용 가능한 메모리를 선별해 다음 작업에 주입하는 에이전트를 만듭니다.",
    factoryGoalEn: "Create an agent that selects reusable memory from task runs, decisions, and evaluation history for future work.",
    role: "memory curator and context injection agent for repeated workspace tasks",
    capabilities: ["memory", "task_run_store", "decision_inbox", "preference_reuse", "evaluation"],
    lifecycle: ["create", "attach memory", "invoke", "summarize", "evaluate"],
    outputRecords: ["memory candidate", "decision reuse note", "evaluation signal", "improvement candidate"],
    safetyGates: ["private path exclusion", "provenance", "stale memory review", "user-visible memory source"],
    defaultObjectiveKo: "작업 기록과 결정 기록에서 재사용 가능한 메모리 후보를 찾아 다음 에이전트 실행에 안전하게 주입하는 구조 설계하기",
    defaultObjectiveEn: "Design how reusable memory candidates from task and decision history can be safely injected into future agent runs.",
    defaultQuestionsKo: "어떤 기록을 장기 메모리로 승격할 수 있는가?\n낡거나 틀린 메모리를 어떻게 표시하고 회수할 것인가?\n사용자가 메모리 근거를 어디에서 확인해야 하는가?",
    defaultQuestionsEn: "Which records can become long-term memory?\nHow should stale or wrong memory be marked and retired?\nWhere should users inspect memory provenance?",
    defaultNotesKo: "민감 파일과 원본 비공개 내용은 메모리 후보에서 제외하고, 근거와 만료 정책을 함께 남깁니다.",
    defaultNotesEn: "Exclude sensitive files and raw private content from memory candidates, and store provenance plus expiry policy."
  },
  {
    id: "agentcore_gateway_tool_agent",
    label: "Gateway Tool Agent",
    sourceLabel: "awslabs/agentcore-samples · gateway + MCP",
    sourceUrl: agentCoreSampleSourceUrl,
    summaryKo: "로컬 Python 에이전트가 MCP, HTTP API, 파일/브라우저/CLI 같은 도구를 권한/라우팅/관측과 함께 호출하는 도구 연결형 에이전트입니다.",
    summaryEn: "A tool-connected agent where the local Python agent calls MCP, HTTP APIs, files, browser, and CLI tools with auth, routing, and observability.",
    primaryUseKo: "파일 시스템, 브라우저, GitHub, 배포 CLI 같은 외부 도구를 안전하게 붙일 때",
    primaryUseEn: "Use when attaching external tools such as filesystem, browser, GitHub, or deployment CLIs safely.",
    agentId: "gateway-tool-agent",
    factoryLabel: "Gateway Tool Agent",
    factoryGoalKo: "외부 도구를 직접 흩뿌리지 않고 커넥터/게이트웨이 목록, 권한 범위, 호출 기록으로 관리하는 에이전트를 만듭니다.",
    factoryGoalEn: "Create an agent that manages external tools through connector/gateway inventories, permission scopes, and invocation records.",
    role: "tool gateway agent that routes approved connectors and records tool calls",
    capabilities: ["gateway", "mcp", "identity", "tool_catalog", "observability"],
    lifecycle: ["register target", "authorize", "invoke tool", "record trace", "review"],
    outputRecords: ["tool catalog", "auth state", "tool call trace", "policy note"],
    safetyGates: ["connector trust review", "auth state visibility", "least privilege", "tool output provenance"],
    defaultObjectiveKo: "데스크톱 앱의 파일/터미널/브라우저/외부 API 연결을 AgentCore Gateway 패턴처럼 커넥터 목록과 권한 검토 흐름으로 재구성하기",
    defaultObjectiveEn: "Reshape desktop file, terminal, browser, and API integrations into a connector catalog with permission review, following AgentCore gateway patterns.",
    defaultQuestionsKo: "어떤 도구가 기본 제공이고 어떤 도구가 선택형 커넥터인가?\n권한 요청과 회수는 어디에서 일어나야 하는가?\n도구 호출 기록은 어떤 작업 실행 기록에 연결해야 하는가?",
    defaultQuestionsEn: "Which tools are built-in and which are optional connectors?\nWhere should permission grant and revocation happen?\nWhich task-run record should tool calls attach to?",
    defaultNotesKo: "MCP/외부 도구는 설정의 커넥터 목록과 작업 실행 전 사전 점검에서 드러나야 합니다.",
    defaultNotesEn: "MCP and external tools should be visible in settings connector catalog and task preflight."
  },
  {
    id: "agentcore_evaluation_guarded_agent",
    label: "Evaluation-Guarded Agent",
    sourceLabel: "awslabs/agentcore-samples · evaluations + observability",
    sourceUrl: agentCoreSampleSourceUrl,
    summaryKo: "LLM-as-judge, trace, 검증 명령, 사용자 리뷰를 작업 결과의 품질 게이트로 묶는 에이전트입니다.",
    summaryEn: "An agent that binds LLM-as-judge, traces, validation commands, and user review into quality gates.",
    primaryUseKo: "에이전트가 결과만 내는 게 아니라 합격/재작업 판단까지 남겨야 할 때",
    primaryUseEn: "Use when the agent must leave pass/rework decisions, not just output.",
    agentId: "evaluation-guarded-agent",
    factoryLabel: "Evaluation Guarded Agent",
    factoryGoalKo: "작업 결과마다 평가 기준, 검증 명령, 재작업 조건, 근거 부족 항목을 남기는 품질 게이트 에이전트를 만듭니다.",
    factoryGoalEn: "Create a quality-gate agent that records evaluation criteria, validation commands, rework conditions, and grounding gaps per task.",
    role: "evaluation and quality gate agent for production task outputs",
    capabilities: ["evaluation", "observability", "validation", "trace", "rollback"],
    lifecycle: ["invoke", "trace", "evaluate", "rework", "accept"],
    outputRecords: ["evaluation report", "trace summary", "validation log", "rollback note"],
    safetyGates: ["unsupported claim check", "validation command required", "rollback plan", "human accept gate"],
    defaultObjectiveKo: "현재 에이전트 작업 결과가 상용 품질 게이트를 통과하려면 어떤 평가, 추적, 검증, 롤백 기록이 필요한지 정리하기",
    defaultObjectiveEn: "Define which evaluation, trace, validation, and rollback records are needed for current agent work to pass production quality gates.",
    defaultQuestionsKo: "어떤 실패가 자동 재작업이고 어떤 실패가 사용자 결정인가?\n검증 명령은 어디에 저장되고 누가 실행하는가?\n평가 결과를 다음 에이전트 개선으로 어떻게 연결하는가?",
    defaultQuestionsEn: "Which failures trigger automatic rework and which require user decisions?\nWhere are validation commands stored and who runs them?\nHow should evaluation results feed future agent improvement?",
    defaultNotesKo: "관측은 메인 기능이 아니라 품질 판단과 개선 루프를 돕는 보조 계층으로 둡니다.",
    defaultNotesEn: "Keep observability as a support layer for quality judgment and improvement, not the main feature."
  }
];

const sessionModePresets: SessionModePreset[] = [
  {
    id: "research_insight_agent",
    label: "검색 에이전트",
    intent: "Use the existing research-insight-planner-agent for grounded search, source ranking, and execution planning.",
    prompt: renderSearchAgentPrompt(defaultSearchAgentRunForm, "ko")
  },
  {
    id: "user_task",
    label: "User Task",
    intent: "Deliver the requested task with concise questions only when blocked.",
    prompt:
      "현재 사용자의 요청을 기준으로 작업을 진행해줘. 소스에 영향을 주는 결정이 필요하면 질문을 명확히 남기고, 사용자가 없으면 해당 결정만 보류해줘."
  },
  {
    id: "platform_improvement",
    label: "Platform Improvement",
    intent: "Improve the platform while preserving requirements, specs, and validation.",
    prompt:
      "이 플랫폼 자체를 개선하는 관점으로 살펴보고, 요구사항/스펙/검증/히스토리와 충돌하지 않게 작은 개선 단위로 진행해줘."
  },
  {
    id: "knowledge_accumulation",
    label: "Knowledge Accumulation",
    intent: "Turn messy output into durable structured knowledge.",
    prompt:
      "이번 작업에서 나온 로그, 질문, 결정, 근거를 구조화해 재사용 가능한 지식으로 정리해줘. 출처와 불확실성을 분리해서 기록해줘."
  },
  {
    id: "review_verify",
    label: "Review & Verify",
    intent: "Check risks, missing tests, and unsupported claims before proceeding.",
    prompt:
      "현재 변경 또는 계획을 리뷰해줘. 버그, 누락된 검증, 리소스 누수, 사용자 결정이 필요한 지점을 우선순위로 정리해줘."
  }
];

const fallbackTaskPipePresets: CliTaskPipelinePresetReport[] = [
  {
    taskKind: "research_insight_agent_pipe",
    label: "Search Agent Pipe",
    intent: "Existing research-insight-planner-agent, source ranking, and skeptic review lanes initialize from one question.",
    laneCount: 3,
    adapterIds: ["codex-cli", "gemini-cli", "claude-code-cli"],
    mergeGate: "research_insight_merge_gate"
  },
  {
    taskKind: "platform_improvement_pipe",
    label: "Platform Improvement Pipe",
    intent: "Implementation, review, research, orchestration, and fallback lanes initialize from one task intake.",
    laneCount: 5,
    adapterIds: ["codex-cli", "claude-code-cli", "gemini-cli", "claw-code-cli", "opencode-cli"],
    mergeGate: "platform_merge_gate"
  },
  {
    taskKind: "knowledge_accumulation_pipe",
    label: "Knowledge Accumulation Pipe",
    intent: "Structuring, skeptic, and durable record lanes initialize from messy output.",
    laneCount: 3,
    adapterIds: ["gemini-cli", "claude-code-cli", "codex-cli"],
    mergeGate: "knowledge_merge_gate"
  },
  {
    taskKind: "review_verify_pipe",
    label: "Review & Verify Pipe",
    intent: "Bug review, validation, and contrary lanes initialize before release.",
    laneCount: 3,
    adapterIds: ["claude-code-cli", "codex-cli", "gemini-cli"],
    mergeGate: "validation_merge_gate"
  }
];

const defaultRuntimeInitDefaults: RuntimeInitDefaults = {
  adapterId: "codex-cli",
  sessionModeId: sessionModePresets[0].id,
  taskPipeKind: fallbackTaskPipePresets[0].taskKind,
  autoDeferQuestions: true
};

const defaultDesktopPreferences: DesktopPreferences = {
  schemaVersion: DESKTOP_PREFERENCES_SCHEMA_VERSION,
  uiLanguage: "ko",
  themeMode: "system",
  sidebarMode: "collapsed",
  terminalDrawerOpen: false,
  runtimeInitDefaults: defaultRuntimeInitDefaults,
  pinnedSections: defaultPinnedSections
};

const defaultAgentFactoryForm: AgentFactoryForm = {
  agentId: "workspace-improvement-agent",
  label: "Workspace Improvement Agent",
  goal: "반복되는 작업 기록, 검증 결과, 사용자 피드백을 보고 다음 개선 후보를 제안합니다.",
  role: "bounded capability agent that turns accumulated evidence into small actionable improvements",
  tools: "workspace files\nrequirements/spec records\nvalidation logs\nhuman decision inbox",
  guardrails: "민감한 파일을 읽지 않습니다\n근거 없는 주장을 사실로 쓰지 않습니다\n승격 전 검증 명령과 롤백 계획을 남깁니다",
  validationCommands: "PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/workspace-improvement-agent.json\nPYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents",
  outputContract: "JSON 또는 Markdown으로 목표, 소스 근거, 선택한 최소 산출물, 검증, 롤백을 반환합니다.",
  ownerProject: "agent-platform",
  targetPath: "agent-platform/configs/agents/workspace-improvement-agent.json",
  rollbackPlan: "생성된 에이전트 명세를 비활성화하거나 삭제하고 제안 기록을 보관 처리합니다."
};

function buildAgentFactoryFormFromAgentCoreBlueprint(
  blueprint: AgentCoreBlueprint,
  language: UiLanguage,
  selectedCapabilityIds: string[] = blueprint.capabilities
): AgentFactoryForm {
  const ko = language === "ko";
  const selectedCapabilities = selectedCapabilityIds
    .map((capabilityId) => agentCoreCapabilityOptionById.get(capabilityId))
    .filter((item): item is AgentCoreCapabilityOption => Boolean(item));
  const capabilityBundleLabels = selectedCapabilities.map((item) => (ko ? item.labelKo : item.labelEn));
  const localRuntimeCapabilities = [
    ...blueprint.capabilities,
    ...selectedCapabilityIds,
    ...selectedCapabilities.map((item) => item.localCapability),
    "local_python_agent_runtime",
    "local_process_execution",
    "local_task_run_store",
    "provider_account_direct_run",
    "optional_agentcore_deployment_adapter"
  ].filter((item, index, source) => source.indexOf(item) === index);
  const guardrails = [
    ...blueprint.safetyGates,
    ...selectedCapabilities.map((item) => (ko ? item.guardrailKo : item.guardrailEn)),
    ko ? "에이전트와 Python 실행은 로컬 프로세스/런타임에서 시작합니다" : "Agent and Python execution start in the local process/runtime",
    ko ? "원격 API나 클라우드 함수는 도구 커넥터일 뿐 실행 호스트가 아닙니다" : "Remote APIs or cloud functions are tool connectors, not the execution host",
    ko ? "AWS AgentCore는 선택형 배포 어댑터로만 사용합니다" : "Treat AWS AgentCore as an optional deployment adapter",
    ko ? "앱의 로컬 런타임이 실행, 작업 상태, 기록을 소유합니다" : "The local app runtime owns execution, task state, and records"
  ];

  return {
    agentId: blueprint.agentId,
    label: blueprint.factoryLabel,
    goal: `${ko ? blueprint.factoryGoalKo : blueprint.factoryGoalEn}\n\n${
	      ko ? "동시 능력 묶음" : "Multi-capability bundle"
    }: ${capabilityBundleLabels.length ? capabilityBundleLabels.join(", ") : ko ? "기본값" : "default"}`,
    role: blueprint.role,
    tools: localRuntimeCapabilities.join("\n"),
    guardrails: guardrails.join("\n"),
    validationCommands:
      "corepack pnpm --filter platform-desktop-app test\ncorepack pnpm --filter workspace-monitor test\ncorepack pnpm --filter workspace-monitor run check",
    outputContract: `${blueprint.outputRecords.join(", ")} / capabilities=${capabilityBundleLabels.join(" + ")} / lifecycle=${blueprint.lifecycle.join(" -> ")}`,
    ownerProject: "agent-platform",
    targetPath: `agent-platform/configs/agents/${blueprint.agentId}.json`,
    rollbackPlan: ko
	      ? "생성된 에이전트 제안을 비활성화하거나 보관 처리하고, 근거/검증/작업 실행 기록은 검토용으로 보존합니다."
      : "Disable or archive the generated agent proposal, keeping evidence, validation, and task-run records for review."
  };
}

function desktopPreferencesFromState(input: {
  uiLanguage: UiLanguage;
  themeMode: AppThemeMode;
  sidebarMode: SidebarMode;
  terminalDrawerOpen: boolean;
  runtimeInitDefaults: RuntimeInitDefaults;
  pinnedSections: SectionId[];
}): DesktopPreferences {
  return {
    schemaVersion: DESKTOP_PREFERENCES_SCHEMA_VERSION,
    uiLanguage: input.uiLanguage,
    themeMode: input.themeMode,
    sidebarMode: input.sidebarMode,
    terminalDrawerOpen: input.terminalDrawerOpen,
    runtimeInitDefaults: input.runtimeInitDefaults,
    pinnedSections: normalizePinnedSections(input.pinnedSections)
  };
}

function normalizePinnedSections(sectionsToNormalize: unknown): SectionId[] {
  const next = Array.isArray(sectionsToNormalize)
    ? sectionsToNormalize.filter((item): item is SectionId => sectionIds.has(item as SectionId))
    : [];
  return next.slice(0, 6);
}

function normalizeDesktopPreferences(preferences: Partial<DesktopPreferences> | null | undefined): DesktopPreferences {
  const runtimeInit = preferences?.runtimeInitDefaults || defaultRuntimeInitDefaults;
  const pinned = normalizePinnedSections(preferences?.pinnedSections);
  return {
    schemaVersion: DESKTOP_PREFERENCES_SCHEMA_VERSION,
    uiLanguage: preferences?.uiLanguage === "en" ? "en" : "ko",
    themeMode:
      preferences?.themeMode === "dark" || preferences?.themeMode === "light" || preferences?.themeMode === "system"
        ? preferences.themeMode
        : defaultDesktopPreferences.themeMode,
    sidebarMode: preferences?.sidebarMode === "expanded" ? "expanded" : "collapsed",
    terminalDrawerOpen: typeof preferences?.terminalDrawerOpen === "boolean" ? preferences.terminalDrawerOpen : false,
    runtimeInitDefaults: {
      adapterId:
        typeof runtimeInit.adapterId === "string" && fallbackDesktopAdapters.some((adapter) => adapter.adapterId === runtimeInit.adapterId)
          ? runtimeInit.adapterId
          : defaultRuntimeInitDefaults.adapterId,
      sessionModeId:
        typeof runtimeInit.sessionModeId === "string" && sessionModePresets.some((mode) => mode.id === runtimeInit.sessionModeId)
          ? runtimeInit.sessionModeId
          : defaultRuntimeInitDefaults.sessionModeId,
      taskPipeKind:
        typeof runtimeInit.taskPipeKind === "string" && fallbackTaskPipePresets.some((preset) => preset.taskKind === runtimeInit.taskPipeKind)
          ? runtimeInit.taskPipeKind
          : defaultRuntimeInitDefaults.taskPipeKind,
      autoDeferQuestions:
        typeof runtimeInit.autoDeferQuestions === "boolean"
          ? runtimeInit.autoDeferQuestions
          : defaultRuntimeInitDefaults.autoDeferQuestions
    },
    pinnedSections: pinned.length ? pinned : defaultPinnedSections
  };
}

function providerInputsFromReport(
  report: ProviderCredentialReport,
  current: Record<string, ProviderCredentialInputState>
): Record<string, ProviderCredentialInputState> {
  const next = { ...current };
  for (const provider of report.providers) {
    next[provider.providerId] = {
      accountHint: next[provider.providerId]?.accountHint ?? provider.accountHint ?? "",
      secret: next[provider.providerId]?.secret ?? ""
    };
  }
  return next;
}

function providerAuthStatusForAdapter(
  adapterId: string,
  report: ProviderCredentialReport | null | undefined,
  uiLanguage: UiLanguage
) {
  const providerIds = providerIdsByAdapter[adapterId] || [];
  if (providerIds.length === 0) {
    return uiLanguage === "ko" ? "인증 선택" : "auth optional";
  }
  const providers = report?.providers || [];
  const matched = providers.filter((provider) => providerIds.includes(provider.providerId));
  if (matched.some((provider) => provider.configured)) {
    return uiLanguage === "ko" ? "계정 연결됨" : "account connected";
  }
  return uiLanguage === "ko" ? "계정 필요" : "account needed";
}

function adapterAuthReadyForAdapter(adapterId: string, report: ProviderCredentialReport | null | undefined) {
  const providerIds = providerIdsByAdapter[adapterId] || [];
  if (providerIds.length === 0) {
    return true;
  }
  const providers = report?.providers || [];
  return providers
    .filter((provider) => providerIds.includes(provider.providerId))
    .some((provider) => provider.configured || provider.authMethod === "local_http");
}

export function MonitorShell({ snapshot, initialSection }: { snapshot: WorkspaceSnapshot; initialSection?: string }) {
  const initialResolvedSection = normalizeSectionId(initialSection) || "overview";
  const [section, setSection] = useState<SectionId>(() => initialResolvedSection);
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>("ko");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [historyDate, setHistoryDate] = useState("all");
  const [historyCategory, setHistoryCategory] = useState("all");
  const [sourceProject, setSourceProject] = useState("all");
  const [sourceLanguage, setSourceLanguage] = useState("all");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [sourceCopyNotice, setSourceCopyNotice] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTabId>("appearance");
  const [settingsSubsectionByTab, setSettingsSubsectionByTab] = useState<Record<SettingsTabId, SettingsSubsectionId>>({
    appearance: "display",
    navigation: "rail",
    execution: "quick",
    data: "filters"
  });
  const [themeMode, setThemeMode] = useState<AppThemeMode>("system");
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("collapsed");
  const [terminalDrawerOpen, setTerminalDrawerOpen] = useState(false);
  const [runtimeInitDefaults, setRuntimeInitDefaults] = useState<RuntimeInitDefaults>(defaultRuntimeInitDefaults);
  const [operatorCenterOpen, setOperatorCenterOpen] = useState(false);
  const [agentSignalsOpen, setAgentSignalsOpen] = useState(false);
  const [agentDetailsOpen, setAgentDetailsOpen] = useState(false);
  const [agentDetailView, setAgentDetailView] = useState<AgentDetailViewId>("collaboration");
  const [agentDetailRenderView, setAgentDetailRenderView] = useState<AgentDetailViewId>("collaboration");
  const [commandQuery, setCommandQuery] = useState("");
  const [buttonFeedbackReady, setButtonFeedbackReady] = useState(false);
  const [startupSurfaceReady, setStartupSurfaceReady] = useState(false);
  const titlebarSectionLabelRef = useRef<HTMLElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const pendingAgentDetailCommitRef = useRef<(() => void) | null>(null);
  const residentStartupPreloadDoneRef = useRef(false);
  const [searchAgentRunForm, setSearchAgentRunForm] = useState<SearchAgentRunForm>(defaultSearchAgentRunForm);
  const [searchAgentChatMessages, setSearchAgentChatMessages] =
    useState<SearchAgentChatMessage[]>(defaultSearchAgentChatMessages);
  const [providerTaskBusy, setProviderTaskBusy] = useState(false);
  const [selectedAgentCoreBlueprintId, setSelectedAgentCoreBlueprintId] = useState(agentCoreBlueprints[0].id);
  const [runtimeLaunchRequest, setRuntimeLaunchRequest] = useState<RuntimeLaunchRequest | null>(null);
  const [agentFactoryForm, setAgentFactoryForm] = useState<AgentFactoryForm>(defaultAgentFactoryForm);
  const [agentFactoryProposal, setAgentFactoryProposal] = useState<AgentFactoryProposalReport | null>(null);
  const [agentFactoryBusy, setAgentFactoryBusy] = useState(false);
  const [agentFactoryNotice, setAgentFactoryNotice] = useState("");
  const [selectedLearningCandidateId, setSelectedLearningCandidateId] = useState("");
  const [learningDecisionAction, setLearningDecisionAction] = useState("promote");
  const [learningAssetType, setLearningAssetType] = useState("agent");
  const [learningDecisionNotes, setLearningDecisionNotes] = useState("");
  const [learningDecisionReport, setLearningDecisionReport] = useState<LearningImprovementDecisionReport | null>(null);
  const [learningDecisionBusy, setLearningDecisionBusy] = useState(false);
  const [learningDecisionNotice, setLearningDecisionNotice] = useState("");
  const [pinnedSections, setPinnedSections] = useState<SectionId[]>(defaultPinnedSections);
  const [recentSections, setRecentSections] = useState<SectionId[]>(["overview"]);
  const [activeTaskIntentId, setActiveTaskIntentId] = useState("");
  const [activeTaskFlowStepId, setActiveTaskFlowStepId] = useState("");
  const [requestedToolMode, setRequestedToolMode] = useState<ToolStudioModeRequest | null>(null);
  const [desktopPreferencesLoaded, setDesktopPreferencesLoaded] = useState(false);
  const [desktopPreferencesPath, setDesktopPreferencesPath] = useState("");
  const [desktopPreferencesSource, setDesktopPreferencesSource] = useState("browser-defaults");
  const [desktopPreferencesStatus, setDesktopPreferencesStatus] = useState("default");
  const [desktopPreferencesError, setDesktopPreferencesError] = useState("");
  const [providerCredentials, setProviderCredentials] = useState<ProviderCredentialReport>(fallbackProviderCredentialReport);
  const [providerCredentialInputs, setProviderCredentialInputs] = useState<Record<string, ProviderCredentialInputState>>({});
  const [providerCredentialBusy, setProviderCredentialBusy] = useState("");
  const [providerCredentialNotice, setProviderCredentialNotice] = useState("");
  const [providerCredentialError, setProviderCredentialError] = useState("");
  const [providerActionFeedback, setProviderActionFeedback] = useState<ProviderActionFeedback | null>(null);
  const [providerModelCatalog, setProviderModelCatalog] = useState<ProviderModelCatalogReport | null>(null);
  const [providerModelBusy, setProviderModelBusy] = useState(false);
  const [providerModelBusyProviderId, setProviderModelBusyProviderId] = useState("");
  const [providerModelError, setProviderModelError] = useState("");
  const [sharedDesktopResourceSnapshot, setSharedDesktopResourceSnapshot] = useState<DesktopResourceSnapshotReport | null>(null);
  const viewModes = snapshot.viewModeCatalog?.modes?.length ? snapshot.viewModeCatalog.modes : fallbackViewModes;
  const languageModes = useMemo(() => {
    const merged = new Map<string, MonitorLanguageMode>();
    for (const mode of fallbackLanguageModes) {
      merged.set(mode.id, mode);
    }
    for (const mode of snapshot.languageModeCatalog?.modes || []) {
      merged.set(mode.id, mode);
    }
    return Array.from(merged.values());
  }, [snapshot.languageModeCatalog?.modes]);
  const [viewMode, setViewMode] = useState(snapshot.viewModeCatalog?.defaultMode || "superadmin_developer");
  const [languageMode, setLanguageMode] = useState(snapshot.languageModeCatalog?.defaultMode || "all");
  const modeFunctionCatalog = snapshot.modeFunctionCatalog ?? emptyModeFunctionCatalog;
  const claudeCodeDesignTransfer = snapshot.claudeCodeDesignTransfer ?? emptyClaudeCodeDesignTransfer;
  const philosophyFeatureExtraction = snapshot.philosophyFeatureExtraction ?? emptyPhilosophyFeatureExtraction;
  const intentFeatureMap = snapshot.intentFeatureMap ?? emptyIntentFeatureMap;
  const structureOverview = snapshot.structureOverview ?? emptyStructureOverview;
  const productFeatureArchitecture = snapshot.productFeatureArchitecture ?? emptyProductFeatureArchitecture;
  const referencePlatformAdvantages = snapshot.referencePlatformAdvantages ?? emptyReferencePlatformAdvantages;
  const openSourceFeatureReferences = snapshot.openSourceFeatureReferences ?? emptyOpenSourceFeatureReferences;
  const historyInsightLoop = snapshot.historyInsightLoop ?? emptyHistoryInsightLoop;
  const fundamentalImprovementStructure =
    snapshot.fundamentalImprovementStructure ?? emptyFundamentalImprovementStructure;
  const [selectedModeFunctionGroupId, setSelectedModeFunctionGroupId] = useState(
    modeFunctionCatalog.groups[0]?.id || "view_mode"
  );
  const localizedSections = useMemo(() => sections.map((item) => sectionForLanguage(item, uiLanguage)), [uiLanguage]);
  const localizedFeatureGroups = useMemo(
    () => featureGroups.map((group) => featureGroupForLanguage(group, uiLanguage)),
    [uiLanguage]
  );
  const [residentSectionIds, setResidentSectionIds] = useState<SectionId[]>(() => {
    const initialResidentSection = normalizeSectionId(initialSection) || "overview";
    return normalizeResidentSectionIds([initialResidentSection, ...startupResidentPreloadSections], initialResidentSection);
  });
  const residentSectionSet = useMemo(() => new Set(residentSectionIds), [residentSectionIds]);
  const markSectionResident = useCallback((targetSection: SectionId) => {
    setResidentSectionIds((current) => {
      const next = normalizeResidentSectionIds([targetSection, ...current], targetSection);
      return next.length === current.length && next.every((item, index) => item === current[index]) ? current : next;
    });
  }, []);
  const activateSection = useCallback((nextSection: SectionId) => {
    markSectionResident(nextSection);
    setSection(nextSection);
    setRecentSections((previous) => [nextSection, ...previous.filter((item) => item !== nextSection)].slice(0, 5));
  }, [markSectionResident]);
  const selectAgentDetailView = useCallback((view: AgentDetailViewId) => {
    setAgentDetailView(view);
    pendingAgentDetailCommitRef.current?.();
    pendingAgentDetailCommitRef.current = scheduleAfterFirstPaint(() => {
      setAgentDetailRenderView(view);
      pendingAgentDetailCommitRef.current = null;
    });
  }, []);
  useEffect(() => {
    const nextSection = normalizeSectionId(initialSection);
    if (nextSection) {
      activateSection(nextSection);
    }
  }, [activateSection, initialSection]);
  useEffect(() => {
    return () => {
      pendingAgentDetailCommitRef.current?.();
    };
  }, []);
  useLayoutEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }
    const root = document.querySelector<HTMLElement>(".desktop-app-root");
    if (!root) {
      return undefined;
    }
    const cleanup = installInstantButtonFeedback(root);
    setButtonFeedbackReady(true);
    return cleanup;
  }, []);
  useEffect(() => {
    if (!buttonFeedbackReady) {
      return undefined;
    }
    const timeoutId = window.setTimeout(() => setStartupSurfaceReady(true), startupSurfaceReadyMinMs);
    return () => window.clearTimeout(timeoutId);
  }, [buttonFeedbackReady]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const idleWindow = window as typeof window & {
      cancelIdleCallback?: (handle: number) => void;
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    };
    let timeoutId: number | null = null;
    let idleId: number | null = null;
    let canceled = false;
    const prewarmTasks = [
      () => void import("@monaco-editor/react"),
      () => void import("@/components/workbench/AgentCollaborationScene"),
      preloadToolStudioPanel,
      preloadDesktopRuntimePanels,
      preloadHomeFeaturePanels,
      preloadAgentDetailPanels,
      preloadAgentBuilderPanels,
      () => void preloadAdminHistoryIndex()
    ];
    const runPrewarmTask = (index = 0) => {
      if (canceled || index >= prewarmTasks.length) {
        return;
      }
      prewarmTasks[index]();
      timeoutId = window.setTimeout(() => runPrewarmTask(index + 1), 90);
    };
    const prewarmWorkSurfaces = () => {
      runPrewarmTask();
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(prewarmWorkSurfaces, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(prewarmWorkSurfaces, 450);
    }

    return () => {
      canceled = true;
      if (idleId !== null) {
        idleWindow.cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);
  useEffect(() => {
    if (section !== "agents") {
      pendingAgentDetailCommitRef.current?.();
      pendingAgentDetailCommitRef.current = null;
      setAgentDetailRenderView(agentDetailView);
    }
    if (section !== "agents" && agentSignalsOpen) {
      setAgentSignalsOpen(false);
    }
    if (section !== "agents" && agentDetailsOpen) {
      setAgentDetailsOpen(false);
    }
  }, [agentDetailView, agentDetailsOpen, agentSignalsOpen, section]);
  useEffect(() => {
    if (agentDetailsOpen) {
      return;
    }
    pendingAgentDetailCommitRef.current?.();
    pendingAgentDetailCommitRef.current = null;
    setAgentDetailRenderView(agentDetailView);
  }, [agentDetailView, agentDetailsOpen]);
  useEffect(() => {
    let canceled = false;
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setDesktopPreferencesLoaded(true);
      setDesktopPreferencesStatus("browser_fallback");
      setDesktopPreferencesSource("browser-defaults");
      return;
    }

    tauriInvoke<DesktopPreferencesReport>("get_desktop_preferences")
      .then((report) => {
        if (canceled) {
          return;
        }
        const preferences = normalizeDesktopPreferences(report.preferences);
        setUiLanguage(preferences.uiLanguage);
        setThemeMode(preferences.themeMode);
        setSidebarMode(preferences.sidebarMode);
        setTerminalDrawerOpen(preferences.terminalDrawerOpen);
        setRuntimeInitDefaults(preferences.runtimeInitDefaults);
        setPinnedSections(preferences.pinnedSections);
        setDesktopPreferencesPath(report.preferencesPath);
        setDesktopPreferencesSource(report.source);
        setDesktopPreferencesStatus(report.status);
        setDesktopPreferencesError("");
        setDesktopPreferencesLoaded(true);
      })
      .catch((preferenceError) => {
        if (canceled) {
          return;
        }
        setDesktopPreferencesLoaded(true);
        setDesktopPreferencesStatus("load_failed");
        setDesktopPreferencesError(String(preferenceError));
      });

    return () => {
      canceled = true;
    };
  }, []);
  useEffect(() => {
    if (!desktopPreferencesLoaded) {
      return;
    }
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    let canceled = false;
    const preferences = desktopPreferencesFromState({
      uiLanguage,
      themeMode,
      sidebarMode,
      terminalDrawerOpen,
      runtimeInitDefaults,
      pinnedSections
    });
    tauriInvoke<DesktopPreferencesReport>("save_desktop_preferences", { preferences })
      .then((report) => {
        if (canceled) {
          return;
        }
        setDesktopPreferencesPath(report.preferencesPath);
        setDesktopPreferencesSource(report.source);
        setDesktopPreferencesStatus(report.status);
        setDesktopPreferencesError("");
      })
      .catch((preferenceError) => {
        if (canceled) {
          return;
        }
        setDesktopPreferencesStatus("save_failed");
        setDesktopPreferencesError(String(preferenceError));
      });

    return () => {
      canceled = true;
    };
  }, [
    desktopPreferencesLoaded,
    pinnedSections,
    runtimeInitDefaults,
    sidebarMode,
    terminalDrawerOpen,
    themeMode,
    uiLanguage
  ]);
  useEffect(() => {
    let canceled = false;
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setProviderCredentials(fallbackProviderCredentialReport);
      return;
    }

    tauriInvoke<ProviderCredentialReport>("list_provider_credentials")
      .then((report) => {
        if (canceled) {
          return;
        }
        setProviderCredentials(report);
        setProviderCredentialInputs((current) => providerInputsFromReport(report, current));
        setProviderCredentialError("");
      })
      .catch((credentialError) => {
        if (canceled) {
          return;
        }
        setProviderCredentials(fallbackProviderCredentialReport);
        setProviderCredentialError(String(credentialError));
      });

    return () => {
      canceled = true;
    };
  }, []);
  useEffect(() => {
    void refreshProviderModels(searchAgentRunForm.providerId);
  }, [providerCredentials.source, providerCredentials.status, searchAgentRunForm.providerId]);
  useEffect(() => {
    if (!commandPaletteOpen) {
      return;
    }
    commandInputRef.current?.focus();
  }, [commandPaletteOpen]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setCommandPaletteOpen((current) => !current);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === ",") {
        event.preventDefault();
        setSettingsOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setOperatorCenterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const currentViewMode = useMemo(() => {
    return viewModes.find((mode) => mode.id === viewMode) || viewModes[0] || fallbackViewModes[2];
  }, [viewMode, viewModes]);
  const currentLanguageMode = useMemo(() => {
    return languageModes.find((mode) => mode.id === languageMode) || languageModes[0] || fallbackLanguageModes[0];
  }, [languageMode, languageModes]);
  const visibleSections = useMemo(() => {
    const allowed = new Set(currentViewMode.allowedSections);
    return localizedSections.filter((item) => allowed.has(item.id));
  }, [currentViewMode, localizedSections]);
  useEffect(() => {
    if (residentStartupPreloadDoneRef.current || typeof window === "undefined" || visibleSections.length === 0) {
      return undefined;
    }
    const allowed = new Set(visibleSections.map((item) => item.id));
    const preloadSections = startupResidentPreloadSections.filter((item) => allowed.has(item));
    if (preloadSections.length === 0) {
      return undefined;
    }

    const idleWindow = window as typeof window & {
      cancelIdleCallback?: (handle: number) => void;
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    };
    let timeoutId: number | null = null;
    let idleId: number | null = null;
    const preloadResidentPanels = () => {
      if (residentStartupPreloadDoneRef.current) {
        return;
      }
      residentStartupPreloadDoneRef.current = true;
      setResidentSectionIds((current) => {
        const next = normalizeResidentSectionIds([...preloadSections, ...current], section);
        return next.length === current.length && next.every((item, index) => item === current[index]) ? current : next;
      });
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(preloadResidentPanels, { timeout: 900 });
    } else {
      timeoutId = window.setTimeout(preloadResidentPanels, 240);
    }

    return () => {
      if (idleId !== null) {
        idleWindow.cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [section, visibleSections]);
  const workVisibleSections = useMemo(() => {
    return visibleSections.filter((item) => !isOperatorSectionId(item.id));
  }, [visibleSections]);
  const selectViewMode = (modeId: string) => {
    const nextMode = viewModes.find((mode) => mode.id === modeId) || currentViewMode;
    setViewMode(nextMode.id);
    if (!nextMode.allowedSections.includes(section)) {
      activateSection((nextMode.allowedSections[0] as SectionId | undefined) || "overview");
    }
  };
  const openModeFunctionOption = (groupId: string, optionId: string) => {
    if (groupId === "view_mode") {
      setSettingsTab("appearance");
      setSettingsSubsectionByTab((current) => ({ ...current, appearance: "view" }));
      setSettingsOpen(true);
      return;
    }

    if (groupId === "language_mode") {
      setSettingsTab("appearance");
      setSettingsSubsectionByTab((current) => ({ ...current, appearance: "language" }));
      setSettingsOpen(true);
      return;
    }

    if (groupId === "section_location" && sectionIds.has(optionId as SectionId)) {
      openSection(optionId as SectionId);
      return;
    }

    if (["desktop_session_mode", "task_pipe", "cli_adapter"].includes(groupId)) {
      setSettingsTab("execution");
      setSettingsSubsectionByTab((current) => ({
        ...current,
        execution: groupId === "cli_adapter" ? "adapter" : groupId === "task_pipe" ? "pipe" : "session"
      }));
      setSettingsOpen(true);
      return;
    }

    const group = modeFunctionCatalog.groups.find((item) => item.id === groupId);
    const option = group?.options.find((item) => item.id === optionId);
    openSection("documents");
    setCategory("all");
    setQuery(option?.sourcePath || group?.sourcePath || option?.label || group?.label || "");
  };

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const sectionPanelsMounted = buttonFeedbackReady;
  const sectionContentReady = sectionPanelsMounted && startupSurfaceReady;
  const shouldRenderSection = useCallback(
    (targetSection: SectionId) => sectionPanelsMounted && residentSectionSet.has(targetSection),
    [residentSectionSet, sectionPanelsMounted]
  );
  const { documents: monitorDocuments, historyDays: monitorHistoryDays, statusText: adminHistoryStatusText } =
    useAdminHistoryIndex(snapshot, section);
  const viewFilteredDocuments = useMemo(() => {
    return monitorDocuments.filter(
      (document) =>
        documentVisibleForMode(document, currentViewMode.id) && documentVisibleForLanguage(document, currentLanguageMode)
    );
  }, [currentLanguageMode, currentViewMode, monitorDocuments]);
  const viewCategories = useMemo(() => {
    return Array.from(new Set(viewFilteredDocuments.map((document) => document.category))).sort();
  }, [viewFilteredDocuments]);
  const filteredDocuments = useMemo(() => {
    return viewFilteredDocuments.filter((document) => {
      const categoryMatches = category === "all" || document.category === category;
      const queryMatches =
        !normalizedQuery ||
        `${document.title} ${document.path} ${document.excerpt}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, normalizedQuery, viewFilteredDocuments]);

  const recentHistory = useMemo(() => {
    return viewFilteredDocuments
      .filter((document) =>
        ["work-summary", "intent-feature-map", "request-trace", "user-request", "evaluation"].includes(document.category)
      )
      .slice(0, 8);
  }, [viewFilteredDocuments]);
  const recentDocuments = useMemo(() => {
    return filteredDocuments.slice(0, section === "documents" ? 30 : 10);
  }, [filteredDocuments, section]);
  const visibleHistoryDays = useMemo(() => {
    return monitorHistoryDays
      .map((day) => {
        const documents = day.documents.filter(
          (document) =>
            documentVisibleForMode(document, currentViewMode.id) && documentVisibleForLanguage(document, currentLanguageMode)
        );
        const categories = summarizeCategories(documents);
        return { ...day, documents, documentsCount: documents.length, categories };
      })
      .filter((day) => day.documents.length > 0);
  }, [currentLanguageMode, currentViewMode, monitorHistoryDays]);
  const historyCategories = useMemo(() => {
    return Array.from(new Set(visibleHistoryDays.flatMap((day) => day.categories.map((item) => item.category)))).sort();
  }, [visibleHistoryDays]);
  const filteredHistoryDays = useMemo(() => {
    return visibleHistoryDays
      .filter((day) => historyDate === "all" || day.date === historyDate)
      .map((day) => {
        const documents = day.documents.filter((document) => {
          const categoryMatches = historyCategory === "all" || document.category === historyCategory;
          const queryMatches =
            !normalizedQuery ||
            `${document.title} ${document.path} ${document.excerpt}`.toLowerCase().includes(normalizedQuery);
          return categoryMatches && queryMatches;
        });
        const categories = summarizeCategories(documents);
        return { ...day, documents, documentsCount: documents.length, categories };
      })
      .filter((day) => day.documents.length > 0);
  }, [historyCategory, historyDate, normalizedQuery, visibleHistoryDays]);
  const latestHistoryDate = visibleHistoryDays[0]?.date || "";
  const agentCatalog = snapshot.agentCatalog ?? [];
  const researchInsightAgent = agentCatalog.find(
    (agent) => agent.id === researchInsightAgentId || agent.name === researchInsightAgentId
  );
  const agentRuntimeCounts = useMemo(() => countBy(agentCatalog, (agent) => agent.runtime || "unknown"), [agentCatalog]);
  const agentStatusCounts = useMemo(
    () => countBy(agentCatalog, (agent) => agent.runtimeStatus || agent.definitionStatus || "unknown"),
    [agentCatalog]
  );
  const taskStatusCounts = useMemo(() => countBy(snapshot.tasks, (task) => task.status || "unknown"), [snapshot.tasks]);
  const collaborationBoard = snapshot.collaborationBoard ?? emptyCollaborationBoard;
  const unifiedOps = snapshot.unifiedOps ?? emptyUnifiedOps;
  const visibleUnifiedEvents = useMemo(() => {
    return unifiedOps.events.filter(
      (event) => opsEventVisibleForMode(event, currentViewMode.id) && opsEventVisibleForLanguage(event, currentLanguageMode)
    );
  }, [currentLanguageMode, currentViewMode, unifiedOps.events]);
  const visibleUnifiedSummary = useMemo(() => summarizeUnifiedOpsEvents(visibleUnifiedEvents, visibleHistoryDays.length), [
    visibleHistoryDays.length,
    visibleUnifiedEvents
  ]);
  const visibleUnifiedLanes = useMemo(() => countBy(visibleUnifiedEvents, (event) => event.lane || "unknown"), [visibleUnifiedEvents]);
  const visibleUnifiedSignalTypes = useMemo(
    () => countBy(visibleUnifiedEvents, (event) => event.signalType || "unknown"),
    [visibleUnifiedEvents]
  );
  const historyCategoryTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const day of visibleHistoryDays) {
      for (const item of day.categories) {
        totals.set(item.category, (totals.get(item.category) || 0) + item.count);
      }
    }
    return Array.from(totals.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
  }, [visibleHistoryDays]);
  const visibleRequirements = currentViewMode.allowedSections.includes("requirements") ? snapshot.requirements : [];
  const visibleSourceFiles = currentViewMode.allowedSections.includes("source") ? snapshot.sourceFiles ?? [] : [];
  const sourceProjects = useMemo(() => {
    return Array.from(new Set(visibleSourceFiles.map((file) => file.project))).sort();
  }, [visibleSourceFiles]);
  const sourceLanguages = useMemo(() => {
    return Array.from(new Set(visibleSourceFiles.map((file) => file.language))).sort();
  }, [visibleSourceFiles]);
  const sourceQuery = section === "source" ? normalizedQuery : "";
  const filteredSourceFiles = useMemo(() => {
    return visibleSourceFiles.filter((file) => {
      const projectMatches = sourceProject === "all" || file.project === sourceProject;
      const languageMatches = sourceLanguage === "all" || file.language === sourceLanguage;
      const queryMatches =
        !sourceQuery || `${file.path} ${file.project} ${file.language} ${file.preview ?? ""}`.toLowerCase().includes(sourceQuery);
      return projectMatches && languageMatches && queryMatches;
    });
  }, [sourceLanguage, sourceProject, sourceQuery, visibleSourceFiles]);
  const selectedSource = filteredSourceFiles.find((file) => file.id === selectedSourceId) || filteredSourceFiles[0];
  const copySelectedSource = async () => {
    if (!selectedSource) {
      return;
    }
    const copied = await writeClipboardText(selectedSource.preview || selectedSource.path);
    setSourceCopyNotice(copied ? `${selectedSource.path} copied` : "Clipboard unavailable");
  };
  const documentSignalSummary = useMemo(() => {
    let visibleEvaluations = 0;
    let visibleWebSearches = 0;
    let latestEvaluation: (typeof viewFilteredDocuments)[number] | undefined;
    let latestWebSearch: (typeof viewFilteredDocuments)[number] | undefined;
    let latestWorkSummary: (typeof viewFilteredDocuments)[number] | undefined;

    for (const document of viewFilteredDocuments) {
      if (document.category === "evaluation") {
        visibleEvaluations += 1;
        latestEvaluation ??= document;
      } else if (document.category === "web-search") {
        visibleWebSearches += 1;
        latestWebSearch ??= document;
      } else if (document.category === "work-summary") {
        latestWorkSummary ??= document;
      }
    }

    return { latestEvaluation, latestWebSearch, latestWorkSummary, visibleEvaluations, visibleWebSearches };
  }, [viewFilteredDocuments]);
  const {
    latestEvaluation,
    latestWebSearch,
    latestWorkSummary,
    visibleEvaluations,
    visibleWebSearches
  } = documentSignalSummary;
  const learningImprovementCandidates = useMemo(
    () =>
      buildLearningImprovementCandidates({
        blockers: collaborationBoard.blockers,
        evaluations: viewFilteredDocuments.filter((document) => document.category === "evaluation").slice(0, 4),
        workSummaries: viewFilteredDocuments.filter((document) => document.category === "work-summary").slice(0, 3),
        requestTraces: viewFilteredDocuments.filter((document) => document.category === "request-trace").slice(0, 3),
        intentMap: intentFeatureMap,
        nextActions: collaborationBoard.nextActions
      }),
    [collaborationBoard.blockers, collaborationBoard.nextActions, intentFeatureMap, viewFilteredDocuments]
  );
  const selectedLearningCandidate =
    learningImprovementCandidates.find((candidate) => candidate.id === selectedLearningCandidateId) ||
    learningImprovementCandidates[0] ||
    null;
  const attentionState = useMemo(() => {
    const blockedTasks = collaborationBoard.summary.blockedTasks;
    const activeTasks = collaborationBoard.summary.activeTasks;
    const publicReviewRequired = snapshot.publicReview.status.includes("review_required");

    if (blockedTasks > 0) {
      return {
        tone: "red",
        icon: AlertTriangle,
        label: "Needs decision",
        title: `${blockedTasks.toLocaleString("ko-KR")}개 작업이 막혀 있습니다`,
        detail: "결정함 또는 차단된 실행 경로를 확인해야 합니다.",
        section: "agents" as SectionId,
        action: "막힘 보기"
      };
    }

    if (publicReviewRequired) {
      return {
        tone: "amber",
        icon: ShieldCheck,
        label: "Review required",
        title: "공개 전 점검이 필요합니다",
        detail: "snapshot, privacy, public readiness를 확인한 뒤 배포해야 합니다.",
        section: "overview" as SectionId,
        action: "점검 보기"
      };
    }

    if (activeTasks > 0) {
      return {
        tone: "green",
        icon: Activity,
        label: "In motion",
        title: `${activeTasks.toLocaleString("ko-KR")}개 작업이 진행 중입니다`,
        detail: "에이전트 협업판에서 진행 상태와 병목을 볼 수 있습니다.",
        section: "agents" as SectionId,
        action: "작업판 보기"
      };
    }

    return {
      tone: "blue",
      icon: CheckCircle2,
      label: "Ready",
      title: "즉시 주의할 막힘은 없습니다",
      detail: "에이전트 작업 환경에서 다음 실행을 시작할 수 있습니다.",
      section: "desktop" as SectionId,
      action: "작업 시작"
    };
  }, [
    collaborationBoard.summary.activeTasks,
    collaborationBoard.summary.blockedTasks,
    snapshot.publicReview.status
  ]);
  const commandSteps = useMemo<Array<{
    label: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    tone: string;
    section?: SectionId;
  }>>(
    () => [
      {
        label: "Now",
        title: attentionState.label,
        detail: attentionState.title,
        icon: attentionState.icon,
        tone: attentionState.tone,
        section: attentionState.section
      },
      {
        label: "Next",
        title: collaborationBoard.nextActions[0]?.agent || "No handoff",
        detail: collaborationBoard.nextActions[0]?.nextAction || "대기 중인 다음 행동이 없습니다.",
        icon: Clock3,
        tone: "blue",
        section: "agents"
      },
      {
        label: "Evidence",
        title: `${visibleWebSearches.toLocaleString("ko-KR")} searches / ${visibleEvaluations.toLocaleString("ko-KR")} evals`,
        detail: latestEvaluation?.title || latestWebSearch?.title || "근거 기록을 모아 표시합니다.",
        icon: FileSearch,
        tone: "violet"
      },
      {
        label: "Control",
        title: currentViewMode.label,
        detail: `${currentLanguageMode.label} / ${visibleSections.length} sections visible`,
        icon: ShieldCheck,
        tone: "slate"
      }
    ],
    [
      attentionState.icon,
      attentionState.label,
      attentionState.section,
      attentionState.title,
      attentionState.tone,
      collaborationBoard.nextActions,
      currentLanguageMode.label,
      currentViewMode.label,
      latestEvaluation?.title,
      latestWebSearch?.title,
      visibleEvaluations,
      visibleSections.length,
      visibleWebSearches
    ]
  );
  const attentionItems = useMemo(
    () =>
      [
        ...collaborationBoard.blockers.slice(0, 3).map((item) => ({
          id: `blocker-${item.taskId}`,
          label: "Blocked",
          title: item.title,
          detail: item.blockers.join(" / "),
          meta: item.agent
        })),
        ...collaborationBoard.nextActions.slice(0, 3).map((item) => ({
          id: `next-${item.taskId}`,
          label: "Next",
          title: item.title,
          detail: item.nextAction,
          meta: item.agent
        }))
      ].slice(0, 4),
    [collaborationBoard.blockers, collaborationBoard.nextActions]
  );
  const sectionNavMeta = useMemo<Record<SectionId, string>>(
    () => ({
      overview: attentionState.label,
      desktop: "Runtime",
      eval: `${visibleEvaluations.toLocaleString("ko-KR")} evals`,
      tools: "Studio",
      projects: snapshot.stats.projects.toLocaleString("ko-KR"),
      history: visibleHistoryDays.length.toLocaleString("ko-KR"),
      intent: intentFeatureMap.summary.totalThemes.toLocaleString("ko-KR"),
      structure: structureOverview.summary.totalPlanes
        ? `${structureOverview.summary.totalPlanes}/${structureOverview.summary.totalPressurePoints}`
        : snapshot.stats.rootFolders.toLocaleString("ko-KR"),
      documents: viewFilteredDocuments.length.toLocaleString("ko-KR"),
      source: visibleSourceFiles.length.toLocaleString("ko-KR"),
      requirements: visibleRequirements.length.toLocaleString("ko-KR"),
      agents: agentCatalog.length.toLocaleString("ko-KR")
    }),
    [
      agentCatalog.length,
      attentionState.label,
      intentFeatureMap.summary.totalThemes,
      snapshot.stats.projects,
      snapshot.stats.rootFolders,
      structureOverview.summary.totalPlanes,
      structureOverview.summary.totalPressurePoints,
      viewFilteredDocuments.length,
      visibleHistoryDays.length,
      visibleEvaluations,
      visibleRequirements.length,
      visibleSourceFiles.length
    ]
  );
  const operatorCenterSections = useMemo(
    () =>
      sections.filter(isOperatorCenterSection).map((item) => {
        const localized = sectionForLanguage(item, uiLanguage);
        return {
          id: item.id,
          label: localized.label,
          shortLabel: localized.shortLabel,
          purpose: localized.purpose,
          icon: localized.icon,
          meta: sectionNavMeta[item.id]
        } satisfies OperatorCenterSection;
      }),
    [sectionNavMeta, uiLanguage]
  );
  const sectionById = useMemo(() => {
    return new Map(localizedSections.map((item) => [item.id, item]));
  }, [localizedSections]);
  const coreFunctionSections = useMemo(() => {
    return (["overview", "agents", "tools", "desktop", "eval", "source", "intent"] as SectionId[])
      .map((id) => sectionById.get(id))
      .filter((item): item is Section => {
        return item ? currentViewMode.allowedSections.includes(item.id) : false;
      });
  }, [currentViewMode.allowedSections, sectionById]);
  const primeSectionActivation = useCallback((targetSection: SectionId) => {
    markSectionResident(targetSection);
    if (typeof document === "undefined") {
      return;
    }
    const target = sectionById.get(targetSection);
    const viewport = document.querySelector(".desktop-viewport");
    viewport?.setAttribute("data-active-section", targetSection);
    viewport?.setAttribute("data-section-content-ready", "true");
    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((element) => {
      const isTarget = element.getAttribute("data-section-id") === targetSection;
      element.classList.toggle("active", isTarget);
      if (isTarget) {
        element.setAttribute("aria-current", "page");
      } else {
        element.removeAttribute("aria-current");
      }
    });
    if (target && titlebarSectionLabelRef.current) {
      titlebarSectionLabelRef.current.textContent = target.label;
    }
  }, [markSectionResident, sectionById]);
  const openSection = useCallback((targetSection: SectionId, options?: { intentId?: string; flowStepId?: string }) => {
    primeSectionActivation(targetSection);
    setActiveTaskIntentId(options?.intentId || "");
    setActiveTaskFlowStepId(options?.flowStepId || "");
    if (!currentViewMode.allowedSections.includes(targetSection)) {
      const modeWithSection =
        viewModes.find((mode) => mode.id === "superadmin_developer" && mode.allowedSections.includes(targetSection)) ||
        viewModes.find((mode) => mode.allowedSections.includes(targetSection));
      if (modeWithSection) {
        setViewMode(modeWithSection.id);
      }
    }
    activateSection(targetSection);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#section-${targetSection}`);
    }
  }, [activateSection, currentViewMode.allowedSections, primeSectionActivation, viewModes]);
  const togglePinnedSection = (targetSection: SectionId) => {
    setPinnedSections((previous) => {
      if (previous.includes(targetSection)) {
        return previous.filter((item) => item !== targetSection);
      }
      return [targetSection, ...previous].slice(0, 6);
    });
  };
  const pinnedVisibleSections = useMemo(() => {
    return pinnedSections
      .map((id) => sectionById.get(id))
      .filter((item): item is Section => {
        return item ? currentViewMode.allowedSections.includes(item.id) && !isOperatorSectionId(item.id) : false;
      });
  }, [currentViewMode.allowedSections, pinnedSections, sectionById]);
  const recentVisibleSections = useMemo(() => {
    return recentSections
      .map((id) => sectionById.get(id))
      .filter((item): item is Section => {
        return item ? currentViewMode.allowedSections.includes(item.id) : false;
      });
  }, [currentViewMode.allowedSections, recentSections, sectionById]);
  const currentSectionLabel = sectionById.get(section)?.label || "홈";
  const currentSection = sectionById.get(section);
  const currentFeatureGroup =
    localizedFeatureGroups.find((group) => group.id === currentSection?.group) || localizedFeatureGroups[0];
  const isPrimaryWorkSurface = section === "agents" || section === "tools" || section === "eval";
  const currentThemeLabel =
    themeMode === "system"
      ? uiLanguage === "ko" ? "시스템" : "System"
      : themeMode === "dark"
        ? uiLanguage === "ko" ? "다크" : "Dark"
        : uiLanguage === "ko" ? "라이트" : "Light";
  const settingsSubsections: Record<SettingsTabId, Array<{
    id: SettingsSubsectionId;
    label: string;
    detail: string;
    icon: LucideIcon;
  }>> = {
    appearance: [
      {
        id: "display",
        label: uiLanguage === "ko" ? "테마" : "Theme",
        detail: currentThemeLabel,
        icon: LayoutDashboard
      },
      {
        id: "language",
        label: uiLanguage === "ko" ? "언어" : "Language",
        detail: currentLanguageMode.label,
        icon: Languages
      },
      {
        id: "view",
        label: uiLanguage === "ko" ? "보기 권한" : "View mode",
        detail: currentViewMode.label,
        icon: ShieldCheck
      }
    ],
    navigation: [
      {
        id: "rail",
        label: uiLanguage === "ko" ? "좌측 레일" : "Left rail",
        detail: sidebarMode === "expanded" ? (uiLanguage === "ko" ? "라벨 표시" : "Labels") : uiLanguage === "ko" ? "아이콘만" : "Icons",
        icon: LayoutDashboard
      },
      {
        id: "terminal",
        label: uiLanguage === "ko" ? "하단 터미널" : "Bottom terminal",
        detail: terminalDrawerOpen ? (uiLanguage === "ko" ? "열림" : "Open") : uiLanguage === "ko" ? "닫힘" : "Closed",
        icon: SquareTerminal
      },
      {
        id: "pinned",
        label: uiLanguage === "ko" ? "고정 섹션" : "Pinned sections",
        detail: `${pinnedVisibleSections.length.toLocaleString("ko-KR")}`,
        icon: LayoutDashboard
      }
    ],
    execution: [
      {
        id: "quick",
        label: uiLanguage === "ko" ? "핵심 설정" : "Core setup",
        detail: uiLanguage === "ko" ? "우선순위" : "Priority",
        icon: PlayCircle
      },
      {
        id: "providers",
        label: uiLanguage === "ko" ? "계정 연결" : "Provider accounts",
        detail: `${providerCredentials.configuredCount}/${providerCredentials.providers.length || 3}`,
        icon: KeyRound
      },
      {
        id: "adapter",
        label: uiLanguage === "ko" ? "CLI 어댑터" : "CLI adapter",
        detail: runtimeInitDefaults.adapterId,
        icon: SquareTerminal
      },
      {
        id: "session",
        label: uiLanguage === "ko" ? "세션 모드" : "Session mode",
        detail: sessionModePresets.find((mode) => mode.id === runtimeInitDefaults.sessionModeId)?.label || sessionModePresets[0].label,
        icon: Bot
      },
      {
        id: "pipe",
        label: uiLanguage === "ko" ? "작업 파이프" : "Task pipe",
        detail: fallbackTaskPipePresets.find((preset) => preset.taskKind === runtimeInitDefaults.taskPipeKind)?.label || fallbackTaskPipePresets[0].label,
        icon: Network
      },
      {
        id: "questions",
        label: uiLanguage === "ko" ? "질문 처리" : "Questions",
        detail: runtimeInitDefaults.autoDeferQuestions ? (uiLanguage === "ko" ? "자동 보류" : "Auto defer") : uiLanguage === "ko" ? "수동" : "Manual",
        icon: Inbox
      }
    ],
    data: [
      {
        id: "filters",
        label: uiLanguage === "ko" ? "필터" : "Filters",
        detail: categoryLabel(category),
        icon: ListFilter
      },
      {
        id: "snapshot",
        label: uiLanguage === "ko" ? "스냅샷" : "Snapshot",
        detail: formatDate(snapshot.generatedAt),
        icon: Clock3
      },
      {
        id: "store",
        label: uiLanguage === "ko" ? "설정 저장소" : "Preferences store",
        detail: desktopPreferencesLoaded ? desktopPreferencesStatus : uiLanguage === "ko" ? "불러오는 중" : "Loading",
        icon: Settings
      },
      {
        id: "operator",
        label: uiLanguage === "ko" ? "운영 센터" : "Operator center",
        detail: operatorCenterSections.length.toLocaleString("ko-KR"),
        icon: ShieldCheck
      }
    ]
  };
  const settingsSubsectionItems = settingsSubsections[settingsTab];
  const activeSettingsSubsection = settingsSubsectionItems.some((item) => item.id === settingsSubsectionByTab[settingsTab])
    ? settingsSubsectionByTab[settingsTab]
    : settingsSubsectionItems[0].id;
  const selectSettingsSubsection = useCallback((subsectionId: SettingsSubsectionId) => {
    setSettingsSubsectionByTab((current) => ({ ...current, [settingsTab]: subsectionId }));
  }, [settingsTab]);
  const openSettingsTab = useCallback((tabId: SettingsTabId = "appearance", subsectionId?: SettingsSubsectionId) => {
    setSettingsTab(tabId);
    if (subsectionId) {
      setSettingsSubsectionByTab((current) => ({ ...current, [tabId]: subsectionId }));
    }
    setSettingsOpen(true);
  }, []);
  const consumeRuntimeLaunchRequest = useCallback(() => {
    setRuntimeLaunchRequest(null);
  }, []);
  const openExecutionSettings = useCallback((subsectionId: SettingsSubsectionId = "quick") => {
    openSettingsTab("execution", subsectionId);
  }, [openSettingsTab]);
  const selectedRuntimeAdapterOption =
    fallbackDesktopAdapters.find((adapter) => adapter.adapterId === runtimeInitDefaults.adapterId) ||
    fallbackDesktopAdapters[0];
  const selectedRuntimeAdapterGuide = adapterSetupGuides[selectedRuntimeAdapterOption.adapterId];
  const selectedRuntimeAdapterAuthReady = adapterAuthReadyForAdapter(selectedRuntimeAdapterOption.adapterId, providerCredentials);
  const selectedRuntimeAdapterAuthStatus = providerAuthStatusForAdapter(
    selectedRuntimeAdapterOption.adapterId,
    providerCredentials,
    uiLanguage
  );
  const runtimeAdapterSetupSteps = [
    {
      id: "install",
      label: uiLanguage === "ko" ? "1. 설치" : "1. Install",
      detail: selectedRuntimeAdapterGuide.installHint,
      ready: false,
      command: selectedRuntimeAdapterGuide.installHint
    },
    {
      id: "auth",
      label: uiLanguage === "ko" ? "2. 로그인/키" : "2. Login or key",
      detail: selectedRuntimeAdapterAuthReady ? selectedRuntimeAdapterAuthStatus : selectedRuntimeAdapterGuide.authHint,
      ready: selectedRuntimeAdapterAuthReady,
      command: selectedRuntimeAdapterGuide.authHint
    },
    {
      id: "verify",
      label: uiLanguage === "ko" ? "3. 검증" : "3. Verify",
      detail: selectedRuntimeAdapterGuide.verifyCommand,
      ready: false,
      command: selectedRuntimeAdapterGuide.verifyCommand
    },
    {
      id: "run",
      label: uiLanguage === "ko" ? "4. 첫 실행" : "4. First run",
      detail: selectedRuntimeAdapterGuide.expectedResult,
      ready: selectedRuntimeAdapterAuthReady,
      command: selectedRuntimeAdapterGuide.firstRunCommand
    }
  ];
  const copyRuntimeAdapterCommand = (label: string, command: string) => {
    void writeClipboardText(command);
    setProviderCredentialNotice(
      uiLanguage === "ko"
        ? `${label} 명령을 클립보드에 복사했습니다.`
        : `${label} command copied to the clipboard.`
    );
  };
  async function refreshProviderModels(providerId = searchAgentRunForm.providerId, userInitiated = false) {
    const provider =
      providerCredentials.providers.find((item) => item.providerId === providerId) ||
      fallbackProviderCredentialReport.providers.find((item) => item.providerId === providerId) ||
      providerCredentials.providers[0] ||
      fallbackProviderCredentialReport.providers[0];
    if (!provider) {
      const message = uiLanguage === "ko" ? "선택할 모델 제공자가 없습니다." : "No model provider is available.";
      setProviderModelCatalog(null);
      setProviderModelError(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "models",
        tone: "error",
        message
      });
      return;
    }

    const tauriInvoke = getTauriInvoke();
    setProviderModelBusy(true);
    setProviderModelBusyProviderId(provider.providerId);
    setProviderModelError("");
    if (!tauriInvoke) {
      const fallbackReport: ProviderModelCatalogReport = {
        providerId: provider.providerId,
        providerLabel: provider.label,
        status: provider.authMethod === "local_http" ? "browser_preview_local_default" : "browser_preview_provider_default",
        source: "browser_fallback",
        defaultModel: provider.defaultModel,
        models: [
          {
            providerId: provider.providerId,
            id: provider.defaultModel,
            label: provider.defaultModel,
            size: null,
            modifiedAt: ""
          }
        ],
        error: provider.authMethod === "local_http"
          ? (uiLanguage === "ko"
            ? "설치 앱에서 Ollama 모델 목록을 읽을 수 있습니다. 지금은 기본 모델만 표시합니다."
            : "The installed app can read the Ollama model list. This preview shows only the default model.")
          : null
      };
      setProviderModelCatalog(fallbackReport);
      setProviderModelError(fallbackReport.error || "");
      if (fallbackReport.error) {
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "models",
          tone: "error",
          message: fallbackReport.error
        });
      } else if (userInitiated) {
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "models",
          tone: "success",
          message: uiLanguage === "ko" ? `${provider.label} 기본 모델을 확인했습니다.` : `${provider.label} default model checked.`
        });
      }
      setProviderModelBusy(false);
      setProviderModelBusyProviderId("");
      return;
    }

    try {
      const report = await tauriInvoke<ProviderModelCatalogReport>("list_provider_models", { providerId: provider.providerId });
      setProviderModelCatalog(report);
      setProviderModelError(report.error || "");
      if (report.error) {
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "models",
          tone: "error",
          message: report.error
        });
      } else if (userInitiated) {
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "models",
          tone: "success",
          message: uiLanguage === "ko" ? `${provider.label} 모델 목록을 확인했습니다.` : `${provider.label} model list checked.`
        });
      }
      const suggestedModel = report.models[0]?.id || report.defaultModel || provider.defaultModel;
      if (suggestedModel && !searchAgentRunForm.model.trim()) {
        setSearchAgentRunForm((current) =>
          current.providerId === provider.providerId && !current.model.trim()
            ? { ...current, model: suggestedModel }
            : current
        );
      }
    } catch (modelError) {
      setProviderModelCatalog({
        providerId: provider.providerId,
        providerLabel: provider.label,
        status: "model_catalog_error",
        source: "tauri_command",
        defaultModel: provider.defaultModel,
        models: [
          {
            providerId: provider.providerId,
            id: provider.defaultModel,
            label: provider.defaultModel,
            size: null,
            modifiedAt: ""
          }
        ],
        error: String(modelError)
      });
      setProviderModelError(String(modelError));
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "models",
        tone: "error",
        message: String(modelError)
      });
    } finally {
      setProviderModelBusy(false);
      setProviderModelBusyProviderId("");
    }
  }
  const refreshProviderCredentials = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      const message = uiLanguage === "ko" ? "네이티브 런타임에서만 계정을 저장할 수 있습니다." : "Provider credentials can only be saved in the native runtime.";
      setProviderCredentials(fallbackProviderCredentialReport);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "error",
        message
      });
      return;
    }
    setProviderCredentialBusy("refresh");
    try {
      const report = await tauriInvoke<ProviderCredentialReport>("list_provider_credentials");
      setProviderCredentials(report);
      setProviderCredentialInputs((current) => providerInputsFromReport(report, current));
      setProviderCredentialError("");
      const message = uiLanguage === "ko" ? "계정 연결 상태를 새로고침했습니다." : "Provider account status refreshed.";
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "success",
        message
      });
      void refreshProviderModels(searchAgentRunForm.providerId);
    } catch (credentialError) {
      const message = String(credentialError);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "error",
        message
      });
    } finally {
      setProviderCredentialBusy("");
    }
  };
  const updateProviderCredentialInput = (providerId: string, field: keyof ProviderCredentialInputState, value: string) => {
    setProviderActionFeedback((current) =>
      current?.providerId === providerId && current.action === "save" ? null : current
    );
    setProviderCredentialError("");
    setProviderCredentialInputs((current) => ({
      ...current,
      [providerId]: {
        accountHint: current[providerId]?.accountHint || "",
        secret: current[providerId]?.secret || "",
        [field]: value
      }
    }));
  };
  const saveProviderCredential = async (provider: ProviderCredentialSummary) => {
    const tauriInvoke = getTauriInvoke();
    const input = providerCredentialInputs[provider.providerId] || { accountHint: "", secret: "" };
    if (provider.authMethod === "local_http") {
      const message = uiLanguage === "ko" ? `${provider.label}는 API 키 저장 없이 로컬 런타임으로 사용합니다.` : `${provider.label} uses the local runtime without saving an API key.`;
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "save",
        tone: "info",
        message
      });
      return;
    }
    if (!tauriInvoke) {
      const message = uiLanguage === "ko" ? "네이티브 앱에서만 저장할 수 있습니다." : "Save is available only in the native app.";
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "save",
        tone: "error",
        message
      });
      return;
    }
    if (!input.secret.trim()) {
      const message = uiLanguage === "ko" ? `${provider.label} API 키를 입력하세요.` : `Enter a ${provider.label} API key.`;
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "save",
        tone: "error",
        message
      });
      return;
    }
    setProviderCredentialBusy(`save:${provider.providerId}`);
    try {
      const report = await tauriInvoke<ProviderCredentialReport>("save_provider_credential", {
        input: {
          providerId: provider.providerId,
          authMethod: provider.authMethod,
          secret: input.secret,
          accountHint: input.accountHint
        }
      });
      setProviderCredentials(report);
      setProviderCredentialInputs((current) => ({
        ...providerInputsFromReport(report, current),
        [provider.providerId]: {
          accountHint: input.accountHint,
          secret: ""
        }
      }));
      setProviderCredentialError("");
      const message = uiLanguage === "ko" ? `${provider.label} 연결 정보를 저장했습니다.` : `${provider.label} credentials saved.`;
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "save",
        tone: "success",
        message
      });
    } catch (credentialError) {
      const message = String(credentialError);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "save",
        tone: "error",
        message
      });
    } finally {
      setProviderCredentialBusy("");
    }
  };
  const clearProviderCredential = async (provider: ProviderCredentialSummary) => {
    const tauriInvoke = getTauriInvoke();
    if (provider.authMethod === "local_http") {
      const message = uiLanguage === "ko" ? `${provider.label}는 삭제할 API 키가 없습니다.` : `${provider.label} has no API key to clear.`;
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "clear",
        tone: "info",
        message
      });
      return;
    }
    if (!tauriInvoke) {
      const message = uiLanguage === "ko" ? "네이티브 앱에서만 삭제할 수 있습니다." : "Clear is available only in the native app.";
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "clear",
        tone: "error",
        message
      });
      return;
    }
    setProviderCredentialBusy(`clear:${provider.providerId}`);
    try {
      const report = await tauriInvoke<ProviderCredentialReport>("clear_provider_credential", {
        providerId: provider.providerId
      });
      setProviderCredentials(report);
      setProviderCredentialInputs((current) => ({
        ...providerInputsFromReport(report, current),
        [provider.providerId]: { accountHint: "", secret: "" }
      }));
      setProviderCredentialError("");
      const message = uiLanguage === "ko" ? `${provider.label} 연결을 삭제했습니다.` : `${provider.label} credentials cleared.`;
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "clear",
        tone: "success",
        message
      });
    } catch (credentialError) {
      const message = String(credentialError);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: "clear",
        tone: "error",
        message
      });
    } finally {
      setProviderCredentialBusy("");
    }
  };
  const openProviderAuthUrl = async (provider: ProviderCredentialSummary, purpose: "setup" | "login" | "docs") => {
    const tauriInvoke = getTauriInvoke();
    const fallbackUrl = purpose === "login" ? provider.loginUrl : purpose === "docs" ? provider.docsUrl : provider.setupUrl;
    if (!tauriInvoke) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: purpose,
        tone: "info",
        message: uiLanguage === "ko" ? `${provider.label} 링크를 브라우저에서 열었습니다.` : `${provider.label} link opened in the browser.`
      });
      return;
    }
    setProviderCredentialBusy(`open:${provider.providerId}:${purpose}`);
    try {
      await tauriInvoke("open_provider_auth_url", {
        providerId: provider.providerId,
        purpose
      });
      setProviderCredentialError("");
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: purpose,
        tone: "success",
        message: uiLanguage === "ko" ? `${provider.label} 링크를 열었습니다.` : `${provider.label} link opened.`
      });
    } catch (credentialError) {
      const message = String(credentialError);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: provider.providerId,
        action: purpose,
        tone: "error",
        message
      });
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    } finally {
      setProviderCredentialBusy("");
    }
  };
  const openTerminalDrawer = useCallback(() => {
    if (section !== "desktop" && section !== "source") {
      openSection("desktop");
    }
    setTerminalDrawerOpen(true);
  }, [openSection, section]);
  const openSearchAgentWorkbench = useCallback(() => {
    openSection("agents");
  }, [openSection]);
  const openAgentsSection = useCallback(() => {
    openSection("agents");
  }, [openSection]);
  const openSourceSection = useCallback(() => {
    openSection("source");
  }, [openSection]);
  const openProviderSettings = useCallback(() => {
    openSettingsTab("execution", "providers");
  }, [openSettingsTab]);
  const handleDesktopResourceSnapshotChange = useCallback((report: DesktopResourceSnapshotReport | null) => {
    setSharedDesktopResourceSnapshot(report);
  }, []);
  const updateSearchAgentRunForm = (field: keyof SearchAgentRunForm, value: string) => {
    if (field === "providerId") {
      const provider = providerCredentials.providers.find((item) => item.providerId === value);
      setProviderModelCatalog(null);
      setProviderModelError("");
      setSearchAgentRunForm((current) => ({
        ...current,
        providerId: value,
        model: provider?.defaultModel || ""
      }));
      return;
    }
    setSearchAgentRunForm((current) => ({ ...current, [field]: value }));
  };
  const applyAgentCoreBlueprint = (
    blueprintId: string,
    mode: "factory" | "preflight" = "factory",
    selectedCapabilityIds?: string[]
  ) => {
    const blueprint = agentCoreBlueprints.find((item) => item.id === blueprintId) || agentCoreBlueprints[0];
    const ko = uiLanguage === "ko";
    const proposalForm = buildAgentFactoryFormFromAgentCoreBlueprint(blueprint, uiLanguage, selectedCapabilityIds);
    setSelectedAgentCoreBlueprintId(blueprint.id);
    openSection("agents");
    setSearchAgentRunForm((current) => ({
      ...current,
      objective: mode === "preflight"
        ? ko
          ? `${blueprint.label}를 AgentCore 방식의 상용 라이프사이클로 배포하기 전 준비도와 실행 계획을 점검하기`
          : `Check readiness and execution plan before deploying ${blueprint.label} through an AgentCore-style production lifecycle.`
        : ko
          ? blueprint.defaultObjectiveKo
          : blueprint.defaultObjectiveEn,
      questions: ko ? blueprint.defaultQuestionsKo : blueprint.defaultQuestionsEn,
      searchChannels: "web search\nrepository search\nAgentCore sample source\nAWS official docs",
      captureTargets: "_history/web-searches/YYYY/\n_research/\nplatform-desktop-app/specs/\n_history/request-traces/YYYY/",
      notes: ko ? blueprint.defaultNotesKo : blueprint.defaultNotesEn
    }));
    setAgentFactoryForm(proposalForm);
    setSearchAgentChatMessages((current) =>
      [
        ...current,
        {
          id: `agentcore-blueprint-${blueprint.id}-${Date.now()}`,
          role: "system" as const,
          title: ko ? "AgentCore 블루프린트 적용" : "AgentCore Blueprint Applied",
          body: ko
            ? `${blueprint.label} 입력을 검색 에이전트와 Agent Core에 채웠습니다. 바로 작업 시작을 누르면 연결된 제공자 계정으로 사전조사/계획을 실행합니다.`
            : `${blueprint.label} filled the Search Agent and Agent Core inputs. Press Start Work to run preflight research and planning through the connected provider account.`,
          meta: `${blueprint.sourceLabel} / ${mode} / capabilities=${(selectedCapabilityIds || blueprint.capabilities).join(",")}`
        }
      ].slice(-12)
    );
  };
  const launchSearchAgent = async () => {
    const requestId = `research-insight-agent-${Date.now()}`;
    const objective = searchAgentRunForm.objective.trim() || defaultSearchAgentRunForm.objective;
    const prompt = renderSearchAgentPrompt(searchAgentRunForm, uiLanguage);
    const connectedProviders = providerCredentials.providers.filter((provider) => provider.configured);
    const selectedProvider =
      providerCredentials.providers.find((provider) => provider.providerId === searchAgentRunForm.providerId) ||
      connectedProviders[0] ||
      providerCredentials.providers[0];
    const selectedProviderReady = Boolean(selectedProvider?.configured);
    const selectedProviderLocal = selectedProvider?.authMethod === "local_http";
    const selectedProviderModel = (searchAgentRunForm.model.trim() || selectedProvider?.defaultModel || "").trim();
    setSearchAgentChatMessages((current) =>
      [
        ...current,
        {
          id: `${requestId}-user`,
          role: "user" as const,
          title: uiLanguage === "ko" ? "사용자 작업" : "User Task",
          body: objective,
          meta: uiLanguage === "ko" ? "작업 채팅에서 시작" : "Started from work chat"
        },
        {
          id: `${requestId}-agent`,
          role: "agent" as const,
          title: uiLanguage === "ko" ? "실행 준비" : "Run Ready",
          body:
            uiLanguage === "ko"
              ? selectedProviderReady
                ? selectedProviderLocal
	                  ? `${selectedProvider.label} 로컬 모델로 research-insight-planner-agent 작업을 직접 실행합니다. 결과는 채팅과 작업 실행 저장소에 남깁니다.`
	                  : `${selectedProvider.label} 계정으로 research-insight-planner-agent 작업을 직접 실행합니다. 결과는 채팅과 작업 실행 저장소에 남깁니다.`
	                : "연결된 제공자 계정이 없어 CLI 실행 경로로 전환합니다. 계정을 연결하면 같은 버튼이 모델 API 작업을 바로 실행합니다."
              : selectedProviderReady
                ? selectedProviderLocal
                  ? `Running the research-insight-planner-agent directly with the local ${selectedProvider.label} model. The result is stored in chat and the task-run store.`
                  : `Running the research-insight-planner-agent directly with ${selectedProvider.label}. The result is stored in chat and the task-run store.`
                : "No connected provider account is ready, so this falls back to the CLI lane. Connect an account to run the model API directly.",
          meta: selectedProviderReady ? `${selectedProvider.providerId}:${selectedProviderModel}` : "fallback=cli_lane"
        }
      ].slice(-12)
    );

    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setSearchAgentChatMessages((current) =>
        [
          ...current,
          {
            id: `${requestId}-preview`,
            role: "system" as const,
            title: uiLanguage === "ko" ? "미리보기 모드" : "Preview Mode",
            body:
              uiLanguage === "ko"
                ? "현재 화면은 브라우저 미리보기라 네이티브 런타임을 호출할 수 없습니다. 설치 앱에서는 같은 버튼이 세션을 시작합니다."
                : "This browser preview cannot call the native runtime. In the installed app, the same button starts the session.",
            meta: "native runtime unavailable"
          }
        ].slice(-12)
      );
      return;
    }

    if (selectedProviderReady) {
      setProviderTaskBusy(true);
      try {
        const report = await tauriInvoke<ProviderAgentTaskReport>("run_provider_agent_task", {
          providerId: selectedProvider.providerId,
          model: selectedProviderModel,
          taskKind: "research_insight_agent",
          prompt,
          systemPrompt: renderSearchAgentSystemPrompt(uiLanguage)
        });
        setSearchAgentChatMessages((current) =>
          [
            ...current,
            {
              id: `${requestId}-provider-result`,
              role: "agent" as const,
              title: uiLanguage === "ko" ? "제공자 작업 결과" : "Provider Work Result",
              body:
                report.status === "completed"
                  ? report.output || (uiLanguage === "ko" ? "제공자가 빈 응답을 반환했습니다." : "The provider returned an empty response.")
                  : report.stderr || (uiLanguage === "ko" ? "제공자 API 실행이 실패했습니다." : "The provider API run failed."),
              meta: `${report.providerLabel} / ${report.model} / ${report.status} / ${report.taskRunId}`
            },
            {
              id: `${requestId}-provider-record`,
              role: "system" as const,
              title: uiLanguage === "ko" ? "실행 기록 저장" : "Run Record Stored",
              body:
                uiLanguage === "ko"
	                  ? `작업 실행 기록이 저장됐습니다: ${report.taskRecordPath || "저장 경로 대기"}`
                  : `Task-run record stored: ${report.taskRecordPath || "path pending"}`,
              meta: report.persistenceError || `http=${report.httpStatus ?? "n/a"} elapsed=${report.durationMs}ms`
            }
          ].slice(-12)
        );
        return;
      } catch (caught) {
        const message = errorMessage(caught);
        setSearchAgentChatMessages((current) =>
          [
            ...current,
            {
              id: `${requestId}-provider-failed`,
              role: "system" as const,
              title: uiLanguage === "ko" ? "제공자 직접 실행 실패" : "Direct Provider Run Failed",
              body:
                uiLanguage === "ko"
	                  ? `${message} CLI 실행 경로로 이어서 시도합니다.`
                  : `${message} Falling back to the CLI lane.`,
              meta: "provider_api_fallback"
            }
          ].slice(-12)
        );
      } finally {
        setProviderTaskBusy(false);
      }
    }

    openTerminalDrawer();

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", {
        adapterId: runtimeInitDefaults.adapterId || defaultRuntimeInitDefaults.adapterId,
        prompt,
        autoDeferQuestions: runtimeInitDefaults.autoDeferQuestions,
        taskKind: "research_insight_agent"
      });
      setSearchAgentChatMessages((current) =>
        [
          ...current,
          {
            id: `${requestId}-started`,
            role: "agent" as const,
            title: uiLanguage === "ko" ? "세션 시작됨" : "Session Started",
            body:
              uiLanguage === "ko"
                ? "검색 에이전트 세션이 시작됐습니다. 하단 터미널 drawer에서 출력과 질문 흐름을 계속 확인할 수 있습니다."
                : "The search agent session started. Continue watching output and questions in the bottom terminal drawer.",
            meta: report.sessionId
          }
        ].slice(-12)
      );
    } catch (caught) {
      const message = errorMessage(caught);
      setSearchAgentChatMessages((current) =>
        [
          ...current,
          {
            id: `${requestId}-failed`,
            role: "system" as const,
            title: uiLanguage === "ko" ? "실행 실패" : "Run Failed",
            body: message,
            meta: "capability_missing or runtime error"
          }
        ].slice(-12)
      );
    }
  };
  const updateAgentFactoryForm = (field: keyof AgentFactoryForm, value: string) => {
    setAgentFactoryForm((current) => ({ ...current, [field]: value }));
    setAgentFactoryNotice("");
  };
  const createAgentFactoryProposal = async (formOverride?: AgentFactoryForm) => {
    const proposalForm = formOverride || agentFactoryForm;
    if (formOverride) {
      setAgentFactoryForm(proposalForm);
    }
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setAgentFactoryNotice(uiLanguage === "ko" ? "Tauri 런타임이 없어 제안을 저장할 수 없습니다." : "Tauri runtime is unavailable.");
      return;
    }
    setAgentFactoryBusy(true);
    setAgentFactoryNotice("");
    try {
      const report = await tauriInvoke<AgentFactoryProposalReport>("create_agent_factory_proposal", {
        input: {
          agentId: proposalForm.agentId,
          label: proposalForm.label,
          goal: proposalForm.goal,
          role: proposalForm.role,
          tools: linesFromText(proposalForm.tools),
          guardrails: linesFromText(proposalForm.guardrails),
          validationCommands: linesFromText(proposalForm.validationCommands),
          outputContract: proposalForm.outputContract,
          ownerProject: proposalForm.ownerProject,
          targetPath: proposalForm.targetPath,
          rollbackPlan: proposalForm.rollbackPlan
        }
      });
      setAgentFactoryProposal(report);
      setAgentFactoryNotice(
        uiLanguage === "ko"
          ? `에이전트 제안 저장됨: ${report.proposalPath}`
          : `Agent proposal saved: ${report.proposalPath}`
      );
    } catch (caught) {
      setAgentFactoryNotice(errorMessage(caught));
    } finally {
      setAgentFactoryBusy(false);
    }
  };
  const createAgentCoreBlueprintProposal = async (blueprintId: string, selectedCapabilityIds?: string[]) => {
    const blueprint = agentCoreBlueprints.find((item) => item.id === blueprintId) || agentCoreBlueprints[0];
    const ko = uiLanguage === "ko";
    const proposalForm = buildAgentFactoryFormFromAgentCoreBlueprint(blueprint, uiLanguage, selectedCapabilityIds);
    applyAgentCoreBlueprint(blueprint.id, "factory", selectedCapabilityIds);
    setSearchAgentChatMessages((current) =>
      [
        ...current,
        {
          id: `agentcore-builder-${blueprint.id}-${Date.now()}`,
          role: "system" as const,
          title: ko ? "AgentCore Quick Builder" : "AgentCore Quick Builder",
          body: ko
            ? `${blueprint.label}를 기반으로 에이전트 코어 제안 저장을 시작합니다. 설치 앱에서는 제안이 앱 데이터 저장소에 바로 남습니다.`
            : `Starting an Agent Core proposal from ${blueprint.label}. In the installed app, the proposal is written directly to app data.`,
          meta: `create_agent_factory_proposal / capabilities=${(selectedCapabilityIds || blueprint.capabilities).join(",")}`
        }
      ].slice(-12)
    );
    await createAgentFactoryProposal(proposalForm);
  };
  const recordLearningDecision = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!selectedLearningCandidate) {
      setLearningDecisionNotice(uiLanguage === "ko" ? "선택된 개선 후보가 없습니다." : "No improvement candidate selected.");
      return;
    }
    if (!tauriInvoke) {
      setLearningDecisionNotice(uiLanguage === "ko" ? "Tauri 런타임이 없어 결정을 저장할 수 없습니다." : "Tauri runtime is unavailable.");
      return;
    }
    setLearningDecisionBusy(true);
    setLearningDecisionNotice("");
    try {
      const report = await tauriInvoke<LearningImprovementDecisionReport>("record_learning_improvement_decision", {
        input: {
          candidateId: selectedLearningCandidate.id,
          label: selectedLearningCandidate.label,
          source: selectedLearningCandidate.source,
          evidence: selectedLearningCandidate.evidence,
          action: learningDecisionAction,
          assetType: learningAssetType,
          targetPath: selectedLearningCandidate.targetPath,
          validationCommand: selectedLearningCandidate.validationCommand,
          rollbackPlan: selectedLearningCandidate.rollbackPlan,
          notes: learningDecisionNotes
        }
      });
      setLearningDecisionReport(report);
      setLearningDecisionNotice(
        uiLanguage === "ko"
          ? `학습 결정 저장됨: ${report.decisionPath}`
          : `Learning decision saved: ${report.decisionPath}`
      );
    } catch (caught) {
      setLearningDecisionNotice(errorMessage(caught));
    } finally {
      setLearningDecisionBusy(false);
    }
  };
  const rootToolItems = useMemo(
    () => [
      {
        id: "provider-accounts",
        label: uiLanguage === "ko" ? "모델 계정" : "Model accounts",
        detail:
          uiLanguage === "ko"
            ? "OpenAI, Anthropic, Gemini, Ollama 연결 상태"
            : "OpenAI, Anthropic, Gemini, and Ollama connection state",
        value: `${providerCredentials.configuredCount}/${providerCredentials.providers.length || 3}`,
        icon: KeyRound,
        action: () => openSettingsTab("execution", "providers")
      },
      {
        id: "cli-adapters",
        label: uiLanguage === "ko" ? "CLI 어댑터" : "CLI adapters",
        detail:
          uiLanguage === "ko"
            ? "Codex, Claude Code, Gemini, OpenCode 같은 게스트 실행 경로"
            : "Guest lanes such as Codex, Claude Code, Gemini, and OpenCode",
        value: runtimeInitDefaults.adapterId,
        icon: SquareTerminal,
        action: () => openSettingsTab("execution", "adapter")
      },
      {
        id: "workspace-files",
        label: uiLanguage === "ko" ? "작업공간 파일" : "Workspace files",
        detail:
          uiLanguage === "ko"
            ? "에이전트와 CLI가 공유하는 루트 파일/소스 표면"
            : "Root file and source surface shared by agents and CLI lanes",
        value: visibleSourceFiles.length.toLocaleString("ko-KR"),
        icon: Code2,
        action: () => openSection("source")
      },
      {
        id: "decision-routing",
        label: uiLanguage === "ko" ? "결정함" : "Decision inbox",
        detail:
          uiLanguage === "ko"
            ? "중간 질문을 보류하고 나중에 모아 처리"
            : "Defer mid-run questions and answer them later in one place",
        value: runtimeInitDefaults.autoDeferQuestions
          ? uiLanguage === "ko"
            ? "자동"
            : "auto"
          : uiLanguage === "ko"
            ? "수동"
            : "manual",
        icon: Inbox,
        action: () => openSettingsTab("execution", "questions")
      }
    ],
    [
      openSection,
      openSettingsTab,
      providerCredentials.configuredCount,
      providerCredentials.providers.length,
      runtimeInitDefaults.adapterId,
      runtimeInitDefaults.autoDeferQuestions,
      uiLanguage,
      visibleSourceFiles.length
    ]
  );
  const coreSetupSteps = useMemo(
    () => [
      {
        id: "accounts",
        label: uiLanguage === "ko" ? "모델 계정 연결" : "Connect model accounts",
        detail:
          uiLanguage === "ko"
            ? "에이전트 코어가 직접 모델 작업을 실행하려면 모델 제공자 계정을 먼저 연결합니다."
            : "Connect provider accounts so Agent Core can run model tasks directly.",
        ready: providerCredentials.configuredCount > 0,
        actionLabel: uiLanguage === "ko" ? "계정 설정" : "Accounts",
        icon: KeyRound,
        action: () => openSettingsTab("execution", "providers")
      },
      {
        id: "agent-core",
        label: uiLanguage === "ko" ? "에이전트 코어 열기" : "Open Agent Core",
        detail:
          uiLanguage === "ko"
            ? "커스텀 에이전트, 서브에이전트, 블루프린트, 제안을 같은 흐름에서 만듭니다."
            : "Create custom agents, subagents, blueprints, and proposals in one flow.",
        ready: agentCatalog.length > 0,
        actionLabel: uiLanguage === "ko" ? "에이전트 만들기" : "Create agent",
        icon: Bot,
        action: () => openSection("agents")
      },
      {
        id: "cli-lane",
        label: uiLanguage === "ko" ? "CLI 실행 경로 선택" : "Choose CLI lane",
        detail:
          uiLanguage === "ko"
            ? "Claude Code 같은 외부 CLI는 루트 도구를 공유하는 선택형 게스트 어댑터로 둡니다."
            : "External CLIs such as Claude Code remain optional guest adapters sharing root tools.",
        ready: Boolean(runtimeInitDefaults.adapterId),
        actionLabel: uiLanguage === "ko" ? "어댑터 설정" : "Adapters",
        icon: SquareTerminal,
        action: () => openSettingsTab("execution", "adapter")
      },
      {
        id: "questions",
        label: uiLanguage === "ko" ? "질문 자동 보류" : "Auto-defer questions",
        detail:
          uiLanguage === "ko"
            ? "중간 결정은 작업을 멈추지 않고 결정함에 모아 나중에 처리합니다."
            : "Route mid-run decisions to the inbox so work can continue where it is safe.",
        ready: runtimeInitDefaults.autoDeferQuestions,
        actionLabel: uiLanguage === "ko" ? "질문 처리" : "Questions",
        icon: Inbox,
        action: () => openSettingsTab("execution", "questions")
      }
    ],
    [
      agentCatalog.length,
      openSection,
      openSettingsTab,
      providerCredentials.configuredCount,
      runtimeInitDefaults.adapterId,
      runtimeInitDefaults.autoDeferQuestions,
      uiLanguage
    ]
  );
  const coreReadinessCount = useMemo(() => coreSetupSteps.filter((step) => step.ready).length, [coreSetupSteps]);
  const taskIntentItems = useMemo<TaskIntentItem[]>(
    () => {
      const selectIntentStep = (intentId: string, targetSection: SectionId, flowStepId: string) => () => {
        openSection(targetSection, { intentId, flowStepId });
      };
      const selectToolStep = (mode: ToolStudioMode, flowStepId: string) => () => {
        setRequestedToolMode((previous) => ({ mode, requestId: (previous?.requestId || 0) + 1 }));
        openSection("tools", { intentId: "build-tool", flowStepId });
      };

      return [
        {
        id: "create-agent",
        label: uiLanguage === "ko" ? "에이전트 만들기" : "Create an agent",
        detail:
          uiLanguage === "ko"
            ? "역할, 도구, 검증 기준을 묶어 바로 작업 에이전트로 저장합니다."
            : "Bundle role, tools, and validation into a runnable work agent.",
        actionLabel: uiLanguage === "ko" ? "에이전트 코어" : "Agent Core",
        badge: agentCatalog.length.toLocaleString("ko-KR"),
        targetSection: "agents",
        nextStep: uiLanguage === "ko" ? "역할과 검증 기준을 확인하고 새 에이전트 초안을 만듭니다." : "Review role and validation, then draft the agent.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "role", label: "역할 선택", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "role") },
                { id: "tools", label: "도구와 기억 연결", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "tools") },
                { id: "proposal", label: "검증 제안 생성", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "proposal") }
              ]
            : [
                { id: "role", label: "Choose role", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "role") },
                { id: "tools", label: "Connect tools and memory", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "tools") },
                { id: "proposal", label: "Create validation proposal", actionLabel: "Agent Core", run: selectIntentStep("create-agent", "agents", "proposal") }
              ],
        icon: Bot,
        keywords: ["agent", "create", "builder", "subagent", "persona", "에이전트", "만들기", "작업자"],
        run: () => openSection("agents", { intentId: "create-agent", flowStepId: "role" })
      },
      {
        id: "build-tool",
        label: uiLanguage === "ko" ? "툴 만들기" : "Build a tool",
        detail:
          uiLanguage === "ko"
            ? "Python 소스, 입력 스키마, 가상 환경, 배포 점검을 단계별로 진행합니다."
            : "Move through Python source, input schema, venv, and deploy preflight.",
        actionLabel: uiLanguage === "ko" ? "툴 스튜디오" : "Tool Studio",
        badge: rootToolItems.length.toLocaleString("ko-KR"),
        targetSection: "tools",
        nextStep: uiLanguage === "ko" ? "빌드 모드에서 Python 소스와 입력 스키마부터 선택합니다." : "Start in build mode by choosing Python source and input schema.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "source", label: "소스 선택", actionLabel: "툴 만들기", run: selectToolStep("build", "source") },
                { id: "venv", label: "입력과 가상 환경 확인", actionLabel: "파이썬 환경", run: selectToolStep("environment", "venv") },
                { id: "deploy", label: "검증 후 배포", actionLabel: "툴 배포", run: selectToolStep("deploy", "deploy") }
              ]
            : [
                { id: "source", label: "Choose source", actionLabel: "Build Tool", run: selectToolStep("build", "source") },
                { id: "venv", label: "Check input and venv", actionLabel: "Python Env", run: selectToolStep("environment", "venv") },
                { id: "deploy", label: "Validate then deploy", actionLabel: "Deploy Tool", run: selectToolStep("deploy", "deploy") }
              ],
        icon: Wrench,
        keywords: ["tool", "python", "venv", "deploy", "registry", "툴", "파이썬", "가상환경", "배포"],
        run: selectToolStep("build", "source")
      },
      {
        id: "run-work",
        label: uiLanguage === "ko" ? "작업 실행" : "Run work",
        detail:
          uiLanguage === "ko"
            ? "선택한 CLI 실행 경로나 에이전트 실행을 끊기지 않는 런타임 흐름으로 시작합니다."
            : "Start the selected CLI lane or agent run in the runtime workbench.",
        actionLabel: "Runtime",
        badge: runtimeInitDefaults.adapterId,
        targetSection: "desktop",
        nextStep: uiLanguage === "ko" ? "실행 구성에서 경로를 확인하고 실행을 시작합니다." : "Review the run configuration and start the lane.",
        flowSteps:
          uiLanguage === "ko"
            ? [
	                { id: "lane", label: "실행 경로 확인", actionLabel: "런타임", run: selectIntentStep("run-work", "desktop", "lane") },
	                { id: "start", label: "실행 시작", actionLabel: "런타임", run: selectIntentStep("run-work", "desktop", "start") },
	                { id: "result", label: "결과와 결정 처리", actionLabel: "런타임", run: selectIntentStep("run-work", "desktop", "result") }
              ]
            : [
                { id: "lane", label: "Review lane", actionLabel: "Runtime", run: selectIntentStep("run-work", "desktop", "lane") },
                { id: "start", label: "Start run", actionLabel: "Runtime", run: selectIntentStep("run-work", "desktop", "start") },
                { id: "result", label: "Handle output and decisions", actionLabel: "Runtime", run: selectIntentStep("run-work", "desktop", "result") }
              ],
        icon: PlayCircle,
        keywords: ["run", "runtime", "cli", "terminal", "lane", "실행", "터미널", "작업", "런타임"],
        run: () => openSection("desktop", { intentId: "run-work", flowStepId: "lane" })
      },
      {
        id: "evaluate-work",
        label: uiLanguage === "ko" ? "작업 평가" : "Evaluate work",
        detail:
          uiLanguage === "ko"
            ? "현재 작업, 히스토리, 토큰/툴 사용, 오픈소스 EVAL 후보를 점수로 비교합니다."
            : "Score current work, history, token/tool usage, and open-source eval candidates.",
        actionLabel: "EVAL",
        badge: `${visibleEvaluations}/${visibleWebSearches}`,
        targetSection: "eval",
        nextStep: uiLanguage === "ko" ? "평가 탭에서 현재 작업 점수와 병목을 확인합니다." : "Open the eval tab and review current work score and bottlenecks.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "current", label: "현재 작업 점수", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "current") },
                { id: "compare", label: "토큰/툴 비교", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "compare") },
                { id: "opensource", label: "오픈소스 후보", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "opensource") }
              ]
            : [
                { id: "current", label: "Current work score", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "current") },
                { id: "compare", label: "Compare tokens/tools", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "compare") },
                { id: "opensource", label: "Open-source candidates", actionLabel: "EVAL", run: selectIntentStep("evaluate-work", "eval", "opensource") }
              ],
        icon: ClipboardCheck,
        keywords: ["eval", "evaluation", "score", "token", "tool", "평가", "점수", "토큰", "툴", "히스토리"],
        run: () => openSection("eval", { intentId: "evaluate-work", flowStepId: "current" })
      },
      {
        id: "open-files",
        label: uiLanguage === "ko" ? "파일/소스 열기" : "Open files",
        detail:
          uiLanguage === "ko"
            ? "에이전트와 CLI가 공유하는 루트 파일, 소스, 결과를 한 작업면에서 봅니다."
            : "Open shared root files, source, and results in one work surface.",
        actionLabel: uiLanguage === "ko" ? "루트 파일" : "Root Files",
        badge: visibleSourceFiles.length.toLocaleString("ko-KR"),
        targetSection: "source",
        nextStep: uiLanguage === "ko" ? "파일 목록에서 작업할 소스를 선택하고 편집 컨텍스트를 엽니다." : "Choose the source file and open its editing context.",
        flowSteps:
          uiLanguage === "ko"
            ? [
	                { id: "file", label: "파일 선택", actionLabel: "소스", run: selectIntentStep("open-files", "source", "file") },
	                { id: "context", label: "컨텍스트 확인", actionLabel: "소스", run: selectIntentStep("open-files", "source", "context") },
	                { id: "run", label: "실행에 연결", actionLabel: "소스", run: selectIntentStep("open-files", "source", "run") }
              ]
            : [
                { id: "file", label: "Choose file", actionLabel: "Source", run: selectIntentStep("open-files", "source", "file") },
                { id: "context", label: "Review context", actionLabel: "Source", run: selectIntentStep("open-files", "source", "context") },
                { id: "run", label: "Connect to run", actionLabel: "Source", run: selectIntentStep("open-files", "source", "run") }
              ],
        icon: Code2,
        keywords: ["file", "source", "code", "root", "파일", "소스", "코드", "루트"],
        run: () => openSection("source", { intentId: "open-files", flowStepId: "file" })
      },
      {
        id: "resolve-decisions",
        label: uiLanguage === "ko" ? "막힌 결정 처리" : "Resolve decisions",
        detail:
          uiLanguage === "ko"
            ? "보류 질문과 차단 요소를 한곳에서 확인하고 안전한 다음 행동으로 넘깁니다."
            : "Review deferred questions and blockers, then move to the next safe action.",
        actionLabel: uiLanguage === "ko" ? "결정함" : "Inbox",
        badge: (attentionItems.length + collaborationBoard.summary.blockedTasks).toLocaleString("ko-KR"),
        targetSection: "agents",
        nextStep: uiLanguage === "ko" ? "보류 질문을 확인하고 안전한 항목부터 답합니다." : "Review deferred questions and answer the safe items first.",
        flowSteps:
          uiLanguage === "ko"
            ? [
	                { id: "questions", label: "보류 질문 확인", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "agents", "questions") },
	                { id: "answer", label: "안전한 답변 선택", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "agents", "answer") },
	                { id: "resume", label: "작업 재개", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "agents", "resume") }
              ]
            : [
                { id: "questions", label: "Review pending questions", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "agents", "questions") },
                { id: "answer", label: "Choose safe answers", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "agents", "answer") },
                { id: "resume", label: "Resume work", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "agents", "resume") }
              ],
        icon: Inbox,
        keywords: ["decision", "inbox", "blocked", "question", "결정", "보류", "질문", "막힘"],
        run: () => openSection("agents", { intentId: "resolve-decisions", flowStepId: "questions" })
      },
      {
        id: "check-setup",
        label: uiLanguage === "ko" ? "설정 점검" : "Check setup",
        detail:
          uiLanguage === "ko"
            ? "모델 계정, CLI 어댑터, 질문 보류 기본값이 준비됐는지 확인합니다."
            : "Check model accounts, CLI adapters, and question handling defaults.",
        actionLabel: uiLanguage === "ko" ? "핵심 설정" : "Core Setup",
        badge: `${coreReadinessCount}/${coreSetupSteps.length}`,
        targetSection: "overview",
        nextStep: uiLanguage === "ko" ? "빠른 설정에서 계정, CLI 어댑터, 질문 보류 상태를 확인합니다." : "Check accounts, CLI adapter, and question handling in quick setup.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "accounts", label: "계정 확인", actionLabel: "설정", run: () => openSettingsTab("execution", "providers") },
	                { id: "adapters", label: "CLI 어댑터 확인", actionLabel: "설정", run: () => openSettingsTab("execution", "adapter") },
                { id: "questions", label: "질문 처리 확인", actionLabel: "설정", run: () => openSettingsTab("execution", "questions") }
              ]
            : [
                { id: "accounts", label: "Check accounts", actionLabel: "Settings", run: () => openSettingsTab("execution", "providers") },
                { id: "adapters", label: "Check CLI adapters", actionLabel: "Settings", run: () => openSettingsTab("execution", "adapter") },
                { id: "questions", label: "Check question handling", actionLabel: "Settings", run: () => openSettingsTab("execution", "questions") }
              ],
        icon: Settings,
        keywords: ["setup", "settings", "account", "provider", "adapter", "설정", "계정", "어댑터"],
        run: () => {
          setActiveTaskIntentId("check-setup");
          setActiveTaskFlowStepId("accounts");
          openSettingsTab("execution", "quick");
        }
      }
      ];
    },
    [
      agentCatalog.length,
      attentionItems.length,
      collaborationBoard.summary.blockedTasks,
      coreReadinessCount,
      coreSetupSteps.length,
      openSection,
      openSettingsTab,
      rootToolItems.length,
      runtimeInitDefaults.adapterId,
      uiLanguage,
      visibleEvaluations,
      visibleWebSearches,
      visibleSourceFiles.length
    ]
  );
  const activeTaskIntent = useMemo(
    () => taskIntentItems.find((item) => item.id === activeTaskIntentId) || null,
    [activeTaskIntentId, taskIntentItems]
  );
  const activeTaskFlowStep = useMemo(() => {
    if (!activeTaskIntent) {
      return null;
    }
    return activeTaskIntent.flowSteps.find((step) => step.id === activeTaskFlowStepId) || activeTaskIntent.flowSteps[0] || null;
  }, [activeTaskFlowStepId, activeTaskIntent]);
  const ActiveTaskIntentIcon = activeTaskIntent?.icon;
  const primaryHomeIntent = useMemo(
    () => activeTaskIntent || taskIntentItems.find((item) => item.id === "build-tool") || taskIntentItems[0] || null,
    [activeTaskIntent, taskIntentItems]
  );
  const primaryHomeFlowStep = useMemo(() => {
    if (!primaryHomeIntent) {
      return null;
    }
    return primaryHomeIntent.flowSteps.find((step) => step.id === activeTaskFlowStepId) || primaryHomeIntent.flowSteps[0] || null;
  }, [activeTaskFlowStepId, primaryHomeIntent]);
  const PrimaryHomeIntentIcon = primaryHomeIntent?.icon;
  const workVisibilityItems = useMemo(
    () => [
      {
        id: "active-work",
        label: uiLanguage === "ko" ? "진행 중 작업" : "Active work",
        value: collaborationBoard.summary.activeTasks.toLocaleString("ko-KR"),
        detail: uiLanguage === "ko" ? "현재 움직이는 task" : "tasks in motion",
        icon: Activity
      },
      {
        id: "pending-decisions",
        label: uiLanguage === "ko" ? "보류 결정" : "Pending decisions",
        value: (attentionItems.length + collaborationBoard.summary.blockedTasks).toLocaleString("ko-KR"),
        detail: uiLanguage === "ko" ? "나중에 모아 처리" : "deferred for later",
        icon: Inbox
      },
      {
        id: "task-runs",
        label: uiLanguage === "ko" ? "실행 기록" : "Task runs",
        value: snapshot.stats.tasks.toLocaleString("ko-KR"),
        detail: uiLanguage === "ko" ? "연속성 저장소" : "continuity store",
        icon: PlayCircle
      },
      {
        id: "agents-ready",
        label: uiLanguage === "ko" ? "에이전트" : "Agents",
        value: agentCatalog.length.toLocaleString("ko-KR"),
        detail: uiLanguage === "ko" ? "생성/공유 후보" : "created or shareable",
        icon: Bot
      }
    ],
    [
      agentCatalog.length,
      attentionItems.length,
      collaborationBoard.summary.activeTasks,
      collaborationBoard.summary.blockedTasks,
      snapshot.stats.tasks,
      uiLanguage
    ]
  );
  const homeMainFeatures = useMemo<CoreFeatureDrilldownItem[]>(
    () => [
      {
        id: "agents",
        label: uiLanguage === "ko" ? "에이전트 코어" : "Agent Core",
        kicker: uiLanguage === "ko" ? "핵심 1" : "Core 1",
        title: uiLanguage === "ko" ? "커스텀 에이전트를 쉽게 만듭니다" : "Create custom agents easily",
        detail:
          uiLanguage === "ko"
            ? "역할, 도구, 가드레일, 검증 명령을 한 번에 묶어 새 에이전트나 작업별 서브에이전트로 저장합니다."
            : "Bundle role, tools, guardrails, and validation commands into reusable agents or per-task subagents.",
        icon: Bot,
        metric: `${agentCatalog.length.toLocaleString("ko-KR")} agents`,
        cta: uiLanguage === "ko" ? "에이전트 코어 열기" : "Open Agent Core",
        run: () => openSection("agents"),
        steps:
          uiLanguage === "ko"
            ? ["목표와 역할 선택", "루트 툴과 검증 연결", "제안 또는 실행 경로로 넘기기"]
            : ["Choose goal and role", "Attach root tools and validation", "Send to proposal or run lane"]
      },
      {
        id: "tools",
        label: uiLanguage === "ko" ? "툴 스튜디오" : "Tool Studio",
        kicker: uiLanguage === "ko" ? "핵심 2" : "Core 2",
        title: uiLanguage === "ko" ? "툴 제작, 배포, Python 환경을 분리해서 다룹니다" : "Build, deploy, and isolate Python tools",
        detail:
          uiLanguage === "ko"
            ? "툴 만들기, 가상 환경, 배포 점검, 레지스트리 관리를 한 흐름에 두되 현재 단계만 크게 보여줍니다."
            : "Keep build, virtual env, deploy preflight, and registry in one flow while showing only the current step prominently.",
        icon: Wrench,
        metric: `${rootToolItems.length.toLocaleString("ko-KR")} tools`,
        cta: uiLanguage === "ko" ? "툴 스튜디오 열기" : "Open Tool Studio",
        run: () => openSection("tools"),
        steps:
          uiLanguage === "ko"
            ? ["Python 소스와 입력 스키마 선택", "가상 환경과 검증 명령 연결", "배포 전 점검과 롤백 기록"]
            : ["Choose Python source and input schema", "Attach venv and validation command", "Record preflight and rollback"]
      },
      {
        id: "run",
        label: uiLanguage === "ko" ? "CLI 오케스트레이션" : "CLI Orchestration",
        kicker: uiLanguage === "ko" ? "핵심 3" : "Core 3",
        title: uiLanguage === "ko" ? "CLI 작업을 끊기지 않게 이어갑니다" : "Keep CLI work continuous",
        detail:
          uiLanguage === "ko"
            ? "Codex, Claude Code 같은 CLI 실행 경로를 작업 파이프라인으로 묶고, 중간 질문은 결정함에 모아 나중에 처리합니다."
            : "Bind Codex, Claude Code, and other CLI lanes into task pipes while deferring questions to the decision inbox.",
        icon: Network,
        metric: runtimeInitDefaults.adapterId,
        cta: uiLanguage === "ko" ? "CLI 실행 화면" : "Open CLI run",
        run: () => openSection("desktop"),
        steps:
          uiLanguage === "ko"
            ? ["작업 요청 입력", "필요한 CLI 실행 경로로 분산", "질문 보류 후 결과 병합"]
            : ["Enter task intake", "Fan out to needed CLI lanes", "Defer questions and merge results"]
      },
      {
        id: "eval",
        label: uiLanguage === "ko" ? "AI 평가" : "AI Eval",
        kicker: uiLanguage === "ko" ? "품질 루프" : "Quality Loop",
        title: uiLanguage === "ko" ? "현재 작업과 히스토리 품질을 점수로 봅니다" : "Score current work and history quality",
        detail:
          uiLanguage === "ko"
            ? "평가 기록, 웹 검색, 작업 요약, 토큰/툴 사용 신호를 한 작업대에 모아 다음 병목과 외부 EVAL 적용 후보를 판단합니다."
            : "Bring eval records, web research, summaries, and token/tool signals into one workbench to judge bottlenecks and external eval candidates.",
        icon: ClipboardCheck,
        metric: `${visibleEvaluations.toLocaleString("ko-KR")} evals`,
        cta: uiLanguage === "ko" ? "AI 평가 열기" : "Open AI Eval",
        run: () => openSection("eval"),
        steps:
          uiLanguage === "ko"
            ? ["현재 작업 점수 확인", "토큰/툴 사용 비교", "오픈소스 EVAL 후보 판단"]
            : ["Review current work score", "Compare token/tool usage", "Judge open-source eval candidates"]
      },
      {
        id: "files",
        label: uiLanguage === "ko" ? "루트 툴" : "Root Tools",
        kicker: uiLanguage === "ko" ? "공유 기반" : "Shared Base",
        title: uiLanguage === "ko" ? "모든 에이전트와 CLI가 같은 툴을 씁니다" : "Agents and CLIs share the same root tools",
        detail:
          uiLanguage === "ko"
            ? "모델 계정, CLI 어댑터, 작업공간 파일, 결정함을 루트에서 관리하고 작업별 에이전트가 공유하게 둡니다."
            : "Manage model accounts, CLI adapters, workspace files, and the decision inbox at root so per-task agents share them.",
        icon: Code2,
        metric: `${coreReadinessCount}/${coreSetupSteps.length} ready`,
        cta: uiLanguage === "ko" ? "루트 파일/툴" : "Root files/tools",
        run: () => openSection("source"),
        steps:
          uiLanguage === "ko"
            ? ["계정과 CLI 연결", "작업공간 권한 설정", "작업별 에이전트에 공유"]
            : ["Connect accounts and CLIs", "Grant workspace access", "Share with per-task agents"]
      },
      {
        id: "learn",
        label: uiLanguage === "ko" ? "작업 가시성" : "Work Visibility",
        kicker: uiLanguage === "ko" ? "한눈에 보기" : "At a Glance",
        title: uiLanguage === "ko" ? "지금 얼마나 작업 중인지 바로 봅니다" : "See how much work is happening now",
        detail:
          uiLanguage === "ko"
            ? "진행 중 작업, 막힌 결정, 실행 기록, 에이전트 수를 첫 화면과 CLI 화면에서 계속 보여줍니다."
            : "Keep active work, blocked decisions, run records, and agent counts visible on the home and CLI surfaces.",
        icon: Activity,
        metric: `${collaborationBoard.summary.activeTasks.toLocaleString("ko-KR")} 진행 중`,
        cta: uiLanguage === "ko" ? "CLI 작업량 보기" : "View CLI workload",
        run: () => openSection("desktop"),
        steps:
          uiLanguage === "ko"
            ? ["진행/보류/기록 요약", "결정함에서 답변", "반복 패턴을 개선 후보로 승격"]
            : ["Summarize active/deferred/runs", "Answer in the inbox", "Promote repeated patterns"]
      }
    ],
    [
      agentCatalog.length,
      collaborationBoard.summary.activeTasks,
      coreReadinessCount,
      coreSetupSteps.length,
      openSection,
      rootToolItems.length,
      runtimeInitDefaults.adapterId,
      uiLanguage,
      visibleEvaluations
    ]
  );
  const homeDrilldownItems = useMemo<Array<{
    id: string;
    href: string;
    label: string;
    detail: string;
    metric: string;
    icon: LucideIcon;
  }>>(
    () => [
      ...homeMainFeatures.map((feature) => ({
        id: `feature-${feature.id}`,
        href: `#home-depth-feature-${feature.id}`,
        label: feature.label,
        detail: feature.title,
        metric: feature.metric,
        icon: feature.icon
      })),
      {
        id: "setup",
        href: "#home-depth-setup",
        label: uiLanguage === "ko" ? "설정 점검" : "Setup Check",
        detail: uiLanguage === "ko" ? "계정, CLI, 질문 보류를 하나씩 확인합니다." : "Check accounts, CLI, and question deferral one by one.",
        metric: `${coreReadinessCount}/${coreSetupSteps.length}`,
        icon: Settings
      },
      {
        id: "root-tools",
        href: "#home-depth-root-tools",
        label: uiLanguage === "ko" ? "루트 툴" : "Root Tools",
        detail: uiLanguage === "ko" ? "공유 기반 도구와 파일 상태만 봅니다." : "View only shared tool and file state.",
        metric: rootToolItems.length.toLocaleString("ko-KR"),
        icon: Code2
      },
      {
        id: "run-sequence",
        href: "#home-depth-run-sequence",
        label: uiLanguage === "ko" ? "실행 순서" : "Run Sequence",
        detail: uiLanguage === "ko" ? "다음 실행 단계만 확인합니다." : "Review only the next run steps.",
        metric: commandSteps.length.toLocaleString("ko-KR"),
        icon: Activity
      },
      {
        id: "decision-inbox",
        href: "#home-depth-decision-inbox",
        label: uiLanguage === "ko" ? "결정함" : "Decision Inbox",
        detail: uiLanguage === "ko" ? "보류된 판단만 처리합니다." : "Handle only deferred decisions.",
        metric: attentionItems.length.toLocaleString("ko-KR"),
        icon: Inbox
      },
      {
        id: "work-metrics",
        href: "#home-depth-work-metrics",
        label: uiLanguage === "ko" ? "작업 지표" : "Work Metrics",
        detail: uiLanguage === "ko" ? "현재 수치만 봅니다." : "View only current counts.",
        metric: snapshot.stats.tasks.toLocaleString("ko-KR"),
        icon: PlayCircle
      },
      {
        id: "product-structure",
        href: "#home-depth-product-structure",
        label: uiLanguage === "ko" ? "제품 구조" : "Product Structure",
        detail: uiLanguage === "ko" ? "기능 아키텍처만 봅니다." : "View only feature architecture.",
        metric: productFeatureArchitecture.summary.totalFeatures.toLocaleString("ko-KR"),
        icon: Layers
      },
      {
        id: "recent-trail",
        href: "#home-depth-recent-trail",
        label: uiLanguage === "ko" ? "최근 기록" : "Recent Trail",
        detail: uiLanguage === "ko" ? "최신 작업 신호만 봅니다." : "View only latest work signals.",
        metric: recentHistory.length.toLocaleString("ko-KR"),
        icon: History
      },
      {
        id: "option-status",
        href: "#home-depth-option-status",
        label: uiLanguage === "ko" ? "옵션 상태" : "Option Status",
        detail: uiLanguage === "ko" ? "선택 기능 준비 상태만 봅니다." : "View only optional readiness.",
        metric: snapshot.publicReview.status,
        icon: ShieldCheck
      }
    ],
    [
      attentionItems.length,
      commandSteps.length,
      coreReadinessCount,
      coreSetupSteps.length,
      homeMainFeatures,
      productFeatureArchitecture.summary.totalFeatures,
      recentHistory.length,
      rootToolItems.length,
      snapshot.publicReview.status,
      snapshot.stats.tasks,
      uiLanguage
    ]
  );
  const settingsTabs = useMemo<Array<{
    id: SettingsTabId;
    label: string;
    detail: string;
    icon: LucideIcon;
  }>>(
    () => [
      {
        id: "appearance",
        label: uiLanguage === "ko" ? "화면" : "Display",
        detail: uiLanguage === "ko" ? "언어와 보기 권한" : "Language and view mode",
        icon: Languages
      },
      {
        id: "navigation",
        label: uiLanguage === "ko" ? "레이아웃" : "Layout",
        detail: uiLanguage === "ko" ? "왼쪽 레일과 하단 터미널" : "Left rail and bottom terminal",
        icon: LayoutDashboard
      },
      {
        id: "execution",
        label: uiLanguage === "ko" ? "핵심 설정" : "Core Setup",
        detail: uiLanguage === "ko" ? "계정, CLI, 질문, 루트 툴" : "Accounts, CLI, questions, root tools",
        icon: Network
      },
      {
        id: "data",
        label: uiLanguage === "ko" ? "데이터/운영" : "Data",
        detail: uiLanguage === "ko" ? "필터와 스냅샷" : "Filters and snapshot",
        icon: Database
      }
    ],
    [uiLanguage]
  );
  const commandItems = useMemo<CommandItem[]>(
    () => [
      ...taskIntentItems.map((item) => ({
        id: `intent-${item.id}`,
        label: item.label,
        detail: item.detail,
        group: uiLanguage === "ko" ? "하고 싶은 일" : "Goal",
        icon: item.icon,
        badge: item.actionLabel,
        keywords: [item.id, item.actionLabel, ...item.keywords],
        run: item.run
      })),
      ...workVisibleSections.map((item) => ({
        id: `section-${item.id}`,
        label: item.label,
        detail: item.purpose,
        group: "Section",
        icon: item.icon,
        badge: sectionNavMeta[item.id],
        keywords: [item.id, item.label, item.shortLabel, item.purpose],
        run: () => openSection(item.id)
      })),
      {
        id: "operator-center",
        label: uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center",
        detail:
          uiLanguage === "ko"
            ? "모니터링, 문서, 요구사항, 히스토리는 작업 화면과 분리해서 봅니다."
            : "Monitoring, documents, requirements, history, and admin surfaces are separated here.",
        group: uiLanguage === "ko" ? "운영" : "Operator",
        icon: ShieldCheck,
        badge: operatorCenterSections.length.toLocaleString("ko-KR"),
        keywords: ["operator", "monitoring", "documents", "history", "requirements", "admin"],
        run: () => setOperatorCenterOpen(true)
      },
      {
        id: "provider-accounts",
        label: uiLanguage === "ko" ? "제공자 계정 연결" : "Connect Provider Accounts",
        detail:
          uiLanguage === "ko"
            ? "에이전트 코어가 직접 실행할 OpenAI, Anthropic, Gemini, Ollama 계정을 관리합니다."
            : "Manage ChatGPT/OpenAI, Claude/Anthropic, and Gemini/Google API keys in native settings.",
        group: uiLanguage === "ko" ? "핵심 설정" : "Core Setup",
        icon: KeyRound,
        badge: `${providerCredentials.configuredCount}/${providerCredentials.providers.length || 3}`,
        keywords: ["openai", "chatgpt", "claude", "anthropic", "gemini", "google", "api key", "provider", "account"],
        run: () => openSettingsTab("execution", "providers")
      },
      {
        id: "run-search-agent",
        label: uiLanguage === "ko" ? "검색 에이전트 작업 채팅" : "Search Agent Work Chat",
        detail:
          uiLanguage === "ko"
            ? "이미 만들어둔 research-insight-planner-agent로 작업을 시작하는 채팅 패널을 엽니다."
            : "Open the chat workbench for the existing research-insight-planner-agent.",
        group: uiLanguage === "ko" ? "에이전트 실행" : "Agent Run",
        icon: Search,
        badge: researchInsightAgent ? "ready" : "config",
        keywords: ["search", "research", "agent", "planner", researchInsightAgentId],
        run: openSearchAgentWorkbench
      },
      {
        id: "settings-appearance",
        label: uiLanguage === "ko" ? "화면 설정" : "Display Settings",
        detail: uiLanguage === "ko" ? "화면 언어, 보기 모드, 문서 언어는 설정에서만 바꿉니다." : "Change UI language, view mode, and document language in Settings.",
        group: uiLanguage === "ko" ? "설정" : "Settings",
        icon: Languages,
        badge: currentViewMode.label,
        keywords: ["settings", "preferences", "view", "language", "display"],
        run: () => openSettingsTab("appearance")
      },
      {
        id: "settings-execution",
        label: uiLanguage === "ko" ? "핵심 설정" : "Core Setup",
        detail: uiLanguage === "ko" ? "에이전트 코어와 CLI 오케스트레이션 준비를 한 곳에서 정합니다." : "Set Agent Core and CLI orchestration readiness in one place.",
        group: uiLanguage === "ko" ? "설정" : "Settings",
        icon: Network,
        badge: runtimeInitDefaults.adapterId,
        keywords: ["settings", "initialize", "adapter", "session", "task pipe", "auto defer"],
        run: () => openSettingsTab("execution")
      },
      {
        id: "terminal-drawer-open",
        label: uiLanguage === "ko" ? "하단 터미널 열기" : "Open Bottom Terminal",
        detail:
          uiLanguage === "ko"
	            ? "다중 CLI 실행 경로, 표준 출력/오류, 결정 이벤트를 아래에서 올라오는 패널로 봅니다."
            : "Open multi-CLI lanes, stdout/stderr, and decision events in the bottom drawer.",
        group: uiLanguage === "ko" ? "실행" : "Run",
        icon: SquareTerminal,
        badge: terminalDrawerOpen ? "open" : "closed",
        keywords: ["terminal", "drawer", "panel", "cli", "run board", "bottom"],
        run: openTerminalDrawer
      },
      ...viewCategories.slice(0, 10).map((item) => ({
        id: `category-${item}`,
        label: categoryLabel(item),
        detail: uiLanguage === "ko" ? `문서 필터: ${item}` : `Documents filter: ${item}`,
        group: uiLanguage === "ko" ? "문서 필터" : "Document Filter",
        icon: ListFilter,
        badge: item === category ? "active" : undefined,
        keywords: [item, categoryLabel(item), "documents", "filter"],
        run: () => {
          openSection("documents");
          setCategory(item);
        }
      })),
      {
        id: "action-settings",
        label: uiLanguage === "ko" ? "설정" : "Settings",
        detail: uiLanguage === "ko" ? "테마, 언어, 레이아웃, 초기화 기본값을 조정합니다." : "Adjust theme, language, layout, and initialization defaults.",
        group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
        icon: Settings,
        badge: currentViewMode.label,
        keywords: ["settings", "preferences", "view", "language", "pinned"],
        run: () => openSettingsTab("appearance")
      },
      {
        id: "action-attention",
        label: attentionState.action,
        detail: attentionState.title,
        group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
        icon: attentionState.icon,
        badge: attentionState.label,
        keywords: ["attention", "now", attentionState.label, attentionState.title],
        run: () => openSection(attentionState.section)
      },
      {
        id: "action-evidence",
        label: uiLanguage === "ko" ? "근거 기록" : "Evidence Trail",
        detail: `${visibleWebSearches.toLocaleString("ko-KR")} web searches / ${visibleEvaluations.toLocaleString("ko-KR")} evaluations`,
        group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
        icon: FileSearch,
        badge: `${visibleWebSearches}/${visibleEvaluations}`,
        keywords: ["evidence", "web search", "evaluation", "documents"],
        run: () => openSection("documents")
      },
      {
        id: "action-reset-filters",
        label: uiLanguage === "ko" ? "필터 초기화" : "Reset Filters",
        detail: "검색어, 문서, 히스토리, 소스 필터를 초기화합니다.",
        group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
        icon: ListFilter,
        keywords: ["reset", "filter", "search", "clear"],
        run: () => {
          setQuery("");
          setCategory("all");
          setHistoryDate("all");
          setHistoryCategory("all");
          setSourceProject("all");
          setSourceLanguage("all");
        }
      }
    ],
    [
      attentionState.action,
      attentionState.icon,
      attentionState.label,
      attentionState.section,
      attentionState.title,
      category,
      currentViewMode.label,
      openSearchAgentWorkbench,
      openSection,
      openSettingsTab,
      openTerminalDrawer,
      operatorCenterSections.length,
      providerCredentials.configuredCount,
      providerCredentials.providers.length,
      researchInsightAgent,
      runtimeInitDefaults.adapterId,
      sectionNavMeta,
      taskIntentItems,
      terminalDrawerOpen,
      uiLanguage,
      viewCategories,
      visibleEvaluations,
      visibleWebSearches,
      workVisibleSections
    ]
  );
  const normalizedCommandQuery = commandQuery.trim().toLowerCase();
  const filteredCommandItems = useMemo(() => {
    return normalizedCommandQuery
      ? commandItems.filter((item) =>
          `${item.group} ${item.label} ${item.detail} ${item.keywords.join(" ")}`
            .toLowerCase()
            .includes(normalizedCommandQuery)
        )
      : commandItems.slice(0, 18);
  }, [commandItems, normalizedCommandQuery]);
  const runCommandItem = (item: CommandItem) => {
    item.run();
    setCommandPaletteOpen(false);
    setCommandQuery("");
  };

  return (
    <main className={`desktop-app-root theme-${themeMode}`} aria-busy={sectionContentReady ? undefined : true}>
      <div className={`desktop-app-shell sidebar-${sidebarMode}`} data-ui-foundation="gestalt-hierarchy-density">
        <aside className="activity-rail" aria-label={uiLanguage === "ko" ? "주요 기능 레일" : "Primary activity rail"}>
          <button
            className="activity-brand"
            type="button"
            onPointerDown={() => primeSectionActivation("overview")}
            onClick={() => openSection("overview")}
            title={uiLanguage === "ko" ? "작업공간 홈" : "Workspace Home"}
            aria-label={uiLanguage === "ko" ? "작업공간 홈" : "Workspace Home"}
          >
            <Bot size={22} aria-hidden="true" />
          </button>
          <nav aria-label={uiLanguage === "ko" ? "주요 데스크톱 섹션" : "Pinned desktop sections"}>
            {workVisibleSections.map((item) => (
              <button
                key={item.id}
                type="button"
                onPointerDown={() => primeSectionActivation(item.id)}
                onClick={() => openSection(item.id)}
                className={section === item.id ? "active" : ""}
                title={item.label}
                aria-label={item.label}
                aria-current={section === item.id ? "page" : undefined}
                data-section-id={item.id}
              >
                <item.icon size={19} aria-hidden="true" />
                <span>{item.shortLabel}</span>
              </button>
            ))}
          </nav>
          <button
            className="activity-settings"
            type="button"
            onClick={() => setOperatorCenterOpen(true)}
            title={uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center"}
            aria-label={uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center"}
          >
            <ShieldCheck size={19} aria-hidden="true" />
          </button>
          <button
            className="activity-settings"
            type="button"
            onClick={() => openSettingsTab("appearance")}
            title={uiLanguage === "ko" ? "설정" : "Settings"}
            aria-label={uiLanguage === "ko" ? "설정" : "Settings"}
          >
            <Settings size={19} aria-hidden="true" />
          </button>
        </aside>

        <section
          className="desktop-viewport"
          data-active-section={section}
          data-section-content-ready={sectionContentReady ? "true" : "false"}
          data-resident-section-count={residentSectionIds.length}
          data-resident-section-limit={maxResidentSectionPanels}
          data-primary-work-surface={isPrimaryWorkSurface ? "true" : undefined}
          aria-label={uiLanguage === "ko" ? "데스크톱 앱 작업 화면" : "Desktop app viewport"}
          tabIndex={0}
        >
          <header className="desktop-titlebar" data-tauri-drag-region="deep">
            <div className="titlebar-section" data-tauri-drag-region="deep">
              {currentSection ? <currentSection.icon size={18} aria-hidden="true" /> : <LayoutDashboard size={18} aria-hidden="true" />}
              <div data-tauri-drag-region="deep">
                <span data-tauri-drag-region="deep">{currentViewMode.label}</span>
                <strong ref={titlebarSectionLabelRef} data-tauri-drag-region="deep">{currentSectionLabel}</strong>
              </div>
            </div>
            {!isPrimaryWorkSurface && section !== "overview" && (
              <div className={`titlebar-context-strip status-${attentionState.tone}`} data-tauri-drag-region="false">
                <span>
                  <strong>{currentFeatureGroup?.label || (uiLanguage === "ko" ? "작업" : "Work")}</strong>
                  <small>{currentSection?.purpose || (uiLanguage === "ko" ? "선택한 화면의 역할을 보여줍니다." : "Shows the role of the selected surface.")}</small>
                </span>
                <Button variant="secondary" onClick={() => openSection(attentionState.section)} title={attentionState.title}>
                  <attentionState.icon size={14} aria-hidden="true" />
                  <span>{attentionState.action}</span>
                </Button>
              </div>
            )}
            <ActionGroup className="titlebar-actions" aria-label={uiLanguage === "ko" ? "상단 액션" : "Titlebar actions"} density="compact" data-tauri-drag-region="false">
              <Button variant="secondary" onClick={openTerminalDrawer} title={uiLanguage === "ko" ? "하단 터미널 열기" : "Open bottom terminal"}>
                <SquareTerminal size={15} aria-hidden="true" />
                <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
              </Button>
              {!isPrimaryWorkSurface && section !== "overview" && (
                <label className="titlebar-search" data-tauri-drag-region="false">
                  <Search size={15} aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={
                      section === "source"
                        ? uiLanguage === "ko"
                          ? "파일/코드 검색"
                          : "Search files and code"
                        : uiLanguage === "ko"
                          ? "문서 검색"
                          : "Search documents"
                    }
                  />
                </label>
              )}
              <Button variant="ghost" size="icon" onClick={() => setCommandPaletteOpen(true)} title="Command Palette" aria-label="Command Palette">
                <Search size={16} aria-hidden="true" />
              </Button>
            </ActionGroup>
          </header>

          {activeTaskIntent && ActiveTaskIntentIcon && section !== "overview" && activeTaskIntent.targetSection === section && (
            <section className="task-handoff-strip" data-task-handoff={activeTaskIntent.id} aria-label={uiLanguage === "ko" ? "선택한 목표" : "Selected goal"}>
              <ActiveTaskIntentIcon size={17} aria-hidden="true" />
              <span>
                <small>{uiLanguage === "ko" ? "선택한 목표" : "Selected goal"}</small>
                <strong>{activeTaskIntent.label}</strong>
                <em>{activeTaskIntent.nextStep}</em>
              </span>
              <ActionGroup className="task-handoff-actions" aria-label={uiLanguage === "ko" ? "목표 액션" : "Goal actions"} align="end" density="compact">
                <Button variant="secondary" size="sm" onClick={() => openSection("overview")}>
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>{uiLanguage === "ko" ? "목표 변경" : "Change goal"}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveTaskIntentId("")}>
                  <X size={14} aria-hidden="true" />
                  <span>{uiLanguage === "ko" ? "숨기기" : "Dismiss"}</span>
                </Button>
              </ActionGroup>
              <ol className="task-flow-rail" aria-label={uiLanguage === "ko" ? "작업 흐름" : "Task flow"}>
                {activeTaskIntent.flowSteps.map((step, index) => (
                  <li key={`${activeTaskIntent.id}-${step.id}`} className={step.id === activeTaskFlowStep?.id ? "current" : ""}>
                    <Button
                      variant="ghost"
                      onClick={step.run || (() => setActiveTaskFlowStepId(step.id))}
                      data-task-flow-step={step.id}
                      aria-current={step.id === activeTaskFlowStep?.id ? "step" : undefined}
                    >
                      <span>{index + 1}</span>
                      <strong>{step.label}</strong>
                      {step.actionLabel && <small>{step.actionLabel}</small>}
                    </Button>
                  </li>
                ))}
              </ol>
            </section>
          )}

      {commandPaletteOpen && (
        <div
          className="command-palette-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCommandPaletteOpen(false);
            }
          }}
        >
          <section className="command-palette" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "명령 검색" : "Command palette"}>
            <div className="command-palette-search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={commandInputRef}
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filteredCommandItems[0]) {
                    runCommandItem(filteredCommandItems[0]);
                  }
                }}
                placeholder={uiLanguage === "ko" ? "하고 싶은 일 검색: 툴, 에이전트, 실행, 파일, 설정" : "Search goals: tool, agent, run, files, setup"}
              />
              <Button variant="secondary" size="sm" onClick={() => setCommandPaletteOpen(false)}>
                {uiLanguage === "ko" ? "닫기" : "Close"}
              </Button>
            </div>
            <div className="command-palette-meta">
              <span>{filteredCommandItems.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 결과" : "results"}</span>
              <span>{currentViewMode.label}</span>
            </div>
            <div className="command-palette-results">
              {filteredCommandItems.length ? (
                filteredCommandItems.slice(0, 18).map((item) => (
                  <Button key={item.id} variant="ghost" className="command-palette-result" onClick={() => runCommandItem(item)}>
                    <item.icon size={17} aria-hidden="true" />
                    <span>
                      <small>{item.group}</small>
                      <strong>{item.label}</strong>
                      <em>{item.detail}</em>
                    </span>
                    {item.badge && <b>{item.badge}</b>}
                  </Button>
                ))
              ) : (
                <p className="empty-state">{uiLanguage === "ko" ? "일치하는 명령이 없습니다." : "No matching command."}</p>
              )}
            </div>
          </section>
        </div>
      )}

      {settingsOpen && (
        <div
          className="settings-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSettingsOpen(false);
            }
          }}
        >
          <section className="settings-dialog" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "설정" : "Settings"}>
            <header>
              <div>
                <p className="eyebrow">{uiLanguage === "ko" ? "앱 설정" : "Preferences"}</p>
                <h2>{uiLanguage === "ko" ? "설정" : "Settings"}</h2>
              </div>
              <button type="button" onClick={() => setSettingsOpen(false)} title={uiLanguage === "ko" ? "설정 닫기" : "Close settings"}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <div className="settings-dialog-body">
              <nav className="settings-tab-list" aria-label={uiLanguage === "ko" ? "설정 대분류" : "Settings categories"}>
                {settingsTabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={settingsTab === item.id ? "active" : ""}
                    onClick={() => setSettingsTab(item.id)}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </button>
                ))}
              </nav>

              <div className="settings-tab-panel" tabIndex={0} aria-label={uiLanguage === "ko" ? "설정 본문" : "Settings content"}>
                <div className="settings-subsection-rail" role="tablist" aria-label={uiLanguage === "ko" ? "설정 세부 섹션" : "Settings subsections"}>
                  {settingsSubsectionItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activeSettingsSubsection === item.id}
                      className={activeSettingsSubsection === item.id ? "active" : ""}
                      onClick={() => selectSettingsSubsection(item.id)}
                    >
                      <item.icon size={15} aria-hidden="true" />
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </span>
                    </button>
                  ))}
                </div>
                {settingsTab === "appearance" && (
                  <div className="settings-grid">
                    {activeSettingsSubsection === "display" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "테마" : "Theme"}</span>
                          <strong>{currentThemeLabel}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        {(["system", "light", "dark"] as AppThemeMode[]).map((mode) => (
                          <button
                            key={mode}
                            className={themeMode === mode ? "active" : ""}
                            onClick={() => setThemeMode(mode)}
                            type="button"
                          >
                            {mode === "system"
                              ? uiLanguage === "ko" ? "시스템" : "System"
                              : mode === "dark"
                                ? uiLanguage === "ko" ? "다크" : "Dark"
                                : uiLanguage === "ko" ? "라이트" : "Light"}
                          </button>
                        ))}
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "language" && (
                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Languages size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "화면 언어" : "UI Language"}</span>
                          <strong>{uiLanguage === "ko" ? "한국어 우선" : "English Mode"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={uiLanguage === "ko" ? "active" : ""}
                          onClick={() => setUiLanguage("ko")}
                          type="button"
                          title="한국어 화면 문구를 우선 사용합니다."
                        >
                          한국어
                        </button>
                        <button
                          className={uiLanguage === "en" ? "active" : ""}
                          onClick={() => setUiLanguage("en")}
                          type="button"
                          title="Use English interface copy."
                        >
                          English
                        </button>
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "view" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "보기 모드" : "View Mode"}</span>
                          <strong>{currentViewMode.label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {viewModes.map((mode) => (
                          <button
                            key={mode.id}
                            className={currentViewMode.id === mode.id ? "active" : ""}
                            onClick={() => selectViewMode(mode.id)}
                            type="button"
                            title={mode.intent}
                          >
                            <span>{mode.label}</span>
                            <small>{truncateText(mode.intent, 78)}</small>
                          </button>
                        ))}
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "language" && (
                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Languages size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "문서 언어" : "Document Language"}</span>
                          <strong>{currentLanguageMode.label}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        {languageModes.map((mode) => (
                          <button
                            key={mode.id}
                            className={currentLanguageMode.id === mode.id ? "active" : ""}
                            onClick={() => {
                              setLanguageMode(mode.id);
                              setCategory("all");
                              setHistoryCategory("all");
                            }}
                            type="button"
                            title={mode.intent}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </section>
                    )}
                  </div>
                )}

                {settingsTab === "navigation" && (
                  <div className="settings-grid">
                    {activeSettingsSubsection === "rail" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "좌측 레일" : "Left Rail"}</span>
                          <strong>{sidebarMode === "expanded" ? (uiLanguage === "ko" ? "짧은 라벨 표시" : "Labels visible") : uiLanguage === "ko" ? "아이콘만" : "Icons only"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={sidebarMode === "expanded" ? "active" : ""}
                          onClick={() => setSidebarMode("expanded")}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "라벨 표시" : "Labels"}
                        </button>
                        <button
                          className={sidebarMode === "collapsed" ? "active" : ""}
                          onClick={() => setSidebarMode("collapsed")}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "아이콘만" : "Icons"}
                        </button>
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "terminal" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <SquareTerminal size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "하단 터미널" : "Bottom Terminal"}</span>
                          <strong>{terminalDrawerOpen ? (uiLanguage === "ko" ? "열림" : "Open") : uiLanguage === "ko" ? "닫힘" : "Closed"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={terminalDrawerOpen ? "active" : ""}
                          onClick={() => {
                            openTerminalDrawer();
                          }}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "열기" : "Open"}
                        </button>
                        <button
                          className={!terminalDrawerOpen ? "active" : ""}
                          onClick={() => setTerminalDrawerOpen(false)}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "닫기" : "Close"}
                        </button>
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "pinned" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "고정 섹션" : "Pinned Sections"}</span>
                          <strong>{pinnedVisibleSections.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 고정" : "pinned"}</strong>
                        </div>
                      </div>
                      <div className="settings-pin-grid">
                        {workVisibleSections.map((item) => (
                          <button
                            key={item.id}
                            className={pinnedSections.includes(item.id) ? "active" : ""}
                            type="button"
                            onClick={() => togglePinnedSection(item.id)}
                            title={item.purpose}
                          >
                            <item.icon size={15} aria-hidden="true" />
                            <span>{item.shortLabel}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                    )}
                  </div>
                )}

                {settingsTab === "execution" && (
                  <div className="settings-grid">
                    {activeSettingsSubsection === "quick" && (
                    <section className="settings-pane wide quick-setup-pane">
                      <div className="settings-pane-heading">
                        <PlayCircle size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "핵심 기능 설정" : "Core capability setup"}</span>
                          <strong>
                            {uiLanguage === "ko"
                              ? `에이전트 코어와 CLI 오케스트레이션 준비 ${coreReadinessCount}/${coreSetupSteps.length}`
                              : `Agent Core and CLI Orchestration readiness ${coreReadinessCount}/${coreSetupSteps.length}`}
                          </strong>
                          <small>
                            {uiLanguage === "ko"
	                              ? "먼저 계정, CLI 실행 경로, 질문 보류, 루트 툴을 맞추면 두 핵심 기능을 바로 쓸 수 있습니다."
                              : "Set accounts, CLI lanes, question deferral, and root tools first to use the two core features immediately."}
                          </small>
                        </div>
                      </div>
                      <div className="settings-core-setup-grid">
                        {coreSetupSteps.map((step) => (
                          <article key={step.id} className={step.ready ? "ready" : "pending"}>
                            <step.icon size={15} aria-hidden="true" />
                            <span>{step.ready ? (uiLanguage === "ko" ? "준비됨" : "ready") : (uiLanguage === "ko" ? "설정 필요" : "setup needed")}</span>
                            <strong>{step.label}</strong>
                            <p>{step.detail}</p>
                          </article>
                        ))}
                      </div>
                      <div className="root-tool-grid compact">
                        {rootToolItems.map((item) => (
                          <button key={item.id} type="button" onClick={item.action}>
                            <item.icon size={15} aria-hidden="true" />
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                            <small>{item.detail}</small>
                          </button>
                        ))}
                      </div>
                      <div className="settings-action-row">
                        <button type="button" onClick={() => setRuntimeInitDefaults(defaultRuntimeInitDefaults)}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "추천 기본값 적용" : "Apply recommended defaults"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRuntimeInitDefaults(defaultRuntimeInitDefaults);
                            openTerminalDrawer();
                            setSettingsOpen(false);
                          }}
                        >
                          <SquareTerminal size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "터미널로 바로 가기" : "Go to terminal"}</span>
                        </button>
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "providers" && (
                      <ProviderAccountsPanel
                        uiLanguage={uiLanguage}
                        report={providerCredentials}
                        inputs={providerCredentialInputs}
                        busy={providerCredentialBusy}
                        notice={providerCredentialNotice}
                        error={providerCredentialError}
                        actionFeedback={providerActionFeedback}
                        runtimeAvailable={Boolean(getTauriInvoke())}
                        providerModelBusy={providerModelBusy}
                        providerModelBusyProviderId={providerModelBusyProviderId}
                        providerModelCatalog={providerModelCatalog}
                        providerModelError={providerModelError}
                        selectedProviderId={searchAgentRunForm.providerId}
                        selectedModel={searchAgentRunForm.model}
                        onClear={clearProviderCredential}
                        onInputChange={updateProviderCredentialInput}
                        onOpenUrl={openProviderAuthUrl}
                        onRefresh={refreshProviderCredentials}
                        onRefreshModels={(providerId) => refreshProviderModels(providerId, true)}
                        onSave={saveProviderCredential}
                        onUseProvider={(provider, modelId) => {
                          setSearchAgentRunForm((current) => ({
                            ...current,
                            providerId: provider.providerId,
                            model: modelId || provider.defaultModel
                          }));
                          setProviderCredentialNotice(
                            uiLanguage === "ko"
                              ? `${provider.label}를 에이전트 작업 기본값으로 선택했습니다.`
                              : `${provider.label} selected as the agent work default.`
                          );
                          setProviderActionFeedback({
                            providerId: provider.providerId,
                            action: "use",
                            tone: "success",
                            message: uiLanguage === "ko"
                              ? `${provider.label}를 에이전트 작업 기본값으로 선택했습니다.`
                              : `${provider.label} selected as the agent work default.`
                          });
                        }}
                      />
                    )}

                    {activeSettingsSubsection === "adapter" && (
                    <section className="settings-pane wide cli-adapter-setup-guide" data-cli-adapter-setup-guide="settings">
                      <div className="settings-pane-heading">
                        <SquareTerminal size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "기본 CLI 어댑터" : "Default CLI Adapter"}</span>
                          <strong>{selectedRuntimeAdapterOption.label}</strong>
                          <small>
                            {uiLanguage === "ko"
                              ? "CLI 문법을 외우지 않아도 설치, 로그인/키, 검증, 첫 실행 순서대로 따라가면 됩니다."
                              : "Follow install, login/key, verify, and first-run steps without memorizing CLI syntax."}
                          </small>
                        </div>
                      </div>
                      <div className="cli-adapter-picker-grid" role="group" aria-label={uiLanguage === "ko" ? "CLI 어댑터 선택" : "CLI adapter selection"}>
                        {fallbackDesktopAdapters.map((adapter) => {
                          const setupGuide = adapterSetupGuides[adapter.adapterId];
                          const authReady = adapterAuthReadyForAdapter(adapter.adapterId, providerCredentials);
                          return (
                            <button
                              key={adapter.adapterId}
                              className={runtimeInitDefaults.adapterId === adapter.adapterId ? "active" : ""}
                              onClick={() => setRuntimeInitDefaults((current) => ({ ...current, adapterId: adapter.adapterId }))}
                              type="button"
                              title={setupGuide?.installHint || adapter.command}
                            >
                              <span>{adapter.label}</span>
                              <strong>{providerAuthStatusForAdapter(adapter.adapterId, providerCredentials, uiLanguage)}</strong>
                              <small>{authReady ? setupGuide?.firstRunCommand : setupGuide?.authHint}</small>
                            </button>
                          );
                        })}
                      </div>
                      <div className="cli-setup-stepper" aria-label={uiLanguage === "ko" ? "CLI 설정 단계" : "CLI setup steps"}>
                        {runtimeAdapterSetupSteps.map((step) => (
                          <article key={step.id} className={step.ready ? "ready" : "pending"} data-cli-setup-step={step.id}>
                            <span>{step.ready ? <CheckCircle2 size={15} aria-hidden="true" /> : <SquareTerminal size={15} aria-hidden="true" />}</span>
                            <div>
                              <strong>{step.label}</strong>
                              <small>{step.detail}</small>
                            </div>
                            <code>{step.command}</code>
                          </article>
                        ))}
                      </div>
                      <div className="cli-command-copy-row" aria-label={uiLanguage === "ko" ? "CLI 명령 복사" : "Copy CLI commands"}>
                        {runtimeAdapterSetupSteps.map((step) => (
                          <button
                            key={step.id}
                            type="button"
                            data-cli-command-copy={step.id}
                            onClick={() => copyRuntimeAdapterCommand(step.label, step.command)}
                          >
                            <Copy size={14} aria-hidden="true" />
                            <span>{uiLanguage === "ko" ? `${step.label} 복사` : `Copy ${step.label}`}</span>
                          </button>
                        ))}
                        <button type="button" onClick={() => openProviderSettings()}>
                          <KeyRound size={14} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "계정 연결로 이동" : "Open provider accounts"}</span>
                        </button>
                      </div>
                      <div className="cli-adapter-setup-outcome">
                        <span>{uiLanguage === "ko" ? "첫 실행 결과" : "First-run result"}</span>
                        <strong>{selectedRuntimeAdapterGuide.expectedResult}</strong>
                        <small>{selectedRuntimeAdapterGuide.caution}</small>
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "session" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <Bot size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "Session Mode" : "Session Mode"}</span>
                          <strong>{sessionModePresets.find((mode) => mode.id === runtimeInitDefaults.sessionModeId)?.label || sessionModePresets[0].label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {sessionModePresets.map((mode) => (
                          <button
                            key={mode.id}
                            className={runtimeInitDefaults.sessionModeId === mode.id ? "active" : ""}
                            onClick={() => setRuntimeInitDefaults((current) => ({ ...current, sessionModeId: mode.id }))}
                            type="button"
                            title={mode.intent}
                          >
                            <span>{mode.label}</span>
                            <small>{truncateText(mode.intent, 82)}</small>
                          </button>
                        ))}
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "pipe" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <Network size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "Task Pipe" : "Task Pipe"}</span>
                          <strong>{fallbackTaskPipePresets.find((preset) => preset.taskKind === runtimeInitDefaults.taskPipeKind)?.label || fallbackTaskPipePresets[0].label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {fallbackTaskPipePresets.map((preset) => (
                          <button
                            key={preset.taskKind}
                            className={runtimeInitDefaults.taskPipeKind === preset.taskKind ? "active" : ""}
                            onClick={() => setRuntimeInitDefaults((current) => ({ ...current, taskPipeKind: preset.taskKind }))}
                            type="button"
                            title={preset.intent}
                          >
                            <span>{preset.label}</span>
                            <small>{preset.laneCount} lanes / {truncateText(preset.intent, 68)}</small>
                          </button>
                        ))}
                      </div>
                    </section>
                    )}

                    {activeSettingsSubsection === "questions" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <Inbox size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "질문 처리" : "Question Handling"}</span>
                          <strong>{runtimeInitDefaults.autoDeferQuestions ? (uiLanguage === "ko" ? "자동 보류" : "Auto defer") : uiLanguage === "ko" ? "수동 처리" : "Manual"}</strong>
                          <small>
                            {uiLanguage === "ko"
                              ? "질문 자동 보류는 초기화 설정에서만 바꿉니다."
                              : "Auto-defer questions is configured here only."}
                          </small>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={runtimeInitDefaults.autoDeferQuestions ? "active" : ""}
                          onClick={() => setRuntimeInitDefaults((current) => ({ ...current, autoDeferQuestions: true }))}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "자동 보류" : "Auto defer"}
                        </button>
                        <button
                          className={!runtimeInitDefaults.autoDeferQuestions ? "active" : ""}
                          onClick={() => setRuntimeInitDefaults((current) => ({ ...current, autoDeferQuestions: false }))}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "수동 처리" : "Manual"}
                        </button>
                      </div>
                    </section>
                    )}
                  </div>
                )}

                {settingsTab === "data" && (
                  <div className="settings-grid">
                    {activeSettingsSubsection === "filters" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <ListFilter size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "필터" : "Filters"}</span>
                          <strong>{categoryLabel(category)}</strong>
                        </div>
                      </div>
                      <button
                        className="settings-primary-action"
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setCategory("all");
                          setHistoryDate("all");
                          setHistoryCategory("all");
                          setSourceProject("all");
                          setSourceLanguage("all");
                        }}
                      >
                        <ListFilter size={15} aria-hidden="true" />
                        <span>{uiLanguage === "ko" ? "필터 초기화" : "Reset Filters"}</span>
                      </button>
                    </section>
                    )}

                    {activeSettingsSubsection === "snapshot" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <Clock3 size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "스냅샷" : "Snapshot"}</span>
                          <strong>{formatDate(snapshot.generatedAt)}</strong>
                        </div>
                      </div>
                      <p>
                        {viewFilteredDocuments.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 문서" : "documents"} /{" "}
                        {visibleSections.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 섹션" : "sections"}
                      </p>
                    </section>
                    )}

                    {activeSettingsSubsection === "store" && (
                    <section className="settings-pane wide native-preferences-pane">
                      <div className="settings-pane-heading">
                        <Settings size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "앱 설정 저장소" : "App Preferences Store"}</span>
                          <strong>
                            {desktopPreferencesLoaded
                              ? desktopPreferencesStatus
                              : uiLanguage === "ko" ? "불러오는 중" : "Loading"}
                          </strong>
                          <small>
                            {uiLanguage === "ko"
                              ? "테마, 언어, 좌측 레일, 터미널, 실행 기본값은 브라우저 캐시가 아니라 네이티브 앱 설정에 저장됩니다."
                              : "Theme, language, rail, terminal, and run defaults are stored in native app config instead of browser cache."}
                          </small>
                        </div>
                      </div>
                      <dl className="settings-data-list">
                        <div>
                          <dt>{uiLanguage === "ko" ? "저장 방식" : "Storage"}</dt>
                          <dd>{desktopPreferencesSource}</dd>
                        </div>
                        <div>
                          <dt>{uiLanguage === "ko" ? "경로" : "Path"}</dt>
                          <dd>{desktopPreferencesPath || (uiLanguage === "ko" ? "정적 미리보기 기본값" : "Static preview defaults")}</dd>
                        </div>
                        {desktopPreferencesError && (
                          <div>
                            <dt>{uiLanguage === "ko" ? "오류" : "Error"}</dt>
                            <dd>{truncateText(desktopPreferencesError, 180)}</dd>
                          </div>
                        )}
                      </dl>
                    </section>
                    )}

                    {activeSettingsSubsection === "operator" && (
                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "운영 센터" : "Operator Center"}</span>
                          <strong>{operatorCenterSections.length.toLocaleString("ko-KR")}</strong>
                        </div>
                      </div>
                      <button className="settings-primary-action" type="button" onClick={() => setOperatorCenterOpen(true)}>
                        <ShieldCheck size={15} aria-hidden="true" />
                        <span>{uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center"}</span>
                      </button>
                    </section>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {operatorCenterOpen && (
        <OperatorCenterDialog
          sections={operatorCenterSections}
          language={uiLanguage}
          onClose={() => setOperatorCenterOpen(false)}
          onOpenSection={openSection}
        />
      )}

          {!isPrimaryWorkSurface && section !== "overview" && (
            <>
              <section className={`operator-strip operator-${attentionState.tone}`} aria-label="Workspace status and actions">
                <div className="operator-strip-state">
                  <attentionState.icon size={17} aria-hidden="true" />
                  <div>
                    <span>{currentSectionLabel}</span>
                    <strong>{attentionState.title}</strong>
                  </div>
                </div>
                <div className="operator-strip-actions">
                  <button type="button" onClick={() => openSection(attentionState.section)}>
                    <ArrowRight size={15} aria-hidden="true" />
                    <span>{attentionState.action}</span>
                  </button>
                  <button type="button" onClick={() => openSection("agents")}>
                    <Inbox size={15} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "결정함" : "Inbox"}</span>
                  </button>
                  <button type="button" onClick={() => setOperatorCenterOpen(true)}>
                    <FileSearch size={15} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "검증 근거" : "Evidence"}</span>
                  </button>
                  <button type="button" onClick={() => openSection("desktop")}>
                    <SquareTerminal size={15} aria-hidden="true" />
                    <span>Runtime</span>
                  </button>
                </div>
              </section>

              <section className="toolbar desktop-toolbar" aria-label="Document filters">
                {section !== "source" && (
                  <AppChoiceMenu
                    className="document-filter-choice"
                    fallbackLabel={uiLanguage === "ko" ? "모든 문서" : "All documents"}
                    icon={ListFilter}
                    label={uiLanguage === "ko" ? "문서 필터" : "Document filter"}
                    value={category}
                    onChange={setCategory}
                    options={[
                      { value: "all", label: uiLanguage === "ko" ? "모든 문서" : "All documents" },
                      ...viewCategories.map((item) => ({ value: item, label: categoryLabel(item) }))
                    ]}
                  />
                )}
              </section>
            </>
          )}

          {shouldRenderSection("overview") && (
            <MountedSectionPanel id="overview" active={section === "overview"}>
              <div className="desktop-home-grid">
              <span id="overview-home" className="home-route-anchor" aria-hidden="true" />
              <div className="home-menu-surface">
                <section className={`workspace-home-panel core-home-panel home-${attentionState.tone}`} aria-label="Workspace home">
                  <section className="home-focus-command" data-home-focus-command aria-label={uiLanguage === "ko" ? "집중 작업 선택" : "Focused work command"}>
                    <div className="home-focus-copy">
                      <p className="eyebrow">{uiLanguage === "ko" ? "추천 시작점" : "Recommended Start"}</p>
                      <h2>
                        {primaryHomeIntent
                          ? primaryHomeIntent.label
                          : uiLanguage === "ko"
                            ? "작업 시작"
                            : "Start work"}
                      </h2>
                      <p>
                        {primaryHomeIntent
                          ? primaryHomeIntent.detail
                          : uiLanguage === "ko"
                            ? "가장 먼저 처리할 목표를 선택하고 바로 작업 화면으로 이동합니다."
                            : "Choose the first goal and move directly into the work surface."}
                      </p>
                    </div>
                    {primaryHomeIntent && PrimaryHomeIntentIcon && (
                      <article className="home-focus-card" data-home-focus-card={primaryHomeIntent.id}>
                        <header>
                          <PrimaryHomeIntentIcon size={22} aria-hidden="true" />
                          <span>{primaryHomeIntent.actionLabel}</span>
                          <em>{primaryHomeIntent.badge}</em>
                        </header>
                        <strong>{primaryHomeIntent.label}</strong>
                        <p>{primaryHomeIntent.nextStep}</p>
                        <ol className="home-focus-flow" aria-label={uiLanguage === "ko" ? "추천 작업 단계" : "Recommended work steps"}>
                          {primaryHomeIntent.flowSteps.map((step, index) => (
                            <li key={`${primaryHomeIntent.id}-${step.id}`} className={step.id === primaryHomeFlowStep?.id ? "current" : ""}>
                              <span>{index + 1}</span>
                              <strong>{step.label}</strong>
                            </li>
                          ))}
                        </ol>
                        <button type="button" onClick={primaryHomeIntent.run} data-home-focus-primary>
                          <ArrowRight size={16} aria-hidden="true" />
                          <span>{primaryHomeFlowStep?.actionLabel || primaryHomeIntent.actionLabel}</span>
                        </button>
                      </article>
                    )}
                  </section>

                  <section className="home-navigation-dock" data-home-navigation-dock aria-label={uiLanguage === "ko" ? "작업 목표 dock" : "Work goal dock"}>
                    <header>
                      <div>
                        <p className="eyebrow">{uiLanguage === "ko" ? "작업 dock" : "Work Dock"}</p>
                        <h3>{uiLanguage === "ko" ? "다음 작업 목표" : "Next work goals"}</h3>
                      </div>
                      <span>{taskIntentItems.length.toLocaleString("ko-KR")}</span>
                    </header>
                    <div className="workspace-home-actions task-intent-grid" aria-label={uiLanguage === "ko" ? "작업 목표 선택" : "Choose work goal"}>
                      {taskIntentItems.map((item, index) => (
                        <button key={item.id} type="button" onClick={item.run} data-task-intent={item.id}>
                          <span className="task-intent-index">{index + 1}</span>
                          <span className="task-intent-icon" aria-hidden="true">
                            <item.icon size={16} aria-hidden="true" />
                          </span>
                          <span>
                            <strong>{item.label}</strong>
                            <small>{item.detail}</small>
                          </span>
                          <em>{item.badge}</em>
                          <span className="task-intent-action-cue" aria-hidden="true">
                            <ArrowRight size={14} aria-hidden="true" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <div className="core-home-status-row" aria-label={uiLanguage === "ko" ? "현재 작업량" : "Current workload"}>
                    {workVisibilityItems.map((item) => (
                      <article key={item.id}>
                        <item.icon size={16} aria-hidden="true" />
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                        <small>{item.detail}</small>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="panel home-depth-menu-panel" aria-label={uiLanguage === "ko" ? "홈 기능 선택" : "Home function menu"}>
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">{uiLanguage === "ko" ? "깊이 이동" : "Drill Down"}</p>
                      <h2>{uiLanguage === "ko" ? "지금 할 일 하나를 고릅니다" : "Pick one thing to do now"}</h2>
                    </div>
                    <span className="result-count">{homeDrilldownItems.length.toLocaleString("ko-KR")}</span>
                  </div>
                  <div className="home-depth-menu">
                    {homeDrilldownItems.map((item) => (
                      <a key={item.id} href={item.href}>
                        <item.icon size={17} aria-hidden="true" />
                        <span>
                          <strong>{item.label}</strong>
                          <small>{item.detail}</small>
                        </span>
                        <em>{item.metric}</em>
                      </a>
                    ))}
                  </div>
                </section>
              </div>

              {homeMainFeatures.map((feature) => (
                <div key={feature.id} id={`home-depth-feature-${feature.id}`} className="home-drilldown-surface">
                  <div className="home-drilldown-header">
                    <a href="#overview-home">
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                    </a>
                    <div>
                      <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                      <h2>{feature.label}</h2>
                    </div>
                  </div>
                  <CoreFeatureDrilldown feature={feature} language={uiLanguage} />
                </div>
              ))}

              <div id="home-depth-setup" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "설정 점검" : "Setup Check"}</h2>
                  </div>
                </div>
                    <section className="panel core-setup-panel home-depth-panel" aria-label={uiLanguage === "ko" ? "핵심 기능 설정" : "Core feature setup"}>
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">{uiLanguage === "ko" ? "핵심 설정" : "Core Setup"}</p>
                          <h2>
                            {uiLanguage === "ko"
                              ? `${coreReadinessCount}/${coreSetupSteps.length} 준비됨`
                              : `${coreReadinessCount}/${coreSetupSteps.length} ready`}
                          </h2>
                        </div>
                        <button type="button" onClick={() => openSettingsTab("execution", "quick")}>
                          <Settings size={16} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "설정" : "Settings"}</span>
                        </button>
                      </div>
                      <div className="core-setup-list">
                        {coreSetupSteps.map((step) => (
                          <article key={step.id} className={step.ready ? "ready" : "pending"}>
                            <step.icon size={16} aria-hidden="true" />
                            <div>
                              <span>{step.ready ? (uiLanguage === "ko" ? "준비됨" : "ready") : (uiLanguage === "ko" ? "설정 필요" : "setup needed")}</span>
                              <strong>{step.label}</strong>
                              <p>{step.detail}</p>
                            </div>
                            <button type="button" onClick={step.action}>
                              <ArrowRight size={14} aria-hidden="true" />
                              <span>{step.actionLabel}</span>
                            </button>
                          </article>
                        ))}
                      </div>
                    </section>
              </div>

              <div id="home-depth-root-tools" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "루트 툴" : "Root Tools"}</h2>
                  </div>
                </div>
                    <section className="panel root-tool-panel home-depth-panel" aria-label={uiLanguage === "ko" ? "루트 툴 관리" : "Root tool management"}>
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">{uiLanguage === "ko" ? "루트 툴" : "Root Tools"}</p>
                          <h2>{uiLanguage === "ko" ? "공유 기반은 작업 밖에 둡니다" : "Shared foundation stays outside each task"}</h2>
                        </div>
                        <Code2 size={18} aria-hidden="true" />
                      </div>
                      <div className="root-tool-grid">
                        {rootToolItems.map((item) => (
                          <button key={item.id} type="button" onClick={item.action}>
                            <item.icon size={16} aria-hidden="true" />
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                            <small>{item.detail}</small>
                          </button>
                        ))}
                      </div>
                    </section>
              </div>

              <div id="home-depth-run-sequence" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "실행 순서" : "Run Sequence"}</h2>
                  </div>
                </div>
                    <section className="run-timeline-panel home-depth-panel" aria-label="Run timeline">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Timeline</p>
                          <h2>Run Flow</h2>
                        </div>
                        <Activity size={18} aria-hidden="true" />
                      </div>
                      <div className="desktop-run-timeline">
                        {commandSteps.map((step, index) => (
                          <button
                            key={step.label}
                            className={`timeline-step step-${step.tone}`}
                            onClick={() => step.section && openSection(step.section)}
                            type="button"
                            disabled={!step.section}
                          >
                            <span>{index + 1}</span>
                            <step.icon size={16} aria-hidden="true" />
                            <strong>{step.title}</strong>
                            <small>{step.detail}</small>
                          </button>
                        ))}
                      </div>
                    </section>
              </div>

              <div id="home-depth-decision-inbox" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "결정함" : "Decision Inbox"}</h2>
                  </div>
                </div>
                    <section className="decision-dock-panel home-depth-panel" aria-label="Decision inbox">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Decision Inbox</p>
                          <h2>{attentionItems.length ? "Pending" : "Clear"}</h2>
                        </div>
                        <button type="button" onClick={() => openSection("agents")}>
                          <Inbox size={16} aria-hidden="true" />
                          <span>Open</span>
                        </button>
                      </div>
                      <div className="desktop-decision-list">
                        {attentionItems.length ? (
                          attentionItems.map((item) => (
                            <article key={item.id}>
                              <span>{item.label}</span>
                              <strong>{item.title}</strong>
                              <p>{item.detail}</p>
                              <small>{item.meta}</small>
                            </article>
                          ))
                        ) : (
	                          <p className="empty-state">현재 차단 요소나 인계 항목이 없습니다.</p>
                        )}
                      </div>
                    </section>
              </div>

              <div id="home-depth-work-metrics" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "작업 지표" : "Work Metrics"}</h2>
                  </div>
                </div>
                    <section className="home-metrics-strip home-depth-panel" aria-label="Workspace metrics">
                      <Metric label="Core Features" value={2} icon={Network} tone="green" />
                      <Metric label="Setup Ready" value={coreReadinessCount} icon={Settings} tone="blue" />
                      <Metric label="Agents" value={agentCatalog.length} icon={Bot} tone="blue" />
                      <Metric label="Task Runs" value={snapshot.stats.tasks} icon={PlayCircle} tone="amber" />
                      <Metric label="Deferred" value={attentionItems.length + collaborationBoard.summary.blockedTasks} icon={Inbox} tone="red" />
                      <Metric label="Root Tools" value={rootToolItems.length} icon={Code2} tone="violet" />
                    </section>
              </div>

              <div id="home-depth-product-structure" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "제품 구조" : "Product Structure"}</h2>
                  </div>
                </div>
                    <div className="home-depth-panel">
                      <ProductFeatureArchitecturePanel
                        architecture={productFeatureArchitecture}
                        referenceAdvantages={referencePlatformAdvantages}
                        openSourceFeatureReferences={openSourceFeatureReferences}
                        historyInsights={historyInsightLoop}
                        fundamentalImprovement={fundamentalImprovementStructure}
                        onOpenSection={openSection}
                        onOpenOperatorCenter={() => setOperatorCenterOpen(true)}
                      />
                    </div>
              </div>

              <div id="home-depth-recent-trail" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "최근 기록" : "Recent Trail"}</h2>
                  </div>
                </div>
                    <section className="panel home-recent-panel home-depth-panel">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Work Trail</p>
                          <h2>Recent Signals</h2>
                        </div>
                        <button type="button" onClick={() => setOperatorCenterOpen(true)}>
                          <ShieldCheck size={16} aria-hidden="true" />
                          <span>Operator</span>
                        </button>
                      </div>
                      <DocumentList documents={recentHistory.slice(0, 6)} compact />
                    </section>
              </div>

              <div id="home-depth-option-status" className="home-drilldown-surface">
                <div className="home-drilldown-header">
                  <a href="#overview-home">
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "홈 선택으로" : "Back to choices"}</span>
                  </a>
                  <div>
                    <p className="eyebrow">{uiLanguage === "ko" ? "선택한 기능" : "Selected Feature"}</p>
                    <h2>{uiLanguage === "ko" ? "옵션 상태" : "Option Status"}</h2>
                  </div>
                </div>
                    <section className="panel capability-dock-panel home-depth-panel">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Capabilities</p>
                          <h2>Optional Setup</h2>
                        </div>
                        <button type="button" onClick={() => openSection("desktop")}>
                          <Settings size={16} aria-hidden="true" />
                          <span>Runtime</span>
                        </button>
                      </div>
                      <div className="capability-dock-list">
                        <article>
                          <SquareTerminal size={16} aria-hidden="true" />
                          <span>Guest adapters</span>
                          <strong>{sectionNavMeta.desktop}</strong>
                        </article>
                        <article>
                          <Bot size={16} aria-hidden="true" />
                          <span>Agents</span>
                          <strong>{agentCatalog.length.toLocaleString("ko-KR")}</strong>
                        </article>
                        <article>
                          <ShieldCheck size={16} aria-hidden="true" />
                          <span>Public gate</span>
                          <strong>{snapshot.publicReview.status}</strong>
                        </article>
                      </div>
                    </section>
              </div>
              </div>
            </MountedSectionPanel>
          )}

      {shouldRenderSection("desktop") && (
        <MountedSectionPanel id="desktop" active={section === "desktop"}>
          <MemoizedDesktopRuntimePanel
            agentCatalogCount={agentCatalog.length}
            blockedTaskCount={collaborationBoard.summary.blockedTasks}
            sourceFiles={visibleSourceFiles}
            uiLanguage={uiLanguage}
            initDefaults={runtimeInitDefaults}
            providerCredentialReport={providerCredentials}
            launchRequest={section === "desktop" ? runtimeLaunchRequest : null}
            onLaunchRequestConsumed={consumeRuntimeLaunchRequest}
            onOpenSearchAgentWorkbench={openSearchAgentWorkbench}
            onOpenSettings={openExecutionSettings}
            onDesktopResourceSnapshotChange={handleDesktopResourceSnapshotChange}
            terminalDrawerOpen={terminalDrawerOpen}
            setTerminalDrawerOpen={setTerminalDrawerOpen}
            surfaceActive={section === "desktop"}
          />
        </MountedSectionPanel>
      )}

      {shouldRenderSection("eval") && (
        <MountedSectionPanel id="eval" active={section === "eval"}>
          <EvaluationReportPanel
            language={uiLanguage}
            documents={viewFilteredDocuments}
            historyDays={visibleHistoryDays}
            unifiedEvents={visibleUnifiedEvents}
            stats={snapshot.stats}
            activeTasks={collaborationBoard.summary.activeTasks}
            blockedTasks={collaborationBoard.summary.blockedTasks}
            openSourceReferences={openSourceFeatureReferences}
            runtimeTelemetry={sharedDesktopResourceSnapshot}
            onOpenDocuments={(nextCategory = "evaluation") => {
              openSection("documents");
              setCategory(nextCategory);
            }}
            onOpenRuntime={() => openSection("desktop")}
          />
        </MountedSectionPanel>
      )}

      {shouldRenderSection("tools") && (
        <MountedSectionPanel id="tools" active={section === "tools"}>
          <MemoizedToolStudioPanel
            language={uiLanguage}
            requestedMode={requestedToolMode}
            agentCount={agentCatalog.length}
            activeTaskCount={collaborationBoard.summary.activeTasks}
            blockedTaskCount={collaborationBoard.summary.blockedTasks}
            sourceFileCount={visibleSourceFiles.length}
            runtimeAdapterId={runtimeInitDefaults.adapterId}
            providerConfiguredCount={providerCredentials.configuredCount}
            toolUsageIntegration={snapshot.toolUsageIntegration}
            onOpenAgents={openAgentsSection}
            onOpenSource={openSourceSection}
            onOpenTerminal={openTerminalDrawer}
            onOpenProviderSettings={openProviderSettings}
          />
        </MountedSectionPanel>
      )}

      {shouldRenderSection("projects") && (
        <MountedSectionPanel id="projects" active={section === "projects"}>
          <section className="records-grid">
            {snapshot.projects.map((project) => (
              <article className="record-card" key={project.name}>
                <div className="record-header">
                  <FolderKanban size={18} aria-hidden="true" />
                  <div>
                    <h2>{project.name}</h2>
                    <p>{project.path}</p>
                  </div>
                </div>
                <p>{project.purpose}</p>
                <dl>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                  <dt>Type</dt>
                  <dd>{project.type}</dd>
                  <dt>Scope</dt>
                  <dd>{project.scope}</dd>
                </dl>
              </article>
            ))}
          </section>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("history") && (
        <MountedSectionPanel id="history" active={section === "history"}>
          <section className="history-board">
            <div className="history-summary-band">
              <Metric label="기록 날짜" value={visibleHistoryDays.length} icon={CalendarDays} tone="green" />
              <Metric label="기록 문서" value={visibleHistoryDays.reduce((total, day) => total + day.documentsCount, 0)} icon={History} tone="blue" />
              <Metric label="운영 신호" value={visibleUnifiedSummary.totalEvents} icon={Activity} tone="violet" />
              <Metric label="루트 폴더" value={snapshot.stats.rootFolders} icon={FolderKanban} tone="amber" />
              <article className="history-latest">
                <span>최근 기록 날짜</span>
                <strong>{latestHistoryDate ? formatDay(latestHistoryDate) : "기록 없음"}</strong>
                <p>{latestHistoryDate || "날짜가 있는 기록이 없습니다."}</p>
              </article>
            </div>

            <section className="panel wide unified-ops-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">운영 신호</p>
                  <h2>작업 기록과 모니터링 신호</h2>
                </div>
                <Activity size={18} aria-hidden="true" />
              </div>
              <OpsEventRail events={visibleUnifiedEvents.slice(0, 24)} />
            </section>

            <section className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">작업 기록</p>
                  <h2>날짜별 작업 기록</h2>
                  <p className="history-index-status">{adminHistoryStatusText}</p>
                </div>
                <span className="result-count">{filteredHistoryDays.length} days</span>
              </div>
              <div className="history-filters">
                <AppChoiceMenu
                  className="history-date-choice"
                  fallbackLabel={uiLanguage === "ko" ? "모든 날짜" : "All dates"}
                  icon={CalendarDays}
                  label={uiLanguage === "ko" ? "기록 날짜" : "History date"}
                  value={historyDate}
                  onChange={setHistoryDate}
                  options={[
                    {
                      value: "all",
                      label: uiLanguage === "ko" ? "모든 날짜" : "All dates",
                      detail: `${visibleHistoryDays.length} ${uiLanguage === "ko" ? "일" : "days"}`
                    },
                    ...visibleHistoryDays.map((day) => ({
                      value: day.date,
                      label: day.date,
                      detail: `${day.documentsCount} ${uiLanguage === "ko" ? "개 문서" : "documents"}`
                    }))
                  ]}
                />
                <AppChoiceMenu
                  className="history-category-choice"
                  fallbackLabel={uiLanguage === "ko" ? "모든 기록 유형" : "All history types"}
                  icon={ListFilter}
                  label={uiLanguage === "ko" ? "기록 유형" : "History type"}
                  value={historyCategory}
                  onChange={setHistoryCategory}
                  options={[
                    {
                      value: "all",
                      label: uiLanguage === "ko" ? "모든 기록 유형" : "All history types",
                      detail: `${historyCategories.length} ${uiLanguage === "ko" ? "유형" : "types"}`
                    },
                    ...historyCategories.map((item) => ({ value: item, label: categoryLabel(item) }))
                  ]}
                />
              </div>
              <div className="history-visual-grid">
                <HistoryDensityChart days={filteredHistoryDays.slice(0, 28)} />
                <HistoryCategoryBars categories={historyCategoryTotals.slice(0, 10)} />
              </div>
            <HistoryTimeline days={filteredHistoryDays.slice(0, 36)} />
            </section>
          </section>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("intent") && (
        <MountedSectionPanel id="intent" active={section === "intent"}>
          <div className="content-grid">
            <IntentFeatureMapPanel
              map={intentFeatureMap}
              full
              onOpenIntent={() => openSection("intent")}
              onOpenDocuments={() => {
                openSection("documents");
                setCategory("intent-feature-map");
              }}
            />
          </div>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("structure") && (
        <MountedSectionPanel id="structure" active={section === "structure"}>
          <section className="structure-grid">
            <StructureBackbonePanel
              overview={structureOverview}
              onOpenStructure={() => openSection("structure")}
              onOpenSource={() => openSection("source")}
            />

            <section className="panel structure-pressure-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Pressure</p>
                  <h2>복잡도 압력점</h2>
                </div>
                <AlertTriangle size={18} aria-hidden="true" />
              </div>
              <div className="pressure-list">
                {structureOverview.pressurePoints.map((point) => (
                  <article key={point.id} className={`pressure-${point.priority}`}>
                    <span>{point.priority}</span>
                    <strong>{point.signal}</strong>
                    <p>{point.reason}</p>
                    <small>{point.nextAction}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel wide structure-boundary-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Boundary Rules</p>
                  <h2>어디에 무엇을 둘지</h2>
                </div>
                <ShieldCheck size={18} aria-hidden="true" />
              </div>
              <div className="boundary-rule-grid">
                {structureOverview.boundaryRules.map((rule) => (
                  <article key={rule.id}>
                    <span>{rule.sourcePath}</span>
                    <strong>{rule.label}</strong>
                    <p>{rule.rule}</p>
                    <div className="path-list">
                      {rule.appliesTo.slice(0, 8).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Root Inventory</p>
                  <h2>루트 폴더 구조</h2>
                </div>
                <span className="result-count">{snapshot.folderStructure.rootFolders.length} roots</span>
              </div>
              <div className="folder-table">
                {snapshot.folderStructure.rootFolders.map((folder) => (
                  <article key={`${folder.className}-${folder.path}`}>
                    <span>{folder.className}</span>
                    <strong>{folder.path}</strong>
                    <p>{folder.purpose}</p>
                    <small>{folder.source}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Docs</p>
                  <h2>문서 카테고리</h2>
                </div>
                <BookOpenText size={18} aria-hidden="true" />
              </div>
              <div className="stack-list">
                {snapshot.folderStructure.docsCategories.map((folder) => (
                  <article key={folder.id}>
                    <strong>{folder.path}</strong>
                    <p>{folder.purpose}</p>
                    <div className="chip-row">
                      <span>{folder.documentsCount} docs</span>
                      <span>{folder.requiredDocumentsCount} required</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Projects</p>
                  <h2>프로젝트 내부 홈</h2>
                </div>
                <FolderKanban size={18} aria-hidden="true" />
              </div>
              <div className="project-home-grid">
                {snapshot.folderStructure.projectHomes.map((project) => (
                  <article key={project.name}>
                    <strong>{project.name}</strong>
                    <p>{project.purpose}</p>
                    <div className="path-list">
                      {project.topLevelDirs.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">History Sources</p>
                  <h2>히스토리 수집 위치</h2>
                </div>
                <History size={18} aria-hidden="true" />
              </div>
              <div className="stack-list">
                {snapshot.folderStructure.historyRoots.map((source) => (
                  <article key={`${source.category}-${source.root}`}>
                    <strong>{categoryLabel(source.category)}</strong>
                    <p>{source.root}</p>
                    <div className="chip-row">
                      <span>{source.documentsCount} docs</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("documents") && (
        <MountedSectionPanel id="documents" active={section === "documents"}>
          <section className="document-browser">
            {recentDocuments.map((document) => (
              <article className="doc-preview" key={document.id}>
                <div className="doc-meta">
                  <span>{categoryLabel(document.category)}</span>
                  <span>{document.language}</span>
                </div>
                <h2>{document.title}</h2>
                <p className="path">{document.path}</p>
                <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: document.html }} />
              </article>
            ))}
          </section>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("source") && (
        <MountedSectionPanel id="source" active={section === "source"}>
          <MemoizedDesktopRuntimePanel
            agentCatalogCount={agentCatalog.length}
            blockedTaskCount={collaborationBoard.summary.blockedTasks}
            sourceFiles={visibleSourceFiles}
            uiLanguage={uiLanguage}
            initDefaults={runtimeInitDefaults}
            providerCredentialReport={providerCredentials}
            launchRequest={section === "source" ? runtimeLaunchRequest : null}
            onLaunchRequestConsumed={consumeRuntimeLaunchRequest}
            onOpenSearchAgentWorkbench={openSearchAgentWorkbench}
            onOpenSettings={openExecutionSettings}
            onDesktopResourceSnapshotChange={handleDesktopResourceSnapshotChange}
            terminalDrawerOpen={terminalDrawerOpen}
            setTerminalDrawerOpen={setTerminalDrawerOpen}
            surface="files"
            surfaceActive={section === "source"}
          />
        </MountedSectionPanel>
      )}

      {shouldRenderSection("requirements") && (
        <MountedSectionPanel id="requirements" active={section === "requirements"}>
          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Requirements</p>
                <h2>요구사항 목록</h2>
              </div>
              <span className="result-count">{visibleRequirements.length} total</span>
            </div>
            <div className="requirements-table">
              {visibleRequirements.map((requirement) => (
                <article key={`${requirement.id}-${requirement.sourcePath}`}>
                  <strong>{requirement.id}</strong>
                  <span>{requirement.priority}</span>
                  <p>{requirement.requirement}</p>
                  <small>{requirement.sourcePath}</small>
                </article>
              ))}
            </div>
          </section>
        </MountedSectionPanel>
      )}

      {shouldRenderSection("agents") && (
        <MountedSectionPanel id="agents" active={section === "agents"}>
          <div className="content-grid agents-workspace-grid">
          <SearchAgentWorkChatPanel
            form={searchAgentRunForm}
            messages={searchAgentChatMessages}
            agentAvailable={Boolean(researchInsightAgent)}
            language={uiLanguage}
            providerCredentialReport={providerCredentials}
            providerModelCatalog={providerModelCatalog}
            providerModelBusy={providerModelBusy}
            providerModelError={providerModelError}
            providerTaskBusy={providerTaskBusy}
            runtimeLaunchQueued={runtimeLaunchRequest?.taskKind === "research_insight_agent"}
            onChange={updateSearchAgentRunForm}
            onOpenTerminal={openTerminalDrawer}
            onRun={launchSearchAgent}
            onRefreshModels={refreshProviderModels}
          />

          <details
            className="section-secondary-disclosure agent-secondary-disclosure"
            open={agentSignalsOpen}
            onToggle={(event) => setAgentSignalsOpen(event.currentTarget.open)}
          >
            <summary>
              <span>{uiLanguage === "ko" ? "에이전트 상태 신호 열기" : "Open agent status signals"}</span>
              <small>{uiLanguage === "ko" ? "지표는 채팅을 방해하지 않도록 접어둡니다" : "Metrics stay folded away from the chat"}</small>
            </summary>
            {agentSignalsOpen && (
              <div className="section-secondary-stack">
                <section className="metrics-band agent-secondary-metrics">
                  <Metric label="Agent Configs" value={snapshot.stats.agentDefinitions ?? agentCatalog.length} icon={Bot} tone="green" />
                  <Metric label="Runtime Agents" value={snapshot.stats.agents} icon={Activity} tone="blue" />
                  <Metric label="Active Agents" value={snapshot.stats.activeAgents} icon={GitBranch} tone="amber" />
                  <Metric label="Working Tasks" value={collaborationBoard.summary.activeTasks} icon={Network} tone="red" />
                  <Metric label="Handoffs" value={collaborationBoard.summary.handoffs} icon={Layers} tone="slate" />
                  <Metric label="Blocked" value={collaborationBoard.summary.blockedTasks} icon={ShieldCheck} tone="violet" />
                </section>
              </div>
            )}
          </details>

          <details
            className="section-secondary-disclosure agent-secondary-disclosure"
            open={agentDetailsOpen}
            onToggle={(event) => setAgentDetailsOpen(event.currentTarget.open)}
          >
            <summary>
              <span>{uiLanguage === "ko" ? "에이전트 세부 기능 열기" : "Open agent details"}</span>
              <small>{uiLanguage === "ko" ? "한 번에 하나의 세부 작업면만 엽니다" : "Open one detail workspace at a time"}</small>
            </summary>
            {agentDetailsOpen && (
              <div
                className="section-secondary-stack agent-detail-workspace"
                data-agent-detail-workspace
                data-agent-detail-view={agentDetailView}
                data-agent-detail-render-view={agentDetailRenderView}
                data-agent-detail-pending={agentDetailView === agentDetailRenderView ? "false" : "true"}
              >
                <div className="agent-detail-switcher" role="tablist" aria-label={uiLanguage === "ko" ? "에이전트 세부 기능" : "Agent detail workspaces"}>
                  {agentDetailViews.map((item) => {
                    const Icon = item.icon;
                    const selected = agentDetailView === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        id={`agent-detail-tab-${item.id}`}
                        aria-selected={selected}
                        aria-controls="agent-detail-active-panel"
                        data-agent-detail-tab={item.id}
                        onClick={() => selectAgentDetailView(item.id)}
                      >
                        <Icon size={16} aria-hidden="true" />
                        <span>{uiLanguage === "ko" ? item.labelKo : item.labelEn}</span>
                        <small>{uiLanguage === "ko" ? item.detailKo : item.detailEn}</small>
                      </button>
                    );
                  })}
                </div>

                <div
                  id="agent-detail-active-panel"
                  className="agent-detail-active-surface"
                  role="tabpanel"
                  aria-busy={agentDetailView !== agentDetailRenderView}
                  aria-labelledby={`agent-detail-tab-${agentDetailRenderView}`}
                  data-agent-detail-active-surface
                >
                  {agentDetailRenderView === "collaboration" && (
                    <section className="panel wide">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Collaboration</p>
                          <h2>에이전트 협업 작업판</h2>
                        </div>
                        <Network size={18} aria-hidden="true" />
                      </div>
                      <div className="agent-collaboration-theater" data-agent-collaboration-theater>
                        <AgentCollaborationScene board={collaborationBoard} language={uiLanguage} />
                      </div>
                      <AgentCollaborationBoardPanel board={collaborationBoard} />
                    </section>
                  )}

                  {agentDetailRenderView === "blueprint" && (
                    <AgentCoreBlueprintPanel
                      blueprints={agentCoreBlueprints}
                      selectedBlueprintId={selectedAgentCoreBlueprintId}
                      providerCredentialReport={providerCredentials}
                      language={uiLanguage}
                      onSelectBlueprint={setSelectedAgentCoreBlueprintId}
                      onApplyBlueprint={(blueprintId, capabilityIds) => applyAgentCoreBlueprint(blueprintId, "factory", capabilityIds)}
                      onStartPreflight={(blueprintId, capabilityIds) => applyAgentCoreBlueprint(blueprintId, "preflight", capabilityIds)}
                      onCreateProposal={createAgentCoreBlueprintProposal}
                      proposalBusy={agentFactoryBusy}
                      runtimeAvailable={Boolean(getTauriInvoke())}
                    />
                  )}

                  {agentDetailRenderView === "builder" && (
                    <AgentFactoryWizard
                      form={agentFactoryForm}
                      proposal={agentFactoryProposal}
                      busy={agentFactoryBusy}
                      notice={agentFactoryNotice}
                      runtimeAvailable={Boolean(getTauriInvoke())}
                      language={uiLanguage}
                      onChange={updateAgentFactoryForm}
                      onCreateProposal={createAgentFactoryProposal}
                    />
                  )}

                  {agentDetailRenderView === "learning" && (
                    <LearningFeedbackLoopPanel
                      candidates={learningImprovementCandidates}
                      selectedCandidate={selectedLearningCandidate}
                      selectedCandidateId={selectedLearningCandidate?.id || ""}
                      action={learningDecisionAction}
                      assetType={learningAssetType}
                      notes={learningDecisionNotes}
                      report={learningDecisionReport}
                      busy={learningDecisionBusy}
                      notice={learningDecisionNotice}
                      runtimeAvailable={Boolean(getTauriInvoke())}
                      language={uiLanguage}
                      onSelectCandidate={setSelectedLearningCandidateId}
                      onActionChange={setLearningDecisionAction}
                      onAssetTypeChange={setLearningAssetType}
                      onNotesChange={setLearningDecisionNotes}
                      onRecordDecision={recordLearningDecision}
                    />
                  )}

                  {agentDetailRenderView === "flow" && (
                    <section className="panel wide">
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">Flow</p>
                          <h2>에이전트와 작업 연결</h2>
                        </div>
                        <GitBranch size={18} aria-hidden="true" />
                      </div>
                      <AgentFlowMap flows={collaborationBoard.flows} />
                    </section>
                  )}

                  {agentDetailRenderView === "inventory" && <AgentInventoryPanel agents={agentCatalog} />}

                  {agentDetailRenderView === "runtime" && (
                    <AgentRuntimeOverviewPanel
                      runtimeCounts={agentRuntimeCounts}
                      statusCounts={agentStatusCounts}
                      taskStatusCounts={taskStatusCounts}
                      tasks={snapshot.tasks}
                    />
                  )}
                </div>
              </div>
            )}
          </details>
          </div>
        </MountedSectionPanel>
      )}
        </section>
      </div>
      {!sectionContentReady && (
        <div className="startup-warmup-overlay" data-startup-warmup="true">
          <SnapshotLoadingShell detail="Warming resident tabs" />
        </div>
      )}
    </main>
  );
}

function SearchAgentWorkChatPanel({
  form,
  messages,
  agentAvailable,
  language,
  providerCredentialReport,
  providerModelCatalog,
  providerModelBusy,
  providerModelError,
  providerTaskBusy,
  runtimeLaunchQueued,
  onChange,
  onOpenTerminal,
  onRun,
  onRefreshModels
}: {
  form: SearchAgentRunForm;
  messages: SearchAgentChatMessage[];
  agentAvailable: boolean;
  language: UiLanguage;
  providerCredentialReport: ProviderCredentialReport;
  providerModelCatalog: ProviderModelCatalogReport | null;
  providerModelBusy: boolean;
  providerModelError: string;
  providerTaskBusy: boolean;
  runtimeLaunchQueued: boolean;
  onChange: (field: keyof SearchAgentRunForm, value: string) => void;
  onOpenTerminal: () => void;
  onRun: () => void;
  onRefreshModels: (providerId?: string) => void | Promise<void>;
}) {
  const ko = language === "ko";
  const [contextOpen, setContextOpen] = useState(false);
  const statusLabel = agentAvailable ? (ko ? "준비됨" : "Ready") : ko ? "설정 확인" : "Check config";
  const connectedProviders = providerCredentialReport.providers.filter((provider) => provider.configured);
  const selectedProvider =
    providerCredentialReport.providers.find((provider) => provider.providerId === form.providerId) ||
    connectedProviders[0] ||
    providerCredentialReport.providers[0];
  const selectedProviderConnected = Boolean(selectedProvider?.configured);
  const selectedProviderLocal = selectedProvider?.authMethod === "local_http";
  const selectedProviderModel = form.model.trim() || selectedProvider?.defaultModel || "";
  const modelOptions = providerModelCatalog?.providerId === selectedProvider?.providerId ? providerModelCatalog.models : [];
  const modelStatusText = providerModelBusy
    ? ko
      ? "모델 읽는 중"
      : "Loading models"
    : providerModelError
      ? providerModelError
      : providerModelCatalog?.providerId === selectedProvider?.providerId
        ? `${providerModelCatalog.status} / ${modelOptions.length || 1} ${ko ? "개" : "model(s)"}`
        : ko
          ? "모델 목록 대기"
          : "Model list pending";
  const selectedProviderRuntimeLabel = selectedProviderLocal
    ? (ko ? "로컬 실행" : "Local run")
    : selectedProviderConnected
      ? (ko ? "직접 실행" : "Direct run")
      : ko
        ? "CLI 대체"
        : "CLI fallback";
  const selectedProviderRuntimeSource = selectedProviderLocal
    ? "127.0.0.1:11434"
    : selectedProvider?.envVar || "provider env";
  const modelChoiceOptions = useMemo(() => {
    const choices: Array<{ id: string; label: string; detail: string; value: string; badge?: string }> = [];
    const seen = new Set<string>();
    const addChoice = (choice: { id: string; label: string; detail: string; value: string; badge?: string }) => {
      const normalizedValue = choice.value.trim();
      if (!normalizedValue || seen.has(normalizedValue)) {
        return;
      }
      seen.add(normalizedValue);
      choices.push({ ...choice, value: normalizedValue });
    };

    addChoice({
      id: "provider-default-model",
      label: ko ? "기본 모델" : "Default",
      detail: selectedProvider?.defaultModel || providerModelCatalog?.defaultModel || "",
      value: selectedProvider?.defaultModel || providerModelCatalog?.defaultModel || "",
      badge: selectedProvider?.label
    });
    modelOptions.slice(0, 5).forEach((model, index) => {
      addChoice({
        id: `catalog-model-${model.providerId}-${model.id}`,
        label: model.label || model.id,
        detail: model.id,
        value: model.id,
        badge: index === 0 ? (ko ? "발견" : "Found") : undefined
      });
    });
    addChoice({
      id: "current-model-input",
      label: ko ? "현재 입력" : "Current input",
      detail: selectedProviderModel,
      value: selectedProviderModel,
      badge: ko ? "직접" : "Custom"
    });

    return choices.slice(0, 6);
  }, [
    ko,
    modelOptions,
    providerModelCatalog?.defaultModel,
    selectedProvider?.defaultModel,
    selectedProvider?.label,
    selectedProviderModel
  ]);

  return (
    <section className="panel wide search-agent-work-chat-panel">
      <div className="search-agent-work-chat-layout">
        <div className="agent-chat-workspace" aria-label={ko ? "검색 에이전트 작업 채팅" : "Search agent work chat"}>
          <header className="agent-chat-conversation-header">
            <div>
              <span className="agent-chat-kicker">Agent Core</span>
              <h2>{ko ? "에이전트 코어 채팅" : "Agent Core Chat"}</h2>
            </div>
            <div className="agent-chat-header-meta" aria-label={ko ? "채팅 상태" : "Chat status"}>
              <span className={`agent-chat-status-pill ${selectedProviderConnected || selectedProviderLocal ? "ready" : "missing"}`}>
                {providerTaskBusy ? (ko ? "작업 중" : "Running") : runtimeLaunchQueued ? (ko ? "대기 중" : "Queued") : statusLabel}
              </span>
              <span>
                <KeyRound size={14} aria-hidden="true" />
                {selectedProviderLocal
                  ? `${selectedProvider?.label} ${ko ? "로컬" : "local"}`
                  : selectedProviderConnected
                    ? selectedProvider?.label
                    : ko
                      ? "계정 연결 필요"
                      : "Account needed"}
              </span>
            </div>
          </header>

          <div className="agent-chat-thread" role="log" aria-label={ko ? "검색 에이전트 대화" : "Search agent conversation"}>
            {messages.map((message) => (
              <article key={message.id} className={`agent-chat-message ${message.role}`}>
                <header>
                  <strong>{message.title}</strong>
                  <span>{message.meta}</span>
                </header>
                <p>{message.body}</p>
              </article>
            ))}
          </div>

          <div className="agent-chat-composer">
            <label className="agent-chat-prompt-field">
              <span>{ko ? "메시지" : "Message"}</span>
              <textarea
                rows={3}
                value={form.objective}
                placeholder={ko ? "에이전트에게 맡길 일을 입력하세요." : "Message the agent."}
                onChange={(event) => onChange("objective", event.target.value)}
              />
            </label>
            <div className="agent-chat-composer-footer">
              <div className="agent-provider-run-controls" aria-label={ko ? "제공자 실행 설정" : "Provider run settings"}>
                <div className="agent-provider-choice-field">
                  <span>{ko ? "계정" : "Account"}</span>
                  <div className="agent-provider-choice-grid" role="listbox" aria-label={ko ? "계정 선택" : "Account choices"}>
                    {providerCredentialReport.providers.map((provider) => (
                      <button
                        key={provider.providerId}
                        type="button"
                        className={form.providerId === provider.providerId ? "active" : ""}
                        role="option"
                        aria-selected={form.providerId === provider.providerId}
                        onClick={() => onChange("providerId", provider.providerId)}
                      >
                        <span>{provider.label}</span>
                        <small>
                          {provider.authMethod === "local_http"
                            ? ko
                              ? "로컬"
                              : "local"
                            : provider.configured
                              ? ko
                                ? "연결됨"
                                : "connected"
                              : ko
                                ? "미연결"
                                : "not connected"}
                        </small>
                      </button>
                    ))}
                  </div>
                </div>
                <label>
                  <span>{ko ? "모델" : "Model"}</span>
                  <div className="agent-model-picker">
                    <input
                      value={selectedProviderModel}
                      placeholder={selectedProvider?.defaultModel || "model"}
                      onChange={(event) => onChange("model", event.target.value)}
                    />
                    <button
                      type="button"
                      className="agent-model-refresh-button"
                      onClick={() => onRefreshModels(selectedProvider?.providerId)}
                      disabled={providerModelBusy || !selectedProvider}
                      aria-label={ko ? "모델 목록 새로고침" : "Refresh model list"}
                      title={ko ? "모델 목록 새로고침" : "Refresh model list"}
                    >
                      <RefreshCw size={15} aria-hidden="true" />
                    </button>
                  </div>
                  {modelChoiceOptions.length > 0 && (
                    <div className="agent-model-choice-grid" role="listbox" aria-label={ko ? "모델 선택지" : "Model choices"}>
                      {modelChoiceOptions.map((choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          className={selectedProviderModel === choice.value ? "active" : ""}
                          role="option"
                          aria-selected={selectedProviderModel === choice.value}
                          onClick={() => onChange("model", choice.value)}
                          title={choice.detail}
                        >
                          <span>{choice.label}</span>
                          <small>{choice.detail}</small>
                          {choice.badge && <em>{choice.badge}</em>}
                        </button>
                      ))}
                    </div>
                  )}
                  <small className={providerModelError ? "agent-model-status warning" : "agent-model-status"}>
                    {modelStatusText}
                  </small>
                </label>
                <div className={`agent-provider-run-state ${selectedProviderConnected || selectedProviderLocal ? "connected" : "missing"}`}>
                  <strong>{selectedProviderRuntimeLabel}</strong>
                  <span>{selectedProviderRuntimeSource}</span>
                </div>
              </div>
              <div className="agent-chat-actions">
                <button type="button" onClick={onOpenTerminal}>
                  <SquareTerminal size={16} aria-hidden="true" />
                  <span>{ko ? "터미널" : "Terminal"}</span>
                </button>
                <button type="button" className="primary-action-button agent-chat-send-button" onClick={onRun} disabled={providerTaskBusy}>
                  <Send size={16} aria-hidden="true" />
                  <span>{providerTaskBusy ? (ko ? "작업 중" : "Running") : ko ? "전송" : "Send"}</span>
                </button>
              </div>
            </div>
          </div>

          <details
            className="agent-chat-details agent-chat-context-drawer"
            open={contextOpen}
            onToggle={(event) => setContextOpen(event.currentTarget.open)}
          >
            <summary>
              <Settings size={14} aria-hidden="true" />
              <span>{ko ? "컨텍스트와 실행 계약" : "Context and Run Contract"}</span>
            </summary>
            {contextOpen && (
              <>
                <div className="agent-chat-context-form">
                  <label>
                    <span>{ko ? "검색 질문" : "Search Questions"}</span>
                    <textarea
                      rows={6}
                      value={form.questions}
                      onChange={(event) => onChange("questions", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "검색 채널" : "Search Channels"}</span>
                    <textarea
                      rows={5}
                      value={form.searchChannels}
                      onChange={(event) => onChange("searchChannels", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "저장 위치" : "Capture Targets"}</span>
                    <textarea
                      rows={4}
                      value={form.captureTargets}
                      onChange={(event) => onChange("captureTargets", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "실행 메모" : "Run Notes"}</span>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(event) => onChange("notes", event.target.value)}
                    />
                  </label>
                </div>
                <div className="agent-chat-contract-grid" aria-label={ko ? "실행 계약" : "Run contract"}>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "실행 계정" : "Run Account"}</span>
                    <strong>{selectedProvider?.label || (ko ? "계정 없음" : "No account")}</strong>
                    <small>
                      {selectedProviderConnected
                        ? `${selectedProvider?.credentialSource || "credential"} / ${selectedProviderModel}`
                        : ko
                          ? "설정 > 초기화 > 계정 연결에서 키를 저장하면 바로 실행됩니다."
                          : "Save a key in Settings > Init > Account Connections to run directly."}
                    </small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "사용 에이전트" : "Agent"}</span>
                    <strong>{researchInsightAgentId}</strong>
                    <small>{researchInsightAgentConfigPath}</small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "입력 스키마" : "Input Schema"}</span>
                    <strong>research-insight-plan-template</strong>
                    <small>{researchInsightPlanTemplatePath}</small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "실행 결과" : "Output"}</span>
                    <strong>{ko ? "근거, 불확실성, 실행 계획, 검증" : "Evidence, uncertainty, plan, validation"}</strong>
                    <small>
                      {ko
	                        ? "질문은 결정함으로 보류하고, 실행 기록은 작업 실행 저장소에 남습니다."
                        : "Questions go to the decision inbox, and runs are stored in the task-run store."}
                    </small>
                  </div>
                </div>
              </>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}

function StructureBackbonePanel({
  overview,
  compact = false,
  onOpenStructure,
  onOpenSource
}: {
  overview: StructureOverview;
  compact?: boolean;
  onOpenStructure: () => void;
  onOpenSource: () => void;
}) {
  const planes = compact ? overview.planes.slice(0, 4) : overview.planes;
  const hotspots = overview.sourceHotspots.slice(0, compact ? 3 : 6);

  return (
    <section className="panel wide structure-backbone-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Architecture Backbone</p>
          <h2>플랫폼 계층과 소유 경계</h2>
        </div>
        <div className="structure-summary">
          <span>{overview.summary.totalPlanes.toLocaleString("ko-KR")} planes</span>
          <span>{overview.summary.totalBoundaryRules.toLocaleString("ko-KR")} rules</span>
          <span>{overview.summary.totalPressurePoints.toLocaleString("ko-KR")} pressure</span>
        </div>
      </div>

      <div className="structure-plane-grid">
        {planes.map((plane) => (
          <article key={plane.id}>
            <div className="plane-head">
              <Layers size={17} aria-hidden="true" />
              <span>{plane.owner}</span>
            </div>
            <h3>{plane.label}</h3>
            <p>{plane.intent}</p>
            <div className="plane-metrics">
              <span>{plane.documentCount.toLocaleString("ko-KR")} docs</span>
              <span>{plane.sourceFileCount.toLocaleString("ko-KR")} source</span>
              <span>{plane.uiEntry}</span>
            </div>
            <div className="path-list">
              {plane.primaryPaths.slice(0, 6).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {!compact && (
              <dl className="plane-contract">
                <dt>Contains</dt>
                <dd>{plane.contains.join(" / ")}</dd>
                <dt>Not Here</dt>
                <dd>{plane.mustNotContain.join(" / ")}</dd>
              </dl>
            )}
          </article>
        ))}
      </div>

      {hotspots.length > 0 && (
        <div className="source-hotspot-strip">
          {hotspots.map((file) => (
            <button key={file.path} type="button" onClick={onOpenSource} title={file.recommendation}>
              <Code2 size={15} aria-hidden="true" />
              <strong>{file.path}</strong>
              <span>{file.lineCount.toLocaleString("ko-KR")} lines</span>
            </button>
          ))}
        </div>
      )}

      <div className="structure-actions">
        <button type="button" onClick={onOpenStructure}>
          <Layers size={15} aria-hidden="true" />
          <span>Structure</span>
        </button>
        <button type="button" onClick={onOpenSource}>
          <Code2 size={15} aria-hidden="true" />
          <span>Source Hotspots</span>
        </button>
      </div>
    </section>
  );
}

function ModeFunctionSwitchboard({
  catalog,
  selectedGroupId,
  onSelectGroup,
  onOpenOption
}: {
  catalog: ModeFunctionCatalog;
  selectedGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onOpenOption: (groupId: string, optionId: string) => void;
}) {
  const selectedGroup = catalog.groups.find((group) => group.id === selectedGroupId) || catalog.groups[0];
  const SelectedIcon = modeFunctionIcon(selectedGroup?.id || "section_location");

  return (
    <section className="panel wide mode-switchboard-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Mode & Function Switchboard</p>
          <h2>모드와 기능 선택 위치</h2>
        </div>
        <div className="mode-switchboard-summary">
          <span>{catalog.summary.totalGroups.toLocaleString("ko-KR")} groups</span>
          <span>{catalog.summary.totalOptions.toLocaleString("ko-KR")} options</span>
          <span>{catalog.summary.desktopGroups.toLocaleString("ko-KR")} desktop</span>
        </div>
      </div>

      {catalog.groups.length ? (
        <div className="mode-switchboard-layout">
          <div className="mode-group-list" aria-label="Mode and function groups">
            {catalog.groups.map((group) => {
              const Icon = modeFunctionIcon(group.id);
              return (
                <button
                  key={group.id}
                  type="button"
                  className={selectedGroup?.id === group.id ? "active" : ""}
                  onClick={() => onSelectGroup(group.id)}
                  title={group.selectorLocation}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{modeFunctionLabel(group.id, group.label)}</span>
                  <small>{group.optionCount.toLocaleString("ko-KR")}</small>
                </button>
              );
            })}
          </div>

          <article className="mode-location-card">
            <div>
              <SelectedIcon size={18} aria-hidden="true" />
              <span>{selectedGroup?.desktopRuntime ? "desktop runtime" : "platform catalog"}</span>
            </div>
            <h3>{selectedGroup?.label || "No group selected"}</h3>
            <p>{selectedGroup?.purpose || "선택 가능한 모드와 기능 위치를 찾지 못했습니다."}</p>
            {selectedGroup && (
              <dl>
                <dt>Selector</dt>
                <dd>{selectedGroup.selectorLocation}</dd>
                <dt>Default</dt>
                <dd>{selectedGroup.defaultMode || "manual choice"}</dd>
                <dt>Source</dt>
                <dd>{selectedGroup.sourcePath || "local UI"}</dd>
              </dl>
            )}
          </article>

          <div className="mode-option-grid" aria-label="Mode and function options">
            {selectedGroup?.options.map((option) => (
              <article key={`${selectedGroup.id}-${option.id}`}>
                <div className="mode-option-header">
                  <span>{option.status}</span>
                  <strong>{option.label}</strong>
                </div>
                <p>{option.description || selectedGroup.purpose}</p>
                <small>{option.location}</small>
                <button type="button" onClick={() => onOpenOption(selectedGroup.id, option.id)}>
                  <span>선택/위치 열기</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty-state">modeFunctionCatalog 데이터가 아직 생성되지 않았습니다.</p>
      )}
    </section>
  );
}

function ClaudeCodeTransferPanel({
  transfer,
  onOpenDesktop,
  onOpenDocuments
}: {
  transfer: ClaudeCodeDesignTransfer;
  onOpenDesktop: () => void;
  onOpenDocuments: () => void;
}) {
  const visiblePatterns = transfer.patterns.slice(0, 8);
  const sourcePolicy = transfer.sourceBoundary.policy || "public_sources_only";
  const excludedSources = transfer.sourceBoundary.excluded_sources || [];

  return (
    <section className="panel wide claude-transfer-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Claude Code Design Transfer</p>
          <h2>공개 설계 패턴 전이 지도</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenDesktop}>
            <SquareTerminal size={16} aria-hidden="true" />
            <span>Desktop</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      <div className="claude-transfer-layout">
        <article className="claude-transfer-summary">
          <span>Public sources only</span>
          <strong>{sourcePolicy}</strong>
          <p>
            {excludedSources.length
              ? `Excluded: ${excludedSources.join(", ")}`
              : "비공개 또는 검증 불가능한 출처는 설계 근거로 쓰지 않습니다."}
          </p>
          <dl>
            <dt>Patterns</dt>
            <dd>{transfer.summary.totalPatterns.toLocaleString("ko-KR")}</dd>
            <dt>Ready</dt>
            <dd>{transfer.summary.readyNow.toLocaleString("ko-KR")}</dd>
            <dt>Queued</dt>
            <dd>{transfer.summary.queued.toLocaleString("ko-KR")}</dd>
            <dt>High</dt>
            <dd>{transfer.summary.highPriority.toLocaleString("ko-KR")}</dd>
          </dl>
          <small>{transfer.sourcePath}</small>
        </article>

        <div className="transfer-pattern-grid" aria-label="Claude Code transfer patterns">
          {visiblePatterns.length ? (
            visiblePatterns.map((pattern) => (
              <article key={pattern.id}>
                <header>
                  <span>{pattern.priority}</span>
                  <strong>{pattern.label}</strong>
                </header>
                <p>{pattern.transferPrinciple || pattern.claudeCodeSignal}</p>
                <small>{pattern.platformMapping}</small>
                <div className="transfer-pattern-meta">
                  <span>{pattern.status}</span>
                  <span>{pattern.riskControls.slice(0, 2).join(" / ") || "risk controls pending"}</span>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Claude Code public design transfer registry가 아직 생성되지 않았습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PhilosophyFeatureFactoryPanel({
  extraction,
  onOpenAgents,
  onOpenDocuments
}: {
  extraction: PhilosophyFeatureExtraction;
  onOpenAgents: () => void;
  onOpenDocuments: () => void;
}) {
  const visibleFlows = extraction.flows.slice(0, 3);
  const visibleCandidates = extraction.candidates.slice(0, 6);

  return (
    <section className="panel wide philosophy-feature-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Philosophy Feature Factory</p>
          <h2>철학에서 기능 후보 뽑기</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenAgents}>
            <Bot size={16} aria-hidden="true" />
            <span>Agent</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      <div className="philosophy-feature-hero">
        <article>
          <span>source principles</span>
          <strong>{extraction.summary.requiredPrinciples.toLocaleString("ko-KR")}</strong>
          <p>{extraction.sourcePath || "customer snapshot hides internal registry paths"}</p>
        </article>
        <article>
          <span>feature flows</span>
          <strong>{extraction.summary.totalFlows.toLocaleString("ko-KR")}</strong>
          <p>{extraction.summary.totalStages.toLocaleString("ko-KR")} stage extraction loop</p>
        </article>
        <article>
          <span>candidates</span>
          <strong>{extraction.summary.totalCandidates.toLocaleString("ko-KR")}</strong>
          <p>
            {extraction.summary.implemented.toLocaleString("ko-KR")} implemented /{" "}
            {extraction.summary.queued.toLocaleString("ko-KR")} queued
          </p>
        </article>
        <article>
          <span>risk watch</span>
          <strong>{extraction.summary.highRisk.toLocaleString("ko-KR")}</strong>
          <p>{extraction.summary.mediumRisk.toLocaleString("ko-KR")} medium-risk candidates</p>
        </article>
      </div>

      <div className="philosophy-feature-layout">
        <div className="philosophy-flow-list" aria-label="Philosophy feature flows">
          {visibleFlows.length ? (
            visibleFlows.map((flow) => (
              <article key={flow.id}>
                <header>
                  <GitBranch size={16} aria-hidden="true" />
                  <strong>{flow.label}</strong>
                  <span>{flow.principleIds.length.toLocaleString("ko-KR")} principles</span>
                </header>
                <p>{flow.featureQuestion}</p>
                <small>{flow.outputTargets.slice(0, 2).join(" / ")}</small>
              </article>
            ))
          ) : (
            <p className="empty-state">철학 기반 기능 추출 레지스트리가 아직 생성되지 않았습니다.</p>
          )}
        </div>

        <div className="philosophy-candidate-grid" aria-label="Philosophy feature candidates">
          {visibleCandidates.length ? (
            visibleCandidates.map((candidate) => (
              <article key={candidate.id}>
                <div className="philosophy-candidate-top">
                  <span className={`status-pill ${candidate.status}`}>{candidate.status}</span>
                  <span className={`risk-pill ${candidate.riskTier}`}>{candidate.riskTier}</span>
                </div>
                <h3>{candidate.label}</h3>
                <p>{candidate.featureHypothesis}</p>
                <div className="candidate-meta-row">
                  <span>{candidate.smallestAssetType}</span>
                  <span>{candidate.sourcePrincipleIds.slice(0, 3).join(" / ")}</span>
                </div>
                <small>{candidate.validationTargets[0]?.validates || candidate.rollbackPlan}</small>
              </article>
            ))
          ) : (
            <p className="empty-state">철학에서 도출된 기능 후보가 아직 없습니다.</p>
          )}
        </div>
      </div>

      {extraction.defaultCommand && (
        <div className="philosophy-command-strip">
          <FileSearch size={16} aria-hidden="true" />
          <span>{extraction.defaultCommand}</span>
        </div>
      )}
    </section>
  );
}

function IntentFeatureMapPanel({
  map,
  full = false,
  onOpenIntent,
  onOpenDocuments
}: {
  map: IntentFeatureMap;
  full?: boolean;
  onOpenIntent: () => void;
  onOpenDocuments: () => void;
}) {
  const visibleThemes = full ? map.themes : map.themes.slice(0, 6);
  const roadmapStages = [
    { id: "now", label: "Now", items: map.roadmap.now, tone: "green" },
    { id: "next", label: "Next", items: map.roadmap.next, tone: "blue" },
    { id: "later", label: "Later", items: map.roadmap.later, tone: "slate" }
  ] as const;

  return (
    <section className="panel wide intent-map-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Intent Feature Map</p>
          <h2>사용자 의도에서 기능 우선순위로</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenIntent}>
            <GitBranch size={16} aria-hidden="true" />
            <span>Map</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Source</span>
          </button>
        </div>
      </div>

      <div className="intent-map-hero">
        <article>
          <span>structured intents</span>
          <strong>{map.summary.totalIntents.toLocaleString("ko-KR")}</strong>
          <p>
            {map.sourcePath || "customer snapshot hides internal intent history"}
            {map.summary.sourceDate ? ` / ${map.summary.sourceDate}` : ""}
          </p>
        </article>
        <article>
          <span>feature themes</span>
          <strong>{map.summary.totalThemes.toLocaleString("ko-KR")}</strong>
          <p>히스토리 의도를 제품 기능 축으로 묶습니다.</p>
        </article>
        <article>
          <span>now candidates</span>
          <strong>{map.summary.now.toLocaleString("ko-KR")}</strong>
          <p>다음 구현 결정을 바로 돕는 후보입니다.</p>
        </article>
        <article>
          <span>next/later</span>
          <strong>{(map.summary.next + map.summary.later).toLocaleString("ko-KR")}</strong>
          <p>
            {map.summary.next.toLocaleString("ko-KR")} next / {map.summary.later.toLocaleString("ko-KR")} later /{" "}
            {map.summary.availableMaps.toLocaleString("ko-KR")} maps
          </p>
        </article>
      </div>

      <div className="intent-map-layout">
        <div className="intent-theme-list" aria-label="Intent-derived feature themes">
          {visibleThemes.length ? (
            visibleThemes.map((theme) => (
              <article key={theme.id}>
                <header>
                  <GitBranch size={16} aria-hidden="true" />
                  <strong>{theme.label}</strong>
                </header>
                <p>{theme.intent}</p>
                <dl>
                  <dt>Implemented</dt>
                  <dd>{theme.implemented}</dd>
                  <dt>Next</dt>
                  <dd>{theme.nextCandidate}</dd>
                </dl>
              </article>
            ))
          ) : (
            <p className="empty-state">사용자 의도 기반 기능 지도가 아직 생성되지 않았습니다.</p>
          )}
        </div>

        <div className="intent-roadmap-grid" aria-label="Intent roadmap">
          {roadmapStages.map((stage) => (
            <article key={stage.id} className={`intent-roadmap-column roadmap-${stage.tone}`}>
              <header>
                <span>{stage.label}</span>
                <strong>{stage.items.length.toLocaleString("ko-KR")}</strong>
              </header>
              <div>
                {stage.items.length ? (
                  stage.items.map((item) => (
                    <section key={`${stage.id}-${item.feature}`}>
                      <h3>{item.feature}</h3>
                      <p>{item.reason}</p>
                      <small>{item.dependency}</small>
                    </section>
                  ))
                ) : (
                  <p className="empty-state">후보 없음</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {full && map.sourceLimits.length > 0 && (
        <div className="intent-source-limits">
          {map.sourceLimits.map((limit) => (
            <span key={limit}>{limit}</span>
          ))}
        </div>
      )}
    </section>
  );
}

function modeFunctionIcon(groupId: string): LucideIcon {
  if (groupId === "view_mode" || groupId === "install_mode") {
    return ShieldCheck;
  }
  if (groupId === "language_mode") {
    return Languages;
  }
  if (groupId === "work_mode") {
    return ClipboardCheck;
  }
  if (groupId === "desktop_session_mode" || groupId === "cli_adapter") {
    return SquareTerminal;
  }
  if (groupId === "task_pipe") {
    return Network;
  }
  return Layers;
}

function modeFunctionLabel(groupId: string, fallback: string) {
  const labels: Record<string, string> = {
    desktop_session_mode: "Desktop Session Mode",
    task_pipe: "Task Pipe Preset",
    cli_adapter: "CLI Adapter",
    view_mode: "View Mode",
    language_mode: "Language Mode",
    work_mode: "Work Mode",
    install_mode: "Install Mode",
    section_location: "Monitor Section"
  };
  return labels[groupId] || fallback;
}

function UnifiedOpsPanel({
  summary,
  lanes,
  signalTypes,
  events,
  onOpenHistory,
  onOpenAgents
}: {
  summary: UnifiedOps["summary"];
  lanes: Array<{ key: string; count: number }>;
  signalTypes: Array<{ key: string; count: number }>;
  events: UnifiedOps["events"];
  onOpenHistory: () => void;
  onOpenAgents: () => void;
}) {
  return (
    <section className="panel wide unified-ops-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Unified Ops</p>
          <h2>히스토리와 모니터링 통합</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenHistory}>
            <History size={16} aria-hidden="true" />
            <span>History</span>
          </button>
          <button type="button" onClick={onOpenAgents}>
            <Network size={16} aria-hidden="true" />
            <span>Monitor</span>
          </button>
        </div>
      </div>

      <div className="ops-summary-strip">
        <article>
          <span>total events</span>
          <strong>{summary.totalEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>history</span>
          <strong>{summary.historyEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>monitor</span>
          <strong>{summary.monitorEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>open signals</span>
          <strong>{summary.openSignals.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>latest</span>
          <strong>{summary.latestEventAt ? formatDate(summary.latestEventAt) : "기록 없음"}</strong>
        </article>
      </div>

      <div className="ops-unified-grid">
        <div className="ops-signal-column">
          <div>
            <span>lanes</span>
            {lanes.length ? (
              lanes.map((lane) => (
                <p key={lane.key}>
                  <strong>{lane.key}</strong>
                  <small>{lane.count}</small>
                </p>
              ))
            ) : (
              <p className="empty-state">lane signal 없음</p>
            )}
          </div>
          <div>
            <span>signals</span>
            {signalTypes.length ? (
              signalTypes.map((signal) => (
                <p key={signal.key}>
                  <strong>{signal.key}</strong>
                  <small>{signal.count}</small>
                </p>
              ))
            ) : (
              <p className="empty-state">signal 없음</p>
            )}
          </div>
        </div>
        <OpsEventRail events={events} />
      </div>
    </section>
  );
}

function OpsEventRail({ events }: { events: UnifiedOps["events"] }) {
  if (events.length === 0) {
    return <p className="empty-state">통합 운영 이벤트가 아직 없습니다.</p>;
  }

  return (
    <div className="ops-event-rail">
      {events.map((event) => (
        <article key={event.id} className={`ops-event severity-${event.severity}`}>
          <div>
            <span>{event.sourceType} / {event.signalType}</span>
            <strong>{event.title}</strong>
            <p>{event.detail || event.path || "No detail"}</p>
            {event.path && <small>{event.path}</small>}
          </div>
          <aside>
            <strong>{event.status}</strong>
            <span>{event.lane}</span>
            <small>{event.timestamp ? formatDate(event.timestamp) : event.date ? formatDay(event.date) : "no time"}</small>
          </aside>
        </article>
      ))}
    </div>
  );
}

function ProviderAccountsPanel({
  uiLanguage,
  report,
  inputs,
  busy,
  notice,
  error,
  actionFeedback,
  runtimeAvailable,
  providerModelBusy,
  providerModelBusyProviderId,
  providerModelCatalog,
  providerModelError,
  selectedProviderId,
  selectedModel,
  onClear,
  onInputChange,
  onOpenUrl,
  onRefresh,
  onRefreshModels,
  onSave,
  onUseProvider
}: {
  uiLanguage: UiLanguage;
  report: ProviderCredentialReport;
  inputs: Record<string, ProviderCredentialInputState>;
  busy: string;
  notice: string;
  error: string;
  actionFeedback: ProviderActionFeedback | null;
  runtimeAvailable: boolean;
  providerModelBusy: boolean;
  providerModelBusyProviderId: string;
  providerModelCatalog: ProviderModelCatalogReport | null;
  providerModelError: string;
  selectedProviderId: string;
  selectedModel: string;
  onClear: (provider: ProviderCredentialSummary) => void | Promise<void>;
  onInputChange: (providerId: string, field: keyof ProviderCredentialInputState, value: string) => void;
  onOpenUrl: (provider: ProviderCredentialSummary, purpose: "setup" | "login" | "docs") => void | Promise<void>;
  onRefresh: () => void | Promise<void>;
  onRefreshModels: (providerId: string) => void | Promise<void>;
  onSave: (provider: ProviderCredentialSummary) => void | Promise<void>;
  onUseProvider: (provider: ProviderCredentialSummary, modelId?: string) => void | Promise<void>;
}) {
  const [providerFilter, setProviderFilter] = useState<"all" | "needed" | "connected" | "local">("all");
  const copy = uiLanguage === "ko"
    ? {
        title: "제공자 계정 연결",
        status: "연결 상태",
        connected: "연결됨",
        needed: "필요함",
        nativeOnly: "네이티브 앱에서만 저장됩니다.",
        summary: "저장된 키는 모델 API 직접 작업과 CLI 실행 환경변수 주입에 사용됩니다.",
        guideEyebrow: "AI 로그인 설정",
        guideTitle: "GPT와 Gemini는 로그인 후 키 발급 화면으로 바로 이동",
        guideDetail: "OpenAI와 Gemini는 공식 API key 페이지에서 로그인하고 키를 만든 뒤 이 앱에 저장합니다. Ollama는 로컬 런타임 상태를 확인합니다.",
        fastLaneTitle: "빠른 AI 계정 설정",
        fastLaneDetail: "공식 계정으로 로그인한 뒤 키를 만들고 저장하면 작업 기본값으로 바로 사용할 수 있습니다.",
        loginSetup: "로그인/키 발급",
        loginSetupDetail: "공식 API key 페이지 열기",
        configuredNow: "사용 가능",
        notConfiguredYet: "설정 필요",
        chooseProvider: "제공자 선택",
        chooseProviderDetail: "연결 필요, 연결됨, 로컬 런타임을 바로 필터링",
        openOfficial: "공식 로그인/키 발급",
        openOfficialDetail: "제공자 계정으로 로그인한 공식 키 발급 페이지 열기",
        saveKeyStep: "키 저장",
        saveKeyDetail: "계정 메모와 API 키를 앱 설정 저장소에 기록",
        verifyModel: "모델 확인",
        verifyModelDetail: "로컬 모델 또는 기본 모델을 작업 기본값으로 선택",
        storage: "저장 위치",
        refresh: "새로고침",
        allProviders: "전체",
        neededProviders: "설정 필요",
        connectedProviders: "연결됨",
        localProviders: "로컬",
        showCount: "표시",
        cloudAccounts: "클라우드 계정",
        localRuntimes: "로컬 런타임",
        setup: "키 발급",
        login: "로그인 열기",
        docs: "공식 문서",
        save: "저장",
        saving: "저장 중",
        clear: "삭제",
        clearing: "삭제 중",
        refreshModels: "모델 확인",
        refreshingModels: "모델 확인 중",
        useForWork: "작업 기본값",
        usingForWork: "사용 중",
        accountHint: "계정 메모",
        accountPlaceholder: "예: 개인 OpenAI 프로젝트, 회사 Claude Console",
        apiKey: "API key",
        apiKeyPlaceholder: "provider API key 붙여넣기",
        localRuntime: "로컬 런타임",
        localRuntimeSummary: "API key 없이 내 컴퓨터에서 실행 중인 모델 서버를 사용합니다.",
        localEndpoint: "로컬 주소",
        localNoKey: "API key 없음",
        installLocal: "Ollama 설치",
        authMethod: "인증 방식",
        envVar: "실행 변수",
        defaultModel: "기본 모델",
        connectionSource: "연결 출처",
        appStored: "앱 저장",
        envDetected: "환경변수 감지",
        localReady: "로컬 준비",
        keyMissing: "키 필요",
        modelCatalog: "모델",
        modelFallback: "기본 모델만 표시",
        noProviders: "해당 조건의 제공자가 없습니다.",
        errorBadge: "오류",
        doneBadge: "완료",
        infoBadge: "상태",
        source: "source",
        key: "key",
        notSaved: "저장 안 됨"
      }
    : {
        title: "Provider Accounts",
        status: "Connection status",
        connected: "Connected",
        needed: "Needed",
        nativeOnly: "Saving is available only in the native app.",
        summary: "Saved keys power direct model API work and provider-specific CLI environment injection.",
        guideEyebrow: "AI login setup",
        guideTitle: "GPT and Gemini open straight to the signed-in key flow",
        guideDetail: "OpenAI and Gemini use official API key pages. Sign in there, create a key, then save it in this app. Ollama checks the local runtime.",
        fastLaneTitle: "Fast AI account setup",
        fastLaneDetail: "Sign in to the official account, create a key, save it here, then use it as the work default.",
        loginSetup: "Login / get key",
        loginSetupDetail: "Open official API key page",
        configuredNow: "Ready",
        notConfiguredYet: "Setup needed",
        chooseProvider: "Choose provider",
        chooseProviderDetail: "Filter setup needed, connected, and local runtime entries",
        openOfficial: "Official login / key",
        openOfficialDetail: "Open the signed-in provider key page",
        saveKeyStep: "Save key",
        saveKeyDetail: "Store an account note and API key in the app settings store",
        verifyModel: "Verify model",
        verifyModelDetail: "Select a local or default model for agent work",
        storage: "Storage path",
        refresh: "Refresh",
        allProviders: "All",
        neededProviders: "Needs setup",
        connectedProviders: "Connected",
        localProviders: "Local",
        showCount: "Showing",
        cloudAccounts: "Cloud accounts",
        localRuntimes: "Local runtimes",
        setup: "Get key",
        login: "Open login",
        docs: "Docs",
        save: "Save",
        saving: "Saving",
        clear: "Clear",
        clearing: "Clearing",
        refreshModels: "Check models",
        refreshingModels: "Checking models",
        useForWork: "Use for work",
        usingForWork: "In use",
        accountHint: "Account note",
        accountPlaceholder: "e.g. personal OpenAI project, company Claude Console",
        apiKey: "API key",
        apiKeyPlaceholder: "Paste provider API key",
        localRuntime: "Local runtime",
        localRuntimeSummary: "Uses the model server running on this computer without saving an API key.",
        localEndpoint: "Local endpoint",
        localNoKey: "No API key",
        installLocal: "Install Ollama",
        authMethod: "Auth method",
        envVar: "Runtime env",
        defaultModel: "Default model",
        connectionSource: "Connection source",
        appStored: "App saved",
        envDetected: "Env detected",
        localReady: "Local ready",
        keyMissing: "Key needed",
        modelCatalog: "Models",
        modelFallback: "Default model only",
        noProviders: "No providers match this filter.",
        errorBadge: "Error",
        doneBadge: "Done",
        infoBadge: "Info",
        source: "source",
        key: "key",
        notSaved: "Not saved"
      };
  const connectedCount = report.providers.filter((provider) => provider.configured).length;
  const cloudCount = report.providers.filter((provider) => provider.authMethod !== "local_http").length;
  const localCount = report.providers.filter((provider) => provider.authMethod === "local_http").length;
  const visibleProviders = report.providers.filter((provider) => {
    if (providerFilter === "needed") {
      return !provider.configured;
    }
    if (providerFilter === "connected") {
      return provider.configured;
    }
    if (providerFilter === "local") {
      return provider.authMethod === "local_http";
    }
    return true;
  });
  const filterOptions: Array<{ id: "all" | "needed" | "connected" | "local"; label: string; count: number }> = [
    { id: "all", label: copy.allProviders, count: report.providers.length },
    { id: "needed", label: copy.neededProviders, count: report.providers.length - connectedCount },
    { id: "connected", label: copy.connectedProviders, count: connectedCount },
    { id: "local", label: copy.localProviders, count: localCount }
  ];
  const guideSteps = [
    { icon: ListFilter, label: copy.chooseProvider, detail: copy.chooseProviderDetail },
    { icon: ExternalLink, label: copy.openOfficial, detail: copy.openOfficialDetail },
    { icon: KeyRound, label: copy.saveKeyStep, detail: copy.saveKeyDetail },
    { icon: Bot, label: copy.verifyModel, detail: copy.verifyModelDetail }
  ];
  const quickLoginProviders = report.providers.filter((provider) =>
    provider.providerId === "openai" || provider.providerId === "google-gemini"
  );
  const feedbackFor = (providerId: string, action: ProviderActionKind) =>
    actionFeedback?.providerId === providerId && actionFeedback.action === action ? actionFeedback : null;
  const feedbackBadge = (feedback: ProviderActionFeedback | null) => {
    if (!feedback) {
      return null;
    }
    const label = feedback.tone === "error" ? copy.errorBadge : feedback.tone === "success" ? copy.doneBadge : copy.infoBadge;
    return <span className={`provider-button-status status-${feedback.tone}`} aria-hidden="true">{label}</span>;
  };
  const feedbackClass = (feedback: ProviderActionFeedback | null) =>
    feedback ? `has-provider-status status-${feedback.tone}` : "";
  const ariaForAction = (label: string, feedback: ProviderActionFeedback | null) =>
    feedback ? `${label}: ${feedback.message}` : label;
  const panelStatusMessage = actionFeedback?.message || error || notice || (!runtimeAvailable ? copy.nativeOnly : "");
  const refreshFeedback = feedbackFor(providerPanelFeedbackId, "refresh") || (!runtimeAvailable
    ? {
        providerId: providerPanelFeedbackId,
        action: "refresh" as const,
        tone: "error" as const,
        message: copy.nativeOnly
      }
    : null);

  return (
    <section className="settings-pane wide provider-accounts-pane">
      <div className="settings-pane-heading">
        <KeyRound size={16} aria-hidden="true" />
        <div>
          <span>{copy.title}</span>
          <strong>{report.configuredCount}/{report.providers.length} {copy.status}</strong>
          <small>{copy.summary}</small>
        </div>
      </div>

      <div className="provider-login-guide">
        <div className="provider-login-copy">
          <span>{copy.guideEyebrow}</span>
          <strong>{copy.guideTitle}</strong>
          <p>{copy.guideDetail}</p>
        </div>
        <div className="provider-login-steps">
          {guideSteps.map((step) => (
            <article key={step.label}>
              <step.icon size={15} aria-hidden="true" />
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="provider-login-fast-lane" data-provider-login-fast-lane>
        <div>
          <span>{copy.fastLaneTitle}</span>
          <strong>{copy.fastLaneDetail}</strong>
        </div>
        {quickLoginProviders.map((provider) => {
          const loginFeedback = feedbackFor(provider.providerId, "login");
          const useFeedback = feedbackFor(provider.providerId, "use");
          const selectedForWork = selectedProviderId === provider.providerId;
          return (
            <article key={provider.providerId} data-provider-login-card={provider.providerId} className={provider.configured ? "connected" : "missing"}>
              <header>
                <KeyRound size={15} aria-hidden="true" />
                <div>
                  <strong>{provider.providerId === "openai" ? "GPT / OpenAI" : provider.label}</strong>
                  <small>{provider.configured ? copy.configuredNow : copy.notConfiguredYet} · {provider.envVar}</small>
                </div>
              </header>
              <div className="provider-login-card-actions">
                <button
                  type="button"
                  className={feedbackClass(loginFeedback)}
                  onClick={() => onOpenUrl(provider, "login")}
                  title={loginFeedback?.message || copy.loginSetupDetail}
                  aria-label={ariaForAction(`${provider.label} ${copy.loginSetup}`, loginFeedback)}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  <span>{copy.loginSetup}</span>
                  {feedbackBadge(loginFeedback)}
                </button>
                <button
                  type="button"
                  className={`${selectedForWork ? "active" : ""} ${feedbackClass(useFeedback)}`.trim()}
                  onClick={() => onUseProvider(provider, provider.defaultModel)}
                  disabled={!provider.configured}
                  title={useFeedback?.message || undefined}
                  aria-label={ariaForAction(selectedForWork ? copy.usingForWork : copy.useForWork, useFeedback)}
                >
                  <Bot size={15} aria-hidden="true" />
                  <span>{selectedForWork ? copy.usingForWork : copy.useForWork}</span>
                  {feedbackBadge(useFeedback)}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="provider-account-summary">
        <article>
          <span>{copy.status}</span>
          <strong>{report.status}</strong>
        </article>
        <article>
          <span>{copy.cloudAccounts}</span>
          <strong>{cloudCount}</strong>
        </article>
        <article>
          <span>{copy.localRuntimes}</span>
          <strong>{localCount}</strong>
        </article>
        <article>
          <span>{copy.source}</span>
          <strong>{report.source}</strong>
        </article>
        <article>
          <span>{copy.storage}</span>
          <code>{report.credentialFilePath || copy.nativeOnly}</code>
        </article>
        <button
          type="button"
          className={feedbackClass(refreshFeedback)}
          onClick={onRefresh}
          disabled={busy !== ""}
          title={refreshFeedback?.message || undefined}
          aria-label={ariaForAction(copy.refresh, refreshFeedback)}
        >
          <Activity size={15} aria-hidden="true" />
          <span>{copy.refresh}</span>
          {feedbackBadge(refreshFeedback)}
        </button>
      </div>

      <div className="provider-setup-toolbar">
        <div className="provider-filter-choice" role="group" aria-label={copy.status}>
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={providerFilter === option.id ? "active" : ""}
              onClick={() => setProviderFilter(option.id)}
            >
              <span>{option.label}</span>
              <strong>{option.count}</strong>
            </button>
          ))}
        </div>
        <div className="provider-setup-tallies">
          <span>{copy.showCount}</span>
          <strong>{visibleProviders.length}/{report.providers.length}</strong>
        </div>
      </div>

      <div className="provider-action-live-region" role={error ? "alert" : "status"} aria-live={error ? "assertive" : "polite"} aria-atomic="true">
        {panelStatusMessage}
      </div>

      <div className="provider-account-list">
        {visibleProviders.length === 0 && <p className="empty-state">{copy.noProviders}</p>}
        {visibleProviders.map((provider) => {
          const input = inputs[provider.providerId] || { accountHint: provider.accountHint || "", secret: "" };
          const saving = busy === `save:${provider.providerId}`;
          const clearing = busy === `clear:${provider.providerId}`;
          const modelChecking = providerModelBusy && providerModelBusyProviderId === provider.providerId;
          const localRuntime = provider.authMethod === "local_http";
          const catalogForProvider = providerModelCatalog?.providerId === provider.providerId ? providerModelCatalog : null;
          const preferredModel = catalogForProvider?.models[0]?.id || catalogForProvider?.defaultModel || provider.defaultModel;
          const selectedForWork = selectedProviderId === provider.providerId;
          const setupFeedback = feedbackFor(provider.providerId, "setup");
          const loginFeedback = feedbackFor(provider.providerId, "login");
          const primarySetupFeedback = localRuntime ? setupFeedback : loginFeedback;
          const docsFeedback = feedbackFor(provider.providerId, "docs");
          const saveFeedback = feedbackFor(provider.providerId, "save");
          const clearFeedback = feedbackFor(provider.providerId, "clear");
          const useFeedback = feedbackFor(provider.providerId, "use");
          const modelErrorForProvider = catalogForProvider?.error || (catalogForProvider && providerModelError ? providerModelError : "");
          const modelFeedback = feedbackFor(provider.providerId, "models") || (modelErrorForProvider
            ? {
                providerId: provider.providerId,
                action: "models" as const,
                tone: "error" as const,
                message: modelErrorForProvider
              }
            : null);
          const connectionSource = localRuntime
            ? copy.localReady
            : provider.credentialSource === "app_config_file"
              ? copy.appStored
              : provider.environmentAvailable
                ? copy.envDetected
                : copy.keyMissing;
          return (
            <article key={provider.providerId} data-provider-account-row={provider.providerId} className={`provider-account-row ${provider.configured ? "connected" : "missing"}`}>
              <header>
                <div>
                  <span>{provider.providerId}</span>
                  <strong>{provider.label}</strong>
                </div>
                <em>{provider.configured ? copy.connected : copy.needed}</em>
              </header>
              <div className="provider-status-pills">
                <span className={provider.configured ? "ready" : ""}>{connectionSource}</span>
                <span className={selectedForWork ? "ready" : ""}>{selectedForWork ? copy.usingForWork : copy.useForWork}</span>
                <span>{localRuntime ? copy.localRuntime : provider.envVar}</span>
              </div>
              <dl>
                <div>
                  <dt>{copy.authMethod}</dt>
                  <dd>{provider.authMethod}</dd>
                </div>
                <div>
                  <dt>{copy.envVar}</dt>
                  <dd><code>{localRuntime ? "127.0.0.1:11434" : provider.envVar}</code></dd>
                </div>
                <div>
                  <dt>{copy.defaultModel}</dt>
                  <dd><code>{provider.defaultModel}</code></dd>
                </div>
                <div>
                  <dt>{copy.connectionSource}</dt>
                  <dd>{connectionSource}</dd>
                </div>
                <div>
                  <dt>{copy.key}</dt>
                  <dd>{localRuntime ? copy.localNoKey : provider.secretPreview || copy.notSaved}</dd>
                </div>
              </dl>
              {localRuntime ? (
                <div className="provider-local-runtime-note">
                  <span>{copy.localRuntime}</span>
                  <strong>{copy.localEndpoint}: 127.0.0.1:11434</strong>
                  <small>{copy.localRuntimeSummary}</small>
                </div>
              ) : (
                <div className="provider-account-fields">
                  <label>
                    <span>{copy.accountHint}</span>
                    <input
                      value={input.accountHint}
                      onChange={(event) => onInputChange(provider.providerId, "accountHint", event.target.value)}
                      placeholder={copy.accountPlaceholder}
                    />
                  </label>
                  <label>
                    <span>{copy.apiKey}</span>
                    <input
                      type="password"
                      autoComplete="off"
                      value={input.secret}
                      onChange={(event) => onInputChange(provider.providerId, "secret", event.target.value)}
                      placeholder={copy.apiKeyPlaceholder}
                    />
                  </label>
                </div>
              )}
              <div className="provider-account-actions">
                <button
                  type="button"
                  className={feedbackClass(primarySetupFeedback)}
                  onClick={() => onOpenUrl(provider, localRuntime ? "setup" : "login")}
                  title={primarySetupFeedback?.message || (localRuntime ? undefined : copy.loginSetupDetail)}
                  aria-label={ariaForAction(localRuntime ? copy.installLocal : copy.loginSetup, primarySetupFeedback)}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  <span>{localRuntime ? copy.installLocal : copy.loginSetup}</span>
                  {feedbackBadge(primarySetupFeedback)}
                </button>
                <button
                  type="button"
                  className={feedbackClass(docsFeedback)}
                  onClick={() => onOpenUrl(provider, "docs")}
                  title={docsFeedback?.message || undefined}
                  aria-label={ariaForAction(copy.docs, docsFeedback)}
                >
                  <BookOpenText size={15} aria-hidden="true" />
                  <span>{copy.docs}</span>
                  {feedbackBadge(docsFeedback)}
                </button>
                <button
                  type="button"
                  className={feedbackClass(modelFeedback)}
                  onClick={() => onRefreshModels(provider.providerId)}
                  disabled={providerModelBusy || busy !== ""}
                  title={modelFeedback?.message || undefined}
                  aria-label={ariaForAction(copy.refreshModels, modelFeedback)}
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  <span>{modelChecking ? copy.refreshingModels : copy.refreshModels}</span>
                  {feedbackBadge(modelFeedback)}
                </button>
                <button
                  type="button"
                  className={feedbackClass(saveFeedback)}
                  onClick={() => onSave(provider)}
                  disabled={localRuntime || !runtimeAvailable || busy !== ""}
                  title={saveFeedback?.message || undefined}
                  aria-label={ariaForAction(saving ? copy.saving : copy.save, saveFeedback)}
                >
                  <KeyRound size={15} aria-hidden="true" />
                  <span>{saving ? copy.saving : copy.save}</span>
                  {feedbackBadge(saveFeedback)}
                </button>
                <button
                  type="button"
                  className={feedbackClass(clearFeedback)}
                  onClick={() => onClear(provider)}
                  disabled={localRuntime || !runtimeAvailable || busy !== "" || provider.credentialSource !== "app_config_file"}
                  title={clearFeedback?.message || undefined}
                  aria-label={ariaForAction(clearing ? copy.clearing : copy.clear, clearFeedback)}
                >
                  <Trash2 size={15} aria-hidden="true" />
                  <span>{clearing ? copy.clearing : copy.clear}</span>
                  {feedbackBadge(clearFeedback)}
                </button>
                <button
                  type="button"
                  className={`${selectedForWork ? "active" : ""} ${feedbackClass(useFeedback)}`.trim()}
                  onClick={() => onUseProvider(provider, preferredModel)}
                  title={useFeedback?.message || undefined}
                  aria-label={ariaForAction(selectedForWork ? copy.usingForWork : copy.useForWork, useFeedback)}
                >
                  <Bot size={15} aria-hidden="true" />
                  <span>{selectedForWork ? copy.usingForWork : copy.useForWork}</span>
                  {feedbackBadge(useFeedback)}
                </button>
              </div>
              {catalogForProvider && (
                <div className="provider-model-strip">
                  <div>
                    <span>{copy.modelCatalog}</span>
                    <strong>{catalogForProvider.models.length || 1} / {catalogForProvider.status}</strong>
                    <small>{catalogForProvider.source || copy.modelFallback}</small>
                  </div>
                  <div className="provider-model-chip-list">
                    {(catalogForProvider.models.length ? catalogForProvider.models : [
                      {
                        providerId: provider.providerId,
                        id: provider.defaultModel,
                        label: provider.defaultModel,
                        size: null,
                        modifiedAt: ""
                      }
                    ]).slice(0, 4).map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        className={selectedForWork && selectedModel === model.id ? "active" : ""}
                        onClick={() => onUseProvider(provider, model.id)}
                      >
                        <span>{model.label || model.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <small>{provider.caution}</small>
            </article>
          );
        })}
      </div>

      <p className="provider-storage-warning">{report.storageWarning}</p>
    </section>
  );
}

function DesktopRuntimePanel({
  agentCatalogCount,
  blockedTaskCount,
  sourceFiles,
  uiLanguage,
  initDefaults,
  providerCredentialReport,
  launchRequest,
  onLaunchRequestConsumed,
  onOpenSearchAgentWorkbench,
  onOpenSettings,
  onDesktopResourceSnapshotChange,
  terminalDrawerOpen,
  setTerminalDrawerOpen,
  surface = "runtime",
  surfaceActive = true
}: {
  agentCatalogCount: number;
  blockedTaskCount: number;
  sourceFiles: WorkspaceSourceFile[];
  uiLanguage: UiLanguage;
  initDefaults: RuntimeInitDefaults;
  providerCredentialReport?: ProviderCredentialReport | null;
  launchRequest?: RuntimeLaunchRequest | null;
  onLaunchRequestConsumed?: (requestId: string) => void;
  onOpenSearchAgentWorkbench?: () => void;
  onOpenSettings: (subsectionId?: SettingsSubsectionId) => void;
  onDesktopResourceSnapshotChange?: (report: DesktopResourceSnapshotReport | null) => void;
  terminalDrawerOpen: boolean;
  setTerminalDrawerOpen: (open: boolean) => void;
  surface?: "runtime" | "files";
  surfaceActive?: boolean;
}) {
  const copy = nativeWorkspaceCopy[uiLanguage];
  const isFileWorkspaceSurface = surface === "files";
  const initialSessionMode = sessionModePresets.find((mode) => mode.id === initDefaults.sessionModeId) || sessionModePresets[0];
  const [runtimeState, setRuntimeState] = useState<"checking" | "available" | "unavailable">("checking");
  const [health, setHealth] = useState<DesktopHealthStatus | null>(null);
  const [adapters, setAdapters] = useState<CliAdapterStatus[]>(fallbackDesktopAdapters);
  const [reports, setReports] = useState<CliRunReport[]>([]);
  const [sessions, setSessions] = useState<CliSessionReport[]>([]);
  const [nativePtySessions, setNativePtySessions] = useState<RuntimeNativePtySession[]>([]);
  const [selectedNativePtySessionId, setSelectedNativePtySessionId] = useState("");
  const [taskPipePresets, setTaskPipePresets] = useState<CliTaskPipelinePresetReport[]>(fallbackTaskPipePresets);
  const [selectedTaskPipeKind, setSelectedTaskPipeKind] = useState(initDefaults.taskPipeKind);
  const [taskPipePrompt, setTaskPipePrompt] = useState(
    "이 작업을 파이프라인 그래프 기준으로 분해해서 각 CLI 실행 경로를 초기화해줘. 소스에 영향을 주는 결정은 병합 게이트 전까지 보류하고, 질문은 결정함으로 보내줘."
  );
  const [pipelineReports, setPipelineReports] = useState<CliTaskPipelineInitReport[]>([]);
  const [taskRunRecords, setTaskRunRecords] = useState<CliTaskRunRecordReport[]>([]);
  const [selectedTaskRunId, setSelectedTaskRunId] = useState("");
  const [taskRunDetail, setTaskRunDetail] = useState<CliTaskRunDetailReport | null>(null);
  const [taskRunBusy, setTaskRunBusy] = useState(false);
  const [taskRunPruneNotice, setTaskRunPruneNotice] = useState("");
  const [runtimeDataBoundary, setRuntimeDataBoundary] = useState<RuntimeDataBoundaryReport | null>(null);
  const [payloadAudit, setPayloadAudit] = useState<InstallerPayloadAuditReport | null>(null);
  const [supportBundle, setSupportBundle] = useState<SupportDiagnosticBundleReport | null>(null);
  const [runtimeDataBusy, setRuntimeDataBusy] = useState("");
  const [runtimeDataNotice, setRuntimeDataNotice] = useState("");
  const [accumulatedDataOverview, setAccumulatedDataOverview] = useState<AccumulatedDataOverviewReport | null>(null);
  const [accumulatedDataBusy, setAccumulatedDataBusy] = useState(false);
  const [accumulatedDataNotice, setAccumulatedDataNotice] = useState("");
  const [serviceReadiness, setServiceReadiness] = useState<ServiceReadinessReport | null>(null);
  const [serviceReadinessBusy, setServiceReadinessBusy] = useState(false);
  const [serviceReadinessNotice, setServiceReadinessNotice] = useState("");
  const [desktopWorkspace, setDesktopWorkspace] = useState<DesktopWorkspaceStateReport | null>(null);
  const [workspaceHostBusy, setWorkspaceHostBusy] = useState("");
  const [workspaceHostNotice, setWorkspaceHostNotice] = useState("");
  const [desktopActionFeedback, setDesktopActionFeedback] = useState<DesktopActionFeedback | null>(null);
  const [workspaceImportPath, setWorkspaceImportPath] = useState("");
  const [workspaceCloneUrl, setWorkspaceCloneUrl] = useState("");
  const [workspaceCloneFolder, setWorkspaceCloneFolder] = useState("");
  const [desktopGitStatus, setDesktopGitStatus] = useState<DesktopGitStatusReport | null>(null);
  const [desktopGitBusy, setDesktopGitBusy] = useState("");
  const [desktopGitNotice, setDesktopGitNotice] = useState("");
  const [desktopGitCommitMessage, setDesktopGitCommitMessage] = useState("chore(workspace): update workspace files");
  const [desktopGitBranchName, setDesktopGitBranchName] = useState("codex/workspace-update");
  const [inboxReport, setInboxReport] = useState<HumanDecisionInboxReport | null>(null);
  const [error, setError] = useState("");
  const [runningAdapterId, setRunningAdapterId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSessionModeId, setSelectedSessionModeId] = useState(initialSessionMode.id);
  const [selectedSessionAdapterId, setSelectedSessionAdapterId] = useState(initDefaults.adapterId);
  const [workingDir, setWorkingDir] = useState("");
  const [sessionPrompt, setSessionPrompt] = useState(initialSessionMode.prompt);
  const [autoDeferQuestions, setAutoDeferQuestions] = useState(initDefaults.autoDeferQuestions);
  const [sessionInput, setSessionInput] = useState("");
  const [selectedDecisionId, setSelectedDecisionId] = useState("");
  const [decisionAnswerType, setDecisionAnswerType] = useState("instruction");
  const [decisionAnswer, setDecisionAnswer] = useState("");
  const [decisionBusy, setDecisionBusy] = useState(false);
  const [decisionResumeNotice, setDecisionResumeNotice] = useState("");
  const [selectedSourcePath, setSelectedSourcePath] = useState(sourceFiles[0]?.path || "");
  const [sourcePathInput, setSourcePathInput] = useState(sourceFiles[0]?.path || "");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sourceFile, setSourceFile] = useState<WorkspaceTextFile | null>(null);
  const [sourceDraft, setSourceDraft] = useState("");
  const [sourceDrafts, setSourceDrafts] = useState<Record<string, SourceDraftEntry>>({});
  const [runtimeSourceFiles, setRuntimeSourceFiles] = useState<WorkspaceSourceFile[]>([]);
  const [sourceCatalogReport, setSourceCatalogReport] = useState<WorkspaceTextFileListReport | null>(null);
  const [workspaceResourceReport, setWorkspaceResourceReport] = useState<WorkspaceResourcePrepareReport | null>(null);
  const [workspaceWarmupReport, setWorkspaceWarmupReport] = useState<WorkspaceResourceWarmupReport | null>(null);
  const [desktopResourceSnapshot, setDesktopResourceSnapshot] = useState<DesktopResourceSnapshotReport | null>(null);
  const [sourceSaveResults, setSourceSaveResults] = useState<WorkspaceWriteReport[]>([]);
  const [writeReport, setWriteReport] = useState<WorkspaceWriteReport | null>(null);
  const [sourceCopyNotice, setSourceCopyNotice] = useState("");
  const [sourceTemplateId, setSourceTemplateId] = useState<SourceTemplateId>("spec-section");
  const [sourceEditorViewMode, setSourceEditorViewMode] = useState<"edit" | "diff">("edit");
  const [sourceWorkbenchView, setSourceWorkbenchView] = useState<SourceWorkbenchView>(
    isFileWorkspaceSurface ? "editor" : "files"
  );
  const [runtimeDiagnosticsOpen, setRuntimeDiagnosticsOpen] = useState(false);
  const [runRecordsOpen, setRunRecordsOpen] = useState(false);
  const [sourceWordWrap, setSourceWordWrap] = useState(true);
  const [sourceMinimapEnabled, setSourceMinimapEnabled] = useState(false);
  const [sourceSettingsOpen, setSourceSettingsOpen] = useState(false);
  const [interactionContentReady, setInteractionContentReady] = useState(false);
  const [editorBusy, setEditorBusy] = useState(false);
  const [saveAllBusy, setSaveAllBusy] = useState(false);
  const [sourceCatalogBusy, setSourceCatalogBusy] = useState(false);
  const [workspaceResourceBusy, setWorkspaceResourceBusy] = useState(false);
  const sourceEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const sourceDraftRef = useRef("");
  const activeSourcePathRef = useRef("");
  const sourceDraftSyncTimerRef = useRef<number | null>(null);
  const panelMountedRef = useRef(false);
  const activeSessionPollInFlightRef = useRef(false);
  const activeNativePtyPollInFlightRef = useRef(false);
  const workspaceWarmupPollRef = useRef<number | null>(null);
  const consumedLaunchRequestIdsRef = useRef<Set<string>>(new Set());
  const lastInboxRefreshAtRef = useRef(0);
  const lastTaskRunRefreshAtRef = useRef(0);

  const invoke = getTauriInvoke();
  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const shouldPrepareSourceWorkspace = isFileWorkspaceSurface || runtimeDiagnosticsOpen;
  const sourceCatalogFiles = runtimeSourceFiles.length ? runtimeSourceFiles : sourceFiles;
  const sourceFileCount = sourceCatalogFiles.length;
  const sourceCatalogLabel = workspaceResourceReport ? "native cache" : runtimeSourceFiles.length ? "runtime" : "snapshot";
  const editableSourceFiles = useMemo(() => {
    if (!shouldPrepareSourceWorkspace) {
      return [];
    }
    return sourceCatalogFiles.filter((file) => !file.truncated).slice(0, 240);
  }, [shouldPrepareSourceWorkspace, sourceCatalogFiles]);
  const deferredSourceFilter = useDeferredValue(sourceFilter);
  const filteredEditableSourceFiles = useMemo(() => {
    if (!shouldPrepareSourceWorkspace) {
      return [];
    }
    const normalizedFilter = deferredSourceFilter.trim().toLowerCase();
    if (!normalizedFilter) {
      return editableSourceFiles.slice(0, 80);
    }
    return editableSourceFiles
      .filter((file) =>
        [file.path, file.project, file.language, file.extension]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedFilter))
      )
      .slice(0, 80);
  }, [deferredSourceFilter, editableSourceFiles, shouldPrepareSourceWorkspace]);
  const selectedSourceFileOption = useMemo(
    () =>
      filteredEditableSourceFiles.find((file) => file.path === selectedSourcePath) ||
      sourceCatalogFiles.find((file) => file.path === selectedSourcePath) ||
      null,
    [filteredEditableSourceFiles, selectedSourcePath, sourceCatalogFiles]
  );
  const workspaceExplorerRootLabel =
    desktopWorkspace?.activeWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    desktopWorkspace?.fallbackWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    "workspace";
  const openDraftEntries = useMemo(
    () => Object.values(sourceDrafts).sort((left, right) => left.relativePath.localeCompare(right.relativePath)),
    [sourceDrafts]
  );
  const dirtyDraftEntries = useMemo(
    () => openDraftEntries.filter((entry) => entry.content !== entry.baseContent),
    [openDraftEntries]
  );
  const dirtySourcePathSet = useMemo(() => new Set(dirtyDraftEntries.map((entry) => entry.relativePath)), [dirtyDraftEntries]);
  const latestSourceSaveResult = sourceSaveResults[0] ?? null;
  const sourceSaveTotalBytes = useMemo(
    () => sourceSaveResults.reduce((total, report) => total + report.sizeBytes, 0),
    [sourceSaveResults]
  );
  const currentDraftEntry = sourceFile ? sourceDrafts[sourceFile.relativePath] ?? null : null;
  const currentSourceDirty = currentDraftEntry
    ? currentDraftEntry.content !== currentDraftEntry.baseContent
    : sourceFile
      ? sourceDraft !== sourceFile.content
      : false;
  const openInboxDecisions = useMemo(
    () => (inboxReport?.decisions || []).filter((decision) => isOpenDecisionStatus(decision.status)),
    [inboxReport]
  );
  const decisionPrompts = useMemo(
    () => [
      ...reports.flatMap((report) => report.decisionPrompts || []),
      ...sessions.flatMap((session) => session.decisionPrompts || [])
    ],
    [reports, sessions]
  );
  const pendingQuestionCount = useMemo(
    () => sessions.reduce((total, session) => total + (session.pendingDecisionPrompts || 0), 0),
    [sessions]
  );
  const selectedSession = sessions.find((session) => session.sessionId === selectedSessionId) || sessions[0] || null;
  const selectedNativePtySession =
    nativePtySessions.find((session) => session.sessionId === selectedNativePtySessionId) ||
    nativePtySessions[0] ||
    null;
  const selectedDecision = (inboxReport?.decisions || []).find((decision) => decision.id === selectedDecisionId) || openInboxDecisions[0] || null;
  const selectedDecisionSession = selectedDecision?.sessionId
    ? sessions.find((session) => session.sessionId === selectedDecision.sessionId) || null
    : null;
  const canResumeSelectedDecision =
    Boolean(selectedDecisionSession) &&
    selectedDecisionSession !== null &&
    ["running", "defer_message_sent"].includes(selectedDecisionSession.status) &&
    Boolean(selectedDecision?.sessionId);
  const selectedMode = sessionModePresets.find((mode) => mode.id === selectedSessionModeId) || sessionModePresets[0];
  const selectedTaskPipe = taskPipePresets.find((preset) => preset.taskKind === selectedTaskPipeKind) || taskPipePresets[0] || fallbackTaskPipePresets[0];
  const sessionPromptChoices = useMemo<RuntimeTextChoice[]>(() => {
    const modeLabel = (mode: SessionModePreset) => {
      if (uiLanguage !== "ko") {
        return mode.label;
      }
      return (
        {
          research_insight_agent: "검색 에이전트",
          user_task: "사용자 요청",
          platform_improvement: "플랫폼 개선",
          knowledge_accumulation: "지식 축적",
          review_verify: "검토/검증"
        }[mode.id] || mode.label
      );
    };
    const modeDetail = (mode: SessionModePreset) => {
      if (uiLanguage !== "ko") {
        return mode.intent;
      }
      return (
        {
          research_insight_agent: "검색, 출처 순위, 실행 계획을 한 번에 시작",
          user_task: "사용자 요청을 그대로 실행하고 막힌 결정만 보류",
          platform_improvement: "요구사항, 스펙, 검증을 보존하며 플랫폼 개선",
          knowledge_accumulation: "로그와 결정을 재사용 가능한 지식으로 구조화",
          review_verify: "위험, 누락 검증, 근거 부족을 먼저 확인"
        }[mode.id] || mode.intent
      );
    };
    const preferredModes = [
      selectedMode,
      ...sessionModePresets.filter((mode) => ["user_task", "platform_improvement", "review_verify", "knowledge_accumulation"].includes(mode.id))
    ];
    const seen = new Set<string>();
    return preferredModes
      .filter((mode) => {
        if (seen.has(mode.prompt)) {
          return false;
        }
        seen.add(mode.prompt);
        return true;
      })
      .slice(0, 5)
      .map((mode) => ({
        id: `session-prompt-${mode.id}`,
        label: modeLabel(mode),
        detail: modeDetail(mode),
        value: mode.prompt,
        badge: mode.id === selectedMode.id ? (uiLanguage === "ko" ? "현재" : "Current") : undefined
      }));
  }, [selectedMode, uiLanguage]);
  const workingDirOptions = useMemo<RuntimeTextChoice[]>(() => {
    const candidates: RuntimeTextChoice[] = [
      {
        id: "runtime-default",
        label: uiLanguage === "ko" ? "런타임 기본" : "Runtime default",
        detail: uiLanguage === "ko" ? "앱이 현재 작업공간 루트를 자동 사용" : "Use the current workspace root automatically",
        value: ""
      }
    ];
    if (desktopWorkspace?.activeWorkspacePath) {
      candidates.push({
        id: "active-workspace",
        label: uiLanguage === "ko" ? "현재 작업공간" : "Active workspace",
        detail: desktopWorkspace.activeWorkspacePath,
        value: desktopWorkspace.activeWorkspacePath,
        badge: desktopWorkspace.activeWorkspaceSource || undefined
      });
    }
    if (desktopWorkspace?.fallbackWorkspacePath && desktopWorkspace.fallbackWorkspacePath !== desktopWorkspace?.activeWorkspacePath) {
      candidates.push({
        id: "fallback-workspace",
        label: uiLanguage === "ko" ? "저장소 루트" : "Repository root",
        detail: desktopWorkspace.fallbackWorkspacePath,
        value: desktopWorkspace.fallbackWorkspacePath,
        badge: uiLanguage === "ko" ? "대체" : "Fallback"
      });
    }
    if (workspaceImportPath.trim() && !candidates.some((candidate) => candidate.value === workspaceImportPath.trim())) {
      candidates.push({
        id: "typed-import-path",
        label: uiLanguage === "ko" ? "입력한 경로" : "Typed path",
        detail: workspaceImportPath.trim(),
        value: workspaceImportPath.trim(),
        badge: uiLanguage === "ko" ? "후보" : "Candidate"
      });
    }
    return candidates.slice(0, 4);
  }, [
    desktopWorkspace?.activeWorkspacePath,
    desktopWorkspace?.activeWorkspaceSource,
    desktopWorkspace?.fallbackWorkspacePath,
    uiLanguage,
    workspaceImportPath
  ]);
  const taskPipePromptChoices = useMemo<RuntimeTextChoice[]>(() => {
    const selectedPresetPrompt =
      uiLanguage === "ko"
        ? `${selectedTaskPipe.label} 기준으로 작업을 분해하고 ${selectedTaskPipe.laneCount}개 실행 경로를 초기화해줘. ${selectedTaskPipe.mergeGate} 전에는 소스 영향 결정과 질문을 보류하고, 각 경로의 출력과 병합 조건을 기록해줘.`
        : `Break down the task with the ${selectedTaskPipe.label} preset and initialize ${selectedTaskPipe.laneCount} run lanes. Hold source-impacting decisions and questions before ${selectedTaskPipe.mergeGate}, then record lane output and merge conditions.`;
    const choices: RuntimeTextChoice[] = [
      {
        id: "selected-task-pipe",
        label: uiLanguage === "ko" ? "선택 프리셋" : "Selected preset",
        detail: selectedTaskPipe.intent,
        value: selectedPresetPrompt,
        badge: selectedTaskPipe.label
      },
      {
        id: "implementation-pipe",
        label: uiLanguage === "ko" ? "구현 분해" : "Implementation",
        detail: uiLanguage === "ko" ? "구현, 리뷰, 검증 경로를 나누어 시작" : "Split implementation, review, and validation lanes",
        value:
          uiLanguage === "ko"
            ? "사용자 요청을 구현 단위, 리뷰 단위, 검증 단위로 나눠서 각 CLI 실행 경로를 초기화해줘. 소스 변경은 병합 게이트 전까지 보류하고 필요한 결정은 결정함으로 보내줘."
            : "Split the user's request into implementation, review, and validation lanes. Hold source changes before the merge gate and send required decisions to the decision inbox."
      },
      {
        id: "research-pipe",
        label: uiLanguage === "ko" ? "근거 조사" : "Grounded research",
        detail: uiLanguage === "ko" ? "검색, 출처 순위, 회의적 검토를 먼저 실행" : "Run search, source ranking, and skeptic review first",
        value:
          uiLanguage === "ko"
            ? "이 요청을 검색, 출처 순위, 근거 추출, 회의적 검토 경로로 나눠 초기화해줘. 구현 전에 강한 출처와 약한 출처를 분리하고 계획 영향만 기록해줘."
            : "Initialize search, source ranking, evidence extraction, and skeptic review lanes for this request. Separate strong and weak sources before implementation and record only plan-impacting evidence."
      },
      {
        id: "review-pipe",
        label: uiLanguage === "ko" ? "검토/검증" : "Review and verify",
        detail: uiLanguage === "ko" ? "버그, 누락 테스트, 롤백 조건을 먼저 점검" : "Check bugs, missing tests, and rollback conditions first",
        value:
          uiLanguage === "ko"
            ? "현재 변경 또는 계획을 검토/검증 파이프라인으로 초기화해줘. 버그, 누락된 테스트, 리소스 누수, 롤백 조건, 사용자 결정 필요 여부를 우선순위로 기록해줘."
            : "Initialize a review and verification pipeline for the current change or plan. Prioritize bugs, missing tests, resource leaks, rollback conditions, and user-decision needs."
      }
    ];
    const seen = new Set<string>();
    return choices.filter((choice) => {
      if (seen.has(choice.value)) {
        return false;
      }
      seen.add(choice.value);
      return true;
    });
  }, [selectedTaskPipe, uiLanguage]);
  useEffect(() => {
    const mode = sessionModePresets.find((item) => item.id === initDefaults.sessionModeId) || sessionModePresets[0];
    setSelectedSessionAdapterId(initDefaults.adapterId);
    setSelectedSessionModeId(mode.id);
    setSessionPrompt(mode.prompt);
    setSelectedTaskPipeKind(initDefaults.taskPipeKind);
    setAutoDeferQuestions(initDefaults.autoDeferQuestions);
  }, [
    initDefaults.adapterId,
    initDefaults.autoDeferQuestions,
    initDefaults.sessionModeId,
    initDefaults.taskPipeKind
  ]);
  const pipelineStats = useMemo(() => {
    const latest = pipelineReports[0] || null;
    const started = pipelineReports.reduce((total, report) => total + report.startedSessions, 0);
    const missing = pipelineReports.reduce((total, report) => total + report.missingLanes, 0);
    const edges = pipelineReports.reduce((total, report) => total + report.pipes.length, 0);
    return { latest, started, missing, edges };
  }, [pipelineReports]);
  const taskRunStats = useMemo(() => {
    const active = taskRunRecords.filter((record) => isActiveSessionStatus(record.status)).length;
    const outputBytes = taskRunRecords.reduce((total, record) => total + record.stdoutBytes + record.stderrBytes, 0);
    const decisions = taskRunRecords.reduce((total, record) => total + record.decisionInboxItems, 0);
    const truncated = taskRunRecords.filter((record) => record.outputTruncated).length;
    return { active, outputBytes, decisions, truncated };
  }, [taskRunRecords]);
  const runtimeDataStats = useMemo(() => {
    const roots = runtimeDataBoundary?.roots || [];
    const created = roots.filter((root) => root.created).length;
    const ready = roots.filter((root) => root.exists).length;
    const highFindings = (payloadAudit?.findings || []).filter((finding) => finding.severity === "high").length;
    return { roots: roots.length, created, ready, highFindings };
  }, [payloadAudit, runtimeDataBoundary]);
  const accumulatedDataStats = useMemo(() => {
    const stores = accumulatedDataOverview?.stores || [];
    const visibleStores = stores.filter((store) => store.count > 0).length;
    const latestStore =
      stores
        .filter((store) => store.latestUpdatedAt)
        .sort((left, right) => Number(right.latestUpdatedAt) - Number(left.latestUpdatedAt))[0] || null;
    return {
      stores: stores.length,
      visibleStores,
      records: accumulatedDataOverview?.totalRecords || 0,
      bytes: accumulatedDataOverview?.totalBytes || 0,
      latestUpdatedAt: latestStore?.latestUpdatedAt || "",
      boundedScanMaxFiles: accumulatedDataOverview?.boundedScanMaxFiles || 0
    };
  }, [accumulatedDataOverview]);
  const serviceReadinessStats = useMemo(() => {
    const groups = serviceReadiness?.groups || [];
    return {
      groups: groups.length,
      passedGroups: groups.filter((group) => group.status === "passed").length,
      warnings: serviceReadiness?.warnings.length || 0,
      publicBlockers: serviceReadiness?.publicBlockers.length || 0
    };
  }, [serviceReadiness]);
  const selectedTaskRunRecord =
    taskRunRecords.find((record) => record.taskRunId === selectedTaskRunId) || taskRunRecords[0] || null;
  const sessionStats = useMemo(() => {
    const active = sessions.filter((session) => isActiveSessionStatus(session.status)).length;
    const deferred = sessions.filter((session) => session.status === "defer_message_sent").length;
    const autoDeferred = sessions.filter((session) => session.autoDeferTriggered).length;
    const outputBytes = sessions.reduce((total, session) => total + session.stdout.length + session.stderr.length, 0);
    const inboxItems = sessions.reduce((total, session) => total + session.decisionInboxItems, 0);
    return { active, deferred, autoDeferred, outputBytes, inboxItems };
  }, [sessions]);
  const activeSessionPollKey = useMemo(
    () =>
      sessions
        .filter((session) => isActiveSessionStatus(session.status))
        .map((session) => `${session.sessionId}:${session.status}:${session.autoDeferQuestions ? "1" : "0"}`)
        .sort()
        .join("|"),
    [sessions]
  );
  const activeNativePtyPollKey = useMemo(
    () =>
      nativePtySessions
        .filter((session) => isActiveSessionStatus(session.status))
        .map((session) => `${session.sessionId}:${session.status}`)
        .sort()
        .join("|"),
    [nativePtySessions]
  );
  const outputEvents = useMemo(() => {
    const sessionEvents = sessions.flatMap((session) =>
      detectOutputEvents(session.sessionId, session.adapterId, `${session.stdout}\n${session.stderr}`)
    );
    const reportEvents = reports.flatMap((report) =>
      detectOutputEvents(`health-${report.adapterId}`, report.adapterId, `${report.output}\n${report.stderr}`)
    );
    return [...sessionEvents, ...reportEvents].slice(0, 18);
  }, [reports, sessions]);
  const selectedOutputEvents = selectedSession ? outputEvents.filter((event) => event.id.startsWith(selectedSession.sessionId)) : outputEvents;
  const decisionGroups = useMemo(() => {
    if (!runRecordsOpen) {
      return [];
    }
    return groupDecisions(inboxReport?.decisions || []);
  }, [inboxReport, runRecordsOpen]);
  const sourceDiff = useMemo<SourceDiffSummary | null>(() => {
    if (!isFileWorkspaceSurface && !runtimeDiagnosticsOpen && !runRecordsOpen && !terminalDrawerOpen) {
      return null;
    }
    if (!sourceFile) {
      return null;
    }
    return buildSourceDiffSummary(sourceFile.content, sourceDraft);
  }, [isFileWorkspaceSurface, runRecordsOpen, runtimeDiagnosticsOpen, sourceDraft, sourceFile, terminalDrawerOpen]);
  const sourceEditorProfile = useMemo(() => {
    if (!isFileWorkspaceSurface) {
      return sourceEditorProfileForPath("");
    }
    return sourceEditorProfileForPath(sourceFile?.relativePath || selectedSourcePath || sourcePathInput);
  }, [isFileWorkspaceSurface, selectedSourcePath, sourceFile?.relativePath, sourcePathInput]);
  const selectedSourceTemplate = sourceTemplateById[sourceTemplateId];
  const activeMonacoEditorOptions = useMemo<editor.IStandaloneEditorConstructionOptions>(
    () => ({
      ...monacoEditorOptions,
      minimap: { enabled: sourceMinimapEnabled },
      wordWrap: sourceWordWrap ? "on" : "off"
    }),
    [sourceMinimapEnabled, sourceWordWrap]
  );
  const evidenceItems = useMemo(() => {
    if (!runRecordsOpen) {
      return [];
    }
    const items = [
      ...outputEvents.slice(0, 5).map((event) => ({
        id: `event-${event.id}`,
        label: event.type,
        title: event.label,
        detail: `${event.lane} / ${event.detail}`
      })),
      ...(selectedDecision
        ? [
            {
              id: `decision-${selectedDecision.id}`,
              label: selectedDecision.status,
              title: selectedDecision.question,
              detail: selectedDecision.resumeAction || selectedDecision.impact || "decision inbox"
            }
          ]
        : []),
      ...(sourceDiff?.dirty
        ? [
            {
              id: "source-diff",
              label: "source",
              title: sourceFile?.relativePath || "draft change",
              detail: `${sourceDiff.addedLines} added / ${sourceDiff.removedLines} removed / ${sourceDiff.changedLines} changed`
            }
          ]
        : []),
      ...(dirtyDraftEntries.length
        ? [
            {
              id: "source-draft-queue",
              label: "drafts",
              title: "File Edit Queue",
              detail: `${dirtyDraftEntries.length} dirty / ${openDraftEntries.length} open`
            }
          ]
        : []),
      ...(pipelineStats.latest
        ? [
            {
              id: `pipeline-${pipelineStats.latest.pipelineId}`,
              label: pipelineStats.latest.status,
              title: pipelineStats.latest.label,
              detail: `${pipelineStats.latest.startedSessions} lanes / ${pipelineStats.latest.pipes.length} pipe edges / ${pipelineStats.latest.mergeGate}`
            }
          ]
        : []),
      ...(taskRunRecords[0]
        ? [
            {
              id: `task-run-${taskRunRecords[0].taskRunId}`,
              label: taskRunRecords[0].status,
              title: taskRunRecords[0].taskKind,
              detail: `${taskRunRecords[0].adapterId} / ${formatBytes(taskRunRecords[0].stdoutBytes + taskRunRecords[0].stderrBytes)} / ${taskRunRecords[0].recordPath}`
            }
          ]
        : []),
      ...(runtimeDataBoundary
        ? [
            {
              id: "runtime-data-boundary",
              label: runtimeDataBoundary.status,
              title: "Runtime Data Roots",
              detail: `${runtimeDataBoundary.roots.length} roots / task runs ${runtimeDataBoundary.taskRunStorePath}`
            }
          ]
        : []),
      ...(accumulatedDataOverview
        ? [
            {
              id: "accumulated-data-overview",
              label: accumulatedDataOverview.status,
              title: "Accumulated Data",
              detail: `${accumulatedDataOverview.stores.length} stores / ${accumulatedDataOverview.totalRecords} records / ${formatBytes(accumulatedDataOverview.totalBytes)}`
            }
          ]
        : []),
      ...(payloadAudit
        ? [
            {
              id: "installer-payload-audit",
              label: payloadAudit.status,
              title: "Installer Payload Audit",
              detail: `${payloadAudit.flaggedCount} findings / ${payloadAudit.scannedFiles} files`
            }
          ]
        : []),
      ...(supportBundle
        ? [
            {
              id: "support-diagnostic-bundle",
              label: supportBundle.status,
              title: "Support Diagnostic Bundle",
              detail: `${supportBundle.bundleId} / redacted ${supportBundle.redacted ? "yes" : "no"}`
            }
          ]
        : []),
      ...(serviceReadiness
        ? [
            {
              id: "service-readiness",
              label: serviceReadiness.status,
              title: "Service Readiness",
              detail: `${serviceReadiness.score} score / ${serviceReadiness.publicBlockers.length} public blockers / ${serviceReadiness.releaseLane}`
            }
          ]
        : []),
      ...(writeReport
        ? [
            {
              id: "write-report",
              label: "artifact",
              title: writeReport.relativePath,
              detail: `backup ${writeReport.backupPath}`
            }
          ]
        : []),
      ...sourceSaveResults.slice(0, 2).map((report) => ({
        id: `save-${report.relativePath}`,
        label: report.status,
        title: report.relativePath,
        detail: `backup ${report.backupPath}`
      }))
    ];
    return items.slice(0, 8);
  }, [accumulatedDataOverview, dirtyDraftEntries.length, openDraftEntries.length, outputEvents, payloadAudit, pipelineStats.latest, runRecordsOpen, runtimeDataBoundary, selectedDecision, serviceReadiness, sourceDiff, sourceFile?.relativePath, sourceSaveResults, supportBundle, taskRunRecords, writeReport]);

  const replaceTaskRunRecords = (records: CliTaskRunRecordReport[]) => {
    setTaskRunRecords(records);
    setSelectedTaskRunId((current) => {
      if (current && records.some((record) => record.taskRunId === current)) {
        return current;
      }
      return records[0]?.taskRunId || "";
    });
    if (records.length === 0) {
      setTaskRunDetail(null);
    }
  };

  const scheduleWorkspaceWarmupPoll = (delayMs = 900) => {
    if (typeof window === "undefined") {
      return;
    }
    if (workspaceWarmupPollRef.current) {
      window.clearTimeout(workspaceWarmupPollRef.current);
    }
    workspaceWarmupPollRef.current = window.setTimeout(() => {
      workspaceWarmupPollRef.current = null;
      void warmWorkspaceOsResources();
    }, delayMs);
  };

  const refreshDesktopResourceSnapshot = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setDesktopResourceSnapshot(null);
      onDesktopResourceSnapshotChange?.(null);
      return null;
    }

    try {
      const report = await tauriInvoke<DesktopResourceSnapshotReport>("get_desktop_resource_snapshot");
      if (!panelMountedRef.current) {
        return null;
      }
      setDesktopResourceSnapshot(report);
      onDesktopResourceSnapshotChange?.(report);
      return report;
    } catch {
      if (panelMountedRef.current) {
        setDesktopResourceSnapshot(null);
        onDesktopResourceSnapshotChange?.(null);
      }
      return null;
    }
  };

  const warmWorkspaceOsResources = async (options: { forceRefresh?: boolean } = {}) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setWorkspaceWarmupReport(null);
      return null;
    }

    try {
      const report = await warmWorkspaceOsResourcesShared(tauriInvoke, { forceRefresh: Boolean(options.forceRefresh) });
      setWorkspaceWarmupReport(report);
      if (report.status === "warming") {
        scheduleWorkspaceWarmupPoll();
      }
      return report;
    } catch (caught) {
      const message = errorMessage(caught);
      if (/unknown command|command not found|warm_workspace_os_resources/i.test(message)) {
        setWorkspaceWarmupReport(null);
        return null;
      }
      setWorkspaceWarmupReport({
        schemaVersion: "workspace-os-resource-cache.v1",
        status: "failed",
        source: "warm_workspace_os_resources",
        rootPath: "",
        startedAt: "",
        finishedAt: new Date().toISOString(),
        cachedTextFiles: 0,
        cachedBytes: 0,
        memoryBudgetBytes: 0,
        cpuThreads: 0,
        availableParallelism: 0,
        parallelWorkers: 0,
        totalMemoryBytes: 0,
        availableMemoryBytes: 0,
        usedMemoryBytes: 0,
        scanDurationMs: 0,
        entryBuildDurationMs: 0,
        preloadDurationMs: 0,
        preloadStrategy: "",
        systemSupported: false,
        error: message
      });
      return null;
    }
  };

  const prepareWorkspaceOsResources = async (options: { forceRefresh?: boolean } = {}) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setSourceCatalogReport(null);
      setWorkspaceResourceReport(null);
      return null;
    }

    setSourceCatalogBusy(true);
    setWorkspaceResourceBusy(true);
    setError("");
    try {
      const result = await prepareWorkspaceOsResourcesShared(tauriInvoke, {
        filter: sourceFilter,
        forceRefresh: Boolean(options.forceRefresh)
      });
      if (result.prepareReport) {
        const report = result.prepareReport;
        setWorkspaceResourceReport(report);
        setWorkspaceWarmupReport({
          schemaVersion: report.schemaVersion,
          status: report.warmupStatus || "ready",
          source: report.source,
          rootPath: report.rootPath,
          startedAt: report.generatedAt,
          finishedAt: report.generatedAt,
          cachedTextFiles: report.cachedTextFiles,
          cachedBytes: report.cachedBytes,
          memoryBudgetBytes: report.memoryBudgetBytes,
          cpuThreads: report.cpuThreads,
          availableParallelism: report.availableParallelism,
          parallelWorkers: report.parallelWorkers,
          totalMemoryBytes: report.totalMemoryBytes,
          availableMemoryBytes: report.availableMemoryBytes,
          usedMemoryBytes: report.usedMemoryBytes,
          scanDurationMs: report.scanDurationMs,
          entryBuildDurationMs: report.entryBuildDurationMs,
          preloadDurationMs: report.preloadDurationMs,
          preloadStrategy: report.preloadStrategy,
          systemSupported: report.systemSupported,
          error: ""
        });
        setRuntimeSourceFiles(report.catalog.files);
        setSourceCatalogReport(report.catalog);
        void refreshDesktopResourceSnapshot();
        const firstPath = report.catalog.files[0]?.path || "";
        if (!sourcePathInput && firstPath) {
          setSelectedSourcePath(firstPath);
          setSourcePathInput(firstPath);
        }
        return report;
      }
      if (result.fallbackReport) {
        const fallbackReport = result.fallbackReport;
        setWorkspaceResourceReport(null);
        setRuntimeSourceFiles(fallbackReport.files);
        setSourceCatalogReport(fallbackReport);
        const firstPath = fallbackReport.files[0]?.path || "";
        if (!sourcePathInput && firstPath) {
          setSelectedSourcePath(firstPath);
          setSourcePathInput(firstPath);
        }
      }
      return null;
    } catch (caught) {
      setError(errorMessage(caught));
      setWorkspaceResourceReport(null);
      return null;
    } finally {
      setSourceCatalogBusy(false);
      setWorkspaceResourceBusy(false);
    }
  };

  const refreshRuntimeSourceFiles = async () => {
    await prepareWorkspaceOsResources({ forceRefresh: true });
  };

  const refreshDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setDesktopWorkspace(null);
      return;
    }

    setWorkspaceHostBusy("refresh");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("get_desktop_workspace_state");
      setDesktopWorkspace(report);
      if (!workspaceImportPath && report.activeWorkspacePath) {
        setWorkspaceImportPath(report.activeWorkspacePath);
      }
      if (!workingDir.trim() && report.activeWorkspacePath) {
        setWorkingDir(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const refreshDesktopGitStatus = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setDesktopGitStatus(null);
      return;
    }
    setDesktopGitBusy("refresh");
    setError("");
    try {
      const report = await tauriInvoke<DesktopGitStatusReport>("get_desktop_git_status");
      setDesktopGitStatus(report);
      setDesktopGitNotice(report.status);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setDesktopGitBusy("");
    }
  };

  const runDesktopGitAction = async (action: DesktopGitWorkbenchAction, payload?: DesktopGitWorkbenchActionPayload) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }
    setDesktopGitBusy(action);
    setError("");
    try {
      const report = await tauriInvoke<DesktopGitActionReport>("run_desktop_git_action", {
        input: {
          action,
          commitMessage: desktopGitCommitMessage,
          branchName: desktopGitBranchName,
          filePaths: payload?.filePaths || [],
          stashRef: payload?.stashRef || ""
        }
      });
      setDesktopGitStatus(report.git);
      setDesktopGitNotice(`${report.command}: ${report.status}`);
      if (action !== "refresh") {
        void refreshDesktopWorkspace();
      }
    } catch (caught) {
      setDesktopGitNotice(errorMessage(caught));
    } finally {
      setDesktopGitBusy("");
    }
  };

  const chooseDesktopWorkspaceFolder = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }

    setWorkspaceHostBusy("choose");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("choose_desktop_workspace_folder");
      setDesktopWorkspace(report);
      if (report.activeWorkspacePath) {
        setWorkspaceImportPath(report.activeWorkspacePath);
      }
      if (!workingDir.trim() && report.activeWorkspacePath) {
        setWorkingDir(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice(report.status === "folder_selection_canceled" ? copy.chooseCanceled : report.activeWorkspacePath ? copy.permissionGranted : report.status);
      if (report.activeWorkspacePath) {
        void warmWorkspaceOsResources({ forceRefresh: true });
        if (isFileWorkspaceSurface) {
          await prepareWorkspaceOsResources({ forceRefresh: true });
        }
        await refreshDesktopGitStatus();
        void refreshServiceReadiness();
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const importDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }
    if (!workspaceImportPath.trim()) {
      setWorkspaceHostNotice("Workspace path is required");
      return;
    }

    setWorkspaceHostBusy("import");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("set_desktop_workspace_path", {
        path: workspaceImportPath.trim()
      });
      setDesktopWorkspace(report);
      if (!workingDir.trim() && report.activeWorkspacePath) {
        setWorkingDir(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice(report.status);
      void warmWorkspaceOsResources({ forceRefresh: true });
      if (isFileWorkspaceSurface) {
        await prepareWorkspaceOsResources({ forceRefresh: true });
      }
      await refreshDesktopGitStatus();
      void refreshServiceReadiness();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const cloneDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }
    if (!workspaceCloneUrl.trim()) {
      setWorkspaceHostNotice("Repository URL is required");
      return;
    }

    setWorkspaceHostBusy("clone");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("clone_desktop_workspace", {
        repositoryUrl: workspaceCloneUrl.trim(),
        folderName: workspaceCloneFolder.trim() || null
      });
      setDesktopWorkspace(report);
      setWorkspaceImportPath(report.activeWorkspacePath);
      if (!workingDir.trim() && report.activeWorkspacePath) {
        setWorkingDir(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice(report.status);
      void warmWorkspaceOsResources({ forceRefresh: true });
      if (isFileWorkspaceSurface) {
        await prepareWorkspaceOsResources({ forceRefresh: true });
      }
      await refreshDesktopGitStatus();
      void refreshServiceReadiness();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const refreshAccumulatedDataOverview = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setAccumulatedDataOverview(null);
      return;
    }

    setAccumulatedDataBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview");
      setAccumulatedDataOverview(report);
      setAccumulatedDataNotice(
        `${report.status}: ${report.totalRecords} records / ${formatBytes(report.totalBytes)}`
      );
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setAccumulatedDataBusy(false);
    }
  };

  const refreshAdapters = async () => {
    setError("");
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setDesktopWorkspace(null);
      return;
    }

    try {
      const [
        nextHealth,
        nextAdapters,
        nextSessions,
        nextNativePtySessions,
        nextInbox,
        nextTaskPipePresets,
        nextTaskRunRecords,
        nextRuntimeDataBoundary,
        nextAccumulatedDataOverview,
        nextServiceReadiness,
        nextDesktopWorkspace,
        nextDesktopResourceSnapshot
      ] = await Promise.all([
        tauriInvoke<DesktopHealthStatus>("app_health"),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<RuntimeNativePtySession[]>("list_native_pty_terminal_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskPipelinePresetReport[]>("list_cli_task_pipeline_presets"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records"),
        tauriInvoke<RuntimeDataBoundaryReport>("list_runtime_data_roots"),
        tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview"),
        tauriInvoke<ServiceReadinessReport>("get_service_readiness_report"),
        tauriInvoke<DesktopWorkspaceStateReport>("get_desktop_workspace_state"),
        tauriInvoke<DesktopResourceSnapshotReport>("get_desktop_resource_snapshot")
      ]);
      if (!panelMountedRef.current) {
        return;
      }
      setRuntimeState("available");
      setHealth(nextHealth);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setNativePtySessions((current) => mergeNativePtyReports(current, nextNativePtySessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      setTaskPipePresets(nextTaskPipePresets.length ? nextTaskPipePresets : fallbackTaskPipePresets);
      replaceTaskRunRecords(nextTaskRunRecords);
      setRuntimeDataBoundary(nextRuntimeDataBoundary);
      setAccumulatedDataOverview(nextAccumulatedDataOverview);
      setAccumulatedDataNotice("");
      setServiceReadiness(nextServiceReadiness);
      setServiceReadinessNotice("");
      setDesktopWorkspace(nextDesktopWorkspace);
      setDesktopResourceSnapshot(nextDesktopResourceSnapshot);
      onDesktopResourceSnapshotChange?.(nextDesktopResourceSnapshot);
      setWorkspaceImportPath(nextDesktopWorkspace.activeWorkspacePath);
      setWorkspaceHostNotice("");
      setDecisionResumeNotice("");
      if (!selectedDecisionId && nextInbox.decisions[0]) {
        setSelectedDecisionId(nextInbox.decisions[0].id);
      }
      if (!nextAdapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId) && nextAdapters[0]) {
        setSelectedSessionAdapterId(nextAdapters[0].adapterId);
      }
      if (!nextTaskPipePresets.some((preset) => preset.taskKind === selectedTaskPipeKind) && nextTaskPipePresets[0]) {
        setSelectedTaskPipeKind(nextTaskPipePresets[0].taskKind);
      }
      void warmWorkspaceOsResources();
      if (isFileWorkspaceSurface) {
        void prepareWorkspaceOsResources();
      }
    } catch (caught) {
      if (!panelMountedRef.current) {
        return;
      }
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setSessions((current) => (current.length ? [] : current));
      setNativePtySessions((current) => (current.length ? [] : current));
      setTaskPipePresets(fallbackTaskPipePresets);
      replaceTaskRunRecords([]);
      setRuntimeDataBoundary(null);
      setAccumulatedDataOverview(null);
      setAccumulatedDataNotice("");
      setPayloadAudit(null);
      setSupportBundle(null);
      setServiceReadiness(null);
      setServiceReadinessNotice("");
      setDesktopWorkspace(null);
      setDesktopResourceSnapshot(null);
      onDesktopResourceSnapshotChange?.(null);
      setWorkspaceHostNotice("");
      setInboxReport(null);
      setDecisionResumeNotice("");
      setError(errorMessage(caught));
    }
  };

  const runAllHealthChecks = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId("all");
    setError("");
    try {
      const nextReports = await tauriInvoke<CliRunReport[]>("run_all_cli_adapter_health");
      setReports(nextReports);
      const [nextAdapters, nextSessions, nextInbox, nextTaskRunRecords, nextAccumulatedDataOverview] = await Promise.all([
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records"),
        tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview")
      ]);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      replaceTaskRunRecords(nextTaskRunRecords);
      setAccumulatedDataOverview(nextAccumulatedDataOverview);
      setDecisionResumeNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const runSingleHealthCheck = async (adapterId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId(adapterId);
    setError("");
    try {
      const report = await tauriInvoke<CliRunReport>("run_cli_adapter_health", { adapterId });
      setReports((current) => [report, ...current.filter((item) => item.adapterId !== report.adapterId)]);
      const nextAdapters = await tauriInvoke<CliAdapterStatus[]>("list_cli_adapters");
      setAdapters(nextAdapters);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const upsertSession = (report: CliSessionReport) => {
    setSessions((current) => mergeSessionReports(current, [report], { promote: true }));
    setSelectedSessionId(report.sessionId);
  };

  const upsertNativePtySession = (report: RuntimeNativePtySession) => {
    setNativePtySessions((current) => mergeNativePtyReports(current, [report], { promote: true }));
    setSelectedNativePtySessionId(report.sessionId);
  };

  const refreshDecisionInbox = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setInboxReport(null);
      return;
    }

    try {
      const report = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
      setInboxReport(report);
      void refreshAccumulatedDataOverview();
      setDecisionResumeNotice("");
      if (!selectedDecisionId && report.decisions[0]) {
        setSelectedDecisionId(report.decisions[0].id);
      }
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const refreshTaskRunRecords = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      replaceTaskRunRecords([]);
      return;
    }

    try {
      const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
      replaceTaskRunRecords(records);
      void refreshAccumulatedDataOverview();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const loadTaskRunDetail = async (taskRunId?: string) => {
    const tauriInvoke = getTauriInvoke();
    const targetTaskRunId = taskRunId || selectedTaskRunRecord?.taskRunId || "";
    if (!tauriInvoke || !targetTaskRunId) {
      return;
    }

    setTaskRunBusy(true);
    setError("");
    try {
      const detail = await tauriInvoke<CliTaskRunDetailReport>("read_cli_task_run_record", {
        taskRunId: targetTaskRunId
      });
      setSelectedTaskRunId(detail.record.taskRunId);
      setTaskRunDetail(detail);
      setTaskRunPruneNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setTaskRunBusy(false);
    }
  };

  const pruneTaskRunRecords = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setTaskRunBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<CliTaskRunPruneReport>("prune_cli_task_run_records", {
        keepCount: 30
      });
      setTaskRunPruneNotice(
        `${report.status}: removed ${report.removedCount}, kept ${report.afterCount}/${report.beforeCount}`
      );
      const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
      replaceTaskRunRecords(records);
      void refreshAccumulatedDataOverview();
      if (taskRunDetail && !records.some((record) => record.taskRunId === taskRunDetail.record.taskRunId)) {
        setTaskRunDetail(null);
      }
      if (report.errors.length) {
        setError(report.errors.join("\n"));
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setTaskRunBusy(false);
    }
  };

  const runtimeRunTimelineItems = useMemo<RuntimeRunTimelineItem[]>(() => {
    if (!runRecordsOpen) {
      return [];
    }

    const items: RuntimeRunTimelineItem[] = [];
    const laneLabel = (laneId?: string | null, pipelineId?: string | null) =>
      laneId || pipelineId || (uiLanguage === "ko" ? "단일 실행 경로" : "single lane");
    const statusTone = (status: string, fallback: RuntimeRunTimelineItem["tone"] = "blue") => {
      const normalized = status.toLowerCase();
      if (isActiveSessionStatus(normalized)) {
        return "green";
      }
      if (/defer|pending|open|question|waiting|resum/.test(normalized)) {
        return "amber";
      }
      if (/fail|error|cancel|panic|blocked/.test(normalized)) {
        return "red";
      }
      if (/pass|success|complete|ready|answered/.test(normalized)) {
        return "blue";
      }
      return fallback;
    };

    for (const decision of openInboxDecisions.slice(0, 5)) {
      items.push({
        id: `decision-${decision.id}`,
        title: decision.question,
        detail: decision.resumeAction || decision.impact || (uiLanguage === "ko" ? "재개 조건 확인 필요" : "Resume condition needs review"),
        meta: `${decision.priority} / ${formatTimeLabel(decision.createdAt)}`,
        status: decision.status,
        tone: "amber",
        icon: Inbox,
        priority: 0,
        timeMs: parseTimeMs(decision.createdAt),
        actionLabel: uiLanguage === "ko" ? "결정 선택" : "Select decision",
        onAction: () => setSelectedDecisionId(decision.id)
      });
    }

    for (const session of sessions.filter((item) => isActiveSessionStatus(item.status)).slice(0, 4)) {
      items.push({
        id: `session-${session.sessionId}`,
        title: session.taskKind,
        detail: `${session.label} / ${laneLabel(session.laneId, session.pipelineId)} / ${session.adapterId}`,
        meta: `${formatDuration(session.elapsedMs)} / ${formatBytes(session.stdout.length + session.stderr.length)}`,
        status: session.status,
        tone: statusTone(session.status, "green"),
        icon: SquareTerminal,
        priority: 1,
        timeMs: 0,
        actionLabel: uiLanguage === "ko" ? "터미널 열기" : "Open terminal",
        onAction: () => {
          setSelectedSessionId(session.sessionId);
          setTerminalDrawerOpen(true);
        }
      });
    }

    for (const record of taskRunRecords.slice(0, 6)) {
      const outputBytes = record.stdoutBytes + record.stderrBytes;
      const decisionCount = record.decisionInboxItems + record.pendingDecisionPrompts + record.deferredPromptCount;
      items.push({
        id: `task-run-${record.recordId}`,
        title: record.taskKind,
        detail: `${record.label} / ${record.adapterId} / ${laneLabel(record.laneId, record.pipelineId)}`,
        meta: `${formatTimeLabel(record.updatedAt || record.startedAt)} / ${formatDuration(record.elapsedMs)} / ${formatBytes(outputBytes)}${
          decisionCount ? ` / ${decisionCount} ${uiLanguage === "ko" ? "결정" : "decisions"}` : ""
        }`,
        status: record.status,
        tone: decisionCount ? "amber" : statusTone(record.status, record.outputTruncated ? "slate" : "blue"),
        icon: FileSearch,
        priority: decisionCount ? 2 : 3,
        timeMs: parseTimeMs(record.updatedAt || record.startedAt),
        actionLabel: uiLanguage === "ko" ? "로그 열기" : "Open logs",
        onAction: () => {
          setSelectedTaskRunId(record.taskRunId);
          void loadTaskRunDetail(record.taskRunId);
        }
      });
    }

    if (pipelineStats.latest) {
      items.push({
        id: `pipeline-${pipelineStats.latest.pipelineId}`,
        title: pipelineStats.latest.label,
        detail: `${pipelineStats.latest.startedSessions} ${uiLanguage === "ko" ? "개 실행 경로" : "lanes"} / ${pipelineStats.latest.pipes.length} pipe edges / ${pipelineStats.latest.mergeGate}`,
        meta: pipelineStats.latest.workingDir || (uiLanguage === "ko" ? "작업공간 경로 없음" : "No workspace path"),
        status: pipelineStats.latest.status,
        tone: statusTone(pipelineStats.latest.status, "violet"),
        icon: GitBranch,
        priority: 4,
        timeMs: 0
      });
    }

    for (const event of outputEvents.slice(0, 4)) {
      const tone =
        event.type === "error"
          ? "red"
          : event.type === "warning" || event.type === "question"
            ? "amber"
            : event.type === "test"
              ? "green"
              : "slate";
      items.push({
        id: `event-${event.id}`,
        title: event.label,
        detail: event.detail,
        meta: event.lane,
        status: event.type,
        tone,
        icon: event.type === "error" || event.type === "warning" ? AlertTriangle : Activity,
        priority: event.type === "error" || event.type === "question" ? 2 : 5,
        timeMs: 0,
        actionLabel: uiLanguage === "ko" ? "터미널 보기" : "View terminal",
        onAction: () => setTerminalDrawerOpen(true)
      });
    }

    return items
      .sort((left, right) => left.priority - right.priority || right.timeMs - left.timeMs || left.title.localeCompare(right.title))
      .slice(0, 12);
  }, [
    loadTaskRunDetail,
    openInboxDecisions,
    outputEvents,
    pipelineStats.latest,
    runRecordsOpen,
    sessions,
    setTerminalDrawerOpen,
    taskRunRecords,
    uiLanguage
  ]);

  const refreshRuntimeDataBoundary = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeDataBoundary(null);
      return;
    }

    setRuntimeDataBusy("roots");
    setError("");
    try {
      const report = await tauriInvoke<RuntimeDataBoundaryReport>("list_runtime_data_roots");
      setRuntimeDataBoundary(report);
      setRuntimeDataNotice(`${report.status}: ${report.roots.length} runtime roots ready`);
      void refreshAccumulatedDataOverview();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const runInstallerPayloadAudit = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setRuntimeDataBusy("payload");
    setError("");
    try {
      const report = await tauriInvoke<InstallerPayloadAuditReport>("run_installer_payload_audit");
      setPayloadAudit(report);
      setRuntimeDataNotice(`${report.status}: ${report.flaggedCount} findings / ${report.scannedFiles} scanned files`);
      void refreshAccumulatedDataOverview();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const createSupportDiagnosticBundle = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setRuntimeDataBusy("support");
    setError("");
    try {
      const report = await tauriInvoke<SupportDiagnosticBundleReport>("create_support_diagnostic_bundle");
      setSupportBundle(report);
      setRuntimeDataNotice(`${report.status}: ${report.bundleId}`);
      void refreshAccumulatedDataOverview();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const refreshServiceReadiness = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setServiceReadiness(null);
      return;
    }

    setServiceReadinessBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<ServiceReadinessReport>("get_service_readiness_report");
      setServiceReadiness(report);
      setServiceReadinessNotice(
        `${report.status}: score ${report.score}, public blockers ${report.publicBlockers.length}`
      );
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setServiceReadinessBusy(false);
    }
  };

  const answerDecision = async (resumeSession = false) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !selectedDecision) {
      return;
    }
    if (!decisionAnswer.trim()) {
      setError("Decision answer is required.");
      return;
    }

    setDecisionBusy(true);
    setError("");
    setDecisionResumeNotice("");
    try {
      const report = resumeSession
        ? await tauriInvoke<DecisionResumeReport>("answer_and_resume_human_decision", {
            decisionId: selectedDecision.id,
            answerType: decisionAnswerType,
            answerText: decisionAnswer
          })
        : await tauriInvoke<HumanDecisionInboxReport>("answer_human_decision", {
            decisionId: selectedDecision.id,
            answerType: decisionAnswerType,
            answerText: decisionAnswer
          });
      const nextInbox = resumeSession ? (report as DecisionResumeReport).inbox : (report as HumanDecisionInboxReport);
      const resumedSession = resumeSession ? (report as DecisionResumeReport).session : null;
      if (resumedSession) {
        upsertSession(resumedSession);
        await refreshTaskRunRecords();
      }
      if (resumeSession) {
        const resumeReport = report as DecisionResumeReport;
        setDecisionResumeNotice(`${resumeReport.resumeStatus}: ${resumeReport.resumeDetail}`);
      }
      setInboxReport(nextInbox);
      setDecisionAnswer("");
      const nextOpen = nextInbox.decisions.find((decision) => isOpenDecisionStatus(decision.status));
      setSelectedDecisionId(nextOpen?.id || nextInbox.updatedId || nextInbox.decisions[0]?.id || "");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setDecisionBusy(false);
    }
  };

  const startSession = async () => {
    setTerminalDrawerOpen(true);
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId("session");
    setError("");
    const args: Record<string, unknown> = {
      adapterId: selectedSessionAdapterId,
      prompt: sessionPrompt,
      autoDeferQuestions
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", args);
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const startSessionFromLaunchRequest = async (request: RuntimeLaunchRequest) => {
    setTerminalDrawerOpen(request.openTerminal);
    setSelectedSessionModeId(request.modeId);
    setSessionPrompt(request.prompt);
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    const availableRequestedAdapter = adapters.find((adapter) => adapter.adapterId === request.adapterId && adapter.available);
    const adapterId = availableRequestedAdapter?.adapterId || adapters.find((adapter) => adapter.available)?.adapterId || request.adapterId;
    setSelectedSessionAdapterId(adapterId);
    setRunningAdapterId(request.taskKind);
    setError("");
    const args: Record<string, unknown> = {
      adapterId,
      prompt: request.prompt,
      autoDeferQuestions,
      taskKind: request.taskKind
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", args);
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  useEffect(() => {
    if (!surfaceActive || !launchRequest || consumedLaunchRequestIdsRef.current.has(launchRequest.id)) {
      return;
    }
    consumedLaunchRequestIdsRef.current.add(launchRequest.id);
    setSelectedSessionModeId(launchRequest.modeId);
    setSelectedSessionAdapterId(launchRequest.adapterId);
    setSessionPrompt(launchRequest.prompt);
    setTerminalDrawerOpen(launchRequest.openTerminal);
    if (launchRequest.autoStart) {
      void startSessionFromLaunchRequest(launchRequest);
    }
    onLaunchRequestConsumed?.(launchRequest.id);
  }, [launchRequest?.id, surfaceActive]);

  const startDefaultSearchAgent = async () => {
    await startSessionFromLaunchRequest({
      id: `research-insight-agent-runtime-${Date.now()}`,
      label: uiLanguage === "ko" ? "검색 에이전트" : "Search Agent",
      adapterId: selectedSessionAdapterId || initDefaults.adapterId,
      modeId: "research_insight_agent",
      taskKind: "research_insight_agent",
      prompt: renderSearchAgentPrompt(defaultSearchAgentRunForm, uiLanguage),
      openTerminal: true,
      autoStart: true
    });
  };

  const initTaskPipe = async () => {
    setTerminalDrawerOpen(true);
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }
    if (!taskPipePrompt.trim()) {
      setError("Task pipe prompt is required.");
      return;
    }

    setRunningAdapterId("task-pipe");
    setError("");
    const args: Record<string, unknown> = {
      taskKind: selectedTaskPipe.taskKind,
      prompt: taskPipePrompt,
      autoDeferQuestions
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliTaskPipelineInitReport>("start_cli_task_pipeline", args);
      setPipelineReports((current) => [report, ...current].slice(0, 8));
      const laneSessions = report.lanes
        .map((lane) => lane.session)
        .filter((session): session is CliSessionReport => Boolean(session));
      if (laneSessions.length) {
        setSessions((current) => mergeSessionReports(current, laneSessions, { promote: true }));
        setSelectedSessionId(laneSessions[0].sessionId);
      }
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const pollSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("poll_cli_adapter_session", { sessionId });
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const writeSessionInput = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !sessionInput.trim()) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("write_cli_adapter_stdin", {
        sessionId,
        input: sessionInput
      });
      upsertSession(report);
      setSessionInput("");
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const deferSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("send_cli_adapter_defer_message", { sessionId });
      upsertSession(report);
      await refreshDecisionInbox();
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const deferDetectedQuestions = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setDecisionBusy(true);
    setError("");
    try {
      const reports = await tauriInvoke<CliSessionReport[]>("defer_all_cli_adapter_questions");
      setSessions((current) => mergeSessionReports(current, reports, { replaceAll: true }));
      const inbox = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
      setInboxReport(inbox);
      await refreshTaskRunRecords();
      const nextOpen = inbox.decisions.find((decision) => isOpenDecisionStatus(decision.status));
      setSelectedDecisionId(nextOpen?.id || inbox.decisions[0]?.id || "");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setDecisionBusy(false);
    }
  };

  const cancelSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("cancel_cli_adapter_session", { sessionId });
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const startNativePtySession = async (size: { rows: number; cols: number }) => {
    setTerminalDrawerOpen(true);
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setError("");
    try {
      const args: Record<string, unknown> = {
        rows: Math.max(8, Math.min(80, Math.round(size.rows || 28))),
        cols: Math.max(24, Math.min(240, Math.round(size.cols || 100)))
      };
      if (workingDir.trim()) {
        args.workingDir = workingDir.trim();
      }
      const report = await tauriInvoke<RuntimeNativePtySession>("start_native_pty_terminal", args);
      upsertNativePtySession(report);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const pollNativePtySession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<RuntimeNativePtySession>("poll_native_pty_terminal_session", { sessionId });
      upsertNativePtySession(report);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const writeNativePtyInput = async (sessionId: string, input: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !input) {
      return;
    }

    try {
      const report = await tauriInvoke<RuntimeNativePtySession>("write_native_pty_terminal_input", {
        sessionId,
        input
      });
      upsertNativePtySession(report);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const resizeNativePtySession = async (sessionId: string, size: { rows: number; cols: number }) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<RuntimeNativePtySession>("resize_native_pty_terminal", {
        sessionId,
        rows: Math.max(8, Math.min(80, Math.round(size.rows || 28))),
        cols: Math.max(24, Math.min(240, Math.round(size.cols || 100)))
      });
      upsertNativePtySession(report);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const cancelNativePtySession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<RuntimeNativePtySession>("cancel_native_pty_terminal", { sessionId });
      upsertNativePtySession(report);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const loadSourceFileByPath = async (relativePath: string) => {
    const tauriInvoke = getTauriInvoke();
    const targetPath = relativePath.trim();
    if (!tauriInvoke) {
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }
    if (!targetPath) {
      setError("Workspace-relative source path is required.");
      return;
    }

    setEditorBusy(true);
    setError("");
    setWriteReport(null);
    clearSourceDraftSyncTimer();
    try {
      const nextFile = await tauriInvoke<WorkspaceTextFile>("read_workspace_text_file", {
        relativePath: targetPath
      });
      const nextEntry: SourceDraftEntry = {
        relativePath: nextFile.relativePath,
        baseContent: nextFile.content,
        content: nextFile.content,
        sizeBytes: nextFile.sizeBytes,
        maxSizeBytes: nextFile.maxSizeBytes,
        loadedAt: new Date().toISOString()
      };
      setSourceFile(nextFile);
      activeSourcePathRef.current = nextFile.relativePath;
      sourceDraftRef.current = nextFile.content;
      setSourceDraft(nextFile.content);
      setSelectedSourcePath(nextFile.relativePath);
      setSourcePathInput(nextFile.relativePath);
      setSourceCopyNotice("");
      setSourceDrafts((current) => ({ ...current, [nextFile.relativePath]: nextEntry }));
      setSourceWorkbenchView("editor");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
  };

  const loadSourceFile = async () => {
    await loadSourceFileByPath(sourcePathInput || selectedSourcePath);
  };

  const selectDraftEntry = (relativePath: string) => {
    const entry = sourceDrafts[relativePath];
    if (!entry) {
      return;
    }
    clearSourceDraftSyncTimer();
    setSelectedSourcePath(entry.relativePath);
    setSourcePathInput(entry.relativePath);
    setSourceFile({
      relativePath: entry.relativePath,
      content: entry.baseContent,
      sizeBytes: entry.sizeBytes,
      maxSizeBytes: entry.maxSizeBytes
    });
    activeSourcePathRef.current = entry.relativePath;
    sourceDraftRef.current = entry.content;
    setSourceDraft(entry.content);
    setSourceCopyNotice("");
    setSourceWorkbenchView("editor");
    setWriteReport(
      entry.lastSavedBackupPath
        ? {
            relativePath: entry.relativePath,
            sizeBytes: entry.sizeBytes,
            backupPath: entry.lastSavedBackupPath,
            status: entry.status || "saved"
          }
        : null
    );
  };

  const openDraftOrLoad = async (relativePath: string) => {
    if (sourceDrafts[relativePath]) {
      selectDraftEntry(relativePath);
      return;
    }
    await loadSourceFileByPath(relativePath);
  };

  const clearSourceDraftSyncTimer = () => {
    if (sourceDraftSyncTimerRef.current && typeof window !== "undefined") {
      window.clearTimeout(sourceDraftSyncTimerRef.current);
    }
    sourceDraftSyncTimerRef.current = null;
  };

  const commitSourceDraftState = (nextContent: string, draftFile: WorkspaceTextFile | null, syncVisibleDraft = true) => {
    if (syncVisibleDraft && (!draftFile || activeSourcePathRef.current === draftFile.relativePath)) {
      setSourceDraft(nextContent);
    }
    if (!draftFile) {
      return;
    }
    setSourceDrafts((current) => {
      const existing = current[draftFile.relativePath] || {
        relativePath: draftFile.relativePath,
        baseContent: draftFile.content,
        content: draftFile.content,
        sizeBytes: draftFile.sizeBytes,
        maxSizeBytes: draftFile.maxSizeBytes,
        loadedAt: new Date().toISOString()
      };
      return {
        ...current,
        [draftFile.relativePath]: {
          ...existing,
          content: nextContent
        }
      };
    });
  };

  const updateSourceDraft = (nextContent: string, options: { immediate?: boolean } = {}) => {
    const draftFile = sourceFile;
    const immediate = options.immediate ?? true;
    sourceDraftRef.current = nextContent;
    setSourceCopyNotice("");
    if (!draftFile) {
      return;
    }
    if (immediate || typeof window === "undefined") {
      clearSourceDraftSyncTimer();
      commitSourceDraftState(nextContent, draftFile);
      return;
    }
    if (sourceDraftSyncTimerRef.current) {
      return;
    }
    sourceDraftSyncTimerRef.current = window.setTimeout(() => {
      sourceDraftSyncTimerRef.current = null;
      commitSourceDraftState(sourceDraftRef.current, draftFile);
    }, SOURCE_DRAFT_UI_SYNC_MS);
  };

  const currentEditorDraftContent = () => sourceEditorRef.current?.getValue() ?? (sourceDraftRef.current || sourceDraft);

  const effectiveSourceDrafts = () => {
    if (!sourceFile) {
      return sourceDrafts;
    }
    const latestContent = currentEditorDraftContent();
    const existing = sourceDrafts[sourceFile.relativePath] || {
      relativePath: sourceFile.relativePath,
      baseContent: sourceFile.content,
      content: sourceFile.content,
      sizeBytes: sourceFile.sizeBytes,
      maxSizeBytes: sourceFile.maxSizeBytes,
      loadedAt: new Date().toISOString()
    };
    return {
      ...sourceDrafts,
      [sourceFile.relativePath]: {
        ...existing,
        content: latestContent
      }
    };
  };

  const handleSourceEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    sourceEditorRef.current = editorInstance;
  };

  const runSourceEditorCommand = async (command: "undo" | "redo" | "find" | "replace" | "format" | "foldAll" | "unfoldAll") => {
    const editorInstance = sourceEditorRef.current;
    if (!sourceFile || !editorInstance) {
      setSourceCopyNotice("Open a source file before running editor commands");
      return;
    }

    if (command === "undo" || command === "redo") {
      editorInstance.trigger("platform-source-toolbar", command, null);
      updateSourceDraft(editorInstance.getValue(), { immediate: true });
      editorInstance.focus();
      return;
    }

    const actionId =
      command === "find"
        ? "actions.find"
        : command === "replace"
          ? "editor.action.startFindReplaceAction"
          : command === "foldAll"
            ? "editor.foldAll"
            : command === "unfoldAll"
              ? "editor.unfoldAll"
              : "editor.action.formatDocument";
    const action = editorInstance.getAction(actionId);
    if (!action) {
      setSourceCopyNotice(`${command} is unavailable for this file`);
      editorInstance.focus();
      return;
    }
    await action.run();
    if (command === "format") {
      updateSourceDraft(editorInstance.getValue(), { immediate: true });
    }
    editorInstance.focus();
  };

  const insertSourceTemplate = () => {
    if (!sourceFile) {
      return;
    }

    const templateBody = renderSourceTemplate(selectedSourceTemplate, sourceFile.relativePath);
    const editorInstance = sourceEditorRef.current;
    const selection = editorInstance?.getSelection() || null;
    if (editorInstance && selection) {
      editorInstance.executeEdits("platform-source-template", [
        {
          range: selection,
          text: templateBody,
          forceMoveMarkers: true
        }
      ]);
      updateSourceDraft(editorInstance.getValue(), { immediate: true });
      editorInstance.focus();
      setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
      return;
    }

    updateSourceDraft(appendSourceTemplate(currentEditorDraftContent(), templateBody), { immediate: true });
    setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
  };

  const copySourcePatchContext = async () => {
    if (!sourceFile) {
      return;
    }

    const diffLine = sourceDiff
      ? `+${sourceDiff.addedLines} / -${sourceDiff.removedLines} / ${sourceDiff.changedLines} changed`
      : "not computed";
    const context = [
      "Platform Source Patch Context",
      `Path: ${sourceFile.relativePath}`,
      `Profile: ${sourceEditorProfile.label}`,
      `Template: ${selectedSourceTemplate.label}`,
      `Dirty: ${currentSourceDirty ? "yes" : "no"}`,
      `Diff: ${diffLine}`,
      "Gate: workspace-scoped backup on save",
      "",
      "--- draft ---",
      currentEditorDraftContent()
    ].join("\n");
    const copied = await writeClipboardText(context);
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} patch context copied` : "Clipboard unavailable");
  };

  const saveSourceFile = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !sourceFile) {
      return;
    }

    setEditorBusy(true);
    setError("");
    try {
      const latestContent = currentEditorDraftContent();
      clearSourceDraftSyncTimer();
      const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
        relativePath: sourceFile.relativePath,
        content: latestContent
      });
      setWriteReport(report);
      setSourceFile({ ...sourceFile, content: latestContent, sizeBytes: report.sizeBytes });
      sourceDraftRef.current = latestContent;
      setSourceDraft(latestContent);
      setSourceDrafts((current) => {
        const existing = current[sourceFile.relativePath] || {
          relativePath: sourceFile.relativePath,
          baseContent: sourceFile.content,
          content: latestContent,
          sizeBytes: report.sizeBytes,
          maxSizeBytes: sourceFile.maxSizeBytes,
          loadedAt: new Date().toISOString()
        };
        return {
          ...current,
          [sourceFile.relativePath]: {
            ...existing,
            baseContent: latestContent,
            content: latestContent,
            sizeBytes: report.sizeBytes,
            lastSavedBackupPath: report.backupPath,
            status: report.status
          }
        };
      });
      setSourceSaveResults((current) => [
        report,
        ...current.filter((item) => item.relativePath !== report.relativePath)
      ].slice(0, 8));
      setSourceCopyNotice("");
      setSourceWorkbenchView("results");
      void warmWorkspaceOsResources({ forceRefresh: true });
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
  };

  const saveAllSourceDrafts = async () => {
    const tauriInvoke = getTauriInvoke();
    const draftSnapshot = effectiveSourceDrafts();
    const dirtyEntries = Object.values(draftSnapshot)
      .filter((entry) => entry.content !== entry.baseContent)
      .sort((left, right) => left.relativePath.localeCompare(right.relativePath));
    if (!tauriInvoke || dirtyEntries.length === 0) {
      return;
    }

    setSaveAllBusy(true);
    setError("");
    try {
      clearSourceDraftSyncTimer();
      const reportsToAdd: WorkspaceWriteReport[] = [];
      const nextDrafts: Record<string, SourceDraftEntry> = { ...draftSnapshot };
      for (const entry of dirtyEntries) {
        const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
          relativePath: entry.relativePath,
          content: entry.content
        });
        reportsToAdd.push(report);
        nextDrafts[entry.relativePath] = {
          ...entry,
          baseContent: entry.content,
          content: entry.content,
          sizeBytes: report.sizeBytes,
          lastSavedBackupPath: report.backupPath,
          status: report.status
        };
      }
      setSourceDrafts(nextDrafts);
      setSourceSaveResults((current) => [
        ...reportsToAdd,
        ...current.filter((item) => !reportsToAdd.some((report) => report.relativePath === item.relativePath))
      ].slice(0, 8));
      void warmWorkspaceOsResources({ forceRefresh: true });
      if (sourceFile && nextDrafts[sourceFile.relativePath]) {
        const currentEntry = nextDrafts[sourceFile.relativePath];
        setSourceFile({
          relativePath: currentEntry.relativePath,
          content: currentEntry.baseContent,
          sizeBytes: currentEntry.sizeBytes,
          maxSizeBytes: currentEntry.maxSizeBytes
        });
        sourceDraftRef.current = currentEntry.content;
        setSourceDraft(currentEntry.content);
        setSourceCopyNotice("");
      }
      if (reportsToAdd[0]) {
        setWriteReport(reportsToAdd[0]);
        setSourceWorkbenchView("results");
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSaveAllBusy(false);
    }
  };

  const revertCurrentDraft = () => {
    if (!sourceFile || !currentDraftEntry) {
      return;
    }
    clearSourceDraftSyncTimer();
    sourceDraftRef.current = currentDraftEntry.baseContent;
    setSourceDraft(currentDraftEntry.baseContent);
    setSourceDrafts((current) => ({
      ...current,
      [sourceFile.relativePath]: {
        ...currentDraftEntry,
        content: currentDraftEntry.baseContent
      }
    }));
    setWriteReport(null);
  };

  const closeDraftByPath = (relativePath: string) => {
    const currentPath = relativePath.trim();
    if (!currentPath) {
      return;
    }
    clearSourceDraftSyncTimer();
    const closingActiveDraft = sourceFile?.relativePath === currentPath;
    const nextEntry = openDraftEntries.find((entry) => entry.relativePath !== currentPath) || null;
    setSourceDrafts((current) => {
      const next = { ...current };
      delete next[currentPath];
      return next;
    });
    if (!closingActiveDraft) {
      return;
    }
    if (nextEntry) {
      setSelectedSourcePath(nextEntry.relativePath);
      setSourcePathInput(nextEntry.relativePath);
      setSourceFile({
        relativePath: nextEntry.relativePath,
        content: nextEntry.baseContent,
        sizeBytes: nextEntry.sizeBytes,
        maxSizeBytes: nextEntry.maxSizeBytes
      });
      activeSourcePathRef.current = nextEntry.relativePath;
      sourceDraftRef.current = nextEntry.content;
      setSourceDraft(nextEntry.content);
    } else {
      setSourceFile(null);
      activeSourcePathRef.current = "";
      sourceDraftRef.current = "";
      setSourceDraft("");
      setSourceCopyNotice("");
      setWriteReport(null);
      setSourceWorkbenchView("files");
    }
  };

  const closeCurrentDraft = () => {
    if (!sourceFile) {
      return;
    }
    closeDraftByPath(sourceFile.relativePath);
  };

  const copyCurrentSourceDraft = async () => {
    if (!sourceFile) {
      return;
    }
    const copied = await writeClipboardText(currentEditorDraftContent());
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} copied` : "Clipboard unavailable");
  };

  useEffect(() => {
    setSourceTemplateId(sourceEditorProfile.templateId);
  }, [sourceEditorProfile.templateId, sourceFile?.relativePath]);

  useEffect(() => {
    setInteractionContentReady(false);
    return scheduleAfterFirstPaint(() => setInteractionContentReady(true), isFileWorkspaceSurface ? 100 : 140);
  }, [isFileWorkspaceSurface]);

  useEffect(() => {
    panelMountedRef.current = true;
    return () => {
      panelMountedRef.current = false;
      if (workspaceWarmupPollRef.current && typeof window !== "undefined") {
        window.clearTimeout(workspaceWarmupPollRef.current);
        workspaceWarmupPollRef.current = null;
      }
      clearSourceDraftSyncTimer();
    };
  }, []);

  useEffect(() => {
    return scheduleAfterFirstPaint(() => {
      if (isFileWorkspaceSurface) {
        void refreshDesktopWorkspace();
        void refreshDesktopGitStatus();
        void refreshDesktopResourceSnapshot();
        void warmWorkspaceOsResources();
        void prepareWorkspaceOsResources();
        return;
      }
      void refreshDesktopWorkspace();
      void refreshDesktopGitStatus();
      void refreshDesktopResourceSnapshot();
      void warmWorkspaceOsResources();
      void refreshAdapters();
    });
  }, [isFileWorkspaceSurface]);

  useEffect(() => {
    if (!surfaceActive || runtimeState !== "available") {
      return undefined;
    }
    void refreshDesktopResourceSnapshot();
    const interval = window.setInterval(() => {
      void refreshDesktopResourceSnapshot();
    }, 10_000);
    return () => window.clearInterval(interval);
  }, [runtimeState, surfaceActive]);

  useEffect(() => {
    const tauriInvoke = getTauriInvoke();
    const activeSessionIds = activeSessionPollKey
      .split("|")
      .filter(Boolean)
      .map((entry) => entry.split(":")[0])
      .filter(Boolean);
    if (!surfaceActive || !tauriInvoke || runtimeState !== "available" || activeSessionIds.length === 0) {
      return undefined;
    }

    let disposed = false;
    const pollActiveSessions = async () => {
      if (activeSessionPollInFlightRef.current) {
        return;
      }
      activeSessionPollInFlightRef.current = true;
      try {
        const reports = await Promise.all(
          activeSessionIds.map((sessionId) =>
            tauriInvoke<CliSessionReport>("poll_cli_adapter_session", { sessionId }).catch(() => null)
          )
        );
        const nextReports = reports.filter((report): report is CliSessionReport => Boolean(report));
        if (disposed || nextReports.length === 0) {
          return;
        }
        setSessions((current) => mergeSessionReports(current, nextReports));
        const shouldRefreshInbox = nextReports.some(
          (report) => report.autoDeferTriggered || report.decisionInboxItems > 0 || report.decisionCaptureError
        );
        const now = Date.now();
        if (shouldRefreshInbox && now - lastInboxRefreshAtRef.current >= INBOX_REFRESH_THROTTLE_MS) {
          lastInboxRefreshAtRef.current = now;
          const inbox = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
          if (disposed) {
            return;
          }
          setInboxReport(inbox);
          setSelectedDecisionId((current) => current || inbox.decisions[0]?.id || "");
        }
        if (now - lastTaskRunRefreshAtRef.current >= TASK_RUN_REFRESH_THROTTLE_MS) {
          lastTaskRunRefreshAtRef.current = now;
          const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
          if (disposed) {
            return;
          }
          replaceTaskRunRecords(records);
        }
      } catch (caught) {
        if (!disposed) {
          setError(errorMessage(caught));
        }
      } finally {
        activeSessionPollInFlightRef.current = false;
      }
    };

    void pollActiveSessions();
    const interval = window.setInterval(() => {
      void pollActiveSessions();
    }, SESSION_POLL_INTERVAL_MS);
    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [activeSessionPollKey, runtimeState, surfaceActive]);

  useEffect(() => {
    const tauriInvoke = getTauriInvoke();
    const activeSessionIds = activeNativePtyPollKey
      .split("|")
      .filter(Boolean)
      .map((entry) => entry.split(":")[0])
      .filter(Boolean);
    if (!surfaceActive || !tauriInvoke || runtimeState !== "available" || activeSessionIds.length === 0) {
      return undefined;
    }

    let disposed = false;
    const pollActiveNativePtySessions = async () => {
      if (activeNativePtyPollInFlightRef.current) {
        return;
      }
      activeNativePtyPollInFlightRef.current = true;
      try {
        const reports = await Promise.all(
          activeSessionIds.map((sessionId) =>
            tauriInvoke<RuntimeNativePtySession>("poll_native_pty_terminal_session", { sessionId }).catch(() => null)
          )
        );
        const nextReports = reports.filter((report): report is RuntimeNativePtySession => Boolean(report));
        if (disposed || nextReports.length === 0) {
          return;
        }
        setNativePtySessions((current) => mergeNativePtyReports(current, nextReports));
      } catch (caught) {
        if (!disposed) {
          setError(errorMessage(caught));
        }
      } finally {
        activeNativePtyPollInFlightRef.current = false;
      }
    };

    void pollActiveNativePtySessions();
    const interval = window.setInterval(() => {
      void pollActiveNativePtySessions();
    }, NATIVE_PTY_POLL_INTERVAL_MS);
    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [activeNativePtyPollKey, runtimeState, surfaceActive]);

  useEffect(() => {
    if (!selectedSourcePath && sourceFiles[0]) {
      setSelectedSourcePath(sourceFiles[0].path);
    }
  }, [selectedSourcePath, sourceFiles]);

  type IdeWorkbenchStatus = "ready" | "running" | "setup" | "blocked" | "idle";
  type IdeRunConfiguration = {
    id: string;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    detail: string;
    status: IdeWorkbenchStatus;
    statusLabel: string;
    primaryLabel: string;
    primaryDisabled?: boolean;
    secondaryLabel?: string;
    secondaryDisabled?: boolean;
    onPrimary: () => void | Promise<void>;
    onSecondary?: () => void | Promise<void>;
  };

  const runtimeReady = runtimeState === "available";
  const providerSummaries = providerCredentialReport?.providers ?? [];
  const providerConfiguredCount = providerCredentialReport?.configuredCount ?? 0;
  const providerTotalCount = providerSummaries.length;
  const primaryProvider = providerSummaries.find((provider) => provider.configured) || providerSummaries[0] || null;
  const selectedAdapter = adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId) || adapters[0] || null;
  const workspacePathLabel =
    desktopWorkspace?.activeWorkspacePath ||
    desktopWorkspace?.fallbackWorkspacePath ||
    (uiLanguage === "ko" ? "작업공간 선택 필요" : "Workspace needed");
  const getDesktopActionFeedback = (
    id: DesktopActionFeedbackId,
    status: DesktopActionFeedbackStatus,
    result?: string
  ): DesktopActionFeedback => {
    const base: Omit<DesktopActionFeedback, "id" | "status" | "result" | "updatedAt"> = (() => {
      switch (id) {
        case "choose-workspace":
          return {
            label: uiLanguage === "ko" ? "작업공간 폴더 선택" : "Choose workspace folder",
            scope: uiLanguage === "ko" ? "macOS 폴더 권한 · 작업공간 호스트" : "macOS folder permission · workspace host",
            detail: uiLanguage === "ko" ? "폴더 선택 대화상자를 열고 선택한 경로를 앱 작업공간으로 등록합니다." : "Opens the folder picker and registers the selected path as the app workspace.",
            next: uiLanguage === "ko" ? "작업공간 호스트 카드에서 활성 경로와 Git 상태를 확인하세요." : "Check the workspace host card for the active path and Git status."
          };
        case "check-adapters":
          return {
            label: uiLanguage === "ko" ? "CLI 어댑터 전체 점검" : "Check all CLI adapters",
            scope: `${availableCount}/${adapters.length} CLI · ${workspacePathLabel}`,
            detail: uiLanguage === "ko" ? "Codex/Claude/Gemini 등 게스트 CLI의 경로, 버전, 헬스 체크를 다시 실행합니다." : "Reruns path, version, and health checks for guest CLIs such as Codex, Claude, and Gemini.",
            next: uiLanguage === "ko" ? "서비스 창과 문제 스트립에 누락 CLI와 최신 오류가 표시됩니다." : "Missing CLIs and recent errors appear in Services and Problems."
          };
        case "open-search-agent":
          return {
            label: uiLanguage === "ko" ? "검색 에이전트 작업 채팅" : "Search agent work chat",
            scope: researchInsightAgentId,
            detail: uiLanguage === "ko" ? "기존 검색 에이전트 워크벤치를 열거나 선택한 CLI 세션으로 검색 에이전트를 시작합니다." : "Opens the existing search-agent workbench or starts the search agent in the selected CLI session.",
            next: uiLanguage === "ko" ? "워크벤치가 있으면 탭이 열리고, 없으면 하단 터미널에서 세션이 시작됩니다." : "If the workbench exists it opens; otherwise the bottom terminal starts a session."
          };
        case "open-terminal":
          return {
            label: uiLanguage === "ko" ? "하단 터미널 열기" : "Open bottom terminal",
            scope: terminalDrawerOpen ? (uiLanguage === "ko" ? "이미 열림" : "already open") : uiLanguage === "ko" ? "터미널 드로어" : "terminal drawer",
            detail: uiLanguage === "ko" ? "현재 실행 중인 CLI 세션과 네이티브 PTY 출력을 확인할 수 있도록 터미널 패널을 엽니다." : "Opens the terminal panel so running CLI sessions and native PTY output are visible.",
            next: uiLanguage === "ko" ? "상태바의 Terminal 값과 하단 드로어를 확인하세요." : "Check the Terminal status and the bottom drawer."
          };
        case "start-selected-lane":
          return {
            label: uiLanguage === "ko" ? "선택한 실행 경로 시작" : "Start selected lane",
            scope: `${selectedAdapter?.label || selectedSessionAdapterId} · ${selectedMode.label}`,
            detail: uiLanguage === "ko" ? "선택한 어댑터와 실행 모드로 CLI 세션을 만들고 하단 터미널을 엽니다." : "Creates a CLI session with the selected adapter and run mode, then opens the bottom terminal.",
            next: uiLanguage === "ko" ? "터미널 출력과 실행 기록 패널에서 세션 진행 상황을 확인하세요." : "Follow progress in the terminal output and task-run records."
          };
        case "init-task-pipe":
          return {
            label: uiLanguage === "ko" ? "작업 파이프라인 시작" : "Initialize task pipeline",
            scope: `${selectedTaskPipe.label} · ${selectedTaskPipe.laneCount} lanes`,
            detail: uiLanguage === "ko" ? "현재 프리셋으로 다중 CLI 실행 경로를 만들고 병합 게이트 기준을 기록합니다." : "Creates multi-CLI lanes from the selected preset and records the merge-gate criteria.",
            next: uiLanguage === "ko" ? "작업 파이프라인 패널에서 lane, pipe, 누락 경로를 확인하세요." : "Check lanes, pipes, and missing routes in the task-pipeline panel."
          };
        case "refresh-decisions":
          return {
            label: uiLanguage === "ko" ? "결정함 새로고침" : "Refresh decision inbox",
            scope: uiLanguage === "ko" ? `${openInboxDecisions.length}개 열림` : `${openInboxDecisions.length} open`,
            detail: uiLanguage === "ko" ? "사람 답변이 필요한 결정 항목과 재개 조건을 다시 읽어옵니다." : "Reloads decision items that need human answers and resume conditions.",
            next: uiLanguage === "ko" ? "결정함 패널에서 첫 번째 열린 항목이 자동 선택됩니다." : "The first open item is selected in the decision panel."
          };
        case "refresh-task-runs":
          return {
            label: uiLanguage === "ko" ? "실행 기록 새로고침" : "Refresh task-run records",
            scope: uiLanguage === "ko" ? `${taskRunRecords.length}개 기록` : `${taskRunRecords.length} records`,
            detail: uiLanguage === "ko" ? "CLI 실행 로그, 출력 크기, 보류 질문, 상태 타임라인을 다시 읽습니다." : "Reloads CLI run logs, output sizes, deferred questions, and status timelines.",
            next: uiLanguage === "ko" ? "실행 기록 패널에서 최신 record를 열어 stdout/stderr를 확인하세요." : "Open the latest record in Task Runs to inspect stdout/stderr."
          };
        case "refresh-accumulated-data":
          return {
            label: uiLanguage === "ko" ? "축적 데이터 인덱스" : "Accumulated data index",
            scope: uiLanguage === "ko" ? `${accumulatedDataStats.records}개 기록` : `${accumulatedDataStats.records} records`,
            detail: uiLanguage === "ko" ? "작업 실행, 결정, 감사, 지원 번들 등 사용자에게 보이는 데이터 인덱스를 다시 계산합니다." : "Recalculates the user-visible index for task runs, decisions, audits, support bundles, and related data.",
            next: uiLanguage === "ko" ? "축적 데이터 패널의 저장소별 count와 경로를 확인하세요." : "Check per-store counts and paths in Accumulated Data."
          };
        case "refresh-runtime-roots":
          return {
            label: uiLanguage === "ko" ? "런타임 데이터 루트 점검" : "Check runtime data roots",
            scope: uiLanguage === "ko" ? `${runtimeDataStats.ready}/${runtimeDataStats.roots || "?"} 준비` : `${runtimeDataStats.ready}/${runtimeDataStats.roots || "?"} ready`,
            detail: uiLanguage === "ko" ? "앱 데이터, 실행 기록, 지원 출력 등 설치형 앱 데이터 경계의 루트 폴더를 확인합니다." : "Checks root folders for app data, task-run records, support output, and installable-app boundaries.",
            next: uiLanguage === "ko" ? "Runtime Data 패널에서 생성/누락 루트와 경로를 확인하세요." : "Review created and missing roots in Runtime Data."
          };
        case "audit-payload":
          return {
            label: uiLanguage === "ko" ? "설치 페이로드 감사" : "Installer payload audit",
            scope: payloadAudit ? `${payloadAudit.flaggedCount} findings` : uiLanguage === "ko" ? "아직 미검사" : "not scanned yet",
            detail: uiLanguage === "ko" ? "공개 배포 페이로드에 들어가면 안 되는 파일, 민감 경로, 과도한 산출물을 스캔합니다." : "Scans public-release payloads for sensitive paths, blocked files, and oversized artifacts.",
            next: uiLanguage === "ko" ? "감사 카드에서 severity, rule, 경로를 확인하세요." : "Check severity, rule, and paths in the audit card."
          };
        case "create-support-bundle":
          return {
            label: uiLanguage === "ko" ? "지원 진단 번들 생성" : "Create support diagnostic bundle",
            scope: supportBundle?.bundleId || (uiLanguage === "ko" ? "새 번들" : "new bundle"),
            detail: uiLanguage === "ko" ? "런타임 루트, 최근 이벤트, 실행 기록 요약을 민감정보 제거 형식으로 묶습니다." : "Packages runtime roots, recent events, and task-run summaries with redaction.",
            next: uiLanguage === "ko" ? "지원 진단 번들 카드에서 manifest와 내보낸 파일 경로를 확인하세요." : "Check manifest and export paths in the support bundle card."
          };
        case "refresh-service-readiness":
          return {
            label: uiLanguage === "ko" ? "서비스 준비도 점검" : "Check service readiness",
            scope: serviceReadiness ? `${serviceReadiness.score} score · ${serviceReadiness.publicBlockers.length} blockers` : uiLanguage === "ko" ? "미점검" : "not checked",
            detail: uiLanguage === "ko" ? "런타임 데이터, 고객 페이로드, 개인정보, 업데이트/복구 차단 요소를 한 번에 평가합니다." : "Evaluates runtime data, customer payload, privacy, update, and recovery blockers together.",
            next: uiLanguage === "ko" ? "Service Readiness 패널에서 공개 차단 요소와 warning을 확인하세요." : "Review public blockers and warnings in Service Readiness."
          };
        case "refresh-workspace-host":
          return {
            label: uiLanguage === "ko" ? "작업공간 호스트 새로고침" : "Refresh workspace host",
            scope: workspacePathLabel,
            detail: uiLanguage === "ko" ? "현재 앱 작업공간 상태, 권한 출처, Git 가능 여부, 최근 작업 상태를 다시 불러옵니다." : "Reloads workspace state, permission source, Git availability, and last operation status.",
            next: uiLanguage === "ko" ? "작업공간 호스트 카드의 상태/출처/최근 작업을 확인하세요." : "Check status, source, and last operation in Workspace Host."
          };
        case "defer-questions":
          return {
            label: uiLanguage === "ko" ? "감지된 질문 보류" : "Defer detected questions",
            scope: uiLanguage === "ko" ? `${pendingQuestionCount}개 대기` : `${pendingQuestionCount} pending`,
            detail: uiLanguage === "ko" ? "실행 중 CLI 세션에서 감지한 질문을 결정함으로 이동시켜 작업 재개 조건으로 남깁니다." : "Moves detected CLI questions into the decision inbox as resume conditions.",
            next: uiLanguage === "ko" ? "결정함에서 새로 생긴 질문과 resume action을 확인하세요." : "Check newly created questions and resume actions in Decisions."
          };
        case "open-source-review":
          return {
            label: uiLanguage === "ko" ? "소스 검토 열기" : "Open source review",
            scope: selectedSourcePath || (uiLanguage === "ko" ? "선택 파일 없음" : "no selected file"),
            detail: uiLanguage === "ko" ? "선택한 워크스페이스 상대 경로를 읽고 코드 편집/ diff 표면으로 전환합니다." : "Reads the selected workspace-relative path and switches to the code edit/diff surface.",
            next: uiLanguage === "ko" ? "소스 에디터 탭에서 초안 변경과 저장 상태를 확인하세요." : "Check draft changes and save state in the source editor tab."
          };
        case "import-workspace":
          return {
            label: uiLanguage === "ko" ? "작업공간 가져오기" : "Import workspace",
            scope: workspaceImportPath.trim() || (uiLanguage === "ko" ? "경로 미입력" : "path empty"),
            detail: uiLanguage === "ko" ? "입력한 절대 경로를 앱의 활성 작업공간으로 등록하고 권한/캐시를 준비합니다." : "Registers the entered absolute path as the active workspace and prepares permissions/cache.",
            next: uiLanguage === "ko" ? "작업공간 호스트 상태와 OS 캐시 수치를 확인하세요." : "Check workspace host status and OS cache metrics."
          };
        case "clone-workspace":
          return {
            label: uiLanguage === "ko" ? "작업공간 복제" : "Clone workspace",
            scope: workspaceCloneUrl.trim() || (uiLanguage === "ko" ? "저장소 URL 미입력" : "repository URL empty"),
            detail: uiLanguage === "ko" ? "저장소를 관리 작업공간 루트 아래로 복제하고 활성 작업공간으로 전환합니다." : "Clones the repository into the managed workspace root and switches it active.",
            next: uiLanguage === "ko" ? "Git 버전, 활성 경로, 최근 상태를 확인하세요." : "Check Git version, active path, and latest status."
          };
        case "start-cockpit-adapter":
          return {
            label: uiLanguage === "ko" ? "에이전트 CLI 코크핏 시작" : "Start Agent CLI cockpit",
            scope: `${selectedAdapter?.label || selectedSessionAdapterId} · ${selectedMode.label}`,
            detail: uiLanguage === "ko" ? "코크핏에서 고른 CLI 어댑터를 현재 실행 모드와 프롬프트로 바로 시작합니다." : "Starts the cockpit-selected CLI adapter with the current mode and prompt.",
            next: uiLanguage === "ko" ? "코크핏 row, 하단 터미널, 실행 기록에서 같은 세션을 추적하세요." : "Track the same session in the cockpit row, bottom terminal, and task-run records."
          };
      }
    })();
    const defaultResult =
      status === "running"
        ? uiLanguage === "ko"
          ? `${base.label} 실행 중입니다. 대상: ${base.scope}`
          : `${base.label} is running. Target: ${base.scope}`
        : status === "failed"
          ? uiLanguage === "ko"
            ? `${base.label} 실패. 최근 실행 오류와 터미널 출력을 확인하세요.`
            : `${base.label} failed. Check the latest error and terminal output.`
          : uiLanguage === "ko"
            ? `${base.label} 완료. ${base.next}`
            : `${base.label} done. ${base.next}`;
    return {
      id,
      ...base,
      status,
      result: result || defaultResult,
      updatedAt: new Date().toISOString()
    };
  };
  const setDesktopActionStatus = (id: DesktopActionFeedbackId, status: DesktopActionFeedbackStatus, result?: string) => {
    setDesktopActionFeedback(getDesktopActionFeedback(id, status, result));
  };
  const runDesktopAction = async (id: DesktopActionFeedbackId, action: () => void | Promise<void>, doneResult?: string) => {
    setDesktopActionStatus(id, "running");
    try {
      await action();
      setDesktopActionStatus(id, "done", doneResult);
    } catch (caught) {
      const message = errorMessage(caught);
      setError(message);
      setDesktopActionStatus(id, "failed", message);
    }
  };
  const desktopActionButtonClass = (id: DesktopActionFeedbackId) =>
    desktopActionFeedback?.id === id ? `desktop-action-current status-${desktopActionFeedback.status}` : undefined;
  const desktopActionStatusLabel = (status: DesktopActionFeedbackStatus) => {
    if (status === "running") {
      return uiLanguage === "ko" ? "실행 중" : "Running";
    }
    if (status === "failed") {
      return uiLanguage === "ko" ? "실패" : "Failed";
    }
    return uiLanguage === "ko" ? "완료" : "Done";
  };
  const renderDesktopActionFeedbackCard = (placement: "quick-start" | "command-palette") => {
    if (!desktopActionFeedback) {
      return null;
    }
    const StatusIcon =
      desktopActionFeedback.status === "running"
        ? Activity
        : desktopActionFeedback.status === "failed"
          ? AlertTriangle
          : CheckCircle2;
    return (
      <article
        className={`desktop-action-feedback-card status-${desktopActionFeedback.status}`}
        data-desktop-action-feedback-card={placement}
        role="status"
        aria-live="polite"
      >
        <header>
          <span className="desktop-action-feedback-status">
            <StatusIcon size={15} aria-hidden="true" />
            {desktopActionStatusLabel(desktopActionFeedback.status)}
          </span>
          <div>
            <strong>{desktopActionFeedback.label}</strong>
            <small>{desktopActionFeedback.scope}</small>
          </div>
          <time dateTime={desktopActionFeedback.updatedAt}>{formatTimeLabel(desktopActionFeedback.updatedAt)}</time>
        </header>
        <div className="desktop-action-feedback-body">
          <p>{desktopActionFeedback.result}</p>
          <small>{desktopActionFeedback.detail}</small>
        </div>
        <div className="desktop-action-feedback-next">
          <span>{uiLanguage === "ko" ? "다음 확인" : "Next check"}</span>
          <strong>{desktopActionFeedback.next}</strong>
        </div>
      </article>
    );
  };
  const ideRunConfigurations: IdeRunConfiguration[] = [
    {
      id: "search-agent-chat",
      icon: Search,
      title: uiLanguage === "ko" ? "검색 에이전트로 대화 시작" : "Start Search Agent chat",
      subtitle: uiLanguage === "ko" ? "이미 만든 검색 에이전트를 바로 엽니다." : "Open the existing search agent immediately.",
      detail: primaryProvider
        ? `${primaryProvider.label} · ${primaryProvider.defaultModel || primaryProvider.status}`
        : uiLanguage === "ko"
          ? "제공자 설정에서 모델 계정을 연결하세요."
          : "Connect a model account in provider settings.",
      status:
        runningAdapterId === "research_insight_agent"
          ? "running"
          : primaryProvider?.configured || primaryProvider?.authMethod === "local_http"
            ? "ready"
            : "setup",
      statusLabel:
        runningAdapterId === "research_insight_agent"
          ? uiLanguage === "ko" ? "실행 중" : "Running"
          : primaryProvider?.configured || primaryProvider?.authMethod === "local_http"
            ? uiLanguage === "ko" ? "준비됨" : "Ready"
            : uiLanguage === "ko" ? "계정 필요" : "Needs account",
      primaryLabel: uiLanguage === "ko" ? "채팅 열기" : "Open chat",
      secondaryLabel: uiLanguage === "ko" ? "터미널 실행" : "Run in terminal",
      primaryDisabled: !onOpenSearchAgentWorkbench && (!runtimeReady || runningAdapterId !== ""),
      secondaryDisabled: !runtimeReady || runningAdapterId !== "",
      onPrimary: () => runDesktopAction("open-search-agent", onOpenSearchAgentWorkbench || startDefaultSearchAgent),
      onSecondary: () => runDesktopAction("open-search-agent", startDefaultSearchAgent)
    },
    {
      id: "cli-session",
      icon: SquareTerminal,
      title: uiLanguage === "ko" ? "선택한 CLI 세션 시작" : "Start selected CLI session",
      subtitle: uiLanguage === "ko" ? "선택한 어댑터와 모드로 하단 터미널을 올립니다." : "Open the bottom terminal with the selected adapter and mode.",
      detail: `${selectedAdapter?.label || selectedSessionAdapterId} · ${selectedMode.label}`,
      status: runningAdapterId === "session" ? "running" : selectedAdapter?.available ? "ready" : "setup",
      statusLabel:
        runningAdapterId === "session"
          ? uiLanguage === "ko" ? "실행 중" : "Running"
          : selectedAdapter?.available
            ? uiLanguage === "ko" ? "준비됨" : "Ready"
            : uiLanguage === "ko" ? "설치 확인" : "Check install",
      primaryLabel: uiLanguage === "ko" ? "세션 시작" : "Start session",
      secondaryLabel: uiLanguage === "ko" ? "실행 설정" : "Run settings",
      primaryDisabled: !runtimeReady || runningAdapterId !== "",
      onPrimary: () => runDesktopAction("start-selected-lane", startSession),
      onSecondary: () => onOpenSettings("session")
    },
    {
      id: "task-pipe",
      icon: Network,
      title: uiLanguage === "ko" ? "다중 CLI 파이프라인" : "Multi-CLI pipeline",
      subtitle: uiLanguage === "ko" ? "여러 실행 경로를 분산/병합 구조로 초기화합니다." : "Initialize multiple lanes with fan-out/fan-in control.",
      detail: `${selectedTaskPipe.label} · ${selectedTaskPipe.laneCount} ${uiLanguage === "ko" ? "개 경로" : "lanes"} · ${selectedTaskPipe.mergeGate}`,
      status:
        runningAdapterId === "task-pipe"
          ? "running"
          : pipelineStats.missing > 0
            ? "setup"
            : "ready",
      statusLabel:
        runningAdapterId === "task-pipe"
          ? uiLanguage === "ko" ? "실행 중" : "Running"
          : pipelineStats.missing > 0
            ? uiLanguage === "ko" ? `${pipelineStats.missing}개 경로 누락` : `${pipelineStats.missing} lanes missing`
            : uiLanguage === "ko" ? "준비됨" : "Ready",
      primaryLabel: uiLanguage === "ko" ? "파이프라인 시작" : "Start pipe",
      secondaryLabel: uiLanguage === "ko" ? "파이프라인 설정" : "Pipe settings",
      primaryDisabled: !runtimeReady || runningAdapterId !== "",
      onPrimary: () => runDesktopAction("init-task-pipe", initTaskPipe),
      onSecondary: () => onOpenSettings("pipe")
    },
    {
      id: "workspace-readiness",
      icon: CheckCircle2,
      title: uiLanguage === "ko" ? "작업공간 준비 상태 점검" : "Check workspace readiness",
      subtitle: uiLanguage === "ko" ? "CLI, 데이터 경로, 공개 배포 차단 요소를 한 번에 확인합니다." : "Check CLIs, data paths, and public blockers together.",
      detail: `${availableCount}/${adapters.length} CLI · ${serviceReadinessStats.publicBlockers} ${uiLanguage === "ko" ? "차단 요소" : "blockers"} · ${workspacePathLabel}`,
      status:
        serviceReadinessStats.publicBlockers > 0
          ? "blocked"
          : runtimeReady
            ? "ready"
            : "setup",
      statusLabel:
        serviceReadinessStats.publicBlockers > 0
          ? uiLanguage === "ko" ? "해결 필요" : "Needs fix"
          : runtimeReady
            ? uiLanguage === "ko" ? "확인 가능" : "Checkable"
            : uiLanguage === "ko" ? "런타임 필요" : "Needs runtime",
      primaryLabel: uiLanguage === "ko" ? "전체 점검" : "Run checks",
      secondaryLabel: uiLanguage === "ko" ? "폴더 선택" : "Choose folder",
      primaryDisabled: !runtimeReady || runningAdapterId !== "",
      secondaryDisabled: !runtimeReady || workspaceHostBusy !== "",
      onPrimary: () => runDesktopAction("check-adapters", runAllHealthChecks),
      onSecondary: () => runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)
    }
  ];
  const ideServiceRows = [
    {
      id: "runtime",
      icon: Activity,
      label: "Desktop Runtime",
      status: runtimeState,
      statusClass: runtimeReady ? "ready" : runtimeState === "checking" ? "idle" : "setup",
      detail: health?.shell || (runtimeReady ? "Tauri bridge ready" : "Tauri bridge pending")
    },
    {
      id: "workspace",
      icon: FolderOpen,
      label: uiLanguage === "ko" ? "작업공간" : "Workspace",
      status: desktopWorkspace?.status || "pending",
      statusClass: desktopWorkspace?.activeWorkspacePath ? "ready" : "setup",
      detail: workspacePathLabel
    },
    ...adapters.slice(0, 4).map((adapter) => ({
      id: `adapter-${adapter.adapterId}`,
      icon: SquareTerminal,
      label: adapter.label,
      status: adapter.available ? "available" : "missing",
      statusClass: adapter.available ? "ready" : "setup",
      detail: adapter.version || adapter.resolvedPath || adapter.lastError || adapter.command
    })),
    ...providerSummaries.slice(0, 4).map((provider) => ({
      id: `provider-${provider.providerId}`,
      icon: KeyRound,
      label: provider.label,
      status: provider.configured || provider.authMethod === "local_http" ? "connected" : "missing",
      statusClass: provider.configured || provider.authMethod === "local_http" ? "ready" : "setup",
      detail: provider.authMethod === "local_http" ? "127.0.0.1:11434" : provider.envVar
    })),
    ...sessions.slice(0, 2).map((session) => ({
      id: `session-${session.sessionId}`,
      icon: PlayCircle,
      label: session.label,
      status: session.status,
      statusClass: isActiveSessionStatus(session.status) ? "running" : "idle",
      detail: `${session.adapterId} · ${formatDuration(session.elapsedMs)}`
    }))
  ].slice(0, 11);
  const ideProblemItems: Array<{
    id: string;
    severity: "error" | "warning" | "info";
    title: string;
    detail: string;
    actionLabel?: string;
    onAction?: () => void | Promise<void>;
  }> = [];
  if (error) {
    ideProblemItems.push({
      id: "runtime-error",
      severity: "error",
      title: uiLanguage === "ko" ? "최근 실행 오류" : "Latest run error",
      detail: error,
      actionLabel: uiLanguage === "ko" ? "터미널" : "Terminal",
      onAction: () => setTerminalDrawerOpen(true)
    });
  }
  if (!runtimeReady) {
    ideProblemItems.push({
      id: "runtime-unavailable",
      severity: "warning",
      title: uiLanguage === "ko" ? "네이티브 런타임 연결 필요" : "Native runtime needed",
      detail: uiLanguage === "ko" ? "브라우저 미리보기에서는 일부 실행 기능이 비활성화됩니다." : "Some execution features are disabled in browser preview.",
      actionLabel: uiLanguage === "ko" ? "설정" : "Settings",
      onAction: () => onOpenSettings("quick")
    });
  }
  adapters
    .filter((adapter) => !adapter.available)
    .slice(0, 2)
    .forEach((adapter) => {
      ideProblemItems.push({
        id: `missing-adapter-${adapter.adapterId}`,
        severity: "warning",
        title: `${adapter.label} ${uiLanguage === "ko" ? "CLI 확인 필요" : "CLI check needed"}`,
        detail: adapter.lastError || adapter.command,
        actionLabel: uiLanguage === "ko" ? "설정" : "Settings",
        onAction: () => onOpenSettings("adapter")
      });
    });
  if (providerTotalCount > 0 && providerConfiguredCount === 0) {
    ideProblemItems.push({
      id: "provider-missing",
      severity: "warning",
      title: uiLanguage === "ko" ? "모델 계정 또는 로컬 모델 선택 필요" : "Model account or local model needed",
      detail: uiLanguage === "ko" ? "OpenAI, Claude, Gemini, Ollama 중 하나를 연결하면 에이전트 실행이 바로 됩니다." : "Connect OpenAI, Claude, Gemini, or Ollama to run agents directly.",
      actionLabel: uiLanguage === "ko" ? "제공자" : "Providers",
      onAction: () => onOpenSettings("providers")
    });
  }
  if (openInboxDecisions.length > 0) {
    ideProblemItems.push({
      id: "decision-inbox",
      severity: "info",
      title: uiLanguage === "ko" ? "답변 대기 결정 있음" : "Decisions waiting for answers",
      detail: `${openInboxDecisions.length} ${uiLanguage === "ko" ? "개 항목이 작업 재개를 기다립니다." : "items are waiting before resume."}`,
      actionLabel: uiLanguage === "ko" ? "질문 보기" : "View questions",
      onAction: () => onOpenSettings("questions")
    });
  }
  if (dirtyDraftEntries.length > 0) {
    ideProblemItems.push({
      id: "dirty-drafts",
      severity: "info",
      title: uiLanguage === "ko" ? "저장 안 된 코드 초안" : "Unsaved code drafts",
      detail: `${dirtyDraftEntries.length} ${uiLanguage === "ko" ? "개 파일에 변경사항이 있습니다." : "files have edits."}`,
      actionLabel: uiLanguage === "ko" ? "파일 열기" : "Open files",
      onAction: () => setTerminalDrawerOpen(false)
    });
  }
  serviceReadiness?.publicBlockers.slice(0, 2).forEach((blocker, index) => {
    ideProblemItems.push({
      id: `public-blocker-${index}`,
      severity: "warning",
      title: uiLanguage === "ko" ? "배포 차단 요소" : "Release blocker",
      detail: blocker,
      actionLabel: uiLanguage === "ko" ? "점검" : "Check",
      onAction: runAllHealthChecks
    });
  });
  const visibleIdeProblems = ideProblemItems.slice(0, 7);
  const ideStatusItems = [
    { label: "Runtime", value: runtimeState },
    { label: "CLI", value: `${availableCount}/${adapters.length}` },
    { label: "Model", value: providerTotalCount ? `${providerConfiguredCount}/${providerTotalCount}` : "0" },
    { label: "Sessions", value: `${sessionStats.active} active` },
    { label: "Inbox", value: `${openInboxDecisions.length}` },
    { label: "Terminal", value: terminalDrawerOpen ? "open" : "docked" }
  ];
  const cockpitStats = {
    adapters: adapters.length,
    available: availableCount,
    activeSessions: sessionStats.active,
    decisionItems: openInboxDecisions.length + pendingQuestionCount,
    taskRuns: taskRunRecords.length
  };
  const openSourceControlPlanePatterns = [
    {
      id: "cao",
      label: "CAO",
      detail: uiLanguage === "ko"
        ? "격리된 CLI 세션, handoff/assign/send_message, lifecycle 복구"
        : "isolated CLI sessions, handoff/assign/send_message, lifecycle restore"
    },
    {
      id: "agentify",
      label: "Agentify",
      detail: uiLanguage === "ko"
        ? "로컬 세션, 아티팩트, 탭 상태를 제품 상태로 관리"
        : "local sessions, artifacts, and tab state as product-owned state"
    },
    {
      id: "clawx-openloaf",
      label: "ClawX / OpenLoaf",
      detail: uiLanguage === "ko"
        ? "프로젝트/에이전트별 작업공간, provider, skill, terminal을 한 워크벤치로 묶음"
        : "project/agent workspace, providers, skills, and terminals in one workbench"
    }
  ];
  const agentCliCockpitRows = adapters.map((adapter) => {
    const guide = adapterSetupGuides[adapter.adapterId];
    const adapterSessions = sessions.filter((session) => session.adapterId === adapter.adapterId);
    const activeAdapterSessions = adapterSessions.filter((session) => isActiveSessionStatus(session.status));
    const adapterTaskRuns = taskRunRecords.filter((record) => record.adapterId === adapter.adapterId);
    const adapterDecisionItems = adapterSessions.reduce(
      (total, session) => total + session.decisionInboxItems + session.pendingDecisionPrompts,
      0
    );
    const selected = selectedSessionAdapterId === adapter.adapterId;
    const authStatus = providerAuthStatusForAdapter(adapter.adapterId, providerCredentialReport, uiLanguage);
    const authReady = adapterAuthReadyForAdapter(adapter.adapterId, providerCredentialReport);
    const statusLabel = adapter.available
      ? uiLanguage === "ko" ? "설치됨" : "Installed"
      : uiLanguage === "ko" ? "설치 필요" : "Install needed";
    const readinessLabel = activeAdapterSessions.length
      ? uiLanguage === "ko" ? "실행 중" : "Running"
      : selected
        ? uiLanguage === "ko" ? "선택됨" : "Selected"
        : adapter.available
          ? uiLanguage === "ko" ? "시작 가능" : "Startable"
          : uiLanguage === "ko" ? "대기" : "Waiting";
    return {
      adapter,
      guide,
      selected,
      adapterSessions,
      activeAdapterSessions,
      adapterTaskRuns,
      adapterDecisionItems,
      authStatus,
      authReady,
      statusLabel,
      readinessLabel,
      setupSteps: [
        {
          id: "install",
          label: uiLanguage === "ko" ? "설치" : "Install",
          ready: adapter.available,
          detail: adapter.available ? adapter.resolvedPath || adapter.command : guide?.installHint || adapter.command,
          command: guide?.installHint || adapter.command
        },
        {
          id: "auth",
          label: uiLanguage === "ko" ? "로그인/키" : "Login/key",
          ready: authReady,
          detail: authReady ? authStatus : guide?.authHint || authStatus,
          command: guide?.authHint || ""
        },
        {
          id: "verify",
          label: uiLanguage === "ko" ? "검증" : "Verify",
          ready: adapter.available,
          detail: adapter.version || adapter.lastError || guide?.verifyCommand || adapter.command,
          command: guide?.verifyCommand || adapter.command
        },
        {
          id: "run",
          label: uiLanguage === "ko" ? "첫 실행" : "First run",
          ready: adapter.available && authReady,
          detail: guide?.expectedResult || adapter.command,
          command: guide?.firstRunCommand || adapter.command
        }
      ]
    };
  });
  const startAdapterFromCockpit = async (adapterId: string) => {
    const adapter = adapters.find((item) => item.adapterId === adapterId);
    setSelectedSessionAdapterId(adapterId);
    await startSessionFromLaunchRequest({
      id: `agent-cli-cockpit-${adapterId}-${Date.now()}`,
      label: adapter?.label || adapterId,
      adapterId,
      modeId: selectedSessionModeId,
      taskKind: "user_task",
      prompt: sessionPrompt,
      openTerminal: true,
      autoStart: true
    });
  };

  if (isFileWorkspaceSurface && !interactionContentReady) {
    return (
      <div className={`content-grid native-file-workspace-panel filesystem-workbench ${invoke ? "runtime-ready" : "runtime-fallback"}`}>
        <section className="native-file-hero">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
          <ActionGroup className="native-workspace-actions" align="end" density="compact">
            <Button variant="primary" disabled>
              <FolderOpen size={16} aria-hidden="true" />
              <span>{copy.chooseFolder}</span>
            </Button>
            <Button variant="secondary" disabled>
              <Search size={16} aria-hidden="true" />
              <span>{copy.refreshFiles}</span>
            </Button>
          </ActionGroup>
        </section>

        <section className="filesystem-workbench-shell source-interaction-prerender" aria-busy="true">
          <div className="desktop-interaction-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </div>
    );
  }

  if (isFileWorkspaceSurface) {
    return (
    <div className={`content-grid native-file-workspace-panel filesystem-workbench ${invoke ? "runtime-ready" : "runtime-fallback"}`}>
      <section className="native-file-hero">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <ActionGroup className="native-workspace-actions" align="end" density="compact">
          <Button
            variant="primary"
            onClick={() => void runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)}
            loading={workspaceHostBusy === "choose"}
            disabled={!invoke || workspaceHostBusy !== ""}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "choose" ? copy.choosingFolder : copy.chooseFolder}</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => void runDesktopAction("refresh-workspace-host", refreshDesktopWorkspace)}
            loading={workspaceHostBusy === "refresh"}
            disabled={!invoke || workspaceHostBusy !== ""}
          >
            <Activity size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "refresh" ? copy.loading : copy.refreshWorkspace}</span>
          </Button>
          <Button
            variant="secondary"
            onClick={refreshRuntimeSourceFiles}
            loading={sourceCatalogBusy || workspaceResourceBusy}
            disabled={!invoke || sourceCatalogBusy || workspaceResourceBusy}
          >
            <Search size={16} aria-hidden="true" />
            <span>{sourceCatalogBusy || workspaceResourceBusy ? copy.loading : copy.refreshFiles}</span>
          </Button>
        </ActionGroup>
      </section>

      {!invoke && <p className="desktop-error">{copy.noRuntime}</p>}
      {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}
      {renderDesktopActionFeedbackCard("quick-start")}

      <section className="filesystem-workbench-shell" aria-label={copy.eyebrow}>
        <WorkspaceExplorerPane
          activePath={sourceFile?.relativePath || selectedSourcePath}
          catalogLabel={sourceCatalogLabel}
          copy={copy}
          dirtyCount={dirtyDraftEntries.length}
          dirtyPaths={dirtySourcePathSet}
          editorBusy={editorBusy}
          files={filteredEditableSourceFiles}
          rootLabel={workspaceExplorerRootLabel}
          runtimeAvailable={Boolean(invoke)}
          sourceCatalogBusy={sourceCatalogBusy || workspaceResourceBusy}
          sourceCatalogReport={sourceCatalogReport}
          sourceFilter={sourceFilter}
          workspaceHostBusy={workspaceHostBusy}
          workspacePath={desktopWorkspace?.activeWorkspacePath || desktopWorkspace?.fallbackWorkspacePath || "workspace pending"}
          workspaceSource={desktopWorkspace?.activeWorkspaceSource || (runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource)}
          onChooseFolder={chooseDesktopWorkspaceFolder}
          onOpenFile={openDraftOrLoad}
          onRefreshFiles={refreshRuntimeSourceFiles}
          onRefreshWorkspace={refreshDesktopWorkspace}
          onSourceFilterChange={setSourceFilter}
        />

        <div className="filesystem-editor-pane">

      <section className="native-workspace-state-strip" aria-label={copy.workspaceState}>
        <article>
          <span>{copy.activeWorkspace}</span>
          <code>{desktopWorkspace?.activeWorkspacePath || desktopWorkspace?.fallbackWorkspacePath || "workspace pending"}</code>
        </article>
        <article>
          <span>{copy.folderSource}</span>
          <strong>{desktopWorkspace?.activeWorkspaceSource || (runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource)}</strong>
        </article>
        <article>
          <span>{copy.fileList}</span>
          <strong>
            {filteredEditableSourceFiles.length.toLocaleString("ko-KR")} / {sourceCatalogReport?.totalCount ?? sourceCatalogFiles.length}
          </strong>
        </article>
        <article>
          <span>OS 캐시</span>
          <strong>
            {workspaceResourceReport
              ? `${workspaceResourceReport.cachedTextFiles.toLocaleString("ko-KR")} / ${formatBytes(workspaceResourceReport.cachedBytes)} / ${workspaceResourceReport.parallelWorkers} workers`
              : workspaceWarmupReport
                ? `${workspaceWarmupReport.status} / ${workspaceWarmupReport.cachedTextFiles.toLocaleString("ko-KR")} / ${formatBytes(workspaceWarmupReport.cachedBytes)} / ${workspaceWarmupReport.parallelWorkers || "-"} workers`
              : workspaceResourceBusy
                ? copy.loading
                : "not prepared"}
          </strong>
        </article>
        <article>
          <span>메모리 예산</span>
          <strong>
            {formatBytes(workspaceResourceReport?.memoryBudgetBytes ?? workspaceWarmupReport?.memoryBudgetBytes ?? 128_000_000)}
            {workspaceResourceReport?.availableMemoryBytes ? ` / ${formatBytes(workspaceResourceReport.availableMemoryBytes)} free` : ""}
          </strong>
        </article>
        <article>
          <span>CPU 병렬</span>
          <strong>
            {workspaceResourceReport
              ? `${workspaceResourceReport.parallelWorkers}/${workspaceResourceReport.cpuThreads} threads`
              : workspaceWarmupReport?.cpuThreads
                ? `${workspaceWarmupReport.parallelWorkers}/${workspaceWarmupReport.cpuThreads} threads`
                : "runtime profile pending"}
          </strong>
        </article>
        <article>
          <span>앱 RAM/CPU</span>
          <strong>
            {desktopResourceSnapshot
              ? `${formatBytes(desktopResourceSnapshot.processMemoryBytes)} / ${desktopResourceSnapshot.processCpuUsage.toFixed(1)}% / pid ${desktopResourceSnapshot.appPid || "-"}`
              : invoke
                ? "native telemetry pending"
                : "browser preview"}
          </strong>
        </article>
        <article>
          <span>{copy.openedDrafts}</span>
          <strong>
            {dirtyDraftEntries.length.toLocaleString("ko-KR")} {copy.dirty} / {openDraftEntries.length.toLocaleString("ko-KR")} open
          </strong>
        </article>
      </section>

      <section className="panel wide desktop-source-panel native-source-workbench">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.runtimeSource}</p>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
          <div className="source-panel-stats">
            <span>{openDraftEntries.length} open</span>
            <strong>{dirtyDraftEntries.length} {copy.dirty}</strong>
            <span>{sourceCatalogLabel}</span>
            {workspaceResourceReport && <span>{formatBytes(workspaceResourceReport.cachedBytes)} cached</span>}
            {workspaceResourceReport && <span>{workspaceResourceReport.preloadStrategy}</span>}
            {workspaceResourceReport && <span>{workspaceResourceReport.scanDurationMs + workspaceResourceReport.preloadDurationMs} ms native</span>}
            {workspaceWarmupReport?.status === "warming" && <span>native warming</span>}
          </div>
        </div>
        <div className="source-editor-controls native-source-controls">
          <label className="source-path-field">
            <span>{copy.openSelected}</span>
            <input
              value={sourcePathInput}
              onChange={(event) => {
                setSourcePathInput(event.target.value);
                setSelectedSourcePath(event.target.value);
              }}
              placeholder="workspace-relative/path.ts"
            />
          </label>
          <div className="source-file-picker-field">
            <span>{copy.fileList}</span>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button
                  variant="secondary"
                  className="source-file-picker-trigger"
                  disabled={filteredEditableSourceFiles.length === 0}
                  aria-label={copy.fileList}
                  title={selectedSourceFileOption?.path || sourcePathInput || copy.noFiles}
                >
                  <FileSearch size={15} aria-hidden="true" />
                  <span className="source-file-picker-value">{selectedSourceFileOption?.path || sourcePathInput || copy.noFiles}</span>
                  <ChevronDown size={15} aria-hidden="true" className="source-file-picker-caret" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="source-file-picker-menu" align="start" sideOffset={6} collisionPadding={12}>
                  <DropdownMenu.Label className="source-file-picker-label">
                    <span>{copy.fileList}</span>
                    <strong>
                      {filteredEditableSourceFiles.length.toLocaleString("ko-KR")} / {sourceCatalogReport?.totalCount ?? sourceCatalogFiles.length}
                    </strong>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator className="source-file-picker-separator" />
                  {filteredEditableSourceFiles.length ? (
                    filteredEditableSourceFiles.map((file) => (
                      <DropdownMenu.Item
                        key={file.id}
                        className="source-file-picker-item"
                        data-selected={file.path === selectedSourcePath ? "true" : "false"}
                        onSelect={() => {
                          setSelectedSourcePath(file.path);
                          setSourcePathInput(file.path);
                        }}
                      >
                        <FileSearch size={14} aria-hidden="true" />
                        <span>
                          <strong>{file.path}</strong>
                          <small>
                            {file.project} / {file.language || file.extension} / {formatBytes(file.sizeBytes)}
                          </small>
                        </span>
                        {file.path === selectedSourcePath && <CheckCircle2 size={14} aria-hidden="true" />}
                      </DropdownMenu.Item>
                    ))
                  ) : (
                    <DropdownMenu.Item className="source-file-picker-item empty" disabled>
                      <Search size={14} aria-hidden="true" />
                      <span>
                        <strong>{copy.noFiles}</strong>
                        <small>{sourceFilter || sourceCatalogLabel}</small>
                      </span>
                    </DropdownMenu.Item>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <ActionGroup className="source-editor-action-group" align="stretch" density="compact">
            <Button variant="primary" className="source-action-button primary" onClick={loadSourceFile} loading={editorBusy} disabled={!invoke || editorBusy || !sourcePathInput.trim()}>
              <FileSearch size={15} aria-hidden="true" />
              <span>{editorBusy ? copy.loading : copy.openSelected}</span>
            </Button>
            <Button variant="secondary" className="source-action-button save" onClick={saveSourceFile} loading={editorBusy} disabled={!invoke || editorBusy || !sourceFile || !currentSourceDirty}>
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>{editorBusy ? copy.saving : copy.saveCurrent}</span>
            </Button>
            <Button variant="secondary" className="source-action-button save-all" onClick={saveAllSourceDrafts} loading={saveAllBusy} disabled={!invoke || editorBusy || saveAllBusy || dirtyDraftEntries.length === 0}>
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>{saveAllBusy ? copy.saving : copy.saveAll}</span>
            </Button>
            <Button variant="secondary" className="source-action-button secondary" onClick={copyCurrentSourceDraft} disabled={!sourceFile}>
              <Copy size={15} aria-hidden="true" />
              <span>{copy.copyFile}</span>
            </Button>
          </ActionGroup>
        </div>

        <ActionGroup className="source-command-toolbar" asToolbar aria-label={copy.editorSettings} density="compact">
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("undo")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <History size={15} aria-hidden="true" />
            <span>Undo</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("redo")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <History size={15} aria-hidden="true" />
            <span>Redo</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("find")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Search size={15} aria-hidden="true" />
            <span>Find</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("replace")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Search size={15} aria-hidden="true" />
            <span>Replace</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("format")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Code2 size={15} aria-hidden="true" />
            <span>Format</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("foldAll")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Code2 size={15} aria-hidden="true" />
            <span>{copy.foldAll}</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => runSourceEditorCommand("unfoldAll")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Code2 size={15} aria-hidden="true" />
            <span>{copy.unfoldAll}</span>
          </Button>
          <Button variant="ghost" size="sm" className="source-tool-button mode" onClick={() => setSourceEditorViewMode((current) => (current === "edit" ? "diff" : "edit"))} disabled={!sourceFile}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{sourceEditorViewMode === "edit" ? copy.diffMode : copy.editMode}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSourceWordWrap((current) => !current)} className={`source-tool-button toggle ${sourceWordWrap ? "active" : ""}`} aria-pressed={sourceWordWrap}>
            <Code2 size={15} aria-hidden="true" />
            <span>{copy.wordWrap}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSourceMinimapEnabled((current) => !current)} className={`source-tool-button toggle ${sourceMinimapEnabled ? "active" : ""}`} aria-pressed={sourceMinimapEnabled}>
            <LayoutDashboard size={15} aria-hidden="true" />
            <span>{copy.minimap}</span>
          </Button>
        </ActionGroup>

        <div className="source-workbench-switcher" role="tablist" aria-label={uiLanguage === "ko" ? "소스 작업 보기" : "Source workbench views"}>
          {!isFileWorkspaceSurface && (
            <Button
              variant="ghost"
              size="sm"
              role="tab"
              aria-selected={sourceWorkbenchView === "files"}
              className={sourceWorkbenchView === "files" ? "active" : ""}
              onClick={() => setSourceWorkbenchView("files")}
            >
              <FolderOpen size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "파일" : "Files"}</span>
              <small>{filteredEditableSourceFiles.length.toLocaleString("ko-KR")}</small>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            role="tab"
            aria-selected={sourceWorkbenchView === "editor"}
            className={sourceWorkbenchView === "editor" ? "active" : ""}
            onClick={() => setSourceWorkbenchView("editor")}
          >
            <Code2 size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "편집" : "Editor"}</span>
            <small>{openDraftEntries.length.toLocaleString("ko-KR")}</small>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            role="tab"
            aria-selected={sourceWorkbenchView === "results"}
            className={sourceWorkbenchView === "results" ? "active" : ""}
            onClick={() => setSourceWorkbenchView("results")}
          >
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "저장 결과" : "Save results"}</span>
            <small>{sourceSaveResults.length.toLocaleString("ko-KR")}</small>
          </Button>
        </div>

        <div className={`source-review-grid native-source-grid source-workbench-view-${sourceWorkbenchView}`}>
          {!isFileWorkspaceSurface && (sourceWorkbenchView === "files" || sourceWorkbenchView === "editor") && (
          <aside className="source-file-browser">
            <header>
              <div>
                <span>{runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource}</span>
                <strong>{filteredEditableSourceFiles.length.toLocaleString("ko-KR")} shown</strong>
              </div>
              <Code2 size={16} aria-hidden="true" />
            </header>
            {sourceCatalogReport && (
              <p className="source-catalog-note">
                {sourceCatalogReport.returnedCount}/{sourceCatalogReport.totalCount} files
                {sourceCatalogReport.truncated ? " / truncated" : ""}
              </p>
            )}
            <input
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              placeholder={copy.fileSearch}
            />
            <div className="source-file-browser-list">
              {filteredEditableSourceFiles.length ? (
                filteredEditableSourceFiles.map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    className={sourceFile?.relativePath === file.path ? "active" : ""}
                    onClick={() => openDraftOrLoad(file.path)}
                    disabled={!invoke || editorBusy}
                  >
                    <strong>{file.path}</strong>
                    <span>
                      {file.project} / {file.language || file.extension} / {formatBytes(file.sizeBytes)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="empty-state">{copy.noFiles}</p>
              )}
            </div>
          </aside>
          )}

          {sourceWorkbenchView === "editor" && (
          <div className="source-edit-workbench">
            {openDraftEntries.length > 0 && (
              <div className="source-editor-tabs" aria-label={copy.openedDrafts}>
                {openDraftEntries.map((entry) => {
                  const dirty = entry.content !== entry.baseContent;
                  return (
                    <div
                      key={entry.relativePath}
                      className={`source-editor-tab ${sourceFile?.relativePath === entry.relativePath ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
                    >
                      <button type="button" className="source-editor-tab-main" onClick={() => selectDraftEntry(entry.relativePath)}>
                        <span>{dirty ? copy.dirty : copy.clean}</span>
                        <strong>{entry.relativePath}</strong>
                      </button>
                      <button
                        type="button"
                        className="source-editor-tab-close"
                        onClick={() => closeDraftByPath(entry.relativePath)}
                        aria-label={`Close ${entry.relativePath}`}
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {sourceFile ? (
              <div className="source-editor-frame" tabIndex={0} aria-label={uiLanguage === "ko" ? "소스 편집 스크롤 영역" : "Source editor scroll region"}>
                <div className="source-editor-meta">
                  <div>
                    <span>{sourceFile.relativePath}</span>
                    <strong>
                      {formatBytes(sourceDraft.length)} / max {formatBytes(sourceFile.maxSizeBytes)}
                    </strong>
                  </div>
                  <ActionGroup className="source-editor-primary-actions" asToolbar align="end" density="compact" aria-label={copy.editorSettings}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="save"
                      onClick={saveSourceFile}
                      disabled={!invoke || editorBusy || !sourceFile || !currentSourceDirty}
                    >
                      <CheckCircle2 size={14} aria-hidden="true" />
                      <span>{editorBusy ? copy.saving : copy.saveCurrent}</span>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setSourceEditorViewMode((current) => (current === "edit" ? "diff" : "edit"))}>
                      <FileSearch size={14} aria-hidden="true" />
                      <span>{sourceEditorViewMode === "edit" ? copy.diffMode : copy.editMode}</span>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={copyCurrentSourceDraft}>
                      <Copy size={14} aria-hidden="true" />
                      <span>{copy.copyFile}</span>
                    </Button>
                  </ActionGroup>
                </div>
                {sourceDiff && (
                  <div className={`source-diff-review ${sourceDiff.dirty ? "dirty" : "clean"}`}>
                    <header>
                      <div>
                        <span>{sourceDiff.dirty ? copy.dirty : copy.clean}</span>
                        <strong>
                          +{sourceDiff.addedLines} / -{sourceDiff.removedLines} / {sourceDiff.changedLines} changed
                        </strong>
                      </div>
                      <small>backup save gate</small>
                    </header>
                    {sourceDiff.preview.length > 0 && (
                      <div className="source-diff-preview">
                        {sourceDiff.preview.map((item) => (
                          <article key={item.line}>
                            <span>line {item.line}</span>
                            <code>- {item.before || "<empty>"}</code>
                            <code>+ {item.after || "<empty>"}</code>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {sourceEditorViewMode === "diff" ? (
                  <div className="monaco-editor-shell diff-shell">
                    <MonacoDiffEditor
                      beforeMount={definePlatformMonacoTheme}
                      height="100%"
                      language={monacoLanguageFromPath(sourceFile.relativePath)}
                      loading={<div className="monaco-editor-loading">Loading Monaco diff</div>}
                      modified={sourceDraft}
                      options={monacoDiffEditorOptions}
                      original={sourceFile.content}
                      theme={platformMonacoTheme}
                    />
                  </div>
                ) : (
                  <div className="monaco-editor-shell">
                    <MonacoEditor
                      beforeMount={definePlatformMonacoTheme}
                      height="100%"
                      language={monacoLanguageFromPath(sourceFile.relativePath)}
                      loading={<div className="monaco-editor-loading">Loading Monaco editor</div>}
                      onMount={handleSourceEditorMount}
                      onChange={(value) => updateSourceDraft(value ?? "", { immediate: false })}
                      options={activeMonacoEditorOptions}
                      path={`file:///${sourceFile.relativePath.replace(/^\/+/, "")}`}
                      theme={platformMonacoTheme}
                      value={sourceDraft}
                    />
                  </div>
                )}
                {sourceCopyNotice && <p className="source-copy-notice">{sourceCopyNotice}</p>}
                {writeReport && (
                  <div className="source-inline-save-receipt" role="status">
                    <span className="source-result-status-mark">
                      <CheckCircle2 size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <span>{uiLanguage === "ko" ? "저장 완료" : "Saved"}</span>
                      <strong>{writeReport.relativePath}</strong>
                      <code>{writeReport.backupPath}</code>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="empty-state">{copy.noFileOpen}</p>
            )}
          </div>
          )}

          {sourceWorkbenchView === "results" && (
            <div className="source-save-results source-results-panel">
              <header className="source-results-hero">
                <span className="source-results-hero-icon">
                  <ClipboardCheck size={18} aria-hidden="true" />
                </span>
                <div>
                  <span>{uiLanguage === "ko" ? "수정 결과" : "Edit results"}</span>
                  <strong>
                    {sourceSaveResults.length > 0
                      ? uiLanguage === "ko"
                        ? `${sourceSaveResults.length}개 저장됨`
                        : `${sourceSaveResults.length} saved`
                      : uiLanguage === "ko"
                        ? "저장 기록 없음"
                        : "No saved changes"}
                  </strong>
                  <small>
                    {latestSourceSaveResult
                      ? latestSourceSaveResult.relativePath
                      : uiLanguage === "ko"
                        ? "최근 저장 파일 없음"
                        : "No recent saved file"}
                  </small>
                </div>
              </header>
              <div className="source-results-summary">
                <article>
                  <span>{uiLanguage === "ko" ? "최근 파일" : "Latest file"}</span>
                  <strong>{latestSourceSaveResult?.relativePath || "-"}</strong>
                </article>
                <article>
                  <span>{uiLanguage === "ko" ? "저장 용량" : "Saved size"}</span>
                  <strong>{formatBytes(sourceSaveTotalBytes)}</strong>
                </article>
                <article>
                  <span>{uiLanguage === "ko" ? "백업 상태" : "Backup state"}</span>
                  <strong>{sourceSaveResults.length > 0 ? (uiLanguage === "ko" ? "생성됨" : "Created") : "-"}</strong>
                </article>
              </div>
              <div className="source-results-list">
                {sourceSaveResults.length > 0 ? (
                  sourceSaveResults.map((report) => (
                    <article className="source-save-result-card" key={`${report.relativePath}-${report.backupPath}`}>
                      <span className="source-result-status-mark">
                        <CheckCircle2 size={16} aria-hidden="true" />
                      </span>
                      <div className="source-result-content">
                        <div className="source-result-titleline">
                          <span className="source-result-lozenge">{report.status}</span>
                          <strong>{report.relativePath}</strong>
                        </div>
                        <div className="source-result-meta">
                          <span>
                            <Database size={13} aria-hidden="true" />
                            {formatBytes(report.sizeBytes)}
                          </span>
                          <span>
                            <ShieldCheck size={13} aria-hidden="true" />
                            {uiLanguage === "ko" ? "백업 생성" : "backup created"}
                          </span>
                        </div>
                        <code className="source-result-backup-path">{report.backupPath}</code>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="source-results-empty">
                    <span className="source-result-status-mark muted">
                      <ClipboardCheck size={16} aria-hidden="true" />
                    </span>
                    <strong>{uiLanguage === "ko" ? "아직 저장 결과가 없습니다." : "No save results yet."}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
        </div>
      </section>
    </div>
    );
  }

  if (!interactionContentReady) {
    return (
      <div className="content-grid desktop-grid">
        <section className="desktop-hero">
          <div>
            <p className="eyebrow">{uiLanguage === "ko" ? "데스크톱 런타임" : "Desktop Runtime"}</p>
            <h2>{uiLanguage === "ko" ? "플랫폼이 먼저 실행됩니다" : "Platform-first host"}</h2>
            <p>
              {uiLanguage === "ko"
                ? "플랫폼을 먼저 실행하고 그 위에 Codex, Gemini CLI, Claude Code CLI, OpenCode, Claw Code 같은 게스트 어댑터를 올립니다."
                : "Run the platform first, then mount Codex, Gemini CLI, Claude Code CLI, OpenCode, Claw Code, and other guest adapters on top."}
            </p>
          </div>
          <div className={`desktop-runtime-state state-${runtimeState}`}>
            <span>{runtimeState}</span>
            <strong>{availableCount} / {adapters.length}</strong>
            <small>{uiLanguage === "ko" ? "사용 가능한 게스트 어댑터" : "available guest adapters"}</small>
          </div>
        </section>

        <section className="panel wide intellij-run-workbench-panel desktop-interaction-prerender" aria-busy="true">
          <div className="ide-run-toolbar">
            <div className="ide-run-selector">
              <span>
                <PlayCircle size={15} aria-hidden="true" />
                Run Configuration
              </span>
              <strong>{uiLanguage === "ko" ? "실행 작업대 준비 중" : "Preparing runtime workbench"}</strong>
              <small>{selectedAdapter?.label || selectedSessionAdapterId} / {selectedMode.label}</small>
            </div>
          </div>
          <div className="desktop-interaction-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-grid desktop-grid">
      <section className="desktop-hero">
        <div>
            <p className="eyebrow">{uiLanguage === "ko" ? "데스크톱 런타임" : "Desktop Runtime"}</p>
            <h2>{uiLanguage === "ko" ? "플랫폼이 먼저 실행됩니다" : "Platform-first host"}</h2>
            <p>
              {uiLanguage === "ko"
                ? "플랫폼을 먼저 실행하고 그 위에 Codex, Gemini CLI, Claude Code CLI, OpenCode, Claw Code 같은 게스트 어댑터를 올립니다. 플랫폼은 작업 상태, 결정함, 산출물, 검증, 소스 편집을 소유하고 CLI는 선택형 실행 경로로만 사용됩니다."
                : "Run the platform first, then mount Codex, Gemini CLI, Claude Code CLI, OpenCode, Claw Code, and other guest adapters on top. The platform owns task state, the decision inbox, artifacts, validation, and source editing while CLIs run only as optional lanes."}
            </p>
        </div>
        <div className={`desktop-runtime-state state-${runtimeState}`}>
          <span>{runtimeState}</span>
          <strong>{availableCount} / {adapters.length}</strong>
            <small>{uiLanguage === "ko" ? "사용 가능한 게스트 어댑터" : "available guest adapters"}</small>
        </div>
      </section>

      <section className="panel wide agent-cli-cockpit" data-agent-cli-cockpit="open-source-control-plane">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{uiLanguage === "ko" ? "오픈소스 패턴 적용" : "Open-source pattern transfer"}</p>
            <h2>{uiLanguage === "ko" ? "Agent CLI Cockpit" : "Agent CLI Cockpit"}</h2>
          </div>
          <div className="agent-cli-cockpit-tally" aria-label={uiLanguage === "ko" ? "CLI cockpit 요약" : "CLI cockpit summary"}>
            <span>{cockpitStats.available}/{cockpitStats.adapters} CLI</span>
            <span>{cockpitStats.activeSessions} active</span>
            <span>{cockpitStats.decisionItems} inbox</span>
            <span>{cockpitStats.taskRuns} runs</span>
          </div>
        </div>

        <div className="agent-cli-pattern-strip" aria-label={uiLanguage === "ko" ? "직접 탐구한 오픈소스 패턴" : "Directly inspected open-source patterns"}>
          {openSourceControlPlanePatterns.map((pattern) => (
            <article key={pattern.id}>
              <span>{pattern.label}</span>
              <strong>{pattern.detail}</strong>
            </article>
          ))}
        </div>

        <div className="agent-cli-cockpit-grid">
          {agentCliCockpitRows.map((row) => (
            <article
              key={row.adapter.adapterId}
              className={`agent-cli-cockpit-card ${row.selected ? "selected" : ""} ${row.adapter.available ? "available" : "missing"}`}
            >
              <header>
                <div>
                  <span>{row.statusLabel}</span>
                  <strong>{row.adapter.label}</strong>
                </div>
                <em>{row.readinessLabel}</em>
              </header>
              <div className="agent-cli-cockpit-command">
                <code>{row.adapter.resolvedPath || row.adapter.command}</code>
                <small>{row.adapter.version || row.adapter.lastError || row.guide?.verifyCommand || row.adapter.command}</small>
              </div>
              <div className="agent-cli-setup-ladder" data-agent-cli-setup-ladder={row.adapter.adapterId}>
                {row.setupSteps.map((step) => (
                  <article key={step.id} className={step.ready ? "ready" : "pending"} data-cli-setup-step={step.id}>
                    <span>{step.ready ? <CheckCircle2 size={13} aria-hidden="true" /> : <AlertTriangle size={13} aria-hidden="true" />}</span>
                    <div>
                      <strong>{step.label}</strong>
                      <small>{step.detail}</small>
                    </div>
                  </article>
                ))}
              </div>
              <div className="agent-cli-command-stack" aria-label={uiLanguage === "ko" ? "CLI 명령 복사" : "Copy CLI commands"}>
                {row.setupSteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    data-cli-command-copy={`${row.adapter.adapterId}:${step.id}`}
                    onClick={() => void writeClipboardText(step.command || step.detail)}
                    title={step.command || step.detail}
                  >
                    <Copy size={13} aria-hidden="true" />
                    <span>{step.label}</span>
                  </button>
                ))}
              </div>
              <div className="agent-cli-cockpit-signals">
                <span>{row.authStatus}</span>
                <span>{row.activeAdapterSessions.length}/{row.adapterSessions.length} sessions</span>
                <span>{row.adapterTaskRuns.length} task-runs</span>
                <span>{row.adapterDecisionItems} decisions</span>
              </div>
              <div className="agent-cli-cockpit-actions">
                <button
                  type="button"
                  onClick={() => setSelectedSessionAdapterId(row.adapter.adapterId)}
                  className={row.selected ? "active" : ""}
                >
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{row.selected ? uiLanguage === "ko" ? "선택됨" : "Selected" : uiLanguage === "ko" ? "선택" : "Select"}</span>
                </button>
                <button
                  type="button"
                  className={
                    desktopActionFeedback?.id === "start-cockpit-adapter" && selectedSessionAdapterId === row.adapter.adapterId
                      ? `desktop-action-current status-${desktopActionFeedback.status}`
                      : undefined
                  }
                  data-desktop-action-feedback="start-cockpit-adapter"
                  onClick={() => void runDesktopAction("start-cockpit-adapter", () => startAdapterFromCockpit(row.adapter.adapterId))}
                  disabled={!runtimeReady || runningAdapterId !== "" || !row.adapter.available}
                >
                  <PlayCircle size={14} aria-hidden="true" />
                  <span>{uiLanguage === "ko" ? "시작" : "Start"}</span>
                </button>
                <button type="button" onClick={() => onOpenSettings(row.adapter.available ? "session" : "adapter")}>
                  <Settings size={14} aria-hidden="true" />
                  <span>{row.adapter.available ? uiLanguage === "ko" ? "모드" : "Mode" : uiLanguage === "ko" ? "설치" : "Install"}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel wide intellij-run-workbench-panel" aria-label={uiLanguage === "ko" ? "IDE식 실행 작업대" : "IDE-style run workbench"}>
        <div className="ide-run-toolbar">
          <div className="ide-run-selector">
            <span>
              <PlayCircle size={15} aria-hidden="true" />
	              {uiLanguage === "ko" ? "실행 구성" : "Run Configuration"}
            </span>
            <strong>{uiLanguage === "ko" ? "작업 실행 구성" : "Task run configurations"}</strong>
            <small>{selectedAdapter?.label || selectedSessionAdapterId} / {selectedMode.label} / {workspaceExplorerRootLabel}</small>
          </div>
          <div className="ide-run-actions">
            <button className="ide-toolbar-button primary" type="button" onClick={() => void runDesktopAction("start-selected-lane", startSession)} disabled={!runtimeReady || runningAdapterId !== ""}>
              <PlayCircle size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "실행" : "Run"}</span>
            </button>
            <button className="ide-toolbar-button" type="button" onClick={() => {
              setTerminalDrawerOpen(true);
              setDesktopActionStatus("open-terminal", "done", uiLanguage === "ko" ? "하단 터미널 패널을 열었습니다." : "Opened the bottom terminal panel.");
            }}>
              <SquareTerminal size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
            </button>
            <button className="ide-toolbar-button" type="button" onClick={() => onOpenSettings("quick")}>
              <Settings size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "설정" : "Settings"}</span>
            </button>
          </div>
        </div>

        <div className="ide-tool-window-layout">
          <nav className="ide-tool-window-rail" aria-label={uiLanguage === "ko" ? "도구 창" : "Tool windows"}>
            <button type="button" className="active" onClick={() => void runDesktopAction("start-selected-lane", startSession)} disabled={!runtimeReady || runningAdapterId !== ""}>
              <PlayCircle size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "실행" : "Run"}</span>
            </button>
            <button type="button" onClick={() => void refreshAdapters()}>
              <Activity size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "서비스" : "Services"}</span>
            </button>
            <button type="button" onClick={() => onOpenSettings("questions")}>
              <AlertTriangle size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "문제" : "Problems"}</span>
            </button>
            <button type="button" onClick={() => {
              setTerminalDrawerOpen(true);
              setDesktopActionStatus("open-terminal", "done", uiLanguage === "ko" ? "하단 터미널 패널을 열었습니다." : "Opened the bottom terminal panel.");
            }}>
              <SquareTerminal size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
            </button>
          </nav>

          <div className="ide-run-config-list">
            <div className="ide-window-header">
              <div>
                <span>{uiLanguage === "ko" ? "실행 구성" : "Run Configurations"}</span>
                <strong>{uiLanguage === "ko" ? "에이전트 작업을 여기서 시작" : "Start agent work here"}</strong>
              </div>
              <small>{uiLanguage === "ko" ? `${ideRunConfigurations.length}개 구성` : `${ideRunConfigurations.length} configs`}</small>
            </div>
            {ideRunConfigurations.map((configuration) => {
              const Icon = configuration.icon;
              return (
                <article key={configuration.id} className={`ide-run-config-card status-${configuration.status}`}>
                  <div className="ide-config-icon">
                    <Icon size={17} aria-hidden="true" />
                  </div>
                  <div className="ide-config-body">
                    <header>
                      <div>
                        <span>{configuration.statusLabel}</span>
                        <strong>{configuration.title}</strong>
                      </div>
                      <em>{configuration.status}</em>
                    </header>
                    <p>{configuration.subtitle}</p>
                    <small>{configuration.detail}</small>
                    <div className="ide-config-actions">
                      <button type="button" onClick={() => void configuration.onPrimary()} disabled={configuration.primaryDisabled}>
                        <PlayCircle size={14} aria-hidden="true" />
                        <span>{configuration.primaryLabel}</span>
                      </button>
                      {configuration.onSecondary && configuration.secondaryLabel && (
                        <button type="button" onClick={() => void configuration.onSecondary?.()} disabled={configuration.secondaryDisabled}>
                          <Settings size={14} aria-hidden="true" />
                          <span>{configuration.secondaryLabel}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="ide-services-window">
            <div className="ide-window-header">
              <div>
	                <span>{uiLanguage === "ko" ? "서비스" : "Services"}</span>
                <strong>{uiLanguage === "ko" ? "실행 가능한 연결" : "Runnable connections"}</strong>
              </div>
              <button type="button" onClick={() => void refreshAdapters()} disabled={!runtimeReady}>
                <RefreshCw size={14} aria-hidden="true" />
                <span>{uiLanguage === "ko" ? "새로고침" : "Refresh"}</span>
              </button>
            </div>
            <div className="ide-service-list">
              {ideServiceRows.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.id} className={`ide-service-row status-${service.statusClass}`}>
                    <Icon size={15} aria-hidden="true" />
                    <div>
                      <strong>{service.label}</strong>
                      <span>{service.detail}</span>
                    </div>
                    <em>{service.status}</em>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="ide-problems-strip" aria-label={uiLanguage === "ko" ? "문제 목록" : "Problems"}>
          <div className="ide-window-header">
            <div>
	              <span>{uiLanguage === "ko" ? "문제" : "Problems"}</span>
              <strong>{visibleIdeProblems.length ? uiLanguage === "ko" ? "지금 막는 항목" : "Current blockers" : uiLanguage === "ko" ? "막힌 항목 없음" : "No blocking items"}</strong>
            </div>
	            <small>{uiLanguage === "ko" ? `${visibleIdeProblems.length}개 항목` : `${visibleIdeProblems.length} items`}</small>
          </div>
          <div className="ide-problem-list">
            {visibleIdeProblems.length > 0 ? (
              visibleIdeProblems.map((problem) => (
                <article key={problem.id} className={`ide-problem-row severity-${problem.severity}`}>
                  <AlertTriangle size={15} aria-hidden="true" />
                  <div>
                    <strong>{problem.title}</strong>
                    <span>{problem.detail}</span>
                  </div>
                  {problem.onAction && problem.actionLabel && (
                    <button type="button" onClick={() => void problem.onAction?.()}>
                      <span>{problem.actionLabel}</span>
                    </button>
                  )}
                </article>
              ))
            ) : (
              <article className="ide-problem-row severity-info">
                <CheckCircle2 size={15} aria-hidden="true" />
                <div>
                  <strong>{uiLanguage === "ko" ? "실행 전 확인된 주요 문제 없음" : "No major pre-run issues"}</strong>
	                  <span>{uiLanguage === "ko" ? "필요하면 서비스에서 CLI와 모델 상태를 다시 점검하세요." : "Refresh Services if you need to recheck CLI and model status."}</span>
                </div>
              </article>
            )}
          </div>
        </div>

        <div className="ide-status-bar" aria-label={uiLanguage === "ko" ? "실행 상태바" : "Run status bar"}>
          {ideStatusItems.map((item) => (
            <span key={item.label}>
              <strong>{item.label}</strong>
              {item.value}
            </span>
          ))}
        </div>
      </section>

      <section className="panel wide quick-start-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Quick Start</p>
            <h2>{uiLanguage === "ko" ? "바로 쓰기" : "Start now"}</h2>
          </div>
          <span className="result-count">{selectedMode.label}</span>
        </div>
        <div className="quick-start-flow">
          <button
            type="button"
            className={desktopActionButtonClass("choose-workspace")}
            data-desktop-action-feedback="choose-workspace"
            onClick={() => void runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)}
            disabled={!invoke || workspaceHostBusy !== ""}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "choose" ? copy.choosingFolder : copy.chooseFolder}</span>
	            <small>{desktopWorkspace?.activeWorkspacePath || (uiLanguage === "ko" ? "네이티브 권한 요청" : "native permission request")}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("check-adapters")}
            data-desktop-action-feedback="check-adapters"
            onClick={() => void runDesktopAction("check-adapters", runAllHealthChecks)}
            disabled={!invoke || runningAdapterId !== ""}
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "CLI 자동 확인" : "Check CLIs"}</span>
	            <small>{uiLanguage === "ko" ? `${availableCount} / ${adapters.length} 준비됨` : `${availableCount} / ${adapters.length} ready`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-search-agent")}
            data-desktop-action-feedback="open-search-agent"
            onClick={() => void runDesktopAction("open-search-agent", onOpenSearchAgentWorkbench || startDefaultSearchAgent)}
            disabled={!onOpenSearchAgentWorkbench && (!invoke || runningAdapterId !== "")}
          >
            <Search size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "검색 에이전트 작업 채팅" : "Search agent chat"}</span>
            <small>{researchInsightAgentId}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-terminal")}
            data-desktop-action-feedback="open-terminal"
            onClick={() => {
              setTerminalDrawerOpen(true);
              setDesktopActionStatus("open-terminal", "done", uiLanguage === "ko" ? "하단 터미널 패널을 열었습니다." : "Opened the bottom terminal panel.");
            }}
          >
            <SquareTerminal size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "하단 터미널 열기" : "Open terminal drawer"}</span>
	            <small>{terminalDrawerOpen ? (uiLanguage === "ko" ? "열림" : "open") : uiLanguage === "ko" ? "하단 패널" : "bottom panel"}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("start-selected-lane")}
            data-desktop-action-feedback="start-selected-lane"
            onClick={() => void runDesktopAction("start-selected-lane", startSession)}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <PlayCircle size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "선택한 실행 경로 시작" : "Start selected lane"}</span>
            <small>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</small>
          </button>
        </div>
        {renderDesktopActionFeedbackCard("quick-start")}
      </section>

      <details
        className="section-secondary-disclosure"
        open={runtimeDiagnosticsOpen}
        onToggle={(event) => setRuntimeDiagnosticsOpen(event.currentTarget.open)}
      >
        <summary>
          <span>{uiLanguage === "ko" ? "운영 진단 패널 열기" : "Open runtime diagnostics"}</span>
	          <small>{uiLanguage === "ko" ? "지표, 빠른 실행, 작업공간, 작업 파이프라인, 데이터 경계" : "Metrics, commands, workspace, task pipe, data boundary"}</small>
        </summary>
        {runtimeDiagnosticsOpen && (
        <div className="section-secondary-stack">
      <section className="metrics-band">
	        <Metric label={uiLanguage === "ko" ? "게스트 어댑터" : "Guest Adapters"} value={adapters.length} icon={Network} tone="green" />
	        <Metric label={uiLanguage === "ko" ? "사용 가능" : "Available"} value={availableCount} icon={CheckCircle2} tone="blue" />
	        <Metric label={uiLanguage === "ko" ? "작업 파이프라인" : "Task Pipes"} value={pipelineReports.length} icon={GitBranch} tone="rose" />
	        <Metric label={uiLanguage === "ko" ? "실행 기록" : "Task Runs"} value={taskRunRecords.length} icon={FileSearch} tone="blue" />
	        <Metric label={uiLanguage === "ko" ? "축적 기록" : "Accumulated"} value={accumulatedDataStats.records} icon={Database} tone="slate" />
	        <Metric label={uiLanguage === "ko" ? "결정 항목" : "Decision Items"} value={decisionPrompts.length + blockedTaskCount + openInboxDecisions.length} icon={Inbox} tone="amber" />
	        <Metric label={uiLanguage === "ko" ? "에이전트 설정" : "Agent Configs"} value={agentCatalogCount} icon={Bot} tone="violet" />
	        <Metric label={uiLanguage === "ko" ? "자동 보류" : "Auto Deferred"} value={sessionStats.autoDeferred} icon={ShieldCheck} tone="slate" />
	        <Metric label={uiLanguage === "ko" ? "공개 차단 요소" : "Public Blockers"} value={serviceReadinessStats.publicBlockers} icon={AlertTriangle} tone="amber" />
	        <Metric label={uiLanguage === "ko" ? "소스 파일" : "Source Files"} value={sourceFileCount} icon={Code2} tone="green" />
      </section>

      <section className="panel wide desktop-command-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Command Palette</p>
            <h2>빠른 실행</h2>
          </div>
          <Search size={18} aria-hidden="true" />
        </div>
        <div className="desktop-command-grid">
          <button
            type="button"
            className={desktopActionButtonClass("check-adapters")}
            data-desktop-action-feedback="check-adapters"
            onClick={() => void runDesktopAction("check-adapters", runAllHealthChecks)}
            disabled={!invoke || runningAdapterId !== ""}
          >
            <Network size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "CLI 어댑터 확인" : "Check CLI adapters"}</span>
	            <small>{uiLanguage === "ko" ? `${availableCount}개 사용 가능` : `${availableCount} available`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("start-selected-lane")}
            data-desktop-action-feedback="start-selected-lane"
            onClick={() => void runDesktopAction("start-selected-lane", startSession)}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <SquareTerminal size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "선택한 실행 경로 시작" : "Start selected lane"}</span>
            <small>{selectedMode.label}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-search-agent")}
            data-desktop-action-feedback="open-search-agent"
            onClick={() => void runDesktopAction("open-search-agent", onOpenSearchAgentWorkbench || startDefaultSearchAgent)}
            disabled={!onOpenSearchAgentWorkbench && (!invoke || runningAdapterId !== "")}
          >
            <Search size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "검색 에이전트 작업 채팅" : "Search agent chat"}</span>
            <small>research_insight_agent</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("init-task-pipe")}
            data-desktop-action-feedback="init-task-pipe"
            onClick={() => void runDesktopAction("init-task-pipe", initTaskPipe)}
            disabled={!invoke || runningAdapterId !== ""}
          >
            <GitBranch size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "작업 파이프라인 시작" : "Init task pipe"}</span>
            <small>{selectedTaskPipe.label}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-decisions")}
            data-desktop-action-feedback="refresh-decisions"
            onClick={() => void runDesktopAction("refresh-decisions", refreshDecisionInbox)}
            disabled={!invoke || decisionBusy}
          >
            <Inbox size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "결정함 새로고침" : "Refresh decisions"}</span>
	            <small>{uiLanguage === "ko" ? `${openInboxDecisions.length}개 열림` : `${openInboxDecisions.length} open`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-task-runs")}
            data-desktop-action-feedback="refresh-task-runs"
            onClick={() => void runDesktopAction("refresh-task-runs", refreshTaskRunRecords)}
            disabled={!invoke || runningAdapterId !== ""}
          >
            <FileSearch size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "실행 기록 새로고침" : "Refresh task runs"}</span>
	            <small>{uiLanguage === "ko" ? `${taskRunRecords.length}개 기록` : `${taskRunRecords.length} records`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-accumulated-data")}
            data-desktop-action-feedback="refresh-accumulated-data"
            onClick={() => void runDesktopAction("refresh-accumulated-data", refreshAccumulatedDataOverview)}
            disabled={!invoke || accumulatedDataBusy}
          >
            <Database size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "축적 데이터" : "Accumulated data"}</span>
	            <small>{uiLanguage === "ko" ? `${accumulatedDataStats.records}개 기록` : `${accumulatedDataStats.records} records`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-runtime-roots")}
            data-desktop-action-feedback="refresh-runtime-roots"
            onClick={() => void runDesktopAction("refresh-runtime-roots", refreshRuntimeDataBoundary)}
            disabled={!invoke || runtimeDataBusy !== ""}
          >
            <Activity size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "런타임 루트" : "Runtime roots"}</span>
	            <small>{uiLanguage === "ko" ? `${runtimeDataStats.ready}/${runtimeDataStats.roots || "?"} 준비됨` : `${runtimeDataStats.ready}/${runtimeDataStats.roots || "?"} ready`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("audit-payload")}
            data-desktop-action-feedback="audit-payload"
            onClick={() => void runDesktopAction("audit-payload", runInstallerPayloadAudit)}
            disabled={!invoke || runtimeDataBusy !== ""}
          >
            <ShieldCheck size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "페이로드 감사" : "Audit payload"}</span>
	            <small>{payloadAudit ? (uiLanguage === "ko" ? `${payloadAudit.flaggedCount}개 발견` : `${payloadAudit.flaggedCount} findings`) : uiLanguage === "ko" ? "미검사" : "not scanned"}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("create-support-bundle")}
            data-desktop-action-feedback="create-support-bundle"
            onClick={() => void runDesktopAction("create-support-bundle", createSupportDiagnosticBundle)}
            disabled={!invoke || runtimeDataBusy !== ""}
          >
            <FileSearch size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "지원 번들" : "Support bundle"}</span>
	            <small>{supportBundle?.status || (uiLanguage === "ko" ? "민감정보 제거 내보내기" : "redacted export")}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-service-readiness")}
            data-desktop-action-feedback="refresh-service-readiness"
            onClick={() => void runDesktopAction("refresh-service-readiness", refreshServiceReadiness)}
            disabled={!invoke || serviceReadinessBusy}
          >
            <ShieldCheck size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "서비스 준비도" : "Service readiness"}</span>
	            <small>{serviceReadiness ? (uiLanguage === "ko" ? `${serviceReadiness.score} / 차단 ${serviceReadiness.publicBlockers.length}개` : `${serviceReadiness.score} / ${serviceReadiness.publicBlockers.length} blockers`) : uiLanguage === "ko" ? "미점검" : "not checked"}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("refresh-workspace-host")}
            data-desktop-action-feedback="refresh-workspace-host"
            onClick={() => void runDesktopAction("refresh-workspace-host", refreshDesktopWorkspace)}
            disabled={!invoke || workspaceHostBusy !== ""}
          >
            <FolderKanban size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "작업공간 호스트" : "Workspace host"}</span>
	            <small>{desktopWorkspace?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not loaded")}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("defer-questions")}
            data-desktop-action-feedback="defer-questions"
            onClick={() => void runDesktopAction("defer-questions", deferDetectedQuestions)}
            disabled={!invoke || decisionBusy || pendingQuestionCount === 0}
          >
            <ShieldCheck size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "감지된 질문 보류" : "Defer detected questions"}</span>
	            <small>{uiLanguage === "ko" ? `${pendingQuestionCount}개 대기` : `${pendingQuestionCount} pending`}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-source-review")}
            data-desktop-action-feedback="open-source-review"
            onClick={() => void runDesktopAction("open-source-review", loadSourceFile)}
            disabled={!invoke || editorBusy || !selectedSourcePath}
          >
            <GitBranch size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "소스 검토 열기" : "Open source review"}</span>
	            <small>{sourceDiff?.dirty ? (uiLanguage === "ko" ? "초안 변경됨" : "draft changed") : uiLanguage === "ko" ? "준비됨" : "ready"}</small>
          </button>
        </div>
        {renderDesktopActionFeedbackCard("command-palette")}
      </section>

      <section className="panel wide desktop-workspace-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Workspace Host</p>
            <h2>앱 워크스페이스</h2>
          </div>
          <div className="desktop-actions">
            <button
              type="button"
              className={desktopActionButtonClass("choose-workspace")}
              data-desktop-action-feedback="choose-workspace"
              onClick={() => void runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)}
              disabled={!invoke || workspaceHostBusy !== ""}
            >
              <FolderOpen size={16} aria-hidden="true" />
              <span>{workspaceHostBusy === "choose" ? "권한 요청 중" : "작업공간 접근 권한 요청"}</span>
            </button>
            <button
              type="button"
              className={desktopActionButtonClass("refresh-workspace-host")}
              data-desktop-action-feedback="refresh-workspace-host"
              onClick={() => void runDesktopAction("refresh-workspace-host", refreshDesktopWorkspace)}
              disabled={!invoke || workspaceHostBusy !== ""}
            >
              <Activity size={16} aria-hidden="true" />
	              <span>{workspaceHostBusy === "refresh" ? (uiLanguage === "ko" ? "새로고침 중" : "Refreshing") : uiLanguage === "ko" ? "새로고침" : "Refresh"}</span>
            </button>
          </div>
        </div>
        {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}

        <div className="task-run-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "상태" : "status"}</span>
	            <strong>{desktopWorkspace?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not-loaded")}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "출처" : "source"}</span>
	            <strong>{desktopWorkspace?.activeWorkspaceSource || (uiLanguage === "ko" ? "대기 중" : "pending")}</strong>
          </article>
          <article>
	            <span>git</span>
	            <strong>{desktopWorkspace?.gitAvailable ? (uiLanguage === "ko" ? "사용 가능" : "available") : uiLanguage === "ko" ? "없음" : "missing"}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "최근 작업" : "operation"}</span>
	            <strong>{desktopWorkspace?.lastOperation || (uiLanguage === "ko" ? "없음" : "none")}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "최근 상태" : "last status"}</span>
	            <strong>{desktopWorkspace?.lastStatus || (uiLanguage === "ko" ? "미설정" : "unset")}</strong>
          </article>
        </div>

        <div className="task-pipe-layout">
          <div className="task-pipe-controls">
            <label>
	              <span>{uiLanguage === "ko" ? "가져올 경로" : "Import path"}</span>
              <input
                value={workspaceImportPath}
                onChange={(event) => setWorkspaceImportPath(event.target.value)}
                placeholder="/absolute/workspace/path"
              />
            </label>
            <button
              type="button"
              className={desktopActionButtonClass("import-workspace")}
              data-desktop-action-feedback="import-workspace"
              onClick={() => void runDesktopAction("import-workspace", importDesktopWorkspace)}
              disabled={!invoke || workspaceHostBusy !== "" || !workspaceImportPath.trim()}
            >
              <FolderOpen size={16} aria-hidden="true" />
	              <span>{workspaceHostBusy === "import" ? (uiLanguage === "ko" ? "가져오는 중" : "Importing") : uiLanguage === "ko" ? "작업공간 가져오기" : "Import Workspace"}</span>
            </button>
            <label>
	              <span>{uiLanguage === "ko" ? "저장소 URL" : "Repository URL"}</span>
              <input
                value={workspaceCloneUrl}
                onChange={(event) => setWorkspaceCloneUrl(event.target.value)}
                placeholder="https://github.com/org/repo.git"
              />
            </label>
            <label>
	              <span>{uiLanguage === "ko" ? "폴더 이름" : "Folder name"}</span>
              <input
                value={workspaceCloneFolder}
                onChange={(event) => setWorkspaceCloneFolder(event.target.value)}
                placeholder="managed-workspace"
              />
            </label>
            <button
              type="button"
              className={desktopActionButtonClass("clone-workspace")}
              data-desktop-action-feedback="clone-workspace"
              onClick={() => void runDesktopAction("clone-workspace", cloneDesktopWorkspace)}
              disabled={!invoke || workspaceHostBusy !== "" || !workspaceCloneUrl.trim()}
            >
              <GitBranch size={16} aria-hidden="true" />
	              <span>{workspaceHostBusy === "clone" ? (uiLanguage === "ko" ? "복제 중" : "Cloning") : uiLanguage === "ko" ? "작업공간 복제" : "Clone Workspace"}</span>
            </button>
          </div>

          <div className="task-pipe-summary">
            <article>
	              <span>{uiLanguage === "ko" ? "현재 작업공간" : "active workspace"}</span>
	              <code>{desktopWorkspace?.activeWorkspacePath || (uiLanguage === "ko" ? "런타임 작업공간 대기 중" : "runtime workspace pending")}</code>
            </article>
            <article>
	              <span>{uiLanguage === "ko" ? "관리 루트" : "managed root"}</span>
	              <code>{desktopWorkspace?.managedWorkspaceRoot || (uiLanguage === "ko" ? "앱 데이터 작업공간 루트 대기 중" : "app data workspace root pending")}</code>
            </article>
            <article>
	              <span>{uiLanguage === "ko" ? "상태 파일" : "state file"}</span>
	              <code>{desktopWorkspace?.statePath || (uiLanguage === "ko" ? "작업공간 상태 대기 중" : "workspace state pending")}</code>
            </article>
            <article>
	              <span>{uiLanguage === "ko" ? "Git 버전" : "git version"}</span>
	              <strong>{desktopWorkspace?.gitVersion || (uiLanguage === "ko" ? "미점검" : "not checked")}</strong>
            </article>
          </div>
        </div>
      </section>

      <NativeGitWorkbench
        status={desktopGitStatus}
        busy={desktopGitBusy}
        notice={desktopGitNotice}
        branchName={desktopGitBranchName}
        commitMessage={desktopGitCommitMessage}
        runtimeAvailable={Boolean(invoke)}
        workspacePathFallback={desktopWorkspace?.activeWorkspacePath || ""}
        onBranchNameChange={setDesktopGitBranchName}
        onCommitMessageChange={setDesktopGitCommitMessage}
        onRunAction={(action, payload) => void runDesktopGitAction(action, payload)}
      />

      <section className="panel wide task-pipe-panel">
        <div className="panel-heading">
          <div>
	            <p className="eyebrow">{uiLanguage === "ko" ? "작업 파이프라인 초기화" : "Task Pipe Init"}</p>
            <h2>작업 기준 다중 CLI 초기화</h2>
          </div>
          <GitBranch size={18} aria-hidden="true" />
        </div>

        <div className="task-pipe-layout">
          <div className="task-pipe-controls">
            <div className="settings-controlled-summary">
              <article>
	                <span>{uiLanguage === "ko" ? "파이프라인 프리셋" : "Pipe preset"}</span>
                <strong>{selectedTaskPipe.label}</strong>
              </article>
              <article>
	                <span>{uiLanguage === "ko" ? "질문 처리" : "Question handling"}</span>
	                <strong>{autoDeferQuestions ? (uiLanguage === "ko" ? "자동 보류" : "auto-defer") : uiLanguage === "ko" ? "수동" : "manual"}</strong>
              </article>
              <button type="button" onClick={() => onOpenSettings("quick")}>
                <Settings size={15} aria-hidden="true" />
                <span>초기화 설정 변경</span>
              </button>
            </div>
            <div className="session-prompt-field task-prompt-choice-field">
	              <span>{uiLanguage === "ko" ? "작업 요청" : "Task intake"}</span>
              <div className="runtime-text-choice-grid task-prompt-choice-grid" aria-label={uiLanguage === "ko" ? "작업 요청 선택지" : "Task intake choices"}>
                {taskPipePromptChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={taskPipePrompt === choice.value ? "active" : ""}
                    aria-pressed={taskPipePrompt === choice.value}
                    onClick={() => setTaskPipePrompt(choice.value)}
                    title={choice.detail}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.detail}</small>
                    {choice.badge && <em>{choice.badge}</em>}
                  </button>
                ))}
              </div>
              <textarea
                aria-label={uiLanguage === "ko" ? "작업 요청 직접 편집" : "Edit task intake"}
                value={taskPipePrompt}
                onChange={(event) => setTaskPipePrompt(event.target.value)}
                rows={4}
              />
            </div>
            <button
              type="button"
              className={desktopActionButtonClass("init-task-pipe")}
              data-desktop-action-feedback="init-task-pipe"
              onClick={() => void runDesktopAction("init-task-pipe", initTaskPipe)}
              disabled={!invoke || runningAdapterId !== "" || !taskPipePrompt.trim()}
            >
              <Network size={16} aria-hidden="true" />
	              <span>{runningAdapterId === "task-pipe" ? (uiLanguage === "ko" ? "초기화 중" : "Initializing") : uiLanguage === "ko" ? "파이프라인 시작" : "Init Pipe"}</span>
            </button>
          </div>

          <div className="task-pipe-summary">
            <article>
	              <span>{uiLanguage === "ko" ? "프리셋" : "preset"}</span>
              <strong>{selectedTaskPipe.label}</strong>
              <small>{selectedTaskPipe.intent}</small>
            </article>
            <article>
	              <span>{uiLanguage === "ko" ? "실행 경로" : "lanes"}</span>
              <strong>{selectedTaskPipe.laneCount}</strong>
              <small>{selectedTaskPipe.adapterIds.join(" / ")}</small>
            </article>
            <article>
	              <span>{uiLanguage === "ko" ? "병합 게이트" : "merge gate"}</span>
	              <strong>{selectedTaskPipe.mergeGate}</strong>
	              <small>{uiLanguage === "ko" ? "실행 경로 출력은 플랫폼 승인 뒤에 병합됩니다" : "lane output waits for platform acceptance"}</small>
            </article>
          </div>
        </div>

        {pipelineReports.length === 0 ? (
	          <p className="empty-state">아직 초기화된 작업 파이프라인이 없습니다. 프리셋을 선택하고 파이프라인을 시작하세요.</p>
        ) : (
          <div className="task-pipe-report-grid">
            {pipelineReports.slice(0, 3).map((report) => (
              <article key={report.pipelineId} className={`task-pipe-report status-${report.status}`}>
                <header>
                  <div>
                    <span>{report.taskKind}</span>
                    <h3>{report.label}</h3>
                  </div>
                  <strong>{report.status}</strong>
                </header>
                <p>{report.workingDir}</p>
                <div className="adapter-report">
	                  <span>{uiLanguage === "ko" ? `${report.startedSessions}개 시작` : `${report.startedSessions} started`}</span>
	                  <span>{uiLanguage === "ko" ? `${report.missingLanes}개 누락` : `${report.missingLanes} missing`}</span>
	                  <span>{uiLanguage === "ko" ? `${report.pipes.length}개 파이프` : `${report.pipes.length} pipes`}</span>
                </div>
                <div className="pipe-lane-grid">
                  {report.lanes.map((lane) => (
                    <div key={`${report.pipelineId}-${lane.laneId}`}>
                      <span>{lane.laneId}</span>
                      <strong>{lane.status}</strong>
                      <small>{lane.adapterId} / {lane.role}</small>
                    </div>
                  ))}
                </div>
                <div className="pipe-edge-list">
                  {report.pipes.slice(0, 8).map((pipe) => (
                    <span key={pipe.pipeId}>
                      {pipe.fromNode} → {pipe.toNode} / {pipe.mode}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel wide accumulated-data-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Accumulated Data</p>
            <h2>축적 데이터 인덱스</h2>
          </div>
          <div className="desktop-actions">
            <button
              type="button"
              className={desktopActionButtonClass("refresh-accumulated-data")}
              data-desktop-action-feedback="refresh-accumulated-data"
              onClick={() => void runDesktopAction("refresh-accumulated-data", refreshAccumulatedDataOverview)}
              disabled={!invoke || accumulatedDataBusy}
            >
              <Database size={15} aria-hidden="true" />
	            <span>{accumulatedDataBusy ? (uiLanguage === "ko" ? "새로고침 중" : "Refreshing") : uiLanguage === "ko" ? "인덱스 새로고침" : "Refresh Index"}</span>
            </button>
          </div>
        </div>
        {accumulatedDataNotice && <p className="decision-resume-notice">{accumulatedDataNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "저장소" : "stores"}</span>
            <strong>{accumulatedDataStats.visibleStores}/{accumulatedDataStats.stores}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "기록" : "records"}</span>
            <strong>{accumulatedDataStats.records}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "총 용량" : "total size"}</span>
            <strong>{formatBytes(accumulatedDataStats.bytes)}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "최근" : "latest"}</span>
            <strong>{accumulatedDataStats.latestUpdatedAt ? formatTimeLabel(accumulatedDataStats.latestUpdatedAt) : "idle"}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "스캔 한도" : "scan cap"}</span>
            <strong>{accumulatedDataStats.boundedScanMaxFiles || "n/a"}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "형식" : "format"}</span>
            <strong>{accumulatedDataOverview?.schemaVersion || "pending"}</strong>
          </article>
        </div>

        <div className="accumulated-data-layout">
          <div className="accumulated-store-grid">
            {(accumulatedDataOverview?.stores || []).map((store) => (
              <article key={store.id} className={`accumulated-store-card status-${store.status}`}>
                <header>
                  <div>
                    <span>{store.recordType}</span>
                    <h3>{store.label}</h3>
                  </div>
                  <strong>{store.status}</strong>
                </header>
                <div className="accumulated-store-stats">
	                  <span>{uiLanguage === "ko" ? `${store.count}개 기록` : `${store.count} records`}</span>
                  <span>{formatBytes(store.sizeBytes)}</span>
                  <span>{store.latestUpdatedAt ? formatTimeLabel(store.latestUpdatedAt) : "idle"}</span>
                </div>
                <p>{store.purpose}</p>
                <PathDisclosure label="세부 경로" value={store.path} />
                <div className="adapter-report">
                  <span>{store.plane}</span>
                  <span>{store.visibility}</span>
                  <span>{store.actionLabel}</span>
                </div>
              </article>
            ))}
            {!accumulatedDataOverview && (
              <p className="empty-state">누적 데이터 인덱스가 아직 로드되지 않았습니다.</p>
            )}
          </div>

          <article className="accumulated-data-map">
            <header>
              <div>
	                <span>{accumulatedDataOverview?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not loaded")}</span>
	                <h3>{uiLanguage === "ko" ? "사용자에게 보이는 데이터 지도" : "User-visible data map"}</h3>
              </div>
              <Database size={18} aria-hidden="true" />
            </header>
            <div className="accumulated-summary-list">
              {(accumulatedDataOverview?.summary || [
	                uiLanguage === "ko"
	                  ? "인덱스를 실행하면 작업 실행, 결정, 감사, 지원 번들, 에이전트 작업공간 기록을 불러옵니다."
	                  : "Run the index to load task runs, decisions, audits, support bundles, and agent workspace records."
              ]).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="task-run-detail-meta">
              <span>{accumulatedDataOverview ? formatTimeLabel(accumulatedDataOverview.generatedAt) : "idle"}</span>
	              <span>{accumulatedDataOverview?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not-loaded")}</span>
	              <span>{accumulatedDataOverview?.formatMigrationStatus || (uiLanguage === "ko" ? "매니페스트 대기" : "manifest-pending")}</span>
            </div>
            <PathDisclosure
              label="인덱스 저장 위치"
              value={accumulatedDataOverview?.indexPath || runtimeDataBoundary?.taskRunStorePath || "runtime data root pending"}
            />
            {accumulatedDataOverview && (
              <div className="adapter-report">
                <span>{accumulatedDataOverview.schemaVersion}</span>
                <span>{accumulatedDataOverview.storageFormatVersion}</span>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="panel wide runtime-data-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Runtime Data & Support</p>
            <h2>설치형 데이터 경계</h2>
          </div>
          <div className="desktop-actions">
            <button
              type="button"
              className={desktopActionButtonClass("refresh-runtime-roots")}
              data-desktop-action-feedback="refresh-runtime-roots"
              onClick={() => void runDesktopAction("refresh-runtime-roots", refreshRuntimeDataBoundary)}
              disabled={!invoke || runtimeDataBusy !== ""}
            >
              <Activity size={15} aria-hidden="true" />
	              <span>{runtimeDataBusy === "roots" ? (uiLanguage === "ko" ? "점검 중" : "Checking") : uiLanguage === "ko" ? "루트 확인" : "Roots"}</span>
            </button>
            <button
              type="button"
              className={desktopActionButtonClass("audit-payload")}
              data-desktop-action-feedback="audit-payload"
              onClick={() => void runDesktopAction("audit-payload", runInstallerPayloadAudit)}
              disabled={!invoke || runtimeDataBusy !== ""}
            >
              <ShieldCheck size={15} aria-hidden="true" />
	              <span>{runtimeDataBusy === "payload" ? (uiLanguage === "ko" ? "감사 중" : "Auditing") : uiLanguage === "ko" ? "페이로드 감사" : "Audit Payload"}</span>
            </button>
            <button
              type="button"
              className={desktopActionButtonClass("create-support-bundle")}
              data-desktop-action-feedback="create-support-bundle"
              onClick={() => void runDesktopAction("create-support-bundle", createSupportDiagnosticBundle)}
              disabled={!invoke || runtimeDataBusy !== ""}
            >
              <FileSearch size={15} aria-hidden="true" />
	              <span>{runtimeDataBusy === "support" ? (uiLanguage === "ko" ? "생성 중" : "Creating") : uiLanguage === "ko" ? "지원 번들" : "Support Bundle"}</span>
            </button>
          </div>
        </div>
        {runtimeDataNotice && <p className="decision-resume-notice">{runtimeDataNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "루트" : "roots"}</span>
            <strong>{runtimeDataStats.roots}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "준비됨" : "ready"}</span>
            <strong>{runtimeDataStats.ready}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "생성됨" : "created"}</span>
            <strong>{runtimeDataStats.created}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "페이로드 발견" : "payload findings"}</span>
            <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "높음" : "high"}</span>
            <strong>{runtimeDataStats.highFindings}</strong>
          </article>
        </div>

        <div className="runtime-data-layout">
          <div className="runtime-root-grid">
            {(runtimeDataBoundary?.roots || []).slice(0, 10).map((root) => (
              <article key={root.id} className={root.exists ? "ready" : "missing"}>
                <header>
                  <div>
                    <span>{root.plane}</span>
                    <h3>{root.label}</h3>
                  </div>
	                  <strong>{root.created ? (uiLanguage === "ko" ? "생성됨" : "created") : root.exists ? (uiLanguage === "ko" ? "준비됨" : "ready") : uiLanguage === "ko" ? "없음" : "missing"}</strong>
                </header>
                <p>{root.purpose}</p>
                <PathDisclosure label="세부 경로" value={root.path} />
                <div className="adapter-report">
                  <span>{root.id}</span>
                  <span>{root.visibility}</span>
                </div>
              </article>
            ))}
            {!runtimeDataBoundary && (
	              <p className="empty-state">런타임 루트 상태가 아직 로드되지 않았습니다.</p>
            )}
          </div>

          <article className="runtime-audit-card">
            <header>
              <div>
                <span>{payloadAudit?.status || "not-scanned"}</span>
	                <h3>{uiLanguage === "ko" ? "설치 페이로드 감사" : "Installer Payload Audit"}</h3>
              </div>
              <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
            </header>
            <div className="task-run-detail-meta">
	              <span>{payloadAudit ? (uiLanguage === "ko" ? `${payloadAudit.scannedFiles}개 파일` : `${payloadAudit.scannedFiles} files`) : uiLanguage === "ko" ? "0개 파일" : "0 files"}</span>
              <span>{payloadAudit ? formatBytes(payloadAudit.scannedBytes) : "0 B"}</span>
              <span>{payloadAudit?.maxScanFiles ?? 0} max</span>
            </div>
	            <PathDisclosure label="감사 보고서 경로" value={payloadAudit?.auditPath || (uiLanguage === "ko" ? "감사 보고서 없음" : "No audit report yet")} />
            <div className="payload-finding-list">
              {(payloadAudit?.findings || []).slice(0, 6).map((finding) => (
                <div key={`${finding.ruleId}-${finding.path}`}>
                  <strong>{finding.severity}</strong>
                  <span>{finding.ruleId}</span>
                  <p>{finding.reason}</p>
                  <code>{finding.path}</code>
                </div>
              ))}
	              {payloadAudit && payloadAudit.findings.length === 0 && <p className="empty-state">{uiLanguage === "ko" ? "페이로드 문제를 찾지 못했습니다." : "No payload findings."}</p>}
            </div>
          </article>

          <article className="runtime-audit-card">
            <header>
              <div>
                <span>{supportBundle?.status || "not-created"}</span>
	                <h3>{uiLanguage === "ko" ? "지원 진단 번들" : "Support Diagnostic Bundle"}</h3>
              </div>
	              <strong>{supportBundle?.redacted ? (uiLanguage === "ko" ? "민감정보 제거됨" : "redacted") : uiLanguage === "ko" ? "대기 중" : "idle"}</strong>
            </header>
            <div className="support-bundle-grid">
	              <PathDisclosure label={uiLanguage === "ko" ? "매니페스트" : "Manifest"} value={supportBundle?.manifestPath || (uiLanguage === "ko" ? "매니페스트 없음" : "No manifest yet")} />
	              <PathDisclosure label={uiLanguage === "ko" ? "런타임 루트" : "Runtime roots"} value={supportBundle?.runtimeRootsPath || (uiLanguage === "ko" ? "런타임 루트 내보내기 없음" : "No runtime roots export")} />
	              <PathDisclosure label={uiLanguage === "ko" ? "페이로드 감사" : "Payload audit"} value={supportBundle?.installerPayloadAuditPath || (uiLanguage === "ko" ? "페이로드 감사 내보내기 없음" : "No payload audit export")} />
	              <PathDisclosure label={uiLanguage === "ko" ? "실행 기록 요약" : "Task run summary"} value={supportBundle?.taskRunSummaryPath || (uiLanguage === "ko" ? "실행 기록 요약 없음" : "No task-run summary")} />
	              <PathDisclosure label={uiLanguage === "ko" ? "최근 이벤트" : "Recent events"} value={supportBundle?.recentEventsPath || (uiLanguage === "ko" ? "최근 이벤트 로그 없음" : "No recent events log")} />
            </div>
          </article>
        </div>
      </section>

      <section className="panel wide service-readiness-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Service Readiness</p>
            <h2>서비스 출시 준비도</h2>
          </div>
          <div className="desktop-actions">
            <button
              type="button"
              className={desktopActionButtonClass("refresh-service-readiness")}
              data-desktop-action-feedback="refresh-service-readiness"
              onClick={() => void runDesktopAction("refresh-service-readiness", refreshServiceReadiness)}
              disabled={!invoke || serviceReadinessBusy}
            >
              <ShieldCheck size={15} aria-hidden="true" />
	              <span>{serviceReadinessBusy ? (uiLanguage === "ko" ? "점검 중" : "Checking") : uiLanguage === "ko" ? "준비도 점검" : "Run Readiness"}</span>
            </button>
          </div>
        </div>
        {serviceReadinessNotice && <p className="decision-resume-notice">{serviceReadinessNotice}</p>}
        <div className="service-domain-row" aria-label="Service readiness domains">
          <span>Runtime Data</span>
          <span>Customer Payload</span>
          <span>Support Diagnostics</span>
          <span>Workspace Onboarding</span>
          <span>Privacy & Logging</span>
          <span>Signed Distribution</span>
          <span>Update & Recovery</span>
        </div>
        <div className={`service-readiness-hero status-${serviceReadiness?.status || "unknown"}`}>
          <div>
            <span>{serviceReadiness?.releaseLane || "local_internal"}</span>
            <strong>{serviceReadiness?.status || "not checked"}</strong>
	            <p>{serviceReadiness?.serviceClaim || "서비스 준비도 보고서를 실행하면 공개 배포 차단 요소와 다음 조치가 표시됩니다."}</p>
          </div>
          <div className="service-score-ring">
            <span>{serviceReadiness?.score ?? 0}</span>
	          <small>{uiLanguage === "ko" ? "점수" : "score"}</small>
          </div>
        </div>
        <div className="task-run-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "그룹" : "groups"}</span>
            <strong>{serviceReadinessStats.passedGroups}/{serviceReadinessStats.groups}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "공개 차단 요소" : "Public blockers"}</span>
            <strong>{serviceReadinessStats.publicBlockers}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "경고" : "warnings"}</span>
            <strong>{serviceReadinessStats.warnings}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "페이로드 발견" : "payload findings"}</span>
            <strong>{serviceReadiness?.payloadFlaggedCount ?? 0}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "생성 시각" : "generated"}</span>
            <strong>{serviceReadiness ? formatTimeLabel(serviceReadiness.generatedAt) : "idle"}</strong>
          </article>
        </div>

        <div className="service-readiness-layout">
          <div className="service-group-grid">
            {(serviceReadiness?.groups || []).map((group) => (
              <article key={group.id} className={`service-group-card status-${group.status}`}>
                <header>
                  <div>
                    <span>{group.id}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <strong>{group.status}</strong>
                </header>
                <div className="adapter-report">
	                  <span>{uiLanguage === "ko" ? `${group.passedChecks}/${group.totalChecks}개 점검` : `${group.passedChecks}/${group.totalChecks} checks`}</span>
	                  <span>{uiLanguage === "ko" ? `공개 필수 ${group.checks.filter((check) => check.requiredForPublic).length}개` : `${group.checks.filter((check) => check.requiredForPublic).length} public`}</span>
                </div>
                <div className="service-check-list">
                  {group.checks.map((check) => (
                    <div key={check.id} className={`status-${check.status}`}>
                      <strong>{check.status}</strong>
                      <span>{check.label}</span>
                      <p>{check.detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
            {!serviceReadiness && (
	              <p className="empty-state">준비도 점검을 누르면 서명된 배포, 업데이트/복구, 개인정보/로그, 온보딩 부족 항목을 점검합니다.</p>
            )}
          </div>

          <article className="service-next-actions">
            <header>
              <div>
	                <span>{uiLanguage === "ko" ? `${serviceReadiness?.publicBlockers.length || 0}개 차단 요소` : `${serviceReadiness?.publicBlockers.length || 0} blockers`}</span>
	                <h3>{uiLanguage === "ko" ? "공개 차단 요소 / 다음 조치" : "Public blockers / next actions"}</h3>
              </div>
              <AlertTriangle size={18} aria-hidden="true" />
            </header>
            <div className="service-blocker-list">
              {(serviceReadiness?.nextActions || []).map((action) => (
                <div key={action.checkId} className={`status-${action.status}`}>
                  <strong>{action.status}</strong>
                  <span>{action.label}</span>
                  <p>{action.action}</p>
                </div>
              ))}
              {serviceReadiness && serviceReadiness.nextActions.length === 0 && (
	                <p className="empty-state">{uiLanguage === "ko" ? "다음 조치는 없습니다. 공개 준비 완료라고 표현하기 전 최종 릴리스 검증은 아직 필요합니다." : "No next actions. Public readiness still needs final clean release validation before release language."}</p>
              )}
              {!serviceReadiness && (
	                <p className="empty-state">공개 서비스 차단 요소는 준비도 보고서 실행 후 표시됩니다.</p>
              )}
            </div>
            <code>{serviceReadiness?.payloadAuditPath || "payload audit path pending"}</code>
          </article>
        </div>
      </section>

      <section className="panel wide task-run-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Task Run Store</p>
            <h2>저장된 실행 기록과 로그</h2>
          </div>
          <div className="desktop-actions">
	            <button
                type="button"
                className={desktopActionButtonClass("refresh-task-runs")}
                data-desktop-action-feedback="refresh-task-runs"
                onClick={() => void runDesktopAction("refresh-task-runs", refreshTaskRunRecords)}
                disabled={!invoke || runningAdapterId !== ""}
              >
	              <FileSearch size={15} aria-hidden="true" />
	              <span>{uiLanguage === "ko" ? "기록 새로고침" : "Refresh Records"}</span>
	            </button>
            <button type="button" onClick={pruneTaskRunRecords} disabled={!invoke || taskRunBusy || taskRunRecords.length <= 30}>
              <ShieldCheck size={15} aria-hidden="true" />
	              <span>{uiLanguage === "ko" ? "오래된 기록 정리" : "Prune Old"}</span>
            </button>
          </div>
        </div>
        {taskRunPruneNotice && <p className="decision-resume-notice">{taskRunPruneNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "기록" : "records"}</span>
            <strong>{taskRunRecords.length}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "진행 중" : "active"}</span>
            <strong>{taskRunStats.active}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "로그 용량" : "log bytes"}</span>
            <strong>{formatBytes(taskRunStats.outputBytes)}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "결정" : "decisions"}</span>
            <strong>{taskRunStats.decisions}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "잘림" : "truncated"}</span>
            <strong>{taskRunStats.truncated}</strong>
          </article>
        </div>
        {taskRunRecords.length === 0 ? (
	          <p className="empty-state">아직 저장된 작업 실행 기록이 없습니다. 세션이나 작업 파이프라인을 실행하면 record.json과 표준 출력/오류 로그가 생성됩니다.</p>
        ) : (
          <div className="task-run-store-layout">
            <div className="task-run-grid">
              {taskRunRecords.slice(0, 8).map((record) => (
                <article
                  key={record.recordId}
                  className={`task-run-card status-${record.status} ${selectedTaskRunRecord?.taskRunId === record.taskRunId ? "active" : ""}`}
                >
                  <header>
                    <div>
                      <span>{record.taskKind}</span>
                      <h3>{record.label}</h3>
                    </div>
                    <strong>{record.status}</strong>
                  </header>
                  <div className="task-run-meta">
                    <span>{record.adapterId}</span>
	                    <span>{record.laneId || record.pipelineId || (uiLanguage === "ko" ? "단일 실행 경로" : "single lane")}</span>
                    <span>{formatDuration(record.elapsedMs)}</span>
	                    <span>{record.exitCode ?? (uiLanguage === "ko" ? "코드 없음" : "no code")}</span>
                  </div>
                  <p>{record.recordPath}</p>
                  <div className="task-run-log-paths">
                    <code>{record.stdoutLogPath}</code>
                    <code>{record.stderrLogPath}</code>
                  </div>
                  <div className="adapter-report">
                    <span>{formatBytes(record.stdoutBytes + record.stderrBytes)}</span>
	                    <span>{uiLanguage === "ko" ? `${record.pendingDecisionPrompts}개 대기` : `${record.pendingDecisionPrompts} pending`}</span>
	                    <span>{record.autoDeferTriggered ? (uiLanguage === "ko" ? "자동 보류됨" : "auto-deferred") : uiLanguage === "ko" ? "기록됨" : "captured"}</span>
                  </div>
                  <div className="desktop-actions">
                    <button type="button" onClick={() => loadTaskRunDetail(record.taskRunId)} disabled={!invoke || taskRunBusy}>
                      <FileSearch size={15} aria-hidden="true" />
                      <span>
                        {taskRunBusy && selectedTaskRunRecord?.taskRunId === record.taskRunId
                          ? uiLanguage === "ko"
                            ? "여는 중"
                            : "Opening"
                          : uiLanguage === "ko"
                            ? "로그 열기"
                            : "Open Logs"}
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <article className="task-run-detail">
              <header>
                <div>
	                  <span>{taskRunDetail?.record.taskRunId || selectedTaskRunRecord?.taskRunId || (uiLanguage === "ko" ? "실행 기록 없음" : "no-task-run")}</span>
	                  <h3>{taskRunDetail?.record.taskKind || selectedTaskRunRecord?.taskKind || (uiLanguage === "ko" ? "실행 기록 상세" : "Task run detail")}</h3>
                </div>
                <strong>{taskRunDetail?.record.status || selectedTaskRunRecord?.status || "idle"}</strong>
              </header>
              {!taskRunDetail ? (
                <p className="empty-state">
                  {uiLanguage === "ko"
	                    ? "기록을 선택하고 로그 열기를 누르면 제한된 표준 출력/오류 미리보기와 실행 기록 JSON이 표시됩니다."
                    : "Select a record and open logs to view bounded stdout/stderr previews and the run record JSON."}
                </p>
              ) : (
                <>
                  <div className="task-run-detail-meta">
                    <span>{taskRunDetail.record.adapterId}</span>
	                    <span>{taskRunDetail.record.laneId || taskRunDetail.record.pipelineId || (uiLanguage === "ko" ? "단일 실행 경로" : "single lane")}</span>
                    <span>{formatBytes(taskRunDetail.record.stdoutBytes + taskRunDetail.record.stderrBytes)}</span>
	                    <span>{uiLanguage === "ko" ? `${taskRunDetail.maxLogPreviewBytes.toLocaleString("ko-KR")}바이트 미리보기` : `${taskRunDetail.maxLogPreviewBytes.toLocaleString("ko-KR")} byte preview`}</span>
                  </div>
                  <div className="task-run-preview-tabs">
                    <article>
                      <span>stdout{taskRunDetail.stdoutTruncated ? " / truncated" : ""}</span>
                      <pre><code>{taskRunDetail.stdoutPreview || "No stdout log"}</code></pre>
                    </article>
                    <article>
                      <span>stderr{taskRunDetail.stderrTruncated ? " / truncated" : ""}</span>
                      <pre><code>{taskRunDetail.stderrPreview || "No stderr log"}</code></pre>
                    </article>
                    <article>
                      <span>record JSON</span>
                      <pre><code>{taskRunDetail.recordJson}</code></pre>
                    </article>
                  </div>
                </>
              )}
            </article>
          </div>
        )}
      </section>

      <section className="panel wide desktop-control-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Capability Center</p>
            <h2>CLI adapter 상태</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshAdapters} disabled={runningAdapterId !== ""}>
              <Activity size={16} aria-hidden="true" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              className={desktopActionButtonClass("check-adapters")}
              data-desktop-action-feedback="check-adapters"
              onClick={() => void runDesktopAction("check-adapters", runAllHealthChecks)}
              disabled={!invoke || runningAdapterId !== ""}
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>{runningAdapterId === "all" ? "Running" : "Run All Checks"}</span>
            </button>
          </div>
        </div>

        {error && <p className="desktop-error">{error}</p>}

        <div className="desktop-health-strip">
          <article>
            <span>Shell</span>
            <strong>{health?.shell || "not connected"}</strong>
          </article>
          <article>
            <span>UI Source</span>
            <strong>{health?.uiSource || "workspace-monitor"}</strong>
          </article>
          <article>
            <span>Execution Scope</span>
            <strong>bounded pipes and scoped files</strong>
          </article>
          <article>
            <span>Platform state owner</span>
            <strong>tasks, decisions, artifacts, validation</strong>
          </article>
        </div>

        <div className="adapter-grid">
          {adapters.map((adapter) => {
            const report = reports.find((item) => item.adapterId === adapter.adapterId);
            const running = runningAdapterId === adapter.adapterId;
            const setupGuide = adapterSetupGuides[adapter.adapterId];
            return (
              <article key={adapter.adapterId} className={adapter.available ? "adapter-card available" : "adapter-card missing"}>
                <header>
                  <div>
                    <span>{adapter.adapterId}</span>
                    <h3>{adapter.label}</h3>
                  </div>
                  <strong>{adapter.available ? "available" : "missing"}</strong>
                </header>
                <p>
                  <code>{adapter.command}</code>
                  {adapter.version ? ` / ${adapter.version}` : ""}
                </p>
                <small>{adapter.resolvedPath || adapter.lastError || "No status detail"}</small>
                {setupGuide && (
                  <div className="adapter-setup-guide">
                    <span>{adapter.available ? "Verify" : "Setup"}</span>
                    <code>{adapter.available ? setupGuide.verifyCommand : setupGuide.installHint}</code>
                    <small>{setupGuide.sourceUrl}</small>
                    <small>{setupGuide.caution}</small>
                  </div>
                )}
                <div className="capability-meta-grid">
                  <span>{adapter.available ? "ready" : "setup-later"}</span>
                  <span>{providerAuthStatusForAdapter(adapter.adapterId, providerCredentialReport, uiLanguage)}</span>
                  <span>{sessions.filter((session) => session.adapterId === adapter.adapterId).length} lanes</span>
                  <span>{reports.some((item) => item.adapterId === adapter.adapterId) ? "checked" : "unchecked"}</span>
                </div>
                <div className="adapter-card-actions">
                  <button
                    type="button"
                    onClick={() => runSingleHealthCheck(adapter.adapterId)}
                    disabled={!invoke || runningAdapterId !== "" || !adapter.available}
                  >
                    <Activity size={15} aria-hidden="true" />
                    <span>{running ? "Running" : "Health Check"}</span>
                  </button>
                  <button type="button" onClick={() => onOpenSettings("providers")}>
                    <KeyRound size={15} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "계정 연결" : "Accounts"}</span>
                  </button>
                </div>
                {report && (
                  <div className="adapter-report">
                    <span>{report.status}</span>
                    <span>{report.durationMs}ms</span>
                    <span>{report.exitCode ?? "no code"}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
        </div>
        )}
      </details>

      <RuntimeTerminalDrawer
        adapters={adapters}
        autoDeferQuestions={autoDeferQuestions}
        open={terminalDrawerOpen}
        openDecisionCount={openInboxDecisions.length}
        outputEvents={outputEvents}
        runningAdapterId={runningAdapterId}
        runtimeAvailable={Boolean(invoke)}
        selectedMode={selectedMode}
        selectedOutputEvents={selectedOutputEvents}
        selectedSession={selectedSession}
        selectedSessionAdapterId={selectedSessionAdapterId}
        sessionInput={sessionInput}
        sessionPrompt={sessionPrompt}
        sessionPromptChoices={sessionPromptChoices}
        sessions={sessions}
        sessionStats={sessionStats}
        sourceDirty={Boolean(sourceDiff?.dirty)}
        uiLanguage={uiLanguage}
        workingDir={workingDir}
        workingDirOptions={workingDirOptions}
        nativePtySession={selectedNativePtySession}
        nativePtySessions={nativePtySessions}
        onCancelSession={cancelSession}
        onCancelNativePtySession={cancelNativePtySession}
        onCollapse={() => setTerminalDrawerOpen(false)}
        onDeferSession={deferSession}
        onOpen={() => setTerminalDrawerOpen(true)}
        onOpenSettings={onOpenSettings}
        onPollNativePtySession={pollNativePtySession}
        onPollSession={pollSession}
        onResizeNativePtySession={resizeNativePtySession}
        onSelectNativePtySession={setSelectedNativePtySessionId}
        onSelectSession={setSelectedSessionId}
        onSessionInputChange={setSessionInput}
        onSessionPromptChange={setSessionPrompt}
        onStartNativePtySession={startNativePtySession}
        onStartSession={startSession}
        onWorkingDirChange={setWorkingDir}
        onWriteNativePtyInput={writeNativePtyInput}
        onWriteSessionInput={writeSessionInput}
      />

      <details
        className="section-secondary-disclosure"
        open={runRecordsOpen}
        onToggle={(event) => setRunRecordsOpen(event.currentTarget.open)}
      >
        <summary>
          <span>{uiLanguage === "ko" ? "실행 기록과 결정함 열기" : "Open run records and decisions"}</span>
	          <small>{uiLanguage === "ko" ? "터미널 출력, 결정함, 근거 후보" : "Terminal output, decision inbox, evidence candidates"}</small>
        </summary>
        {runRecordsOpen && (
        <div className="section-secondary-stack">
      <section className="panel wide runtime-run-timeline-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Run Timeline</p>
            <h2>{uiLanguage === "ko" ? "작업 실행 타임라인" : "Task run timeline"}</h2>
          </div>
          <Activity size={18} aria-hidden="true" />
        </div>
        <div className="runtime-run-timeline-summary">
          <article>
            <span>{uiLanguage === "ko" ? "열린 결정" : "open decisions"}</span>
            <strong>{openInboxDecisions.length}</strong>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "활성 세션" : "active sessions"}</span>
            <strong>{sessionStats.active}</strong>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "실행 기록" : "task runs"}</span>
            <strong>{taskRunRecords.length}</strong>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "출력 신호" : "output signals"}</span>
            <strong>{outputEvents.length}</strong>
          </article>
        </div>
        {runtimeRunTimelineItems.length === 0 ? (
          <p className="empty-state">
            {uiLanguage === "ko"
              ? "아직 타임라인으로 묶을 실행 기록, 결정, 세션, 출력 신호가 없습니다."
              : "No run records, decisions, sessions, or output signals are ready for the timeline yet."}
          </p>
        ) : (
          <div className="runtime-run-timeline" aria-label={uiLanguage === "ko" ? "작업 실행 타임라인" : "Task run timeline"}>
            {runtimeRunTimelineItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`runtime-run-timeline-item tone-${item.tone}`}
                onClick={item.onAction}
                disabled={!item.onAction}
                title={item.actionLabel || item.title}
              >
                <span>{index + 1}</span>
                <item.icon size={16} aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.meta}</small>
                </div>
                <em>{item.status}</em>
              </button>
            ))}
          </div>
        )}
      </section>
      <section className="panel wide terminal-output-panel">
        <div className="panel-heading">
          <div>
	            <p className="eyebrow">{uiLanguage === "ko" ? "터미널 출력" : "Terminal Output"}</p>
	            <h2>{uiLanguage === "ko" ? "최근 범위 제한 실행 결과" : "Latest bounded run output"}</h2>
          </div>
	          <span className="result-count">{uiLanguage === "ko" ? `${reports.length}개 보고서` : `${reports.length} reports`}</span>
        </div>
        {reports.length === 0 ? (
	          <p className="empty-state">아직 실행한 CLI 상태 점검이 없습니다.</p>
        ) : (
          <div className="terminal-report-list">
            {reports.map((report) => (
              <article key={`${report.adapterId}-${report.durationMs}`}>
                <header>
                  <div>
                    <span>{report.adapterId}</span>
                    <h3>{report.label}</h3>
                  </div>
                  <strong>{report.status}</strong>
                </header>
                <pre>
                  <code>{report.output || report.stderr || "No output"}</code>
                </pre>
                {report.stderr && report.output && <small>{report.stderr}</small>}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel wide desktop-decision-panel">
        <div className="panel-heading">
          <div>
	            <p className="eyebrow">{uiLanguage === "ko" ? "결정함" : "Decision Inbox"}</p>
            <h2>보류된 사용자 결정</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshDecisionInbox} disabled={!invoke || decisionBusy}>
              <Activity size={15} aria-hidden="true" />
	              <span>{uiLanguage === "ko" ? "새로고침" : "Refresh"}</span>
            </button>
          </div>
        </div>

        <div className="decision-summary-strip">
          <article>
	            <span>{uiLanguage === "ko" ? "열림" : "open"}</span>
            <strong>{inboxReport?.openCount ?? 0}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "답변됨" : "answered"}</span>
            <strong>{inboxReport?.answeredCount ?? 0}</strong>
          </article>
          <article>
	            <span>{uiLanguage === "ko" ? "전체" : "total"}</span>
            <strong>{inboxReport?.totalCount ?? 0}</strong>
          </article>
        </div>

        {!inboxReport || inboxReport.decisions.length === 0 ? (
	          <p className="empty-state">보류된 결정함 항목이 없습니다.</p>
        ) : (
          <div className="decision-inbox-layout">
            <div className="decision-list">
              {decisionGroups.slice(0, 8).map((group) => (
                <div key={group.id} className="decision-group">
                  <header>
                    <strong>{group.label}</strong>
	                    <span>{uiLanguage === "ko" ? `${group.openCount}개 열림 / ${group.answeredCount}개 답변됨` : `${group.openCount} open / ${group.answeredCount} answered`}</span>
                  </header>
                  {group.decisions.slice(0, 6).map((decision) => (
                    <button
                      key={decision.id}
                      className={selectedDecision?.id === decision.id ? "active" : ""}
                      type="button"
                      onClick={() => setSelectedDecisionId(decision.id)}
                    >
                      <span>{decision.status}</span>
                      <strong>{decision.question}</strong>
                      <small>{decision.sessionId ? `${decision.source} / ${decision.sessionId}` : decision.source}</small>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <article className="decision-answer-box">
              {selectedDecision ? (
                <>
                  <header>
                    <div>
                      <span>{selectedDecision.priority}</span>
                      <h3>{selectedDecision.question}</h3>
                    </div>
                    <strong>{selectedDecision.status}</strong>
                  </header>
	                  <p>{selectedDecision.impact || (uiLanguage === "ko" ? "영향 설명 없음" : "No impact note")}</p>
	                  <small>{selectedDecision.resumeAction || (uiLanguage === "ko" ? "재개 작업 기록 없음" : "No resume action recorded")}</small>
                  {(selectedDecision.sessionId || selectedDecision.adapterId) && (
                    <div className="decision-resume-strip">
	                      <span>{selectedDecision.adapterId || (uiLanguage === "ko" ? "연결된 세션" : "linked session")}</span>
	                      <strong>{selectedDecision.sessionId || (uiLanguage === "ko" ? "세션 ID 없음" : "no session id")}</strong>
	                      <small>{selectedDecisionSession?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not loaded")}</small>
                    </div>
                  )}
                  {decisionResumeNotice && <p className="decision-resume-notice">{decisionResumeNotice}</p>}
                  {selectedDecision.answerText && (
                    <div className="decision-existing-answer">
                      <span>{selectedDecision.answerType || "answer"}</span>
                      <p>{selectedDecision.answerText}</p>
                    </div>
                  )}
                  <div className="decision-replay-strip" aria-label="decision replay">
                    <article>
	                      <span>{uiLanguage === "ko" ? "생성됨" : "created"}</span>
                      <strong>{selectedDecision.createdAt || "unknown"}</strong>
                    </article>
                    <article>
	                      <span>{uiLanguage === "ko" ? "차단" : "blocked"}</span>
                      <strong>{selectedDecision.blockedWorkCount}</strong>
                    </article>
                    <article>
	                      <span>{uiLanguage === "ko" ? "진행 가능" : "unblocked"}</span>
                      <strong>{selectedDecision.unblockedWorkCount}</strong>
                    </article>
                    <article>
	                      <span>{uiLanguage === "ko" ? "답변됨" : "answered"}</span>
	                      <strong>{selectedDecision.answeredAt || (uiLanguage === "ko" ? "대기 중" : "pending")}</strong>
                    </article>
	                  </div>
	                  <div className="decision-answer-controls">
	                    <AppChoiceButtonGroup
	                      className="decision-answer-type-choices"
	                      density="compact"
	                      label={uiLanguage === "ko" ? "답변 유형 선택" : "Answer type choices"}
	                      value={decisionAnswerType}
	                      onChange={setDecisionAnswerType}
	                      options={[
	                        {
	                          value: "instruction",
	                          label: uiLanguage === "ko" ? "지시" : "Instruction",
	                          detail: uiLanguage === "ko" ? "다음 작업 지시" : "Next direction"
	                        },
	                        {
	                          value: "approve",
	                          label: uiLanguage === "ko" ? "승인" : "Approve",
	                          detail: uiLanguage === "ko" ? "진행 허용" : "Allow work"
	                        },
	                        {
	                          value: "edit",
	                          label: uiLanguage === "ko" ? "수정" : "Edit",
	                          detail: uiLanguage === "ko" ? "변경 요청" : "Request edits"
	                        },
	                        {
	                          value: "reject",
	                          label: uiLanguage === "ko" ? "거절" : "Reject",
	                          detail: uiLanguage === "ko" ? "진행 중단" : "Stop work"
	                        }
	                      ]}
	                    />
	                    <textarea
                      value={decisionAnswer}
                      onChange={(event) => setDecisionAnswer(event.target.value)}
                      rows={4}
                    />
                    <button
                      type="button"
                      onClick={() => answerDecision(false)}
                      disabled={!invoke || decisionBusy || !decisionAnswer.trim()}
                    >
                      <CheckCircle2 size={15} aria-hidden="true" />
	                      <span>{decisionBusy ? (uiLanguage === "ko" ? "저장 중" : "Saving") : uiLanguage === "ko" ? "답변 저장" : "Answer"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => answerDecision(true)}
                      disabled={!invoke || decisionBusy || !decisionAnswer.trim() || !canResumeSelectedDecision}
	                      title={canResumeSelectedDecision ? (uiLanguage === "ko" ? "이 답변을 연결된 CLI 세션으로 보냅니다" : "Send this answer to the linked CLI session") : uiLanguage === "ko" ? "연결된 CLI 세션이 활성 상태가 아닙니다" : "Linked CLI session is not active"}
                    >
                      <ArrowRight size={15} aria-hidden="true" />
	                      <span>{decisionBusy ? (uiLanguage === "ko" ? "재개 중" : "Resuming") : uiLanguage === "ko" ? "답변 후 재개" : "Answer & Resume"}</span>
                    </button>
                  </div>
                </>
              ) : (
	                <p className="empty-state">선택된 결정이 없습니다.</p>
              )}
            </article>
          </div>
        )}

        <div className="decision-candidate-stack">
          <div className="panel-heading compact-heading">
            <div>
	              <p className="eyebrow">{uiLanguage === "ko" ? "실시간 후보" : "Live Candidates"}</p>
              <h3>최근 CLI 질문 후보</h3>
            </div>
          </div>
          {decisionPrompts.length === 0 ? (
            <p className="empty-state">최근 실행에서 사용자 질문으로 보이는 출력은 감지되지 않았습니다.</p>
          ) : (
            <div className="stack-list">
              {decisionPrompts.map((prompt) => (
                <article key={`${prompt.lane}-${prompt.question}`}>
                  <strong>{prompt.question}</strong>
                  <p>{prompt.impact}</p>
                  <small>{prompt.resumeAction}</small>
                </article>
              ))}
            </div>
          )}
          </div>
      </section>

      <section className="panel wide evidence-panel">
        <div className="panel-heading">
          <div>
	            <p className="eyebrow">{uiLanguage === "ko" ? "근거 / 승격" : "Evidence / Promotion"}</p>
            <h2>근거와 재사용 후보</h2>
          </div>
          <FileSearch size={18} aria-hidden="true" />
        </div>
        {evidenceItems.length === 0 ? (
	          <p className="empty-state">아직 승격할 터미널 이벤트, 결정, 소스 변경, 산출물이 없습니다.</p>
        ) : (
          <div className="evidence-grid">
            {evidenceItems.map((item) => (
              <article key={item.id}>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        )}
      </section>
        </div>
        )}
      </details>

    </div>
  );
}

const MemoizedDesktopRuntimePanel = memo(DesktopRuntimePanel);

function mergeSessionReports(
  current: CliSessionReport[],
  reports: CliSessionReport[],
  options: { promote?: boolean; replaceAll?: boolean } = {}
) {
  if (reports.length === 0) {
    return current;
  }

  const currentById = new Map(current.map((session) => [session.sessionId, session]));
  const reportsById = new Map(reports.map((report) => [report.sessionId, report]));
  const reportIds = new Set(reports.map((report) => report.sessionId));

  if (options.replaceAll) {
    let changed = current.length !== reports.length;
    const next = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      if (existing && areSessionReportsRenderEqual(existing, report)) {
        return existing;
      }
      changed = true;
      return report;
    });
    return changed ? next : current;
  }

  let changed = false;
  const updated = current.map((session) => {
    const report = reportsById.get(session.sessionId);
    if (!report) {
      return session;
    }
    if (areSessionReportsRenderEqual(session, report)) {
      return session;
    }
    changed = true;
    return report;
  });
  const newReports = reports.filter((report) => !currentById.has(report.sessionId));
  if (newReports.length > 0) {
    changed = true;
  }
  if (!changed) {
    return current;
  }

  if (options.promote) {
    const promoted = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      return existing && areSessionReportsRenderEqual(existing, report) ? existing : report;
    });
    return [...promoted, ...updated.filter((session) => !reportIds.has(session.sessionId))];
  }

  return [...updated, ...newReports];
}

function mergeNativePtyReports(
  current: RuntimeNativePtySession[],
  reports: RuntimeNativePtySession[],
  options: { promote?: boolean; replaceAll?: boolean } = {}
) {
  if (reports.length === 0) {
    return current;
  }

  const currentById = new Map(current.map((session) => [session.sessionId, session]));
  const reportsById = new Map(reports.map((report) => [report.sessionId, report]));
  const reportIds = new Set(reports.map((report) => report.sessionId));

  if (options.replaceAll) {
    let changed = current.length !== reports.length;
    const next = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      if (existing && areNativePtyReportsRenderEqual(existing, report)) {
        return existing;
      }
      changed = true;
      return report;
    });
    return changed ? next : current;
  }

  let changed = false;
  const updated = current.map((session) => {
    const report = reportsById.get(session.sessionId);
    if (!report) {
      return session;
    }
    if (areNativePtyReportsRenderEqual(session, report)) {
      return session;
    }
    changed = true;
    return report;
  });
  const newReports = reports.filter((report) => !currentById.has(report.sessionId));
  if (newReports.length > 0) {
    changed = true;
  }
  if (!changed) {
    return current;
  }

  if (options.promote) {
    const promoted = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      return existing && areNativePtyReportsRenderEqual(existing, report) ? existing : report;
    });
    return [...promoted, ...updated.filter((session) => !reportIds.has(session.sessionId))];
  }

  return [...updated, ...newReports];
}

function linesFromText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function renderSearchAgentPrompt(form: SearchAgentRunForm, language: UiLanguage) {
  const objective = form.objective.trim() || defaultSearchAgentRunForm.objective;
  const questions = linesFromText(form.questions);
  const channels = linesFromText(form.searchChannels);
  const captureTargets = linesFromText(form.captureTargets);
  const notes = form.notes.trim() || defaultSearchAgentRunForm.notes;
  const dateLabel = new Date().toISOString().slice(0, 10);
  const outputLanguage = language === "ko" ? "Korean first, with English labels only when useful" : "English";

  return [
    "[Agent Platform Existing Agent Run]",
    `Agent: ${researchInsightAgentId}`,
    `Agent config: ${researchInsightAgentConfigPath}`,
    `Input schema: ${researchInsightPlanTemplatePath}`,
    "Runtime role: run the existing search/research agent from the platform, not a new ad hoc chat.",
    `Output language: ${outputLanguage}`,
    "",
    "Objective:",
    objective,
    "",
    "Search questions:",
    ...(questions.length ? questions.map((item) => `- ${item}`) : ["- Find the evidence needed for this request."]),
    "",
    "Search channels:",
    ...(channels.length ? channels.map((item) => `- ${item}`) : ["- web search", "- repository search"]),
    "",
    "Required answer-engine stages:",
    "- query_understanding",
    "- search_retrieval",
    "- source_ranking",
    "- evidence_extraction",
    "- synthesis",
    "- citation_grounding",
    "- skeptic_review",
    "",
    "Output contract:",
    "- Summarize accepted evidence with citations or local file paths.",
    "- Separate unsupported claims, uncertainty, and contrary evidence.",
    "- Produce plan_steps, validation_steps, risks_or_unknowns, and blocked_decisions.",
    "- Record what should be captured under the targets below.",
    "- Ask only source-affecting or irreversible questions; otherwise continue with reversible defaults.",
    "",
    "Capture targets:",
    ...(captureTargets.length ? captureTargets.map((item) => `- ${item.replace("YYYY", dateLabel.slice(0, 4))}`) : ["- _research/"]),
    "",
    "Notes:",
    notes
  ].join("\n");
}

function renderSearchAgentSystemPrompt(language: UiLanguage) {
  return [
    "You are the direct provider runtime for research-insight-planner-agent inside Agent Workspace Platform.",
    `Output language: ${language === "ko" ? "Korean first" : "English"}.`,
    "Use the user's task input as the work request.",
    "Return a useful work result, not a UI explanation.",
    "Separate evidence, assumptions, uncertainty, plan steps, validation steps, and blocked decisions.",
    "Do not claim that source files were edited, shell commands were run, or web pages were visited unless the prompt includes that evidence.",
    "When more execution is needed, state the exact next action that should be launched through the desktop platform."
  ].join("\n");
}

function agentFactoryPreviewSpec(form: AgentFactoryForm) {
  return {
    schema_version: "agent-factory-proposal.v1",
    status: "preview",
    target_path: form.targetPath,
    agent: {
      id: form.agentId,
      label: form.label,
      goal: form.goal,
      role: form.role,
      owner_project: form.ownerProject
    },
    tools: linesFromText(form.tools),
    guardrails: linesFromText(form.guardrails),
    output_contract: form.outputContract,
    validation: {
      commands: linesFromText(form.validationCommands),
      rollback_plan: form.rollbackPlan
    },
    traceability: {
      source: "desktop_agent_factory_wizard",
      app_data_store: "agent_factory_proposals"
    }
  };
}

function buildLearningImprovementCandidates(input: {
  blockers: CollaborationBoard["blockers"];
  evaluations: WorkspaceSnapshot["documents"];
  workSummaries: WorkspaceSnapshot["documents"];
  requestTraces: WorkspaceSnapshot["documents"];
  intentMap: IntentFeatureMap;
  nextActions: CollaborationBoard["nextActions"];
}): LearningImprovementCandidate[] {
  const candidates: LearningImprovementCandidate[] = [];
  const pushCandidate = (candidate: LearningImprovementCandidate) => {
    if (!candidates.some((item) => item.id === candidate.id)) {
      candidates.push(candidate);
    }
  };

  input.blockers.slice(0, 3).forEach((blocker) => {
    const id = safeUiSlug(`blocker-${blocker.taskId || blocker.title}`);
    pushCandidate({
      id,
      label: `Blocker to agent guardrail: ${blocker.title}`,
      source: "blocker",
      impact: blocker.blockers.join(" / ") || "Blocked work should become a reusable guardrail or routing rule.",
      evidence: [blocker.agent, blocker.taskId, ...blocker.blockers].filter(Boolean),
      assetType: "agent",
      targetPath: `agent-platform/configs/agents/${id}.json`,
      validationCommand: "PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents",
      rollbackPlan: "Remove the generated guardrail agent proposal and keep the blocker evidence as deferred."
    });
  });

  input.nextActions.slice(0, 3).forEach((action) => {
    const id = safeUiSlug(`next-${action.taskId || action.title}`);
    pushCandidate({
      id,
      label: `Handoff automation: ${action.title}`,
      source: "handoff",
      impact: action.nextAction || "Repeated handoff can become a workflow or agent routing rule.",
      evidence: [action.agent, action.taskId, action.nextAction].filter(Boolean),
      assetType: "workflow",
      targetPath: `_ops/workflows/${id}.md`,
      validationCommand: "python3 _tools/docs-audit/src/docs_audit.py --check",
      rollbackPlan: "Archive or disable the workflow candidate and keep the handoff evidence."
    });
  });

  input.evaluations.slice(0, 3).forEach((document) => {
    const id = safeUiSlug(`evaluation-${document.title}`);
    pushCandidate({
      id,
      label: `Evaluation follow-up: ${document.title}`,
      source: "evaluation",
      impact: truncateText(document.excerpt || "Evaluation record can seed a stronger validation or omission guard.", 180),
      evidence: [document.path, document.category, document.language],
      assetType: "tool",
      targetPath: `_tools/${id}/`,
      validationCommand: "corepack pnpm --filter platform-desktop-app run check",
      rollbackPlan: "Disable the promoted tool and retain the evaluation record as source evidence."
    });
  });

  input.workSummaries.slice(0, 2).forEach((document) => {
    const id = safeUiSlug(`summary-${document.title}`);
    pushCandidate({
      id,
      label: `Repeated work pattern: ${document.title}`,
      source: "work-summary",
      impact: truncateText(document.excerpt || "Work summary can reveal a repeated manual process.", 180),
      evidence: [document.path, document.category],
      assetType: "workflow",
      targetPath: `_ops/workflows/${id}.md`,
      validationCommand: "python3 _tools/docs-audit/src/docs_audit.py --check",
      rollbackPlan: "Move the workflow candidate to _archive or mark it disabled."
    });
  });

  input.requestTraces.slice(0, 2).forEach((document) => {
    const id = safeUiSlug(`trace-${document.title}`);
    pushCandidate({
      id,
      label: `Trace to reusable prompt: ${document.title}`,
      source: "request-trace",
      impact: truncateText(document.excerpt || "Trace record can become a reusable prompt or checklist.", 180),
      evidence: [document.path, document.category],
      assetType: "prompt",
      targetPath: `_ops/prompts/${id}.md`,
      validationCommand: "python3 _tools/docs-audit/src/docs_audit.py --check",
      rollbackPlan: "Delete or archive the prompt candidate and preserve the trace."
    });
  });

  input.intentMap.roadmap.now.slice(0, 3).forEach((item) => {
    const id = safeUiSlug(`intent-${item.feature}`);
    pushCandidate({
      id,
      label: `Intent roadmap candidate: ${item.feature}`,
      source: "intent-map",
      impact: item.reason || "User intent map marks this as a current improvement candidate.",
      evidence: [item.dependency, input.intentMap.sourcePath].filter(Boolean),
      assetType: "project_feature",
      targetPath: `platform-desktop-app/specs/${id}/`,
      validationCommand: "corepack pnpm --filter platform-desktop-app run check",
      rollbackPlan: "Mark the feature candidate deferred in the intent map and keep the source reason."
    });
  });

  if (candidates.length === 0) {
    pushCandidate({
      id: "seed-learning-loop-agent",
      label: "Seed learning loop agent",
      source: "fallback",
      impact: "No live candidates were found, so seed the platform with a learning loop agent proposal.",
      evidence: ["product gap registry", "learning_feedback_automation_loop"],
      assetType: "agent",
      targetPath: "agent-platform/configs/agents/workspace-improvement-agent.json",
      validationCommand: "PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents",
      rollbackPlan: "Reject the seed candidate and keep the gap registry item open."
    });
  }

  return candidates.slice(0, 10);
}

function safeUiSlug(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "candidate";
}

function areSessionReportsRenderEqual(left: CliSessionReport, right: CliSessionReport) {
  return sessionReportRenderSignature(left) === sessionReportRenderSignature(right);
}

function sessionReportRenderSignature(session: CliSessionReport) {
  return [
    session.sessionId,
    session.taskRunId,
    session.taskKind,
    session.pipelineId || "",
    session.laneId || "",
    session.status,
    session.exitCode ?? "",
    Math.floor(session.elapsedMs / SESSION_POLL_IDLE_UPDATE_BUCKET_MS),
    session.stdout.length,
    session.stdout.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.stderr.length,
    session.stderr.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.decisionPrompts
      .map((prompt) => `${prompt.lane}:${prompt.question}:${prompt.resumeAction}`)
      .join("\u001e"),
    session.outputTruncated ? "1" : "0",
    session.deferMessageSent ? "1" : "0",
    session.autoDeferQuestions ? "1" : "0",
    session.autoDeferTriggered ? "1" : "0",
    session.decisionInboxItems,
    session.pendingDecisionPrompts,
    session.deferredPromptCount,
    session.decisionCaptureError || "",
    session.taskRecordPath || "",
    session.stdoutLogPath || "",
    session.stderrLogPath || "",
    session.persistenceError || ""
  ].join("\u001f");
}

function areNativePtyReportsRenderEqual(left: RuntimeNativePtySession, right: RuntimeNativePtySession) {
  return nativePtyReportRenderSignature(left) === nativePtyReportRenderSignature(right);
}

function nativePtyReportRenderSignature(session: RuntimeNativePtySession) {
  return [
    session.sessionId,
    session.status,
    session.exitCode ?? "",
    Math.floor(session.elapsedMs / SESSION_POLL_IDLE_UPDATE_BUCKET_MS),
    session.output.length,
    session.output.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.outputTruncated ? "1" : "0",
    session.workingDir,
    session.rows,
    session.cols,
    session.pid ?? "",
    session.terminalKind
  ].join("\u001f");
}

function getTauriInvoke(): TauriInvoke | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.__TAURI__?.core?.invoke ?? null;
}

function monacoLanguageFromPath(relativePath: string) {
  const extension = relativePath.split(".").pop()?.toLowerCase() || "";
  const languageByExtension: Record<string, string> = {
    c: "c",
    cc: "cpp",
    cpp: "cpp",
    cs: "csharp",
    css: "css",
    go: "go",
    h: "cpp",
    hpp: "cpp",
    html: "html",
    java: "java",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    jsonc: "json",
    kt: "kotlin",
    md: "markdown",
    mjs: "javascript",
    py: "python",
    rs: "rust",
    scss: "scss",
    sh: "shell",
    sql: "sql",
    ts: "typescript",
    tsx: "typescript",
    toml: "toml",
    txt: "plaintext",
    yaml: "yaml",
    yml: "yaml"
  };
  return languageByExtension[extension] || "plaintext";
}

function errorMessage(caught: unknown) {
  if (caught instanceof Error) {
    return caught.message;
  }
  return String(caught);
}

function isOpenDecisionStatus(status: string) {
  return ["open", "deferred", "resuming"].includes(status);
}

function isActiveSessionStatus(status: string) {
  return ["running", "defer_message_sent"].includes(status);
}

function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60_000) {
    return `${Math.round(ms / 100) / 10}s`;
  }
  return `${Math.round(ms / 60_000)}m`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)}KB`;
  }
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;
}

function detectOutputEvents(sourceId: string, lane: string, output: string): OutputEvent[] {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const events: OutputEvent[] = [];

  for (const [index, line] of lines.entries()) {
    const lower = line.toLowerCase();
    const id = `${sourceId}-${index}`;
    if (events.length >= 8) {
      break;
    }
    if (/[?？]|\b(confirm|approve|continue|proceed|choose|select|y\/n|yes\/no)\b|선택|확인|승인|진행|질문/.test(lower)) {
      events.push({ id, type: "question", lane, label: "question candidate", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(error|failed|failure|panic|exception)\b|오류|실패/.test(lower)) {
      events.push({ id, type: "error", lane, label: "error signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(warn|warning|deprecated|caution)\b|경고|주의/.test(lower)) {
      events.push({ id, type: "warning", lane, label: "warning signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(pass|passed|fail|failed|test|tests|build|lint|typecheck)\b/.test(lower)) {
      events.push({ id, type: "test", lane, label: "validation signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/[./\w-]+\.(ts|tsx|js|jsx|mjs|json|md|rs|py|css|html)(:\d+)?/.test(line)) {
      events.push({ id, type: "file", lane, label: "file reference", detail: line.slice(0, 180) });
    }
  }

  if (events.length === 0 && lines.length > 0) {
    events.push({
      id: `${sourceId}-summary`,
      type: "info",
      lane,
      label: "output captured",
      detail: lines[0].slice(0, 180)
    });
  }

  return events;
}

function groupDecisions(decisions: HumanDecisionItem[]): DecisionGroup[] {
  const groups = new Map<string, DecisionGroup>();
  for (const decision of decisions) {
    const id = decision.sessionId || decision.source || "unlinked";
    const group = groups.get(id) || {
      id,
      label: decision.sessionId ? `${decision.adapterId || "session"} / ${decision.sessionId}` : decision.source || "unlinked",
      openCount: 0,
      answeredCount: 0,
      decisions: []
    };
    if (isOpenDecisionStatus(decision.status)) {
      group.openCount += 1;
    }
    if (decision.status === "answered" || decision.answeredAt) {
      group.answeredCount += 1;
    }
    group.decisions.push(decision);
    groups.set(id, group);
  }
  return Array.from(groups.values()).sort((left, right) => right.openCount - left.openCount || left.label.localeCompare(right.label));
}

function buildSourceDiffSummary(original: string, draft: string): SourceDiffSummary {
  const before = original.split(/\r?\n/);
  const after = draft.split(/\r?\n/);
  const max = Math.max(before.length, after.length);
  const preview: SourceDiffSummary["preview"] = [];
  let addedLines = 0;
  let removedLines = 0;
  let changedLines = 0;

  for (let index = 0; index < max; index += 1) {
    const beforeLine = before[index];
    const afterLine = after[index];
    if (beforeLine === afterLine) {
      continue;
    }
    if (beforeLine === undefined) {
      addedLines += 1;
    } else if (afterLine === undefined) {
      removedLines += 1;
    } else {
      changedLines += 1;
    }
    if (preview.length < 8) {
      preview.push({
        line: index + 1,
        before: beforeLine ?? "",
        after: afterLine ?? ""
      });
    }
  }

  return {
    dirty: addedLines + removedLines + changedLines > 0,
    addedLines,
    removedLines,
    changedLines,
    preview
  };
}

function Metric({ label, value, icon: Icon, tone }: { label: string; value: number; icon: LucideIcon; tone: string }) {
  return (
    <article className={`metric metric-${tone}`}>
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value.toLocaleString("ko-KR")}</strong>
    </article>
  );
}

function AgentFlowMap({ flows }: { flows: CollaborationBoard["flows"] }) {
  if (!flows.length) {
    return <p className="empty-state">표시할 에이전트 작업 흐름이 없습니다.</p>;
  }

  return (
    <div className="agent-flow-map">
      {flows.slice(0, 18).map((flow) => (
        <article key={flow.id} className={`flow-row flow-${flow.lane}`}>
          <div className="flow-node agent-node">
            <span>agent</span>
            <strong>{flow.agent}</strong>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-node task-node">
            <span>{flow.status}</span>
            <strong>{flow.task}</strong>
            {flow.timingTotal && <small>{flow.timingTotal}</small>}
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-node project-node">
            <span>project</span>
            <strong>{flow.project}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

function HistoryDensityChart({ days }: { days: WorkspaceSnapshot["historyDays"] }) {
  if (!days.length) {
    return <p className="empty-state">시각화할 히스토리 기록이 없습니다.</p>;
  }
  const maxCount = Math.max(...days.map((day) => day.documentsCount), 1);

  return (
    <div className="density-chart" aria-label="History density chart">
      {days.map((day) => {
        const height = Math.max(10, Math.round((day.documentsCount / maxCount) * 100));
        return (
          <article key={day.date}>
            <div className="density-bar" style={{ height: `${height}%` }} title={`${day.date}: ${day.documentsCount}`} />
            <span>{day.date.slice(5)}</span>
          </article>
        );
      })}
    </div>
  );
}

function HistoryCategoryBars({ categories }: { categories: Array<{ category: string; count: number }> }) {
  return <BarGroup title="히스토리 유형" items={categories.map((item) => ({ key: categoryLabel(item.category), count: item.count }))} />;
}

function BarGroup({ title, items }: { title: string; items: Array<{ key: string; count: number }> }) {
  if (!items.length) {
    return <p className="empty-state">{title} 데이터가 없습니다.</p>;
  }
  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="bar-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <article key={item.key}>
          <div>
            <span>{item.key}</span>
            <strong>{item.count}</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${Math.max(8, Math.round((item.count / maxCount) * 100))}%` }} />
          </div>
        </article>
      ))}
    </div>
  );
}

function DocumentList({
  documents,
  compact = false
}: {
  documents: WorkspaceSnapshot["documents"];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "document-list compact" : "document-list"}>
      {documents.map((document) => (
        <article key={document.id}>
          <div>
            <span>{categoryLabel(document.category)}</span>
            <h3>{document.title}</h3>
            <p>{document.excerpt || document.path}</p>
          </div>
          <small>{document.path}</small>
        </article>
      ))}
    </div>
  );
}

function HistoryTimeline({ days }: { days: WorkspaceSnapshot["historyDays"] }) {
  if (days.length === 0) {
    return <p className="empty-state">검색 조건에 맞는 날짜별 작업 기록이 없습니다.</p>;
  }

  return (
    <div className="timeline-list">
      {days.map((day) => (
        <article className="history-day" key={day.date}>
          <header>
            <div>
              <span className="date-label">{day.date}</span>
              <h3>{formatDay(day.date)}</h3>
            </div>
            <strong>{day.documentsCount}개 기록</strong>
          </header>
          <div className="chip-row">
            {day.categories.map((item) => (
              <span key={item.category}>
                {categoryLabel(item.category)} {item.count}
              </span>
            ))}
          </div>
          <div className="timeline-docs">
            {day.documents.slice(0, 14).map((document) => (
              <article key={document.id}>
                <span>{categoryLabel(document.category)}</span>
                <div>
                  <strong>{document.title}</strong>
                  <p>{document.path}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function summarizeCategories(documents: WorkspaceSnapshot["historyDays"][number]["documents"]) {
  const counts = new Map<string, number>();
  for (const document of documents) {
    counts.set(document.category, (counts.get(document.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
}

function documentVisibleForMode(
  document: WorkspaceSnapshot["documents"][number] | WorkspaceSnapshot["historyDays"][number]["documents"][number],
  modeId: string
) {
  if (modeId === "superadmin_developer" || modeId === "developer") {
    return true;
  }

  const userCategories = new Set(["workspace-doc", "project-doc", "work-summary", "daily-history", "philosophy"]);
  if (!userCategories.has(document.category)) {
    return false;
  }

  const hiddenPrefixes = [
    "_ops/",
    "_requirements/",
    "_specs/",
    "agent-platform/configs/",
    "agent-platform/src/",
    "agent-platform/tests/"
  ];
  return !hiddenPrefixes.some((prefix) => document.path.startsWith(prefix));
}

function documentVisibleForLanguage(
  document: WorkspaceSnapshot["documents"][number] | WorkspaceSnapshot["historyDays"][number]["documents"][number],
  mode: MonitorLanguageMode
) {
  if (document.language === "unknown") {
    return mode.includeUnknown;
  }
  return mode.includedLanguages.includes(document.language);
}

function opsEventVisibleForMode(event: UnifiedOps["events"][number], modeId: string) {
  if (modeId === "superadmin_developer" || modeId === "developer") {
    return true;
  }
  if (event.sourceType === "monitor") {
    return true;
  }
  const userCategories = new Set(["work-summary", "daily-history"]);
  return userCategories.has(event.category) && !event.path.startsWith("_ops/");
}

function opsEventVisibleForLanguage(event: UnifiedOps["events"][number], mode: MonitorLanguageMode) {
  if (event.sourceType === "monitor") {
    return true;
  }
  if (event.language === "unknown") {
    return mode.includeUnknown;
  }
  return mode.includedLanguages.includes(event.language);
}

function summarizeUnifiedOpsEvents(events: UnifiedOps["events"], historyDays: number): UnifiedOps["summary"] {
  return {
    totalEvents: events.length,
    historyEvents: events.filter((event) => event.sourceType === "history").length,
    monitorEvents: events.filter((event) => event.sourceType === "monitor").length,
    evidenceEvents: events.filter((event) => ["evidence", "evaluation", "web-search"].includes(event.signalType)).length,
    decisionEvents: events.filter((event) => ["decision", "blocker", "next-action"].includes(event.signalType)).length,
    openSignals: events.filter((event) => ["critical", "attention", "warning"].includes(event.severity)).length,
    criticalSignals: events.filter((event) => event.severity === "critical").length,
    latestEventAt: events[0]?.timestamp || events[0]?.date || "",
    historyDays
  };
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }
  const visibleLength = Math.max(0, maxLength - 3);
  return `${value.slice(0, visibleLength).trimEnd()}...`;
}

function formatTimeLabel(value: string) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) && value.trim() !== "" ? new Date(numericValue) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function parseTimeMs(value?: string | null) {
  if (!value) {
    return 0;
  }
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) && value.trim() !== "" ? new Date(numericValue) : new Date(value);
  const timeMs = date.getTime();
  return Number.isNaN(timeMs) ? 0 : timeMs;
}

function countBy<T>(items: T[], getKey: (item: T) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count || left.key.localeCompare(right.key));
}
