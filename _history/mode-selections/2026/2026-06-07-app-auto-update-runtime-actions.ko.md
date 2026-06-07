# 작업 모드 선택

- 날짜: 2026-06-07
- 요청: 자동 업데이트 기능 미동작 항목 구현.
- 선택 모드: standard

## 근거

- Rust 런타임, TypeScript UI, readiness 계약, 테스트, 패키징 검증을 함께 건드리는 의미 있는 구현 작업이다.
- 공개 배포 signing/notarization/updater 환경 입력은 아직 없으므로 public release 완료가 아니라 내부 빌드 기능 보강과 gate 유지가 목표다.

## 필수 게이트

- 웹 우선 확인
- 로컬 코드 조사
- 구현
- 타입/Rust/계약/테스트 검증
- 누락 방지 및 리소스 점검 기록
- 내부 패키징 검증
