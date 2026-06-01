# 스펙: PPT 레퍼런스 확장

## 목적

발표 에이전트가 더 좋은 PPT/슬라이드 템플릿 출처를 반복 참고하고, 사용자가 가져온 PPT를 안전하게 디자인 레퍼런스로 전환하며, 일관성 있는 템플릿 생성 기준을 갖도록 한다.

## 요구사항 연결

- `REQ-PA-011`: PPT 템플릿 레퍼런스 확장
- `REQ-PA-012`: 사용자 제공 PPT 레퍼런스화
- `REQ-PA-013`: 일관성 있는 템플릿 생성

## 범위

- `starter-reference-catalog.json`에 PPT/AI slide/template/gallery/research 출처 추가
- 미리캔버스와 Genspark식 흐름을 source notes와 workflow에 반영
- 사용자가 제공하는 PPT/PPTX를 local-only raw input으로 다루는 workflow와 안전 저장 규칙 추가
- 발표 레퍼런스 taxonomy와 README 보강

## 비범위

- 실제 PPT 템플릿 파일 대량 다운로드
- 유료/계정 제한 템플릿 우회 저장
- 고정밀 PPTX 렌더링 엔진 설치
- 사용자가 아직 제공하지 않은 PPT 파일 분석

## 성공 기준

- 카탈로그 검증이 통과한다.
- 새 workflow가 PPT 가져오기, 권한 확인, 텍스트 추출, 디자인 토큰화, template profile 생성, HTML/PPTX 생성 연결을 설명한다.
- 새 출처는 모두 URL, 접근일, 라이선스 상태, 다운로드 가능성, 변환 방식을 가진다.

