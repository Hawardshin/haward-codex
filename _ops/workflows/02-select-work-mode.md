# Select Work Mode Workflow

## Purpose

작업마다 같은 전체 루프를 반복하지 않도록, 사용자 의도와 위험도에 맞는 작업 모드를 먼저 고른다.

작업 모드는 프롬프트 안내가 아니라 close-out gate다. `quick`을 제외한 모드는 모드 선택 기록, 누락 방지 coverage, evaluator target으로 강제한다. 리소스 위험이 있는 작업은 모드와 별개로 resource leak gate를 추가한다.

## Inputs

- 사용자 지시
- 웹 검색 결과와 공개 검색 기록 후보
- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/work_modes.py`
- 현재 작업의 위험도, 범위, 지속성, 검증 가능성

## Modes

| Mode | Use When | Blocking Close-Out |
| --- | --- | --- |
| `quick` | 작은 오타, 단순 답변, 되돌리기 쉬운 낮은 위험 작업 | 초기 지시, 결과 요약, 변경/검증 설명 |
| `standard` | 기본 의미 있는 작업 | 기존 전체 target plus omission check |
| `ship_first` | 먼저 작동하는 결과가 필요하고 개선은 뒤로 뺄 수 있는 작업 | reference, mode selection, omission check, web search record, verification, deferred target when improvement exists |
| `research` | 조사/근거 수집/출처 비교 중심 작업 | references, source provenance, plan evidence, mode selection, omission check, web search record |
| `governance` | 규칙, 플랫폼 구조, evaluator, memory, source registry, 요구사항 변경 | 기존 전체 target plus omission check |

Resource leak risk is conditional across all modes: long-running runtimes, browser automation, subprocesses, workers, caches, streams, large data, handles, connections, timers, or subscriptions require `resource_risk_occurred=true` and `resource_check_targets`.

## Sequence

1. Run web-first intake first; mode selection happens after search, not before it.
2. Run memory bootstrap and read hot anchors.
3. Open `agent-platform/configs/workflows/work-mode-registry.json`.
4. If the user explicitly selected a mode, use it unless the request clearly needs a stronger safety mode.
5. If no mode is selected, classify:
   - `quick`: tiny, reversible, local, low-risk.
   - `research`: external facts, source comparison, evidence synthesis, no implementation.
   - `ship_first`: urgent or small deliverable where verification can happen now and non-blocking improvement can be backlogged.
   - `governance`: durable repository rules, platform behavior, evaluator, memory, source registry, requirements, specs.
   - `standard`: everything else.
6. Record the selected mode in the plan, evaluator input, and meaningful work history.
7. For non-`quick` modes, create or update a mode selection record under `_history/plans/YYYY/` or the owning spec plan and include it in `mode_selection_record_targets`.
8. For non-`quick` modes, create or update an omission coverage record and include it in `omission_check_targets`.
9. If runtime resource risk exists, create or update a resource leak check record and include it in `resource_check_targets`.
10. For `ship_first`, create or update `_ops/backlog/deferred-improvements.ko.md` when improvement ideas are intentionally postponed.
11. Do not use a lighter mode to skip failed verification, unsupported factual claims, install audits, omission coverage, resource leak checks, or user-requested rigor.
12. If mode policy or evaluator target fields changed, run:

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json
```

## Rule

Work modes reduce unnecessary artifact overhead. They do not remove web-first intake, git/push rules, or the requirement to ground factual claims.

Prompt text alone is not enforcement. Enforcement requires registry config, `check-work-modes`, a mode selection record, omission coverage, conditional resource leak checks, `evaluate-work`, and a saved evaluation report.
