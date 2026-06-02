# 발표 에이전트 요구사항 기준선

## 목적

발표 에이전트는 발표 자료 제작 전에 좋은 발표 디자인, PPT/HTML 레퍼런스, 합법적으로 사용할 수 있는 에셋, 발표 이론과 연구 근거를 먼저 조사하고, 이를 바탕으로 발표 흐름과 스크립트를 만들기 위한 프로젝트다.

## 요구사항

### REQ-PA-001 레퍼런스 우선 수집

- 발표 제작 전에 PPT, HTML 슬라이드, 템플릿 갤러리, 디자인 갤러리, 에셋 라이브러리, 발표 이론, 관련 연구를 먼저 조사한다.
- 모든 출처는 URL, 접근일, 출처 유형, 포맷, 라이선스 상태, 다운로드 가능성, HTML 변환 방식, 품질 신호를 기록한다.

### REQ-PA-002 라이선스 게이트

- 원본 PPT/PPTX/이미지/아이콘/폰트는 라이선스가 확인된 경우에만 저장한다.
- 유료, 계정 제한, 저작권 불명, 포트폴리오성 자료는 기본적으로 메타데이터만 저장한다.
- 커뮤니티 인기도는 발견 신호로만 사용하고 사용 허가로 해석하지 않는다.

### REQ-PA-003 PPTX HTML 변환

- PPT/PPTX 레퍼런스는 최종적으로 HTML 발표 자료 제작에 참고할 수 있어야 한다.
- 초기 변환 도구는 텍스트 구조와 슬라이드 순서를 HTML로 추출한다.
- 픽셀 단위 고품질 변환은 별도 도구 조사, 라이선스 검토, 렌더링 검증 이후 채택한다.

### REQ-PA-004 발표 디자인/스크립트 근거화

- 발표 흐름과 스크립트 생성은 레퍼런스 카탈로그, 발표 이론, 실제 좋은 발표 사례, 연구 근거를 기반으로 한다.
- 시각 디자인 영감과 사실 근거를 분리해 기록한다.

### REQ-PA-005 프로젝트 경계

- 발표 에이전트 고유 자료는 `presentation-agent/` 안에 둔다.
- 공통 스킬은 `_skills/`에 두되, 발표 프로젝트의 레퍼런스 카탈로그와 변환 산출물은 프로젝트 내부에 둔다.

### REQ-PA-006 스크립트 협업형 HTML 덱

- 발표 스크립트 에이전트는 슬라이드별 `script_beat`, `speaker_notes`, `evidence_sources`를 포함한 `deck-spec`을 만든다.
- HTML 덱 생성기는 `deck-spec`을 16:9 발표 형식으로 렌더링한다.
- 결과 HTML은 발표자 노트, 키보드 이동, 진행률, 인쇄 친화 구조를 포함한다.

### REQ-PA-007 레퍼런스 기반 디자인 적용

- HTML 덱은 레퍼런스 카탈로그에서 확인한 발표 프레임워크와 발표 이론의 구조적 특징을 참고하되, 원본 디자인을 복제하지 않는다.
- 원격 이미지나 저작권 불명 에셋 없이 자체 CSS와 검증된 로컬 데이터로 동작해야 한다.

### REQ-PA-008 디자인 요소 검색-수집-PPT 루프

- 발표 제작 중 디자인 요소가 필요하면 그때마다 웹 검색을 먼저 실행한다.
- 수집한 디자인/에셋 출처는 카탈로그 또는 작업별 source notes에 URL, 접근일, 라이선스 상태, 사용 목적과 함께 기록한다.
- 라이선스가 확인된 에셋만 실제 PPT/HTML 산출물에 포함한다.

### REQ-PA-009 PPTX 산출

- 발표 에이전트는 HTML 산출물뿐 아니라 editable PPTX 산출물도 만들 수 있어야 한다.
- PPTX는 `deck-spec`을 바탕으로 생성하고, 발표 스크립트의 `script_beat`, `speaker_notes`, `evidence_sources`를 보존한다.
- 가능한 경우 Presentations skill의 artifact-tool export를 우선 사용한다.

### REQ-PA-010 플랫폼/프로젝트 발표 팩

- 현재 workspace platform을 설명하는 전체 발표 덱과 등록된 루트 프로젝트별 개별 발표 덱을 만들 수 있어야 한다.
- 각 덱은 `deck-spec` JSON, HTML 산출물, 발표자 노트, 출처/근거 메모를 포함한다.
- 전체 발표는 플랫폼의 철학, 운영 루프, 프로젝트 경계, 리서치/요구사항/스펙/평가/히스토리/도구화 구조를 빠짐없이 다룬다.
- 프로젝트별 발표는 각 프로젝트의 목적, 범위, 주요 파일, 현재 산출물, 검증 방법, 다음 사용 흐름을 따로 설명한다.

### REQ-PA-011 PPT 템플릿 레퍼런스 확장

