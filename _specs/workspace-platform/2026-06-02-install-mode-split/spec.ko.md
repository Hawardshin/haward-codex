# 스펙: 설치 모드 분리

## 목적

`REQ-WS-049`를 반영해 플랫폼 설치를 사용자용 `user` 설치와 개발자용 `developer` 설치로 분리한다.

## 요구사항

- `REQ-WS-049`

## 동작 원칙

- `install_mode`는 환경 준비 범위이고 `work_mode`는 작업 실행/평가 강도다.
- `user` 설치는 플랫폼 사용, 보기, 실행, 배포를 위한 최소 경로를 제공한다.
- `developer` 설치는 플랫폼 개선, 소스 수정, 검증 harness 변경, 공통 규칙 변경을 위한 editable/development 경로를 제공한다.
- 설치 명령은 실제 실행 전까지 계획일 뿐이다.
- 실제 설치/업그레이드/제거/전역 설정이 발생하면 설치 감사 기록을 남긴다.

## 변경 대상

- `agent-platform/configs/installations/install-mode-registry.json`
- `agent-platform/src/agent_platform/install_modes.py`
- `agent-platform/src/agent_platform/cli.py`
- `agent-platform/tests/test_install_modes.py`
- `_docs/policies/install-mode-policy.*.md`
- `_ops/workflows/62-select-install-mode.md`
- `_ops/prompts/92-select-install-mode.md`
- `AGENTS.md`, persistent instructions, memory bootstrap
- `_ops/index.md`, `_ops/prompts/00-router.md`, `_ops/installations/README.*.md`
- 요구사항, 스펙, 히스토리, 평가 기록

## 수용 기준

- install mode registry는 self-documenting config contract를 통과한다.
- `check-install-modes`는 `user`와 `developer` 모드가 모두 있는지 검증한다.
- `list-install-modes`와 `show-install-mode`가 JSON을 출력한다.
- 단위 테스트가 install mode validator와 CLI-adjacent helper를 검증한다.
- memory bootstrap, docs audit, naming audit, structure audit, workspace health, evaluator가 통과한다.
