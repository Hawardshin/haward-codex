# Close Work Prompt

Use when: 구현이나 문서 작업을 마무리할 때.

## Prompt

```text
변경분을 검토하고 가능한 검증 명령을 실행한다.
새 프롬프트, 워크플로, 폴더, 프로젝트가 생겼으면 _ops/maps/를 갱신한다.
_history/YYYY/YYYY-MM-DD.md에 작업 요약과 검증 결과를 남긴다.
했던 작업을 요약하고, 관련된 이전 작업이나 좋은 레퍼런스를 조사한다.
work-evaluator-agent로 초기 지시와 결과를 비교한다.
차이나 개선할 점이 있으면 follow-up action으로 바꾸고 다시 작업한다.
재작업 후 같은 평가를 다시 통과한다.
의미 있는 단위로 커밋하고 즉시 origin/main에 push한다.
최종 응답에는 변경 요약, 검증, 커밋 해시, push 상태를 간결하게 보고한다.
```
