# 대범위 분해: Smooth Redesign Maintenance

## 요청 요약

- 여러 탭을 실제로 열어 덜 된 부분을 찾고, UI/UX, 속도, 코드 분리, history 관리, 번역을 계속 개선한다.

## 선택한 Slice

- `workspace-monitor` renderer의 motion/transition 계약.
- `MonitorShell` helper 분리.
- history/admin snapshot payload 축소.
- Operator Center와 task run 주변 고노출 한국어 문구.
- desktop/mobile tab smoke에서 발견한 작은 버튼 수정.

## 제외한 항목

- 모든 문서와 모든 화면 문구의 전수 번역 교정.
- runtime process 자체 속도 개선.
- signed installer, updater, notarization, clean-machine smoke.

## Touch Paths

- `platform-desktop-app/renderer/workspace-monitor/components/`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/scripts/`
- `platform-desktop-app/renderer/workspace-monitor/lib/`
- `platform-desktop-app/renderer/workspace-monitor/tests/`
- `platform-desktop-app/docs/requirements/`
- `_history/`

## Merge Gate

- `test`, `check`, `build`, `build:customer`, `perf:budget`, `perf:buttons`, tab audit, Playwright smoke가 모두 통과해야 한다.
