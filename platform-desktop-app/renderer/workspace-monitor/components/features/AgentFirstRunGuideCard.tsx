import { Bot, CheckCircle2, Circle, FileText, FolderOpen, History, KeyRound, RefreshCw, Search, Settings, SquareTerminal } from "lucide-react";

import type { UiLanguage } from "@/types/desktop";

type AgentFirstRunGuideStatus = "ready" | "next" | "pending" | "blocked";

type AgentFirstRunGuideStep = {
  id: string;
  label: string;
  detail: string;
  value: string;
  status: AgentFirstRunGuideStatus;
};

export type AgentFirstRunGuideCardProps = {
  uiLanguage: UiLanguage;
  runtimeAvailable: boolean;
  workspaceReady: boolean;
  workspaceLabel: string;
  providerReady: boolean;
  providerConfiguredCount: number;
  providerTotalCount: number;
  primaryProviderLabel: string;
  cliReady: boolean;
  availableCliCount: number;
  totalCliCount: number;
  selectedCliLabel: string;
  agentConfigCount: number;
  agentsInstructionReady: boolean;
  taskRunCount: number;
  running: boolean;
  settingsSyncBusy: boolean;
  onChooseWorkspace: () => void;
  onOpenProviderSettings: () => void;
  onCheckAdapters: () => void;
  onSyncSettings: () => void;
  onPrepareAgentsInstructions: () => void;
  onOpenSearchAgent: () => void;
  onOpenTerminal: () => void;
  onRefreshTaskRuns: () => void;
};

export function AgentFirstRunGuideCard({
  uiLanguage,
  runtimeAvailable,
  workspaceReady,
  workspaceLabel,
  providerReady,
  providerConfiguredCount,
  providerTotalCount,
  primaryProviderLabel,
  cliReady,
  availableCliCount,
  totalCliCount,
  selectedCliLabel,
  agentConfigCount,
  agentsInstructionReady,
  taskRunCount,
  running,
  settingsSyncBusy,
  onChooseWorkspace,
  onOpenProviderSettings,
  onCheckAdapters,
  onSyncSettings,
  onPrepareAgentsInstructions,
  onOpenSearchAgent,
  onOpenTerminal,
  onRefreshTaskRuns
}: AgentFirstRunGuideCardProps) {
  const ko = uiLanguage === "ko";
  const steps = buildAgentFirstRunSteps({
    ko,
    workspaceReady,
    workspaceLabel,
    providerReady,
    providerConfiguredCount,
    providerTotalCount,
    primaryProviderLabel,
    cliReady,
    availableCliCount,
    totalCliCount,
    selectedCliLabel,
    agentConfigCount,
    agentsInstructionReady,
    taskRunCount
  });
  const currentStep = steps.find((step) => step.status === "next") || steps.find((step) => step.status === "pending") || steps[steps.length - 1];
  const completeCount = steps.filter((step) => step.status === "ready").length;

  return (
    <section className="agent-first-run-guide-card" data-agent-first-run-guide="true" aria-label={ko ? "에이전트 첫 실행 안내" : "Agent first-run guide"}>
      <header className="agent-first-run-guide-header">
        <div>
          <p className="eyebrow">{ko ? "처음 쓰는 순서" : "First-run path"}</p>
          <h3>{ko ? "에이전트는 이렇게 시작합니다" : "Start an agent from here"}</h3>
        </div>
        <span className="agent-first-run-progress">
          <CheckCircle2 size={15} aria-hidden="true" />
          {completeCount}/{steps.length}
        </span>
      </header>

      <div className={`agent-first-run-guidance status-${currentStep.status}`} role="status" aria-live="polite">
        <Bot size={18} aria-hidden="true" />
        <div>
          <strong>{currentStep.label}</strong>
          <small>{currentStep.detail}</small>
        </div>
      </div>

      <div className="agent-first-run-step-grid">
        {steps.map((step, index) => {
          const StepIcon = step.status === "ready" ? CheckCircle2 : Circle;
          return (
            <article key={step.id} className={`agent-first-run-step status-${step.status}`} data-agent-first-run-step={step.id}>
              <span>{index + 1}</span>
              <StepIcon size={16} aria-hidden="true" />
              <div>
                <strong>{step.label}</strong>
                <small>{step.detail}</small>
                <em>{step.value}</em>
              </div>
            </article>
          );
        })}
      </div>

      <div className="agent-first-run-actions" aria-label={ko ? "첫 실행 액션" : "First-run actions"}>
        <button type="button" onClick={onChooseWorkspace} disabled={!runtimeAvailable}>
          <FolderOpen size={15} aria-hidden="true" />
          <span>{ko ? "작업공간 선택" : "Choose workspace"}</span>
        </button>
        <button type="button" onClick={onOpenProviderSettings}>
          <KeyRound size={15} aria-hidden="true" />
          <span>{ko ? "계정 설정" : "Provider settings"}</span>
        </button>
        <button type="button" onClick={onCheckAdapters} disabled={!runtimeAvailable || running}>
          <Settings size={15} aria-hidden="true" />
          <span>{ko ? "CLI 확인" : "Check CLIs"}</span>
        </button>
        <button type="button" onClick={onSyncSettings} disabled={!runtimeAvailable || settingsSyncBusy}>
          <RefreshCw size={15} aria-hidden="true" />
          <span>{settingsSyncBusy ? (ko ? "동기화 중" : "Syncing") : ko ? "설정 동기화" : "Sync settings"}</span>
        </button>
        <button type="button" onClick={onPrepareAgentsInstructions} disabled={!runtimeAvailable}>
          <FileText size={15} aria-hidden="true" />
          <span>{ko ? "AGENTS.md 만들기/열기" : "Create/open AGENTS.md"}</span>
        </button>
        <button type="button" className="primary" onClick={onOpenSearchAgent} disabled={!runtimeAvailable || running}>
          <Search size={15} aria-hidden="true" />
          <span>{ko ? "검색 에이전트 시작" : "Start search agent"}</span>
        </button>
        <button type="button" onClick={onOpenTerminal}>
          <SquareTerminal size={15} aria-hidden="true" />
          <span>{ko ? "터미널 보기" : "Show terminal"}</span>
        </button>
        <button type="button" onClick={onRefreshTaskRuns} disabled={!runtimeAvailable}>
          <History size={15} aria-hidden="true" />
          <span>{ko ? "실행 기록" : "Task runs"}</span>
        </button>
      </div>
    </section>
  );
}

