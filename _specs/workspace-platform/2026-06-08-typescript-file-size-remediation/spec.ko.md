# Spec: TypeScript file-size remediation

## 목적

남은 deferred 중 로컬에서 처리 가능한 TypeScript 구조 압력을 줄인다. 사용자는 작업을 시작할 수 있어야 하므로 기능 동작을 보존하고, 대형 파일을 읽기 쉬운 기능 단위로 분리한다.

## Coding research summary

- language_options: TypeScript/React 유지, Python generator 사용, Rust native로 이전.
- selected_language: TypeScript/React.
- language_decision_notes: 현재 UI가 React/Next 기반이고 문제도 TSX 파일 크기이므로 런타임 전환보다 모듈 경계 정리가 유지보수 비용이 낮다.
- architecture_options: 상위 component 상태 유지 + 하위 presentational/logic module 분리, 또는 전역 store로 상태 이전.
- architecture_decision_notes: React 공식 guidance와 기존 코드 구조상 상위 상태 유지가 가장 안전하다. 전역 store 도입은 새 dependency와 더 큰 리스크를 만든다.
- folder_structure_options: feature별 하위 폴더(`search-agent/`, `provider-accounts/`) 또는 공통 `shared/` 폴더.
- folder_structure_decision_notes: 검색 에이전트와 provider 계정은 도메인별 의미가 뚜렷하므로 feature별 하위 폴더를 우선한다.

## Acceptance

- `SearchAgentWorkChatPanel.tsx`는 500줄 이하로 줄인다.
- 분리된 module은 500줄 이하를 유지한다.
- UI copy, prompt rendering, model routing, choice button UI는 독립 파일에서 테스트 가능한 형태로 노출한다.
- 기존 public exports는 깨지지 않는다.
