# Spec: PPT Reference Expansion

## Purpose

Help presentation-agent repeatedly reference stronger PPT/slide template sources, safely turn user-provided PPT files into design references, and generate more consistent templates.

## Requirement Links

- `REQ-PA-011`: PPT template reference expansion
- `REQ-PA-012`: user-provided PPT references
- `REQ-PA-013`: consistent template generation

## Scope

- Add PPT/AI slide/template/gallery/research sources to `starter-reference-catalog.json`
- Reflect MiriCanvas and Genspark-style flow in source notes and workflow docs
- Add workflow and safe storage rules for treating user-provided PPT/PPTX files as local-only raw input
- Update presentation reference taxonomy and README files

## Non-Scope

- Bulk-downloading real PPT template files
- Bypassing paid or account-gated template access
- Installing a high-fidelity PPTX rendering engine
- Analyzing a PPT file the user has not provided yet

## Success Criteria

- Catalog validation passes.
- The new workflow explains PPT intake, rights check, text extraction, design tokenization, template profile creation, and HTML/PPTX generation links.
- Every new source records URL, access date, license status, download permission, and conversion route.

