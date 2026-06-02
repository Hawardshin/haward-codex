# Plan: Mode and Function Switchboard

- Work mode: `standard`
- Owning project: `workspace-monitor/`
- view_mode: `superadmin_developer`
- install_mode: `developer`

## Plan

1. Run web-first intake and memory bootstrap.
2. Inspect existing view/language/work/install/CLI registries and desktop UI mode locations.
3. Add `modeFunctionCatalog` to the snapshot collector.
4. Add an Overview `Mode & Function Switchboard` and wire actionable items to selection/navigation behavior.
5. Add `REQ-WM-019`, project spec artifacts, and readiness checks.
6. Run collect/test/check/build/perf/static smoke plus close-out gates.

## Scope Control

- Include: `workspace-monitor` collector/types/UI/CSS/tests, `platform-desktop-app` readiness checks, requirements/spec/history records.
- Exclude: new CLI auto-installation, browser persistence for work/install mode, and security boundary changes.
