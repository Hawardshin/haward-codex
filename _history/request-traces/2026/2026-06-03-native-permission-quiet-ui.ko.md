# Request Trace: Native Permission & Quiet UI

- 요청 ID: `UR-2026-06-03-053`
- 날짜: 2026-06-03
- 소유 프로젝트: `platform-desktop-app/`

## 요청 요약

UI와 폰트가 과하므로 더 차분하게 만들고, 데스크톱 앱답게 작업공간 접근 권한을 요청해서 바로 사용할 수 있게 한다.

## 구현

- `globals.css`: system font stack, smaller headings/metrics, lower hover shadow and no hover lift
- `MonitorShell.tsx`: `작업공간 접근 권한 요청` copy, permission granted notice, active workspace to CLI working dir auto-fill
- `WorkspaceExplorerPane.tsx`: permission hint text
- `check-readiness.mjs`, `readiness.test.mjs`: permission and typography regression tokens

## 결과

- UI typography와 hover motion을 낮추고, workspace access request 중심 CTA를 적용했다.
- folder picker/import/clone 결과가 active workspace path를 반환하면 CLI working directory가 비어 있을 때 자동 반영한다.
- 자동 검증과 bundle/source token smoke는 통과했다.
- 실제 native folder picker 클릭 smoke는 현재 browser automation 부재로 수행하지 못했다.
