"use client";

import { ArrowRight, Bot, CheckCircle2, FolderGit2, GitBranch, Layers, SquareTerminal } from "lucide-react";

import type { WorkspaceProductSplit } from "@/lib/snapshot";
import type { SectionId, UiLanguage } from "@/types/desktop";

export type WorkspaceProductSplitPanelProps = {
  productSplit?: WorkspaceProductSplit;
  language: UiLanguage;
  onOpenSection: (section: SectionId) => void;
  activeWorkspaceLabel: string;
  activeWorkCount: number;
  reportCount: number;
};

const fallbackProductSplit: WorkspaceProductSplit = {
  sourcePath: "",
  productBoundary: {
    desktopTracker: {
      id: "workspace_tracker",
      home: "platform-desktop-app/",
      primaryClaim: "Import Git workspaces, launch guest AI coding tools, and review current work, evidence, validation, reports, and terminal state.",
      primarySections: ["overview", "source", "desktop", "eval", "projects", "history", "documents", "requirements"],
      notOwned: ["agent factory", "tool studio", "Ollama model management", "direct provider agent execution"]
    },
    agentToolPlatform: {
      id: "agent_tool_operations",
      home: "agent-platform/",
      primaryClaim: "Build and operate reusable agents, tools, provider connectors, model runtimes, skills, and workflows.",
      desktopRelationship: "advanced_operator_link_only"
    }
  },
  workspaceModel: {
    defaultUnit: "git_repository",
    rootCollectionPolicy: "A desktop collection can remember many Git repositories, but each durable project remains its own Git repository.",
    importModes: [
      { id: "open_existing_git_repo", label: "Open existing Git repository", default: true },
      { id: "clone_remote_repo", label: "Clone remote repository", default: false },
      { id: "create_new_repo", label: "Create new Git repository", default: false }
    ],
    trackedOutputs: ["current_task_summary", "plan", "task_sequence", "evidence_documents", "validation_report", "terminal_session_state", "git_status"]
  },
  guestAiSurfaces: [
    { id: "codex", label: "Codex", adapterRole: "terminal_or_cli_guest" },
    { id: "claude_code", label: "Claude Code", adapterRole: "terminal_or_cli_guest" },
    { id: "cursor", label: "Cursor", adapterRole: "external_editor_guest" },
    { id: "antigravity", label: "Antigravity", adapterRole: "external_agentic_ide_guest" }
  ],
  separatedPlatforms: [
    { capabilityId: "agent_factory", label: "Agent factory and subagent management", targetHome: "agent-platform/", desktopVisibility: "advanced_operator_only" },
    { capabilityId: "tool_studio", label: "Tool builder, registry, Python venv, and deployment workflow", targetHome: "agent-platform/", desktopVisibility: "advanced_operator_only" }
  ],
  uiPolicy: {
    homePriority: ["workspace_import", "current_work_timeline", "terminal_cli_run", "evidence_and_reports", "git_project_boundaries"],
    deemphasizedSections: ["agents", "tools", "provider_direct_run", "ollama_management"],
    primaryNavigationSections: ["overview", "source", "desktop", "eval", "projects", "history", "documents", "requirements"],
    advancedOperatorSections: ["agents", "tools", "intent", "structure"],
    homeCopyRule: "Home copy talks about Git workspaces, current work, task reports, evidence, terminal runs, and guest AI coding tools.",
    configurationRule: "Customization, direct model execution, Ollama, agent factory, and tool builder controls are not the default first-screen path."
  },
  validationGates: []
};

