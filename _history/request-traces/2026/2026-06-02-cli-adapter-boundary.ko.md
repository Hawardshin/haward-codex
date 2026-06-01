# 요청-결과 추적: CLI 어댑터 경계

## 요청

- ID: `UR-2026-06-02-008`
- 요약: 플랫폼은 설치형이지만 다양한 CLI를 사용할 수 있고, 특정 CLI에 종속되지 않아야 한다는 요청.

## 결과

- `REQ-WS-053` 추가
- CLI adapter registry 추가
- CLI adapter policy 추가
- CLI adapter integration workflow/prompt 추가
- platform identity, installable software policy, desktop product boundary 보강
- memory bootstrap, router, index 연결

## 산출물

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `_docs/policies/cli-adapter-policy.ko.md`
- `_ops/workflows/66-cli-adapter-integration.md`
- `_ops/prompts/97-cli-adapter-integration.md`
- `_specs/workspace-platform/2026-06-02-cli-adapter-boundary/`

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-02-cli-adapter-boundary.ko.md`

## 커밋

- 검증 후 기록
