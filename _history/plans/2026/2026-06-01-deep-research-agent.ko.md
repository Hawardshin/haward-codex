# 계획 기록: 딥리서치 에이전트

## 작업 모드

- 선택 모드: `standard`
- 이유: 공통 agent-platform 기능, 새 CLI, 새 config, workflow/prompt, 요구사항/스펙/히스토리 변경이 포함된다.

## 확인한 근거

- OpenAI API Deep Research: 복잡한 분석/조사 작업에서 다수 출처를 분석/종합해 보고서를 만드는 구조
- Exa Research API: planning, searching, reasoning/synthesis로 이어지는 비동기 다단계 조사 구조
- LangChain Deep Agents docs: todo 계획, sub-agent 조사, 검색 평가, citation 포함 보고서 합성
- Cited but Not Verified, ReportBench: citation 검증과 unsupported claim 검사가 필요하다는 평가 관점
- 저장소 내부: `research_insight_planner.py`, `coding_research.py`, `work_evaluator.py`, `research-agent-profile.json`

## 결정

- 새 에이전트 이름은 `deep-research-agent`로 한다.
- 기존 planner를 확장하지 않고 `deep_research.py` 별도 모듈을 추가한다.
- 실제 검색 자동화 설치는 하지 않고, 조사 패키지와 보고서 작성 readiness를 deterministic하게 검증한다.
- 실행 prompt는 영어로 작성하고, 사용자 문서는 한영 병행한다.

## 계획 단계

1. 요구사항과 스펙을 추가한다.
2. deep research profile과 template을 만든다.
3. Python dataclass 기반 readiness checker와 CLI를 추가한다.
4. 테스트와 CLI sample을 추가한다.
5. 운영 workflow/prompt/router/memory/health에 연결한다.
6. 검증, 평가, 히스토리, 커밋/push를 완료한다.

## 위험과 불확실성

- 실제 검색 API가 없으므로 이번 구현은 검색 수행 자체가 아니라 검색 결과 패키지 검증에 집중한다.
- source 수를 과도하게 강제하면 빠른 조사에 부담이 될 수 있어 depth level을 둔다.
- citation audit는 사람이/에이전트가 실제 원문을 확인해야 의미가 있으므로 final report 전에 별도 grounding이 필요하다.

## 변경 이력

| 시간 | 변경 | 이유 |
| --- | --- | --- |
| 2026-06-01 | 별도 deep research readiness agent로 범위 결정 | 기존 planner와 역할 중복을 줄이기 위해 |

