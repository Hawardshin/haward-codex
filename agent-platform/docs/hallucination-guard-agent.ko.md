# Hallucination Guard Agent

`hallucination-guard-agent`는 답변, 문서, 계획, 평가 보고서에 포함된 사실 주장을 추출하고 각 주장이 근거로 지지되는지 검사한다.

## 목적

- 근거 없는 사실 주장, 날짜, 수치, 파일 상태, 외부 사실을 최종 산출물에 남기지 않는다.
- 근거가 불완전하면 그 내용을 사실처럼 쓰지 않고 불확실성으로 표시한다.
- 최신성이나 외부 사실이 중요한 경우 확인 날짜와 출처를 남긴다.

## 실행 시점

- 최종 답변에 사실 주장이 포함될 때
- 운영 규칙, 계획, 평가 보고서, 리서치 노트를 만들 때
- 외부 자료, 현재 정보, 파일 상태, 테스트 결과를 근거로 말할 때
- 고위험 판단이나 장기 규칙을 만들 때

## 입력

- `task`: 검사 대상 작업
- `output_summary`: 산출물 요약
- `risk_level`: `low`, `medium`, `high`
- `evidence`: 파일, 명령 결과, 테스트 결과, 공식 문서, 논문, 웹 출처, 도구 결과
- `claims`: 산출물에서 추출한 사실 주장
- `uncertainty_notes`: 불확실성을 최종 산출물에 어떻게 표시할지
- `limitation_notes`: 검증하지 못한 범위

## 출력

- `ready_to_publish`: 사실 주장을 근거로 지지할 수 있다.
- `grounding_required`: 근거 보강, 주장 삭제, 도구 검증, 불확실성 표시가 필요하다.

## 규칙

- 사실 주장은 근거 ID와 검증 단계를 가져야 한다.
- 외부 사실은 공식 문서, 논문, 웹 출처, 데이터셋 같은 외부 근거가 필요하다.
- 저장소 상태나 코드 동작은 파일, 명령 출력, 테스트 결과, 도구 결과로 확인한다.
- 최신성에 민감한 주장은 확인 날짜가 있는 근거가 필요하다.
- 고위험 산출물은 독립적인 비추론 근거를 최소 2개 요구한다.
- 근거가 부족한 주장은 사실처럼 쓰지 않는다.

## 명령

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-grounding configs/evaluation/hallucination-guard-template.json
```

## 관련 파일

- `agent-platform/configs/agents/hallucination-guard-agent.json`
- `agent-platform/configs/evaluation/hallucination-guard-template.json`
- `agent-platform/src/agent_platform/evaluation/hallucination_guard.py`
- `_ops/prompts/96-ground-output.md`
- `_ops/workflows/70-hallucination-prevention.md`
