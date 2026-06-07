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
  const firstRunActionLabel = ko ? "첫 작업 시작" : "Start the first task";

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
        <button
          type="button"
          onClick={onChooseWorkspace}
          disabled={!runtimeAvailable}
          aria-label={ko ? "에이전트 작업공간 선택" : "Choose agent workspace"}
          title={ko ? "에이전트가 읽고 수정할 작업공간 선택" : "Choose the workspace the agent can inspect and edit"}
        >
          <FolderOpen size={15} aria-hidden="true" />
          <span>{ko ? "작업공간" : "Workspace"}</span>
        </button>
        <button
          type="button"
          onClick={onOpenProviderSettings}
          aria-label={ko ? "모델 계정 설정 열기" : "Open model provider settings"}
          title={ko ? "OpenAI, Gemini, 로컬 모델 계정 설정" : "Open OpenAI, Gemini, or local model account settings"}
        >
          <KeyRound size={15} aria-hidden="true" />
          <span>{ko ? "계정" : "Account"}</span>
        </button>
        <button
          type="button"
          onClick={onCheckAdapters}
          disabled={!runtimeAvailable || running}
          aria-label={ko ? "CLI 실행 가능 여부 확인" : "Check CLI run path"}
          title={ko ? "설치된 CLI가 실제로 실행 가능한지 확인" : "Confirm that the installed CLI is runnable"}
        >
          <Settings size={15} aria-hidden="true" />
          <span>{ko ? "CLI" : "CLI"}</span>
        </button>
        <button
          type="button"
          onClick={onSyncSettings}
          disabled={!runtimeAvailable || settingsSyncBusy}
          aria-label={ko ? "설정과 런타임 상태 동기화" : "Sync settings and runtime state"}
          title={ko ? "계정, CLI, 서비스, 작업공간, 실행 기록 다시 읽기" : "Reload accounts, CLI, service readiness, workspace, and task runs"}
        >
          <RefreshCw size={15} aria-hidden="true" />
          <span>{settingsSyncBusy ? (ko ? "동기화 중" : "Syncing") : ko ? "동기화" : "Sync"}</span>
        </button>
        <button
          type="button"
          onClick={onPrepareAgentsInstructions}
          disabled={!runtimeAvailable}
          aria-label={ko ? "AGENTS.md 만들기 또는 열기" : "Create or open AGENTS.md"}
          title={ko ? "프로젝트 지시 파일인 AGENTS.md 만들기 또는 열기" : "Create or open the AGENTS.md project instruction file"}
        >
          <FileText size={15} aria-hidden="true" />
          <span>AGENTS</span>
        </button>
        <button
          type="button"
          className="primary"
          onClick={onOpenSearchAgent}
          disabled={!runtimeAvailable || running}
          aria-label={firstRunActionLabel}
          title={firstRunActionLabel}
        >
          <Search size={15} aria-hidden="true" />
          <span>{ko ? "시작" : "Start"}</span>
        </button>
        <button
          type="button"
          onClick={onOpenTerminal}
          aria-label={ko ? "터미널 열기" : "Open terminal"}
          title={ko ? "하단 터미널 열기" : "Open the bottom terminal"}
        >
          <SquareTerminal size={15} aria-hidden="true" />
          <span>{ko ? "터미널" : "Terminal"}</span>
        </button>
        <button
          type="button"
          onClick={onRefreshTaskRuns}
          disabled={!runtimeAvailable}
          aria-label={ko ? "실행 기록 새로고침" : "Refresh task runs"}
          title={ko ? "에이전트 실행 기록 새로고침" : "Refresh agent task-run records"}
        >
          <History size={15} aria-hidden="true" />
          <span>{ko ? "기록" : "Runs"}</span>
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
      value: agentsInstructionReady ? (ko ? "AGENTS 준비됨" : "AGENTS ready") : ko ? "AGENTS 필요" : "AGENTS needed",
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
