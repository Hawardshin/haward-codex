# 요청-결과 추적: Smooth Redesign Maintenance

## 요청

- 여러 탭을 열어 덜 된 부분을 찾고 UI/UX, 속도, 코드 분리, history 관리, 번역을 개선한다.

## 결과

- motion helper를 `lib/motion.ts`로 분리했다.
- motion token과 enter keyframes를 탭, 다이얼로그, command palette, Tool Studio menu, agent detail workspace에 적용했다.
- `_history` 계열 문서를 full HTML 대신 bounded admin summary로 snapshot에 싣도록 바꾸고 payload budget check를 추가했다.
- Operator Center와 task run 로그 안내의 고노출 한국어 문구를 정리했다.
- Playwright smoke에서 발견한 Tools 아이콘 버튼 크기 문제를 고쳤다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/lib/motion.ts`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-history-payload.mjs`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-smooth-redesign-maintenance/`
- `_history/evaluations/2026/2026-06-05-smooth-redesign-maintenance.ko.md`

## 검증

- `test`, `check`, `build`, `build:customer`, `perf:budget`, `perf:buttons`, tab audit, Playwright smoke 모두 통과.
