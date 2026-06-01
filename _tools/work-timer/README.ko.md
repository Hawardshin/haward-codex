# Work Timer

작업별 단계 소요시간을 기록하고 병목 후보를 요약하는 공유 도구다.

## 목적

- 각 작업을 `web_first_intake`, `memory_bootstrap`, `requirements_spec`, `implementation`, `verification`, `evaluation`, `commit_push` 같은 phase로 나눠 기록한다.
- 전체 시간이 아니라 가장 오래 걸린 measured phase와 비율을 보여준다.
- 측정하지 못한 구간은 `partial` 또는 `not_measured`로 표시해 거짓 정밀도를 만들지 않는다.

## 주요 명령

```bash
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-example.json
python3 _tools/work-timer/src/work_timer.py summarize _history/work-timings/2026/2026-06-01-example.json
```

## 기록 위치

- 작업별 timing record: `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json`
- timing policy: `_tools/work-timer/configs/work-timing-policy.json`
- coordination board 연결: `_ops/coordination/status.json`의 `timing_report`

## 운영 규칙

- 의미 있는 `standard`, `research`, `governance` 작업은 평가 입력에 `timing_summary_targets`를 포함한다.
- 작업을 시작할 때 가능한 한 timing record를 먼저 만든다.
- 이미 진행 중이던 작업에 도입했다면 `measurement_quality=partial`로 두고 측정하지 못한 phase를 명시한다.
- 병목은 자동 결론이 아니라 개선 후보로 다룬다. 긴 단계가 필요한 조사였는지, 외부 대기였는지, 도구화할 반복 작업인지 `bottleneck_notes`에 남긴다.
