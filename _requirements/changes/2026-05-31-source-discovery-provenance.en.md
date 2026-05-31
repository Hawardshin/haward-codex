# Requirement Change: Source Discovery And Provenance

## Change

- Added requirements: `REQ-WS-017`, `REQ-WS-018`, `REQ-WS-019`
- Source requests: `UR-2026-05-31-041` - `UR-2026-05-31-044`

## Details

- Material source values and plan steps are linked to evidence sources.
- Broader global technology blogs, Korean big-tech blogs, India technology sources, and paper discovery sources are managed in a dedicated registry.
- Korean user review/local-market research prioritizes Naver Map, Kakao Map, Naver Blog/Search, and official pages, then scores candidate quality.

## Impact

- `plan-from-research`, `complete-coding-research`, and `evaluate-work` inputs add provenance/evidence fields.
- `source-discovery-registry.json` and `_tools/korean-local-review/` become part of the research operating structure.
