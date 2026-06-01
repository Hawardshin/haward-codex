# 스펙: 마케팅/설문/정량 근거 조사

## 요구사항

- `REQ-WS-029`

## 문제

마케팅 자료조사는 책의 이론, 설문 결과, 공식 통계, 시장 리포트, 플랫폼 행동 신호를 함께 사용한다. 이 출처들이 뒤섞이면 숫자의 base, 지역, 기간, 방법론, 스폰서가 사라져 계획의 근거가 약해진다.

## 목표

- 마케팅/시장 규모/소비자 인사이트/설문/책/정량 근거 조사에 전용 profile을 제공한다.
- 출처군과 evidence lane을 설정 파일에서 바로 이해할 수 있게 한다.
- 정량 수치 추출 필드와 설문 방법론 체크를 표준화한다.
- 연구 설정, source discovery, memory bootstrap, 문서, 이력에 새 profile을 연결한다.

## 비목표

- 실제 유료 리포트나 책 본문을 저장하지 않는다.
- 특정 마케팅 캠페인 전략을 작성하지 않는다.
- 외부 API 클라이언트를 새로 설치하지 않는다.

## 수용 기준

- `agent-platform/configs/research/marketing-evidence-profile.json`이 존재한다.
- `source-registry.json`, `research-agent-profile.json`, `source-discovery-registry.json`, README가 새 profile을 참조한다.
- `_research/source-lists/marketing-evidence-sources.ko.md`와 `.en.md`가 반복 참고용 출처 목록을 제공한다.
- memory bootstrap manifest가 `marketing_evidence_profile` anchor를 required로 포함한다.
- config contract, memory bootstrap, grounding, evaluation 검증을 통과한다.
