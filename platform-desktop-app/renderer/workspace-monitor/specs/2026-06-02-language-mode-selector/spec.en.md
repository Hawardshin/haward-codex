# Spec: Workspace Monitor Language Mode Selector

## Requirements

- `REQ-WS-072`
- `REQ-WM-015`

## Goal

Workspace Monitor reads the platform `language-mode-registry.json` and allows selecting all-language, Korean-only, and English-only document views.

## Scope

- Add `languageModeCatalog` to the snapshot
- Keep existing document/history `language` tags and use them for language-mode filtering
- Add a toolbar language mode selector
- Apply the same language lens to documents, history, recent history, and metric counts
- Keep language mode separate from view mode, work mode, install mode, and source-code language filters

## Non-Goals

- Document translation
- Route-level i18n
- Authentication, authorization, or security redaction
- Changes to source-code programming language filters
