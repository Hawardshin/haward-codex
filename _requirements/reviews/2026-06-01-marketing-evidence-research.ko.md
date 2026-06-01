# 요구사항 검토: 마케팅/설문/정량 근거 조사

## 검토 대상

- `REQ-WS-029`

## 검토 결과

- 상태: 승인
- 작업 모드: `governance`
- 범위: `agent-platform/configs/research/`, `_research/source-lists/`, `_docs/`, `AGENTS.md`, `_history/`

## 검토 메모

- 사용자의 요청은 특정 프로젝트 산출물보다 앞으로 반복될 조사 방식의 개선이다.
- 마케팅 근거 조사는 책/이론, 설문, 공식 통계, 산업 리포트, 플랫폼 데이터가 서로 다른 증거 역할을 가진다.
- AAPOR, ESOMAR, Pew, Gallup 같은 방법론 출처는 설문 claim 품질을 판단하는 기준으로 적합하다.
- CMO Survey, DataReportal, World Bank, KOSIS, Google Books, Crossref 등은 search origin 또는 metadata source이지 자동적인 사실 증명은 아니다.

## 승인된 수용 기준

- 마케팅 evidence profile이 존재하고 설정 파일만 열어도 사용 규칙과 출처군을 이해할 수 있다.
- research/source discovery 설정과 README가 새 profile을 참조한다.
- 숫자 근거와 설문 근거에 필요한 필드가 명시된다.
- 한국 시장 조사에서도 KOSIS, OpenSurvey, Naver/Kakao 계열 신호를 별도로 확인하는 구조가 남는다.
