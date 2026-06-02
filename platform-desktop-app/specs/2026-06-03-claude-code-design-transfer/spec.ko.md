# Claude Code 공개 설계 전이 스펙

## 범위

- `platform-desktop-app/configs/claude-code-design-transfer-registry.json`
- `platform-desktop-app/docs/architecture/claude-code-design-transfer.*.md`
- `workspace-monitor` snapshot collector, TypeScript type, Overview UI
- readiness/test/build 검증

## 요구사항

- 공개 공식 문서 기반 패턴만 사용한다.
- registry는 self-documenting config contract를 만족한다.
- Workspace Monitor snapshot은 `claudeCodeDesignTransfer.summary.totalPatterns`와 pattern 목록을 포함한다.
- Overview UI는 `Claude Code Design Transfer`, `Public sources only`, 주요 pattern label, status, risk control을 표시한다.
- Claude Code CLI는 optional guest adapter로만 기술된다.

## 비범위

- Claude Code 비공개 설계 또는 유출 자료의 재현
- Claude Code CLI 자동 설치 또는 필수화
- MCP connector, hook, worktree 병렬 실행의 실제 런타임 구현
- public macOS distribution readiness claim

## 수용 기준

- `check-config-contract`가 새 registry를 `self_documenting`으로 평가한다.
- `workspace-monitor` collector test가 design transfer registry를 읽는다.
- `platform-desktop-app` readiness test가 새 registry/doc/UI token을 확인한다.
- `workspace-monitor` type check/test/build와 `platform-desktop-app` check/test가 통과한다.
