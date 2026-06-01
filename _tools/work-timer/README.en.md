# Work Timer

Shared tool for recording phase-level task duration and summarizing bottleneck candidates.

## Purpose

- Split each task into phases such as `web_first_intake`, `memory_bootstrap`, `requirements_spec`, `implementation`, `verification`, `evaluation`, and `commit_push`.
- Show the slowest measured phase and its share of measured task time instead of only showing a total duration.
- Mark unmeasured spans as `partial` or `not_measured` instead of inventing precision.

## Main Commands

```bash
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-example.json
python3 _tools/work-timer/src/work_timer.py summarize _history/work-timings/2026/2026-06-01-example.json
```

## Record Locations

- Per-task timing records: `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json`
- Timing policy: `_tools/work-timer/configs/work-timing-policy.json`
- Coordination board link: `timing_report` in `_ops/coordination/status.json`

## Operating Rules

- Meaningful `standard`, `research`, and `governance` work should include `timing_summary_targets` in evaluator input.
- Create the timing record as early as possible when starting a task.
- If the timing system is introduced after work has already started, set `measurement_quality=partial` and mark unmeasured phases explicitly.
- Treat bottlenecks as improvement candidates, not automatic conclusions. Use `bottleneck_notes` to distinguish necessary research, external waiting, and repeated work that should be automated.
