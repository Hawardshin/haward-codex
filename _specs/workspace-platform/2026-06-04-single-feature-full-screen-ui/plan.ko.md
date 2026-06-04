# 계획: 단일 주 기능 화면 공간 원칙

## 작업 모드

- selected work_mode: governance
- 이유: 사용자 지시가 앞으로 UI 설계에 반복 적용되어야 하는 durable rule이며 persistent instructions, policy, runtime adapter, memory bootstrap manifest를 변경한다.
- view_mode: superadmin_developer
- install_mode: not_applicable

## web-first intake

- 검색어:
  - `single task screen UI design focus principle task-focused interface full screen`
  - `Nielsen Norman Group focused user interface one primary task per screen`
- 반영한 출처:
  - Microsoft Learn, Inductive User Interface
  - VA.gov Design System, A single response / One Thing per Page
- 계획 영향: "단일 주 기능을 화면 중심으로 두고 보조 요소는 종속시킨다"를 UI 공간 배분 원칙으로 기록한다.

## memory bootstrap

- 확인한 hot/warm anchor:
  - `_docs/instructions/persistent-instructions.md`
  - `_docs/policies/ui-tone-policy.ko.md`
  - `agent-platform/configs/memory/bootstrap-manifest.json`
  - `agent-platform/configs/workflows/work-mode-registry.json`

## 실행 계획

1. persistent instructions 한국어/영어/entry 문서에 단일 주 기능 화면 원칙을 추가한다.
2. UI tone policy 한국어/영어 문서에 공간 배분 원칙, split layout 예외, 검증 기준, 외부 근거를 추가한다.
3. `AGENTS.md`에 같은 원칙을 runtime adapter 수준으로 얇게 반영한다.
4. memory bootstrap manifest가 UI tone policy를 새로운 focus rule과 연결하도록 갱신한다.
5. requirements, spec, history, evaluation 기록을 남긴다.
6. docs audit, JSON validation, git diff review를 수행한다.
