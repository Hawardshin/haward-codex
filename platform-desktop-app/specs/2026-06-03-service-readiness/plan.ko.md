# 계획: 실제 서비스 준비도 표면

1. 공식/표준 문서로 desktop production readiness 기준을 확인한다.
2. 현재 구현된 runtime data/support/release preflight와 빠진 service gate를 분리한다.
3. service readiness registry와 검사 스크립트를 추가한다.
4. Rust/Tauri command를 추가한다.
5. Workspace Monitor Desktop UI에 서비스 준비도 패널을 추가한다.
6. 요구사항, 스펙, 이력, 평가를 갱신한다.
7. Next, Node, Rust, Tauri, browser smoke를 검증한다.

## 결정

- 이번 slice는 public blocker를 해결 완료로 포장하지 않고 앱과 report에 노출한다.
- signed updater와 notarization credential 설치는 별도 human checkpoint가 필요한 후속 작업으로 남긴다.
