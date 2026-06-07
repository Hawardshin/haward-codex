# 2026-06-07 데스크톱 검색 에이전트 패널 분리 작업 요약

## 변경

- `platform-desktop-app/renderer/workspace-monitor/components/features/SearchAgentWorkChatPanel.tsx`를 추가했다.
- `MonitorShell.tsx`에 있던 Search Agent Work Chat UI, 실행 폼/메시지 타입, 기본 메시지, 프롬프트 렌더링, 모델 라우팅 판단 헬퍼를 새 파일로 이동했다.
- `tool-studio.test.mjs`와 `model-routing-controls.test.mjs`가 새 컴포넌트 파일을 계약 소스로 검사하도록 업데이트했다.
- `scripts/check-readiness.mjs`, `tests/readiness.test.mjs`, `scripts/check-service-readiness.mjs`가 새 검색 에이전트 패널 파일을 readiness 범위에 포함하도록 업데이트했다.

## 결과

- `MonitorShell.tsx` 라인 수는 15,452줄이다.
- 새 `SearchAgentWorkChatPanel.tsx`는 1,188줄이다.
- 서비스 readiness의 provider/model UI 검사는 `MonitorShell.tsx`에 남은 명령 실행 토큰과 새 패널의 UI 토큰을 함께 검사한다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 90개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app test`: 30개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `cargo check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 내부 `.app`/`.dmg` 빌드, app signature verify, DMG verify, 내부 앱 열기 통과.
