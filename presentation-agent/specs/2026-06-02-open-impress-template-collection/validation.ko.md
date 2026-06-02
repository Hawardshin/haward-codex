# 검증: 공개 Impress 템플릿 수집과 HTML 참조화

## 필수 검증

- `PYTHONPATH=presentation-agent/src python3 -m unittest presentation-agent/tests/test_open_template_collector.py`
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `python3 -m json.tool presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `cd presentation-agent && npm run test:browser`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-open-impress-template-collection.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-open-impress-template-collection-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-open-impress-template-collection-evaluation-input.json`

## 수동 확인

- `.otp` 파일 수가 119개인지 확인한다.
- 썸네일 수가 119개인지 확인한다.
- HTML 참조 페이지 수가 119개인지 확인한다.
- `open-impress-template-gallery.html` 첫 화면에 전체 수와 컬렉션 요약이 보이는지 확인한다.
