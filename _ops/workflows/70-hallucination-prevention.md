# Hallucination Prevention Workflow

## Purpose

최종 산출물에 들어가는 사실 주장을 근거와 검증으로 잠그고, 근거가 약한 내용은 단정하지 않도록 한다.

## When To Use

- 최종 답변에 파일 상태, 테스트 결과, 커밋/push 상태, 외부 사실, 현재 정보, 날짜, 수치, 추천이 포함될 때
- 리서치 노트, 계획 히스토리, 평가 보고서, 운영 규칙을 만들 때
- 고위험 판단이나 오래 남을 규칙을 만들 때

## Steps

1. 요청과 산출물의 위험도를 `low`, `medium`, `high`로 분류한다.
2. 산출물 초안에서 사실 주장을 추출한다.
3. 각 주장을 다음 중 하나로 분류한다.
   - `repository_state`
   - `external_fact`
   - `code_behavior`
   - `calculation`
   - `research_summary`
   - `recommendation`
   - `user_instruction`
   - `inference`
   - `preference`
4. 각 주장에 근거 ID를 붙인다.
5. 저장소 상태는 파일 확인, `git status`, 검색, 도구 결과로 검증한다.
6. 코드 동작은 테스트나 실행 결과로 검증한다.
7. 외부 사실과 최신 정보는 공식 문서, 논문, 웹 출처를 확인하고 접근일을 남긴다.
8. 내부 지식 베이스를 근거로 쓰면 `knowledge-skeptic-agent`를 먼저 실행한다.
9. 검색 기반 판단이 필요하면 `research-insight-planner-agent` 결과와 리서치 노트를 연결한다.
10. `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`를 실행한다.
11. `grounding_required`가 나오면 follow-up action을 처리하고 다시 실행한다.
12. `ready_to_publish` 결과를 평가 보고서의 `grounding_checks`에 남긴다.

## Evidence Levels

| Evidence | Strength |
| --- | --- |
| 직접 실행한 테스트/명령 결과 | 강함 |
| 저장소 파일 직접 확인 | 강함 |
| 공식 문서/논문/데이터셋 | 강함 |
| 신뢰 가능한 웹 출처 | 중간 이상, 최신성 확인 필요 |
| 내부 리서치 노트 | 중간, `knowledge-skeptic-agent` 검증 필요 |
| 모델 내부 기억 | 단독 근거로 사용 금지 |

## Failure Handling

- 근거가 없으면 주장 삭제 또는 검증 수행
- 근거가 오래되었으면 최신 출처 재확인
- 출처가 충돌하면 단정하지 않고 충돌을 기록
- 테스트하지 않은 코드는 테스트하지 않았다고 명시
- push 상태는 `git status --short --branch` 또는 push 결과 확인 전 완료로 말하지 않음

## Output

- grounding input JSON 또는 평가 보고서에 들어갈 요약
- `ready_to_publish` 또는 `grounding_required` 결과
- 수정한 주장과 남은 불확실성

## Related

- [_docs/hallucination-prevention-policy.ko.md](../../_docs/hallucination-prevention-policy.ko.md)
- [_ops/prompts/96-ground-output.md](../prompts/96-ground-output.md)
- [agent-platform/docs/hallucination-guard-agent.ko.md](../../agent-platform/docs/hallucination-guard-agent.ko.md)
