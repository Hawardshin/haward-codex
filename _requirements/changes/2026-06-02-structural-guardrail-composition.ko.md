# 구조적 가드레일 구성 변경

## 요구사항 ID

- `REQ-WS-080`

## 사용자 요청

- `UR-2026-06-02-040`
- 사용자가 “구조적 구성 제작”을 요청했다.

## 변경 내용

- 구조적 가드레일을 실제 JSON 구성물로 작성할 수 있게 한다.
- 각 구성물은 `task`, `risk_surfaces`, `guardrails`, `execution_controls`, `source_provenance`, `plan_evidence`를 포함해야 한다.
- 고위험 또는 되돌리기 어려운 위험 표면은 hard guardrail로 덮여야 한다.
- `agent-platform` CLI는 구성 파일을 검사해 `guardrails_ready` 또는 `rework_required`를 반환해야 한다.

## 근거

- OpenAI Agents SDK는 입력, 출력, 툴 가드레일이 워크플로우의 서로 다른 지점에서 실행된다고 설명한다.
- OWASP LLM Top 10은 민감정보 노출, 과도한 agency, 출력 처리, 과신 같은 LLM 앱 위험을 다룬다.
- NIST AI RMF는 AI 위험을 식별, 측정, 관리, 거버넌스화하는 프레임을 제공한다.

## 영향

- `REQ-WS-079`의 원칙이 실행 가능한 검사 구조로 승격된다.
- 플랫폼 작업자는 실질적 위험 작업 전에 구성 파일을 만들고 CLI로 검증할 수 있다.
