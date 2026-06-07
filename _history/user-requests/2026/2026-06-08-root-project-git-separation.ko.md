# 사용자 요청 요약: root project Git 분리 계속 구현

- 날짜: 2026-06-08
- 요약: 기존 플랫폼이 제품 경계는 나눴지만 실제 Git repository 분리가 완료됐는지 확인하고, 완료되지 않았다면 사용자가 바로 이해하고 사용할 수 있도록 project별 Git 분리를 구현하라는 요청.

## 요구사항 후보

- 등록된 root project는 독립 Git repository로 분리되어야 한다.
- root workspace는 각 project의 실제 source를 직접 소유하기보다 project repository를 import/track하는 상위 작업공간이어야 한다.
- 각 project는 Codex, Claude Code, Cursor, Antigravity 등 다른 assistant runtime에서 독립적으로 열 수 있어야 한다.
- Git 분리 상태와 remote repository URL은 운영 registry와 history record로 확인 가능해야 한다.
- 변경은 커밋하고 push해서 다음 작업자가 같은 상태를 재현할 수 있어야 한다.

## 제외

- public release, installer signing, notarization, updater, user-facing clone wizard 구현은 이번 slice의 범위가 아니다.
- private repository 접근 권한이 없는 환경에서의 onboarding 자동화는 후속 slice다.
