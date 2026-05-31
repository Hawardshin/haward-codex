# Installation Record Prompt

Use when: 오픈소스 패키지, 도구, 런타임, Codex skill/plugin/connector를 설치, 업그레이드, 제거, 또는 전역 설정할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as installation-auditor-agent.
Before installing, create a draft installation record under _history/installations/YYYY/ using _templates/installation-record/.
Record the rationale, alternatives considered, exact install command, owning project/tool, installation scope, environment path, expected dependency files, security review, license review, and rollback plan.
For Python, prefer project-local venv or dependency files. For Node, preserve package manifests and lock files. Avoid global installs unless justified and approved.
After installation, update the record with the actual command, installed version, dependency/lock/SBOM state, changed files, verification commands, verification result, and rollback command.
Update _ops/installations/registry.json with the installation record path.
When closing the work, set installation_occurred=true and include installation_record_targets in work-evaluator-agent input.
Do not report installation complete unless the detailed record and registry entry exist.
```

## Inputs

- installation target
- owning project or shared tool scope
- exact install command
- dependency record paths
- security and license review
- post-install verification
- rollback plan

## References

- [_docs/open-source-installation-policy.ko.md](../../_docs/open-source-installation-policy.ko.md)
- [_ops/installations/README.ko.md](../installations/README.ko.md)
- [_history/installations/README.ko.md](../../_history/installations/README.ko.md)
