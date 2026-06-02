# Open Presentation Template File Collection Record

## Key Insight

Many free PPT/slide template sites exist, but repository storage requires redistribution/storage permission, not just free access. On 2026-06-02, the raw-storage target was a public LibreOffice Impress template GitHub archive with collection README license notes.

## Reusable Decision Rules

- If a free site restricts redistribution, do not store raw files.
- Even for GitHub/open-source archives, keep collection-level or item-level license notes in the registry.
- Non-PPTX formats such as `.otp` and `.odp` can still be presentation reference files.
- If no renderer is available, do not claim PPT conversion; label the output as reference-only HTML.

## Artifacts

- `presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- `presentation-agent/docs/research/2026-06-02-open-impress-template-collection.en.md`

## Sources

- https://github.com/dohliam/libreoffice-impress-templates
- https://libretemplates.com/en/licenses
