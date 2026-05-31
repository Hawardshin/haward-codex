# 계획 히스토리 - Philosophy Folder

## 초기 요청

> 이것에서 가지고 있는 철학은 철학 폴더에 해야해.

## 계획 목적

에이전트 운영 방식에 깔린 철학을 규칙/워크플로 문서 안에만 두지 않고, 전용 `_philosophy/` 폴더로 분리한다.

## 검색 질문

- 현재 철학적 내용은 어느 문서에 흩어져 있는가?
- `_philosophy/`와 `_docs/`, `_ops/`의 역할을 어떻게 구분할 것인가?
- 기존 정책 문서는 새 철학 문서를 어떻게 참조해야 하는가?

## 검색 채널

- 저장소 검색
- 운영 문서 검색
- 히스토리 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Workspace README | `README.md` | 운영 원칙과 예약 폴더 구조 확인 |
| Repository instructions | `AGENTS.md` | 지속 규칙과 운영 책임 확인 |
| Search insight policy | `_docs/search-insight-planning-policy.ko.md` | AI 추정, 검색, 인사이트, 계획 철학이 섞여 있는 위치 확인 |
| Knowledge validation policy | `_docs/knowledge-base-validation-policy.ko.md` | 저장된 지식도 의심한다는 철학이 섞여 있는 위치 확인 |
| Platform operating model | `_docs/platform-operating-model.md` | 철학/정책/워크플로 역할 분리 위치 확인 |
| Operations index | `_ops/index.md` | 새 폴더 탐색 경로를 연결할 위치 확인 |

## 지식 베이스 검증

- 내부 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증했다.
- 검증 입력 대상: `README.md`, `AGENTS.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/knowledge-base-validation-policy.ko.md`, `_docs/platform-operating-model.md`, `_ops/index.md`, `_history/plans/2026/2026-05-31-philosophy-folder.ko.md`
- 결과: `ready_to_reference`
- 반대 신호: 없음

## 도출한 인사이트

- 철학은 “왜 그렇게 일하는가”이고, 정책은 “무엇을 지켜야 하는가”, 워크플로는 “어떤 순서로 실행하는가”다.
- AI의 확률적 추정, 검색 기반 인사이트, 지식 베이스 회의, 계획 히스토리, 평가/재작업은 하나의 운영 철학으로 묶인다.
- 철학 문서를 별도 폴더에 두면 이후 정책과 에이전트가 같은 세계관을 참조할 수 있다.

## 계획 단계

1. `_philosophy/` 폴더를 추가한다.
2. 한국어/영어 README와 에이전트 운영 철학 문서를 만든다.
3. README, AGENTS, workspace rules, persistent instructions에 `_philosophy/`의 역할을 추가한다.
4. 검색 기반 계획 정책과 지식 검증 정책에서 철학 문서를 참조한다.
5. 운영 인덱스와 시작 워크플로에서 철학 폴더를 탐색 가능하게 한다.
6. 이번 작업의 계획/평가 히스토리를 저장한다.
7. 맵/테스트/평가를 통과한 뒤 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 철학 문서를 `_docs/` 아래에 두는 선택은 제외했다. 사용자가 명시적으로 철학 폴더를 요청했고, 철학은 실행 정책보다 상위 개념이기 때문이다.
- `philosophy/`처럼 일반 루트 폴더를 만드는 것은 보류했다. 프로젝트가 아닌 운영 폴더이므로 기존 규칙에 맞춰 `_philosophy/`를 사용한다.

## 위험과 불확실성

- 철학 문서가 정책과 중복되면 관리 비용이 늘 수 있다. 철학은 이유와 원칙만 담고, 실행 규칙은 `_docs/`와 `_ops/`에 둔다.
- 철학이 바뀌면 연결된 정책과 워크플로도 같이 업데이트해야 한다.

## 검증 방법

- `knowledge-skeptic-agent`로 내부 문서 근거 검증
- workspace index/task board check
- `agent-platform` 테스트
- 템플릿 테스트
- work evaluator
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | `_philosophy/`를 새 예약 운영 폴더로 추가하기로 결정 | 철학은 프로젝트가 아니며, 사용자 요청이 철학 폴더 분리를 요구함 |
| 2026-05-31 | 정책 문서에서 철학 문서를 링크하기로 결정 | 철학과 실행 정책의 역할을 분리하되 연결성을 유지하기 위함 |
| 2026-05-31 | 내부 지식 검증 결과를 계획 파일에 반영 | 철학 폴더 결정에 사용한 저장소 문서 근거를 추적하기 위함 |
