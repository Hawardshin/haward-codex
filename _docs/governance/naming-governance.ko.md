# 네이밍 거버넌스

## 목적

이 문서는 프로젝트, 도구, 스킬, 문서, 스펙, 히스토리, 설정, 소스 코드 이름을 일관되게 짓기 위한 공통 규칙이다. 세부 source of truth는 `_ops/naming/naming-policy.json`이다.

## 기본 원칙

- 경로 이름은 소유 영역과 산출물 유형을 드러내야 한다.
- 새 root project, tool, skill, workflow, prompt, spec slug는 기본적으로 `kebab-case`를 사용한다.
- Python package/module/function은 `snake_case`를 사용한다.
- 중요한 날짜 기반 기록은 `YYYY-MM-DD-<lower-kebab-slug>`로 시작한다.
- 중요한 한영 문서는 `name.ko.md`, `name.en.md`를 쌍으로 둔다.
- 기존 durable path를 바꿀 때는 migration plan, trace update, validation을 먼저 준비한다.

## 네임스페이스별 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| root project | `kebab-case` | `agent-platform/`, `workspace-monitor/` |
| reserved 운영 폴더 | `_` + lower-kebab | `_docs/`, `_history/` |
| runtime adapter | `.` + lower-kebab | `.claude/`, `.cursor/` |
| tool folder | `kebab-case` | `_tools/workspace-health/` |
| skill folder | `kebab-case` | `_skills/create-validated-skill/` |
| Python package/module | `snake_case` | `workspace_health/`, `naming_audit.py` |
| spec/history slug | `YYYY-MM-DD-lower-kebab` | `2026-06-01-naming-conventions-audit/` |
| bilingual docs | `name.ko.md`, `name.en.md` | `naming-governance.ko.md` |
| commit | `type(scope): summary` | `docs(workspace): add naming governance` |

## 감사

네이밍 관련 파일이나 폴더를 추가/이동/변경한 뒤 실행한다.

```bash
python3 _tools/naming-audit/src/naming_audit.py --check
```

저장소 전체 검증에서는 `workspace-health`가 naming audit를 함께 실행한다.

```bash
python3 _tools/workspace-health/src/workspace_health.py --category governance
```

## 예외

- `README.md`, `README.ko.md`, `README.en.md`: 문서 entrypoint 관례
- `AGENTS.md`, `CLAUDE.md`: assistant runtime entrypoint 관례
- `SKILL.md`: Codex skill entrypoint 관례
- `__init__.py`: Python package marker 관례

예외를 추가할 때는 `_ops/naming/naming-policy.json`에 이유를 기록한다.
