# Presentation Agent

`presentation-agent`는 발표 자료를 만들기 전에 좋은 발표 디자인, PPT/HTML 슬라이드 레퍼런스, 합법적으로 재사용 가능한 에셋, 발표 흐름 근거를 수집하고 검증하는 프로젝트다.

## 현재 범위

- 많은 발표 디자인 레퍼런스를 링크와 메타데이터로 저장한다.
- PPT/PPTX 원본은 라이선스가 확인된 경우에만 저장한다.
- PPTX 파일은 우선 텍스트 구조를 HTML로 추출하고, 고품질 시각 변환은 별도 렌더러나 수동 HTML 재구성 대상으로 분리한다.
- 발표 스크립트/흐름 생성 에이전트가 참고할 수 있도록 디자인 패턴, 출처, 라이선스, 변환 가능성을 함께 기록한다.
- 발표 스크립트 에이전트와 협업할 수 있는 `deck-spec` JSON을 HTML 발표 덱으로 렌더링한다.
- 미리캔버스, Canva, Slidesgo, Pitch, Figma, Genspark 같은 PPT/AI slide 출처를 메타데이터로 수집하고, 사용자가 제공한 PPT는 local-only 분석 후 내부 template profile로 재구성한다.

## 폴더 구조

```text
presentation-agent/
  artifacts/              # 생성된 HTML/PPTX 산출물
  configs/                # 카탈로그와 수집 정책 설정
  data/
    assets/               # 라이선스 확인 후 저장 가능한 에셋만 보관
    conversions/          # PPTX->HTML 변환 결과와 변환 메모
    deck-specs/           # 발표 스크립트와 슬라이드 구조 협업 계약
    reference-index/      # 발표 디자인/에셋 레퍼런스 카탈로그
  docs/
    design/               # 디자인 분류와 평가 기준
    requirements/         # 프로젝트 요구사항
    research/             # 조사 요약과 근거
    scripts/              # 발표 순서, 대본 운영 가이드
    source-notes/         # 발표 근거와 출처 노트
  specs/                  # spec-driven 산출물
  src/presentation_agent/ # Python-first 도구 코드
  tests/                  # 단위 테스트
```

## 주요 파일

- `data/reference-index/starter-reference-catalog.json`: 50개 이상의 발표 디자인/HTML/에셋 출처 카탈로그.
- `configs/collection-policy.json`: 출처 수집, 라이선스 게이트, PPTX HTML 변환 정책.
- `docs/workflows/imported-ppt-reference-workflow.ko.md`: 사용자가 가져온 PPT/PPTX를 디자인 토큰과 레이아웃 archetype으로 전환하는 workflow.
- `data/assets/raw/user-provided/`: 사용자가 제공한 PPT/PPTX를 임시 분석하는 local-only 위치.
- `src/presentation_agent/catalog.py`: 카탈로그 검증과 요약 CLI.
- `src/presentation_agent/pptx_to_html.py`: 라이선스가 허용된 PPTX를 기본 HTML 구조로 변환하는 최소 도구.
- `src/presentation_agent/html_deck.py`: 발표 스크립트가 포함된 `deck-spec`을 HTML 발표 덱으로 렌더링하는 도구.
- `src/presentation_agent/artifact_pptx.py`: `deck-spec`을 editable PPTX 생성을 위한 artifact-tool slide workspace로 변환하는 도구.
- `data/deck-specs/presentation-agent-kickoff.ko.json`: 발표 에이전트 소개용 샘플 deck spec.
- `artifacts/html/presentation-agent-kickoff.html`: 생성된 HTML 발표 샘플.
- `artifacts/pptx/presentation-agent-kickoff.pptx`: 생성된 PPTX 발표 샘플.
- `data/deck-specs/workspace-platform-overview.ko.json`: 현재 저장소 플랫폼 전체 발표 deck spec.
- `data/deck-specs/project-agent-platform.ko.json`: `agent-platform` 프로젝트별 발표 deck spec.
- `data/deck-specs/project-workspace-monitor.ko.json`: `workspace-monitor` 프로젝트별 발표 deck spec.
- `data/deck-specs/project-presentation-agent.ko.json`: `presentation-agent` 프로젝트별 발표 deck spec.
- `artifacts/html/platform-presentation-pack-index.html`: 플랫폼 발표 팩 HTML 인덱스.
- `docs/scripts/2026-06-01-platform-presentation-pack.ko.md`: 발표 순서와 사용 가이드.
- `docs/source-notes/2026-06-01-platform-presentation-pack.ko.md`: 발표 근거와 출처 노트.

## 검증 명령

```bash
PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json presentation-agent/artifacts/html/presentation-agent-kickoff.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.artifact_pptx presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json outputs/manual-presentation-agent/presentations/presentation-agent-kickoff --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/workspace-platform-overview.ko.json presentation-agent/artifacts/html/workspace-platform-overview.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
```
