# 스펙: 스택별 코딩 조사

## 배경

사용자는 Java/Spring Boot, C, React, Next.js처럼 기술에 따라 참고해야 하는 공식 문서가 다르며, 이슈가 됐던 토론과 Stack Overflow/Reddit/GitHub의 반응이 좋은 조사 신호가 될 수 있다고 지시했다.

## 목표

- 코딩 조사 입력에 기술 스택, 공식 문서/표준, 버전 제약을 기록한다.
- high-signal 이슈/토론 출처와 커뮤니티 신호 해석을 기록한다.
- 기술별 공식 문서 누락과 토론 신호 누락을 구현 전 gap으로 막는다.

## 범위

- `coding-research-agent` readiness checker
- coding research profile과 template
- 운영 프롬프트/워크플로, 지속 지시, 문서
- 요구사항/히스토리/평가 산출물

## 비범위

- 모든 기술별 공식 문서 목록의 완전한 catalog 작성
- Stack Overflow/Reddit/GitHub API 자동 수집 도구 구현
- 특정 프로젝트의 실제 기술 선택

## 성공 기준

- 새 필드 누락 시 `complete-coding-research`가 `more_research_required`를 반환한다.
- Spring Boot, C, React, Next.js 같은 known stack의 공식 문서가 빠지면 gap이 생긴다.
- 커뮤니티 신호는 사실 증명이 아니라 adoption/discovery/risk signal로 문서화된다.
