# Select Install Mode Prompt

Use when: 사용자가 플랫폼을 "사용"하려는지, 플랫폼 자체를 "개선"하려는지에 따라 설치 경로를 나눠야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Read agent-platform/configs/installations/install-mode-registry.json.
Classify the setup into exactly one install_mode: user or developer.

Use install_mode=user when the person wants to use, run, view, browse, deploy, or try the platform without changing platform internals.
Use install_mode=developer when the person or agent will improve, refactor, test, validate, extend, or change platform source, rules, configs, tools, skills, or dashboards.

Keep install_mode separate from work_mode:
- install_mode controls environment setup.
- work_mode controls planning, evidence, evaluation, and close-out strictness.

Return:
- selected install_mode
- reason
- target project or workspace scope
- planned setup commands from the registry
- whether any install command was actually run
- verification commands
- installation audit record targets if installation occurred

If no dependency or environment state changed, state that installation audit is not required.
If installation actually occurred, follow _ops/workflows/58-installation-record.md before close-out.
```

## Checklist

- `agent-platform/configs/installations/install-mode-registry.json`
- `_docs/policies/install-mode-policy.ko.md`
- `_ops/workflows/62-select-install-mode.md`
- `PYTHONPATH=src python3 -m agent_platform.cli check-install-modes configs/installations/install-mode-registry.json`
- `_history/installations/YYYY/` and `_ops/installations/registry.json` only when installation actually occurred
