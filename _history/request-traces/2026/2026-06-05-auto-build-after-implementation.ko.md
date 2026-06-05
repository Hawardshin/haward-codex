# 요청-결과 추적: 구현 완료 후 자동 빌드

## 요청

- 구현 후 사용자가 직접 빌드하지 않도록 에이전트가 빌드까지 자동 수행.

## 결과

- durable instruction과 Codex adapter에 구현 완료 후 build/package 실행 규칙을 추가했다.
- memory bootstrap manifest에 해당 규칙을 persistent instruction anchor 용도로 반영했다.

## 산출물

- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_requirements/changes/2026-06-05-auto-build-after-implementation.ko.md`
- `_specs/workspace-platform/2026-06-05-auto-build-after-implementation/`

## 검증

- `_specs/workspace-platform/2026-06-05-auto-build-after-implementation/validation.ko.md`

## 커밋

- 예정 커밋 메시지: `docs(instructions): require build after implementation`
- 최종 close-out commit이 이 trace와 연결된다.
