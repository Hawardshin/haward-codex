# Omission Check

- 요청 핵심: 에이전트 설정과 실제 사용 순서를 사용자가 모르는 문제 해결.
- 확인 항목:
  - [x] 첫 실행 순서가 Quick Start 상단에 노출됨.
  - [x] 작업공간, 모델 계정/로컬 런타임, CLI, AGENTS.md, 첫 실행 기록 단계 포함.
  - [x] 기존 액션으로 바로 이동하는 버튼 포함.
  - [x] 새 UI를 별도 컴포넌트로 분리해 큰 파일 증가를 제한.
  - [x] TypeScript, monitor tests, desktop checks/tests 통과.
- 남은 위험:
  - 실제 public 배포 업데이트/서명/노터라이즈는 별도 release blocker로 남아 있다.
