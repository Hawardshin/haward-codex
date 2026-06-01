# 검증: 디자인 요소 수집에서 PPT 생성까지

## 예정 검증

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.artifact_pptx ...`
- `node .../build_artifact_deck.mjs ...`
- `unzip -l presentation-agent/artifacts/pptx/presentation-agent-kickoff.pptx`
- PPTX 텍스트 포함 여부 확인
- contact sheet 시각 검토
- `git diff --check`

## 수용 기준

- PPTX 파일이 생성되고 6개 슬라이드를 포함해야 한다.
- 주요 텍스트와 speaker notes가 PPTX 내부 XML에 존재해야 한다.
- contact sheet에서 슬라이드가 비어 있거나 겹쳐 보이지 않아야 한다.
- 디자인/에셋 출처 수집과 라이선스 게이트 원칙이 문서화되어야 한다.

