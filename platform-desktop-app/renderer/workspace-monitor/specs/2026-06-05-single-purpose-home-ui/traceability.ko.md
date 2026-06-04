# 추적성: Single Purpose Home UI

## 요청

- 사용자 요청 요약: 사용자의 인지 한계를 고려해 기능 하나가 명확히 한 가지 일만 하도록 UI를 바꿔야 한다.

## 요구사항 연결

- `REQ-WM-032`: 단일 목적 기능, 패널, 버튼, workflow step
- 관련 기존 요구사항: `REQ-WM-030`, `REQ-WM-031`

## 구현 연결

- `components/workbench/CoreFeatureTabs.tsx`: active feature detail의 CTA를 하나로 제한
- `components/MonitorShell.tsx`: 홈 action, operator strip, disclosure panel 의미 단위 분리
- `app/globals.css`: 분리된 disclosure panel이 암묵적 2열 grid에 끌려가지 않게 조정

## 정책 연결

- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/policies/ui-tone-policy.ko.md`
- `_docs/policies/ui-tone-policy.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
