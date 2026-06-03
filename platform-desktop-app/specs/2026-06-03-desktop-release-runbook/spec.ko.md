# 데스크톱 릴리즈 Runbook과 원샷 명령 스펙

## 목표

사용자가 데스크톱 앱 README를 한국어로 바로 읽고, 테스트/빌드/내부 패키징/공개 배포 gate 확인을 여러 명령으로 흩어 실행하지 않도록 한다.

## 요구사항

- `README.md`는 한국어 기본 문서여야 한다.
- `README.ko.md`와 `README.en.md`를 별도 제공해야 한다.
- 실제 테스트/빌드/배포 절차는 한/영 release runbook으로 제공해야 한다.
- repository root에서 실행 가능한 원샷 명령을 제공해야 한다.
- 내부 테스트 패키징 명령은 검증, renderer customer build, Rust test/build, Tauri build, macOS artifact verification을 한 흐름으로 실행해야 한다.
- 공개 배포 명령은 public-ready를 주장하지 않고 report-only gate를 보여줘야 한다.
- readiness/test는 README, runbook, package scripts, pipeline script가 빠지면 실패해야 한다.

## 비범위

- 이번 작업에서 공개 signing/notarization credential을 생성하거나 저장하지 않는다.
- updater plugin을 새로 설치하거나 public update server를 구성하지 않는다.
- public release blocked 상태를 ready로 바꾸지 않는다.
