# 웹 검색 기록: 구조적 가드레일

## 검색 목적

사용자의 “가드레일은 필요” 지시를 플랫폼 운영 원칙으로 반영하기 전에, AI agent guardrail과 AI risk management에 대한 공신력 있는 근거를 확인했다.

## 검색어

- `AI agent guardrails official documentation OpenAI guardrails prompt safety structured outputs tools`
- `NIST AI Risk Management Framework guardrails AI systems official`
- `OWASP Top 10 for LLM Applications guardrails official`
- `Anthropic prompt engineering guardrails official documentation`

## 확인한 주요 출처

| 출처 | URL | 사용 이유 |
| --- | --- | --- |
| OpenAI Agents SDK Guardrails | https://openai.github.io/openai-agents-python/guardrails/ | guardrail이 input/output/tool 경계에서 실행되는 checks/validations라는 구조를 확인 |
| OWASP Top 10 for Large Language Model Applications | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | LLM application과 agentic AI system의 보안/안전 위험을 체계적으로 다루는 고신뢰 출처 확인 |
| NIST AI Risk Management Framework | https://www.nist.gov/itl/ai-risk-management-framework | AI 제품/서비스/시스템의 설계, 개발, 사용, 평가에 trustworthiness와 risk management를 반영해야 한다는 공식 근거 확인 |

## 계획 반영

- 가드레일을 prompt 문구가 아니라 실행 경계로 정의한다.
- 위험 표면을 security, privacy, cost, publication, deployment, destructive change, external tool call, file access, permission, high-stakes claim으로 분류한다.
- 선택 가능한 가드레일을 input filter/redaction, output schema, allowlist/denylist, tool permission, sandbox/dry-run, rate limit, human checkpoint, evaluator, test, privacy/security audit, rollback gate로 정리한다.
- 낮은 위험의 되돌릴 수 있는 작업은 가벼운 체크를 허용하고, 고위험 작업은 prompt만으로 진행하지 않게 한다.

## 남은 불확실성

- 이번 작업은 원칙과 운영 계약을 추가한 것이며, 실제 runtime permission system이나 모든 prompt 파일 linter를 구현하지 않았다.
- guardrail의 강도는 작업 위험과 되돌림 가능성에 맞춰 조절해야 한다. 과한 gate는 속도와 사용성을 떨어뜨릴 수 있다.
