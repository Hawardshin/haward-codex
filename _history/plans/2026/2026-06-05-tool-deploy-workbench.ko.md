# 계획: Tool Deploy Workbench

## 목표

- Tool Studio의 `툴 배포` 화면을 실제 배포 전 점검 작업대처럼 보이게 한다.

## 작업 순서

1. web-first intake로 AgentCore Gateway target과 deployment preflight 참고를 확인한다.
2. 기존 Tool Studio deploy mode 구조를 읽는다.
3. deployment target catalog와 선택 상태를 추가한다.
4. release/preflight/auth/observability/rollback preview와 action row를 추가한다.
5. responsive CSS와 정적 테스트를 추가한다.
6. test/check/build와 desktop/mobile smoke를 실행한다.

## 롤백 경계

- `ToolStudioPanel.tsx`의 tool deploy catalog/workbench
- `globals.css`의 `.tool-deploy-*` 스타일
- `tool-studio.test.mjs`의 정적 테스트 계약
