# 구조적 가드레일 구성 평가

## 요청

- `UR-2026-06-02-040`
- 사용자는 “구조적 구성 제작”을 요청했다.

## 결과 요약

- `REQ-WS-080`을 추가했다.
- 구조적 가드레일 구성 검사 모듈을 `agent-platform/src/agent_platform/governance/guardrail_composition.py`에 추가했다.
- `agent-platform` CLI에 `check-guardrail-composition` 명령을 추가했다.
- 자체 설명형 템플릿 `agent-platform/configs/governance/structural-guardrail-composition-template.json`을 추가했다.
- 단위 테스트 `agent-platform/tests/test_guardrail_composition.py`를 추가했다.
- 메모리 부트스트랩, 요구사항, 스펙, 요청 추적, 작업 요약, 평가 기록에 연결했다.

## 초기 지시 대비 평가

- “구조적 구성”은 문서만으로 끝내지 않고 실제 작성/검사 가능한 JSON 구성물과 CLI로 구현했다.
- 기존 `REQ-WS-079`의 원칙과 겹치지 않도록 `REQ-WS-080`은 구현 가능한 구성/검사 요구사항으로 분리했다.
- OS-level sandbox나 외부 policy engine은 이번 범위 밖으로 명확히 남겼다.

## 검증

| 검증 | 결과 |
| --- | --- |
| `check-config-contract` | `self_documenting` |
| `check-guardrail-composition` | `guardrails_ready` |
| `test_guardrail_composition.py` | 5 tests passed |
| `agent-platform` 전체 단위 테스트 | 159 tests passed |
| `check-memory-bootstrap` | `ready_to_bootstrap` |
| `docs-audit --check` | `docs_ready` |
| `workspace-index --check` | 통과 |
| `task-board --check` | 통과 |
| `work_timer check` | `ready`, phase duration 미측정 warning |
| `check-omissions` | `coverage_ready` |
| `check-grounding` | `ready_to_publish` |
| `evaluate-work` | `ready_to_close` |
| `workspace-health --json` | `passed`, 25 checks, 0 failed |
| `git diff --check` | clean |

## 참고한 근거

- OpenAI Agents SDK Guardrails: `https://openai.github.io/openai-agents-python/guardrails/`
- OWASP Top 10 for LLM Applications: `https://owasp.org/www-project-top-10-for-large-language-model-applications/`
- NIST AI Risk Management Framework: `https://www.nist.gov/itl/ai-risk-management-framework`
- 이전 내부 요구사항: `REQ-WS-078`, `REQ-WS-079`

## 남은 개선 후보

- 프로젝트별 guardrail composition 예시를 반복 위험 유형별로 추가한다.
- material-risk step이 있는데 guardrail composition target이 없는 prompt/workflow를 찾는 lightweight linter를 추가한다.

## 결론

- 요청은 충족됐다.
- blocking gap은 없다.
