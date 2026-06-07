# 작업 요약

- 날짜: 2026-06-07
- 프로젝트: platform-desktop-app
- 범위: Desktop Runtime의 Codex/CLI init 상태 가시성 개선.

## 완료

- `RuntimeInitStatusCard`를 추가해 상단 빠른 시작 영역에 init 상태를 항상 표시했다.
- 단일 CLI 세션 시작 시 `initializing`, `ready`, `failed` 상태를 저장한다.
- 작업 파이프라인 시작 시 pipeline ID, 시작된 세션 수, 누락 경로 수를 표시한다.
- Tauri runtime 부재나 prompt 누락 같은 실패는 카드와 액션 피드백 모두 실패로 남도록 수정했다.
- readiness/test 토큰을 추가해 init 상태 카드가 빠지면 회귀를 잡도록 했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
