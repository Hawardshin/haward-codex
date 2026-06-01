# CLI Adapter Integration Prompt

Use when: the platform, installable app, monitor, or a project needs to use an external CLI without becoming dependent on it.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as CLI adapter integration, not as hard dependency adoption.

Read:
- agent-platform/configs/integrations/cli-adapter-registry.json
- _docs/policies/cli-adapter-policy.ko.md
- _ops/workflows/66-cli-adapter-integration.md
- platform-desktop-app/configs/desktop-distribution-registry.json when the installed app is involved

First classify the CLI role:
- optional helper
- project-local required tool
- bundled sidecar
- user-supplied executable
- unsupported tool

Then classify the owning layer:
- installed shell
- platform core
- project adapter
- external CLI

Research before design:
- official CLI docs
- security and command-execution guidance
- installation and update guidance
- issue/discussion signals when reliability or portability is uncertain
- alternatives or fallback workflows

Return:
- CLI role and dependency posture
- adapter contract target
- availability check and version check
- supported command list
- input/output contract
- timeout/cwd/environment policy
- secret redaction policy
- permission scope and desktop allowlist needs
- missing-CLI and unsupported-version fallback behavior
- installation status and audit target if installation occurred or is planned
- validation commands

Do not make a CLI mandatory unless the requirement, installation audit, security boundary, fallback behavior, and validation commands are explicit.
```

## Checklist

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `_docs/policies/cli-adapter-policy.ko.md`
- `_ops/workflows/66-cli-adapter-integration.md`
- `_history/web-searches/YYYY/`
- `_history/plans/YYYY/`
- relevant requirements/specs