- 발표 에이전트는 미리캔버스, Canva, Microsoft Create, Slidesgo, PresentationGO, Pitch, Figma Slides, Adobe Express 같은 고품질 PPT/slide 템플릿 출처를 반복 참고할 수 있어야 한다.
- 새 템플릿 출처는 `starter-reference-catalog.json`에 URL, 접근일, 출처 유형, 라이선스 상태, 다운로드 가능성, HTML 변환 방식, 품질 신호를 기록한다.
- 한국 사용자에게 유용한 출처는 별도 태그나 메모로 구분해 실제 발표 제작 시 쉽게 고를 수 있게 한다.

### REQ-PA-012 사용자 제공 PPT 레퍼런스화

- 사용자가 PPT/PPTX 파일을 제공하면 원본 복제가 아니라 디자인 토큰, 레이아웃 archetype, 반복 컴포넌트, 섹션 리듬을 추출해 내부 template profile로 재구성한다.
- 원본 PPT/PPTX는 사용 권한과 저장 허가가 확인되기 전까지 git에 커밋하지 않는 local-only raw 영역에 둔다.
- `pptx_to_html.py`는 narrative/text structure 추출에 사용하고, 픽셀 단위 faithful conversion으로 오해하지 않는다.

### REQ-PA-013 일관성 있는 템플릿 생성

- PPT/HTML 생성은 Genspark식 단계형 흐름을 참고해 `strategy`, `substance`, `structure`, `design`, `build`를 분리한다.
- 최종 템플릿은 색상, 타이포그래피, spacing, grid, component style, layout family를 고정해 슬라이드별 편차를 줄인다.
- 새 슬라이드는 자유 배치보다 검증된 layout archetype에 내용을 배정한다.

### REQ-PA-014 발표 품질 하네스

- 발표 에이전트는 생성된 `deck-spec`, HTML 덱, PPTX 산출물을 반복 검증할 수 있는 품질 하네스 후보와 채택 기준을 관리한다.
- 즉시 적용 가능한 검증은 의존성 설치 없이 실행 가능한 `deck-spec` 정적 품질 검사, 기존 단위 테스트, 카탈로그 검증으로 시작한다.
- 브라우저 렌더링, 접근성, 시각 회귀 검증은 Playwright와 axe-core 계열을 우선 후보로 두되, 프로젝트 로컬 설치 감사와 렌더링 환경 고정이 준비된 뒤 도입한다.
- LLM/에이전트 평가 하네스는 Inspect AI, OpenAI Evals, promptfoo, DeepEval 같은 도구를 검토하되, 발표 스크립트/디자인 생성 프롬프트가 반복 실행 가능한 형태가 된 뒤 적용한다.
- 발표 특화 연구 벤치마크는 PPTAgent/PPTEval, SlideAudit, PresentBench의 평가 축을 참고하되, 논문/벤치마크 결과를 그대로 품질 보증으로 간주하지 않는다.

### REQ-PA-015 Playwright 브라우저 검증

- `presentation-agent`는 project-local Playwright Test와 `@axe-core/playwright`로 생성 HTML 덱을 검증할 수 있어야 한다.
- 검증 대상은 실제 슬라이드 구조인 `.pa-slide`를 포함한 HTML 덱으로 제한하고, 링크 인덱스 HTML은 덱 검증에서 제외한다.
- 검증은 Chromium desktop/mobile viewport에서 열림, nonblank slide, 키보드 이동, 진행률, 발표자 노트 토글, 자동 접근성 위반을 확인한다.
- Playwright 설치와 browser binary 다운로드는 `_history/installations/`와 `_ops/installations/registry.json`에 기록한다.

### REQ-PA-016 공개 템플릿 파일 수집과 HTML 참조화

- 발표 에이전트는 라이선스가 확인된 공개/free 발표 템플릿 파일을 실제로 저장하고 반복 참고할 수 있어야 한다.
- 저장 가능한 원본은 collection-level 또는 item-level 라이선스 검토를 통과해야 하며, 카탈로그에는 source URL, 다운로드 URL, 접근일, 라이선스, 재배포 메모, 로컬 파일, 썸네일, 변환 HTML 경로가 남아야 한다.
- LibreOffice Impress/ODF 템플릿처럼 PPTX가 아닌 파일도 발표 레퍼런스 파일로 저장할 수 있으나, 산출물에는 포맷과 변환 한계를 명확히 표시한다.
- LibreOffice 같은 렌더러가 없는 환경에서는 고화질 PPT/PPTX 변환이라고 주장하지 않고, 패키징된 템플릿 파일, 썸네일, 추출 가능한 텍스트, 출처를 담은 HTML 참조 페이지로 전환한다.
- 제한 약관이 있는 무료 템플릿 사이트는 raw file 저장 없이 메타데이터 또는 링크 참고로 유지한다.

## 비범위

- 저작권 불명, 계정 제한, 재배포 제한, 유료 템플릿 파일은 대량 다운로드하지 않는다.
- 이번 기준선은 픽셀 단위 PPTX/ODF 렌더링 엔진을 설치하지 않는다.
- 시각 회귀 screenshot baseline은 아직 blocking 검증으로 사용하지 않는다.
