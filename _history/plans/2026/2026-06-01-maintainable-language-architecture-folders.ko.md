# 계획 기록: 유지보수 가능한 언어/아키텍처/폴더 결정

## 목적

코딩 조사에서 구현 전 언어/런타임 후보, 아키텍처 이론/실무 의견 근거, 폴더 구조 후보와 의미를 기록하도록 강화한다.

## 조사 기반 인사이트

- 언어와 프레임워크마다 공식 구조 관례가 다르므로 언어/런타임 선택은 유지보수성 기준으로 별도 기록해야 한다.
- arc42, C4, SEI 같은 아키텍처 문서화 근거와 실무자 블로그/Q&A/토론은 서로 다른 역할을 가진다.
- 폴더 구조는 코드 탐색, 소유권, 테스트 배치, 미래 확장에 영향을 주므로 구현 전 후보와 의미를 기록해야 한다.

## 계획 단계

1. `coding_research.py` 입력 모델과 gap 검사를 확장한다.
2. 새 필드 누락/불일치 테스트를 추가한다.
3. 템플릿과 프로필의 자기 설명 필드와 reference links를 갱신한다.
4. durable docs, prompts, workflows, requirements, specs, history를 갱신한다.
5. 전체 검증과 evaluator를 통과한 뒤 커밋/푸시한다.

## 검증

- `plan-from-research /private/tmp/maintainable-language-plan.json`: `ready_to_plan`
- 이후 단위/전체 테스트, config contract, memory bootstrap, grounding, work evaluation을 실행한다.

## 근거

- `_history/web-searches/2026/2026-06-01-maintainable-language-architecture-folders.ko.md`
- `_specs/workspace-platform/2026-06-01-maintainable-language-architecture-folders/plan.ko.md`
