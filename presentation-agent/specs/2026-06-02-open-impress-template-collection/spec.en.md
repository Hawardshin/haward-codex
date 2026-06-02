# Spec: Open Impress Template Collection And HTML Referencing

## Purpose

Enable the presentation agent to store license-cleared free presentation template files, not only links, and browse them through an HTML reference gallery.

## Requirement Links

- `REQ-PA-001`: Reference-first collection
- `REQ-PA-002`: License gate
- `REQ-PA-003`: PPTX HTML conversion
- `REQ-PA-016`: Open template file collection and HTML referencing

## Scope

- Research public LibreOffice Impress template sources.
- Select only collections with clear redistribution-compatible license notes.
- Package unpacked ODF template directories into `.otp` files.
- Convert template thumbnails and `content.xml` text into HTML reference cards.
- Generate a JSON registry and full HTML gallery.
- Validate the collector and gallery through unit tests and browser smoke tests.

## Non-Scope

- Installing LibreOffice/`soffice`.
- Pixel-faithful PPT/PPTX/ODF rendering.
- Storing raw files from free template sites with redistribution restrictions.
- Downloading paid or account-gated templates.

## Success Criteria

- More than 100 license-cleared template files are stored inside the project.
- Every template registry record includes source, license, local file, thumbnail, HTML file, and provenance.
- The gallery and per-template HTML reference pages are generated.
- Collector unit tests, full presentation-agent tests, and browser gallery smoke tests pass.
