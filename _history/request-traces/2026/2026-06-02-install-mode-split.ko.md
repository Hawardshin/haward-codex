# 요청 추적: 설치 모드 분리

## 요청

- ID: `UR-2026-06-02-003`
- 요약: 플랫폼에는 사용 모드와 개선 모드가 있으므로, 사용자용 설치와 개발자용 설치를 나누는 구조를 요청했다.

## 요구사항

- `REQ-WS-049`

## 결과

- 설치 모드 registry: `agent-platform/configs/installations/install-mode-registry.json`
- CLI 구현: `agent-platform/src/agent_platform/install_modes.py`, `agent-platform/src/agent_platform/cli.py`
- 테스트: `agent-platform/tests/test_install_modes.py`
- 정책: `_docs/policies/install-mode-policy.ko.md`
- workflow: `_ops/workflows/62-select-install-mode.md`
- prompt: `_ops/prompts/92-select-install-mode.md`
- 스펙: `_specs/workspace-platform/2026-06-02-install-mode-split/`

## 검증

- 검증 결과는 `_specs/workspace-platform/2026-06-02-install-mode-split/validation.ko.md`와 `_history/evaluations/2026/2026-06-02-install-mode-split.ko.md`에 기록한다.

## 남은 개선 후보

- 실제 설치 사례가 쌓이면 install profile별 smoke test runner를 추가한다.
