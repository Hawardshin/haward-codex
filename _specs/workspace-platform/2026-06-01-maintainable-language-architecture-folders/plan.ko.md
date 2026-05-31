# 계획: 유지보수 가능한 언어/아키텍처/폴더 결정

## 모드

- 작업 모드: `governance`
- 이유: 공통 운영 규칙, agent readiness, 문서, 요구사항 baseline이 바뀐다.

## 단계

1. 웹 검색으로 언어별 구조 문서와 아키텍처 근거 유형을 확인한다.
2. `REQ-WS-022`와 스펙 산출물을 만든다.
3. `coding-research-agent` 입력 모델과 gap 검사를 확장한다.
4. 템플릿, 프로필, 프롬프트, 문서를 업데이트한다.
5. 테스트와 config/memory/grounding/evaluation 검증을 수행한다.
6. 평가 보고서, 요청 추적, 작업 요약을 저장하고 커밋/푸시한다.

## 근거 연결

- 공식 구조 문서: Spring Boot, Next.js, PyPA, Go
- 아키텍처 이론 근거: arc42, C4, SEI
- 실무 의견 근거: Martin Fowler, Stack Overflow/Reddit/GitHub discussions
