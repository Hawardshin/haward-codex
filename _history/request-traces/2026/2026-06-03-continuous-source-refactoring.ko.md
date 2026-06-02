# 요청-결과 추적: 지속 소스 구조 리팩터링

## 요청

- 요청 ID: `UR-2026-06-03-018`
- 요약: 좋은 소스 구조를 결과 품질의 기반으로 보고, 작업 중 계속 리팩터링할 것.

## 결과

- 지속 지침에 소스 구조 품질 gate를 추가했다.
- memory bootstrap manifest의 persistent instruction anchor를 갱신했다.
- `workspace-monitor` Intent Feature Map collector/parser를 `scripts/lib/intent-feature-map.mjs`로 분리했다.
- 기존 `collectIntentFeatureMap` API re-export를 유지했다.

## 산출물

- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `workspace-monitor/scripts/lib/intent-feature-map.mjs`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/specs/2026-06-03-intent-feature-map-source-refactor/`

## 검증

- 최종 검증 결과는 `_history/evaluations/2026/2026-06-03-continuous-source-refactoring-evaluation-input.json`에 기록한다.

## 남은 후보

- 다음 collector 변경 때 Claude design transfer, philosophy feature extraction, mode function catalog 같은 다른 기능별 파서도 동일 기준으로 분리할 수 있다.
