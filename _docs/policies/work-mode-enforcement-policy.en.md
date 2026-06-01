# Work Mode Enforcement Policy

## Purpose

Work modes must be execution contracts, not prompt-only preferences. If a mode only lives in a prompt, the agent has more freedom, but missing artifacts and weak design are not mechanically blocked.

## Policy

- `agent-platform/configs/workflows/work-mode-registry.json` is the source of truth for work modes.
- All non-`quick` work, including `standard`, `ship_first`, `research`, and `governance`, must leave a record of the selected mode, selection reason, applied overrides, and enforcement checks.
- Evaluation input must include `mode_selection_record_targets` whenever the selected mode requires it.
- Evaluation input must also include `omission_check_targets` whenever the selected mode requires it, so required instructions, requirements, artifacts, and acceptance checks have coverage.
- Run `check-work-modes` when mode policy, evaluator targets, or close-out strictness changes.
- The evaluator must return rework when selected-mode blocking targets are missing.
- Mode policy must be coordinated across prompts, workflow docs, config, CLI checks, evaluator logic, and final evaluation reports.

## Enforcement Layers

1. Config layer: record modes, selection rules, enforcement layers, and evaluator policy in `work-mode-registry.json`.
2. CLI layer: `check-work-modes` checks drift between the registry and Python evaluator policy.
3. Record layer: non-`quick` work leaves a mode selection record and an omission coverage record.
4. Omission-prevention layer: `check-omissions` checks required item coverage.
5. Evaluation layer: `evaluate-work` turns missing blocking targets into gaps.
6. Audit layer: save final evaluations under `_history/evaluations/YYYY/`.

## Evidence

- Policy-as-code systems such as OPA evaluate policy at enforcement points rather than relying on human memory.
- JSON Schema is a standard mechanism for machine-checking that data satisfies declared structure.
- AI guardrail documentation shows why prompt guidance should be backed by runtime or boundary checks.

## Prohibitions

- Do not assume a rule will hold because it appears in a prompt.
- Do not close meaningful non-`quick` work without a mode selection record.
- Do not close meaningful non-`quick` work without omission coverage.
- Do not push work mode changes when the mode registry and evaluator policy disagree.
