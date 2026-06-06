# 종합 개선 Cockpit Validation

## 예정 검증

- `npm --prefix platform-desktop-app/renderer/workspace-monitor run collect`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run check`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run test`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app run test`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run build`
- `npm --prefix platform-desktop-app run package:internal`
- Browser smoke: EVAL 탭에서 `data-eval-comprehensive-improvement="all-signal-cockpit"` 확인

## 현재 상태

- `collect`: 완료.
- `workspace-monitor check`: 완료. TypeScript, lazy boundary, scroll, source control design, comprehensive improvement contract, history payload 통과.
- `workspace-monitor test`: 완료. 70개 테스트 통과.
- `platform-desktop-app check`: 완료. internal readiness 통과, public release는 기존 signing/notarization/updater/clean-machine smoke gate로 차단 상태 유지.
- `platform-desktop-app test`: 완료. 24개 테스트 통과.
- `workspace-monitor build`: 완료. Next.js production build 성공.
- `package:internal`: 완료. renderer customer build, customer bundle audit, Rust test/build, Tauri `.app`/`.dmg`, codesign verify, DMG verify 통과.
- Browser smoke: 완료. `data-eval-comprehensive-improvement="all-signal-cockpit"` panel 1개, dimension 7개, visible true, console error 0개.

## 참고

- `npm exec tsc -- --noEmit`는 npm 인자 전달 방식 때문에 TypeScript help만 출력해 실패했다. 실제 타입 검증은 `npm run check`의 `tsc --noEmit`으로 통과했다.
