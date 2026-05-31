# 계획 히스토리 - Project Boundary Policy

## 초기 요청

> 난 이런 모든 세팅 이 강력한 환경을 만든 후에는 직접 프로젝트를 생성해서 그 프로젝트에 해당하는건 그 프로젝트에만 넣어서 하는거야. 이건 모두에게 공통으로 적용되고 공통 툴이 생기지만 나중에 또 다른 관심사가 여러개가 생길거고 다양한 주제로 프로젝트를 진행할 것이기 때문에 그걸 관리할 수 있는 룰도 당연히 정해둬야해

## 계획 목적

공통 운영 환경과 개별 프로젝트를 분리해서, 여러 관심사와 프로젝트가 늘어나도 파일 소유권과 공통 자산 승격 기준이 흐려지지 않게 한다.

## 검색 질문

- 현재 저장소에는 루트 프로젝트와 공통 운영 폴더를 구분하는 규칙이 충분한가?
- 새 관심사가 생길 때 기존 프로젝트에 넣을지 새 프로젝트로 만들지 판단하는 기준은 무엇인가?
- 공통 도구와 프로젝트 전용 도구를 어떻게 구분할 것인가?
- 프로젝트 상태와 경계는 어디에서 한눈에 볼 수 있어야 하는가?

## 검색 채널

- 저장소 검색
- 운영 문서 검색
- 템플릿 검색
- 히스토리 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Repository instructions | `AGENTS.md` | 기존 루트 프로젝트/공통 폴더 규칙 확인 |
| Workspace README | `README.md` | 프로젝트 폴더 규칙과 예약 폴더 확인 |
| Workspace rules | `_docs/workspace-rules.md` | 프로젝트 README, commit, history 정책 확인 |
| Capability governance | `_docs/capability-governance.md` | 공통 도구와 프로젝트 도구 구분 확인 |
| Project template | `_templates/project/README.md` | 새 프로젝트 기본 문서에 경계 섹션 추가 위치 확인 |
| Create project prompt | `_ops/prompts/20-create-project.md` | 새 프로젝트 생성 시 등록부 업데이트를 넣을 위치 확인 |

## 지식 베이스 검증

- 내부 운영 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증했다.
- 검증 입력 대상: `AGENTS.md`, `README.md`, `_docs/workspace-rules.md`, `_docs/capability-governance.md`, `_templates/project/README.md`, `_ops/prompts/20-create-project.md`
- 결과: `ready_to_reference`
- 반대 신호: 없음

## 도출한 인사이트

- 루트 프로젝트는 관심사와 라이프사이클의 경계다.
- 공통 환경은 모든 프로젝트를 지원하지만 프로젝트 전용 파일을 흡수하면 안 된다.
- 공통 도구는 프로젝트에서 시작할 수 있지만, 여러 프로젝트에서 재사용될 때만 `_tools/`로 승격해야 한다.
- 앞으로 프로젝트가 늘어나면 폴더만으로는 상태를 추적하기 어렵기 때문에 `_ops/projects/registry.json`이 필요하다.

## 계획 단계

1. 프로젝트 경계 정책 문서를 한국어/영어로 추가한다.
2. `_ops/projects/` 등록부와 인덱스를 만든다.
3. 프로젝트 경계 판단 프롬프트와 워크플로를 추가한다.
4. 새 프로젝트 생성 프롬프트와 시작/종료 워크플로에 경계 확인 단계를 연결한다.
5. 일반/Python 프로젝트 템플릿에 scope boundary 섹션을 추가한다.
6. README, AGENTS, persistent instructions, workspace rules, platform operating model, philosophy 문서에 프로젝트 경계 원칙을 반영한다.
7. 이번 계획과 평가를 저장하고, 맵/테스트/평가를 통과한 뒤 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 모든 프로젝트를 `_projects/` 아래에 중첩하는 구조는 보류했다. 기존 규칙이 루트 `kebab-case` 프로젝트를 전제로 하며, 루트에서 바로 보는 편이 현재 작업 흐름에 맞다.
- 프로젝트 등록부 생성 도구는 보류했다. 우선 JSON과 Markdown 인덱스로 규칙을 안정화한 뒤, 프로젝트 수가 늘어나면 자동 생성 도구를 만든다.

## 위험과 불확실성

- 등록부를 수동으로 관리하면 누락될 수 있다. 새 프로젝트 생성 프롬프트와 종료 워크플로에 등록 확인을 넣어 완화한다.
- 너무 이른 공통 승격은 공통 폴더를 오염시킬 수 있다. 프로젝트 내부에서 시작하고 재사용성이 확인될 때 승격한다.

## 검증 방법

- `knowledge-skeptic-agent` 내부 문서 검증
- workspace index/task board check
- `agent-platform` 테스트
- 템플릿 테스트
- work evaluator
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | `_ops/projects/` 등록부를 추가하기로 결정 | 여러 관심사와 프로젝트 상태를 한 곳에서 추적하기 위함 |
| 2026-05-31 | 공통 승격 기준을 프로젝트 경계 정책과 capability governance에 함께 반영하기로 결정 | 공통 도구가 생기더라도 프로젝트 전용 파일과 섞이지 않게 하기 위함 |
| 2026-05-31 | 내부 지식 검증 결과를 계획 파일에 반영 | 프로젝트 경계 규칙의 근거가 된 저장소 문서를 추적하기 위함 |
