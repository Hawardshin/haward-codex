# 요청-결과 추적: Tool Studio Source Separation

## 요청 요약

- 사용자는 소스코드 분리 리팩토링을 요청했다.

## 결과

- `ToolStudioPanel.tsx`에서 public type과 static catalog data를 분리했다.
- `components/workbench/tool-studio/types.ts`와 `data.ts`를 추가했다.
- 기존 `ToolStudioPanel`에서 `ToolStudioMode`, `ToolStudioModeRequest` type re-export를 유지해 `MonitorShell.tsx` import 계약을 깨지 않게 했다.
- static tests를 새 module boundary를 확인하도록 갱신했다.

## 검증

- test, type check, check, build, customer build, perf budget, diff check 통과

## 제외

- generated snapshot JSON은 build 과정에서 갱신됐지만 이번 커밋에서 제외했다.
