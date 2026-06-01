# 2026-06-01 코딩 프로젝트 bootstrap 평가

## 평가 입력

- 작업 모드: `standard`
- 초기 지시: 신규 코딩 프로젝트를 다양한 기술 기반으로 쉽게 시작하고, 현재 위치나 특정 위치에 가져와 사용할 수 있으며, 프로젝트 간 분리와 낭비 방지를 유지하고, 관리 플랫폼에도 반영되는 구조를 요청함.
- 결과 요약: dry-run 우선 `coding-project-bootstrap` 도구, 기술별 blueprint config, root project 등록 옵션, nested target 지원, workflow/prompt/router/memory 연결, 요구사항/스펙/히스토리/모니터링 반영을 추가했다.

## 확인한 레퍼런스

- Backstage Software Templates: https://backstage.io/docs/features/software-templates
- Backstage Writing Templates: https://backstage.io/docs/features/software-templates/writing-templates/
- Copier generating projects: https://copier.readthedocs.io/en/stable/generating/
- Nx Workspace Generators: https://nx.dev/docs/reference/workspace/generators
- Backstage software-templates GitHub: https://github.com/backstage/software-templates
- `_ops/workflows/25-project-boundary-management.md`
- `_ops/projects/registry.json`
- `agent-platform/configs/research/coding-research-profile.json`
- `_docs/policies/open-source-installation-policy.ko.md`

## 검증

- `python3 -m unittest discover -s _tools/coding-project-bootstrap/tests`: pass, 5 tests
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list`: pass, 7 blueprints
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan sample-agent --blueprint python-agent --register`: pass, registry entry 포함 dry-run plan
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper`: pass, nested target plan 및 registry entry 없음
- `check-config-contract`: pass, `self_documenting`
- `check-memory-bootstrap`: pass, `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: pass
- `python3 _tools/task-board/src/task_board.py`: pass
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: pass, 20 checks
- `check-grounding`: pass, `ready_to_publish`
- `evaluate-work`: pass, `ready_to_close`

## 평가 결과

- 상태: `ready_to_close`
- blocking gap: 없음
- 커밋/push: 예정
- 개선 아이디어:
  - CLI flag 대신 질문형 안내가 필요하면 interactive mode를 추가한다.
  - 실제 생성 프로젝트 사례가 쌓이면 stack별 post-bootstrap checklist를 강화한다.
  - Workspace Monitor에서 bootstrap 명령을 바로 볼 수 있는 UI 패널을 추가한다.

## 주요 산출물

- `_tools/coding-project-bootstrap/`
- `_tools/coding-project-bootstrap/configs/blueprints.json`
- `_ops/workflows/27-bootstrap-coding-project.md`
- `_ops/prompts/27-bootstrap-coding-project.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_specs/workspace-platform/2026-06-01-coding-project-bootstrap/`
- `_history/web-searches/2026/2026-06-01-coding-project-bootstrap.ko.md`

## evaluator 출력 요약

```json
{
  "status": "ready_to_close",
  "requires_rework": false,
  "work_mode": "standard",
  "gaps": [],
  "improvements": [
    "Add a guided interactive mode later if the user wants prompts instead of CLI flags.",
    "Add stack-specific post-bootstrap checklist generation after more real projects are created.",
    "Add a Workspace Monitor UI panel that can show bootstrap commands directly."
  ]
}
```
