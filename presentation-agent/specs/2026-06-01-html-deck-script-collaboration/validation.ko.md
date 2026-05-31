# 검증: HTML 발표 덱과 스크립트 협업

## 예정 검증

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json presentation-agent/artifacts/html/presentation-agent-kickoff.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json`
- `rg -n "https?://|<img|<script src|<link " presentation-agent/artifacts/html/presentation-agent-kickoff.html`
- `git diff --check`

## 수용 기준

- 샘플 deck spec이 카탈로그 출처 ID와 일치해야 한다.
- HTML 산출물에 슬라이드, 발표자 노트, 키보드 이동 스크립트, 진행률이 있어야 한다.
- HTML 산출물은 원격 이미지, 외부 스크립트, 외부 스타일 링크를 포함하지 않아야 한다.

