# 스펙: Workspace Health 소스 구조 리팩터링

## 목표

`workspace-health`의 외부 동작을 유지하면서 소스 구조를 책임별 모듈로 분리해 유지보수성을 높인다.

## 요구사항

- `REQ-WS-034`

## 범위

- `_tools/workspace-health/src/workspace_health.py`
- `_tools/workspace-health/src/workspace_health/`
- `_tools/workspace-health/tests/test_workspace_health.py`
- `_tools/workspace-health/README.ko.md`
- `_tools/workspace-health/README.en.md`

## 구조

```text
_tools/workspace-health/src/
  workspace_health.py          # legacy script wrapper
  workspace_health/
    __init__.py
    checks.py                  # check discovery and filtering
    cli.py                     # argparse and output modes
    models.py                  # shared dataclasses/constants
    runner.py                  # command execution and serialization
```

## 동작

- 기존 명령 `python3 _tools/workspace-health/src/workspace_health.py`는 계속 동작한다.
- tests는 package module을 import한다.
- `--list`, `--json`, `--category`, `--include-build` 동작은 유지한다.

## 제외

- root-level 폴더 재배치
- 다른 `_tools/*`의 package 전환
- CI 설정 변경
