# 요구사항 변경: 스택별 코딩 조사

## 변경 요약

- `REQ-WS-021`을 추가한다.
- 코딩 조사에서 `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, `community_signal_notes`를 필수 근거 필드로 관리한다.

## 변경 이유

사용자가 Java/Spring Boot, C, React, Next.js처럼 기술별로 참고해야 하는 공식 문서가 다르고, Stack Overflow/Reddit/GitHub 토론의 high-signal 반응도 좋은 조사 근거가 될 수 있다고 지시했다.

## 영향

- `coding-research-agent` readiness check가 스택별 공식 문서/표준과 커뮤니티 신호 해석 누락을 gap으로 잡는다.
- 코딩 조사 템플릿, 리서치 프로필, 운영 프롬프트/워크플로, 지속 지시가 갱신된다.
- 커뮤니티 반응은 사실 증명이 아니라 discovery/adoption/risk signal로 분리 기록한다.

## 검증

- `complete-coding-research` 단위 테스트에서 새 필드 누락과 기술별 공식 문서 누락을 확인한다.
- 변경된 JSON 설정과 memory bootstrap/config contract를 검증한다.
