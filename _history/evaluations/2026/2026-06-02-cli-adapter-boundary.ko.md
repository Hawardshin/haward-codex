# 작업 평가: CLI 어댑터 경계

## 초기 요청

설치형 플랫폼이지만 다양한 CLI를 사용할 수 있고, 특정 CLI에 종속되지 않도록 이 위에서 CLI를 이용하는 방식으로 동작해야 한다는 요청.

## 결과

- `REQ-WS-053`으로 설치형 플랫폼의 CLI-neutral 원칙을 요구사항 기준선에 추가했다.
- `agent-platform/configs/integrations/cli-adapter-registry.json`을 추가해 외부 CLI를 optional adapter capability로 정의했다.
- `_docs/policies/cli-adapter-policy.ko.md`, `_ops/workflows/66-cli-adapter-integration.md`, `_ops/prompts/97-cli-adapter-integration.md`를 추가했다.
- desktop productization 문서와 설정에 “특정 CLI wrapper가 아니라 adapter layer 위에서 CLI를 사용한다”는 경계를 반영했다.
- persistent instructions, memory bootstrap, 운영 인덱스, router, history, request trace, work summary, timing record, monitor snapshot에 연결했다.

## 근거와 검증

- 웹 검색/근거 기록: `_history/web-searches/2026/2026-06-02-cli-adapter-boundary.ko.md`
- 조사 노트: `_research/topics/runtime-language/2026-06-02-cli-adapter-boundary.ko.md`
- grounding: `_history/evaluations/2026/2026-06-02-cli-adapter-boundary-grounding.json`
- evaluator input: `_history/evaluations/2026/2026-06-02-cli-adapter-boundary-evaluation-input.json`
- grounding 결과: `ready_to_publish`, `requires_rework=false`
- evaluator 결과: `ready_to_close`, `requires_rework=false`

## 실행한 검증

- JSON 형식 검증 통과.
- self-documenting config contract 통과.
- memory bootstrap check 통과.
- docs/naming/structure audit 통과. 기존 `presentation-agent` 생성 폴더 경고는 비차단이다.
- workspace index, task board, workspace-monitor snapshot 재생성 및 확인 통과.
- work timing check와 `git diff --check` 통과.

## 남은 개선 후보

- 실제 CLI adapter를 구현할 때 availability, version, permission, timeout, output shape, missing-CLI fallback smoke test를 추가한다.
- 실제 adapter가 생기면 workspace-monitor에 adapter availability와 `capability_missing` 상태를 표시한다.
