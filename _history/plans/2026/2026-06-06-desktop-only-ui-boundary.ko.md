# Plan Record: Desktop-only UI Boundary

## Sequence

1. Web-first intake로 Tauri window config의 최소 창 제약을 확인한다.
2. `platform-desktop-app` 소스에서 모바일 UI media block, mobile audit, mobile test expectation을 찾는다.
3. Tauri main window와 renderer root에 1280x800 minimum contract를 적용한다.
4. 720px/420px 모바일 UI media block을 제거한다.
5. audit/check/test/readiness를 desktop minimum contract 기준으로 변경한다.
6. 요구사항과 spec/history/evaluation을 갱신한다.
7. test/check/build/package-internal을 실행한다.

## Evidence

- Tauri v2 official config reference confirms `minWidth` and `minHeight` window config fields.
- Local inventory found mobile UI contracts in `globals.css`, `audit-monitor-surfaces.mjs`, `check-scroll-containers.mjs`, and `tool-studio.test.mjs`.
