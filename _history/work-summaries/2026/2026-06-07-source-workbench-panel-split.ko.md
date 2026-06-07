# 작업 요약: 소스 워크벤치 패널 분리

- `SourceWorkbenchPanel.tsx`를 추가해 파일 선택, 액션 툴바, 워크벤치 탭, 파일 브라우저, Monaco editor/diff editor, 저장 결과 UI를 `MonitorShell.tsx` 밖으로 이동했다.
- `MonitorShell.tsx`는 기존 state/hook/controller orchestration과 새 패널 props 연결만 담당하도록 축소했다.
- `source-editor` barrel export, source structure readiness, tool-studio/source-editor template tests, source control design script를 새 구조에 맞췄다.
- `check-service-readiness.mjs`의 resource telemetry UI 검사를 합쳐진 monitor source 경계로 바꿔, 새 패널 분리 후에도 내부 패키징 readiness가 통과하게 했다.
- 최종 검증: `workspace-monitor run check`, `workspace-monitor test` 112개, `platform-desktop-app test` 30개, `desktop:package:run:internal` 통과.
