# 작업 평가: 설정 중심 사이드바와 초기화 구성

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-041`
- 범위: 설정 단일 진입점, 설정 category tabs, sidebar collapse/expand, runtime init defaults 중앙화

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| 설정 버튼 하나로 설정을 연다 | 통과 | Browser smoke에서 `button[title="설정"]` 1개, titlebar 설정 버튼 0개 확인 |
| 설정이 대분류 탭으로 나뉜다 | 통과 | `화면`, `좌측 영역`, `초기화`, `데이터/운영` tab 확인 |
| sidebar 접기/펴기는 설정에서 처리한다 | 통과 | `좌측 영역` 탭에서 collapsed class/width 0/visibility hidden, expanded width 292 확인 |
| CLI/agent 초기화 기본값은 설정에서 처리한다 | 통과 | `초기화` 탭에서 CLI 어댑터, Session Mode, Task Pipe, Auto-defer questions 확인 |
| Runtime 화면에 초기화 설정이 흩어져 있지 않다 | 통과 | Browser smoke에서 `.session-launcher select`, `.task-pipe-controls select` 0개 확인 |
| readiness가 새 구조를 강제한다 | 통과 | `SIDEBAR_MODE_STORAGE_KEY`, `RUNTIME_INIT_STORAGE_KEY`, `settings-tab-list`, `settings-controlled-summary` token checks 추가 |

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed
- Browser screenshot: `platform-desktop-app/artifacts/2026-06-03-settings-navigation-init/settings-tabs-sidebar-collapse.png`

## 리소스 정리

- 정적 서버 `python3 -m http.server 3214`는 검증 후 종료했다.
- Browser automation은 screenshot 저장 후 추가 loop 없이 종료했다.

## 잔여 위험

- public release readiness와 무관한 renderer UX 수정이다. 기존 signing, notarization, updater, clean-machine smoke gate는 그대로 남아 있다.
