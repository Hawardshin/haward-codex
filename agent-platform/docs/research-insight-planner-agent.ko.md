# Research Insight Planner Agent

## 목적

`research-insight-planner-agent`는 AI의 내부 확률적 추정만으로 계획하지 않고, 웹 검색과 저장소 검색, 공식 문서, 논문, 코드/패키지 자료 같은 여러 검색 채널을 통해 근거를 모은 뒤 인사이트와 실행 계획을 만든다.

이 에이전트는 플랫폼의 핵심 조사 에이전트다. Perplexity식 answer engine을 참고해 단순 검색 요약이 아니라 `query_understanding -> search_retrieval -> source_ranking -> evidence_extraction -> synthesis -> citation_grounding -> skeptic_review` 단계를 거친다.

## 트리거

다음 작업 전에 실행한다.

- 최신 정보가 필요한 계획
- 오픈소스나 도구 선택
- 에이전트/플랫폼 설계 판단
- 이전 지식 베이스를 근거로 삼는 작업
- 여러 레퍼런스를 비교해야 하는 작업

## 입력

입력 템플릿:

```text
agent-platform/configs/planning/research-insight-plan-template.json
```

필수적으로 기록할 항목:

- objective
- search questions
- search channels
- sources checked
- research profile paths
- answer engine stages
- citation requirements
- source value provenance
- plan evidence
- insights
- plan steps
- validation steps
- knowledge validation status
- risks or unknowns
- capture targets
- plan history targets

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
```

## 규칙

- 최소한 웹 검색과 하나 이상의 다른 검색 채널을 함께 사용한다.
- `agent-platform/configs/research/research-agent-profile.json`을 기본 조사 프로필로 기록한다.
- `answer_engine_stages`에는 `research-agent-profile.json`의 필수 stage ID를 모두 기록한다.
- 중요한 사실 주장은 어떤 출처로 검증할지 `citation_requirements`에 기록한다.
- 중요한 원천값, 주장, 리뷰 신호, 가정, 제약은 `source_value_provenance`에 기록한다.
- 중요한 계획 단계는 `plan_evidence`로 확인한 출처, 저장소 근거, 명령 출력, 명시적 가정과 연결한다.
- 더 넓은 검색 원천은 `source-discovery-registry.json`에서 확인하고, 한국 사용자 리뷰/로컬 조사는 `_tools/korean-local-review/`로 후보 품질을 점수화한다.
- 검색 결과를 바로 계획으로 쓰지 말고, 근거가 계획을 어떻게 바꾸는지 인사이트로 정리한다.
- 출처는 권위, 최신성, 독립성, 관련성, claim 적합도에 따라 순위화한 뒤 종합한다.
- citation은 증명 자체가 아니라 검증 핸들이므로, 인용된 출처가 해당 주장을 실제로 뒷받침하는지 확인한다.
- 내부 지식 베이스를 참고하면 `knowledge-skeptic-agent`로 먼저 검증한다.
- 재사용 가치가 있는 검색 결과는 `_research/`에 기록한다.
- 계획에는 실행 단계와 검증 단계를 같이 둔다.
- 계획 과정은 `_history/plans/YYYY/`에 저장하고, 입력의 `plan_history_targets`에 기록한다.
- 실행 중 계획이 바뀌면 같은 계획 히스토리 파일에 변경 사유를 남긴다.
