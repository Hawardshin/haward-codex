# Validation: root project Git repository separation

## 필수 검증

- `gh repo view Hawardshin/<repo> --json nameWithOwner,visibility,url`
- `git submodule status --recursive`
- `for d in <projects>; do git -C "$d" status --short; done`
- `for d in <projects>; do git ls-files -s "$d"; done`
- `python3 -m json.tool _ops/projects/registry.json`
- `python3 -m json.tool _history/omission-checks/2026/2026-06-08-root-project-git-separation.json`
- `python3 -m json.tool _history/resource-checks/2026/2026-06-08-root-project-git-separation.json`
- `python3 -m json.tool _history/evaluations/2026/2026-06-08-root-project-git-separation-evaluation-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/projects/registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-root-project-git-separation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-root-project-git-separation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-root-project-git-separation-evaluation-input.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `git diff --check`

## 결과

- Remote repository visibility: 통과.
- Submodule status and SHA: 통과.
- Submodule clean state: 통과.
- Root gitlink mode `160000`: 통과.
- Registry and history JSON syntax: 통과.
- Config contract, omission guard, resource guard, work evaluation: 통과.
- Docs audit: 통과.
- Diff whitespace check: 통과.

## 수동 확인

- root project paths are mode `160000`.
- `.gitmodules` URLs point to private project repositories.
- Each submodule working tree is clean before root commit.
- Root commit replaces tracked project files with submodule pointers.

## 알려진 잔여 위험

- Root repository historical commits still contain prior project files; this slice does not rewrite past history.
- New clone environments need private GitHub access to initialize submodules.
- User-facing desktop import/clone UX is a product feature for a later slice.
