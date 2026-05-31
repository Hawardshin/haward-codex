# Research Insight Planner Agent

## 목적

`research-insight-planner-agent`는 AI의 내부 확률적 추정만으로 계획하지 않고, 웹 검색과 저장소 검색, 공식 문서, 논문, 코드/패키지 자료 같은 여러 검색 채널을 통해 근거를 모은 뒤 인사이트와 실행 계획을 만든다.

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
- insights
- plan steps
- validation steps
- knowledge validation status
- risks or unknowns
- capture targets

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
```

## 규칙

- 최소한 웹 검색과 하나 이상의 다른 검색 채널을 함께 사용한다.
- 검색 결과를 바로 계획으로 쓰지 말고, 근거가 계획을 어떻게 바꾸는지 인사이트로 정리한다.
- 내부 지식 베이스를 참고하면 `knowledge-skeptic-agent`로 먼저 검증한다.
- 재사용 가치가 있는 검색 결과는 `_research/`에 기록한다.
- 계획에는 실행 단계와 검증 단계를 같이 둔다.
