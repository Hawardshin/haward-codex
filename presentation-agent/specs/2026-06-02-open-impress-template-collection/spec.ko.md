# 스펙: 공개 Impress 템플릿 수집과 HTML 참조화

## 목적

발표 에이전트가 무료 발표 템플릿을 링크로만 관리하지 않고, 라이선스가 확인된 공개 원본 파일을 실제로 저장하고 HTML 참조 갤러리로 훑어볼 수 있게 한다.

## 요구사항 연결

- `REQ-PA-001`: 레퍼런스 우선 수집
- `REQ-PA-002`: 라이선스 게이트
- `REQ-PA-003`: PPTX HTML 변환
- `REQ-PA-016`: 공개 템플릿 파일 수집과 HTML 참조화

## 범위

- 공개 LibreOffice Impress 템플릿 원천을 조사한다.
- 재배포 가능성이 명확한 collection만 저장 대상으로 선택한다.
- unpacked ODF template directory를 `.otp` 파일로 패키징한다.
- 템플릿 썸네일과 `content.xml` 텍스트를 HTML 참조 카드로 변환한다.
- 전체 템플릿을 볼 수 있는 HTML 갤러리와 JSON registry를 생성한다.
- 브라우저 smoke test와 단위 테스트로 갤러리/수집기를 검증한다.

## 비범위

- LibreOffice/`soffice` 설치.
- 픽셀 단위 고화질 PPT/PPTX/ODF 렌더링.
- 재배포 제한이 있는 무료 템플릿 사이트의 원본 파일 저장.
- 유료 또는 계정 제한 템플릿 다운로드.

## 성공 기준

- 100개 이상의 license-cleared 템플릿 파일이 프로젝트 내부에 저장된다.
- 각 템플릿은 registry에 source, license, local file, thumbnail, html file, provenance를 가진다.
- HTML 갤러리와 템플릿별 HTML 참조 페이지가 생성된다.
- 수집기 단위 테스트, 전체 presentation-agent 테스트, browser gallery smoke test가 통과한다.
