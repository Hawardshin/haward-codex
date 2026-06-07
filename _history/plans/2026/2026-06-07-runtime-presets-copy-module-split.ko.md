# 구현 계획

- 날짜: 2026-06-07
- 목표: `MonitorShell`의 런타임 기본 문구와 세션/task-pipe 프리셋을 독립 모듈로 분리한다.

## 단계

1. `nativeWorkspaceCopy`, `sessionModePresets`, `fallbackTaskPipePresets`, `renderTaskPipePresetPrompt`, `taskPipePromptKeyForPreset`, `defaultRuntimeInitDefaults` 사용 위치 확인.
2. `runtimeWorkspaceCopy.ts`와 `runtimeSessionPresets.ts` 추가.
3. `MonitorShell`에서 로컬 정의를 제거하고 import로 대체.
4. readiness source map과 구조 테스트 갱신.
5. TypeScript, 관련 테스트, 전체 check/test/package 검증.

## 결정

- preferences normalization은 `sectionIds`와 shell state에 묶여 있어 이번 범위에서 이동하지 않았다.
- 세션 프리셋은 검색 에이전트 기본 프롬프트를 그대로 재사용하므로 `SearchAgentWorkChatPanel`의 prompt helper를 import한다.

