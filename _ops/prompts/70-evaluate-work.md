# Evaluate Work Prompt

Use when: 완료된 작업이 초기 사용자 지시와 맞는지, 개선하거나 다시 작업할 부분이 있는지 확인해야 할 때.

## Prompt

```text
work-evaluator-agent 역할로 평가한다.
먼저 했던 작업을 간결하게 요약한다.
관련된 이전 내부 작업, 저장소 내 좋은 예시, 공식 문서, 성숙한 오픈소스나 외부 레퍼런스가 있는지 조사한다.
레퍼런스가 현재성이 중요한 외부 정보라면 최신 공식 문서나 신뢰 가능한 출처를 확인한다.
초기 지시, 실제 결과, 변경 파일, 검증 결과를 비교한다.
결과가 좋은 레퍼런스와 비교해 부족한 부분이 있는지 확인한다.
초기 지시와 결과가 다른 부분, 빠진 부분, 개선할 부분을 구분한다.
차이나 누락이 있으면 rework_required로 판단하고 follow-up action을 만든다.
follow-up action은 다시 작업 지시로 반영하고, 완료 후 같은 평가를 반복한다.
차단 gap이 없으면 ready_to_close로 판단한다.
```

## Inputs

- initial instruction
- result summary
- changed files
- verification results
- references checked
- known gaps
- improvement ideas

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Reference

- [agent-platform/docs/work-evaluator-agent.md](../../agent-platform/docs/work-evaluator-agent.md)
