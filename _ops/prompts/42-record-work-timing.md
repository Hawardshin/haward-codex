# Record Work Timing Prompt

Use when: 작업별 단계 소요시간과 병목 후보를 남겨야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as work-timing-recorder.
Create or update a phase-level work timing record under _history/work-timings/YYYY/.
Use _tools/work-timer/configs/work-timing-policy.json as the schema.
Record the task_id, title, work_mode, measurement_quality, phases, and bottleneck_analysis.
Prefer measured start/end timestamps or duration_seconds, but do not fabricate precision.
If the task started before timing was enabled, mark the record partial and mark unmeasured phases as not_measured.
Identify the slowest measured phase and explain whether it was necessary research, implementation, verification, rework, external waiting, or a tooling gap.
Validate the record with _tools/work-timer/src/work_timer.py check.
Link the timing record from coordination status when the task is active or recently completed.
Include timing_summary_targets in work-evaluator input when required by the selected work mode.
```

## Command

```bash
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/YYYY/YYYY-MM-DD-slug.json
python3 _tools/work-timer/src/work_timer.py summarize _history/work-timings/YYYY/YYYY-MM-DD-slug.json
```
