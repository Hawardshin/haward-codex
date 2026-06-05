# 누락 방지 점검: Tool Studio Source Separation

## 사용자 요구 대응

- [x] 대형 소스 분리 대상 선정
- [x] Tool Studio public 타입 분리
- [x] Tool Studio static catalog data 분리
- [x] 기존 `ToolStudioPanel` type export 호환 유지
- [x] static tests 갱신
- [x] check/build/perf 검증
- [x] 커밋 및 push

## 제외

- `MonitorShell.tsx` 대분해, 3D hook 분리, pane별 컴포넌트 분리는 후속 slice로 남겼다.
- 빌드가 갱신한 generated snapshot JSON은 이번 커밋 대상에서 제외한다.
