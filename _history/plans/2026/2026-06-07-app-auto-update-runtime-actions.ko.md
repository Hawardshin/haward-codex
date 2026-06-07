# 구현 계획

- 날짜: 2026-06-07
- 프로젝트: platform-desktop-app

## 계획

1. Tauri updater 공식 문서와 로컬 release/updater 스크립트를 비교한다.
2. Rust 런타임에 업데이트 확인과 설치 명령을 추가한다.
3. Service Readiness UI에서 업데이트 확인, 설치 후 재시작, 결과 표시를 제공한다.
4. 타입, 런타임 계약, readiness 검사, 테스트를 새 명령과 UI 표면에 맞춘다.
5. 내부 빌드에서 updater 미구성 상태가 앱 실패가 아닌 상태 보고로 degrade하는지 검증한다.
6. TypeScript, Rust, 플랫폼 테스트와 내부 패키징을 실행한다.

## 제외

- 공개 updater endpoint/key/notarization/signing 입력 생성은 이번 작업에서 수행하지 않는다.
- 실제 clean-machine update install smoke는 공개 배포 환경 입력이 준비된 뒤 별도 실행한다.