function buildAgentFirstRunSteps({
  ko,
  workspaceReady,
  workspaceLabel,
  providerReady,
  providerConfiguredCount,
  providerTotalCount,
  primaryProviderLabel,
  cliReady,
  availableCliCount,
  totalCliCount,
  selectedCliLabel,
  agentConfigCount,
  agentsInstructionReady,
  taskRunCount
}: {
  ko: boolean;
  workspaceReady: boolean;
  workspaceLabel: string;
  providerReady: boolean;
  providerConfiguredCount: number;
  providerTotalCount: number;
  primaryProviderLabel: string;
  cliReady: boolean;
  availableCliCount: number;
  totalCliCount: number;
  selectedCliLabel: string;
  agentConfigCount: number;
  agentsInstructionReady: boolean;
  taskRunCount: number;
}): AgentFirstRunGuideStep[] {
  const rawSteps: AgentFirstRunGuideStep[] = [
    {
      id: "workspace",
      label: ko ? "작업공간 고르기" : "Pick a workspace",
      detail: ko ? "에이전트가 읽고 고칠 폴더를 먼저 정합니다." : "Choose the folder the agent can inspect and edit.",
      value: workspaceLabel,
      status: workspaceReady ? "ready" : "pending"
    },
    {
      id: "provider",
      label: ko ? "모델 계정 또는 로컬 모델 연결" : "Connect a model account or local model",
      detail: ko ? "OpenAI/Gemini 키나 Ollama 같은 로컬 런타임을 준비합니다." : "Prepare an OpenAI/Gemini key or a local runtime such as Ollama.",
      value: providerReady
        ? primaryProviderLabel
        : ko
          ? `${providerConfiguredCount}/${providerTotalCount || "?"} 연결`
          : `${providerConfiguredCount}/${providerTotalCount || "?"} connected`,
      status: providerReady ? "ready" : "pending"
    },
    {
      id: "cli",
      label: ko ? "Codex CLI 실행 경로 확인" : "Check Codex CLI run path",
      detail: ko ? "설치된 CLI가 실제로 실행 가능한지 확인합니다." : "Confirm that the installed CLI is runnable.",
      value: cliReady
        ? selectedCliLabel
        : ko
          ? `${availableCliCount}/${totalCliCount || "?"} CLI 준비`
          : `${availableCliCount}/${totalCliCount || "?"} CLIs ready`,
      status: cliReady ? "ready" : "pending"
    },
    {
      id: "instructions",
      label: ko ? "AGENTS.md 지시 확인" : "Check AGENTS.md instructions",
      detail: ko ? "프로젝트 규칙은 AGENTS.md가 에이전트에게 전달합니다." : "Project rules are passed to the agent through AGENTS.md.",
      value: agentsInstructionReady ? "AGENTS.md" : ko ? "없으면 /init 또는 템플릿으로 생성" : "Create with /init or a template",
      status: agentsInstructionReady || agentConfigCount > 0 ? "ready" : "pending"
    },
    {
      id: "first-run",
      label: ko ? "첫 작업 실행" : "Run the first task",
      detail: ko ? "기본값은 이미 있는 research-insight-planner-agent입니다." : "The default is the existing research-insight-planner-agent.",
      value: taskRunCount > 0 ? (ko ? `${taskRunCount}개 실행 기록` : `${taskRunCount} task runs`) : "research-insight-planner-agent",
      status: taskRunCount > 0 ? "ready" : "pending"
    }
  ];
  const firstPendingIndex = rawSteps.findIndex((step) => step.status === "pending");
  return rawSteps.map((step, index) => {
    if (firstPendingIndex === -1) {
      return step;
    }
    if (index === firstPendingIndex) {
      return { ...step, status: "next" };
    }
    if (index > firstPendingIndex && step.status !== "ready") {
      return { ...step, status: "blocked" };
    }
    return step;
  });
}
