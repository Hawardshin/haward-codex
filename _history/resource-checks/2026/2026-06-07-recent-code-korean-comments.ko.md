# 2026-06-07 리소스 점검: 최근 코드 한국어 주석

## 리스크 유형

- 주석 추가 자체는 런타임 동작을 바꾸지 않는다.
- 최종 패키징 검증은 Tauri build, DMG generation, app open 프로세스를 다시 실행한다.

## 점검 결과

- 새 long-running worker, timer, subscription, network connection은 추가하지 않았다.
- DMG cleanup/recovery는 기존 스크립트의 주석만 보강했으며 삭제 범위는 generated bundle directory로 제한되어 있다.
- package/run 검증에서 `.app`와 `.dmg`가 생성됐고 internal app open이 완료됐다.
