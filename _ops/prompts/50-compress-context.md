# Compress Context Prompt

Use when: 대화가 길어져서 다음 세션이 저장소만 보고 이어갈 수 있게 해야 할 때.

## Prompt

```text
현재까지의 안정된 요구사항, 결정, 변경 파일, 남은 과제를 추린다.
프로젝트 README나 docs에 현재 상태를 반영한다.
_history/YYYY/YYYY-MM-DD.md에 작업 맥락을 요약한다.
지속 규칙이면 _docs/persistent-instructions.md와 AGENTS.md에도 반영한다.
일시적 추론이나 불필요한 로그는 남기지 않는다.
```

## Reference

- [_docs/context-management.md](../../_docs/context-management.md)
