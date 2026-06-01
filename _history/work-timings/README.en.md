# Work Timing Records

This folder stores phase-level duration and bottleneck candidate records for meaningful work.

## File Rules

- Path: `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json`
- Format: follow `_tools/work-timer/configs/work-timing-policy.json`
- Check: `python3 _tools/work-timer/src/work_timer.py check <timing-json>`

## Why This Exists

- Make slow work phases easy to inspect.
- Avoid guessing where parallelization, tooling, or research process changes would help.
- Explicitly mark unmeasured spans so timing data does not create false conclusions.
