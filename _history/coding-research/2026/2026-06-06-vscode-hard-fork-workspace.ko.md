# VS Code 하드 포크 코딩 리서치

날짜: 2026-06-06

## 기술 스택

- upstream: `microsoft/vscode` Code - OSS
- 주요 언어: TypeScript
- 런타임: Node `24.15.0`, Electron app build
- 변경 표면: `product.json`, VS Code built-in extension, extension compilation gulpfile

## reference_config_paths

- `agent-platform/configs/research/research-agent-profile.json`
- `_ops/workflows/66-cli-adapter-integration.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `vscode-agent-workbench/configs/source-baseline.json`

## source_types

- official_repository: `https://github.com/microsoft/vscode`
- official_docs: VS Code wiki `How-to-Contribute`, `Differences between the repository and Visual Studio Code`, `source-code-organization`
- source_code: local `product.json`, `build/gulpfile.extensions.ts`, built-in extension patterns
- issue_discussion: `https://github.com/microsoft/vscode/issues/246466`

## technology_official_docs

- VS Code repository README: Code - OSS source, MIT license, build/run from source entrypoint
- How to Contribute wiki: source build workflow
- Differences wiki: Code - OSS vs Visual Studio Code distribution boundary
- Source Code Organization wiki: workbench/extension organization

## stack_version_constraints

- `.nvmrc` requires Node `24.15.0`.
- source `package-lock.json` controls dependency graph.
- `code-cli.sh --version` reports source product version `1.124.0`.

## issue_discussion_sources

- `microsoft/vscode#246466`: npm 11 warning issue for OSS builds.

## issue_discussion_notes

The npm 11 warning issue means npm config warnings observed during install/build are not automatically treated as a hard-fork regression. Security audit warnings are still recorded separately because they affect dependency risk review.

## community_signal_notes

The VS Code repository has high adoption and a mature extension ecosystem, but popularity is not used as proof that this fork is safe to redistribute.

## language_options

| option | trade-off |
| --- | --- |
| TypeScript built-in extension | Best fit for VS Code extension host, view contributions, settings, commands, and compile pipeline |
| Rust/Tauri native bridge | Strong native control, but not the shortest path to a VS Code workbench-native surface |
| Shell/CLI scripts only | Easy to automate, but does not restore workspace character inside the editor |

## selected_language

TypeScript inside the VS Code source tree.

## language_decision_notes

The first slice needs to live inside VS Code's own workbench and extension host. TypeScript lets the implementation use documented contribution points and the existing compile pipeline while leaving native process control for later platform bridge slices.

## architecture_reference_sources

- VS Code built-in extension layout under local `extensions/`
- VS Code source organization wiki
- VS Code `product.json` product identity source

## architecture_options

| option | result |
| --- | --- |
| Hard-fork source + built-in extension | Selected. Preserves editor/workspace primitives and allows direct source evolution |
| External extension only | Rejected for this request because product identity and native workbench control stay external |
| Continue only in Tauri desktop app | Rejected for this request because it does not use VS Code source directly |

## architecture_theory_sources

- Repository/component ownership principles already captured in `_ops/projects/root-structure-policy.json`.
- VS Code source organization official wiki for local architecture boundaries.

## architecture_practitioner_sources

- VS Code repository and built-in extension source layout.
- VS Code issue #246466 for build environment warning context.

## architecture_tradeoff_notes

Hard-forking gives the strongest workspace foundation but increases upstream merge and distribution responsibility. The outer workspace therefore tracks patches and audit records instead of vendoring all source.

## code_reference_sources

- `vscode-agent-workbench/source/extensions/configuration-editing/`
- `vscode-agent-workbench/source/extensions/css-language-features/`
- `vscode-agent-workbench/source/build/gulpfile.extensions.ts`
- `vscode-agent-workbench/source/product.json`

## code_reference_notes

The new extension follows VS Code contribution points for views, commands, configuration, activation events, and TreeDataProvider. It is registered in the same extension compilation list used by other built-in extensions.

## folder_structure_options

| option | decision |
| --- | --- |
| Track full VS Code source in outer repo | Rejected because checkout, dependencies, and build outputs are too large |
| Keep ignored nested clone and track patches | Selected because it supports direct source work with durable replay artifacts |
| Use Git submodule | Deferred because the user asked for immediate direct work and local source commit is enough for the first slice |

## folder_structure_decision_notes

`vscode-agent-workbench/source/` is local and ignored; `patches/`, `configs/`, `docs/`, `specs/`, and `scripts/` are durable.

## maintainability_notes

Each completed source slice should be one or more commits inside `source/`, plus regenerated patches and source baseline updates in the outer workspace.
