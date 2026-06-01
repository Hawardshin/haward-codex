# 스펙: 원천 데이터 조사 소스 확장

## 배경

사용자는 세계적인 기술 블로그, 한국 빅테크 기술 블로그, 인도의 유명 기술 출처와 사람들의 블로그, 유명 논문을 찾기 위한 검색 원천을 더 많이 모으라고 요청했다. 기존 `REQ-WS-018`은 넓은 검색 원천을 요구하고 있으므로 새 요구사항을 만들기보다 해당 요구사항의 concrete seed coverage를 확장한다.

## 관련 요구사항

- `REQ-WS-003`: 모든 새 지시는 웹 검색으로 시작한다.
- `REQ-WS-016`: 대기업/고신뢰 출처 목록은 별도 registry로 관리한다.
- `REQ-WS-017`: 원천값과 계획 근거는 출처와 연결한다.
- `REQ-WS-018`: 웹 검색은 세계 기술 블로그, 한국 빅테크, 인도 기술 소스, 논문 검색 원천을 폭넓게 사용한다.

## 범위

- `source-discovery-registry.json`의 글로벌, 한국, 인도, 인도 개인/전문가, 논문 탐색 source group 확장
- `enterprise-source-registry.json`의 글로벌 고신뢰 engineering seed 보강
- `_research/source-lists/enterprise-high-quality-sites.*.md`의 사람이 읽는 요약 갱신
- 리서치 설정 README에 지역/개인/논문 출처 사용 규칙 추가
- 이번 조사 근거와 불확실성을 히스토리와 평가 파일에 저장

## 수용 기준

- 확장한 JSON 설정은 `check-config-contract`와 JSON 구문 검증을 통과해야 한다.
- 새 출처는 exact URL, 용도, evidence role을 가져야 한다.
- 개인/유튜브/커뮤니티 신호는 primary proof가 아니라 expert/context 또는 adoption signal로 분리해야 한다.
- 논문 원천은 그래프형 색인, 출판사/venue 색인, preprint, code/adoption signal을 함께 다룰 수 있어야 한다.
- 한글/영문 요약과 작업 평가가 남아야 한다.
