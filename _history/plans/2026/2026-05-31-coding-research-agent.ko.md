# 계획 히스토리: 코딩 조사 에이전트

## 초기 요청

- 코딩용 조사 에이전트를 만들고, 다양한 코딩 조사가 가능하며, 조사가 끝났을 때 일반적인 질문들을 다룰 수 있게 한다.

## 계획 목적

- 구현 전에 코딩 조사가 충분한지 확인하는 Python-first 에이전트를 추가한다.
- 조사 완료 시 반복적으로 답해야 하는 표준 질문을 구조화한다.
- 운영 프롬프트, 워크플로, 템플릿, 리서치 노트, 평가 보고서까지 연결한다.

## 검색 질문

- 코딩/기술 조사 결과를 구현 가능한 결정으로 닫으려면 어떤 구조가 필요한가?
- 기술 선택과 아키텍처 결정에서 선택지, 근거, 결과를 어떻게 남기는가?
- 반복적으로 필요한 질문을 누락하지 않게 하려면 어떤 form/schema 패턴이 적합한가?

## 검색 채널

- 웹 검색
- 저장소 검색
- 공식 문서 검색
- 내부 지식 베이스 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Thoughtworks Technology Radar FAQ | https://www.thoughtworks.com/en-us/radar/faq | 기술 선택을 adoption confidence와 caution 관점으로 나누는 참고 프레임 |
| ADR GitHub Organization | https://adr.github.io/ | 결정, 근거, trade-off, consequences 기록 방식 |
| GitHub issue template docs | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository | 구조화된 입력과 필드 기반 정보 수집 |
| GitHub issue forms syntax | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms | form schema와 validation 개념 |
| 내부 출처 수집 정책 | `_docs/source-collection-policy.ko.md` | 공식/논문/오픈소스/기술 블로그/소셜/반대 사례 수집 기준 |
| 내부 검색 기반 계획 정책 | `_docs/search-insight-planning-policy.ko.md` | 검색 결과를 인사이트와 계획으로 전환하는 규칙 |

## 지식 베이스 검증

- 내부 정책을 참고했으므로 최종 검증에서 `knowledge-skeptic-agent`를 실행한다.

## 도출한 인사이트

- 코딩 조사는 범위가 넓기 때문에 조사 타입을 명시해야 한다.
- 조사 완료는 “출처를 확인함”이 아니라 “선택지, 추천, 위험, 검증 계획, 다음 행동이 있음”으로 정의해야 한다.
- ADR과 issue form 패턴을 결합하면 사람이 기억할 체크리스트를 schema로 강제할 수 있다.
- 많은 출처를 다루는 조사에서는 `_tools/source-collector/`와 연결해야 한다.

## 계획 단계

- `agent-platform`에 `coding_research.py` Python helper를 추가한다.
- CLI에 `complete-coding-research` 명령을 추가한다.
- agent config와 planning input template을 만든다.
- 한국어/영어 문서와 코딩 조사 보고서 템플릿을 추가한다.
- `_ops` 라우터, 프롬프트, 워크플로, 인덱스를 갱신한다.
- 지속 지시, README, 리서치 인덱스, 일일 히스토리를 갱신한다.
- 테스트, 지식 검증, hallucination guard, work evaluator를 실행한다.
- 커밋 후 즉시 push한다.

## 제외하거나 보류한 선택지

- prompt-only 체크리스트: 테스트와 자동 gap 판정이 어렵기 때문에 보류했다.
- 외부 검색 API 통합: 이미 `_tools/source-collector/`가 provider 독립 schema를 갖고 있으므로 이번 범위에서는 직접 API 호출을 추가하지 않았다.

## 위험과 불확실성

- 조사 타입별로 더 세밀한 필수 질문이 필요해질 수 있다.
- 대규모 출처 자동 수집은 별도 adapter 작업이 필요하다.
- 현재 에이전트는 readiness checker이며, 실제 웹 검색 실행 자체는 운영 절차와 기존 web/search 도구가 담당한다.

## 검증 방법

- `python3 -m unittest discover -s agent-platform/tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research ...`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- `workspace-index`와 `task-board` check
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | 코딩 조사 에이전트를 prompt-only가 아니라 Python readiness checker로 구현하기로 결정 | 반복 검증과 테스트 가능성을 확보하기 위해 |
