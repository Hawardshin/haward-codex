# 작업 평가: 좌측 내비게이션 안정화

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-040`
- 범위: 좌측 navigation 중복 제거, sidebar layout 안정화, 브라우저 smoke 중 발견한 파일 화면 제목 줄바꿈 수정

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| 좌측에서 같은 섹션 이동이 두 군데로 보이지 않는다 | 통과 | `sidebar-section-groups`와 `sidebar-section-list` 렌더링 제거 |
| sidebar는 desktop app context surface처럼 작동한다 | 통과 | `sidebar-context-panel`이 현재 화면, 기능군, 상태 badge를 표시 |
| activity rail이 흔들려 보이지 않는다 | 통과 | 4행 grid 명시, hover translate 제거 |
| 실제 브라우저에서 중복 DOM이 없다 | 통과 | Browser smoke에서 old section groups/list/operator trigger 모두 0개 |
| 파일/코드 화면의 제목이 세로로 깨지지 않는다 | 통과 | Browser smoke에서 hero title height 28px 확인 |

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser screenshot: `platform-desktop-app/artifacts/2026-06-03-sidebar-navigation-stability/sidebar-context-after-file-click.png`

## 리소스 정리

- 정적 서버 `python3 -m http.server 3213`은 검증 후 종료 대상이다.
- Browser automation은 screenshot 저장 후 추가 루프 없이 종료했다.

## 잔여 위험

- public release readiness와 무관한 renderer UX 수정이다. 기존 signing, notarization, updater, clean-machine smoke gate는 그대로 남아 있다.
