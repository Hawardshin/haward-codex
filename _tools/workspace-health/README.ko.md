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

Next.js static build까지 포함할 때:

```bash
python3 _tools/workspace-health/src/workspace_health.py --include-build
```

## 입력

- `_docs/registry.json`
- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `_ops/coordination/status.json`
- `agent-platform/configs/**`
- 각 프로젝트와 도구의 test directory

## 출력

- 표준 출력의 check별 pass/fail 요약
- 실패 시 해당 command, stdout, stderr

## 검증

```bash
python3 -m unittest discover -s _tools/workspace-health/tests
python3 _tools/workspace-health/src/workspace_health.py --list
```
