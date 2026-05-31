# 요구사항 변경: 출처 provenance와 한국 로컬 리뷰 조사

## 변경

- 추가 요구사항: `REQ-WS-017`, `REQ-WS-018`, `REQ-WS-019`
- 출처 요청: `UR-2026-05-31-041` - `UR-2026-05-31-044`

## 내용

- 중요한 원천값과 계획 단계는 근거 출처와 연결한다.
- 더 많은 세계 기술 블로그, 한국 빅테크 기술 블로그, 인도 기술 소스, 논문 검색 원천을 별도 registry에서 관리한다.
- 한국 사용자 리뷰/로컬 조사는 Naver Map, Kakao Map, Naver Blog/Search, 공식 페이지를 우선하고 후보 품질을 점수화한다.

## 영향

- `plan-from-research`, `complete-coding-research`, `evaluate-work` 입력에 provenance/evidence 필드가 추가된다.
- `source-discovery-registry.json`과 `_tools/korean-local-review/`가 운영 출처 탐색 구조에 추가된다.
