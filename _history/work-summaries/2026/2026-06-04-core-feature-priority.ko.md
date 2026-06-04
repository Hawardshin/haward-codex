# 작업 요약: 핵심 기능 우선순위

## 완료

- 플랫폼 첫 화면의 제품 방향을 Agent Core와 CLI Orchestration 두 core 기능 중심으로 재배치했다.
- Root Tools와 Work Visibility를 supporting layer로 추가해 공유 설정과 현재 작업량을 별도 표면으로 보여준다.
- 비핵심 operator sections는 user navigation에서 낮추고 Operator Center로 분리했다.
- readiness/test/config contract/snapshot 경로를 새 제품 구조로 맞췄다.

## 검증

- `workspace-monitor` check/test 통과
- `platform-desktop-app` check/test 통과
- 주요 config contract와 view-mode 검증 통과
- Browser smoke desktop/mobile 통과, 가로 overflow 없음
