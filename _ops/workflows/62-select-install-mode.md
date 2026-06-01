# Select Install Mode Workflow

## Purpose

사용자용 설치와 플랫폼 개선용 개발자 설치를 분리해, 불필요한 개발 도구 설치와 검증 비용을 줄이면서도 플랫폼 변경에는 충분한 검증을 적용한다.

## Inputs

- 사용자 설치 목적
- `agent-platform/configs/installations/install-mode-registry.json`
- 실제 설치 여부
- 대상 프로젝트 또는 workspace 범위

## Modes

| Mode | Use When | Setup Style |
| --- | --- | --- |
| `user` | 플랫폼 사용, 산출물 보기, monitor 실행/배포, public 사용자용 경로 확인 | regular install, 최소 의존성, 기존 artifact 우선 |
| `developer` | 플랫폼 개선, 소스 수정, 테스트/검증 harness 수정, 공통 규칙 변경 | editable install, devDependencies, tests, governance checks |

## Sequence

1. Run web-first intake when this is triggered by a new user instruction.
2. Run memory bootstrap before changing durable setup rules.
3. Open `agent-platform/configs/installations/install-mode-registry.json`.
4. Decide `install_mode`:
   - `user`: use/run/view/deploy/browse/try.
   - `developer`: improve/develop/refactor/add tool/add skill/change validator/change platform behavior.
5. Keep `install_mode` separate from `work_mode`; still select `work_mode` for the task itself.
6. If commands are only being documented, do not create an installation audit record.
7. If commands are actually run and dependency or environment state changes, follow `_ops/workflows/58-installation-record.md`.
8. Verify the registry with:
   - `PYTHONPATH=src python3 -m agent_platform.cli check-install-modes configs/installations/install-mode-registry.json`
9. Record selected install mode in plans/history when it changes implementation or verification scope.

## Output Contract

- selected `install_mode`
- reason
- target project or workspace scope
- planned setup commands
- whether installation actually occurred
- verification commands
- installation audit targets if installation occurred

## Rule

설치 모드는 환경 준비의 범위를 정한다. 작업 결과의 평가 강도는 여전히 `work_mode`가 정한다.
