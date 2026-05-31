# 메모리 부트스트랩 에이전트

`memory-bootstrap-agent`는 새 세션에서 AI가 저장소 규칙과 설정을 잊지 않도록, 반드시 로드해야 하는 durable memory anchor를 검증한다.

## 목적

- 채팅 기억에 의존하지 않는다.
- 시작 시 읽을 hot context와 필요할 때 찾을 warm/cold context를 나눈다.
- 어떤 문서와 설정이 필수인지 `agent-platform/configs/memory/bootstrap-manifest.json`에 기록한다.
- 필수 파일이 없거나 startup sequence가 깨지면 `ready_to_bootstrap`이 아니라 `memory_bootstrap_required`를 반환한다.

## 메모리 티어

| Tier | 역할 |
| --- | --- |
| `hot` | 새 세션에서 항상 먼저 읽어야 하는 작은 핵심 규칙과 설정 |
| `warm` | 작업 유형에 따라 바로 확인해야 하는 정책, 워크플로, 현재 히스토리 |
| `cold` | 필요할 때 검색하거나 참조하는 맵, 긴 히스토리, 상세 문서 |

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

결과가 `ready_to_bootstrap`이면 `hot_context_paths`를 먼저 읽고 작업한다. `memory_bootstrap_required`면 `gaps`를 해결한 뒤 진행한다.

## 관련 파일

- Manifest: `agent-platform/configs/memory/bootstrap-manifest.json`
- Agent config: `agent-platform/configs/agents/memory-bootstrap-agent.json`
- Python 구현: `agent-platform/src/agent_platform/memory/bootstrap.py`
- 운영 프롬프트: `_ops/prompts/01-memory-bootstrap.md`
- 운영 워크플로: `_ops/workflows/01-memory-bootstrap.md`
