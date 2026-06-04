# 추적성: Depth First Home Navigation

## 요청

- 사용자 요청 요약: 한 탭에 여러 기능을 넣지 말고, 필요한 경우 깊이를 더 둬서 단일 기능 화면으로 나눠야 한다.

## 요구사항 연결

- `REQ-WM-033`: 한 탭 여러 기능 패널 금지, drill-down child view 우선
- 관련 요구사항: `REQ-WM-031`, `REQ-WM-032`

## 구현 연결

- `components/MonitorShell.tsx`: `#home-depth-*` 기반 Overview 선택 메뉴와 child view
- `components/workbench/CoreFeatureDrilldown.tsx`: 탭형 핵심 기능 컴포넌트를 단일 상세 화면으로 변경
- `app/globals.css`: home depth menu와 drill-down header 스타일

## 정책 연결

- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/policies/ui-tone-policy.ko.md`
- `_docs/policies/ui-tone-policy.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
