# 구조적 가드레일 구성 스펙

## 목적

구조적 가드레일 원칙을 실제로 작성하고 검사할 수 있는 구성물로 만든다. 사용자는 실질적 위험 작업 전에 JSON 파일로 위험 표면과 실행 경계를 적고, CLI로 누락을 확인할 수 있어야 한다.

## 요구사항

- `REQ-WS-080`

## 범위

- `agent-platform`에 구조적 가드레일 구성 검사 모듈을 추가한다.
- `check-guardrail-composition` CLI 명령을 추가한다.
- 자체 설명형 템플릿 `agent-platform/configs/governance/structural-guardrail-composition-template.json`을 추가한다.
- 단위 테스트로 ready, 누락, 잘못된 참조, 비용 gate, 근거 누락 케이스를 확인한다.

## 비범위

- 외부 policy engine 설치.
- 실제 OS-level permission sandbox 구현.
- 모든 기존 프롬프트를 자동으로 재작성하는 linter 구현.

## 수용 기준

- 템플릿은 `check-config-contract`를 통과한다.
- 템플릿은 `check-guardrail-composition`에서 `guardrails_ready`를 반환한다.
- 단위 테스트가 통과한다.
- 관련 요구사항, 히스토리, 평가 기록이 남는다.
