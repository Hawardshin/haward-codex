# 구현 계획: 소스 워크벤치 하위 컴포넌트 분리

1. `SourceWorkbenchPanel.tsx` 안의 상태 스트립, 파일 컨트롤, 명령 툴바, 파일 브라우저, 편집 프레임, 저장 결과를 별도 파일로 분리한다.
2. 공통 copy/view mode 타입은 `sourceWorkbenchTypes.ts`로 이동한다.
3. tests/readiness/source-control-design 검사는 단일 파일이 아니라 visual component bundle을 보게 바꾼다.
4. `workspace-monitor` check/test, `platform-desktop-app` test, 내부 패키징으로 검증한다.

