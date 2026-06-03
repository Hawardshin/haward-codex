# Plan: Workspace Monitor Language Mode Selector

1. Check official docs and standards to confirm that snapshot/data filtering fits the static-export monitor better than route-level i18n.
2. Add `agent-platform/configs/access/language-mode-registry.json` as a self-documenting config.
3. Make the snapshot collector include `languageModeCatalog`.
4. Add the language mode model to `WorkspaceSnapshot`.
5. Add a language selector to `MonitorShell` and apply it to document, history, and metric calculations.
6. Update requirements and README.
7. Run collector tests, type checks, build, and config contract validation.
