import {
  defaultSearchAgentRunForm,
  renderSearchAgentPrompt
} from "@/components/features/SearchAgentWorkChatPanel";
import type {
  CliTaskPipelinePresetReport,
  RuntimeInitDefaults,
  SessionModePreset,
  UiLanguage
} from "@/types/desktop";

export const sessionModePresets: SessionModePreset[] = [
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

export const fallbackTaskPipePresets: CliTaskPipelinePresetReport[] = [
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

export function renderTaskPipePresetPrompt(preset: CliTaskPipelinePresetReport, language: UiLanguage) {
  return language === "ko"
    ? `${preset.label} 기준으로 작업을 분해하고 ${preset.laneCount}개 실행 경로를 초기화해줘. ${preset.mergeGate} 전에는 소스 영향 결정과 질문을 보류하고, 각 경로의 출력과 병합 조건을 기록해줘.`
    : `Break down the task with the ${preset.label} preset and initialize ${preset.laneCount} run lanes. Hold source-impacting decisions and questions before ${preset.mergeGate}, then record lane output and merge conditions.`;
}

export function taskPipePromptKeyForPreset(taskKind: string) {
  return `selected-preset:${taskKind}`;
}

export const defaultRuntimeInitDefaults: RuntimeInitDefaults = {
  adapterId: "codex-cli",
  sessionModeId: sessionModePresets[0].id,
  taskPipeKind: fallbackTaskPipePresets[0].taskKind,
  autoDeferQuestions: true
};
