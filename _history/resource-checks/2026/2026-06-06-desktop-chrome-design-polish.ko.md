# 리소스 점검

## 리스크

- 정적 HTTP 서버 2개를 Browser smoke 검증에 사용했다.
- Tauri 내부 패키징은 Rust release compile, `.app`/DMG 생성, codesign, hdiutil verify를 실행했다.

## 수명주기

- `127.0.0.1:4173`: 첫 Browser smoke용으로 사용, 캐시 확인 후 종료.
- `127.0.0.1:4174`: 캐시 우회 최종 smoke용으로 사용, 검증 후 종료.
- Browser smoke tab은 검증 후 닫았다.

## 종료 확인

- `lsof -ti tcp:4173`, `lsof -ti tcp:4174` 결과 없음.
- `exec_command` 서버 세션 2개 모두 종료 상태 확인.

## 결론

검증 과정에서 남긴 장기 실행 서버나 포트 점유는 없다.
