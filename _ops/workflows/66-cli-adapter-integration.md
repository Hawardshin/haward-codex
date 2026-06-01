# CLI Adapter Integration Workflow

## Purpose

Use this workflow when the installable platform, agent-platform, workspace-monitor, or a project wants to call, depend on, bundle, configure, or compare an external CLI.

## Inputs

- User request or feature proposal
- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `_docs/policies/cli-adapter-policy.ko.md`
- Existing project requirements/specs
- Candidate CLI docs and installation sources

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when CLI behavior changes platform boundaries.
4. Classify the CLI role:
   - optional helper
   - project-local required tool
   - bundled sidecar
   - user-supplied executable
   - unsupported tool
5. Decide the owning layer:
   - installed shell
   - platform core
   - project adapter
   - external CLI
6. Record or update the adapter contract:
   - availability check
   - version check
   - supported commands
   - input/output contract
   - timeout
   - cwd and environment policy
   - secret redaction
   - permission scope
   - fallback behavior
7. If one action will run several CLI processes or connect CLI streams, switch to `_ops/workflows/71-cli-pipeline-orchestration.md` and model the work as process nodes plus pipe edges.
8. If the CLI changes dependency or environment state, run installation audit planning before install.
9. If the desktop shell invokes the CLI, record command/path allowlists and user-visible permission settings.
10. Update requirements, specs, traceability, and source provenance.
11. Validate config contracts, docs, maps, task board, grounding, evaluation, and timing records.

## Output Contract

- CLI role and dependency posture
- adapter contract target
- source list and checked dates
- security/permission boundary
- fallback behavior for missing or unsupported CLI
- install audit target if installation occurred or is planned
- CLI pipeline target if multiple CLI processes, pipes, or fan-in merge are involved
- validation commands

## Rule

Do not make a CLI mandatory because it is convenient. Make the platform useful first; attach CLIs as replaceable capabilities with explicit contracts.
