# Spec: Core Feature Connections

날짜: 2026-06-07

## 목적

Workspace Monitor 홈의 주요 기능을 실제 작업면과 하위 흐름에 직접 연결한다. 사용자는 "에이전트", "툴", "실행", "평가", "파일", "가시성"을 눌렀을 때 별도 탐색 없이 해당 기능의 세부 단계로 들어가야 한다.

## 동작

1. `CoreFeatureDrilldownItem`은 선택적 `connections` 배열을 가진다.
2. 각 connection은 `id`, `label`, `detail`, `run`을 가진다.
3. `CoreFeatureDrilldown`은 기본 CTA 아래에 connection 버튼 grid를 렌더링한다.
4. connection 버튼은 `data-core-feature-connections`와 `data-core-feature-action` contract를 가진다.
5. `MonitorShell`은 `selectIntentStep(intentId, targetSection, flowStepId)` helper로 작업 의도와 단계를 함께 선택한다.
6. `MonitorShell`은 `selectToolStep(mode, flowStepId)` helper로 Tool Studio mode와 build-tool intent step을 함께 선택한다.
7. 홈 주요 기능은 다음 연결을 제공한다.
   - 에이전트: 역할 선택, 도구 연결, 검증 제안.
   - 툴: 소스 선택, 환경 확인, 배포 점검.
   - 실행: 실행 경로, 실행 시작, 결과 처리.
   - 평가: 현재 점수, 사용 비교, 오픈소스 후보 판단.
   - 파일: 파일 선택, 컨텍스트 확인, 실행 연결.
   - 가시성: 실행 기록, 결정함, 개선 흐름.

## 안전/UX 경계

- 연결은 기존 `openSection`과 기존 task intent state를 재사용한다.
- 새 background process나 native command는 시작하지 않는다.
- 버튼 label/detail은 한 줄 ellipsis contract를 따른다.
- 반응형 처리는 기존 홈 `max-width: 1080px` grid 규칙에 편입한다.

## 참고

- VS Code User Interface: https://code.visualstudio.com/docs/editing/userinterface
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
- Claude Code Subagents: https://code.claude.com/docs/en/subagents
