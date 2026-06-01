# Deep Research Agent

`deep-research-agent`는 단순 검색 요약기가 아니다. 특정 상황에서 깊은 조사가 필요할 때 여러 검색 채널과 반복 조사 단계를 거쳐, 긴 보고서를 쓰기 전에 조사 패키지가 충분한지 검증하는 에이전트다.

## 언제 쓰는가

- 사용자가 "딥리서치", "매우 자세한 보고서", "시장/기술/문헌 landscape", "여러 출처를 모아 근거 있는 결론"을 요청할 때
- 단일 검색 결과만으로 답하기 어렵고, 공식 자료, 논문, 오픈소스, 분석 글, 커뮤니티/반대 사례를 함께 봐야 할 때
- 결과가 `_research/` 또는 프로젝트 `docs/`에 durable report로 남아야 할 때

## 핵심 단계

1. 조사 범위와 보고서 목표를 정의한다.
2. 질문을 하위 질문으로 분해한다.
3. 출처 lane과 검색 채널을 정한다.
4. 최소 2회 이상 반복 검색한다.
5. 출처 품질과 신뢰 역할을 분리한다.
6. claim-to-source evidence item을 추출한다.
7. 모순, 반대 근거, 불확실성을 기록한다.
8. 보고서 outline을 만든다.
9. citation audit와 unsupported/weak claim 점검을 한다.
10. 최종 보고서 작성 전 grounding을 실행한다.

## CLI

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json
```

성공 상태는 `ready_to_write_report`다. gap이 있으면 `more_research_required`가 반환된다.

## 주요 파일

- 설정: `agent-platform/configs/research/deep-research-profile.json`
- 입력 템플릿: `agent-platform/configs/planning/deep-research-template.json`
- 구현: `agent-platform/src/agent_platform/planning/deep_research.py`
- 테스트: `agent-platform/tests/test_deep_research.py`
- 운영 워크플로: `_ops/workflows/57-deep-research.md`
- 운영 프롬프트: `_ops/prompts/87-deep-research.md`

## 기존 에이전트와 차이

- `research-insight-planner-agent`: 검색 근거를 바탕으로 실행 계획이 준비됐는지 확인한다.
- `coding-research-agent`: 구현 전 코딩 조사가 충분한지 확인한다.
- `deep-research-agent`: 긴 보고서를 쓰기 위한 깊은 조사 패키지와 citation audit 준비 상태를 확인한다.

## 주의

이번 버전은 실제 검색 API crawler가 아니라 readiness checker다. 검색은 웹/문서/오픈소스/논문/내부 자료 채널에서 수행하고, 그 결과를 템플릿에 기록한 뒤 이 에이전트로 검증한다.

