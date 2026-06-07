# Mode Selection: product split handoff

- 날짜: 2026-06-08
- 선택 모드: `ship_first`
- 이유: 사용자가 반복적으로 구현 완료를 요구했고, 이미 제품 경계와 submodule 분리는 존재하므로 다음 안전한 실행 slice는 UI/런타임 handoff 계약을 실제 코드로 고정하는 것이다.

## 적용 게이트

- web-first intake 완료.
- repository boundary 확인 완료.
- runtime-risk 있음: 별도 데스크톱 프로세스 실행 command를 추가하므로 resource check를 남긴다.
- non-quick 작업: requirements/spec/tasks/validation/trace 기록을 남긴다.
