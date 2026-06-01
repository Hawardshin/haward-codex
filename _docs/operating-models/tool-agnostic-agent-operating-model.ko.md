# 도구 독립형 에이전트 운영 모델

## 목적

이 문서는 이 저장소의 운영 원칙을 Codex 전용 방식이 아니라 Claude Code, Cursor, Google Antigravity, 또는 사용자가 선호하는 다른 AI 코딩 도구에서도 재사용할 수 있게 정의한다.

## 핵심 원칙

- 공통 원칙은 `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, `agent-platform/configs/`에 둔다.
- 도구별 파일은 공통 원칙을 불러오거나 얇게 요약하는 adapter다.
- 도구별 adapter는 정책의 원본이 아니다. 원본은 공유 문서와 설정 파일이다.
- 지침 파일은 행동을 유도하는 context이지 강제 보안 장치가 아니다.
- 중요한 규칙은 테스트, 구조 감사, 설정 검증, 권한 설정, human review로 보강한다.
- 새 도구를 도입할 때는 먼저 공식 문서로 instruction loading, 권한, sandbox, memory, rule scope를 확인한다.

## 현재 adapter

| 도구 | adapter | 역할 |
| --- | --- | --- |
| Codex | `AGENTS.md` | 현재 저장소의 기본 instruction entrypoint |
| Claude Code | `CLAUDE.md`, `.claude/rules/` | `AGENTS.md`를 가져오고 Claude-specific rule을 얇게 추가 |
| Cursor | `.cursor/rules/workspace-operating-principles.mdc` | Cursor Project Rule로 공통 운영 원칙 적용 |
| Google Antigravity | `.agents/rules/workspace-operating-principles.md` | Antigravity Workspace Rule로 공통 운영 원칙 적용 |
| 일반 도구 | `_templates/assistant-operating-principles/` | 새 도구에 맞는 adapter를 만드는 템플릿 |

## 새 도구를 붙일 때

1. 공식 문서를 확인해 instruction 파일 위치, rule 형식, activation 방식, 권한/보안 설정을 기록한다.
2. `_ops/assistant-runtimes/adapter-registry.json`에 runtime entry를 추가한다.
3. 새 root dot-directory가 필요하면 `_ops/projects/root-structure-policy.json`의 `runtime_adapter_dirs`에 추가한다.
4. adapter 파일은 공통 정책을 참조하게 만들고, 정책을 복사해 갈라지게 하지 않는다.
5. `structure-audit`, `check-config-contract`, `check-memory-bootstrap`을 실행한다.

## 피해야 할 것

- `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, `.agents/rules`에 같은 정책을 길게 중복 작성하지 않는다.
- Codex 전용 도구명이나 sandbox 동작을 다른 도구에도 있다고 가정하지 않는다.
- Claude Code, Cursor, Antigravity의 지침 파일을 보안 enforcement로 취급하지 않는다.
- 도구별 개인 설정이나 local secret을 저장소에 커밋하지 않는다.

## 검증

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/assistant-runtimes/adapter-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

