# Record Work Timing Workflow

## Purpose

작업별로 어디에서 시간이 오래 걸렸는지 나중에 바로 볼 수 있도록 phase 단위 timing record를 남긴다.

## Sequence

1. After web-first intake, memory bootstrap, and work mode selection, create or reserve a timing record path under `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json`.
2. Use `_tools/work-timer/configs/work-timing-policy.json` as the schema and phase vocabulary.
3. Record phase spans for the work where possible:
   - `web_first_intake`
   - `memory_bootstrap`
   - `mode_boundary_planning`
   - `requirements_spec`
   - `implementation`
   - `verification`
   - `evaluation`
   - `commit_push`
4. If timing was not measured from the start, set `measurement_quality` to `partial` and mark affected phases with `measurement=not_measured`.
5. Add `bottleneck_notes` for long phases to distinguish necessary research, external waiting, rework, tool gaps, or avoidable manual repetition.
6. Validate the timing record:

```bash
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/YYYY/YYYY-MM-DD-<slug>.json
```

7. Summarize the timing record when updating coordination status, work summaries, or evaluations:

```bash
python3 _tools/work-timer/src/work_timer.py summarize _history/work-timings/YYYY/YYYY-MM-DD-<slug>.json
```

8. Link the timing record from `_ops/coordination/status.json` using `timing_report` when the task is active or recently completed.
9. Include the timing record in `timing_summary_targets` when the selected work mode makes it required.

## Rule

Do not invent exact timing. Partial timing is useful when honestly labeled; false precision makes bottleneck decisions worse.
