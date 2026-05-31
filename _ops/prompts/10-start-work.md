# Start Work Prompt

Use when: 새 작업을 시작하고 현재 저장소 맥락을 빠르게 잡아야 할 때.

## Prompt

```text
git status를 확인하고, _ops/index.md와 관련 프로젝트 README를 먼저 읽는다.
요청이 어느 프로젝트나 운영 폴더에 속하는지 판단한다.
반복될 가능성이 있는 지시는 _docs/persistent-instructions.md와 관련 운영 문서에 반영한다.
작업 범위를 정한 뒤 필요한 파일만 읽고 구현한다.
```

## Checklist

- `git status --short --branch`
- `_ops/index.md`
- 관련 프로젝트 `README.md`
- `_docs/persistent-instructions.md`
- `_history/YYYY/YYYY-MM-DD.md`
