# 대범위 분해: Tool Studio Source Separation

## 원 요청

- 소스코드 분리 리팩토링

## 선택한 slice

- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- 이유: 최근 UI/속도 개선이 집중된 1,994줄 파일이며, 타입/정적 데이터/UI/effect가 섞여 있어 안전한 1차 분리 효과가 크다.

## 제외

- `MonitorShell.tsx` 13k줄 대분해
- 3D hook 분리
- 세부 workbench pane별 컴포넌트 분리
- Next dynamic import 적용

## 검증 gate

- 기존 테스트 통과
- 타입 체크 통과
- check/build/customer build/perf budget 통과
- 기존 generated snapshot 변경은 커밋 제외
