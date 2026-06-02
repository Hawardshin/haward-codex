# 계획 기록: 철학 기반 기능 추출 구조

## 요청 요약

- 사용자의 철학이 플랫폼 기능에 충분히 반영되지 않았으므로, 철학 원칙에서 기능을 뽑아내고 만드는 구조를 추가한다.

## work_mode

- 선택: `governance`
- 이유: 철학, governance registry, CLI validator, prompt/workflow, memory bootstrap, monitor surface를 변경한다.
- 기록: `_history/mode-selections/2026/2026-06-03-philosophy-feature-extraction.json`

## large-scope decomposition simulation

| Slice | 포함 | 제외 |
| --- | --- | --- |
| source inventory | `_philosophy/`, philosophy traceability, capability promotion, memory bootstrap, monitor snapshot/UI | `_private/`, generated output bulk, unrelated project code |
| implementation | registry, checker, tests, prompt/workflow, agent spec/docs, monitor panel | queued candidates actual implementation |
| validation | config contract, philosophy checker, trace checker, memory bootstrap, Python unittest, workspace monitor test/check/build | public desktop release packaging |

## 결정

- 새 “철학 후보 inbox”부터 만들지 않고, 먼저 registry/checker/UI로 철학-기능 연결 계약을 만든다.
- 18개 원칙 전체는 flow coverage 대상으로 삼고, seed candidate는 현재 구현/계획/큐 후보만 둔다.
- 고객 번들에는 내부 feature candidate와 source path를 노출하지 않는다.

## 검증 계획

- `check-philosophy-features`
- `check-philosophy-trace`
- `check-memory-bootstrap`
- `python3 -m unittest discover -s tests`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- customer bundle build and leak scan
