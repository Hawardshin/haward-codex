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
  WalletCards,
  Wrench,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import { memo, useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { ProductFeatureArchitecturePanelProps } from "@/components/features/ProductFeatureArchitecturePanel";
import type { OperatorCenterDialogProps } from "@/components/features/OperatorCenterDialog";
import type { EvaluationReportPanelProps } from "@/components/features/EvaluationReportPanel";
import { preloadAdminHistoryIndex, useAdminHistoryIndex } from "@/components/history/useAdminHistoryIndex";
import { DesktopActivityRail } from "@/components/shell/DesktopActivityRail";
import { SnapshotLoadingShell } from "@/components/SnapshotLoadingShell";
import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import { useOverlayFocus } from "@/components/ui/useOverlayFocus";
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
  NativePtyQuickCommand,
  RuntimeNativePtySession,
  RuntimeTerminalDrawerProps,
  RuntimeTextChoice
} from "@/components/workbench/RuntimeTerminalDrawer";
import {
  buildDirtySourcePathSet,
  buildSourceDiffSummary,
  filterEditableSourceFiles,
  findAgentsInstructionPath,
  findCurrentSourceDraftEntry,
  findSelectedSourceFileOption,
  isCurrentSourceDraftDirty,
  listEditableSourceFiles,
  listDirtySourceDraftEntries,
  listOpenSourceDraftEntries,
  monacoEditorOptions,
  selectSourceCatalogFiles,
  SourceWorkbenchPanel,
  sourceEditorProfileForPath,
  sourceCatalogLabelFor,
  sourceTemplateById,
  sourceTemplates,
  type SourceTemplateId,
  type SourceWorkbenchView,
  useSourceEditorSession,
  useSourceWorkbenchController,
  useSourceLoadRequestGate,
  workspaceExplorerRootLabelFor
} from "@/components/workbench/source-editor";
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
import {
  detectOutputEvents,
  formatBytes,
  formatDuration,
  groupDecisions,
  isActiveSessionStatus,
  isOpenDecisionStatus,
  mergeNativePtyReports,
  mergeSessionReports
} from "@/lib/runtimeDisplay";

import { ProviderAccountsPanel } from "./features/ProviderAccountsPanel";
import { RuntimeCustomizationPanel } from "./features/RuntimeCustomizationPanel";
import {
  DesktopActionFeedbackCard,
  type DesktopActionFeedback,
  type DesktopActionFeedbackId,
  type DesktopActionFeedbackStatus
} from "./features/DesktopActionFeedbackCard";

type CliAdapterPtyLaunchReport = {
  adapterId: string;
  label: string;
  command: string;
  resolvedPath: string;
  startupInput: string;
  terminal: RuntimeNativePtySession;
};
import { AgentFirstRunGuideCard } from "./features/AgentFirstRunGuideCard";
import {
  SearchAgentWorkChatPanel,
  defaultSearchAgentChatMessages,
  defaultSearchAgentRunForm,
  renderSearchAgentPrompt,
  renderSearchAgentSystemPrompt,
  researchInsightAgentId,
  resolveModelRouteDecision,
  type SearchAgentChatMessage,
  type SearchAgentRunForm
} from "./features/SearchAgentWorkChatPanel";
import { AccumulatedDataPanel } from "./features/AccumulatedDataPanel";
import { DesktopControlPanel } from "./features/DesktopControlPanel";
import { RuntimeDataSupportPanel } from "./features/RuntimeDataSupportPanel";
import { RuntimeInitStatusCard, type RuntimeInitStatusReport } from "./features/RuntimeInitStatusCard";
import { ServiceReadinessPanel } from "./features/ServiceReadinessPanel";
import { TaskRunStorePanel } from "./features/TaskRunStorePanel";
import { WorkspaceHostPanel } from "./features/WorkspaceHostPanel";
import { WorkspaceProductSplitPanel } from "./features/WorkspaceProductSplitPanel";
import {
  defaultRuntimeInitDefaults,
  fallbackTaskPipePresets,
  renderTaskPipePresetPrompt,
  sessionModePresets,
  taskPipePromptKeyForPreset
} from "./features/runtimeSessionPresets";
import { nativeWorkspaceCopy } from "./features/runtimeWorkspaceCopy";
import {
  AgentFlowMap,
  DocumentList,
  HistoryCategoryBars,
  HistoryDensityChart,
  HistoryTimeline,
  Metric
} from "./features/MonitorSummaryWidgets";
import {
  adapterSetupGuides,
  defaultRuntimeCustomization,
  defaultTerminalQuickCommands,
  fallbackDesktopAdapters,
  fallbackProviderCredentialReport,
  localizedAdapterGuideText,
  normalizeRuntimeQuickCommands,
  providerDefaultBaseUrlFor,
  providerDefaultModelFor,
  providerAuthStatusForAdapter,
  providerDisplayName,
  providerIdsByAdapter,
  trimRuntimeSetting
} from "./features/runtimeCatalog";
import { useProviderAccountSettings } from "./features/useProviderAccountSettings";
import { useRuntimeEnvironmentRefresh } from "./features/useRuntimeEnvironmentRefresh";
import {
  createSettingsRuntimeSyncRequest,
  useSettingsRuntimeSync,
  type RuntimeSettingsSyncRequest
} from "./features/useSettingsRuntimeSync";
import type {
  AccumulatedDataOverviewReport,
  AdapterSetupGuide,
  AppUpdateCheckReport,
  AppUpdateInstallReport,
  AppThemeMode,
  CliAdapterStatus,
  CliDecisionPrompt,
  CliRunReport,
  CliSessionReport,
  CliTaskPipelineInitReport,
  CliTaskPipelinePresetReport,
  CliTaskRunDetailReport,
  CliTaskRunPruneReport,
  CliTaskRunRecordReport,
  DecisionResumeReport,
  DesktopHealthStatus,
  DesktopPreferences,
  DesktopPreferencesReport,
  DesktopResourceSnapshotReport,
  DesktopWorkspaceStateReport,
  HumanDecisionInboxReport,
  InstallerPayloadAuditReport,
  NativeOsActionReport,
  ProviderCredentialReport,
  ProviderCredentialSummary,
  RuntimeCustomization,
  RuntimeDataBoundaryReport,
  RuntimeInitDefaults,
  RuntimeLaunchRequest,
  RuntimePromptCustomization,
  RuntimeProviderOverride,
  RuntimeRunTimelineItem,
  RuntimeTerminalSetupCheckReport,
  RustRuntimeFeatureMapReport,
  SectionId,
  ServiceReadinessReport,
  SessionModePreset,
  SharedWorkspacePrepareResult,
  SharedWorkspaceRequestCache,
  SharedWorkspaceRequestInFlight,
  SidebarMode,
  SourceDiffSummary,
  SourceDraftEntry,
  SubagentToolFanoutReport,
  SubagentToolPlanReport,
  SupportDiagnosticBundleReport,
  TauriInvoke,
  UiLanguage,
  WorkspaceResourcePrepareReport,
  WorkspaceResourceWarmupReport,
  WorkspaceTextFile,
  WorkspaceTextFileListReport,
  WorkspaceWriteReport
} from "@/types/desktop";

