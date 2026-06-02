# Work Evaluation: Prohibition-To-Positive Constraints

## Request

- “AI does not understand prohibitions.”

## Result

- Added `REQ-WS-078`.
- Added `prohibition_rewrite_contract`, which rewrites prohibition-heavy instructions into positive target behavior, allowed actions, replacement action, examples, and verification/enforcement gates.
- Added philosophy principle 16, “Prohibition Is Not A Behavior Goal,” and linked it through philosophy traceability.
- Reflected the rule in persistent instructions, memory bootstrap, workflow, prompt, operating model docs, history, and specs.

## Evidence And Verification

- Web search record: `_history/web-searches/2026/2026-06-02-prohibition-to-positive-constraints.en.md`
- Omission check: `coverage_ready`
- Grounding check: `ready_to_publish`
- Workspace health: `passed`, 25 checks, 0 failed
- Evaluator: `ready_to_close`
- `git diff --check`: clean

## Evaluation

- The result is aligned with the initial instruction.
- Instead of preserving the overly broad claim that AI never understands any prohibition, the durable rule is operational: do not rely on prohibition-only instructions as stable behavior control; rewrite them into positive behavior contracts and structural verification.
- Remaining improvement candidate: add a prompt/workflow linter that detects prohibition-heavy examples without positive target behavior, replacement action, and a verification gate.
