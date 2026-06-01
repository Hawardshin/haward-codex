# Deck Spec

이 폴더는 발표 스크립트 에이전트와 HTML 덱 생성기가 공유하는 계약을 저장한다. `deck-spec`은 슬라이드 내용뿐 아니라 발표 흐름, 발표자 노트, 근거 출처를 함께 담는다.

## 작성 원칙

- `reference_sources`와 `slides[].evidence_sources`는 `data/reference-index/starter-reference-catalog.json`의 ID를 사용한다.
- `script_beat`는 발표 스크립트 에이전트가 만든 흐름 역할을 적는다.
- `speaker_notes`는 실제 발표자가 말할 순서의 짧은 문장으로 작성한다.
- HTML 덱은 원격 이미지나 복제한 디자인 에셋 없이 자체 CSS로 렌더링한다.

## 생성 명령

```bash
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json presentation-agent/artifacts/html/presentation-agent-kickoff.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.artifact_pptx presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json outputs/manual-presentation-agent/presentations/presentation-agent-kickoff --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
```