const maxResidentSectionPanels = 12;
const startupSurfaceReadyMinMs = 2600;
const maxSubagentFanoutSelections = 3;
const defaultSubagentFanoutSelections = 2;
const retainedResidentSections: SectionId[] = ["overview", "source", "desktop", "eval"];
const nonRetainedResidentSections: SectionId[] = [];
const startupResidentPreloadSections: SectionId[] = [
  "overview",
  "source",
  "desktop",
  "eval",
  "projects",
  "history",
  "documents",
  "requirements",
  "intent",
  "structure"
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
  | "customization"
  | "adapter"
  | "session"
  | "pipe"
  | "questions"
  | "filters"
  | "snapshot"
  | "store"
  | "operator";
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
          <DropdownMenu.Content className="app-choice-menu" align="start" sideOffset={6} collisionPadding={16}>
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

type HomeStartFlowStep = {
  id: string;
  label: string;
  detail: string;
  stateLabel: string;
  icon: LucideIcon;
  run: () => void;
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

type ProviderAgentTaskReport = {
  taskRunId: string;
  providerId: string;
  providerLabel: string;
  model: string;
  modelRouteId?: string;
  constraintProfileId?: string;
  connectorPolicyId?: string;
  maxInputTokens?: number | null;
  maxOutputTokens?: number | null;
  budgetUsd?: number | null;
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

function ViewportOverlayPortal({ children, target }: { children: ReactNode; target: HTMLElement | null }) {
  if (!target) {
    return null;
  }

  return createPortal(children, target);
}

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

const DESKTOP_PREFERENCES_SCHEMA_VERSION = "desktop-preferences.v1";
const defaultPinnedSections: SectionId[] = ["overview", "source", "desktop", "eval"];
type OperatorCenterSection = OperatorCenterDialogProps["sections"][number];
type OperatorCenterSectionId = OperatorCenterSection["id"];
const operatorSectionIds = new Set<OperatorCenterSectionId>(["structure", "intent", "agents", "tools"]);

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
    purpose: "Git 작업공간과 현재 작업 추적",
    purposeEn: "Git workspace and current work tracking."
  },
  {
    id: "workspace",
    label: "실행 도구",
    labelEn: "Run Tools",
    purpose: "선택한 작업공간에서 실행되는 터미널과 게스트 AI 도구",
    purposeEn: "Terminal and guest AI tools running in the selected workspace."
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
    label: "작업 허브",
    labelEn: "Work Hub",
    shortLabel: "허브",
    shortLabelEn: "Hub",
    icon: Activity,
    group: "core",
    purpose: "Git 작업공간 가져오기, 현재 작업 요약, 실행, 근거 확인으로 이어지는 기본 화면입니다.",
    purposeEn: "The default surface for Git workspace import, current work summary, run state, and evidence review."
  },
  {
    id: "agents",
    label: "분리된 에이전트 플랫폼",
    labelEn: "Separate Agent Platform",
    shortLabel: "고급",
    shortLabelEn: "Advanced",
    icon: Bot,
    group: "governance",
    purpose: "커스텀 에이전트와 서브에이전트 관리는 별도 agent-platform 영역에서 다룹니다.",
    purposeEn: "Custom agent and subagent management belongs to the separate agent-platform area."
  },
  {
    id: "desktop",
    label: "터미널/AI 실행",
    labelEn: "Terminal / AI Run",
    shortLabel: "터미널",
    shortLabelEn: "Terminal",
    icon: Network,
    group: "core",
    purpose: "선택한 Git 작업공간에서 Codex, Claude Code 등 게스트 AI 도구와 터미널 상태를 확인합니다.",
    purposeEn: "Check guest AI tool and terminal state for the selected Git workspace."
  },
  {
    id: "eval",
    label: "보고서/근거",
    labelEn: "Reports / Evidence",
    shortLabel: "보고",
    shortLabelEn: "Reports",
    icon: ClipboardCheck,
    group: "core",
    purpose: "현재 작업 요약, 검증 근거, 평가, 보고서 신호를 확인합니다.",
    purposeEn: "Review current work summaries, validation evidence, evaluations, and report signals."
  },
  {
    id: "tools",
    label: "분리된 툴 플랫폼",
    labelEn: "Separate Tool Platform",
    shortLabel: "툴 고급",
    shortLabelEn: "Tools",
    icon: Wrench,
    group: "governance",
    purpose: "툴 제작, Python venv, 배포, Ollama/직접 실행 관리는 별도 agent-platform 영역에서 다룹니다.",
    purposeEn: "Tool building, Python venv, deployment, Ollama, and direct execution belong to the separate agent-platform area."
  },
  {
    id: "source",
    label: "Git 작업공간",
    labelEn: "Git Workspaces",
    shortLabel: "Git",
    shortLabelEn: "Git",
    icon: Code2,
    group: "core",
    purpose: "여러 Git 레포지토리를 가져오고 현재 작업 파일과 변경 상태를 확인합니다.",
    purposeEn: "Import Git repositories and inspect current work files and change state."
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
    label: "레포지토리",
    labelEn: "Repositories",
    shortLabel: "레포",
    shortLabelEn: "Repos",
    icon: FolderKanban,
    group: "core",
    purpose: "등록된 프로젝트와 Git 소유 경계를 확인합니다.",
    purposeEn: "Inspect registered projects and Git ownership boundaries."
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
    label: "작업 타임라인",
    labelEn: "Work Timeline",
    shortLabel: "타임라인",
    shortLabelEn: "History",
    icon: History,
    group: "core",
    purpose: "날짜별 작업 순서, 계획, 요약, 요청 추적을 확인합니다.",
    purposeEn: "Track dated work order, plans, summaries, and request traces."
  },
  {
    id: "documents",
    label: "근거 문서",
    labelEn: "Evidence Docs",
    shortLabel: "근거",
    shortLabelEn: "Evidence",
    icon: BookOpenText,
    group: "core",
    purpose: "문서, 검색 기록, 평가 근거, 보고서 자료를 탐색합니다.",
    purposeEn: "Browse documents, web searches, evaluation evidence, and report materials."
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
    intent: "Simple Git workspace tracker view that foregrounds import, run state, reports, timeline, and evidence while hiding agent/tool operations by default.",
    allowedSections: ["overview", "source", "desktop", "eval", "projects", "history", "documents", "requirements"],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "developer",
    label: "Developer View",
    intent: "Implementation, requirements, specs, separated agent/tool operations, and verification surfaces.",
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
    primaryProduct: "workspace_tracker",
    productClaim:
      "Import Git workspaces, launch replaceable guest AI coding tools, and review current work, evidence, validation, reports, terminal state, and Git boundaries in one simple app.",
    monitoringRole: "primary_work_visibility"
  },
  desktopHomeSurface: {
    firstViewPriority: [
      "agent_work_environment",
      "agent_orchestration",
      "work_visibility",
      "learning_improvement_loop"
    ],
    supportingSurfaces: ["agent_factory", "root_tool_management", "observability_monitoring"],
    homeCopyRule: "Show Git workspace import, current work timeline, terminal and guest AI tool launch, reports, and evidence before advanced platform internals.",
    configurationRule: "Expose workspace path, Git state, terminal, guest AI adapters, and question deferral before provider-direct, Ollama, agent factory, or tool builder controls."
  },
  summary: {
    totalFeatures: 11,
    primaryFeatures: 4,
    supportingFeatures: 7,
    automationLoops: 1
  },
  featureLayers: [
    {
      id: "agent_orchestration",
      label: "Guest AI Tool Orchestration",
      role: "primary",
      status: "fallback",
      purpose: "Launch replaceable guest AI coding tools over the selected Git workspace.",
      userOutcome: "Start work with Codex, Claude Code, Cursor, Antigravity, or another adapter without making one tool mandatory.",
      primarySection: "desktop",
      primarySurfaces: ["Desktop Runtime", "Task Pipe", "Decision Inbox"],
      currentAssets: [],
      automationTargets: ["guest adapter launch", "decision routing", "merge gates"],
      learningSignals: ["task-run records"],
      validationGates: []
    },
    {
      id: "agent_work_environment",
      label: "Agent Work Environment",
      role: "primary",
      status: "fallback",
      purpose: "Host imported or created Git workspaces with task reports and terminal state attached.",
      userOutcome: "Know which repository is active and where summaries, plans, reports, evidence, and runs belong.",
      primarySection: "source",
      primarySurfaces: ["Git Workspaces", "Workspace Host", "Runtime Data"],
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
      role: "separated",
      status: "fallback",
      purpose: "Promote repeated work into prompts, workflows, templates, tools, skills, agents, and features in the separated agent platform.",
      userOutcome: "Create reusable agents and capabilities from an advanced platform surface when needed.",
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
      role: "primary",
      status: "fallback",
      purpose: "Accumulate requests, evidence, timings, evaluations, reports, and intent maps into current work visibility.",
      userOutcome: "See what happened, why it happened, and what remains without reading raw folders first.",
      primarySection: "eval",
      primarySurfaces: ["Reports", "Evidence", "Evaluations", "Work Timings"],
      currentAssets: [],
      automationTargets: ["intent structuring", "evaluation capture", "bottleneck detection"],
      learningSignals: ["intent themes"],
      validationGates: []
    },
    {
      id: "root_tool_management",
      label: "Root Tool Management",
      role: "separated",
      status: "fallback",
      purpose: "Keep tool building, provider setup, Python runtime, deployment, and root tool registries in the separated agent platform.",
      userOutcome: "Keep the default desktop tracker focused on workspaces, terminal runs, reports, and evidence.",
      primarySection: "tools",
      primarySurfaces: ["Tool Studio", "Root Tools", "Provider Accounts"],
      currentAssets: [],
      automationTargets: ["provider setup", "CLI adapter selection", "workspace access setup", "tool sharing"],
      learningSignals: ["configured provider count", "selected CLI adapter", "workspace file count"],
      validationGates: []
    },
    {
      id: "provider_direct_agent_run",
      label: "Provider Direct Agent Run",
      role: "separated",
      status: "fallback",
      purpose: "Keep direct provider API execution and model-task experiments in the separated agent platform.",
      userOutcome: "Use the workspace tracker without configuring raw provider execution first.",
      primarySection: "agents",
      primarySurfaces: ["Provider Accounts", "Search Agent Work Chat"],
      currentAssets: [],
      automationTargets: ["provider account status", "model catalog", "direct run"],
      learningSignals: ["configured provider count"],
      validationGates: []
    },
    {
      id: "ollama_model_management",
      label: "Ollama Model Management",
      role: "separated",
      status: "fallback",
      purpose: "Keep local model runtime and Ollama model setup in the separated agent/tool platform.",
      userOutcome: "Start with Git workspaces and guest tools without making local model setup mandatory.",
      primarySection: "tools",
      primarySurfaces: ["Tool Studio", "Advanced Runtime Settings"],
      currentAssets: [],
      automationTargets: ["Ollama base URL reference", "model defaults"],
      learningSignals: ["local runtime configured"],
      validationGates: []
    },
    {
      id: "agentcore_runtime_lifecycle",
      label: "AgentCore Runtime Lifecycle",
      role: "separated",
      status: "fallback",
      purpose: "Keep AgentCore-style runtime, gateway, identity, memory, tool, and evaluation lifecycle as separated platform infrastructure.",
      userOutcome: "Reference production blueprints without turning the tracker into an AWS runtime console.",
      primarySection: "agents",
      primarySurfaces: ["Production Agent Blueprints", "AgentCore Quick Builder"],
      currentAssets: [],
      automationTargets: ["runtime lifecycle proposal", "gateway planning", "identity planning"],
      learningSignals: ["selected production blueprint"],
      validationGates: []
    },
    {
      id: "work_visibility",
      label: "Work Visibility",
      role: "primary",
      status: "fallback",
      purpose: "Show active work, current repository, decisions, task-run records, reports, evidence, and terminal state at a glance.",
      userOutcome: "Immediately see what is running, blocked, planned, validated, and ready to resume.",
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
      purpose: "Expose structure, source inventory, service readiness, and diagnostics as supporting observability.",
      userOutcome: "Inspect platform state without treating diagnostics as the whole product.",
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



const SESSION_POLL_INTERVAL_MS = 2000;
const NATIVE_PTY_POLL_INTERVAL_MS = 500;
const INBOX_REFRESH_THROTTLE_MS = 4000;
const TASK_RUN_REFRESH_THROTTLE_MS = 5000;
const runtimePromptMaxChars = 4_000;

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

const defaultDesktopPreferences: DesktopPreferences = {
  schemaVersion: DESKTOP_PREFERENCES_SCHEMA_VERSION,
  uiLanguage: "ko",
  themeMode: "system",
  sidebarMode: "collapsed",
  terminalDrawerOpen: false,
  runtimeInitDefaults: defaultRuntimeInitDefaults,
  runtimeCustomization: defaultRuntimeCustomization,
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
  runtimeCustomization: RuntimeCustomization;
  pinnedSections: SectionId[];
}): DesktopPreferences {
  return {
    schemaVersion: DESKTOP_PREFERENCES_SCHEMA_VERSION,
    uiLanguage: input.uiLanguage,
    themeMode: input.themeMode,
    sidebarMode: input.sidebarMode,
    terminalDrawerOpen: input.terminalDrawerOpen,
    runtimeInitDefaults: input.runtimeInitDefaults,
    runtimeCustomization: normalizeRuntimeCustomization(input.runtimeCustomization),
    pinnedSections: normalizePinnedSections(input.pinnedSections)
  };
}

function normalizePinnedSections(sectionsToNormalize: unknown): SectionId[] {
  const next = Array.isArray(sectionsToNormalize)
    ? sectionsToNormalize.filter((item): item is SectionId => sectionIds.has(item as SectionId))
    : [];
  return next.slice(0, 6);
}

function normalizeRuntimePromptOverrides(prompts: unknown, allowedKeys: string[]): Record<string, string> {
  const allowed = new Set(allowedKeys);
  if (!prompts || typeof prompts !== "object") {
    return {};
  }
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(prompts as Record<string, unknown>)) {
    const normalizedKey = trimRuntimeSetting(key, 120);
    const normalizedValue = trimRuntimeSetting(value, runtimePromptMaxChars);
    if (allowed.has(normalizedKey) && normalizedValue) {
      normalized[normalizedKey] = normalizedValue;
    }
  }
  return normalized;
}

function normalizeRuntimePromptCustomization(prompts: Partial<RuntimePromptCustomization> | null | undefined): RuntimePromptCustomization {
  return {
    sessionPrompts: normalizeRuntimePromptOverrides(
      prompts?.sessionPrompts,
      sessionModePresets.map((mode) => mode.id)
    ),
    taskPipePrompts: normalizeRuntimePromptOverrides(
      prompts?.taskPipePrompts,
      [
        ...fallbackTaskPipePresets.map((preset) => taskPipePromptKeyForPreset(preset.taskKind)),
        "implementation-pipe",
        "research-pipe",
        "review-pipe"
      ]
    )
  };
}

function normalizeRuntimeCustomization(customization: Partial<RuntimeCustomization> | null | undefined): RuntimeCustomization {
  const overrideMap = new Map<string, Partial<RuntimeProviderOverride>>();
  for (const override of Array.isArray(customization?.providerOverrides) ? customization?.providerOverrides || [] : []) {
    if (override && typeof override.providerId === "string") {
      overrideMap.set(override.providerId, override);
    }
  }
  const providerOverrides = fallbackProviderCredentialReport.providers.map((provider) => {
    const override = overrideMap.get(provider.providerId);
    return {
      providerId: provider.providerId,
      defaultModel: trimRuntimeSetting(override?.defaultModel, 140) || provider.defaultModel,
      baseUrl: trimRuntimeSetting(override?.baseUrl, 240) || providerDefaultBaseUrlFor(provider.providerId)
    };
  });
  const terminal = customization?.terminal || defaultRuntimeCustomization.terminal;
  return {
    providerOverrides,
    prompts: normalizeRuntimePromptCustomization(customization?.prompts),
    terminal: {
      shellCommand: trimRuntimeSetting(terminal.shellCommand, 512),
      startupCommand: trimRuntimeSetting(terminal.startupCommand, 2_000),
      quickCommands: normalizeRuntimeQuickCommands(terminal.quickCommands)
    }
  };
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
    runtimeCustomization: normalizeRuntimeCustomization(preferences?.runtimeCustomization),
    pinnedSections: pinned.length ? pinned : defaultPinnedSections
  };
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
  const [runtimeCustomization, setRuntimeCustomization] = useState<RuntimeCustomization>(defaultRuntimeCustomization);
  const [operatorCenterOpen, setOperatorCenterOpen] = useState(false);
  const [agentSignalsOpen, setAgentSignalsOpen] = useState(false);
  const [agentDetailsOpen, setAgentDetailsOpen] = useState(false);
  const [agentDetailView, setAgentDetailView] = useState<AgentDetailViewId>("collaboration");
  const [agentDetailRenderView, setAgentDetailRenderView] = useState<AgentDetailViewId>("collaboration");
  const [commandQuery, setCommandQuery] = useState("");
  const [buttonFeedbackReady, setButtonFeedbackReady] = useState(false);
  const [startupSurfaceReady, setStartupSurfaceReady] = useState(false);
  const [homeTaskPrompt, setHomeTaskPrompt] = useState("");
  const titlebarSectionLabelRef = useRef<HTMLElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const homeTaskPromptRef = useRef<HTMLTextAreaElement>(null);
  const commandPaletteDialogRef = useRef<HTMLElement | null>(null);
  const settingsDialogRef = useRef<HTMLElement | null>(null);
  const settingsCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [overlayPortalTarget, setOverlayPortalTarget] = useState<HTMLElement | null>(null);
  const pendingAgentDetailCommitRef = useRef<(() => void) | null>(null);
  const residentStartupPreloadDoneRef = useRef(false);
  const [searchAgentRunForm, setSearchAgentRunForm] = useState<SearchAgentRunForm>(defaultSearchAgentRunForm);
  const [searchAgentChatMessages, setSearchAgentChatMessages] =
    useState<SearchAgentChatMessage[]>(defaultSearchAgentChatMessages);
  const [providerTaskBusy, setProviderTaskBusy] = useState(false);
  const [selectedAgentCoreBlueprintId, setSelectedAgentCoreBlueprintId] = useState(agentCoreBlueprints[0].id);
  const [runtimeLaunchRequest, setRuntimeLaunchRequest] = useState<RuntimeLaunchRequest | null>(null);
  const [runtimeSettingsSyncRequest, setRuntimeSettingsSyncRequest] = useState<RuntimeSettingsSyncRequest | null>(null);
  const requestRuntimeSettingsSync = useCallback(
    (
      reason: string,
      options: {
        includeSourceCatalog?: boolean;
        forceSourceRefresh?: boolean;
      } = {}
    ) => {
      setRuntimeSettingsSyncRequest(createSettingsRuntimeSyncRequest(reason, options));
    },
    []
  );
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
  const [runtimeSetupCheckBusy, setRuntimeSetupCheckBusy] = useState(false);
  const [runtimeSetupTerminalCheck, setRuntimeSetupTerminalCheck] = useState<RuntimeTerminalSetupCheckReport | null>(null);
  const [runtimeSetupCliCheck, setRuntimeSetupCliCheck] = useState<CliRunReport | null>(null);
  const [runtimeSetupAdapterStatus, setRuntimeSetupAdapterStatus] = useState<CliAdapterStatus | null>(null);
  const [runtimeSetupCheckError, setRuntimeSetupCheckError] = useState("");
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
  const [viewMode, setViewMode] = useState(snapshot.viewModeCatalog?.defaultMode || "user");
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
        setRuntimeCustomization(preferences.runtimeCustomization);
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
      runtimeCustomization,
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
    runtimeCustomization,
    runtimeInitDefaults,
    sidebarMode,
    terminalDrawerOpen,
    themeMode,
    uiLanguage
  ]);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const closeSettingsDialog = useCallback(() => setSettingsOpen(false), []);
  useEffect(() => {
    setOverlayPortalTarget(document.querySelector<HTMLElement>(".desktop-app-root") || document.body);
  }, []);
  useOverlayFocus({
    open: commandPaletteOpen,
    containerRef: commandPaletteDialogRef,
    initialFocusRef: commandInputRef,
    onClose: closeCommandPalette,
    readyKey: overlayPortalTarget
  });
  useOverlayFocus({
    open: settingsOpen,
    containerRef: settingsDialogRef,
    initialFocusRef: settingsCloseButtonRef,
    onClose: closeSettingsDialog,
    readyKey: overlayPortalTarget
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setCommandPaletteOpen((current) => {
          const nextOpen = !current;
          if (nextOpen) {
            setSettingsOpen(false);
            setOperatorCenterOpen(false);
            setTerminalDrawerOpen(false);
          }
          return nextOpen;
        });
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === ",") {
        event.preventDefault();
        setCommandPaletteOpen(false);
        setOperatorCenterOpen(false);
        setSettingsOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setOperatorCenterOpen(false);
        setTerminalDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const currentViewMode = useMemo(() => {
    return viewModes.find((mode) => mode.id === viewMode) || viewModes[0] || fallbackViewModes[0];
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
      desktop: "Terminal",
      eval: `${visibleEvaluations.toLocaleString("ko-KR")} reports`,
      tools: "Separate",
      projects: snapshot.stats.projects.toLocaleString("ko-KR"),
      history: visibleHistoryDays.length.toLocaleString("ko-KR"),
      intent: intentFeatureMap.summary.totalThemes.toLocaleString("ko-KR"),
      structure: structureOverview.summary.totalPlanes
        ? `${structureOverview.summary.totalPlanes}/${structureOverview.summary.totalPressurePoints}`
        : snapshot.stats.rootFolders.toLocaleString("ko-KR"),
      documents: viewFilteredDocuments.length.toLocaleString("ko-KR"),
      source: visibleSourceFiles.length.toLocaleString("ko-KR"),
      requirements: visibleRequirements.length.toLocaleString("ko-KR"),
      agents: "Separate"
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
  const startSimpleUserTask = useCallback(() => {
    const prompt = homeTaskPrompt.trim();
    if (!prompt) {
      homeTaskPromptRef.current?.focus();
      return;
    }
    setRuntimeLaunchRequest({
      id: `simple-user-task-${Date.now()}`,
      label: uiLanguage === "ko" ? "사용자 작업" : "User task",
      adapterId: runtimeInitDefaults.adapterId || defaultRuntimeInitDefaults.adapterId,
      modeId: "user_task",
      taskKind: "user_task",
      prompt,
      openTerminal: true,
      autoStart: true
    });
    openSection("desktop", { intentId: "run-work", flowStepId: "lane" });
  }, [homeTaskPrompt, openSection, runtimeInitDefaults.adapterId, uiLanguage]);
  const selectIntentStep = useCallback(
    (intentId: string, targetSection: SectionId, flowStepId: string) => () => {
      openSection(targetSection, { intentId, flowStepId });
    },
    [openSection]
  );
  const selectToolStep = useCallback(
    (mode: ToolStudioMode, flowStepId: string) => () => {
      setRequestedToolMode((previous) => ({ mode, requestId: (previous?.requestId || 0) + 1 }));
      openSection("tools", { intentId: "build-tool", flowStepId });
    },
    [openSection]
  );
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
  const isPrimaryWorkSurface = section === "source" || section === "desktop" || section === "eval";
  const currentThemeLabel =
    themeMode === "system"
      ? uiLanguage === "ko" ? "시스템" : "System"
      : themeMode === "dark"
        ? uiLanguage === "ko" ? "다크" : "Dark"
        : uiLanguage === "ko" ? "라이트" : "Light";
  const providerRuntimeOverridesById = useMemo(() => {
    const entries = new Map<string, RuntimeProviderOverride>();
    for (const override of runtimeCustomization.providerOverrides) {
      entries.set(override.providerId, override);
    }
    return entries;
  }, [runtimeCustomization.providerOverrides]);
  const effectiveProviderModelFor = useCallback(
    (provider: Pick<ProviderCredentialSummary, "providerId" | "defaultModel">) =>
      providerRuntimeOverridesById.get(provider.providerId)?.defaultModel.trim() || provider.defaultModel,
    [providerRuntimeOverridesById]
  );
  const {
    providerCredentials,
    providerCredentialInputs,
    providerCredentialBusy,
    providerCredentialNotice,
    providerCredentialError,
    providerActionFeedback,
    providerModelCatalog,
    providerModelBusy,
    providerModelBusyProviderId,
    providerModelError,
    setProviderCredentialNotice,
    setProviderActionFeedback,
    setProviderModelCatalog,
    setProviderModelError,
    refreshProviderModels,
    refreshProviderCredentials,
    updateProviderCredentialInput,
    saveProviderCredential,
    clearProviderCredential,
    openProviderAuthUrl,
    verifyProviderSubscription
  } = useProviderAccountSettings({
    uiLanguage,
    searchAgentRunForm,
    setSearchAgentRunForm,
    effectiveProviderModelFor,
    getTauriInvoke,
    requestRuntimeSettingsSync
  });
  const runtimeNativePtyQuickCommands = useMemo(
    () => normalizeRuntimeQuickCommands(runtimeCustomization.terminal.quickCommands),
    [runtimeCustomization.terminal.quickCommands]
  );
  const updateRuntimeProviderOverride = useCallback((providerId: string, field: keyof RuntimeProviderOverride, value: string) => {
    if (field === "providerId") {
      return;
    }
    setRuntimeCustomization((current) => {
      const normalized = normalizeRuntimeCustomization(current);
      return {
        ...normalized,
        providerOverrides: normalized.providerOverrides.map((override) =>
          override.providerId === providerId ? { ...override, [field]: value } : override
        )
      };
    });
  }, []);
  const resetRuntimeProviderOverride = useCallback((providerId: string) => {
    setRuntimeCustomization((current) => {
      const normalized = normalizeRuntimeCustomization(current);
      return {
        ...normalized,
        providerOverrides: normalized.providerOverrides.map((override) =>
          override.providerId === providerId
            ? {
                ...override,
                defaultModel: providerDefaultModelFor(providerId) || override.defaultModel,
                baseUrl: providerDefaultBaseUrlFor(providerId)
              }
            : override
        )
      };
    });
  }, []);
  const updateRuntimeTerminalCustomization = useCallback((field: "shellCommand" | "startupCommand", value: string) => {
    setRuntimeCustomization((current) => ({
      ...normalizeRuntimeCustomization(current),
      terminal: {
        ...normalizeRuntimeCustomization(current).terminal,
        [field]: value
      }
    }));
  }, []);
  const updateRuntimeQuickCommand = useCallback((index: number, field: keyof NativePtyQuickCommand, value: string) => {
    setRuntimeCustomization((current) => {
      const normalized = normalizeRuntimeCustomization(current);
      const quickCommands = normalized.terminal.quickCommands.map((command, commandIndex) =>
        commandIndex === index ? { ...command, [field]: value } : command
      );
      return {
        ...normalized,
        terminal: {
          ...normalized.terminal,
          quickCommands
        }
      };
    });
  }, []);
  const addRuntimeQuickCommand = useCallback(() => {
    setRuntimeCustomization((current) => {
      const normalized = normalizeRuntimeCustomization(current);
      const nextIndex = normalized.terminal.quickCommands.length + 1;
      return {
        ...normalized,
        terminal: {
          ...normalized.terminal,
          quickCommands: [
            ...normalized.terminal.quickCommands,
            {
              id: `custom-${nextIndex}`,
              label: uiLanguage === "ko" ? `명령 ${nextIndex}` : `Command ${nextIndex}`,
              detail: "echo ready",
              input: "echo ready\n"
            }
          ].slice(0, 8)
        }
      };
    });
  }, [uiLanguage]);
  const removeRuntimeQuickCommand = useCallback((index: number) => {
    setRuntimeCustomization((current) => {
      const normalized = normalizeRuntimeCustomization(current);
      const quickCommands = normalized.terminal.quickCommands.filter((_, commandIndex) => commandIndex !== index);
      return {
        ...normalized,
        terminal: {
          ...normalized.terminal,
          quickCommands: quickCommands.length ? quickCommands : defaultTerminalQuickCommands
        }
      };
    });
  }, []);
  const resetRuntimeQuickCommands = useCallback(() => {
    setRuntimeCustomization((current) => ({
      ...normalizeRuntimeCustomization(current),
      terminal: {
        ...normalizeRuntimeCustomization(current).terminal,
        quickCommands: defaultTerminalQuickCommands
      }
    }));
  }, []);
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
        label: uiLanguage === "ko" ? "작업 시작 설정" : "Work start setup",
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
        id: "customization",
        label: uiLanguage === "ko" ? "실행 커스텀" : "Runtime custom",
        detail: uiLanguage === "ko"
          ? `${runtimeNativePtyQuickCommands.length}개 빠른 명령`
          : `${runtimeNativePtyQuickCommands.length} quick commands`,
        icon: Wrench
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
  const consumeRuntimeSettingsSyncRequest = useCallback((requestId: string) => {
    setRuntimeSettingsSyncRequest((current) => (current?.requestId === requestId ? null : current));
  }, []);
  const openExecutionSettings = useCallback((subsectionId: SettingsSubsectionId = "quick") => {
    openSettingsTab("execution", subsectionId);
  }, [openSettingsTab]);
  const selectedRuntimeAdapterOption =
    fallbackDesktopAdapters.find((adapter) => adapter.adapterId === runtimeInitDefaults.adapterId) ||
    fallbackDesktopAdapters[0];
  const selectedRuntimeAdapterGuide = adapterSetupGuides[selectedRuntimeAdapterOption.adapterId];
  const selectedRuntimeAdapterGuideKoOrEn = (field: keyof AdapterSetupGuide) =>
    localizedAdapterGuideText(selectedRuntimeAdapterGuide, uiLanguage, field);
  const selectedRuntimeAdapterAuthReady = adapterAuthReadyForAdapter(selectedRuntimeAdapterOption.adapterId, providerCredentials);
  const selectedRuntimeAdapterAuthStatus = providerAuthStatusForAdapter(
    selectedRuntimeAdapterOption.adapterId,
    providerCredentials,
    uiLanguage
  );
  const selectedRuntimeSetupCliCheck =
    runtimeSetupCliCheck?.adapterId === selectedRuntimeAdapterOption.adapterId ? runtimeSetupCliCheck : null;
  const selectedRuntimeSetupAdapterStatus =
    runtimeSetupAdapterStatus?.adapterId === selectedRuntimeAdapterOption.adapterId ? runtimeSetupAdapterStatus : null;
  const runtimeSetupShellCommand = runtimeCustomization.terminal.shellCommand.trim();
  const selectedRuntimeTerminalCheck =
    runtimeSetupTerminalCheck &&
    ((runtimeSetupShellCommand && runtimeSetupTerminalCheck.command === runtimeSetupShellCommand) ||
      (!runtimeSetupShellCommand && runtimeSetupTerminalCheck.commandSource === "system_default"))
      ? runtimeSetupTerminalCheck
      : null;
  const selectedRuntimeCliInstallReady = Boolean(selectedRuntimeSetupAdapterStatus?.available);
  const selectedRuntimeCliVerifyReady = selectedRuntimeSetupCliCheck?.status === "passed";
  const selectedRuntimeTerminalReady = selectedRuntimeTerminalCheck?.status === "ready";
  const runtimeSetupStatusLabel = runtimeSetupCheckBusy
    ? uiLanguage === "ko" ? "점검 중" : "Checking"
    : runtimeSetupCheckError
      ? uiLanguage === "ko" ? "점검 실패" : "Check failed"
      : selectedRuntimeSetupCliCheck || selectedRuntimeTerminalCheck
        ? selectedRuntimeCliVerifyReady && selectedRuntimeTerminalReady
          ? uiLanguage === "ko" ? "실행 준비됨" : "Ready"
          : uiLanguage === "ko" ? "확인 필요" : "Needs attention"
        : uiLanguage === "ko" ? "아직 미점검" : "Not checked";
  const runRuntimeSetupCheck = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      const message = uiLanguage === "ko"
        ? "Tauri 런타임이 없어서 설치형 CLI/터미널 설정을 점검할 수 없습니다."
        : "Tauri runtime is unavailable, so installed CLI and terminal settings cannot be checked.";
      setRuntimeSetupCheckError(message);
      setProviderCredentialNotice(message);
      return;
    }

    setRuntimeSetupCheckBusy(true);
    setRuntimeSetupCheckError("");
    try {
      const shellCommand = runtimeCustomization.terminal.shellCommand.trim();
      const [terminalCheck, cliCheck, adapterStatuses] = await Promise.all([
        tauriInvoke<RuntimeTerminalSetupCheckReport>("check_runtime_terminal_setup", {
          command: shellCommand || null,
          workingDir: null
        }),
        tauriInvoke<CliRunReport>("run_cli_adapter_health", {
          adapterId: selectedRuntimeAdapterOption.adapterId
        }),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters")
      ]);
      setRuntimeSetupTerminalCheck(terminalCheck);
      setRuntimeSetupCliCheck(cliCheck);
      setRuntimeSetupAdapterStatus(
        adapterStatuses.find((adapter) => adapter.adapterId === selectedRuntimeAdapterOption.adapterId) || null
      );
      setProviderCredentialNotice(
        uiLanguage === "ko"
          ? `런타임 설정 점검 완료: CLI ${cliCheck.status}, 터미널 ${terminalCheck.status}`
          : `Runtime setup check complete: CLI ${cliCheck.status}, terminal ${terminalCheck.status}`
      );
    } catch (caught) {
      const message = errorMessage(caught);
      setRuntimeSetupCheckError(message);
      setProviderCredentialNotice(message);
    } finally {
      setRuntimeSetupCheckBusy(false);
    }
  };
  const runtimeAdapterSetupSteps = [
    {
      id: "install",
      label: uiLanguage === "ko" ? "1. 설치" : "1. Install",
      detail: selectedRuntimeSetupAdapterStatus?.resolvedPath || selectedRuntimeAdapterGuideKoOrEn("installHint"),
      ready: selectedRuntimeCliInstallReady,
      command: selectedRuntimeAdapterGuideKoOrEn("installHint")
    },
    {
      id: "auth",
      label: uiLanguage === "ko" ? "2. 로그인/키" : "2. Login or key",
      detail: selectedRuntimeAdapterAuthReady
        ? selectedRuntimeAdapterAuthStatus
        : selectedRuntimeAdapterGuideKoOrEn("authHint"),
      ready: selectedRuntimeAdapterAuthReady,
      command: selectedRuntimeAdapterGuideKoOrEn("authHint")
    },
    {
      id: "verify",
      label: uiLanguage === "ko" ? "3. 검증" : "3. Verify",
      detail:
        selectedRuntimeSetupCliCheck?.output ||
        selectedRuntimeSetupCliCheck?.stderr ||
        selectedRuntimeSetupAdapterStatus?.version ||
        selectedRuntimeAdapterGuideKoOrEn("verifyCommand"),
      ready: selectedRuntimeCliVerifyReady,
      command: selectedRuntimeAdapterGuideKoOrEn("verifyCommand")
    },
    {
      id: "run",
      label: uiLanguage === "ko" ? "4. 첫 실행" : "4. First run",
      detail: selectedRuntimeAdapterGuideKoOrEn("expectedResult"),
      ready: selectedRuntimeAdapterAuthReady,
      command: selectedRuntimeAdapterGuideKoOrEn("firstRunCommand")
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
        model: provider ? effectiveProviderModelFor(provider) : ""
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
      searchChannels: uiLanguage === "ko"
        ? "웹 검색\n저장소 검색\nAgentCore 샘플 소스\nAWS 공식 문서"
        : "web search\nrepository search\nAgentCore sample source\nAWS official docs",
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
    const connectedProviders = providerCredentials.providers.filter((provider) => provider.configured);
    const selectedProvider =
      providerCredentials.providers.find((provider) => provider.providerId === searchAgentRunForm.providerId) ||
      connectedProviders[0] ||
      providerCredentials.providers[0];
    const selectedProviderReady = Boolean(selectedProvider?.configured);
    const selectedProviderLocal = selectedProvider?.authMethod === "local_http";
    const selectedProviderRequiresSubscription = Boolean(selectedProvider?.requiresSubscriptionVerification);
    const selectedProviderSubscriptionVerified = selectedProvider?.subscriptionState === "verified";
    const selectedProviderName = providerDisplayName(
      selectedProvider?.providerId || "",
      selectedProvider?.label || (uiLanguage === "ko" ? "선택된 제공자" : "Selected provider"),
      uiLanguage
    );
    const selectedProviderSubscriptionBlocked =
      selectedProviderRequiresSubscription && !selectedProviderSubscriptionVerified;
    const routeDecision = resolveModelRouteDecision(searchAgentRunForm, selectedProvider, uiLanguage);
    const prompt = renderSearchAgentPrompt(searchAgentRunForm, uiLanguage, selectedProvider);
    const selectedProviderModel = routeDecision.model;
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
	                  ? `${selectedProviderName} 로컬 모델로 research-insight-planner-agent 작업을 직접 실행합니다. 결과는 채팅과 작업 실행 저장소에 남깁니다.`
	                  : `${selectedProviderName} 계정으로 research-insight-planner-agent 작업을 직접 실행합니다. 결과는 채팅과 작업 실행 저장소에 남깁니다.`
	                : "연결된 제공자 계정이 없어 CLI 실행 경로로 전환합니다. 계정을 연결하면 같은 버튼이 모델 API 작업을 바로 실행합니다."
              : selectedProviderReady
                ? selectedProviderLocal
                  ? `Running the research-insight-planner-agent directly with the local ${selectedProviderName} model. The result is stored in chat and the task-run store.`
                  : `Running the research-insight-planner-agent directly with ${selectedProviderName}. The result is stored in chat and the task-run store.`
                : `${selectedProviderName} has no connected account yet, so this falls back to the CLI lane. Connect an account to run the model API directly.`,
          meta: selectedProviderReady
            ? `${selectedProvider.providerId}:${selectedProviderModel} / ${routeDecision.tier} / ${routeDecision.connectorPolicyId}`
            : uiLanguage === "ko"
              ? `cli 대체 실행 / lane=${routeDecision.tier} / connector=${routeDecision.connectorPolicyId}`
              : `fallback=cli_lane / ${routeDecision.tier} / ${routeDecision.connectorPolicyId}`
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
      if (selectedProviderSubscriptionBlocked) {
        setSearchAgentChatMessages((current) =>
          [
            ...current,
            {
              id: `${requestId}-subscription-blocked`,
              role: "system" as const,
              title: uiLanguage === "ko" ? "구독 검증 필요" : "Subscription verification required",
              body:
                uiLanguage === "ko"
                  ? `${selectedProviderName}는 구독 검증이 필요합니다. 먼저 제공자 설정에서 구독 확인을 실행하세요.`
                  : `${selectedProviderName} requires subscription verification. Run verification in provider settings first.`,
              meta: "subscription_blocked"
            }
          ].slice(-12)
        );
        return;
      } else {
        setProviderTaskBusy(true);
        try {
          const report = await tauriInvoke<ProviderAgentTaskReport>("run_provider_agent_task", {
            providerId: selectedProvider.providerId,
            model: selectedProviderModel,
            taskKind: "research_insight_agent",
            prompt,
            systemPrompt: renderSearchAgentSystemPrompt(uiLanguage),
            modelRouteId: routeDecision.routeId,
            constraintProfileId: searchAgentRunForm.constraintProfileId,
            connectorPolicyId: routeDecision.connectorPolicyId,
            maxInputTokens: routeDecision.maxInputTokens,
            maxOutputTokens: routeDecision.maxOutputTokens,
            budgetUsd: routeDecision.budgetUsd
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
                meta: report.persistenceError || `http=${report.httpStatus ?? "n/a"} elapsed=${report.durationMs}ms tokens<=${report.maxOutputTokens ?? routeDecision.maxOutputTokens}`
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
        label: uiLanguage === "ko" ? "게스트 도구 계정" : "Guest tool accounts",
        detail:
          uiLanguage === "ko"
            ? "필요한 AI 코딩 도구 계정 상태"
            : "Account state for the AI coding tools you choose",
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
            ? "선택한 Git 레포의 파일/소스 표면"
            : "File and source surface for the selected Git repository",
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
        label: uiLanguage === "ko" ? "게스트 도구 계정 확인" : "Check guest tool accounts",
        detail:
          uiLanguage === "ko"
            ? "선택한 AI 도구가 계정이나 API 키를 필요로 하는지 확인합니다. 기본 작업공간 추적은 계정 설정 없이도 열립니다."
            : "Check whether the selected AI tool needs an account or API key. Workspace tracking still opens without provider setup.",
        ready: providerCredentials.configuredCount > 0,
        actionLabel: uiLanguage === "ko" ? "계정 설정" : "Accounts",
        icon: KeyRound,
        action: () => openSettingsTab("execution", "providers")
      },
      {
        id: "agent-core",
        label: uiLanguage === "ko" ? "분리 플랫폼 열기" : "Open Separate Platform",
        detail:
          uiLanguage === "ko"
            ? "커스텀 에이전트, 서브에이전트, 툴, 모델 런타임은 고급 플랫폼 영역에서 다룹니다."
            : "Custom agents, subagents, tools, and model runtimes live in the advanced platform area.",
        ready: agentCatalog.length > 0,
        actionLabel: uiLanguage === "ko" ? "고급 플랫폼" : "Advanced",
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
      return [
        {
        id: "import-workspace",
        label: uiLanguage === "ko" ? "Git 작업공간 가져오기" : "Import Git workspace",
        detail:
          uiLanguage === "ko"
            ? "기존 레포를 열거나, 원격 레포를 clone하거나, 새 Git 레포를 만들어 작업을 분리합니다."
            : "Open an existing repository, clone a remote repository, or create a new Git-backed workspace.",
        actionLabel: uiLanguage === "ko" ? "Git 작업공간" : "Git Workspace",
        badge: snapshot.stats.projects.toLocaleString("ko-KR"),
        targetSection: "source",
        nextStep: uiLanguage === "ko" ? "작업할 Git 레포를 선택하고 현재 작업 파일과 상태를 엽니다." : "Choose the Git repository and open its current files and status.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "open", label: "기존 Git 레포 열기", actionLabel: "가져오기", run: selectIntentStep("import-workspace", "source", "open") },
                { id: "clone", label: "원격 레포 clone", actionLabel: "Clone", run: selectIntentStep("import-workspace", "source", "clone") },
                { id: "create", label: "새 Git 레포 만들기", actionLabel: "새 레포", run: selectIntentStep("import-workspace", "source", "create") }
              ]
            : [
                { id: "open", label: "Open existing Git repo", actionLabel: "Import", run: selectIntentStep("import-workspace", "source", "open") },
                { id: "clone", label: "Clone remote repo", actionLabel: "Clone", run: selectIntentStep("import-workspace", "source", "clone") },
                { id: "create", label: "Create new Git repo", actionLabel: "New Repo", run: selectIntentStep("import-workspace", "source", "create") }
              ],
        icon: FolderKanban,
        keywords: ["git", "workspace", "repo", "repository", "import", "clone", "project", "작업공간", "레포", "가져오기"],
        run: () => openSection("source", { intentId: "import-workspace", flowStepId: "open" })
      },
      {
        id: "review-current-work",
        label: uiLanguage === "ko" ? "현재 작업 확인" : "Review current work",
        detail:
          uiLanguage === "ko"
            ? "작업 요약, 계획, 실행 순서, 근거 문서, 검증 기록을 시간순으로 봅니다."
            : "Review summaries, plans, task order, evidence documents, and validation records in work order.",
        actionLabel: uiLanguage === "ko" ? "작업 타임라인" : "Work Timeline",
        badge: recentHistory.length.toLocaleString("ko-KR"),
        targetSection: "history",
        nextStep: uiLanguage === "ko" ? "최근 작업 기록에서 계획과 결과를 먼저 확인합니다." : "Start from recent work history and inspect plan and outcome records.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "summary", label: "요약 확인", actionLabel: "타임라인", run: selectIntentStep("review-current-work", "history", "summary") },
                { id: "plan", label: "계획과 순서 확인", actionLabel: "계획", run: selectIntentStep("review-current-work", "history", "plan") },
                { id: "evidence", label: "근거와 검증 확인", actionLabel: "근거", run: selectIntentStep("review-current-work", "documents", "evidence") }
              ]
            : [
                { id: "summary", label: "Review summary", actionLabel: "Timeline", run: selectIntentStep("review-current-work", "history", "summary") },
                { id: "plan", label: "Review plan and order", actionLabel: "Plan", run: selectIntentStep("review-current-work", "history", "plan") },
                { id: "evidence", label: "Review evidence and validation", actionLabel: "Evidence", run: selectIntentStep("review-current-work", "documents", "evidence") }
              ],
        icon: History,
        keywords: ["summary", "plan", "timeline", "report", "evidence", "validation", "요약", "계획", "보고서", "근거", "검증"],
        run: () => openSection("history", { intentId: "review-current-work", flowStepId: "summary" })
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
        targetSection: "eval",
        nextStep: uiLanguage === "ko" ? "보류 질문을 확인하고 안전한 항목부터 답합니다." : "Review deferred questions and answer the safe items first.",
        flowSteps:
          uiLanguage === "ko"
            ? [
	                { id: "questions", label: "보류 질문 확인", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "eval", "questions") },
	                { id: "answer", label: "안전한 답변 선택", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "eval", "answer") },
	                { id: "resume", label: "작업 재개", actionLabel: "결정함", run: selectIntentStep("resolve-decisions", "desktop", "resume") }
              ]
            : [
                { id: "questions", label: "Review pending questions", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "eval", "questions") },
                { id: "answer", label: "Choose safe answers", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "eval", "answer") },
                { id: "resume", label: "Resume work", actionLabel: "Inbox", run: selectIntentStep("resolve-decisions", "desktop", "resume") }
              ],
        icon: Inbox,
        keywords: ["decision", "inbox", "blocked", "question", "결정", "보류", "질문", "막힘"],
        run: () => openSection("eval", { intentId: "resolve-decisions", flowStepId: "questions" })
      },
      {
        id: "check-setup",
        label: uiLanguage === "ko" ? "설정 점검" : "Check setup",
        detail:
          uiLanguage === "ko"
            ? "작업공간, Git 경계, CLI 어댑터, 질문 보류 기본값이 준비됐는지 확인합니다."
            : "Check workspace, Git boundary, CLI adapters, and question handling defaults.",
        actionLabel: uiLanguage === "ko" ? "작업 설정" : "Work Setup",
        badge: `${coreReadinessCount}/${coreSetupSteps.length}`,
        targetSection: "overview",
        nextStep: uiLanguage === "ko" ? "빠른 설정에서 작업공간, CLI 어댑터, 질문 보류 상태를 확인합니다." : "Check workspace, CLI adapter, and question handling in quick setup.",
        flowSteps:
          uiLanguage === "ko"
            ? [
                { id: "workspace", label: "작업공간 확인", actionLabel: "설정", run: () => openSection("source") },
	                { id: "adapters", label: "CLI 어댑터 확인", actionLabel: "설정", run: () => openSettingsTab("execution", "adapter") },
                { id: "questions", label: "질문 처리 확인", actionLabel: "설정", run: () => openSettingsTab("execution", "questions") }
              ]
            : [
                { id: "workspace", label: "Check workspace", actionLabel: "Settings", run: () => openSection("source") },
                { id: "adapters", label: "Check CLI adapters", actionLabel: "Settings", run: () => openSettingsTab("execution", "adapter") },
                { id: "questions", label: "Check question handling", actionLabel: "Settings", run: () => openSettingsTab("execution", "questions") }
              ],
        icon: Settings,
        keywords: ["setup", "settings", "account", "provider", "adapter", "설정", "계정", "어댑터"],
        run: () => {
          setActiveTaskIntentId("check-setup");
          setActiveTaskFlowStepId("workspace");
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
      openSettingsTab,
      rootToolItems.length,
      runtimeInitDefaults.adapterId,
      selectIntentStep,
      selectToolStep,
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
    () => activeTaskIntent || taskIntentItems.find((item) => item.id === "import-workspace") || taskIntentItems[0] || null,
    [activeTaskIntent, taskIntentItems]
  );
  const primaryHomeFlowStep = useMemo(() => {
    if (!primaryHomeIntent) {
      return null;
    }
    return primaryHomeIntent.flowSteps.find((step) => step.id === activeTaskFlowStepId) || primaryHomeIntent.flowSteps[0] || null;
  }, [activeTaskFlowStepId, primaryHomeIntent]);
  const PrimaryHomeIntentIcon = primaryHomeIntent?.icon;
  const homeStartFlow = useMemo<HomeStartFlowStep[]>(
    () => [
      {
        id: "prepare",
        label: uiLanguage === "ko" ? "준비" : "Prepare",
        detail: uiLanguage === "ko" ? "계정, CLI, 질문 보류" : "Accounts, CLI, questions",
        stateLabel:
          coreReadinessCount === coreSetupSteps.length
            ? uiLanguage === "ko"
              ? "완료"
              : "ready"
            : `${coreReadinessCount}/${coreSetupSteps.length}`,
        icon: KeyRound,
        run: () => openSettingsTab("execution", "quick")
      },
      {
        id: "choose",
        label: uiLanguage === "ko" ? "선택" : "Choose",
        detail: primaryHomeIntent?.label || (uiLanguage === "ko" ? "작업 목표" : "Work goal"),
        stateLabel: primaryHomeIntent?.actionLabel || (uiLanguage === "ko" ? "열기" : "open"),
        icon: ListFilter,
        run: () => primaryHomeIntent?.run()
      },
      {
        id: "run",
        label: uiLanguage === "ko" ? "실행" : "Run",
        detail: uiLanguage === "ko" ? "런타임 작업면" : "Runtime surface",
        stateLabel: runtimeInitDefaults.adapterId,
        icon: PlayCircle,
        run: () => openSection("desktop", { intentId: "run-work", flowStepId: "lane" })
      },
      {
        id: "evaluate",
        label: uiLanguage === "ko" ? "평가" : "Evaluate",
        detail: uiLanguage === "ko" ? "결과와 병목 확인" : "Results and bottlenecks",
        stateLabel: `${visibleEvaluations.toLocaleString("ko-KR")} evals`,
        icon: ClipboardCheck,
        run: () => openSection("eval", { intentId: "evaluate-work", flowStepId: "current" })
      }
    ],
    [
      coreReadinessCount,
      coreSetupSteps.length,
      openSection,
      openSettingsTab,
      primaryHomeIntent,
      runtimeInitDefaults.adapterId,
      uiLanguage,
      visibleEvaluations
    ]
  );
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
        id: "git-workspaces",
        label: uiLanguage === "ko" ? "레포지토리" : "Repositories",
        value: snapshot.stats.projects.toLocaleString("ko-KR"),
        detail: uiLanguage === "ko" ? "Git 경계" : "Git boundaries",
        icon: GitBranch
      }
    ],
    [
      attentionItems.length,
      collaborationBoard.summary.activeTasks,
      collaborationBoard.summary.blockedTasks,
      snapshot.stats.projects,
      snapshot.stats.tasks,
      uiLanguage
    ]
  );
  const homeMainFeatures = useMemo<CoreFeatureDrilldownItem[]>(
    () => [
      {
        id: "workspace",
        label: uiLanguage === "ko" ? "Git 작업공간" : "Git Workspaces",
        kicker: uiLanguage === "ko" ? "핵심 1" : "Core 1",
        title: uiLanguage === "ko" ? "모든 작업은 별도 Git 레포로 가져옵니다" : "Every work unit starts as a separate Git repository",
        detail:
          uiLanguage === "ko"
            ? "기존 레포 열기, 원격 clone, 새 레포 만들기를 같은 흐름에 두고 작업 요약과 보고서를 해당 레포에 붙입니다."
            : "Open existing repositories, clone remotes, or create new repositories, then keep summaries and reports attached to that repo.",
        icon: FolderKanban,
        metric: `${snapshot.stats.projects.toLocaleString("ko-KR")} repos`,
        cta: uiLanguage === "ko" ? "작업공간 열기" : "Open Workspaces",
        run: selectIntentStep("import-workspace", "source", "open"),
        connections:
          uiLanguage === "ko"
            ? [
                { id: "workspace-open", label: "기존 레포 열기", detail: "Git 작업공간", run: selectIntentStep("import-workspace", "source", "open") },
                { id: "workspace-clone", label: "원격 clone", detail: "새 작업공간", run: selectIntentStep("import-workspace", "source", "clone") },
                { id: "workspace-report", label: "작업 보고 연결", detail: "보고서/근거", run: selectIntentStep("evaluate-work", "eval", "current") }
              ]
            : [
                { id: "workspace-open", label: "Open repo", detail: "Git workspace", run: selectIntentStep("import-workspace", "source", "open") },
                { id: "workspace-clone", label: "Clone remote", detail: "New workspace", run: selectIntentStep("import-workspace", "source", "clone") },
                { id: "workspace-report", label: "Attach reports", detail: "Reports / evidence", run: selectIntentStep("evaluate-work", "eval", "current") }
              ],
        steps:
          uiLanguage === "ko"
            ? ["레포 선택 또는 생성", "작업 파일과 Git 상태 확인", "보고서와 근거를 작업에 연결"]
            : ["Choose or create a repository", "Inspect files and Git state", "Attach reports and evidence to the work"]
      },
      {
        id: "run",
        label: uiLanguage === "ko" ? "터미널/AI 실행" : "Terminal / AI Run",
        kicker: uiLanguage === "ko" ? "핵심 2" : "Core 2",
        title: uiLanguage === "ko" ? "Codex, Claude Code, Cursor, Antigravity를 게스트 도구로 씁니다" : "Use Codex, Claude Code, Cursor, and Antigravity as guest tools",
        detail:
          uiLanguage === "ko"
            ? "AI 도구들은 하나의 앱 내부 기능이 아니라 선택한 Git 작업공간 위에서 실행되는 교체 가능한 표면입니다."
            : "AI tools are replaceable surfaces launched over the selected Git workspace, not one fused internal product.",
        icon: SquareTerminal,
        metric: runtimeInitDefaults.adapterId,
        cta: uiLanguage === "ko" ? "터미널 실행 열기" : "Open Terminal Run",
        run: selectIntentStep("run-work", "desktop", "lane"),
        connections:
          uiLanguage === "ko"
            ? [
                { id: "run-lane", label: "도구 선택", detail: "Codex/Claude/Cursor", run: selectIntentStep("run-work", "desktop", "lane") },
                { id: "run-start", label: "실제 셸 시작", detail: "터미널 상태", run: selectIntentStep("run-work", "desktop", "start") },
                { id: "run-result", label: "결과 기록", detail: "보고서로 연결", run: selectIntentStep("run-work", "desktop", "result") }
              ]
            : [
                { id: "run-lane", label: "Choose tool", detail: "Codex/Claude/Cursor", run: selectIntentStep("run-work", "desktop", "lane") },
                { id: "run-start", label: "Start live shell", detail: "Terminal state", run: selectIntentStep("run-work", "desktop", "start") },
                { id: "run-result", label: "Record output", detail: "Attach report", run: selectIntentStep("run-work", "desktop", "result") }
              ],
        steps:
          uiLanguage === "ko"
            ? ["작업공간 선택", "AI 도구 또는 실제 셸 실행", "출력과 결정 기록"]
            : ["Choose workspace", "Launch AI tool or live shell", "Record output and decisions"]
      },
      {
        id: "timeline",
        label: uiLanguage === "ko" ? "작업 타임라인" : "Work Timeline",
        kicker: uiLanguage === "ko" ? "핵심 3" : "Core 3",
        title: uiLanguage === "ko" ? "현재 작업의 요약, 계획, 순서를 시간순으로 봅니다" : "Review summaries, plans, and task order in time sequence",
        detail:
          uiLanguage === "ko"
            ? "기획 문서, 요청 추적, 작업 요약, 검증 기록을 작업 순서로 묶어 지금 어디까지 왔는지 보여줍니다."
            : "Plans, request traces, work summaries, and validation records are grouped by work order so progress is clear.",
        icon: History,
        metric: `${recentHistory.length.toLocaleString("ko-KR")} records`,
        cta: uiLanguage === "ko" ? "타임라인 열기" : "Open Timeline",
        run: selectIntentStep("review-current-work", "history", "summary"),
        connections:
          uiLanguage === "ko"
            ? [
                { id: "timeline-summary", label: "요약", detail: "최근 작업", run: selectIntentStep("review-current-work", "history", "summary") },
                { id: "timeline-plan", label: "계획", detail: "작업 순서", run: selectIntentStep("review-current-work", "history", "plan") },
                { id: "timeline-evidence", label: "근거", detail: "문서 연결", run: selectIntentStep("review-current-work", "documents", "evidence") }
              ]
            : [
                { id: "timeline-summary", label: "Summary", detail: "Recent work", run: selectIntentStep("review-current-work", "history", "summary") },
                { id: "timeline-plan", label: "Plan", detail: "Task order", run: selectIntentStep("review-current-work", "history", "plan") },
                { id: "timeline-evidence", label: "Evidence", detail: "Document links", run: selectIntentStep("review-current-work", "documents", "evidence") }
              ],
        steps:
          uiLanguage === "ko"
            ? ["요청 요약 확인", "계획과 작업 순서 확인", "결과와 검증으로 이동"]
            : ["Review request summary", "Review plan and task order", "Move to results and validation"]
      },
      {
        id: "eval",
        label: uiLanguage === "ko" ? "보고서/근거" : "Reports / Evidence",
        kicker: uiLanguage === "ko" ? "근거 확인" : "Evidence",
        title: uiLanguage === "ko" ? "작업 결과와 검증 근거를 보고서로 받습니다" : "Receive work results and validation evidence as reports",
        detail:
          uiLanguage === "ko"
            ? "평가 기록, 웹 검색, 작업 요약, 검증 결과를 한곳에 모아 현재 작업을 신뢰할 수 있는지 확인합니다."
            : "Evaluations, web research, work summaries, and validation results are gathered so the user can trust the current work.",
        icon: ClipboardCheck,
        metric: `${visibleEvaluations.toLocaleString("ko-KR")} evals`,
        cta: uiLanguage === "ko" ? "보고서 열기" : "Open Reports",
        run: selectIntentStep("evaluate-work", "eval", "current"),
        connections:
          uiLanguage === "ko"
            ? [
                { id: "eval-current", label: "현재 점수", detail: "작업 평가", run: selectIntentStep("evaluate-work", "eval", "current") },
                { id: "eval-compare", label: "사용 비교", detail: "토큰/툴 비교", run: selectIntentStep("evaluate-work", "eval", "compare") },
                { id: "eval-open-source", label: "후보 판단", detail: "오픈소스 EVAL", run: selectIntentStep("evaluate-work", "eval", "opensource") }
              ]
            : [
                { id: "eval-current", label: "Current score", detail: "Work evaluation", run: selectIntentStep("evaluate-work", "eval", "current") },
                { id: "eval-compare", label: "Usage comparison", detail: "Token/tool comparison", run: selectIntentStep("evaluate-work", "eval", "compare") },
                { id: "eval-open-source", label: "Judge candidates", detail: "Open-source eval", run: selectIntentStep("evaluate-work", "eval", "opensource") }
              ],
        steps:
          uiLanguage === "ko"
            ? ["현재 작업 점수 확인", "토큰/툴 사용 비교", "오픈소스 EVAL 후보 판단"]
            : ["Review current work score", "Compare token/tool usage", "Judge open-source eval candidates"]
      },
      {
        id: "projects",
        label: uiLanguage === "ko" ? "레포지토리 경계" : "Repository Boundaries",
        kicker: uiLanguage === "ko" ? "다중 프로젝트" : "Multi-project",
        title: uiLanguage === "ko" ? "새 프로젝트는 별도 Git으로 관리합니다" : "New projects are managed as separate Git repositories",
        detail:
          uiLanguage === "ko"
            ? "현재 루트 프로젝트 경계와 새로 생기는 Git 작업공간을 분리해서, 어떤 레포에서 무엇을 하는지 명확히 봅니다."
            : "Root project boundaries and new Git workspaces stay separated so each repository's work is clear.",
        icon: GitBranch,
        metric: `${snapshot.stats.projects.toLocaleString("ko-KR")} projects`,
        cta: uiLanguage === "ko" ? "레포 경계 보기" : "View Boundaries",
        run: () => openSection("projects"),
        connections:
          uiLanguage === "ko"
            ? [
                { id: "project-registry", label: "등록 레포", detail: "프로젝트 경계", run: () => openSection("projects") },
                { id: "project-files", label: "작업 파일", detail: "Git 작업공간", run: selectIntentStep("open-files", "source", "file") },
                { id: "project-requirements", label: "요구사항", detail: "작업 기준", run: () => openSection("requirements") }
              ]
            : [
                { id: "project-registry", label: "Registered repos", detail: "Project boundary", run: () => openSection("projects") },
                { id: "project-files", label: "Work files", detail: "Git workspace", run: selectIntentStep("open-files", "source", "file") },
                { id: "project-requirements", label: "Requirements", detail: "Work criteria", run: () => openSection("requirements") }
              ],
        steps:
          uiLanguage === "ko"
            ? ["레포 경계 확인", "작업 파일 확인", "요구사항과 검증 연결"]
            : ["Check repo boundaries", "Inspect work files", "Attach requirements and validation"]
      }
    ],
    [
      openSection,
      recentHistory.length,
      runtimeInitDefaults.adapterId,
      selectIntentStep,
      snapshot.stats.projects,
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
        label: uiLanguage === "ko" ? "연결 상태" : "Connection State",
        detail: uiLanguage === "ko" ? "계정, CLI 어댑터, 작업공간 상태만 봅니다." : "View account, CLI adapter, and workspace state.",
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
        label: uiLanguage === "ko" ? "작업 실행" : "Work Run",
        detail: uiLanguage === "ko" ? "작업공간, CLI, 질문, 터미널" : "Workspace, CLI, questions, terminal",
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
        label: uiLanguage === "ko" ? "고급 제공자 계정" : "Advanced Provider Accounts",
        detail:
          uiLanguage === "ko"
            ? "직접 모델 실행과 계정 관리는 기본 작업 추적 흐름이 아니라 고급 agent-platform 연동 영역입니다."
            : "Direct model execution and provider accounts are advanced agent-platform integration settings, not the default tracking flow.",
        group: uiLanguage === "ko" ? "고급 설정" : "Advanced Setup",
        icon: KeyRound,
        badge: `${providerCredentials.configuredCount}/${providerCredentials.providers.length || 3}`,
        keywords: ["openai", "chatgpt", "claude", "anthropic", "gemini", "google", "api key", "provider", "account"],
        run: () => openSettingsTab("execution", "providers")
      },
      {
        id: "connect-chatbot",
        label: uiLanguage === "ko" ? "고급 에이전트 채팅" : "Advanced Agent Chat",
        detail:
          uiLanguage === "ko"
            ? "모델 API 직접 실행은 별도 에이전트 플랫폼 기능으로 분리하고, 기본 앱은 터미널/AI 도구 실행과 보고서 추적을 우선합니다."
            : "Direct model API execution belongs to the separated agent platform; the default app prioritizes terminal/AI tool runs and reports.",
        group: uiLanguage === "ko" ? "고급 에이전트" : "Advanced Agent",
        icon: Bot,
        badge:
          providerCredentials.configuredCount > 0
            ? uiLanguage === "ko"
              ? "계정 연결"
              : "account"
            : uiLanguage === "ko"
              ? "설정 필요"
              : "setup",
        keywords: ["chatbot", "chat", "agent chat", "connect", "provider", "terminal", "task run", "챗봇", "채팅", "연결"],
        run: openSearchAgentWorkbench
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
        label: uiLanguage === "ko" ? "작업 실행" : "Work Execution",
        detail: uiLanguage === "ko" ? "작업공간, Git 상태, 터미널, 게스트 AI 도구, 질문 보류를 한 곳에서 정합니다." : "Set workspace, Git state, terminal, guest AI tools, and question deferral in one place.",
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
  const trimmedCommandQuery = commandQuery.trim();
  const normalizedCommandQuery = trimmedCommandQuery.toLowerCase();
  const filteredCommandItems = useMemo(() => {
    return normalizedCommandQuery
      ? commandItems.filter((item) =>
          `${item.group} ${item.label} ${item.detail} ${item.keywords.join(" ")}`
            .toLowerCase()
            .includes(normalizedCommandQuery)
        )
      : commandItems.slice(0, 18);
  }, [commandItems, normalizedCommandQuery]);
  const recommendedCommandItems = useMemo(() => {
    const recommendedIds = ["intent-import-workspace", "terminal-drawer-open", "action-evidence", "settings-execution"];
    const commandById = new Map(commandItems.map((item) => [item.id, item]));
    return recommendedIds
      .map((id) => commandById.get(id))
      .filter((item): item is CommandItem => Boolean(item));
  }, [commandItems]);
  const commandResultCount = filteredCommandItems.length;
  const commandResultStatusText = normalizedCommandQuery
    ? uiLanguage === "ko"
      ? `${commandResultCount.toLocaleString("ko-KR")}개 결과 - "${trimmedCommandQuery}"`
      : `${commandResultCount.toLocaleString("en-US")} ${commandResultCount === 1 ? "result" : "results"} for "${trimmedCommandQuery}"`
    : uiLanguage === "ko"
      ? `추천 ${recommendedCommandItems.length.toLocaleString("ko-KR")}개 - 빠른 실행 ${commandResultCount.toLocaleString("ko-KR")}개`
      : `${recommendedCommandItems.length.toLocaleString("en-US")} recommended - ${commandResultCount.toLocaleString("en-US")} quick actions`;
  const runCommandItem = (item: CommandItem) => {
    item.run();
    setCommandPaletteOpen(false);
    setCommandQuery("");
  };
  const renderRecommendedCommandButtons = (context: "default" | "empty") =>
    recommendedCommandItems.map((item) => (
      <Button
        key={`${context}-${item.id}`}
        variant="ghost"
        size="sm"
        className="command-palette-recommendation"
        onClick={() => runCommandItem(item)}
        data-command-palette-recommendation={item.id}
        data-command-palette-recommendation-context={context}
      >
        <item.icon size={15} aria-hidden="true" />
        <span>{item.label}</span>
      </Button>
    ));

  return (
    <main className={`desktop-app-root theme-${themeMode}`} aria-busy={sectionContentReady ? undefined : true}>
      <div
        className={`desktop-app-shell sidebar-${sidebarMode}`}
        data-ui-foundation="gestalt-hierarchy-density"
        data-layout-model="intellij-tool-window-editor"
      >
        <DesktopActivityRail
          language={uiLanguage}
          activeSectionId={section}
          homeSectionId="overview"
          sections={workVisibleSections}
          showOperatorCenter={currentViewMode.id !== "user"}
          onPrimeSection={primeSectionActivation}
          onOpenSection={openSection}
          onOpenOperatorCenter={() => setOperatorCenterOpen(true)}
          onOpenSettings={() => openSettingsTab("appearance")}
        />

        <section
          className="desktop-viewport"
          data-active-section={section}
          data-section-content-ready={sectionContentReady ? "true" : "false"}
          data-resident-section-count={residentSectionIds.length}
          data-resident-section-limit={maxResidentSectionPanels}
          data-primary-work-surface={isPrimaryWorkSurface ? "true" : undefined}
          data-intellij-zone="editor-plane"
          aria-label={uiLanguage === "ko" ? "데스크톱 앱 작업 화면" : "Desktop app viewport"}
          tabIndex={0}
        >
          <header className="desktop-titlebar" data-tauri-drag-region="deep">
            <div className="titlebar-section" data-tauri-drag-region="deep">
              {currentSection ? <currentSection.icon size={18} aria-hidden="true" /> : <LayoutDashboard size={18} aria-hidden="true" />}
              <div className="titlebar-location" data-tauri-drag-region="deep">
                <span className="titlebar-mode-label" data-tauri-drag-region="deep">{currentViewMode.label}</span>
                <nav className="titlebar-breadcrumb" aria-label={uiLanguage === "ko" ? "현재 위치" : "Current location"} data-current-location-trail>
                  <ol>
                    <li>
                      <button
                        type="button"
                        onPointerDown={() => primeSectionActivation("overview")}
                        onClick={() => openSection("overview")}
                        data-titlebar-breadcrumb="home"
                        aria-label={uiLanguage === "ko" ? "작업공간 홈으로 이동" : "Go to workspace home"}
                      >
                        {uiLanguage === "ko" ? "홈" : "Home"}
                      </button>
                    </li>
                    <li>
                      <span className="titlebar-breadcrumb-label" data-titlebar-breadcrumb="group">
                        {currentFeatureGroup?.label || (uiLanguage === "ko" ? "작업" : "Work")}
                      </span>
                    </li>
                    <li>
                      <span
                        ref={titlebarSectionLabelRef}
                        className="titlebar-current-label"
                        data-titlebar-breadcrumb="section"
                        aria-current="page"
                        title={currentSection?.purpose}
                      >
                        {currentSectionLabel}
                      </span>
                    </li>
                  </ol>
                </nav>
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
                      uiLanguage === "ko"
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
        <ViewportOverlayPortal target={overlayPortalTarget}>
          <div
            className="command-palette-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setCommandPaletteOpen(false);
              }
            }}
          >
            <section ref={commandPaletteDialogRef} className="command-palette" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "명령 검색" : "Command palette"} tabIndex={-1}>
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
                  placeholder={uiLanguage === "ko" ? "하고 싶은 일 검색: 작업공간, 실행, 보고서, 파일, 설정" : "Search goals: workspace, run, reports, files, setup"}
                />
                <Button variant="secondary" size="sm" onClick={() => setCommandPaletteOpen(false)}>
                  {uiLanguage === "ko" ? "닫기" : "Close"}
                </Button>
              </div>
              <div className="command-palette-meta">
                <span role="status" aria-live="polite" className="command-palette-live-status">
                  {commandResultStatusText}
                </span>
                <span>{currentViewMode.label}</span>
              </div>
              {!normalizedCommandQuery && recommendedCommandItems.length > 0 && (
                <div className="command-palette-recommendations" aria-label={uiLanguage === "ko" ? "추천 명령" : "Recommended commands"}>
                  {renderRecommendedCommandButtons("default")}
                </div>
              )}
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
                  <div className="command-palette-empty-state" role="note" data-command-palette-empty-state="true">
                    <Search size={18} aria-hidden="true" />
                    <strong>{uiLanguage === "ko" ? "일치하는 명령이 없습니다" : "No matching command"}</strong>
                    <span>
                      {uiLanguage === "ko"
                        ? "다른 표현으로 검색하거나 추천 명령에서 바로 이어가세요."
                        : "Try a different phrase or continue with a recommended command."}
                    </span>
                    <div className="command-palette-recommendations compact" aria-label={uiLanguage === "ko" ? "대체 추천 명령" : "Alternative recommended commands"}>
                      {renderRecommendedCommandButtons("empty")}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </ViewportOverlayPortal>
      )}

      {settingsOpen && (
        <ViewportOverlayPortal target={overlayPortalTarget}>
          <div
            className="settings-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSettingsOpen(false);
              }
            }}
          >
            <section ref={settingsDialogRef} className="settings-dialog" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "설정" : "Settings"} tabIndex={-1}>
            <header>
              <div>
                <p className="eyebrow">{uiLanguage === "ko" ? "앱 설정" : "Preferences"}</p>
                <h2>{uiLanguage === "ko" ? "설정" : "Settings"}</h2>
              </div>
              <button ref={settingsCloseButtonRef} type="button" onClick={() => setSettingsOpen(false)} title={uiLanguage === "ko" ? "설정 닫기" : "Close settings"}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <div className="settings-dialog-body">
              <nav className="settings-tab-list" role="tablist" aria-label={uiLanguage === "ko" ? "설정 대분류" : "Settings categories"}>
                {settingsTabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={settingsTab === item.id}
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
                          <span>{uiLanguage === "ko" ? "작업 실행 설정" : "Work execution setup"}</span>
                          <strong>
                            {uiLanguage === "ko"
                              ? `작업공간과 게스트 AI 실행 준비 ${coreReadinessCount}/${coreSetupSteps.length}`
                              : `Workspace and guest AI run readiness ${coreReadinessCount}/${coreSetupSteps.length}`}
                          </strong>
                          <small>
                            {uiLanguage === "ko"
	                              ? "먼저 작업공간, 터미널 실행 경로, 질문 보류, 필요한 계정 상태를 맞추면 현재 작업을 바로 추적할 수 있습니다."
                              : "Set workspace, terminal lanes, question deferral, and needed account state first to track current work immediately."}
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
                        <button
                          type="button"
                          onClick={() => setRuntimeInitDefaults(defaultRuntimeInitDefaults)}
                          aria-label={uiLanguage === "ko" ? "추천 기본값 적용" : "Apply recommended defaults"}
                          title={uiLanguage === "ko" ? "추천 기본값 적용" : "Apply recommended defaults"}
                        >
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "추천값" : "Defaults"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRuntimeInitDefaults(defaultRuntimeInitDefaults);
                            openTerminalDrawer();
                            setSettingsOpen(false);
                          }}
                          aria-label={uiLanguage === "ko" ? "터미널로 바로 가기" : "Go to terminal"}
                          title={uiLanguage === "ko" ? "터미널로 바로 가기" : "Go to terminal"}
                        >
                          <SquareTerminal size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
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
                        effectiveDefaultModelForProvider={effectiveProviderModelFor}
                        onClear={clearProviderCredential}
                        onInputChange={updateProviderCredentialInput}
                        onOpenUrl={openProviderAuthUrl}
                        onRefresh={refreshProviderCredentials}
                        onRefreshModels={(providerId) => refreshProviderModels(providerId, true)}
                        onSave={saveProviderCredential}
                        onVerifySubscription={verifyProviderSubscription}
                        onUseProvider={(provider, modelId) => {
                          setSearchAgentRunForm((current) => ({
                            ...current,
                            providerId: provider.providerId,
                            model: modelId || effectiveProviderModelFor(provider)
                          }));
                          const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
                          setProviderCredentialNotice(
                            uiLanguage === "ko"
                              ? `${providerName}를 에이전트 작업 기본값으로 선택했습니다.`
                              : `${providerName} selected as the agent work default.`
                          );
                          setProviderActionFeedback({
                            providerId: provider.providerId,
                            action: "use",
                            tone: "success",
                            message: uiLanguage === "ko"
                              ? `${providerName}를 에이전트 작업 기본값으로 선택했습니다.`
                              : `${providerName} selected as the agent work default.`
                          });
                        }}
                      />
                    )}

                    {activeSettingsSubsection === "customization" && (
                      <RuntimeCustomizationPanel
                        uiLanguage={uiLanguage}
                        report={providerCredentials}
                        customization={runtimeCustomization}
                        onProviderChange={updateRuntimeProviderOverride}
                        onProviderReset={resetRuntimeProviderOverride}
                        onTerminalChange={updateRuntimeTerminalCustomization}
                        onQuickCommandChange={updateRuntimeQuickCommand}
                        onAddQuickCommand={addRuntimeQuickCommand}
                        onRemoveQuickCommand={removeRuntimeQuickCommand}
                        onResetQuickCommands={resetRuntimeQuickCommands}
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
                          const guideInstall = localizedAdapterGuideText(setupGuide, uiLanguage, "installHint");
                          const guideAuth = localizedAdapterGuideText(setupGuide, uiLanguage, "authHint");
                          return (
                            <button
                              key={adapter.adapterId}
                              className={runtimeInitDefaults.adapterId === adapter.adapterId ? "active" : ""}
                              onClick={() => setRuntimeInitDefaults((current) => ({ ...current, adapterId: adapter.adapterId }))}
                              type="button"
                              title={guideInstall || adapter.command}
                            >
                              <span>{adapter.label}</span>
                              <strong>{providerAuthStatusForAdapter(adapter.adapterId, providerCredentials, uiLanguage)}</strong>
                              <small>{authReady ? localizedAdapterGuideText(setupGuide, uiLanguage, "firstRunCommand") : guideAuth}</small>
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
                        <button
                          type="button"
                          onClick={() => openProviderSettings()}
                          aria-label={uiLanguage === "ko" ? "계정 연결 설정으로 이동" : "Open provider accounts"}
                          title={uiLanguage === "ko" ? "계정 연결 설정으로 이동" : "Open provider accounts"}
                        >
                          <KeyRound size={14} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "계정" : "Accounts"}</span>
                        </button>
                        <button
                          type="button"
                          data-runtime-setup-check-action="settings"
                          onClick={() => void runRuntimeSetupCheck()}
                          disabled={runtimeSetupCheckBusy}
                          aria-label={uiLanguage === "ko" ? "런타임 설정 점검" : "Check runtime setup"}
                          title={uiLanguage === "ko" ? "런타임 설정 점검" : "Check runtime setup"}
                        >
                          <RefreshCw size={14} aria-hidden="true" />
                          <span>{runtimeSetupCheckBusy ? uiLanguage === "ko" ? "점검 중" : "Checking" : uiLanguage === "ko" ? "점검" : "Check"}</span>
                        </button>
                      </div>
                      <div className="runtime-setup-check-panel" data-runtime-setup-check="settings" role="status" aria-live="polite">
                        <header>
                          <span>{uiLanguage === "ko" ? "설정 점검" : "Setup check"}</span>
                          <strong>{runtimeSetupStatusLabel}</strong>
                        </header>
                        <div className="runtime-setup-check-grid">
                          <article
                            className={
                              selectedRuntimeTerminalReady ? "ready" : selectedRuntimeTerminalCheck ? "failed" : "pending"
                            }
                            data-runtime-setup-check-terminal={selectedRuntimeTerminalCheck?.status || "not-checked"}
                          >
                            <span>{selectedRuntimeTerminalReady ? <CheckCircle2 size={14} aria-hidden="true" /> : <AlertTriangle size={14} aria-hidden="true" />}</span>
                            <div>
                              <strong>{uiLanguage === "ko" ? "터미널 셸" : "Terminal shell"}</strong>
                              <small>
                                {selectedRuntimeTerminalCheck?.resolvedPath ||
                                  selectedRuntimeTerminalCheck?.error ||
                                  (runtimeCustomization.terminal.shellCommand.trim()
                                    ? runtimeCustomization.terminal.shellCommand.trim()
                                    : uiLanguage === "ko" ? "시스템 기본 셸 대기" : "Waiting for system default shell")}
                              </small>
                              {selectedRuntimeTerminalCheck?.workingDir && <code>{selectedRuntimeTerminalCheck.workingDir}</code>}
                            </div>
                          </article>
                          <article
                            className={selectedRuntimeCliVerifyReady ? "ready" : selectedRuntimeSetupCliCheck ? "failed" : "pending"}
                            data-runtime-setup-check-cli={selectedRuntimeSetupCliCheck?.status || "not-checked"}
                          >
                            <span>{selectedRuntimeCliVerifyReady ? <CheckCircle2 size={14} aria-hidden="true" /> : <AlertTriangle size={14} aria-hidden="true" />}</span>
                            <div>
                              <strong>{selectedRuntimeAdapterOption.label}</strong>
                              <small>
                                {selectedRuntimeSetupAdapterStatus?.resolvedPath ||
                                  selectedRuntimeSetupCliCheck?.output ||
                                  selectedRuntimeSetupCliCheck?.stderr ||
                                  selectedRuntimeAdapterGuideKoOrEn("verifyCommand")}
                              </small>
                              <code>{selectedRuntimeSetupCliCheck?.status || selectedRuntimeAdapterOption.command}</code>
                            </div>
                          </article>
                        </div>
                        {runtimeSetupCheckError && <small className="runtime-setup-check-error">{runtimeSetupCheckError}</small>}
                      </div>
                      <div className="cli-adapter-setup-outcome">
                        <span>{uiLanguage === "ko" ? "첫 실행 결과" : "First-run result"}</span>
                        <strong>{selectedRuntimeAdapterGuideKoOrEn("expectedResult")}</strong>
                        <small>{selectedRuntimeAdapterGuideKoOrEn("caution")}</small>
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
                      <div className="settings-action-row">
                        <button
                          type="button"
                          data-desktop-action-feedback="sync-settings"
                          onClick={() => {
                            requestRuntimeSettingsSync("manual", { includeSourceCatalog: true, forceSourceRefresh: true });
                            openSection("desktop");
                          }}
                          disabled={!getTauriInvoke()}
                        >
                          <RefreshCw size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "설정 즉시 동기화" : "Sync settings now"}</span>
                          <small>{uiLanguage === "ko" ? "데스크톱 런타임 패널에서 계정, CLI, 작업공간, 서비스 상태를 다시 읽습니다." : "The desktop runtime panel reloads accounts, CLIs, workspace, and service state."}</small>
                        </button>
                      </div>
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
        </ViewportOverlayPortal>
      )}

      {operatorCenterOpen && (
        <ViewportOverlayPortal target={overlayPortalTarget}>
          <OperatorCenterDialog
            sections={operatorCenterSections}
            language={uiLanguage}
            onClose={() => setOperatorCenterOpen(false)}
            onOpenSection={openSection}
          />
        </ViewportOverlayPortal>
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
              </section>
            </>
          )}

          {shouldRenderSection("overview") && (
            <MountedSectionPanel id="overview" active={section === "overview"}>
              <div className="desktop-home-grid">
              <span id="overview-home" className="home-route-anchor" aria-hidden="true" />
              <section className="simple-user-start-panel" data-simple-user-start aria-label={uiLanguage === "ko" ? "작업 시작" : "Start work"}>
                <div className="simple-user-start-copy">
                  <p className="eyebrow">{uiLanguage === "ko" ? "작업 시작" : "Start"}</p>
                  <h2>{uiLanguage === "ko" ? "Git 작업공간을 고르고 현재 작업을 바로 추적합니다" : "Choose a Git workspace and track the current work"}</h2>
                  <div className="simple-user-status-row" aria-label={uiLanguage === "ko" ? "현재 상태" : "Current state"}>
                    <span>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {coreReadinessCount}/{coreSetupSteps.length}
                    </span>
                    <span>
                      <SquareTerminal size={14} aria-hidden="true" />
                      {runtimeInitDefaults.adapterId}
                    </span>
                    <span>
                      <Inbox size={14} aria-hidden="true" />
                      {(attentionItems.length + collaborationBoard.summary.blockedTasks).toLocaleString("ko-KR")}
                    </span>
                  </div>
                </div>
                <div className="simple-user-task-card">
                  <textarea
                    ref={homeTaskPromptRef}
                    value={homeTaskPrompt}
                    onChange={(event) => setHomeTaskPrompt(event.target.value)}
                    placeholder={uiLanguage === "ko" ? "지금 처리할 작업을 입력하세요" : "Type the task to run now"}
                    aria-label={uiLanguage === "ko" ? "작업 요청" : "Task request"}
                    rows={4}
                  />
                  <div className="simple-user-actions">
                    <button type="button" className="primary" onClick={startSimpleUserTask}>
                      <PlayCircle size={16} aria-hidden="true" />
                      <span>{uiLanguage === "ko" ? "자동 시작" : "Start"}</span>
                    </button>
                    <button type="button" onClick={() => openSection("desktop", { intentId: "run-work", flowStepId: "lane" })}>
                      <SquareTerminal size={16} aria-hidden="true" />
                      <span>{uiLanguage === "ko" ? "실행 상태" : "Runtime"}</span>
                    </button>
                    <button type="button" onClick={() => openSection("eval", { intentId: "evaluate-work", flowStepId: "current" })}>
                      <ClipboardCheck size={16} aria-hidden="true" />
                      <span>{uiLanguage === "ko" ? "보고서 확인" : "Reports"}</span>
                    </button>
                  </div>
                </div>
              </section>
              <WorkspaceProductSplitPanel
                productSplit={snapshot.productSplit}
                language={uiLanguage}
                onOpenSection={openSection}
                activeWorkspaceLabel={snapshot.repoRootName}
                activeWorkCount={collaborationBoard.summary.activeTasks + attentionItems.length}
                reportCount={visibleEvaluations + visibleWebSearches + recentHistory.length}
              />
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

                  <section className="home-start-flow" data-home-start-flow aria-label={uiLanguage === "ko" ? "오늘 시작 흐름" : "Today start flow"}>
                    <header>
                      <div>
                        <p className="eyebrow">{uiLanguage === "ko" ? "오늘 흐름" : "Today Flow"}</p>
                        <h3>{uiLanguage === "ko" ? "준비에서 평가까지" : "Prepare to evaluation"}</h3>
                      </div>
                      <span>{uiLanguage === "ko" ? "4단계" : "4 steps"}</span>
                    </header>
                    <ol>
                      {homeStartFlow.map((step, index) => (
                        <li key={step.id}>
                          <button type="button" onClick={step.run} data-home-flow-step={step.id}>
                            <span className="home-flow-index">{index + 1}</span>
                            <step.icon size={16} aria-hidden="true" />
                            <span>
                              <strong>{step.label}</strong>
                              <small>{step.detail}</small>
                            </span>
                            <em>{step.stateLabel}</em>
                            <ArrowRight size={14} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ol>
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
                    <section className="panel core-setup-panel home-depth-panel" aria-label={uiLanguage === "ko" ? "작업 시작 설정" : "Work start setup"}>
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">{uiLanguage === "ko" ? "작업 시작" : "Work Start"}</p>
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
                    <h2>{uiLanguage === "ko" ? "연결 상태" : "Connection State"}</h2>
                  </div>
                </div>
                    <section className="panel root-tool-panel home-depth-panel" aria-label={uiLanguage === "ko" ? "작업 연결 상태" : "Work connection state"}>
                      <div className="panel-heading">
                        <div>
                          <p className="eyebrow">{uiLanguage === "ko" ? "연결 상태" : "Connection State"}</p>
                          <h2>{uiLanguage === "ko" ? "작업에 필요한 연결만 확인합니다" : "Check only the connections needed for work"}</h2>
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
                      <Metric label="Connections" value={rootToolItems.length} icon={Code2} tone="violet" />
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
            runtimeCustomization={runtimeCustomization}
            setRuntimeCustomization={setRuntimeCustomization}
            providerCredentialReport={providerCredentials}
            onRefreshProviderCredentials={refreshProviderCredentials}
            settingsSyncRequest={runtimeSettingsSyncRequest}
            onSettingsSyncRequestConsumed={consumeRuntimeSettingsSyncRequest}
            launchRequest={section === "desktop" ? runtimeLaunchRequest : null}
            onLaunchRequestConsumed={consumeRuntimeLaunchRequest}
            onOpenSearchAgentWorkbench={openSearchAgentWorkbench}
            onOpenSettings={openExecutionSettings}
            onDesktopResourceSnapshotChange={handleDesktopResourceSnapshotChange}
            terminalDrawerOpen={terminalDrawerOpen}
            setTerminalDrawerOpen={setTerminalDrawerOpen}
            settingsSyncRequestConsumer={true}
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
              <OpsEventRail events={visibleUnifiedEvents.slice(0, 24)} uiLanguage={uiLanguage} />
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
            runtimeCustomization={runtimeCustomization}
            setRuntimeCustomization={setRuntimeCustomization}
            providerCredentialReport={providerCredentials}
            onRefreshProviderCredentials={refreshProviderCredentials}
            settingsSyncRequest={runtimeSettingsSyncRequest}
            onSettingsSyncRequestConsumed={consumeRuntimeSettingsSyncRequest}
            launchRequest={section === "source" ? runtimeLaunchRequest : null}
            onLaunchRequestConsumed={consumeRuntimeLaunchRequest}
            onOpenSearchAgentWorkbench={openSearchAgentWorkbench}
            onOpenSettings={openExecutionSettings}
            onDesktopResourceSnapshotChange={handleDesktopResourceSnapshotChange}
            terminalDrawerOpen={terminalDrawerOpen}
            setTerminalDrawerOpen={setTerminalDrawerOpen}
            surface="files"
            settingsSyncRequestConsumer={false}
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
            onOpenProviderSettings={openProviderSettings}
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
  onOpenAgents,
  uiLanguage = "ko"
}: {
  summary: UnifiedOps["summary"];
  lanes: Array<{ key: string; count: number }>;
  signalTypes: Array<{ key: string; count: number }>;
  events: UnifiedOps["events"];
  onOpenHistory: () => void;
  onOpenAgents: () => void;
  uiLanguage?: UiLanguage;
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
        <OpsEventRail events={events} uiLanguage={uiLanguage} />
      </div>
    </section>
  );
}

function OpsEventRail({ events, uiLanguage }: { events: UnifiedOps["events"]; uiLanguage: UiLanguage }) {
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
            <p>{event.detail || event.path || (uiLanguage === "ko" ? "세부 정보 없음" : "No detail")}</p>
            {event.path && <small>{event.path}</small>}
          </div>
          <aside>
            <strong>{event.status}</strong>
            <span>{event.lane}</span>
            <small>
              {event.timestamp
                ? formatDate(event.timestamp)
                : event.date
                  ? formatDay(event.date)
                  : uiLanguage === "ko" ? "시간 없음" : "no time"}
            </small>
          </aside>
        </article>
      ))}
    </div>
  );
}

