# Coding research: EVAL report catalog structure

## technology_stack

- React renderer in `platform-desktop-app/renderer/workspace-monitor`
- TypeScript feature modules
- Node test contracts
- Tauri desktop packaging pipeline

## technology_official_docs

- React Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript Modules reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- TypeScript Namespaces and Modules: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html

## stack_version_constraints

- 기존 project dependencies와 TS path alias를 유지한다.
- 새 package 설치 없음.

## source_types

- official_docs
- existing_source
- local_tests

## reference_config_paths

- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/package.json`
- `_ops/workflows/36-spec-driven-development.md`

## language_options

- TypeScript module: 기존 renderer와 type check에 직접 연결되므로 선택.
- React custom hook: lifecycle/state가 없어 불필요한 coupling이 생겨 미선택.
- Rust/Tauri command: native metrics에는 적합하지만 static report catalog에는 과하다.

## selected_language

TypeScript.

## language_decision_notes

정적 catalog와 pure model 조합은 renderer build/test가 바로 검증할 수 있고, 새 IPC나 runtime resource를 만들지 않는다.

## architecture_reference_sources

- React 공식 component purity/custom hook 문서
- TypeScript 공식 modules 문서
- 기존 `evaluationRuntimeTelemetry.ts` feature-local model 분리 패턴

## architecture_options

- Feature-local catalog module: 선택. EVAL feature ownership 안에서 책임을 나눈다.
- Shared `lib/evaluation` module: 보류. 아직 cross-feature 소비자가 없다.

## architecture_decision_notes

이번 구조개선은 panel, model, catalog의 세 경계를 만드는 것이 목적이다. shared abstraction 승격은 실제 재사용자가 생긴 뒤가 유지보수 비용이 낮다.

## architecture_theory_sources

- React 공식 문서의 pure component guidance.
- TypeScript 공식 문서의 module boundary guidance.

## architecture_practitioner_sources

- 기존 repository의 `evaluationRuntimeTelemetry.ts` 분리 결과와 contract tests.

## architecture_tradeoff_notes

Catalog를 별도 module로 분리하면 파일 수는 늘지만, model 파일은 계산 책임에 집중하고 정적 후보 목록 변경이 score logic diff와 섞이지 않는다.

## code_reference_sources

- `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationReportModel.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationRuntimeTelemetry.ts`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## code_reference_notes

기존 runtime telemetry refactor는 pure model을 별도 파일에 두고 tests/contracts로 boundary를 확인한다. 이번 slice는 같은 방향으로 static catalog boundary를 추가했다.
