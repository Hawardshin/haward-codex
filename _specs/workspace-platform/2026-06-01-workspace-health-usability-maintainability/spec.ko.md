# 스펙: Workspace Health 사용성/유지보수성

## 목표

`workspace-health`를 사람이 쓰기 쉽고, 자동화에서도 안정적으로 재사용할 수 있게 한다.

## 요구사항

- `REQ-WS-033`

## 범위

- `_tools/workspace-health/src/workspace_health.py`
- `_tools/workspace-health/tests/test_workspace_health.py`
- `_tools/workspace-health/README.ko.md`
- `_tools/workspace-health/README.en.md`

## 동작

- 모든 check는 `governance`, `projects`, `tools`, `frontend` 중 하나의 category를 가진다.
- `--category <name>`은 해당 category만 실행하고, 여러 번 지정할 수 있다.
- `--list`는 category와 상대 cwd를 포함한 command 목록을 출력한다.
- `--json`은 pure JSON을 출력한다.
- 실패한 check는 JSON에 stdout/stderr를 포함한다.

## 제외

- CI workflow 추가
- Workspace Monitor UI integration
