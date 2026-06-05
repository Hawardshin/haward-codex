# 계획: Tool Studio Source Separation

1. 공식 React/Next/TypeScript 기준을 확인한다.
2. 대형 Workspace Monitor 소스 파일을 비교해 안전한 slice를 고른다.
3. Tool Studio public type과 static catalog data를 별도 모듈로 분리한다.
4. 기존 `ToolStudioPanel` export 계약은 re-export로 유지한다.
5. tests, type check, check, build, customer build, perf budget으로 회귀를 확인한다.