export function WorkspaceProductSplitPanel({
  activeWorkCount,
  activeWorkspaceLabel,
  language,
  onOpenSection,
  productSplit,
  reportCount
}: WorkspaceProductSplitPanelProps) {
  const split = productSplit || fallbackProductSplit;
  const ko = language === "ko";
  const desktopClaim = split.productBoundary.desktopTracker.primaryClaim;
  const separatedCount = split.separatedPlatforms.length;
  const guestTools = split.guestAiSurfaces.slice(0, 5);
  const importModes = split.workspaceModel.importModes.slice(0, 3);
  const trackedOutputs = split.workspaceModel.trackedOutputs.slice(0, 8);

  return (
    <section className="workspace-product-split-panel" data-product-split-panel aria-label={ko ? "작업공간 제품 경계" : "Workspace product boundary"}>
      <div className="workspace-product-split-hero">
        <div>
          <p className="eyebrow">{ko ? "제품 경계" : "Product Boundary"}</p>
          <h2>{ko ? "여러 Git 작업공간을 가져와 AI 도구로 작업하고 보고서를 봅니다" : "Import Git workspaces, use AI tools, and review reports"}</h2>
          <p>{desktopClaim}</p>
        </div>
        <button type="button" onClick={() => onOpenSection("source")} data-product-split-primary-action="import-workspace">
          <FolderGit2 size={18} aria-hidden="true" />
          <span>{ko ? "Git 작업공간 가져오기" : "Import Git Workspace"}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="workspace-product-split-grid">
        <article className="workspace-product-split-card primary">
          <header>
            <FolderGit2 size={18} aria-hidden="true" />
            <span>{ko ? "기본 단위" : "Default Unit"}</span>
          </header>
          <strong>{split.workspaceModel.defaultUnit.replace(/_/g, " ")}</strong>
          <p>{split.workspaceModel.rootCollectionPolicy}</p>
          <div className="workspace-product-chip-row">
            {importModes.map((mode) => (
              <button key={mode.id} type="button" onClick={() => onOpenSection("source")} data-workspace-import-mode={mode.id}>
                {mode.default && <CheckCircle2 size={13} aria-hidden="true" />}
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="workspace-product-split-card">
          <header>
            <SquareTerminal size={18} aria-hidden="true" />
            <span>{ko ? "게스트 AI 도구" : "Guest AI Tools"}</span>
          </header>
          <strong>{guestTools.length.toLocaleString("ko-KR")}</strong>
          <p>{ko ? "Codex, Claude Code, Cursor, Antigravity 같은 도구는 선택한 Git 작업공간 위에서 교체 가능한 실행 표면입니다." : "AI coding tools remain replaceable guest surfaces over the selected Git workspace."}</p>
          <div className="workspace-product-chip-row compact">
            {guestTools.map((tool) => (
              <button key={tool.id} type="button" onClick={() => onOpenSection(tool.adapterRole.includes("terminal") ? "desktop" : "source")} data-guest-ai-tool={tool.id}>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="workspace-product-split-card">
          <header>
            <Bot size={18} aria-hidden="true" />
            <span>{ko ? "분리된 플랫폼" : "Separated Platform"}</span>
          </header>
          <strong>{separatedCount.toLocaleString("ko-KR")}</strong>
          <p>{split.productBoundary.agentToolPlatform.primaryClaim}</p>
          <button type="button" onClick={() => onOpenSection("agents")} data-product-split-secondary-action="open-agent-platform">
            <Layers size={15} aria-hidden="true" />
            <span>{ko ? "고급 운영 영역" : "Advanced Operations"}</span>
          </button>
        </article>

        <article className="workspace-product-split-card status">
          <header>
            <GitBranch size={18} aria-hidden="true" />
            <span>{ko ? "현재 작업 추적" : "Current Work Tracking"}</span>
          </header>
          <strong>{activeWorkspaceLabel}</strong>
          <p>
            {ko
              ? `${activeWorkCount.toLocaleString("ko-KR")}개 진행 신호와 ${reportCount.toLocaleString("ko-KR")}개 보고/근거 기록을 작업 순서로 확인합니다.`
              : `${activeWorkCount.toLocaleString("en-US")} active signals and ${reportCount.toLocaleString("en-US")} report/evidence records are shown in work order.`}
          </p>
          <div className="workspace-product-chip-row compact">
            {trackedOutputs.map((output) => (
              <span key={output}>{output.replace(/_/g, " ")}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
