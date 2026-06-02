# 구조적 가드레일 구성 웹 검색 기록

## 요청

- `UR-2026-06-02-040`
- 사용자가 “구조적 구성 제작”을 요청했다.

## 검색 시각

- 2026-06-02

## 검색어

- `AI guardrail architecture input output tool guardrails official documentation template`
- `LLM application guardrails risk controls allowlist schema human approval rollback best practices official`
- `OpenAI Agents SDK guardrails workflow boundaries tool guardrails official`
- `OWASP Top 10 for LLM Applications prompt injection sensitive information disclosure excessive agency`
- `NIST AI Risk Management Framework official govern map measure manage`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 사용 |
| --- | --- | --- | --- |
| OpenAI Agents SDK Guardrails | 공식 문서 | 입력/출력/툴 가드레일은 워크플로우의 서로 다른 지점에서 실행된다. 툴 가드레일은 툴 호출 전후에 검증/차단을 둘 수 있다. | guardrail type과 workflow boundary 설계 |
| OWASP Top 10 for LLM Applications | 보안 표준/커뮤니티 프로젝트 | prompt injection, sensitive information disclosure, excessive agency, insecure output handling, overreliance 등이 LLM 앱 위험으로 제시된다. | risk category와 material-risk 판단 |
| NIST AI RMF | 정부 프레임워크 | AI 위험을 식별, 측정, 관리, 거버넌스화하는 프레임을 제공한다. | risk-first composition과 evidence 요구 |

## 약한 출처 처리

- Reddit과 일반 블로그는 구조 설계 아이디어 탐색에는 유용하지만 이번 구현의 사실 근거로 사용하지 않았다.
- 상업적 요약 사이트는 OWASP/NIST/OpenAI의 1차 출처가 있으므로 보조 신호로만 보았다.

## 계획 영향

- prompt 문구가 아니라 `risk_surfaces -> guardrails -> execution_controls -> verification_evidence` 순서로 구성한다.
- 고위험/irreversible 위험 표면은 hard guardrail을 요구한다.
- security/privacy, deployment/destructive change, external tool/file/permission, cost, publication/high-stakes claim은 각기 다른 gate를 요구한다.
- 구성 파일 자체는 `check-config-contract`를 통과하게 만들어 다음 작업자가 파일만 열어도 구조를 이해할 수 있게 한다.

## 불확실성

- 하나의 보편적 guardrail set이 모든 상황에 최적인 것은 아니다.
- 이번 구현은 구조적 구성과 검사기이며, OS-level sandbox나 외부 policy engine은 구현하지 않았다.

## 공개 판단 요약

- 구조적 가드레일은 위험 표면별로 선택되어야 하며, 각 가드레일은 허용 행동, 차단 행동, 실패 시 처리, 검증 증거를 갖춰야 한다.
