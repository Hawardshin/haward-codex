# 스펙: 철학 기반 기능 추출 구조

## 목표

사용자의 철학 원칙이 문서에만 남지 않고 기능 후보, 실행 자산, 검증, rollback, 데이터 축적으로 이어지는 구조를 만든다.

## 설계

- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
  - 18개 철학 원칙을 feature flow에 연결한다.
  - feature intake stage, candidate contract, quality gate, seed candidate를 정의한다.
- `agent-platform/src/agent_platform/governance/philosophy_features.py`
  - required principle coverage, stage completeness, candidate contract, implemented target path existence를 검사한다.
- CLI
  - `check-philosophy-features <registry.json>` 명령을 추가한다.
- 운영 연결
  - `_ops/workflows/79-philosophy-feature-extraction.md`
  - `_ops/prompts/109-philosophy-feature-extraction.md`
  - `agent-platform/configs/agents/philosophy-feature-extractor-agent.json`
  - memory bootstrap, prompt router, philosophy traceability
- UI
  - Workspace Monitor Overview에 `Philosophy Feature Factory` 패널을 추가한다.
  - customer snapshot은 내부 후보와 경로를 비운다.

## 수용 기준

- `check-philosophy-features`가 `ready`를 반환한다.
- `check-philosophy-trace`와 `check-memory-bootstrap`가 통과한다.
- `agent-platform` unittest와 `workspace-monitor` test/type/build가 통과한다.
- 고객 snapshot에 내부 후보/경로가 포함되지 않는다.
