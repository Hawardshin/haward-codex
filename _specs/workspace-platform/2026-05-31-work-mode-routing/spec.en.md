# Work Mode Routing Spec

## Scope

Select a work mode at startup so the repository does not force the full operating loop for every task, and let close-out evaluation apply required artifacts by mode.

## Requirement

- `REQ-WS-020`

## User Problem

The current structure can be slow because small work, urgent fixes, and pure research often trigger requirements, specs, history, and evaluator targets.

## Functional Requirements

- Work modes are `quick`, `standard`, `ship_first`, `research`, and `governance`.
- Mode selection criteria are managed in a self-documenting JSON settings file.
- Evaluator input accepts `work_mode`.
- `standard` remains the default and preserves current strict behavior.
- `quick` treats full-loop target gaps as non-blocking improvements.
- `ship_first` requires references and web-search records, and requires deferred targets when improvement ideas exist.
- `research` makes provenance and plan evidence blocking.
- `governance` keeps the existing full loop.

## Non-Functional Requirements

- Existing evaluator tests must remain compatible.
- The new shared settings file must include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`.
- Work modes must not bypass web-first intake or git/push rules.

## Out Of Scope

- No separate user interface is added.
- No external package is installed.
