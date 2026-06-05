# 평가: 소스 워크벤치 컨트롤 프리미티브

## 결과

- 사용자가 지적한 소스 작업 화면의 기본 선택 드롭다운을 제거하고 Radix DropdownMenu 기반 커스텀 파일 선택기로 교체했다.
- 명령성 버튼은 공용 `Button`/`ActionGroup`으로 통일해 기본 브라우저 버튼처럼 보이는 문제를 줄였다.
- CSS 계약과 정적 테스트가 새 구조를 고정한다.
- 구현 후 내부 `.app`/`.dmg` 패키지 빌드와 검증까지 완료했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 55개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 통과, 22개 테스트.
- `corepack pnpm --dir platform-desktop-app check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 제한

- 인앱 브라우저 도구는 현재 호출 가능한 도구로 노출되지 않았다.
- Playwright dev 서버 검증은 Next dev 화면이 `Loading workspace snapshot` 상태에서 멈춰 소스 드롭다운 DOM까지 도달하지 못했다. 패키지 빌드, 타입체크, 정적 UI 계약으로 대체 검증했다.
