# 웹 검색 기록: 플랫폼 컨셉과 철학 재검토

## 검색 목적

사용자의 “전체적인 프로젝트 컨셉과 철학을 다시 보고 빠진 것이 있는지 확인” 요청을 처리하기 전에, agent platform/agentic system 운영 철학에서 자주 빠지는 축을 외부 근거로 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `governance`

## 검색 쿼리

- `AI agent platform design principles philosophy governance human oversight memory evaluation tool use best practices`
- `AI agents product operating model principles planning memory evaluation tools research source grounding`
- `agentic AI system design principles human oversight memory tools evaluation governance`
- `AI engineering agents context management evaluation hallucination grounding best practices`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| NIST AI Risk Management Framework, https://www.nist.gov/itl/ai-risk-management-framework | 공식 프레임워크 | AI 시스템은 governance, mapping, measurement, management를 통해 위험을 다뤄야 함 | 철학에 human authority, risk, audit, privacy를 명시 |
| Google PAIR People + AI Guidebook, https://pair.withgoogle.com/guidebook/ | 공식 가이드 | AI 제품은 사용자 목표, 신뢰, 피드백, 실패 대응을 설계해야 함 | 사용자가 최종 권한을 가진다는 철학 원칙 보강 |
| Anthropic Building Effective Agents, https://www.anthropic.com/engineering/building-effective-agents | 기술 블로그 | agent system은 단순하고 composable한 pattern, 명확한 tool use와 평가가 중요 | scoped autonomy와 되돌림 가능성 관점 보강 |
| OpenAI Evals, https://github.com/openai/evals | 오픈소스/공식 | 모델/에이전트 동작은 평가로 측정해야 함 | 기존 evaluation loop가 핵심 컨셉과 맞음을 확인 |

## 약한 출처와 제외

- 일반적인 “AI agent best practices” SEO 글은 근거로 쓰지 않았다.
- 특정 vendor의 product marketing 페이지는 철학보다는 기능 소개가 많아 보조 신호로만 보았다.

## 계획 영향

- 현재 철학은 검색, 검증, 계획, 평가, 기록은 잘 다루지만 human authority, scoped autonomy, rollback, privacy/security, operating cost/debt가 약했다.
- `_philosophy/agent-operating-philosophy.*.md`에 해당 원칙을 추가한다.
- `_philosophy/platform-concept-review.*.md`를 만들어 현재 컨셉과 gap을 남긴다.
- memory bootstrap에 철학 문서를 anchor로 추가한다.

## 불확실성

- 외부 프레임워크는 조직 규모와 규제 환경에 따라 적용 강도가 다르다. 이 저장소에는 개인 에이전트 플랫폼에 맞게 가볍게 적용했다.
