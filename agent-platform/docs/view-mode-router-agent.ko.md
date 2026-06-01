# View Mode Router Agent

## 목적

`view-mode-router-agent`는 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 선택하는 에이전트 계약이다.

## 사용 시점

- Workspace Monitor에서 어떤 섹션을 보여줄지 바꿀 때
- desktop/admin surface에서 사용자와 개발자 화면을 나눌 때
- public 배포 전 사용자용 snapshot과 내부 운영 snapshot을 분리해야 할 때
- `install_mode`와 `work_mode`가 아니라 화면 관점만 바꿔야 할 때

## Source Of Truth

- 설정: `agent-platform/configs/access/view-mode-registry.json`
- 정책: `_docs/policies/view-mode-policy.ko.md`
- 워크플로: `_ops/workflows/73-view-mode-selection.md`
- 프롬프트: `_ops/prompts/103-view-mode-selection.md`

## 검증

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/view-mode-router-agent.json
```

## 주의

- `view_mode`는 화면 렌즈다.
- 클라이언트에서 숨기는 것은 보안 경계가 아니다.
- public 또는 multi-user 배포 전에는 snapshot 수집, 서버 라우팅, 인증/인가, 테스트로 강제해야 한다.
