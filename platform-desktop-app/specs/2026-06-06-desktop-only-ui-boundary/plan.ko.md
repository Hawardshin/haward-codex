# Plan: 데스크톱 전용 UI 경계

1. Web-first intake로 Tauri v2 window size constraint가 config에서 지원되는지 확인한다.
2. 현재 CSS/test/audit에서 모바일 UI 전환 지점을 찾는다.
3. `tauri.conf.json`과 renderer CSS에 같은 최소 창 계약을 적용한다.
4. 720px/420px 모바일 UI 분기와 모바일 audit page 생성을 제거한다.
5. 테스트와 readiness contract를 데스크톱 전용으로 갱신한다.
6. 요구사항, spec, history, evaluation을 남긴다.
7. test/check/build/package-internal을 실행한다.

## Rollback

- `tauri.conf.json` window dimensions를 이전 값으로 되돌린다.
- `globals.css`에서 desktop min token과 제거한 모바일 media block을 복원한다.
- audit/test에서 모바일 viewport 기대를 복원한다.
