# 작업 계획: 실제 서비스 준비도 표면

## 요청

- 사용자 요청: `실제 서비스라고 하기엔 부족한 부분이 많아 그런 부분 찾아서 개선`
- 요청 ID: `UR-2026-06-03-012`
- 소유 프로젝트: `platform-desktop-app/`

## Large-scope decomposition 요약

- 전체 앱 재작성 대신 실제 서비스 readiness에서 가장 위험한 공백을 slice로 분리했다.
- 포함: release/update/privacy/support/onboarding blocker 식별, registry, script, Tauri command, Desktop UI.
- 제외: Developer ID 인증서 발급, notarization credential 저장, updater endpoint 운영, workspace chooser persistence 전체 구현.

## 실행 계획

1. 웹 검색으로 서비스 readiness 기준 확인.
2. 현재 runtime data/support/release preflight 구현과 missing public blockers 분리.
3. service readiness registry와 CLI 검사 추가.
4. Tauri command 추가.
5. Workspace Monitor Desktop UI 패널 추가.
6. 검증 및 평가 기록 후 커밋/푸시.
