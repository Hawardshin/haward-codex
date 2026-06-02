# 발표 레퍼런스 인덱스

이 폴더는 발표 디자인, PPT/HTML 템플릿, 발표 에셋, 발표 이론 및 연구 출처를 저장한다. 기본 원칙은 원본 파일이 아니라 출처 메타데이터와 검증 근거를 저장하는 것이다.

## 원칙

- 원천 URL, 접근일, 출처 유형, 라이선스 상태, HTML 변환 방식을 항상 기록한다.
- `download_allowed=false`인 레코드는 원본 PPT/PPTX/이미지를 저장하지 않는다.
- 커뮤니티 인기도, 좋아요 수, 조회수는 품질 발견 신호로만 사용하고 사실 근거로 단독 사용하지 않는다.
- PPTX 원본을 저장하거나 변환하려면 `configs/collection-policy.json`의 라이선스 게이트를 통과해야 한다.

## 시작 데이터

- `starter-reference-catalog.json`: 발표 에이전트가 반복 조사할 때 사용할 초기 레퍼런스 묶음.
- `open-impress-template-downloads.json`: 2026-06-02에 실제 다운로드/패키징/HTML 참조화한 공개 Impress 템플릿 119개 registry.

## 실제 파일 수집 묶음

- 공개 Impress 템플릿 묶음은 `dohliam/libreoffice-impress-templates` GitHub archive에서 가져왔다.
- 저장된 원본은 PPTX가 아니라 LibreOffice Impress `.otp` 템플릿이다.
- HTML 변환은 고화질 렌더링이 아니라 썸네일, 출처, 라이선스, 추출 텍스트를 보존하는 참조 페이지다.
- 전체 갤러리는 `presentation-agent/artifacts/html/open-impress-template-gallery.html`에서 본다.

## PPT 레퍼런스 확장 규칙

- 미리캔버스, Canva, Slidesgo, Microsoft Create, Pitch, Figma, Adobe Express 같은 템플릿 출처는 먼저 메타데이터로만 저장한다.
- 원본 PPT/PPTX 파일은 사용 권한, 저장 가능 여부, attribution 조건을 확인하기 전까지 저장하지 않는다.
- 사용자가 직접 PPT를 제공하면 원본을 복제하지 말고 색상, 타이포그래피, spacing, layout archetype, 반복 컴포넌트, 섹션 리듬을 추출해 내부 template profile로 만든다.
- Genspark식 생성 흐름은 `strategy -> substance -> structure -> design -> build` 단계로 참고하되, 최종 산출물은 레퍼런스 출처와 디자인 토큰이 남아야 한다.
