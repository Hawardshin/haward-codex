# Coding Project Bootstrap Workflow

## Purpose

새 코딩 프로젝트나 프로젝트 내부 코딩 모듈을 만들 때 기술별 구조, 프로젝트 경계, registry 연결, coding research 시작점을 반복 가능하게 준비한다.

## When To Use

- 사용자가 새 코딩 프로젝트를 만들거나 준비하라고 한다.
- 특정 기술 스택 기반으로 프로젝트 폴더 구조를 잡아야 한다.
- 기존 프로젝트 안의 하위 도구나 모듈을 만들되 root project로 등록하지 않아야 한다.
- 프로젝트 생성은 필요하지만 외부 dependency 설치나 framework generator 실행은 아직 이르다.

## Sequence

1. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md).
2. Run memory bootstrap and select `work_mode`.
3. Run [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) to decide whether this is a new root project or a nested project-local module.
4. Check available blueprints:

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list
```

5. Pick the smallest fitting blueprint:
   - `generic` when stack is unclear.
   - `python-agent` for Python-first agents.
   - `python-cli` for local CLIs/tools.
   - `next-app` for Next.js apps.
   - `react-vite` for React/Vite apps.
   - `spring-boot` for Java Spring Boot services.
   - `c-library` for C library or systems work.
6. Run a dry-run plan before writing files:

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-project --blueprint python-agent --register
```

7. If the target is inside an existing project, use `--target-dir` and do not use `--register`:

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper
```

8. Apply only after the dry-run plan is acceptable:

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py create my-project --blueprint python-agent --register --apply
```

9. After creation, read the generated `README.md` and `configs/project-context.json`.
10. Before implementation, run [_ops/workflows/56-coding-research.md](56-coding-research.md) for the selected stack and record official docs, versions, architecture options, folder semantics, and issue/discussion sources.
11. If dependencies must be installed, follow [_ops/workflows/58-installation-record.md](58-installation-record.md) before installing.
12. Run structure audit, workspace index, task board, and workspace-health.
13. Update request summary, request trace, work summary, and evaluation.

## Rules

- Do not register nested modules as root projects.
- Do not install dependencies during bootstrap.
- Do not run external framework generators until project intent, stack version, and installation audit are clear.
- Keep generated project-local artifacts inside the generated project folder.
- Promote only repeated cross-project behavior into `_tools/`, `_templates/`, `_skills/`, or `_docs/`.
