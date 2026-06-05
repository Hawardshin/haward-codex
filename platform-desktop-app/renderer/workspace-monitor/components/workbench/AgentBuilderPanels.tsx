"use client";

import {
  Bot,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  GitBranch,
  Layers,
  Network,
  PlayCircle
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type UiLanguage = "ko" | "en";

type ProviderCredentialReportForBuilder = {
  providers: Array<{ configured: boolean }>;
};

export type AgentBuilderFactoryForm = {
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

export type AgentBuilderCoreBlueprint = {
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

export type AgentBuilderFactoryProposalReport = {
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

export type AgentBuilderLearningImprovementCandidate = {
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

export type AgentBuilderLearningImprovementDecisionReport = {
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

type AppChoiceOption = {
  value: string;
  label: string;
  detail?: string;
};

export type AgentCoreBlueprintPanelProps = {
  blueprints: AgentBuilderCoreBlueprint[];
  selectedBlueprintId: string;
  providerCredentialReport: ProviderCredentialReportForBuilder;
  language: UiLanguage;
  onSelectBlueprint: (blueprintId: string) => void;
  onApplyBlueprint: (blueprintId: string, selectedCapabilityIds: string[]) => void;
  onStartPreflight: (blueprintId: string, selectedCapabilityIds: string[]) => void;
  onCreateProposal: (blueprintId: string, selectedCapabilityIds: string[]) => void | Promise<void>;
  proposalBusy: boolean;
  runtimeAvailable: boolean;
};

export type AgentFactoryWizardProps = {
  form: AgentBuilderFactoryForm;
  proposal: AgentBuilderFactoryProposalReport | null;
  busy: boolean;
  notice: string;
  runtimeAvailable: boolean;
  language: UiLanguage;
  onChange: (field: keyof AgentBuilderFactoryForm, value: string) => void;
  onCreateProposal: () => void | Promise<void>;
};

export type LearningFeedbackLoopPanelProps = {
  candidates: AgentBuilderLearningImprovementCandidate[];
  selectedCandidate: AgentBuilderLearningImprovementCandidate | null;
  selectedCandidateId: string;
  action: string;
  assetType: string;
  notes: string;
  report: AgentBuilderLearningImprovementDecisionReport | null;
  busy: boolean;
  notice: string;
  runtimeAvailable: boolean;
  language: UiLanguage;
  onSelectCandidate: (candidateId: string) => void;
  onActionChange: (action: string) => void;
  onAssetTypeChange: (assetType: string) => void;
  onNotesChange: (notes: string) => void;
  onRecordDecision: () => void;
};

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

const agentCoreResourceLifecycleSteps = [
  { id: "create", labelKo: "Create", labelEn: "Create" },
  { id: "configure", labelKo: "Configure", labelEn: "Configure" },
  { id: "invoke", labelKo: "Invoke", labelEn: "Invoke" },
  { id: "observe", labelKo: "Observe", labelEn: "Observe" },
  { id: "evaluate", labelKo: "Evaluate", labelEn: "Evaluate" }
];

export function AgentCoreBlueprintPanel({
  blueprints,
  selectedBlueprintId,
  providerCredentialReport,
  language,
  onSelectBlueprint,
  onApplyBlueprint,
  onStartPreflight,
  onCreateProposal,
  proposalBusy,
  runtimeAvailable
}: AgentCoreBlueprintPanelProps) {
  const ko = language === "ko";
  const selectedBlueprint = blueprints.find((blueprint) => blueprint.id === selectedBlueprintId) || blueprints[0];
  const connectedProviderCount = providerCredentialReport.providers.filter((provider) => provider.configured).length;
  const defaultCapabilityIds = useMemo(() => {
    const blueprintCapabilityIds = agentCoreCapabilityOptions
      .filter((option) => selectedBlueprint.capabilities.includes(option.id))
      .map((option) => option.id);
    return blueprintCapabilityIds.length ? blueprintCapabilityIds : ["runtime", "observability"];
  }, [selectedBlueprint]);
  const [selectedCapabilityIds, setSelectedCapabilityIds] = useState<string[]>(defaultCapabilityIds);
  const selectedCapabilityOptions = useMemo(
    () =>
      selectedCapabilityIds
        .map((capabilityId) => agentCoreCapabilityOptionById.get(capabilityId))
        .filter((item): item is AgentCoreCapabilityOption => Boolean(item)),
    [selectedCapabilityIds]
  );
  const selectedCapabilitySummary = selectedCapabilityOptions.map((item) => (ko ? item.labelKo : item.labelEn)).join(" + ");
  const selectedResourceSummary = Array.from(new Set(selectedCapabilityOptions.map((item) => (ko ? item.resourceKo : item.resourceEn)))).join(" / ");

  useEffect(() => {
    setSelectedCapabilityIds(defaultCapabilityIds);
  }, [defaultCapabilityIds]);

  const toggleCapability = (capabilityId: string) => {
    setSelectedCapabilityIds((current) => {
      if (current.includes(capabilityId)) {
        return current.length > 1 ? current.filter((item) => item !== capabilityId) : current;
      }
      return [...current, capabilityId];
    });
  };

  return (
    <section className="panel wide agentcore-blueprint-panel" data-agent-builder-panel="blueprint">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">AgentCore Quick Builder</p>
          <h2>{ko ? "Production 에이전트 블루프린트" : "Production Agent Blueprints"}</h2>
          <p>
            {ko
              ? "AWS AgentCore 샘플의 런타임, 메모리, 게이트웨이, 평가 구조를 로컬 Python 실행 중심의 데스크톱 에이전트 생성 흐름으로 바꿉니다."
              : "Translates AWS AgentCore sample runtime, memory, gateway, and evaluation patterns into a desktop agent creation flow centered on local Python execution."}
          </p>
        </div>
        <a href={selectedBlueprint.sourceUrl} target="_blank" rel="noreferrer" className="panel-link-button">
          <ExternalLink size={15} aria-hidden="true" />
          <span>{ko ? "원본 보기" : "Open Source"}</span>
        </a>
      </div>

      <div className="agentcore-builder-steps" aria-label={ko ? "AgentCore 빠른 생성 단계" : "AgentCore quick builder steps"}>
        <span>
          <CheckCircle2 size={14} aria-hidden="true" />
          {ko ? "1 목적 선택" : "1 Choose purpose"}
        </span>
        <span>
          <Layers size={14} aria-hidden="true" />
          {ko ? "2 능력 추가" : "2 Add capabilities"}
        </span>
        <span>
          <Bot size={14} aria-hidden="true" />
          {ko ? "3 제안 생성" : "3 Create proposal"}
        </span>
        <span>
          <ClipboardCheck size={14} aria-hidden="true" />
          {ko ? "4 검증 준비" : "4 Prepare validation"}
        </span>
      </div>

      <div className="agentcore-blueprint-layout">
        <div className="agentcore-blueprint-list" role="tablist" aria-label={ko ? "AgentCore 블루프린트" : "AgentCore blueprints"}>
          {blueprints.map((blueprint) => (
            <button
              key={blueprint.id}
              type="button"
              className={blueprint.id === selectedBlueprint.id ? "active" : ""}
              onClick={() => onSelectBlueprint(blueprint.id)}
            >
              <strong>{blueprint.label}</strong>
              <span>{ko ? blueprint.primaryUseKo : blueprint.primaryUseEn}</span>
            </button>
          ))}
        </div>

        <article className="agentcore-blueprint-detail">
          <header>
            <div>
              <span>{selectedBlueprint.sourceLabel}</span>
              <h3>{selectedBlueprint.label}</h3>
            </div>
            <strong>{connectedProviderCount > 0 ? (ko ? "직접 실행 가능" : "Direct run ready") : ko ? "계정 연결 필요" : "Account needed"}</strong>
          </header>
          <p>{ko ? selectedBlueprint.summaryKo : selectedBlueprint.summaryEn}</p>

          <section className="agentcore-capability-bundle" aria-label={ko ? "AgentCore 능력 묶음" : "AgentCore capability bundle"}>
            <header>
              <div>
                <span>{ko ? "동시 능력 묶음" : "Capability Bundle"}</span>
                <strong>
                  {selectedCapabilityIds.length.toLocaleString("ko-KR")} / {agentCoreCapabilityOptions.length.toLocaleString("ko-KR")}
                </strong>
                <small>{selectedCapabilitySummary}</small>
              </div>
              <button type="button" onClick={() => setSelectedCapabilityIds(agentCoreCapabilityOptions.map((option) => option.id))} data-agentcore-select-all>
                <Layers size={15} aria-hidden="true" />
                <span>{ko ? "전체 선택" : "Select all"}</span>
              </button>
            </header>
            <div className="agentcore-capability-grid">
              {agentCoreCapabilityOptions.map((option) => {
                const selected = selectedCapabilityIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={selected ? "active" : ""}
                    onClick={() => toggleCapability(option.id)}
                    aria-pressed={selected}
                    data-agentcore-capability={option.id}
                  >
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>
                      <strong>{ko ? option.labelKo : option.labelEn}</strong>
                      <small>{ko ? option.detailKo : option.detailEn}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="agentcore-resource-topology" aria-label={ko ? "AgentCore 리소스 토폴로지" : "AgentCore resource topology"}>
            <header>
              <div>
                <span>{ko ? "AgentCore식 리소스 연결" : "AgentCore-style resource wiring"}</span>
                <strong>{selectedResourceSummary}</strong>
                <small>
                  {ko
                    ? "선택한 능력을 런타임, 메모리, 게이트웨이, 기본 제공 도구, 계정/권한, 정책, 관측, 평가 흐름으로 배치합니다."
                    : "Maps the selected capabilities into Runtime, Memory, Gateway, Built-in Tools, Identity, Policy, Observability, and Evaluations lanes."}
                </small>
              </div>
              <Network size={17} aria-hidden="true" />
            </header>
            <div className="agentcore-resource-lifecycle" aria-label={ko ? "AgentCore 리소스 생명주기" : "AgentCore resource lifecycle"}>
              {agentCoreResourceLifecycleSteps.map((step) => (
                <span key={step.id}>{ko ? step.labelKo : step.labelEn}</span>
              ))}
            </div>
            <div className="agentcore-resource-grid">
              {selectedCapabilityOptions.map((option) => (
                <article key={option.id} data-agentcore-resource={option.id}>
                  <span>{ko ? option.resourceKo : option.resourceEn}</span>
                  <strong>{ko ? option.labelKo : option.labelEn}</strong>
                  <small>{option.localCapability}</small>
                  <em>{ko ? option.lifecycleKo : option.lifecycleEn}</em>
                </article>
              ))}
            </div>
          </section>

          <div className="agentcore-blueprint-matrix">
            <div>
              <span>{ko ? "라이프사이클" : "Lifecycle"}</span>
              <ol>
                {selectedBlueprint.lifecycle.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div>
              <span>{ko ? "능력" : "Capabilities"}</span>
              <ul>
                {selectedBlueprint.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span>{ko ? "저장 기록" : "Stored Records"}</span>
              <ul>
                {selectedBlueprint.outputRecords.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span>{ko ? "게이트" : "Gates"}</span>
              <ul>
                {selectedBlueprint.safetyGates.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="agentcore-blueprint-actions">
            <button
              type="button"
              className="primary-action-button"
              onClick={() => onCreateProposal(selectedBlueprint.id, selectedCapabilityIds)}
              disabled={!runtimeAvailable || proposalBusy}
            >
              <PlayCircle size={16} aria-hidden="true" />
              <span>{proposalBusy ? (ko ? "제안 저장 중" : "Saving proposal") : ko ? "바로 에이전트 제안 생성" : "Create Agent Proposal"}</span>
            </button>
            <button type="button" className="primary-action-button" onClick={() => onApplyBlueprint(selectedBlueprint.id, selectedCapabilityIds)}>
              <Bot size={16} aria-hidden="true" />
              <span>{ko ? "에이전트 생성 입력 채우기" : "Fill With Bundle"}</span>
            </button>
            <button type="button" onClick={() => onStartPreflight(selectedBlueprint.id, selectedCapabilityIds)}>
              <ClipboardCheck size={16} aria-hidden="true" />
              <span>{ko ? "배포 사전점검 작업 만들기" : "Create Deployment Preflight"}</span>
            </button>
          </div>

          <div className={`agentcore-builder-status ${runtimeAvailable ? "ready" : "preview"}`}>
            <strong>{runtimeAvailable ? (ko ? "native 저장 준비됨" : "Native save ready") : ko ? "브라우저 미리보기" : "Browser preview"}</strong>
            <span>
              {runtimeAvailable
                ? ko
                  ? "선택한 블루프린트는 에이전트 제안 기록으로 저장되고, 이후 설정/검증/실행 단계에서 다시 열 수 있습니다."
                  : "The selected blueprint is saved as an agent proposal record and can be reopened for setup, validation, and execution."
                : ko
                  ? "설치 앱에서는 같은 버튼이 에이전트 제안 생성 작업을 호출해 앱 데이터 저장소에 바로 기록합니다."
                  : "In the installed app, the same button calls create_agent_factory_proposal and writes to app data."}
            </span>
          </div>

          <div className="agentcore-blueprint-contract">
            <span>Local Python runtime / Apache-2.0 / optional AWS adapter</span>
            <small>
              {ko
                ? "원본 코드를 제품에 복사하지 않고 구조만 이전합니다. 실제 에이전트와 Python 실행은 로컬 런타임이 맡고, AgentCore CLI와 AWS 자격증명은 선택형 배포/도구 어댑터입니다."
                : "The app transfers structure without copying source code. Actual agent and Python execution belong to the local runtime; AgentCore CLI and AWS credentials stay optional deployment/tool adapters."}
            </small>
          </div>
        </article>
      </div>
    </section>
  );
}

export function AgentFactoryWizard({
  form,
  proposal,
  busy,
  notice,
  runtimeAvailable,
  language,
  onChange,
  onCreateProposal
}: AgentFactoryWizardProps) {
  const ko = language === "ko";
  return (
    <section className="panel wide agent-factory-wizard-panel" data-agent-builder-panel="factory">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{ko ? "Agent Core" : "Agent Core"}</p>
          <h2>{ko ? "새 에이전트 만들기" : "Create an Agent"}</h2>
          <p>
            {ko
              ? "목표, 역할, 도구, 안전장치, 검증 기준을 입력하면 앱 데이터 저장소에 에이전트 제안을 남깁니다."
              : "Enter goal, role, tools, guardrails, and validation to write an agent proposal into app data."}
          </p>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onCreateProposal} disabled={!runtimeAvailable || busy}>
            <Bot size={16} aria-hidden="true" />
            <span>{busy ? (ko ? "저장 중" : "Saving") : ko ? "Agent proposal 저장" : "Save proposal"}</span>
          </button>
        </div>
      </div>

      <div className="agent-factory-layout">
        <div className="agent-factory-form" aria-label={ko ? "에이전트 생성 입력" : "Agent factory input"}>
          <label>
            <span>{ko ? "Agent ID" : "Agent ID"}</span>
            <input value={form.agentId} onChange={(event) => onChange("agentId", event.target.value)} />
          </label>
          <label>
            <span>{ko ? "이름" : "Label"}</span>
            <input value={form.label} onChange={(event) => onChange("label", event.target.value)} />
          </label>
          <label className="wide-field">
            <span>{ko ? "목표" : "Goal"}</span>
            <textarea value={form.goal} onChange={(event) => onChange("goal", event.target.value)} rows={3} />
          </label>
          <label className="wide-field">
            <span>{ko ? "역할" : "Role"}</span>
            <textarea value={form.role} onChange={(event) => onChange("role", event.target.value)} rows={2} />
          </label>
          <label>
            <span>{ko ? "도구/입력" : "Tools / Inputs"}</span>
            <textarea value={form.tools} onChange={(event) => onChange("tools", event.target.value)} rows={5} />
          </label>
          <label>
            <span>{ko ? "가드레일" : "Guardrails"}</span>
            <textarea value={form.guardrails} onChange={(event) => onChange("guardrails", event.target.value)} rows={5} />
          </label>
          <label>
            <span>{ko ? "검증 명령" : "Validation Commands"}</span>
            <textarea value={form.validationCommands} onChange={(event) => onChange("validationCommands", event.target.value)} rows={5} />
          </label>
          <label>
            <span>{ko ? "출력 계약" : "Output Contract"}</span>
            <textarea value={form.outputContract} onChange={(event) => onChange("outputContract", event.target.value)} rows={5} />
          </label>
          <label>
            <span>{ko ? "소유 프로젝트" : "Owner Project"}</span>
            <input value={form.ownerProject} onChange={(event) => onChange("ownerProject", event.target.value)} />
          </label>
          <label>
            <span>{ko ? "대상 경로" : "Target Path"}</span>
            <input value={form.targetPath} onChange={(event) => onChange("targetPath", event.target.value)} />
          </label>
          <label className="wide-field">
            <span>{ko ? "Rollback" : "Rollback"}</span>
            <textarea value={form.rollbackPlan} onChange={(event) => onChange("rollbackPlan", event.target.value)} rows={2} />
          </label>
        </div>

        <article className="agent-proposal-preview">
          <header>
            <div>
              <span>{proposal?.status || (runtimeAvailable ? "ready" : "runtime missing")}</span>
              <h3>{proposal?.label || form.label}</h3>
            </div>
            <strong>{proposal?.agentId || form.agentId}</strong>
          </header>
          <div className="agent-proposal-meta">
            <span>agent_factory_proposals</span>
            <span>{proposal?.targetPath || form.targetPath}</span>
            <span>{proposal?.validationCommand || linesFromText(form.validationCommands)[0] || "validation pending"}</span>
            <span>{proposal?.rollbackPlan || form.rollbackPlan}</span>
          </div>
          {notice && <p className="decision-resume-notice">{notice}</p>}
          <pre tabIndex={0} aria-label={ko ? "Agent proposal JSON preview" : "Agent proposal JSON preview"}>
            <code>{JSON.stringify(proposal?.spec || agentFactoryPreviewSpec(form), null, 2)}</code>
          </pre>
        </article>
      </div>
    </section>
  );
}

export function LearningFeedbackLoopPanel({
  candidates,
  selectedCandidate,
  selectedCandidateId,
  action,
  assetType,
  notes,
  report,
  busy,
  notice,
  runtimeAvailable,
  language,
  onSelectCandidate,
  onActionChange,
  onAssetTypeChange,
  onNotesChange,
  onRecordDecision
}: LearningFeedbackLoopPanelProps) {
  const ko = language === "ko";
  const learningActionOptions: AppChoiceOption[] = [
    { value: "promote", label: ko ? "승격" : "Promote", detail: ko ? "자산으로 만들기" : "Create asset" },
    { value: "approve", label: ko ? "승인" : "Approve", detail: ko ? "진행 허용" : "Allow work" },
    { value: "defer", label: ko ? "보류" : "Defer", detail: ko ? "나중에 검토" : "Review later" },
    { value: "reject", label: ko ? "거절" : "Reject", detail: ko ? "후보 제외" : "Drop candidate" }
  ];
  const learningAssetTypeOptions: AppChoiceOption[] = [
    { value: "prompt", label: "prompt" },
    { value: "workflow", label: "workflow" },
    { value: "template", label: "template" },
    { value: "tool", label: "tool" },
    { value: "skill", label: "skill" },
    { value: "agent", label: "agent" },
    { value: "project_feature", label: "project feature" }
  ];

  return (
    <section className="panel wide learning-feedback-panel" data-agent-builder-panel="learning">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{ko ? "Learning Loop" : "Learning Loop"}</p>
          <h2>{ko ? "누적 근거에서 개선 후보 만들기" : "Create Improvement Candidates from Evidence"}</h2>
          <p>
            {ko
              ? "평가, 작업 요약, 요청 추적, 차단 요소, 의도 지도를 후보로 묶고 승인/보류/거절/승격 기록을 앱 데이터에 저장합니다."
              : "Group evaluations, summaries, traces, blockers, and intent maps into decisions stored in app data."}
          </p>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onRecordDecision} disabled={!runtimeAvailable || busy || !selectedCandidate}>
            <GitBranch size={16} aria-hidden="true" />
            <span>{busy ? (ko ? "기록 중" : "Recording") : ko ? "Decision 저장" : "Save decision"}</span>
          </button>
        </div>
      </div>

      <div className="learning-feedback-layout">
        <div className="learning-candidate-list" aria-label={ko ? "개선 후보 목록" : "Improvement candidates"}>
          {candidates.length ? (
            candidates.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                className={selectedCandidateId === candidate.id ? "active" : ""}
                onClick={() => onSelectCandidate(candidate.id)}
              >
                <span>{candidate.source}</span>
                <strong>{candidate.label}</strong>
                <small>{candidate.impact}</small>
              </button>
            ))
          ) : (
            <p className="empty-state">{ko ? "아직 개선 후보가 없습니다." : "No improvement candidates yet."}</p>
          )}
        </div>

        <article className="learning-decision-editor">
          {selectedCandidate ? (
            <>
              <header>
                <div>
                  <span>{selectedCandidate.source}</span>
                  <h3>{selectedCandidate.label}</h3>
                </div>
                <strong>{selectedCandidate.assetType}</strong>
              </header>
              <p>{selectedCandidate.impact}</p>
              <div className="learning-evidence-list">
                {selectedCandidate.evidence.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="learning-decision-controls">
                <div className="learning-choice-field">
                  <span>{ko ? "처리" : "Action"}</span>
                  <AppChoiceButtonGroup
                    className="learning-action-choice-grid"
                    density="compact"
                    label={ko ? "처리 선택" : "Action choices"}
                    value={action}
                    options={learningActionOptions}
                    onChange={onActionChange}
                  />
                </div>
                <div className="learning-choice-field">
                  <span>{ko ? "자산 유형" : "Asset Type"}</span>
                  <AppChoiceButtonGroup
                    className="learning-asset-choice-grid"
                    density="compact"
                    label={ko ? "자산 유형 선택" : "Asset type choices"}
                    value={assetType}
                    options={learningAssetTypeOptions}
                    onChange={onAssetTypeChange}
                  />
                </div>
                <label className="wide-field">
                  <span>{ko ? "메모" : "Notes"}</span>
                  <textarea value={notes} onChange={(event) => onNotesChange(event.target.value)} rows={3} />
                </label>
              </div>
              <dl className="learning-decision-contract">
                <dt>{ko ? "저장소" : "Store"}</dt>
                <dd>learning_feedback_decisions</dd>
                <dt>{ko ? "대상 경로" : "Target"}</dt>
                <dd>{selectedCandidate.targetPath}</dd>
                <dt>{ko ? "검증" : "Validation"}</dt>
                <dd>{selectedCandidate.validationCommand}</dd>
                <dt>Rollback</dt>
                <dd>{selectedCandidate.rollbackPlan}</dd>
              </dl>
              {notice && <p className="decision-resume-notice">{notice}</p>}
              {report && (
                <pre tabIndex={0} aria-label="Learning decision JSON">
                  <code>{JSON.stringify(report.record, null, 2)}</code>
                </pre>
              )}
            </>
          ) : (
            <p className="empty-state">{ko ? "선택된 개선 후보가 없습니다." : "No selected candidate."}</p>
          )}
        </article>
      </div>
    </section>
  );
}

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

function linesFromText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function agentFactoryPreviewSpec(form: AgentBuilderFactoryForm) {
  return {
    schemaVersion: "agent-factory-proposal.v1",
    agentId: form.agentId,
    label: form.label,
    goal: form.goal,
    role: form.role,
    ownerProject: form.ownerProject,
    targetPath: form.targetPath,
    tools: linesFromText(form.tools),
    guardrails: linesFromText(form.guardrails),
    outputContract: form.outputContract,
    validation: {
      commands: linesFromText(form.validationCommands),
      rollbackPlan: form.rollbackPlan
    }
  };
}