function DesktopRuntimePanel({
  agentCatalogCount,
  blockedTaskCount,
  sourceFiles,
  uiLanguage,
  initDefaults,
  runtimeCustomization,
  setRuntimeCustomization,
  providerCredentialReport,
  onRefreshProviderCredentials,
  settingsSyncRequest,
  onSettingsSyncRequestConsumed,
  launchRequest,
  onLaunchRequestConsumed,
  onOpenSearchAgentWorkbench,
  onOpenSettings,
  onDesktopResourceSnapshotChange,
  terminalDrawerOpen,
  setTerminalDrawerOpen,
  surface = "runtime",
  surfaceActive = true,
  settingsSyncRequestConsumer = surfaceActive
}: {
  agentCatalogCount: number;
  blockedTaskCount: number;
  sourceFiles: WorkspaceSourceFile[];
  uiLanguage: UiLanguage;
  initDefaults: RuntimeInitDefaults;
  runtimeCustomization: RuntimeCustomization;
  setRuntimeCustomization: (updater: RuntimeCustomization | ((current: RuntimeCustomization) => RuntimeCustomization)) => void;
  providerCredentialReport?: ProviderCredentialReport | null;
  onRefreshProviderCredentials?: () => void | Promise<void>;
  settingsSyncRequest?: RuntimeSettingsSyncRequest | null;
  onSettingsSyncRequestConsumed?: (requestId: string) => void;
  launchRequest?: RuntimeLaunchRequest | null;
  onLaunchRequestConsumed?: (requestId: string) => void;
  onOpenSearchAgentWorkbench?: () => void;
  onOpenSettings: (subsectionId?: SettingsSubsectionId) => void;
  onDesktopResourceSnapshotChange?: (report: DesktopResourceSnapshotReport | null) => void;
  terminalDrawerOpen: boolean;
  setTerminalDrawerOpen: (open: boolean) => void;
  surface?: "runtime" | "files";
  settingsSyncRequestConsumer?: boolean;
  surfaceActive?: boolean;
}) {
  const copy = nativeWorkspaceCopy[uiLanguage];
  const isFileWorkspaceSurface = surface === "files";
  const runtimeUnavailableErrorMessage = uiLanguage === "ko"
    ? copy.noRuntime
    : "Tauri desktop runtime is not available in this browser view.";
  const decisionAnswerRequiredMessage = uiLanguage === "ko"
    ? "결정 답변을 입력하세요."
    : "Decision answer is required.";
  const taskPipePromptRequiredMessage = uiLanguage === "ko"
    ? "Task pipe 프롬프트를 입력하세요."
    : "Task pipe prompt is required.";
  const workspaceRelativePathRequiredMessage = uiLanguage === "ko"
    ? "작업공간 상대 경로를 입력하세요."
    : "Workspace-relative source path is required.";
  const initialSessionMode = sessionModePresets.find((mode) => mode.id === initDefaults.sessionModeId) || sessionModePresets[0];
  const runtimeQuickCommands = useMemo(
    () => normalizeRuntimeQuickCommands(runtimeCustomization.terminal.quickCommands),
    [runtimeCustomization.terminal.quickCommands]
  );
  const [runtimeState, setRuntimeState] = useState<"checking" | "available" | "unavailable">("checking");
  const [health, setHealth] = useState<DesktopHealthStatus | null>(null);
  const [adapters, setAdapters] = useState<CliAdapterStatus[]>(fallbackDesktopAdapters);
  const [reports, setReports] = useState<CliRunReport[]>([]);
  const [sessions, setSessions] = useState<CliSessionReport[]>([]);
  const [nativePtySessions, setNativePtySessions] = useState<RuntimeNativePtySession[]>([]);
  const [selectedNativePtySessionId, setSelectedNativePtySessionId] = useState("");
  const [taskPipePresets, setTaskPipePresets] = useState<CliTaskPipelinePresetReport[]>(fallbackTaskPipePresets);
  const [selectedTaskPipeKind, setSelectedTaskPipeKind] = useState(initDefaults.taskPipeKind);
  const [activeTaskPipePromptKey, setActiveTaskPipePromptKey] = useState(taskPipePromptKeyForPreset(initDefaults.taskPipeKind));
  const [taskPipePrompt, setTaskPipePrompt] = useState(
    "이 작업을 파이프라인 그래프 기준으로 분해해서 각 CLI 실행 경로를 초기화해줘. 소스에 영향을 주는 결정은 병합 게이트 전까지 보류하고, 질문은 결정함으로 보내줘."
  );
  const [pipelineReports, setPipelineReports] = useState<CliTaskPipelineInitReport[]>([]);
  const [taskRunRecords, setTaskRunRecords] = useState<CliTaskRunRecordReport[]>([]);
  const [selectedTaskRunId, setSelectedTaskRunId] = useState("");
  const [taskRunDetail, setTaskRunDetail] = useState<CliTaskRunDetailReport | null>(null);
  const [taskRunBusy, setTaskRunBusy] = useState(false);
  const [taskRunPruneNotice, setTaskRunPruneNotice] = useState("");
  const [lastSubagentToolPlan, setLastSubagentToolPlan] = useState<SubagentToolPlanReport | null>(null);
  const [lastSubagentToolExecution, setLastSubagentToolExecution] = useState<CliSessionReport | null>(null);
  const [lastSubagentToolFanout, setLastSubagentToolFanout] = useState<SubagentToolFanoutReport | null>(null);
  const [selectedSubagentToolNames, setSelectedSubagentToolNames] = useState<string[]>([]);
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
  const [appUpdateCheck, setAppUpdateCheck] = useState<AppUpdateCheckReport | null>(null);
  const [appUpdateInstall, setAppUpdateInstall] = useState<AppUpdateInstallReport | null>(null);
  const [appUpdateBusy, setAppUpdateBusy] = useState("");
  const [desktopWorkspace, setDesktopWorkspace] = useState<DesktopWorkspaceStateReport | null>(null);
  const [workspaceHostBusy, setWorkspaceHostBusy] = useState("");
  const [workspaceHostNotice, setWorkspaceHostNotice] = useState("");
  const [runtimeInitStatus, setRuntimeInitStatus] = useState<RuntimeInitStatusReport | null>(null);
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
  const [activeSessionPromptKey, setActiveSessionPromptKey] = useState(initialSessionMode.id);
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
  const [rustRuntimeFeatureMap, setRustRuntimeFeatureMap] = useState<RustRuntimeFeatureMapReport | null>(null);
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
  const { beginSourceLoadRequest, cancelPendingSourceLoad } = useSourceLoadRequestGate();
  const {
    sourceEditorRef,
    applySourceEditorVisibleState,
    clearSourceDraftSyncTimer,
    updateSourceDraft,
    currentEditorDraftContent,
    effectiveSourceDrafts,
    handleSourceEditorMount,
    getActiveSourcePath,
    setVisibleSourceDraftContent
  } = useSourceEditorSession({
    sourceFile,
    sourceDraft,
    sourceDrafts,
    setSourceFile,
    setSourceDraft,
    setSourceDrafts,
    setSelectedSourcePath,
    setSourcePathInput,
    setSourceCopyNotice,
    setWriteReport,
    setSourceWorkbenchView
  });
  const panelMountedRef = useRef(false);
  const activeSessionPollInFlightRef = useRef(false);
  const activeNativePtyPollInFlightRef = useRef(false);
  const workspaceWarmupPollRef = useRef<number | null>(null);
  const consumedLaunchRequestIdsRef = useRef<Set<string>>(new Set());
  const lastInboxRefreshAtRef = useRef(0);
  const lastTaskRunRefreshAtRef = useRef(0);
  const appUpdateAutoCheckedRef = useRef(false);

  const invoke = getTauriInvoke();


  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const shouldPrepareSourceWorkspace = isFileWorkspaceSurface || runtimeDiagnosticsOpen;
  const sourceCatalogFiles = selectSourceCatalogFiles(runtimeSourceFiles, sourceFiles);
  const sourceFileCount = sourceCatalogFiles.length;
  const agentsInstructionPath = findAgentsInstructionPath(sourceCatalogFiles);
  const sourceCatalogLabel = sourceCatalogLabelFor(Boolean(workspaceResourceReport), runtimeSourceFiles.length > 0);
  const editableSourceFiles = useMemo(() => {
    return listEditableSourceFiles(shouldPrepareSourceWorkspace, sourceCatalogFiles);
  }, [shouldPrepareSourceWorkspace, sourceCatalogFiles]);
  const deferredSourceFilter = useDeferredValue(sourceFilter);
  const filteredEditableSourceFiles = useMemo(() => {
    return filterEditableSourceFiles(shouldPrepareSourceWorkspace, editableSourceFiles, deferredSourceFilter);
  }, [deferredSourceFilter, editableSourceFiles, shouldPrepareSourceWorkspace]);
  const selectedSourceFileOption = useMemo(
    () => findSelectedSourceFileOption(filteredEditableSourceFiles, sourceCatalogFiles, selectedSourcePath),
    [filteredEditableSourceFiles, selectedSourcePath, sourceCatalogFiles]
  );
  const workspaceExplorerRootLabel = workspaceExplorerRootLabelFor(desktopWorkspace);
  const openDraftEntries = useMemo(() => listOpenSourceDraftEntries(sourceDrafts), [sourceDrafts]);
  const dirtyDraftEntries = useMemo(() => listDirtySourceDraftEntries(openDraftEntries), [openDraftEntries]);
  const dirtySourcePathSet = useMemo(() => buildDirtySourcePathSet(dirtyDraftEntries), [dirtyDraftEntries]);
  const latestSourceSaveResult = sourceSaveResults[0] ?? null;
  const sourceSaveTotalBytes = useMemo(
    () => sourceSaveResults.reduce((total, report) => total + report.sizeBytes, 0),
    [sourceSaveResults]
  );
  const currentDraftEntry = useMemo(() => findCurrentSourceDraftEntry(sourceDrafts, sourceFile), [sourceDrafts, sourceFile]);
  const currentSourceDirty = isCurrentSourceDraftDirty(currentDraftEntry, sourceFile, sourceDraft);
  const sourceEditorLocked = editorBusy || saveAllBusy;
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
  const sessionPromptOverrides = runtimeCustomization.prompts.sessionPrompts;
  const taskPipePromptOverrides = runtimeCustomization.prompts.taskPipePrompts;
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
        if (seen.has(mode.id)) {
          return false;
        }
        seen.add(mode.id);
        return true;
      })
      .slice(0, 5)
      .map((mode) => {
        const override = sessionPromptOverrides[mode.id] || "";
        return {
          id: `session-prompt-${mode.id}`,
          promptKey: mode.id,
          label: modeLabel(mode),
          detail: modeDetail(mode),
          value: override || mode.prompt,
          defaultValue: mode.prompt,
          customized: Boolean(override),
          badge: mode.id === selectedMode.id ? (uiLanguage === "ko" ? "현재" : "Current") : undefined
        };
      });
  }, [selectedMode, sessionPromptOverrides, uiLanguage]);
  const activeSessionPromptChoice =
    sessionPromptChoices.find((choice) => (choice.promptKey || choice.id) === activeSessionPromptKey) ||
    sessionPromptChoices[0] ||
    null;
  const updateRuntimePromptOverride = useCallback(
    (scope: keyof RuntimePromptCustomization, promptKey: string, value: string, defaultValue: string) => {
      const normalizedKey = trimRuntimeSetting(promptKey, 120);
      const normalizedValue = trimRuntimeSetting(value, runtimePromptMaxChars);
      if (!normalizedKey) {
        return;
      }
      setRuntimeCustomization((current) => {
        const normalized = normalizeRuntimeCustomization(current);
        const currentScope = normalized.prompts[scope] || {};
        const nextScope = { ...currentScope };
        if (!normalizedValue || normalizedValue === defaultValue.trim()) {
          delete nextScope[normalizedKey];
        } else {
          nextScope[normalizedKey] = normalizedValue;
        }
        return {
          ...normalized,
          prompts: {
            ...normalized.prompts,
            [scope]: nextScope
          }
        };
      });
    },
    []
  );
  const selectSessionPromptChoice = useCallback((choice: RuntimeTextChoice) => {
    setActiveSessionPromptKey(choice.promptKey || choice.id);
    setSessionPrompt(choice.value);
  }, []);
  const saveSessionPromptChoice = useCallback(() => {
    if (!activeSessionPromptChoice) {
      return;
    }
    const promptKey = activeSessionPromptChoice.promptKey || activeSessionPromptChoice.id;
    updateRuntimePromptOverride("sessionPrompts", promptKey, sessionPrompt, activeSessionPromptChoice.defaultValue || activeSessionPromptChoice.value);
    setSessionPrompt(trimRuntimeSetting(sessionPrompt, runtimePromptMaxChars));
  }, [activeSessionPromptChoice, sessionPrompt, updateRuntimePromptOverride]);
  const resetSessionPromptChoice = useCallback(() => {
    if (!activeSessionPromptChoice) {
      return;
    }
    const promptKey = activeSessionPromptChoice.promptKey || activeSessionPromptChoice.id;
    const defaultValue = activeSessionPromptChoice.defaultValue || activeSessionPromptChoice.value;
    updateRuntimePromptOverride("sessionPrompts", promptKey, defaultValue, defaultValue);
    setSessionPrompt(defaultValue);
  }, [activeSessionPromptChoice, updateRuntimePromptOverride]);
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
    const selectedPresetKey = taskPipePromptKeyForPreset(selectedTaskPipe.taskKind);
    const selectedPresetPrompt = renderTaskPipePresetPrompt(selectedTaskPipe, uiLanguage);
    const choiceDefaults: Array<Omit<RuntimeTextChoice, "customized" | "value"> & { defaultValue: string; promptKey: string }> = [
      {
        id: `selected-task-pipe-${selectedTaskPipe.taskKind}`,
        promptKey: selectedPresetKey,
        label: uiLanguage === "ko" ? "선택 프리셋" : "Selected preset",
        detail: selectedTaskPipe.intent,
        defaultValue: selectedPresetPrompt,
        badge: selectedTaskPipe.label
      },
      {
        id: "implementation-pipe",
        promptKey: "implementation-pipe",
        label: uiLanguage === "ko" ? "구현 분해" : "Implementation",
        detail: uiLanguage === "ko" ? "구현, 리뷰, 검증 경로를 나누어 시작" : "Split implementation, review, and validation lanes",
        defaultValue:
          uiLanguage === "ko"
            ? "사용자 요청을 구현 단위, 리뷰 단위, 검증 단위로 나눠서 각 CLI 실행 경로를 초기화해줘. 소스 변경은 병합 게이트 전까지 보류하고 필요한 결정은 결정함으로 보내줘."
            : "Split the user's request into implementation, review, and validation lanes. Hold source changes before the merge gate and send required decisions to the decision inbox."
      },
      {
        id: "research-pipe",
        promptKey: "research-pipe",
        label: uiLanguage === "ko" ? "근거 조사" : "Grounded research",
        detail: uiLanguage === "ko" ? "검색, 출처 순위, 회의적 검토를 먼저 실행" : "Run search, source ranking, and skeptic review first",
        defaultValue:
          uiLanguage === "ko"
            ? "이 요청을 검색, 출처 순위, 근거 추출, 회의적 검토 경로로 나눠 초기화해줘. 구현 전에 강한 출처와 약한 출처를 분리하고 계획 영향만 기록해줘."
            : "Initialize search, source ranking, evidence extraction, and skeptic review lanes for this request. Separate strong and weak sources before implementation and record only plan-impacting evidence."
      },
      {
        id: "review-pipe",
        promptKey: "review-pipe",
        label: uiLanguage === "ko" ? "검토/검증" : "Review and verify",
        detail: uiLanguage === "ko" ? "버그, 누락 테스트, 롤백 조건을 먼저 점검" : "Check bugs, missing tests, and rollback conditions first",
        defaultValue:
          uiLanguage === "ko"
            ? "현재 변경 또는 계획을 검토/검증 파이프라인으로 초기화해줘. 버그, 누락된 테스트, 리소스 누수, 롤백 조건, 사용자 결정 필요 여부를 우선순위로 기록해줘."
            : "Initialize a review and verification pipeline for the current change or plan. Prioritize bugs, missing tests, resource leaks, rollback conditions, and user-decision needs."
      }
    ];
    const seen = new Set<string>();
    return choiceDefaults
      .map((choice) => {
        const override = taskPipePromptOverrides[choice.promptKey] || "";
        return {
          ...choice,
          value: override || choice.defaultValue,
          customized: Boolean(override)
        };
      })
      .filter((choice) => {
        if (seen.has(choice.promptKey)) {
          return false;
        }
        seen.add(choice.promptKey);
        return true;
      });
  }, [selectedTaskPipe, taskPipePromptOverrides, uiLanguage]);
  const activeTaskPipePromptChoice =
    taskPipePromptChoices.find((choice) => (choice.promptKey || choice.id) === activeTaskPipePromptKey) ||
    taskPipePromptChoices[0] ||
    null;
  const selectTaskPipePromptChoice = useCallback((choice: RuntimeTextChoice) => {
    setActiveTaskPipePromptKey(choice.promptKey || choice.id);
    setTaskPipePrompt(choice.value);
  }, []);
  const saveTaskPipePromptChoice = useCallback(() => {
    if (!activeTaskPipePromptChoice) {
      return;
    }
    const promptKey = activeTaskPipePromptChoice.promptKey || activeTaskPipePromptChoice.id;
    updateRuntimePromptOverride("taskPipePrompts", promptKey, taskPipePrompt, activeTaskPipePromptChoice.defaultValue || activeTaskPipePromptChoice.value);
    setTaskPipePrompt(trimRuntimeSetting(taskPipePrompt, runtimePromptMaxChars));
  }, [activeTaskPipePromptChoice, taskPipePrompt, updateRuntimePromptOverride]);
  const resetTaskPipePromptChoice = useCallback(() => {
    if (!activeTaskPipePromptChoice) {
      return;
    }
    const promptKey = activeTaskPipePromptChoice.promptKey || activeTaskPipePromptChoice.id;
    const defaultValue = activeTaskPipePromptChoice.defaultValue || activeTaskPipePromptChoice.value;
    updateRuntimePromptOverride("taskPipePrompts", promptKey, defaultValue, defaultValue);
    setTaskPipePrompt(defaultValue);
  }, [activeTaskPipePromptChoice, updateRuntimePromptOverride]);
  useEffect(() => {
    const mode = sessionModePresets.find((item) => item.id === initDefaults.sessionModeId) || sessionModePresets[0];
    const taskPipe = fallbackTaskPipePresets.find((preset) => preset.taskKind === initDefaults.taskPipeKind) || fallbackTaskPipePresets[0];
    const taskPipePromptKey = taskPipePromptKeyForPreset(taskPipe.taskKind);
    setSelectedSessionAdapterId(initDefaults.adapterId);
    setSelectedSessionModeId(mode.id);
    setActiveSessionPromptKey(mode.id);
    setSessionPrompt(sessionPromptOverrides[mode.id] || mode.prompt);
    setSelectedTaskPipeKind(taskPipe.taskKind);
    setActiveTaskPipePromptKey(taskPipePromptKey);
    setTaskPipePrompt(taskPipePromptOverrides[taskPipePromptKey] || renderTaskPipePresetPrompt(taskPipe, uiLanguage));
    setAutoDeferQuestions(initDefaults.autoDeferQuestions);
  }, [
    initDefaults.adapterId,
    initDefaults.autoDeferQuestions,
    initDefaults.sessionModeId,
    initDefaults.taskPipeKind,
    uiLanguage
  ]);
  useEffect(() => {
    if (activeSessionPromptChoice) {
      setSessionPrompt(activeSessionPromptChoice.value);
    }
  }, [activeSessionPromptChoice?.promptKey, activeSessionPromptChoice?.value]);
  useEffect(() => {
    if (activeTaskPipePromptChoice) {
      setTaskPipePrompt(activeTaskPipePromptChoice.value);
    }
  }, [activeTaskPipePromptChoice?.promptKey, activeTaskPipePromptChoice?.value]);
  const pipelineStats = useMemo(() => {
    const latest = pipelineReports[0] || null;
    const started = pipelineReports.reduce((total, report) => total + report.startedSessions, 0);
    const missing = pipelineReports.reduce((total, report) => total + report.missingLanes, 0);
    const edges = pipelineReports.reduce((total, report) => total + report.pipes.length, 0);
    return { latest, started, missing, edges };
  }, [pipelineReports]);
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
      domReadOnly: sourceEditorLocked,
      minimap: { enabled: sourceMinimapEnabled },
      readOnly: sourceEditorLocked,
      wordWrap: sourceWordWrap ? "on" : "off"
    }),
    [sourceEditorLocked, sourceMinimapEnabled, sourceWordWrap]
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
        queueSettingsSync("workspace-change", { includeSourceCatalog: true, forceSourceRefresh: true });
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
      queueSettingsSync("workspace-change", { includeSourceCatalog: true, forceSourceRefresh: true });
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
      queueSettingsSync("workspace-change", { includeSourceCatalog: true, forceSourceRefresh: true });
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
        nextDesktopResourceSnapshot,
        nextRustRuntimeFeatureMap
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
        tauriInvoke<DesktopResourceSnapshotReport>("get_desktop_resource_snapshot"),
        tauriInvoke<RustRuntimeFeatureMapReport>("get_rust_runtime_feature_map")
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
      setRustRuntimeFeatureMap(nextRustRuntimeFeatureMap);
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
      setError(runtimeUnavailableErrorMessage);
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

  const nativeOsActionDoneMessage = (report: NativeOsActionReport) =>
    uiLanguage === "ko"
      ? `${report.method}로 ${report.targetPath} 대상 OS 액션을 실행했습니다.`
      : `Ran ${report.method} for ${report.targetPath}.`;

  const runNativeWorkspaceOsAction = async (
    feedbackId: DesktopActionFeedbackId,
    action: "open_path" | "reveal_path" | "open_external_terminal"
  ) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError(runtimeUnavailableErrorMessage);
      setDesktopActionStatus(feedbackId, "failed", runtimeUnavailableErrorMessage);
      return;
    }
    setDesktopActionStatus(feedbackId, "running");
    setError("");
    try {
      const report = await tauriInvoke<NativeOsActionReport>("run_native_os_action", {
        request: {
          action,
          targetPath: null,
          workingDir: null
        }
      });
      setDesktopActionStatus(feedbackId, "done", nativeOsActionDoneMessage(report));
    } catch (caught) {
      const message = errorMessage(caught);
      setError(message);
      setDesktopActionStatus(feedbackId, "failed", message);
    }
  };

  const runSingleHealthCheck = async (adapterId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError(runtimeUnavailableErrorMessage);
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

  const checkAppUpdate = async ({ silent = false }: { silent?: boolean } = {}) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setAppUpdateCheck(null);
      return;
    }

    setAppUpdateBusy("check");
    if (!silent) {
      setError("");
    }
    try {
      const report = await tauriInvoke<AppUpdateCheckReport>("check_app_update");
      setAppUpdateCheck(report);
      setAppUpdateInstall(null);
      if (!silent || report.updateAvailable) {
        setServiceReadinessNotice(`${report.status}: ${report.detail}`);
      }
    } catch (caught) {
      if (!silent) {
        setError(errorMessage(caught));
      }
    } finally {
      setAppUpdateBusy("");
    }
  };

  const installAppUpdate = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setAppUpdateBusy("install");
    setError("");
    try {
      const report = await tauriInvoke<AppUpdateInstallReport>("install_app_update", { restart: true });
      setAppUpdateInstall(report);
      setServiceReadinessNotice(`${report.status}: ${report.detail}`);
      if (!report.installed) {
        void checkAppUpdate({ silent: true });
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setAppUpdateBusy("");
    }
  };

  useEffect(() => {
    if (
      appUpdateAutoCheckedRef.current ||
      !surfaceActive ||
      runtimeState !== "available" ||
      !serviceReadiness?.updateChannel?.configured
    ) {
      return;
    }
    appUpdateAutoCheckedRef.current = true;
    void checkAppUpdate({ silent: true });
  }, [runtimeState, serviceReadiness?.updateChannel?.configured, surfaceActive]);


  const answerDecision = async (resumeSession = false) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !selectedDecision) {
      return;
    }
    if (!decisionAnswer.trim()) {
      setError(decisionAnswerRequiredMessage);
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

  const createCliAdapterSession = async ({
    adapterId,
    prompt,
    runningId,
    taskKind
  }: {
    adapterId: string;
    prompt: string;
    runningId: string;
    taskKind?: string;
  }) => {
    const adapterLabel = adapters.find((adapter) => adapter.adapterId === adapterId)?.label || adapterId;
    const requestedWorkingDir = workingDir.trim();
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setRuntimeInitStatus({
        kind: "session",
        status: "failed",
        adapterId,
        adapterLabel,
        modeLabel: selectedMode.label,
        workingDir: requestedWorkingDir,
        error: runtimeUnavailableErrorMessage,
        updatedAt: new Date().toISOString()
      });
      throw new Error(runtimeUnavailableErrorMessage);
    }

    setRunningAdapterId(runningId);
    setError("");
    const args: Record<string, unknown> = {
      adapterId,
      prompt,
      autoDeferQuestions
    };
    if (taskKind) {
      args.taskKind = taskKind;
    }
    if (requestedWorkingDir) {
      args.workingDir = requestedWorkingDir;
    }
    setRuntimeInitStatus({
      kind: "session",
      status: "initializing",
      adapterId,
      adapterLabel,
      modeLabel: selectedMode.label,
      workingDir: requestedWorkingDir,
      updatedAt: new Date().toISOString()
    });

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", args);
      upsertSession(report);
      setRuntimeInitStatus({
        kind: "session",
        status: "ready",
        adapterId: report.adapterId,
        adapterLabel: report.label || adapterLabel,
        modeLabel: selectedMode.label,
        sessionId: report.sessionId,
        taskRunId: report.taskRunId,
        taskKind: report.taskKind,
        workingDir: report.workingDir,
        updatedAt: new Date().toISOString()
      });
      await refreshTaskRunRecords();
      return report;
    } catch (caught) {
      setRuntimeInitStatus({
        kind: "session",
        status: "failed",
        adapterId,
        adapterLabel,
        modeLabel: selectedMode.label,
        workingDir: requestedWorkingDir,
        error: errorMessage(caught),
        updatedAt: new Date().toISOString()
      });
      throw caught;
    } finally {
      setRunningAdapterId("");
    }
  };

  const createCliAdapterPtySession = async ({
    adapterId,
    prompt,
    runningId,
    taskKind
  }: {
    adapterId: string;
    prompt: string;
    runningId: string;
    taskKind?: string;
  }) => {
    // TUI형 게스트 CLI는 stdout pipe가 아니라 PTY에서 시작해야 실제 터미널과 같은 입력/화면 제어가 된다.
    const adapterLabel = adapters.find((adapter) => adapter.adapterId === adapterId)?.label || adapterId;
    const requestedWorkingDir = workingDir.trim();
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setRuntimeInitStatus({
        kind: "session",
        status: "failed",
        adapterId,
        adapterLabel,
        modeLabel: selectedMode.label,
        workingDir: requestedWorkingDir,
        error: runtimeUnavailableErrorMessage,
        updatedAt: new Date().toISOString()
      });
      throw new Error(runtimeUnavailableErrorMessage);
    }

    setRunningAdapterId(runningId);
    setError("");
    setRuntimeInitStatus({
      kind: "session",
      status: "initializing",
      adapterId,
      adapterLabel,
      modeLabel: selectedMode.label,
      workingDir: requestedWorkingDir,
      updatedAt: new Date().toISOString()
    });

    const args: Record<string, unknown> = {
      adapterId,
      prompt,
      rows: selectedNativePtySession?.rows || 28,
      cols: selectedNativePtySession?.cols || 100
    };
    if (requestedWorkingDir) {
      args.workingDir = requestedWorkingDir;
    }

    try {
      const launch = await tauriInvoke<CliAdapterPtyLaunchReport>("start_cli_adapter_pty_session", args);
      upsertNativePtySession(launch.terminal);
      setTerminalDrawerOpen(true);
      setRuntimeInitStatus({
        kind: "session",
        status: "ready",
        adapterId: launch.adapterId,
        adapterLabel: launch.label || adapterLabel,
        modeLabel: selectedMode.label,
        sessionId: launch.terminal.sessionId,
        taskKind: taskKind || "interactive_pty_session",
        workingDir: launch.terminal.workingDir,
        updatedAt: new Date().toISOString()
      });
      return launch.terminal;
    } catch (caught) {
      setRuntimeInitStatus({
        kind: "session",
        status: "failed",
        adapterId,
        adapterLabel,
        modeLabel: selectedMode.label,
        workingDir: requestedWorkingDir,
        error: errorMessage(caught),
        updatedAt: new Date().toISOString()
      });
      throw caught;
    } finally {
      setRunningAdapterId("");
    }
  };

  const startSelectedLaneAction = async () => {
    setTerminalDrawerOpen(true);
    if (shouldLaunchAdapterInNativePty(selectedSessionAdapterId)) {
      await createCliAdapterPtySession({
        adapterId: selectedSessionAdapterId,
        prompt: sessionPrompt,
        runningId: "native-pty-session"
      });
      return;
    }
    await createCliAdapterSession({
      adapterId: selectedSessionAdapterId,
      prompt: sessionPrompt,
      runningId: "session"
    });
  };

  const startSession = async () => {
    try {
      await startSelectedLaneAction();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const startSessionFromLaunchRequest = async (request: RuntimeLaunchRequest) => {
    setTerminalDrawerOpen(request.openTerminal);
    setSelectedSessionModeId(request.modeId);
    setSessionPrompt(request.prompt);

    const availableRequestedAdapter = adapters.find((adapter) => adapter.adapterId === request.adapterId && adapter.available);
    const adapterId = availableRequestedAdapter?.adapterId || adapters.find((adapter) => adapter.available)?.adapterId || request.adapterId;
    setSelectedSessionAdapterId(adapterId);
    try {
      if (shouldLaunchAdapterInNativePty(adapterId)) {
        await createCliAdapterPtySession({
          adapterId,
          prompt: request.prompt,
          runningId: request.taskKind,
          taskKind: request.taskKind
        });
        return;
      }
      await createCliAdapterSession({
        adapterId,
        prompt: request.prompt,
        runningId: request.taskKind,
        taskKind: request.taskKind
      });
    } catch (caught) {
      setError(errorMessage(caught));
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
    const requestedWorkingDir = workingDir.trim();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setRuntimeInitStatus({
        kind: "task-pipe",
        status: "failed",
        adapterId: "task-pipe",
        adapterLabel: selectedTaskPipe.adapterIds.join(" / "),
        pipelineLabel: selectedTaskPipe.label,
        taskKind: selectedTaskPipe.taskKind,
        laneCount: selectedTaskPipe.laneCount,
        workingDir: requestedWorkingDir,
        error: runtimeUnavailableErrorMessage,
        updatedAt: new Date().toISOString()
      });
      throw new Error(runtimeUnavailableErrorMessage);
    }
    if (!taskPipePrompt.trim()) {
      setRuntimeInitStatus({
        kind: "task-pipe",
        status: "failed",
        adapterId: "task-pipe",
        adapterLabel: selectedTaskPipe.adapterIds.join(" / "),
        pipelineLabel: selectedTaskPipe.label,
        taskKind: selectedTaskPipe.taskKind,
        laneCount: selectedTaskPipe.laneCount,
        workingDir: requestedWorkingDir,
        error: taskPipePromptRequiredMessage,
        updatedAt: new Date().toISOString()
      });
      throw new Error(taskPipePromptRequiredMessage);
    }

    setRunningAdapterId("task-pipe");
    setError("");
    const args: Record<string, unknown> = {
      taskKind: selectedTaskPipe.taskKind,
      prompt: taskPipePrompt,
      autoDeferQuestions
    };
    if (requestedWorkingDir) {
      args.workingDir = requestedWorkingDir;
    }
    setRuntimeInitStatus({
      kind: "task-pipe",
      status: "initializing",
      adapterId: "task-pipe",
      adapterLabel: selectedTaskPipe.adapterIds.join(" / "),
      pipelineLabel: selectedTaskPipe.label,
      taskKind: selectedTaskPipe.taskKind,
      laneCount: selectedTaskPipe.laneCount,
      workingDir: requestedWorkingDir,
      updatedAt: new Date().toISOString()
    });

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
      setRuntimeInitStatus({
        kind: "task-pipe",
        status: "ready",
        adapterId: "task-pipe",
        adapterLabel: selectedTaskPipe.adapterIds.join(" / "),
        pipelineId: report.pipelineId,
        pipelineLabel: report.label || selectedTaskPipe.label,
        taskKind: report.taskKind,
        startedSessions: report.startedSessions,
        missingLanes: report.missingLanes,
        laneCount: report.lanes.length,
        workingDir: report.workingDir,
        updatedAt: new Date().toISOString()
      });
      await refreshTaskRunRecords();
    } catch (caught) {
      setRuntimeInitStatus({
        kind: "task-pipe",
        status: "failed",
        adapterId: "task-pipe",
        adapterLabel: selectedTaskPipe.adapterIds.join(" / "),
        pipelineLabel: selectedTaskPipe.label,
        taskKind: selectedTaskPipe.taskKind,
        laneCount: selectedTaskPipe.laneCount,
        workingDir: requestedWorkingDir,
        error: errorMessage(caught),
        updatedAt: new Date().toISOString()
      });
      throw caught;
    } finally {
      setRunningAdapterId("");
    }
  };

  const pollSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError(runtimeUnavailableErrorMessage);
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

  const createNativePtySession = async (size: { rows: number; cols: number }) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      throw new Error(runtimeUnavailableErrorMessage);
    }

    setError("");
    const args: Record<string, unknown> = {
      rows: Math.max(8, Math.min(80, Math.round(size.rows || 28))),
      cols: Math.max(24, Math.min(240, Math.round(size.cols || 100)))
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }
    const shellCommand = runtimeCustomization.terminal.shellCommand.trim();
    if (shellCommand) {
      args.command = shellCommand;
    }
    const report = await tauriInvoke<RuntimeNativePtySession>("start_native_pty_terminal", args);
    upsertNativePtySession(report);
    const startupCommand = runtimeCustomization.terminal.startupCommand.trim();
    if (startupCommand) {
      const startupInput = startupCommand.endsWith("\n") ? startupCommand : `${startupCommand}\n`;
      const startupReport = await tauriInvoke<RuntimeNativePtySession>("write_native_pty_terminal_input", {
        sessionId: report.sessionId,
        input: startupInput
      });
      upsertNativePtySession(startupReport);
      return startupReport;
    }
    return report;
  };

  const startNativePtySession = async (size: { rows: number; cols: number }) => {
    setTerminalDrawerOpen(true);
    try {
      await createNativePtySession(size);
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
  const selectedSubagentTools = useMemo(() => {
    if (!lastSubagentToolPlan) {
      return [];
    }
    const selectedNames = new Set(selectedSubagentToolNames);
    return lastSubagentToolPlan.subagentTools.filter((tool) => selectedNames.has(tool.toolName));
  }, [lastSubagentToolPlan, selectedSubagentToolNames]);
  const selectedSubagentTool = selectedSubagentTools[0] || null;
  const selectedSubagentFanoutTools = selectedSubagentTools.slice(0, maxSubagentFanoutSelections);
  const selectedSubagentFanoutToolNames = selectedSubagentFanoutTools.map((tool) => tool.toolName);
  const toggleSubagentToolSelection = (toolName: string) => {
    setSelectedSubagentToolNames((current) => {
      if (current.includes(toolName)) {
        return current.filter((candidate) => candidate !== toolName);
      }
      if (current.length >= maxSubagentFanoutSelections) {
        return current;
      }
      return [...current, toolName];
    });
  };
  const selectDefaultSubagentTools = () => {
    setSelectedSubagentToolNames(lastSubagentToolPlan?.subagentTools.slice(0, defaultSubagentFanoutSelections).map((tool) => tool.toolName) || []);
  };
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
        case "sync-settings":
          return {
            label: uiLanguage === "ko" ? "설정/런타임 동기화" : "Sync settings and runtime",
            scope: `${providerConfiguredCount}/${providerTotalCount || "?"} providers · ${serviceReadiness?.score ?? "?"} readiness · ${workspacePathLabel}`,
            detail: uiLanguage === "ko" ? "저장된 설정 뒤에 계정, CLI, 작업공간, 서비스 준비도, 실행 기록, 소스 캐시를 다시 맞춥니다." : "Refreshes accounts, CLIs, workspace, readiness, run records, and source cache after saved settings.",
            next: uiLanguage === "ko" ? "첫 실행 카드와 서비스 준비도, 작업공간, 실행 기록 값이 같은 상태인지 확인하세요." : "Check that first-run, readiness, workspace, and run records now show the same state."
          };
        case "prepare-agents-md":
          return {
            label: uiLanguage === "ko" ? "AGENTS.md 만들기/열기" : "Create or open AGENTS.md",
            scope: agentsInstructionPath || "AGENTS.md",
            detail: uiLanguage === "ko" ? "프로젝트 루트 지시 파일을 열고, 없으면 안전한 시작 템플릿을 생성합니다." : "Opens the project instruction file, or creates a safe starter template when it is missing.",
            next: uiLanguage === "ko" ? "소스 편집기에서 프로젝트 규칙, 검증 명령, 금지 경계를 확인하세요." : "Review project rules, validation commands, and boundaries in the source editor."
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
        case "start-terminal-agent-bridge":
          return {
            label: uiLanguage === "ko" ? "터미널 연결 후 에이전트 시작" : "Connect terminal and start agent",
            scope: `${selectedAdapter?.label || selectedSessionAdapterId} · ${selectedMode.label}`,
            detail: uiLanguage === "ko" ? "네이티브 PTY 셸을 먼저 연결한 뒤, 같은 작업 폴더와 선택 모드로 에이전트 CLI 세션을 시작합니다." : "Connects the native PTY shell first, then starts the agent CLI session with the same working folder and selected mode.",
            next: uiLanguage === "ko" ? "하단 터미널의 PTY 탭과 출력 탭에서 연결과 에이전트 세션을 함께 확인하세요." : "Check the PTY and Output tabs in the bottom terminal together."
          };
        case "plan-subagent-tools":
          return {
            label: uiLanguage === "ko" ? "서브에이전트 툴 계획" : "Subagent tool plan",
            scope: "agent-platform:plan-agent-orchestration",
            detail: uiLanguage === "ko" ? "agent-platform planner를 실행해 manager가 호출할 subagent tools를 만들고 task-run record로 저장합니다." : "Runs the agent-platform planner, builds manager-owned subagent tools, and stores the result as a task-run record.",
            next: uiLanguage === "ko" ? "Task Runs에서 subagent_tool_plan 기록과 plan JSON을 확인하세요." : "Check the subagent_tool_plan record and plan JSON in Task Runs."
          };
        case "execute-subagent-tools":
          return {
            label: uiLanguage === "ko" ? "서브에이전트 실행" : "Execute subagents",
            scope: "start_subagent_tool_execution",
            detail: uiLanguage === "ko" ? "저장된 계획에서 선택한 도구 하나를 검증한 뒤 독립 실행 세션으로 시작합니다." : "Validates one selected tool from the saved plan, then starts it as an independent execution session.",
            next: uiLanguage === "ko" ? "하단 터미널과 실행 기록에서 서브에이전트 진행 상황을 확인하세요." : "Check subagent progress in the terminal and task-run records."
          };
        case "fanout-subagent-tools":
          return {
            label: uiLanguage === "ko" ? "서브에이전트 묶음 실행" : "Subagent fan-out",
            scope: "start_subagent_tool_fanout",
            detail: uiLanguage === "ko" ? "저장된 계획에서 직접 선택한 2-3개 도구를 검증한 뒤 독립 실행 세션으로 시작합니다." : "Validates 2-3 explicitly selected saved plan tools, then starts independent execution sessions.",
            next: uiLanguage === "ko" ? "하단 터미널과 실행 기록에서 각 세션을 확인하고, 병합은 수동으로 승인하세요." : "Check each session in the terminal and task-run records, then approve merge manually."
          };
        case "reveal-workspace":
          return {
            label: uiLanguage === "ko" ? "Finder에서 보기" : "Reveal in file manager",
            scope: workspacePathLabel,
            detail: uiLanguage === "ko" ? "선택된 작업공간 경로를 OS 파일 관리자에서 직접 표시합니다." : "Reveals the selected workspace path in the operating system file manager.",
            next: uiLanguage === "ko" ? "열린 파일 관리자에서 작업공간 위치와 권한을 확인하세요." : "Check the workspace location and permissions in the opened file manager."
          };
        case "open-workspace-path":
          return {
            label: uiLanguage === "ko" ? "기본 앱으로 열기" : "Open with default app",
            scope: workspacePathLabel,
            detail: uiLanguage === "ko" ? "선택된 작업공간 경로를 OS 기본 앱/파일 관리자로 엽니다." : "Opens the selected workspace path with the operating system default app or file manager.",
            next: uiLanguage === "ko" ? "OS가 선택한 기본 앱에서 작업공간이 열렸는지 확인하세요." : "Check that the workspace opened in the OS-selected default app."
          };
        case "open-external-terminal":
          return {
            label: uiLanguage === "ko" ? "외부 터미널 열기" : "Open external terminal",
            scope: workspacePathLabel,
            detail: uiLanguage === "ko" ? "선택된 작업공간을 cwd로 하는 OS 터미널 앱을 엽니다." : "Opens the OS terminal app with the selected workspace as cwd.",
            next: uiLanguage === "ko" ? "외부 터미널의 현재 디렉터리가 작업공간인지 확인하세요." : "Check that the external terminal cwd is the workspace."
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
        case "check-app-update":
          return {
            label: uiLanguage === "ko" ? "앱 업데이트 확인" : "Check app update",
            scope: appUpdateCheck?.status || serviceReadiness?.updateChannel?.channel || (uiLanguage === "ko" ? "업데이트 채널" : "update channel"),
            detail: uiLanguage === "ko" ? "번들에 설정된 Tauri updater 엔드포인트에서 새 앱 버전과 서명을 확인합니다." : "Checks the configured Tauri updater endpoint for a newer signed app version.",
            next: uiLanguage === "ko" ? "업데이트가 있으면 Service Readiness 패널에서 설치 후 재시작을 실행하세요." : "If an update is available, run Install & Restart in Service Readiness."
          };
        case "install-app-update":
          return {
            label: uiLanguage === "ko" ? "업데이트 설치 후 재시작" : "Install update and restart",
            scope: appUpdateCheck?.version || (uiLanguage === "ko" ? "대기 중 업데이트 없음" : "no pending update"),
            detail: uiLanguage === "ko" ? "마지막 업데이트 확인에서 확보한 업데이트 번들을 다운로드하고 설치한 뒤 앱 재시작을 요청합니다." : "Downloads and installs the update found by the last check, then requests an app restart.",
            next: uiLanguage === "ko" ? "앱이 재시작되지 않으면 다시 업데이트 확인을 눌러 대기 상태를 확인하세요." : "If the app does not restart, check again to confirm the pending state."
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
  const {
    settingsSyncBusy,
    settingsSyncNotice,
    queueSettingsSync,
    runManualSettingsSync,
    syncSettingsAndRuntimeState
  } = useSettingsRuntimeSync({
    uiLanguage,
    runtimeAvailable: Boolean(invoke),
    runtimeUnavailableErrorMessage,
    isFileWorkspaceSurface,
    onRuntimeUnavailable: () => setRuntimeState("unavailable"),
    setError,
    onActionStatus: setDesktopActionStatus,
    formatError: errorMessage,
    refreshProviderCredentials: onRefreshProviderCredentials,
    refreshAdapters,
    refreshDesktopWorkspace,
    refreshDesktopGitStatus,
    refreshRuntimeDataBoundary,
    refreshAccumulatedDataOverview,
    refreshServiceReadiness,
    refreshDesktopResourceSnapshot,
    prepareWorkspaceOsResources,
    warmWorkspaceOsResources
  });
  const {
    loadSourceFileByPath,
    loadSourceFile,
    selectDraftEntry,
    openDraftOrLoad,
    prepareAgentsInstructions,
    runSourceEditorCommand,
    insertSourceTemplate,
    copySourcePatchContext,
    saveSourceFile,
    saveAllSourceDrafts,
    revertCurrentDraft,
    closeDraftByPath,
    closeCurrentDraft,
    copyCurrentSourceDraft
  } = useSourceWorkbenchController({
    tauriInvoke: invoke,
    uiLanguage,
    runtimeUnavailableErrorMessage,
    workspaceRelativePathRequiredMessage,
    sourceFile,
    sourceDrafts,
    sourcePathInput,
    selectedSourcePath,
    sourceEditorLocked,
    openDraftEntries,
    currentDraftEntry,
    agentsInstructionPath,
    workspaceExplorerRootLabel,
    selectedSourceTemplate,
    sourceEditorProfile,
    currentSourceDirty,
    sourceDiff,
    sourceEditorRef,
    beginSourceLoadRequest,
    cancelPendingSourceLoad,
    applySourceEditorVisibleState,
    clearSourceDraftSyncTimer,
    updateSourceDraft,
    currentEditorDraftContent,
    effectiveSourceDrafts,
    getActiveSourcePath,
    setVisibleSourceDraftContent,
    setRuntimeUnavailable: () => setRuntimeState("unavailable"),
    setEditorBusy,
    setSaveAllBusy,
    setError,
    setSourceFile,
    setSourceDrafts,
    setSourceCopyNotice,
    setSourceSaveResults,
    setSourceWorkbenchView,
    setWriteReport,
    queueSettingsSync
  });
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
  const ideRunConfigurations: IdeRunConfiguration[] = [
    {
      id: "search-agent-chat",
      icon: Search,
      title: uiLanguage === "ko" ? "검색 에이전트로 대화 시작" : "Start Search Agent chat",
      subtitle: uiLanguage === "ko" ? "이미 만든 검색 에이전트를 바로 엽니다." : "Open the existing search agent immediately.",
      detail: primaryProvider
        ? `${primaryProvider.label} · ${primaryProvider.defaultModel || primaryProvider.status}`
        : uiLanguage === "ko"
          ? "제공자 설정에서 게스트 도구 계정을 확인하세요."
          : "Check guest tool accounts in provider settings.",
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
      onPrimary: () => runDesktopAction("start-selected-lane", startSelectedLaneAction),
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
      label: providerDisplayName(provider.providerId, provider.label, uiLanguage),
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
      title: uiLanguage === "ko" ? "AI 도구 계정 확인 필요" : "AI tool account check needed",
      detail: uiLanguage === "ko" ? "선택한 게스트 AI 도구가 계정이나 인증을 필요로 하는지 확인하세요." : "Check whether the selected guest AI tool needs an account or authentication.",
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
  const terminalAgentBridgeAdapterId = selectedAdapter?.adapterId || selectedSessionAdapterId;
  const selectedNativePtyReady = Boolean(selectedNativePtySession && isActiveSessionStatus(selectedNativePtySession.status));
  const terminalAgentBridgeAdapterReady = Boolean(selectedAdapter?.available);
  const terminalAgentBridgePromptReady = sessionPrompt.trim() !== "";
  const terminalAgentBridgeCanStart =
    runtimeReady && terminalAgentBridgeAdapterReady && terminalAgentBridgePromptReady && runningAdapterId === "";
  const selectedAdapterActiveSession =
    sessions.find((session) => session.adapterId === terminalAgentBridgeAdapterId && isActiveSessionStatus(session.status)) || null;
  const terminalAgentBridgeSteps = [
    {
      id: "pty",
      icon: SquareTerminal,
      state: selectedNativePtyReady ? "ready" : runtimeReady ? "pending" : "blocked",
      label: uiLanguage === "ko" ? "터미널 연결" : "Terminal connection",
      value: selectedNativePtyReady ? uiLanguage === "ko" ? "연결됨" : "Connected" : uiLanguage === "ko" ? "PTY 필요" : "PTY needed",
      detail: selectedNativePtySession?.sessionId || (uiLanguage === "ko" ? "네이티브 PTY를 먼저 엽니다" : "Open native PTY first")
    },
    {
      id: "adapter",
      icon: CheckCircle2,
      state: terminalAgentBridgeAdapterReady ? "ready" : "blocked",
      label: uiLanguage === "ko" ? "CLI 어댑터" : "CLI adapter",
      value: terminalAgentBridgeAdapterReady ? uiLanguage === "ko" ? "준비됨" : "Ready" : uiLanguage === "ko" ? "설정 필요" : "Setup needed",
      detail: selectedAdapter?.label || terminalAgentBridgeAdapterId
    },
    {
      id: "agent",
      icon: Bot,
      state: selectedAdapterActiveSession ? "running" : terminalAgentBridgeCanStart ? "ready" : "pending",
      label: uiLanguage === "ko" ? "에이전트 세션" : "Agent session",
      value: selectedAdapterActiveSession ? uiLanguage === "ko" ? "실행 중" : "Running" : selectedMode.label,
      detail: selectedAdapterActiveSession?.sessionId || (terminalAgentBridgePromptReady ? sessionPrompt.slice(0, 96) : uiLanguage === "ko" ? "초기 입력 필요" : "Initial input needed")
    }
  ];
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
    const guideInstall = localizedAdapterGuideText(guide, uiLanguage, "installHint");
    const guideAuth = localizedAdapterGuideText(guide, uiLanguage, "authHint");
    const guideVerify = localizedAdapterGuideText(guide, uiLanguage, "verifyCommand");
    const guideExpected = localizedAdapterGuideText(guide, uiLanguage, "expectedResult");
    const guideRun = localizedAdapterGuideText(guide, uiLanguage, "firstRunCommand");
    const guideCaution = localizedAdapterGuideText(guide, uiLanguage, "caution");
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
          detail: adapter.available ? adapter.resolvedPath || adapter.command : guideInstall || adapter.command,
          command: guideInstall || adapter.command
        },
        {
          id: "auth",
          label: uiLanguage === "ko" ? "로그인/키" : "Login/key",
          ready: authReady,
          detail: authReady ? authStatus : guideAuth || authStatus,
          command: guideAuth || ""
        },
        {
          id: "verify",
          label: uiLanguage === "ko" ? "검증" : "Verify",
          ready: adapter.available,
          detail: adapter.version || adapter.lastError || guideVerify || adapter.command,
          command: guideVerify || adapter.command
        },
        {
          id: "run",
          label: uiLanguage === "ko" ? "첫 실행" : "First run",
          ready: adapter.available && authReady,
          detail: guideExpected || adapter.command,
          command: guideRun || adapter.command
        }
      ],
      guideInstall,
      guideAuth,
      guideVerify,
      guideExpected,
      guideRun,
      guideCaution
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
  const startTerminalAgentBridge = async () => {
    if (!runtimeReady) {
      throw new Error(runtimeUnavailableErrorMessage);
    }
    if (!terminalAgentBridgeAdapterReady) {
      throw new Error(uiLanguage === "ko" ? "선택한 CLI 어댑터가 준비되지 않았습니다." : "The selected CLI adapter is not ready.");
    }
    if (!terminalAgentBridgePromptReady) {
      throw new Error(uiLanguage === "ko" ? "에이전트 초기 입력을 먼저 작성하세요." : "Enter the agent initial input first.");
    }
    setTerminalDrawerOpen(true);
    if (selectedSessionAdapterId !== terminalAgentBridgeAdapterId) {
      setSelectedSessionAdapterId(terminalAgentBridgeAdapterId);
    }
    const activePty =
      selectedNativePtyReady && selectedNativePtySession
        ? selectedNativePtySession
        : await createNativePtySession({
            rows: selectedNativePtySession?.rows || 28,
            cols: selectedNativePtySession?.cols || 100
          });
    if (!activePty || !isActiveSessionStatus(activePty.status)) {
      throw new Error(uiLanguage === "ko" ? "네이티브 PTY 연결이 완료되지 않아 에이전트를 시작하지 않았습니다." : "Native PTY did not become writable, so the agent was not started.");
    }
    await createCliAdapterSession({
      adapterId: terminalAgentBridgeAdapterId,
      prompt: sessionPrompt,
      runningId: "session",
      taskKind: selectedMode.id
    });
  };
  const planSubagentTools = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      throw new Error(runtimeUnavailableErrorMessage);
    }
    const goal = sessionPrompt.trim() || (uiLanguage === "ko"
      ? `${selectedMode.label} 작업을 manager/subagent tool 구조로 계획`
      : `Plan ${selectedMode.label} as manager/subagent tools`);
    const context = [
      uiLanguage === "ko" ? "Desktop Runtime에서 실행된 bounded subagent tool planning 요청입니다." : "Bounded subagent tool planning request from Desktop Runtime.",
      `mode=${selectedMode.id}`,
      `adapter=${selectedAdapter?.adapterId || selectedSessionAdapterId}`,
      `workspace=${workingDir.trim() || workspacePathLabel}`
    ].join("\n");
    const report = await tauriInvoke<SubagentToolPlanReport>("run_subagent_tool_plan", {
      input: {
        goal,
        context,
        workingDir: workingDir.trim() || undefined,
        preferredPattern: "supervisor_router",
        requiredCapabilities: ["research", "spec planning", "evaluation"],
        blockedTools: ["direct_private_file_access"],
        maxSubagents: 5
      }
    });
    setLastSubagentToolPlan(report);
    setSelectedSubagentToolNames(report.subagentTools.slice(0, defaultSubagentFanoutSelections).map((tool) => tool.toolName));
    setSelectedTaskRunId(report.taskRunId);
    await refreshTaskRunRecords();
  };
  const executeSubagentTools = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      throw new Error(runtimeUnavailableErrorMessage);
    }
    if (!lastSubagentToolPlan || !selectedSubagentTool) {
      throw new Error(uiLanguage === "ko" ? "먼저 서브에이전트 툴 계획을 생성하고 실행할 툴을 선택하세요." : "Create a subagent tool plan and select a tool first.");
    }
    setRunningAdapterId("subagent-execution");
    try {
      const report = await tauriInvoke<CliSessionReport>("start_subagent_tool_execution", {
        input: {
          planTaskRunId: lastSubagentToolPlan.taskRunId,
          toolName: selectedSubagentTool.toolName,
          adapterId: terminalAgentBridgeAdapterId,
          prompt: sessionPrompt.trim() || (uiLanguage === "ko"
            ? `${selectedSubagentTool.agentName} 역할로 현재 manager 작업을 검토하고, 요약/근거/위험/검증/다음 행동만 보고하세요.`
            : `Run as ${selectedSubagentTool.agentName} for the current manager task and report only summary, evidence, risks, validation, and next action.`),
          workingDir: workingDir.trim() || undefined,
          autoDeferQuestions
        }
      });
      setLastSubagentToolExecution(report);
      setSelectedSessionId(report.sessionId);
      setSessions((current) => [report, ...current.filter((session) => session.sessionId !== report.sessionId)].slice(0, 12));
      setSelectedTaskRunId(report.taskRunId);
      setTerminalDrawerOpen(true);
      await refreshTaskRunRecords();
    } finally {
      setRunningAdapterId("");
    }
  };
  const fanoutSubagentTools = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      throw new Error(runtimeUnavailableErrorMessage);
    }
    if (!lastSubagentToolPlan || lastSubagentToolPlan.subagentTools.length === 0) {
      throw new Error(uiLanguage === "ko" ? "먼저 서브에이전트 툴 계획을 생성하세요." : "Create a subagent tool plan first.");
    }
    if (selectedSubagentFanoutToolNames.length < 2) {
      throw new Error(uiLanguage === "ko" ? "묶음 실행할 서브에이전트 툴을 2개 이상 선택하세요." : "Select at least two subagent tools for fan-out.");
    }
    setRunningAdapterId("subagent-fanout");
    try {
      const report = await tauriInvoke<SubagentToolFanoutReport>("start_subagent_tool_fanout", {
        input: {
          planTaskRunId: lastSubagentToolPlan.taskRunId,
          toolNames: selectedSubagentFanoutToolNames,
          adapterId: terminalAgentBridgeAdapterId,
          prompt: sessionPrompt.trim() || (uiLanguage === "ko"
            ? "선택된 서브에이전트들은 현재 manager 작업을 각자 역할 관점에서 검토하고, 요약/근거/위험/검증/충돌 또는 의존성/다음 행동만 보고하세요."
            : "The selected subagents should review the current manager task from their roles and report only summary, evidence, risks, validation, conflicts or dependencies, and next action."),
          workingDir: workingDir.trim() || undefined,
          autoDeferQuestions,
          maxSessions: selectedSubagentFanoutToolNames.length
        }
      });
      const startedSessions = report.lanes
        .map((lane) => lane.session)
        .filter((session): session is CliSessionReport => Boolean(session));
      setLastSubagentToolFanout(report);
      setPipelineReports((current) => [report, ...current].slice(0, 8));
      if (startedSessions[0]) {
        setSelectedSessionId(startedSessions[0].sessionId);
        setSelectedTaskRunId(startedSessions[0].taskRunId);
      }
      if (startedSessions.length > 0) {
        setSessions((current) => mergeSessionReports(current, startedSessions, { promote: true }));
        setTerminalDrawerOpen(true);
      }
      await refreshTaskRunRecords();
    } finally {
      setRunningAdapterId("");
    }
  };

  useRuntimeEnvironmentRefresh({
    runtimeAvailable: Boolean(invoke),
    refreshProviderCredentials: onRefreshProviderCredentials,
    refreshAdapters,
    refreshServiceReadiness
  });

  useEffect(() => {
    if (!settingsSyncRequest || !settingsSyncRequestConsumer) {
      return;
    }
    void syncSettingsAndRuntimeState({
      reason: settingsSyncRequest.reason,
      includeSourceCatalog: settingsSyncRequest.includeSourceCatalog || isFileWorkspaceSurface,
      forceSourceRefresh: settingsSyncRequest.forceSourceRefresh,
      feedback: true
    }).catch(() => undefined).finally(() => {
      onSettingsSyncRequestConsumed?.(settingsSyncRequest.requestId);
    });
  }, [isFileWorkspaceSurface, onSettingsSyncRequestConsumed, settingsSyncRequest, settingsSyncRequestConsumer, syncSettingsAndRuntimeState]);

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
      <DesktopActionFeedbackCard feedback={desktopActionFeedback} placement="quick-start" uiLanguage={uiLanguage} />

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

      <SourceWorkbenchPanel
        activeMonacoEditorOptions={activeMonacoEditorOptions}
        activeWorkspacePath={desktopWorkspace?.activeWorkspacePath || desktopWorkspace?.fallbackWorkspacePath || "workspace pending"}
        appResourceSnapshot={desktopResourceSnapshot}
        copy={copy}
        currentSourceDirty={currentSourceDirty}
        editorBusy={editorBusy}
        filteredEditableSourceFiles={filteredEditableSourceFiles}
        formatBytes={formatBytes}
        invokeAvailable={Boolean(invoke)}
        isFileWorkspaceSurface={isFileWorkspaceSurface}
        latestSourceSaveResult={latestSourceSaveResult}
        openDraftEntries={openDraftEntries}
        runtimeSourceFileCount={runtimeSourceFiles.length}
        saveAllBusy={saveAllBusy}
        selectedSourceFileOption={selectedSourceFileOption}
        selectedSourcePath={selectedSourcePath}
        setSelectedSourcePath={setSelectedSourcePath}
        setSourceEditorViewMode={setSourceEditorViewMode}
        setSourceMinimapEnabled={setSourceMinimapEnabled}
        setSourcePathInput={setSourcePathInput}
        setSourceWorkbenchView={setSourceWorkbenchView}
        setSourceWordWrap={setSourceWordWrap}
        sourceCatalogFilesCount={sourceCatalogFiles.length}
        sourceCatalogLabel={sourceCatalogLabel}
        sourceCatalogReport={sourceCatalogReport}
        sourceCopyNotice={sourceCopyNotice}
        sourceDiff={sourceDiff}
        sourceDraft={sourceDraft}
        sourceEditorLocked={sourceEditorLocked}
        sourceEditorViewMode={sourceEditorViewMode}
        sourceFile={sourceFile}
        sourceFilter={sourceFilter}
        sourceMinimapEnabled={sourceMinimapEnabled}
        sourcePathInput={sourcePathInput}
        sourceSaveResults={sourceSaveResults}
        sourceSaveTotalBytes={sourceSaveTotalBytes}
        sourceWorkbenchView={sourceWorkbenchView}
        sourceWordWrap={sourceWordWrap}
        uiLanguage={uiLanguage}
        workspaceResourceBusy={workspaceResourceBusy}
        workspaceResourceReport={workspaceResourceReport}
        workspaceSourceLabel={desktopWorkspace?.activeWorkspaceSource || (runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource)}
        workspaceWarmupReport={workspaceWarmupReport}
        writeReport={writeReport}
        onCloseDraftByPath={closeDraftByPath}
        onCopyCurrentSourceDraft={copyCurrentSourceDraft}
        onHandleSourceEditorMount={handleSourceEditorMount}
        onLoadSourceFile={loadSourceFile}
        onOpenDraftOrLoad={openDraftOrLoad}
        onRunSourceEditorCommand={runSourceEditorCommand}
        onSaveAllSourceDrafts={saveAllSourceDrafts}
        onSaveSourceFile={saveSourceFile}
        onSelectDraftEntry={selectDraftEntry}
        onSourceFilterChange={setSourceFilter}
        onUpdateSourceDraft={(nextContent) => updateSourceDraft(nextContent, { immediate: false })}
      />
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
                {uiLanguage === "ko" ? "실행 구성" : "Run Configuration"}
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

      <section className="panel wide terminal-agent-bridge" data-terminal-agent-bridge="pty-to-agent">
        <div className="terminal-agent-bridge-copy">
          <div>
            <p className="eyebrow">{uiLanguage === "ko" ? "터미널 연결 실행" : "Terminal-connected run"}</p>
            <h2>{uiLanguage === "ko" ? "PTY를 연결하고 에이전트를 바로 시작" : "Connect PTY and start the agent"}</h2>
            <p>
              {uiLanguage === "ko"
                ? "네이티브 터미널이 먼저 열리고, 연결이 쓰기 가능한 상태가 된 뒤 같은 작업 폴더에서 선택한 agent/CLI 세션을 시작합니다."
                : "The native terminal opens first; once it is writable, the selected agent/CLI session starts in the same working folder."}
            </p>
          </div>
          <code>{workingDir.trim() || workspacePathLabel}</code>
        </div>

        <div className="terminal-agent-bridge-steps" aria-label={uiLanguage === "ko" ? "터미널 에이전트 연결 상태" : "Terminal agent bridge status"}>
          {terminalAgentBridgeSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.id} className={`state-${step.state}`} data-terminal-agent-step={step.id}>
                <span>
                  <Icon size={15} aria-hidden="true" />
                </span>
                <div>
                  <small>{step.label}</small>
                  <strong>{step.value}</strong>
                  <em>{step.detail}</em>
                </div>
              </article>
            );
          })}
        </div>

        <div className="terminal-agent-bridge-actions">
          <button
            type="button"
            className={desktopActionButtonClass("start-terminal-agent-bridge")}
            data-terminal-agent-action="connect-start"
            data-desktop-action-feedback="start-terminal-agent-bridge"
            onClick={() =>
              void runDesktopAction(
                "start-terminal-agent-bridge",
                startTerminalAgentBridge,
                uiLanguage === "ko" ? "PTY 연결 후 에이전트 CLI 세션을 시작했습니다." : "Connected PTY, then started the agent CLI session."
              )
            }
            disabled={!terminalAgentBridgeCanStart}
          >
            <PlayCircle size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "연결하고 에이전트 시작" : "Connect and start agent"}</span>
          </button>
          <button
            type="button"
            data-terminal-agent-action="open-terminal"
            onClick={() => {
              setTerminalDrawerOpen(true);
              setDesktopActionStatus("open-terminal", "done", uiLanguage === "ko" ? "하단 터미널 패널을 열었습니다." : "Opened the bottom terminal panel.");
            }}
          >
            <SquareTerminal size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "터미널 보기" : "Open terminal"}</span>
          </button>
          <button type="button" data-terminal-agent-action="settings" onClick={() => onOpenSettings(terminalAgentBridgeAdapterReady ? "session" : "adapter")}>
            <Settings size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "연결 설정" : "Connection settings"}</span>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("plan-subagent-tools")}
            data-terminal-agent-action="plan-subagents"
            data-desktop-action-feedback="plan-subagent-tools"
            onClick={() =>
              void runDesktopAction(
                "plan-subagent-tools",
                planSubagentTools,
                uiLanguage === "ko" ? "서브에이전트 툴 계획을 만들고 Task Runs에 저장했습니다." : "Created a subagent tool plan and saved it to Task Runs."
              )
            }
            disabled={!runtimeReady}
          >
            <Network size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "서브에이전트 툴 계획" : "Plan subagent tools"}</span>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("execute-subagent-tools")}
            data-terminal-agent-action="execute-subagent"
            data-desktop-action-feedback="execute-subagent-tools"
            onClick={() =>
              void runDesktopAction(
                "execute-subagent-tools",
                executeSubagentTools,
                uiLanguage === "ko" ? "선택한 서브에이전트 도구를 독립 실행 세션으로 시작했습니다." : "Started the selected subagent tool as an independent execution session."
              )
            }
            disabled={!runtimeReady || !terminalAgentBridgeAdapterReady || runningAdapterId !== "" || !selectedSubagentTool}
          >
            <Bot size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "선택 툴 실행" : "Run selected tool"}</span>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("fanout-subagent-tools")}
            data-terminal-agent-action="fanout-subagents"
            data-desktop-action-feedback="fanout-subagent-tools"
            onClick={() =>
              void runDesktopAction(
                "fanout-subagent-tools",
                fanoutSubagentTools,
                uiLanguage === "ko" ? "선택한 서브에이전트 도구를 묶음 실행 세션으로 시작했습니다." : "Started selected subagent tools as a bounded fan-out."
              )
            }
            disabled={
              !runtimeReady ||
              !terminalAgentBridgeAdapterReady ||
              runningAdapterId !== "" ||
              !lastSubagentToolPlan ||
              lastSubagentToolPlan.status !== "completed" ||
              selectedSubagentFanoutToolNames.length < 2
            }
          >
            <GitBranch size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "선택 묶음 실행" : "Run selected"}</span>
          </button>
          {lastSubagentToolPlan && (
            <div className="terminal-agent-plan-result" data-subagent-tool-plan-result>
              <strong>
                {lastSubagentToolPlan.subagentToolCount} {uiLanguage === "ko" ? "개 툴" : "tools"} · {lastSubagentToolPlan.planStatus} · {selectedSubagentTools.length}/{maxSubagentFanoutSelections}
              </strong>
              <span>
                {selectedSubagentTools.map((tool) => tool.toolName).join(" · ") || lastSubagentToolPlan.command}
              </span>
              <code>{lastSubagentToolPlan.taskRunId}</code>
              <div className="subagent-tool-selector" data-subagent-tool-selector>
                <div className="subagent-tool-selector-toolbar">
                  <span data-subagent-tool-selected-count>
                    {uiLanguage === "ko" ? "선택" : "Selected"} {selectedSubagentTools.length}/{maxSubagentFanoutSelections}
                  </span>
                  <button type="button" onClick={selectDefaultSubagentTools} disabled={lastSubagentToolPlan.subagentTools.length === 0}>
                    <ListFilter size={13} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "기본" : "Default"}</span>
                  </button>
                  <button type="button" onClick={() => setSelectedSubagentToolNames([])} disabled={selectedSubagentTools.length === 0}>
                    <X size={13} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "해제" : "Clear"}</span>
                  </button>
                </div>
                <div className="subagent-tool-selector-list">
                  {lastSubagentToolPlan.subagentTools.map((tool) => {
                    const selected = selectedSubagentToolNames.includes(tool.toolName);
                    const selectionLimitReached = !selected && selectedSubagentTools.length >= maxSubagentFanoutSelections;
                    return (
                      <label
                        key={tool.toolName}
                        className={`subagent-tool-option ${selected ? "selected" : ""}`}
                        data-subagent-tool-option={tool.toolName}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={selectionLimitReached}
                          data-subagent-tool-checkbox={tool.toolName}
                          onChange={() => toggleSubagentToolSelection(tool.toolName)}
                        />
                        <span>
                          <strong>{tool.toolName}</strong>
                          <small>{tool.agentName}</small>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {lastSubagentToolExecution && (
            <div className="terminal-agent-plan-result execution" data-subagent-tool-execution-result>
              <strong>
                {lastSubagentToolExecution.laneRole || lastSubagentToolExecution.laneId || "subagent"} · {lastSubagentToolExecution.status}
              </strong>
              <span>
                {lastSubagentToolExecution.adapterId} · {lastSubagentToolExecution.command}
              </span>
              <code>{lastSubagentToolExecution.taskRunId}</code>
            </div>
          )}
          {lastSubagentToolFanout && (
            <div className="terminal-agent-plan-result fanout" data-subagent-tool-fanout-result>
              <strong>
                {lastSubagentToolFanout.startedSessions}/{lastSubagentToolFanout.selectedToolCount} {uiLanguage === "ko" ? "개 시작" : "started"} · {lastSubagentToolFanout.status}
              </strong>
              <span>
                {lastSubagentToolFanout.lanes.map((lane) => `${lane.laneId}:${lane.status}`).slice(0, 3).join(" · ")}
              </span>
              <code>{lastSubagentToolFanout.pipelineId} · {lastSubagentToolFanout.mergeGate}</code>
            </div>
          )}
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
            <span>{cockpitStats.activeSessions} {uiLanguage === "ko" ? "활성" : "active"}</span>
            <span>{cockpitStats.decisionItems} {uiLanguage === "ko" ? "결정함" : "inbox"}</span>
            <span>{cockpitStats.taskRuns} {uiLanguage === "ko" ? "실행" : "runs"}</span>
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
                <small>
                  {row.adapter.version || row.adapter.lastError || row.guideVerify || row.adapter.command}
                </small>
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
                <span>{row.activeAdapterSessions.length}/{row.adapterSessions.length} {uiLanguage === "ko" ? "세션" : "sessions"}</span>
                <span>{row.adapterTaskRuns.length} {uiLanguage === "ko" ? "실행" : "task-runs"}</span>
                <span>{row.adapterDecisionItems} {uiLanguage === "ko" ? "결정" : "decisions"}</span>
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
            <button className="ide-toolbar-button primary" type="button" onClick={() => void runDesktopAction("start-selected-lane", startSelectedLaneAction)} disabled={!runtimeReady || runningAdapterId !== ""}>
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
            <button type="button" className="active" onClick={() => void runDesktopAction("start-selected-lane", startSelectedLaneAction)} disabled={!runtimeReady || runningAdapterId !== ""}>
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
        <AgentFirstRunGuideCard
          uiLanguage={uiLanguage}
          runtimeAvailable={runtimeReady}
          workspaceReady={Boolean(desktopWorkspace?.activeWorkspacePath)}
          workspaceLabel={workspacePathLabel}
          providerReady={providerSummaries.some((provider) => provider.configured || provider.authMethod === "local_http")}
          providerConfiguredCount={providerConfiguredCount}
          providerTotalCount={providerTotalCount}
          primaryProviderLabel={primaryProvider ? providerDisplayName(primaryProvider.providerId, primaryProvider.label, uiLanguage) : (uiLanguage === "ko" ? "계정 설정 필요" : "Provider needed")}
          cliReady={Boolean(selectedAdapter?.available || availableCount > 0)}
          availableCliCount={availableCount}
          totalCliCount={adapters.length}
          selectedCliLabel={selectedAdapter?.label || selectedSessionAdapterId}
          agentConfigCount={agentCatalogCount}
          agentsInstructionReady={Boolean(agentsInstructionPath)}
          taskRunCount={taskRunRecords.length}
          running={runningAdapterId !== ""}
          settingsSyncBusy={settingsSyncBusy}
          onChooseWorkspace={() => void runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)}
          onOpenProviderSettings={() => onOpenSettings("providers")}
          onCheckAdapters={() => void runDesktopAction("check-adapters", runAllHealthChecks)}
          onSyncSettings={() => void runManualSettingsSync()}
          onPrepareAgentsInstructions={() => void runDesktopAction("prepare-agents-md", prepareAgentsInstructions)}
          onOpenSearchAgent={() => void runDesktopAction("open-search-agent", onOpenSearchAgentWorkbench || startDefaultSearchAgent)}
          onOpenTerminal={() => {
            setTerminalDrawerOpen(true);
            setDesktopActionStatus("open-terminal", "done", uiLanguage === "ko" ? "하단 터미널 패널을 열었습니다." : "Opened the bottom terminal panel.");
          }}
          onRefreshTaskRuns={() => void runDesktopAction("refresh-task-runs", refreshTaskRunRecords)}
        />
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
            className={desktopActionButtonClass("sync-settings")}
            data-desktop-action-feedback="sync-settings"
            onClick={() => void runManualSettingsSync()}
            disabled={!invoke || settingsSyncBusy}
          >
            <RefreshCw size={16} aria-hidden="true" />
            <span>{settingsSyncBusy ? (uiLanguage === "ko" ? "동기화 중" : "Syncing") : uiLanguage === "ko" ? "설정 동기화" : "Sync settings"}</span>
            <small>{settingsSyncNotice || (uiLanguage === "ko" ? "계정/CLI/작업공간/기록" : "accounts/CLIs/workspace/runs")}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("reveal-workspace")}
            data-desktop-action-feedback="reveal-workspace"
            onClick={() => void runNativeWorkspaceOsAction("reveal-workspace", "reveal_path")}
            disabled={!invoke}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "Finder" : "File manager"}</span>
            <small>{workspacePathLabel}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-workspace-path")}
            data-desktop-action-feedback="open-workspace-path"
            onClick={() => void runNativeWorkspaceOsAction("open-workspace-path", "open_path")}
            disabled={!invoke}
          >
            <ExternalLink size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "기본 앱" : "Default app"}</span>
            <small>{workspacePathLabel}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("open-external-terminal")}
            data-desktop-action-feedback="open-external-terminal"
            onClick={() => void runNativeWorkspaceOsAction("open-external-terminal", "open_external_terminal")}
            disabled={!invoke}
          >
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "외부 터미널" : "External terminal"}</span>
            <small>{workspacePathLabel}</small>
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
            onClick={() => void runDesktopAction("start-selected-lane", startSelectedLaneAction)}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <PlayCircle size={16} aria-hidden="true" />
	            <span>{uiLanguage === "ko" ? "선택한 실행 경로 시작" : "Start selected lane"}</span>
            <small>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</small>
          </button>
	        </div>
        <RuntimeInitStatusCard
          report={runtimeInitStatus}
          uiLanguage={uiLanguage}
          formatTimeLabel={formatTimeLabel}
          onOpenTerminal={() => setTerminalDrawerOpen(true)}
          onRefreshTaskRuns={() => void runDesktopAction("refresh-task-runs", refreshTaskRunRecords)}
        />
        <DesktopActionFeedbackCard feedback={desktopActionFeedback} placement="quick-start" uiLanguage={uiLanguage} />
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
	        <Metric label={uiLanguage === "ko" ? "Rust 모듈" : "Rust Modules"} value={rustRuntimeFeatureMap?.totalGroups ?? 0} icon={Layers} tone="violet" />
	        <Metric label={uiLanguage === "ko" ? "Rust 명령" : "Rust Commands"} value={rustRuntimeFeatureMap?.totalCommands ?? 0} icon={SquareTerminal} tone="green" />
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
            className={desktopActionButtonClass("sync-settings")}
            data-desktop-action-feedback="sync-settings"
            onClick={() => void runManualSettingsSync()}
            disabled={!invoke || settingsSyncBusy}
          >
            <RefreshCw size={16} aria-hidden="true" />
		            <span>{settingsSyncBusy ? (uiLanguage === "ko" ? "동기화 중" : "Syncing") : uiLanguage === "ko" ? "설정 동기화" : "Sync settings"}</span>
            <small>{settingsSyncNotice || serviceReadiness?.status || runtimeState}</small>
          </button>
          <button
            type="button"
            className={desktopActionButtonClass("start-selected-lane")}
            data-desktop-action-feedback="start-selected-lane"
            onClick={() => void runDesktopAction("start-selected-lane", startSelectedLaneAction)}
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
        <DesktopActionFeedbackCard feedback={desktopActionFeedback} placement="command-palette" uiLanguage={uiLanguage} />
      </section>

      <WorkspaceHostPanel
        uiLanguage={uiLanguage}
        desktopWorkspace={desktopWorkspace}
        workspaceHostBusy={workspaceHostBusy}
        workspaceHostNotice={workspaceHostNotice}
        workspaceImportPath={workspaceImportPath}
        workspaceCloneUrl={workspaceCloneUrl}
        workspaceCloneFolder={workspaceCloneFolder}
        invokeAvailable={Boolean(invoke)}
        chooseButtonClassName={desktopActionButtonClass("choose-workspace")}
        refreshButtonClassName={desktopActionButtonClass("refresh-workspace-host")}
        importButtonClassName={desktopActionButtonClass("import-workspace")}
        cloneButtonClassName={desktopActionButtonClass("clone-workspace")}
        onChooseWorkspace={() => void runDesktopAction("choose-workspace", chooseDesktopWorkspaceFolder)}
        onRefreshWorkspace={() => void runDesktopAction("refresh-workspace-host", refreshDesktopWorkspace)}
        onImportWorkspace={() => void runDesktopAction("import-workspace", importDesktopWorkspace)}
        onCloneWorkspace={() => void runDesktopAction("clone-workspace", cloneDesktopWorkspace)}
        onWorkspaceImportPathChange={setWorkspaceImportPath}
        onWorkspaceCloneUrlChange={setWorkspaceCloneUrl}
        onWorkspaceCloneFolderChange={setWorkspaceCloneFolder}
      />

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
                    className={`${(choice.promptKey || choice.id) === activeTaskPipePromptKey ? "active" : ""} ${choice.customized ? "customized" : ""}`.trim()}
                    aria-pressed={(choice.promptKey || choice.id) === activeTaskPipePromptKey}
                    onClick={() => selectTaskPipePromptChoice(choice)}
                    title={choice.detail}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.detail}</small>
                    {choice.badge && <em>{choice.badge}</em>}
                    {choice.customized && <em>{uiLanguage === "ko" ? "수정" : "Custom"}</em>}
                  </button>
                ))}
              </div>
              <textarea
                aria-label={uiLanguage === "ko" ? "작업 요청 직접 편집" : "Edit task intake"}
                value={taskPipePrompt}
                onChange={(event) => setTaskPipePrompt(event.target.value)}
                rows={4}
              />
              {activeTaskPipePromptChoice && (
                <div className="prompt-edit-actions" data-task-pipe-prompt-editor>
                  <button type="button" onClick={saveTaskPipePromptChoice} disabled={!taskPipePrompt.trim()}>
                    <ClipboardCheck size={14} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "선택 프롬프트 저장" : "Save selected prompt"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetTaskPipePromptChoice}
                    disabled={!activeTaskPipePromptChoice.customized && taskPipePrompt.trim() === (activeTaskPipePromptChoice.defaultValue || activeTaskPipePromptChoice.value).trim()}
                  >
                    <RefreshCw size={14} aria-hidden="true" />
                    <span>{uiLanguage === "ko" ? "기본값" : "Default"}</span>
                  </button>
                  <small>{activeTaskPipePromptChoice.customized ? (uiLanguage === "ko" ? "수정된 프롬프트" : "Customized prompt") : uiLanguage === "ko" ? "기본 프롬프트" : "Default prompt"}</small>
                </div>
              )}
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

      <AccumulatedDataPanel
        uiLanguage={uiLanguage}
        accumulatedDataOverview={accumulatedDataOverview}
        accumulatedDataStats={accumulatedDataStats}
        accumulatedDataBusy={accumulatedDataBusy}
        accumulatedDataNotice={accumulatedDataNotice}
        runtimeDataBoundary={runtimeDataBoundary}
        invokeAvailable={Boolean(invoke)}
        refreshButtonClassName={desktopActionButtonClass("refresh-accumulated-data")}
        onRefreshOverview={() => void runDesktopAction("refresh-accumulated-data", refreshAccumulatedDataOverview)}
        formatBytes={formatBytes}
        formatTimeLabel={formatTimeLabel}
      />

      <RuntimeDataSupportPanel
        uiLanguage={uiLanguage}
        runtimeDataBoundary={runtimeDataBoundary}
        payloadAudit={payloadAudit}
        supportBundle={supportBundle}
        runtimeDataBusy={runtimeDataBusy}
        runtimeDataNotice={runtimeDataNotice}
        invokeAvailable={Boolean(invoke)}
        refreshRuntimeRootsButtonClassName={desktopActionButtonClass("refresh-runtime-roots")}
        auditPayloadButtonClassName={desktopActionButtonClass("audit-payload")}
        supportBundleButtonClassName={desktopActionButtonClass("create-support-bundle")}
        onRefreshRuntimeRoots={() => void runDesktopAction("refresh-runtime-roots", refreshRuntimeDataBoundary)}
        onAuditPayload={() => void runDesktopAction("audit-payload", runInstallerPayloadAudit)}
        onCreateSupportBundle={() => void runDesktopAction("create-support-bundle", createSupportDiagnosticBundle)}
        formatBytes={formatBytes}
      />

      <ServiceReadinessPanel
        uiLanguage={uiLanguage}
        serviceReadiness={serviceReadiness}
        serviceReadinessBusy={serviceReadinessBusy}
        serviceReadinessNotice={serviceReadinessNotice}
        appUpdateCheck={appUpdateCheck}
        appUpdateInstall={appUpdateInstall}
        appUpdateBusy={appUpdateBusy}
        invokeAvailable={Boolean(invoke)}
        refreshButtonClassName={desktopActionButtonClass("refresh-service-readiness")}
        checkUpdateButtonClassName={desktopActionButtonClass("check-app-update")}
        installUpdateButtonClassName={desktopActionButtonClass("install-app-update")}
        onRunReadiness={() => void runDesktopAction("refresh-service-readiness", refreshServiceReadiness)}
        onCheckUpdate={() => void runDesktopAction("check-app-update", checkAppUpdate)}
        onInstallUpdate={() => void runDesktopAction("install-app-update", installAppUpdate)}
        formatTimeLabel={formatTimeLabel}
        formatBytes={formatBytes}
      />

      <TaskRunStorePanel
        uiLanguage={uiLanguage}
        taskRunRecords={taskRunRecords}
        selectedTaskRunRecord={selectedTaskRunRecord}
        taskRunDetail={taskRunDetail}
        taskRunBusy={taskRunBusy}
        taskRunPruneNotice={taskRunPruneNotice}
        invokeAvailable={Boolean(invoke)}
        runningAdapterId={runningAdapterId}
        refreshButtonClassName={desktopActionButtonClass("refresh-task-runs")}
        onRefreshRecords={() => void runDesktopAction("refresh-task-runs", refreshTaskRunRecords)}
        onPruneRecords={() => void pruneTaskRunRecords()}
        onLoadDetail={(taskRunId) => void loadTaskRunDetail(taskRunId)}
        formatBytes={formatBytes}
        formatDuration={formatDuration}
      />

      <DesktopControlPanel
        uiLanguage={uiLanguage}
        adapters={adapters}
        reports={reports}
        sessions={sessions}
        health={health}
        error={error}
        runningAdapterId={runningAdapterId}
        providerCredentialReport={providerCredentialReport}
        invokeAvailable={Boolean(invoke)}
        checkAdaptersButtonClassName={desktopActionButtonClass("check-adapters")}
        onRefreshAdapters={refreshAdapters}
        onRunAllHealthChecks={() => runDesktopAction("check-adapters", runAllHealthChecks)}
        onRunSingleHealthCheck={(adapterId) => runSingleHealthCheck(adapterId)}
        onOpenSettings={onOpenSettings}
      />
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
        sessionPromptChoiceKey={activeSessionPromptKey}
        sessionPromptChoices={sessionPromptChoices}
        sessions={sessions}
        sessionStats={sessionStats}
        sourceDirty={Boolean(sourceDiff?.dirty)}
        uiLanguage={uiLanguage}
        workingDir={workingDir}
        workingDirOptions={workingDirOptions}
        nativePtyQuickCommands={runtimeQuickCommands}
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
        onSelectSessionPromptChoice={selectSessionPromptChoice}
        onSessionPromptChange={setSessionPrompt}
        onSaveSessionPromptChoice={saveSessionPromptChoice}
        onStartNativePtySession={startNativePtySession}
        onStartSession={startSession}
        onResetSessionPromptChoice={resetSessionPromptChoice}
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

function linesFromText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
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

function getTauriInvoke(): TauriInvoke | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.__TAURI__?.core?.invoke ?? null;
}

function errorMessage(caught: unknown) {
  if (caught instanceof Error) {
    return caught.message;
  }
  return String(caught);
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

function shouldLaunchAdapterInNativePty(adapterId: string) {
  // pipe 세션은 기록/자동화용으로 유지하고, 사람이 직접 쓰는 AI CLI는 PTY를 기본 실행면으로 둔다.
  return new Set(["codex-cli", "claude-code-cli", "gemini-cli", "opencode-cli", "claw-code-cli"]).has(adapterId);
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
