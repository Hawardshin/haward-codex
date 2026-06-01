# 작업 시간 기록

이 폴더는 의미 있는 작업의 단계별 소요시간과 병목 후보를 저장한다.

## 파일 규칙

- 경로: `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json`
- 형식: `_tools/work-timer/configs/work-timing-policy.json`을 따른다.
- 검사: `python3 _tools/work-timer/src/work_timer.py check <timing-json>`

## 사용 이유

- 어떤 단계가 오래 걸렸는지 빠르게 확인한다.
- 병렬화, 도구화, 조사 방식 개선이 필요한 부분을 감으로 판단하지 않는다.
- 측정하지 못한 구간은 명시적으로 남겨 잘못된 결론을 피한다.
