# 2026-06-07 desktop package structure split user request

- 요약: 사용자가 "패키기 구조 분리 진행"이라고 요청했다.
- 해석:
  - 앞선 데스크톱 앱 구조 리팩토링의 연속 작업이다.
  - 패키징 파이프라인도 너무 큰 파일에 책임이 몰리지 않도록 분리해야 한다.
  - TypeScript/Rust/패키징 검증까지 사용자가 다시 실행하지 않아도 되게 확인해야 한다.
- 범위:
  - `platform-desktop-app/scripts/desktop-pipeline/` 구조.
  - desktop readiness 검사와 테스트 계약.
  - internal Tauri app/DMG packaging run.
- 제외:
  - 공개 배포 signing/notarization/updater credential 설정은 이번 요청의 직접 범위가 아니다.
  - `_private/` 내용은 열람하지 않는다.
