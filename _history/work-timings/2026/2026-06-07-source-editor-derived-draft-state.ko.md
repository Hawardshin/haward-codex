# 2026-06-07 소스 에디터 draft 파생 상태 분리 작업 타이밍

## 기록

- 21:27-21:28 KST: 웹 검색과 source draft 파생 계산 지점 확인.
- 21:28-21:29 KST: selector helper 추가와 `MonitorShell.tsx` 적용.
- 21:29 KST: 좁은 테스트, check, 전체 test 실행.
- 21:30 KST: 히스토리 기록, collect/check, 내부 패키징 실행.

## 병목

- draft tab dirty 표시가 별도 인라인 비교를 사용하고 있어 계약 테스트로 잡고 helper 호출로 교체했다.
