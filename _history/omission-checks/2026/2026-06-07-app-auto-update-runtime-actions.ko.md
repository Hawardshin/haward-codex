# 누락 방지 점검

- 날짜: 2026-06-07
- 요청: 자동 업데이트 기능 미동작 항목 구현.

## 체크리스트

- 웹 우선 확인: 완료. Tauri v2 updater 공식 문서 확인.
- Rust 런타임 명령: 완료. `check_app_update`, `install_app_update` 추가.
- UI 실행 표면: 완료. Service Readiness 패널 버튼과 결과 카드 추가.
- 타입 정의: 완료. update check/install report 타입 추가.
- 계약 감시: 완료. runtime contract, readiness script, readiness test에 명령과 UI 토큰 추가.
- 내부 빌드 안전성: 완료. updater 미구성 상태를 오류가 아닌 상태 보고로 처리.
- 검증: 진행 완료. 타입, Rust, 플랫폼, 테스트 통과.

## 남은 공개 릴리스 조건

- 실제 공용 업데이트 설치 smoke는 아직 불가하다. 현재 공개 updater endpoint, Tauri signing key, Apple notarization/signing 입력이 설정되지 않았기 때문이다.
