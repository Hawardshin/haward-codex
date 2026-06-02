# Traceability: Open Impress Template Collection And HTML Referencing

| Requirement | Implementation/Artifact | Validation |
| --- | --- | --- |
| `REQ-PA-001` | `open-impress-template-downloads.json`, research/source notes | Registry JSON validation |
| `REQ-PA-002` | Collection-policy-based scope, LibreTemplates raw exclusion | Source notes, evaluation |
| `REQ-PA-003` | HTML reference pages and conversion README describe conversion limits | Browser smoke, README review |
| `REQ-PA-016` | 119 `.otp` files, 119 thumbnails, 119 HTML files, gallery | File counts, unit/browser tests |

## Key Files

- `presentation-agent/src/presentation_agent/open_template_collector.py`
- `presentation-agent/tests/test_open_template_collector.py`
- `presentation-agent/tests/browser/html-deck.spec.ts`
- `presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- `presentation-agent/data/assets/raw/open-impress-templates/files/`
- `presentation-agent/data/conversions/html/open-impress-templates/`
