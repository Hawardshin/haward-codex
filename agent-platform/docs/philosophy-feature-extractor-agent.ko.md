# Philosophy Feature Extractor Agent

## 목적

사용자의 철학 원칙을 제품 기능 후보, 작은 실행 자산, 검증 게이트, rollback 계획, 고품질 데이터 기록으로 변환한다.

## 사용 시점

- 사용자가 철학이 플랫폼 기능에 충분히 반영되지 않았다고 말할 때
- 새 운영 원칙이 실제 기능, 워크플로, 도구, 스킬, 에이전트, UI 표면으로 이어져야 할 때
- capability promotion이 사용자의 철학과 어떻게 연결되는지 설명하거나 검증해야 할 때

## 입력

- `_philosophy/agent-operating-philosophy.ko.md`
- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
- `agent-platform/configs/governance/philosophy-traceability.json`
- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- 관련 요구사항, 스펙, 검증, 평가, 요청 추적, 작업 시간 기록

## 출력

- source principle ids
- principle feature flow
- human process model
- 기능 후보와 선택/거절/보류 이유
- smallest asset type
- target paths
- validation targets
- rollback plan
- high-quality data records

## 검증

```bash
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/philosophy-feature-extractor-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-features configs/orchestration/philosophy-feature-extraction-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json
```
