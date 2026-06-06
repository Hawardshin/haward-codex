# Tool Usage Integration 스펙

## 목표

Codex가 작업 중 사용하는 도구 루프를 플랫폼 내부 데이터와 Tool Studio UI로 승격한다. 사용자는 툴 제작 화면에서 “어떤 도구를 어떤 순서로 쓰고, 무엇을 증거로 남기며, 어떤 검증 명령을 실행해야 하는지”를 볼 수 있어야 한다.

## 설계 결정

- `platform-desktop-app/configs/tool-usage-integration-registry.json`를 source of truth로 둔다.
- `collectToolUsageIntegration()`이 레지스트리를 camelCase snapshot 모델로 정규화한다.
- `WorkspaceToolUsageIntegration` 타입을 추가해 UI가 구조화된 데이터를 받는다.
- Tool Studio의 기존 3-column workbench 안에 `Agent Tool Playbook` 리스트와 상세 패널을 배치한다.
- customer snapshot은 내부 source path와 backlog target path를 제거한다.

## 데이터 계약

필수 top-level 필드:
- `summary`
- `referenceLinks`
- `patterns`
- `verificationLadders`
- `adoptionBacklog`

패턴 필수 의미:
- `toolSurfaces`: 사용하는 도구 표면
- `sequence`: 실행 순서
- `evidenceOutputs`: 남겨야 하는 증거
- `validationCommands`: 실행 가능한 검증 명령
- `failureModes`: 반복적으로 막아야 하는 실패 형태

## 수용 기준

- generated snapshot에 `toolUsageIntegration.summary.totalPatterns > 0`.
- Tool Studio source에 `data-tool-usage-playbook`가 존재한다.
- test suite가 collector, customer snapshot, Tool Studio UI 계약을 확인한다.
- build와 desktop package가 성공한다.
