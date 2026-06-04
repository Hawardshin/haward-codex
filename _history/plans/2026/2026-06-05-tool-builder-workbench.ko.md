# 계획: Tool Builder Workbench

## 목표

- Tool Studio의 `툴 만들기` 화면을 실제 제작 워크벤치처럼 보이게 한다.

## 작업 순서

1. web-first intake로 AgentCore Gateway와 IDE tool window 흐름을 확인한다.
2. 기존 Tool Studio build mode 구조를 읽는다.
3. template catalog와 선택 상태를 추가한다.
4. manifest/source/schema/run/package/output preview와 action row를 추가한다.
5. responsive CSS와 정적 테스트를 추가한다.
6. test/check/build와 desktop/mobile smoke를 실행한다.

## 롤백 경계

- `ToolStudioPanel.tsx`의 tool builder catalog/workbench
- `globals.css`의 `.tool-builder-*` 스타일
- `tool-studio.test.mjs`의 정적 테스트 계약
