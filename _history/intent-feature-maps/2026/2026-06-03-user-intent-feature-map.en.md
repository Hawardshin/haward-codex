# User Intent Feature Map

## Scope

- Baseline date: 2026-06-03
- Inputs:
  - `_history/user-requests/2026/2026-05-31.ko.md`: 46 durable intent records
  - `_history/user-requests/2026/2026-06-01.ko.md`: 35 request records
  - `_history/user-requests/2026/2026-06-02.ko.md`: 60 request records
  - `_history/user-requests/2026/2026-06-03.ko.md`: 14 request records
- Total structured intents: 155
- Excluded: `_private/`, build outputs, dependency folders, full raw chat text, and sensitive local content

## Summary

The user's durable intent is not just to make an AI answer well. It is to build a personal agent operating system that turns human intent into research, judgment, execution, validation, records, and reusable product capabilities.

## Feature Themes

| Theme | User Intent | Implemented Core | Next Candidate |
| --- | --- | --- | --- |
| Platform identity and operating loop | Keep intent, requirements, specs, validation, evaluation, commit, and push connected. | `_philosophy/`, `_requirements/`, `_specs/`, `_history/`, work evaluator, memory bootstrap | Intent cockpit and roadmap UI |
| Research and evidence engine | Search first, gather broad sources, and turn sources into insight. | source registries, human search, research/deep/coding/marketing profiles, grounding guard | Source freshness and citation audit dashboard |
| Requirements/spec/validation system | Convert user instructions into requirements, specs, plans, tasks, validation, and traceability. | requirements lifecycle, spec-driven artifacts, spec reconciliation, omission/resource/grounding guards | Trace matrix dashboard and one-click rework plan |
| Capability promotion and skill/tool lifecycle | Promote repeated work into prompts, workflows, templates, tools, skills, agents, or features. | capability promotion, skill lifecycle, skill activation, `_tools/` | Capability inbox and installed skill inventory |
| Agent creation and orchestration | Create many reusable agents and coordinate their work. | agent orchestration registry, specialized agents, parallel work, merge gates | Agent marketplace and role composition UI |
| Human decision flow | Avoid stopping all work when one human answer is pending. | bounded clarification, decision inbox, human arbitration | Decision SLA, resume queue, answer impact preview |
| Installable desktop platform | The platform launches first; external AI CLIs are guest adapters. | Tauri/Rust desktop app, CLI adapters, task pipe, CLI supervisor | Persistent workspace chooser, adapter setup wizard, signed updater |
| Runtime data and customer boundary | Customers should not see platform source; runtime data/logs/agent work live separately. | runtime boundary, app-data task-run store, support bundle, customer snapshot sanitization | Retention UI, redaction preview, customer export lifecycle |
| Workspace Monitor | Show history, projects, agents, source, modes, tasks, and blockers in one surface. | Workspace Monitor, unified ops timeline, mode switchboard, source viewer, collaboration board | Intent-feature map tab and roadmap/changelog surface |
| Presentation and design ecosystem | Collect presentation references/assets and generate PPT/HTML artifacts. | presentation-agent, template collection, SVG asset library, Playwright validation | Deck quality scoring, template picker, license automation |
| Security/privacy/guardrails | Use structural execution boundaries, not prompt-only prohibitions. | sensitive boundary, structural guardrails, privacy/install audits, mode separation | Permission review UI and policy violation monitor |
| Service readiness and productization | Make release, support, update, privacy, onboarding, and public blockers visible. | service readiness registry/script/UI, internal/public blocker split | Developer ID signing, notarization, clean-machine smoke, production updater |

## Priority Reading

The next natural product sequence is:

1. Add the intent-feature map to Workspace Monitor.
2. Runtime-enforce the persistent workspace chooser.
3. Add a capability candidate inbox.
4. Add a CLI adapter setup wizard.
5. Add a data quality dashboard.

## Limits

This map is a synthesis from request summaries, work summaries, registry files, and representative specs. It does not claim every repository file was opened. External sources were used only to frame the product-management organization method; repository state comes from local history and validation records.
