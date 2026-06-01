# Workspace Health 도구

## 목적

저장소 전체의 기본 건강 상태를 한 번에 점검한다. 개별 감사 도구와 프로젝트 테스트를 기억하지 않아도, 핵심 운영 구조가 깨졌는지 빠르게 확인할 수 있게 한다.

## 명령

저장소 루트에서 실행한다.

```bash
python3 _tools/workspace-health/src/workspace_health.py
```

실행할 검사 목록만 볼 때:

```bash
python3 _tools/workspace-health/src/workspace_health.py --list
```

범주별로 일부만 실행할 때:

```bash
python3 _tools/workspace-health/src/workspace_health.py --category governance
python3 _tools/workspace-health/src/workspace_health.py --category projects --category tools
```

자동화나 dashboard에서 재사용할 JSON 출력:

```bash
python3 _tools/workspace-health/src/workspace_health.py --json
python3 _tools/workspace-health/src/workspace_health.py --list --json
```

Next.js static build까지 포함할 때:

```bash
python3 _tools/workspace-health/src/workspace_health.py --include-build
```

## 검사 범주

- `governance`: 문서/구조 감사, map/board freshness, memory/config 계약
- `projects`: `agent-platform`, `presentation-agent` 테스트
- `tools`: `_tools/*/tests` 테스트
- `frontend`: `workspace-monitor` 테스트와 typecheck, 선택적 build

## 소스 구조

```text
src/
  workspace_health.py          # 기존 명령을 보존하는 wrapper
  workspace_health/
    __init__.py
    checks.py                  # check discovery, check 목록 구성, category filter
    cli.py                     # argparse, 사람용 출력, JSON 출력
    models.py                  # Check dataclass, category 상수
    runner.py                  # subprocess 실행, 결과 직렬화, command 표시
```

외부에서는 계속 `python3 _tools/workspace-health/src/workspace_health.py`를 사용한다. 내부 테스트나 새 코드에서는 `workspace_health.checks`, `workspace_health.runner`처럼 package module을 import한다.

## 입력

- `_docs/registry.json`
- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `_ops/coordination/status.json`
- `agent-platform/configs/**`
- 각 프로젝트와 도구의 test directory

## 출력

- 표준 출력의 check별 pass/fail 요약
- `--list`의 실행 전 check 목록
- `--json`의 machine-readable 요약
- 실패 시 해당 command, stdout, stderr

## 검증

```bash
python3 -m unittest discover -s _tools/workspace-health/tests
python3 _tools/workspace-health/src/workspace_health.py --list
python3 _tools/workspace-health/src/workspace_health.py --category governance --json
```
