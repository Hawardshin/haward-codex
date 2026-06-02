# 웹 검색 기록: 질문 보류 기능

## 목적

설치형 데스크톱 앱이 외부 CLI의 stdin/stdout/stderr pipe를 관리하고, 사용자 결정이 필요한 질문을 명시적 decision surface로 보류하는 방향을 확인했다.

## 검색 및 확인 소스

- Tauri v2 Shell plugin docs: https://v2.tauri.app/plugin/shell/
  - 확인 내용: shell plugin은 child process 실행을 지원하지만 permission/capability scope가 필요하다.
  - 계획 영향: 외부 CLI는 optional adapter로 두고, 자동 설치/전역 권한 요구 없이 현재 Rust command 기반 session을 확장한다.
- Node.js child_process docs: https://nodejs.org/api/child_process.html
  - 확인 내용: child process orchestration에서 stdin/stdout/stderr pipe는 표준 제어 표면이다.
  - 계획 영향: task pipe와 session poll에서 pipe 상태, bounded output, stdin defer write를 명시적으로 추적한다.
- WAI-ARIA Alert Dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
  - 확인 내용: 중요한 사용자 판단은 명확한 decision UI로 노출해야 한다.
  - 계획 영향: CLI 질문을 즉시 승인하지 않고 decision inbox로 모은다.
- WAI-ARIA Dialog Modal pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
  - 확인 내용: 사용자가 의식적으로 처리해야 하는 decision surface는 명확한 focus와 action 경로가 필요하다.
  - 계획 영향: answer-only와 answer-and-resume을 구분해 사용자가 복귀 후 처리하도록 유지한다.

## 약한 소스 제외

- 블로그/커뮤니티 글은 이번 구현의 핵심 근거로 사용하지 않았다. 구현은 공식 docs와 repository-local validation에 기반했다.

## 불확실성

- CLI별 질문 문구는 도구마다 달라질 수 있어 현재는 보수적 문자열 휴리스틱이다.
- public macOS 배포 준비는 signing/notarization 검증 전까지 완료로 보지 않는다.
