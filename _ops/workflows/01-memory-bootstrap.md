# Memory Bootstrap Workflow

## Purpose

AI가 이후 세션에서 저장소 규칙, 출처 설정, 프로젝트 경계, 평가 루프를 잊지 않도록 시작 메모리 구조를 검증하고 로드한다.

## Sequence

1. Run web-first intake for the new user instruction.
2. From `agent-platform/`, run:

   ```bash
   PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
   ```

3. If the status is `memory_bootstrap_required`, resolve `gaps` before planning or editing.
4. Read `hot_context_paths` in the returned startup order.
5. Use warm anchors when the task touches their domain.
6. Use cold anchors for targeted retrieval instead of loading all history.
7. If a durable rule, source config, project registry, prompt, workflow, or map changes, update `agent-platform/configs/memory/bootstrap-manifest.json`.
8. Keep hot anchors compact. Move detailed or task-specific memory to warm/cold anchors.
9. Record meaningful memory structure changes in `_history/YYYY/YYYY-MM-DD.md`.
10. Close with `work-evaluator-agent`, then commit and push.

## Rule

The manifest is the agent's boot memory contract. If a rule must survive future sessions, it must appear in one of the manifest anchors or be reachable from one.
