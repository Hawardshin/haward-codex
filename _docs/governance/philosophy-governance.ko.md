# 철학 거버넌스

## 목적

`_philosophy/`는 플랫폼의 세계관을 담지만, 세계관만으로는 다음 에이전트의 행동이 보장되지 않는다. 철학 거버넌스는 각 철학 원칙이 요구사항, 정책, 워크플로, 프롬프트, 설정, 도구, 평가로 이어지는지 추적한다.

## 핵심 구조

- 철학 원문: `_philosophy/agent-operating-philosophy.ko.md`
- 실행 매핑: `agent-platform/configs/governance/philosophy-traceability.json`
- 검증 명령: `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json`
- 작업 워크플로: `_ops/workflows/78-philosophy-alignment.md`
- 재사용 프롬프트: `_ops/prompts/108-philosophy-alignment.md`

## 운영 규칙

1. 철학 원칙은 단독 문장으로 끝나면 안 된다.
2. 각 원칙은 최소한 하나의 철학 원문 위치, 하나 이상의 실행 대상, 하나 이상의 검증 대상에 연결되어야 한다.
3. 실행 대상은 실제 존재하는 파일이나 폴더여야 한다.
4. 새로운 정책이나 워크플로가 철학을 구현한다고 주장하면 `philosophy-traceability.json`에 연결한다.
5. 철학 변경 후에는 docs audit, memory bootstrap, config contract, philosophy trace check, workspace-health 중 영향을 받은 검증을 실행한다.

## 판단 기준

- 원칙이 미래 세션의 memory bootstrap에서 발견되는가?
- 원칙이 실행 정책이나 워크플로에 반영되어 있는가?
- 원칙이 close-out 평가나 workspace-health에서 검증 가능한가?
- 원칙의 실행 대상이 중복되거나 모순되면 어느 파일이 source of truth인지 알 수 있는가?
- 원칙을 따르기 위해 사람이 판단해야 하는 지점이 숨겨지지 않았는가?

## 남겨야 할 기록

의미 있는 철학 변경은 다음 기록을 남긴다.

- 요구사항 변경 및 검토
- spec, plan, tasks, validation, traceability
- 웹 검색 기록
- 요청-결과 추적
- 작업 요약
- omission, grounding, evaluation 기록

## 설계 근거

ADR와 요구사항 추적성 실무는 중요한 결정과 원칙이 이유, 결과, 검증 가능한 연결을 가져야 장기 유지보수에서 사라지지 않는다고 본다. 이 저장소에서는 그 구조를 철학까지 확장해 원칙을 실행 가능한 운영 계약으로 다룬다.
