# EVAL report model structure research note

## 요약

공식 React 문서는 component render purity와 logic reuse를 강조하고, TypeScript module 문서는 파일 단위 import/export 관계를 명확한 module boundary로 본다. Tauri는 native core process와 WebView process를 분리하므로, renderer 내부에서도 native telemetry, EVAL scoring model, JSX rendering을 분리하는 것이 desktop product architecture와 맞다.

## 근거

- React component purity: render phase가 외부 변경 없이 같은 입력에서 같은 UI를 반환해야 유지보수와 최적화가 쉬워진다.
- React logic reuse: 복잡한 logic은 component에서 추출해 재사용 가능한 helper 또는 hook으로 둘 수 있다. 이번 점수 계산은 React state/effect가 없으므로 hook보다 pure module이 맞다.
- TypeScript modules: explicit import/export 관계로 module ownership을 드러낼 수 있다.
- Tauri process model: desktop native 권한은 core process가 갖고, WebView UI는 IPC/props로 전달받은 data를 렌더한다.

## 선택

`evaluationReportModel.ts`를 만들고 `EvaluationReportPanel.tsx`는 model 결과를 렌더링한다. `evaluationRuntimeTelemetry.ts`는 계속 native runtime metric scoring의 하위 model로 둔다.

## 제외

- 새 dependency 설치 없음.
- 외부 EVAL runner 설치 없음.
- `MonitorShell.tsx` 전체 migration 없음.
