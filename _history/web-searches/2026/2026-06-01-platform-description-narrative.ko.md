# 웹 검색 기록: 플랫폼 설명 강화

## 검색 목적

사용자의 “이 플랫폼에 대한 설명을 더 자세히, 멋지게 적기” 요청을 처리하기 전에, 에이전트 플랫폼 설명에서 강조해야 할 축과 기술 문서 서술 기준을 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `standard`

## 검색 쿼리

- `AI agent platform README value proposition governance memory evaluation documentation best practices`
- `agentic AI platform architecture memory tools evaluation governance description`
- `AI engineering agent platform product narrative knowledge base workflows evaluation`
- `developer documentation README overview value proposition best practices official style guide`
- `Google developer documentation style guide overview audience documentation`
- `Diataxis documentation framework explanation how-to reference tutorial concept`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| NIST AI Risk Management Framework, https://www.nist.gov/itl/ai-risk-management-framework | 공식 프레임워크 | AI 시스템은 governance, measurement, management를 함께 다뤄야 한다. | 플랫폼 설명에 평가, 재작업, governance, 위험 경계를 포함 |
| Google PAIR People + AI Guidebook, https://pair.withgoogle.com/guidebook/ | 공식 가이드 | AI 제품은 사용자 목표, 신뢰, 피드백, 실패 대응을 중심으로 설계해야 한다. | 사용자 의도, 최종 권한, 이어받기 쉬운 구조를 강조 |
| Anthropic Building Effective Agents, https://www.anthropic.com/engineering/building-effective-agents | 기술 블로그 | 효과적인 에이전트는 단순하고 조합 가능한 패턴, 명확한 도구 사용, 평가가 중요하다. | 반복 능력 승격과 composable tools/skills 설명에 반영 |
| OpenAI Evals, https://github.com/openai/evals | 오픈소스/공식 | 모델/에이전트 동작은 반복 가능한 평가로 확인해야 한다. | evaluator와 hallucination guard가 플랫폼 핵심임을 설명 |
| Google Developer Documentation Style Guide, https://developers.google.com/style/ | 공식 스타일 가이드 | 기술 문서는 명확하고 일관된 언어로 개발자와 실무자가 이해할 수 있게 써야 한다. | 루트 README는 첫 문단부터 정체성과 사용 맥락을 명확히 설명 |
| Diataxis, https://diataxis.fr/ | 문서 프레임워크 | 문서는 tutorial, how-to, reference, explanation처럼 독자 목적별로 나뉜다. | `platform-identity-operating-model`을 explanation 성격 문서로 추가 |

## 약한 출처와 제외

- agent platform 상용 제품 랜딩 페이지는 표현 참고로만 보고, 사실 근거로 쓰지 않았다.
- 일반 SEO성 “AI agent best practices” 글은 출처 품질이 낮아 계획 근거에서 제외했다.

## 계획 영향

- 루트 README의 첫 부분에 “AI 작업 OS” 성격의 플랫폼 설명을 추가한다.
- `_docs/operating-models/platform-identity-operating-model.*.md`를 추가해 상세 설명을 별도 explanation 문서로 관리한다.
- `agent-platform/README.md`의 중심 프로젝트 역할 설명을 플랫폼 레이어 관점으로 보강한다.
- memory bootstrap에 플랫폼 아이덴티티 문서를 warm anchor로 추가한다.

## 불확실성

- “멋지게”의 톤은 사용자의 취향에 따라 더 제품 소개형, 더 기술 문서형, 더 선언문형으로 조정될 수 있다. 이번 변경은 기술 문서의 명확성과 플랫폼 정체성을 우선했다.
