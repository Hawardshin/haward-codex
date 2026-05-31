# Project Registry

This folder tracks root project status and boundaries.

## Files

- `registry.json`: source project registry data
- `index.ko.md`: Korean human-readable summary
- `index.en.md`: English companion summary

## Rules

- Register each new root project in `registry.json`.
- Record project purpose, status, ownership boundary, and related shared tools.
- Keep project-specific files inside the owning project folder.
- When something is promoted into a shared tool or policy, record the related path in the registry.
- If a project is paused or archived, update its status and move it to `_archive/` when needed.
