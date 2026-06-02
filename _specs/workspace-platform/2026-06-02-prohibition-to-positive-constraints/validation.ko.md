# 금지형 지시 변환 검증

## 검증 계획

- `python3 -m json.tool`로 변경 JSON 파일 검사
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/governance/philosophy-traceability.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --json`
- `check-omissions`, `check-grounding`, `evaluate-work`

## 현재 상태

- 완료.

## 검증 결과

| 검증 | 결과 |
| --- | --- |
| 변경 JSON `json.tool` 검사 | 통과 |
| `check-config-contract` for usage/profile/traceability/memory | `self_documenting` |
| `check-philosophy-trace` | `ready` |
| `check-memory-bootstrap` | `ready_to_bootstrap` |
| `workspace-index` regenerate/check | 통과 |
| `task-board` regenerate/check | 통과 |
| `docs-audit --check` | `docs_ready` |
| `work_timer check` | `ready`, 일부 phase duration 미측정 warning |
| `check-omissions` | `coverage_ready` |
| `check-grounding` | `ready_to_publish` |
| `workspace-health --json` | `passed`, 25 checks, 0 failed |
| `evaluate-work` | `ready_to_close` |
| `git diff --check` | clean |

## 해석

- 금지형 지시를 긍정 행동 계약으로 바꾸는 규칙은 요구사항, 설정, 철학, traceability, persistent instructions, memory bootstrap, workflow, prompt, history에 반영됐다.
- 새 prompt linter는 이번 범위에 포함하지 않았다. 평가 보고서의 개선 후보로 남겼다.
