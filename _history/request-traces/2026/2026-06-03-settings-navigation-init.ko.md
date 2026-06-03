# 요청-결과 추적: 설정 중심 사이드바와 초기화 구성

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-041`
- 소유 프로젝트: `platform-desktop-app/`
- 렌더러: `platform-desktop-app/renderer/workspace-monitor/`
- 작업 모드: `quick`

## 요청 요약

사용자는 좌측 사이드바 접기/펴기와 다른 CLI/agent 초기화 방식을 여러 화면에 흩어두지 말고, 설정 버튼 하나에서 대분류 탭으로 분류해 처리하라고 요청했다.

## 결과

- 활동 레일의 `설정` 버튼을 단일 설정 진입점으로 유지하고 titlebar의 중복 설정 버튼을 제거했다.
- 설정 dialog를 `화면`, `좌측 영역`, `초기화`, `데이터/운영` 탭 구조로 재편했다.
- `좌측 영역` 탭에서 sidebar `펼치기`/`접기`를 처리하고 `localStorage`에 상태를 저장하게 했다.
- `초기화` 탭에서 CLI 어댑터, Session Mode, Task Pipe, Auto-defer questions 기본값을 설정하게 했다.
- Runtime 화면과 Task Pipe 화면에 있던 adapter/mode/pipe/question handling 직접 설정 UI를 요약 + `초기화 설정 변경` 버튼으로 바꿨다.
- command palette와 mode switchboard도 view/language/runtime init 관련 항목은 설정 탭으로 보내도록 정리했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/artifacts/2026-06-03-settings-navigation-init/settings-tabs-sidebar-collapse.png`
- `_history/web-searches/2026/2026-06-03-settings-navigation-init.ko.md`
- `_history/evaluations/2026/2026-06-03-settings-navigation-init.ko.md`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed
- Browser static-build smoke: 설정 버튼 1개, 설정 탭 4개, sidebar collapsed/expanded class 및 width 변화, runtime scattered select 0개 확인

## 잔여 위험

- 정적 renderer smoke 기준으로 검증했다. 실제 Tauri packaged window에서도 같은 frontendDist를 사용하지만, OS chrome과 packaged viewport는 내부 패키징 smoke에서 계속 확인한다.
- 공개 배포 gate인 signing, notarization, updater, clean-machine smoke는 이번 UI 구조 변경 범위 밖이며 기존 blocked 상태를 유지한다.
