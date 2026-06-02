# Plan Evidence: Open Impress Template Collection

## Plan Conclusion

Because the request asks for actual downloaded files, use a public repository archive with clear redistribution-compatible license notes instead of bulk-downloading from free template galleries with uncertain raw-storage terms.

## Evidence

- `dohliam/libreoffice-impress-templates` provides collection README license notes that can support raw storage decisions.
- LibreTemplates has free downloads but its license page restricts redistribution, so raw storage is unsuitable.
- Canva, Slidesgo, and MiriCanvas are useful design references, but raw bulk storage is unsuitable until item-level terms are checked.
- LibreOffice/`soffice` is unavailable locally, so high-fidelity conversion should not be claimed; HTML conversion must be reference-only.

## Implementation Choice

- Add a Python collector for repeatable execution.
- Package ODF template directories into `.otp` files.
- Render thumbnails and extracted text into HTML cards.
- Record source, provenance, license, local file, and HTML paths in a registry.
