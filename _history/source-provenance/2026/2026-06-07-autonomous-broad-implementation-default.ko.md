# 출처 추적: 자율 넓은 구현 기본값

## 외부 출처

- OpenAI Developers, `Custom instructions with AGENTS.md - Codex`, 접근일 2026-06-07, 신뢰도: 공식 문서.
- OpenAI, `Introducing Codex`, 접근일 2026-06-07, 신뢰도: 공식 제품 발표.
- GitHub Docs, `About customizing GitHub Copilot responses`, 접근일 2026-06-07, 신뢰도: 공식 문서.

## 내부 출처

- `AGENTS.md`: 루트 에이전트 지침.
- `_docs/instructions/persistent-instructions.md`: 지속 지시 원본.
- `_docs/instructions/persistent-instructions.ko.md`: 한국어 지속 지시.
- `_docs/instructions/persistent-instructions.en.md`: 영어 지속 지시.
- `agent-platform/configs/memory/bootstrap-manifest.json`: 새 세션 memory anchor 계약.

## 반영된 값

- 후속 구현 명령은 넓은 자율 multi-slice 구현 루프 허가로 해석한다.
- 가능한 경우 보통 3~5개 이상의 안전한 slice를 큐로 잡는다.
- 각 slice는 `touch_paths`, 의존성, 검증 gate, rollback 경계, 남은 작업 큐를 가져야 한다.
