# 2026-06-07 다크모드 색상 일관성 구현 계획

## 범위

- 대상: `platform-desktop-app/renderer/workspace-monitor`
- 주요 파일:
  - `app/globals.css`
  - `tests/color-tokens.test.mjs`

## 작업 순서

1. 다크모드 색상 토큰과 시스템 다크 중복 정의를 점검한다.
2. 명시 다크와 시스템 다크의 핵심 팔레트를 일치시킨다.
3. 순백색 기반 텍스트/포커스 토큰을 더 부드러운 다크 전경색으로 조정한다.
4. 실제 렌더에서 앱 루트 바깥 `body` 배경이 라이트로 남는지 확인하고 보정한다.
5. 색상 토큰 테스트, 전체 테스트, 타입/계약 체크, 내부 패키징을 실행한다.

## 검증 계획

- `node --test tests/color-tokens.test.mjs`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- 로컬 Playwright 렌더 검증
- `corepack pnpm run desktop:package:run:internal`
