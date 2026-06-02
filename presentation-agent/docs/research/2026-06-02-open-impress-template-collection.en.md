# Open Impress Template Collection Research

## Summary

On 2026-06-02, this task looked for free presentation template files that the presentation agent can actually store and reuse as references. To avoid storing files with unclear redistribution permission, the collection used the public LibreOffice Impress templates from the `dohliam/libreoffice-impress-templates` GitHub archive and left redistribution-restricted free template sites as metadata/link candidates.

## Sources Checked

- `dohliam/libreoffice-impress-templates`: a LibreOffice Impress template collection with per-collection license notes and a downloadable GitHub archive.
- `lo-cft`, `lo4-design-candidates`, `lo5-design-candidates`, `lo51-templates`: CC0 according to the collection READMEs.
- `lo35-templates`: described by the collection README as appearing to be LGPLv3 with LibreOffice 3.5.
- `fedora-slideshow`: CC-BY or CC-BY-SA 3.0 according to the collection README.
- `user-contrib/material-simple`: MIT according to the collection README and license file.
- `LibreTemplates`: direct download links were found, but raw files were not stored because the license page restricts redistribution on other websites.

## Result

- Template count: 119.
- Raw format: LibreOffice Impress `.otp`.
- Raw file location: `presentation-agent/data/assets/raw/open-impress-templates/files/`
- Thumbnail location: `presentation-agent/data/assets/thumbnails/open-impress-templates/`
- HTML reference pages: `presentation-agent/data/conversions/html/open-impress-templates/`
- Gallery: `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- Registry: `presentation-agent/data/reference-index/open-impress-template-downloads.json`

## Conversion Decision

The local environment does not currently have LibreOffice/`soffice`, so this task did not perform high-fidelity rendering. Instead, it repackaged unpacked ODF template directories into `.otp` files, copied `Thumbnails/thumbnail.png`, and extracted available text from `content.xml` into HTML reference cards.

These HTML files are not visual PPT conversions. They are reference cards for quickly reviewing provenance, license, thumbnail, and extractable slide text before rebuilding a deck through `deck-spec` and design tokens.

## Next Improvements

- When LibreOffice headless rendering is available in a project or CI environment, test `.otp -> html/pdf/png` high-fidelity conversion separately.
- When the user provides a PPTX file, add a theme/master/layout design-token analyzer in addition to the existing text extraction tool.
- Connect raw-file references and metadata-only candidates into a single browsing UI through `workspace-monitor` or a presentation-agent gallery.

## References

- https://github.com/dohliam/libreoffice-impress-templates
- https://github.com/dohliam/libreoffice-impress-templates/archive/refs/heads/master.zip
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo-cft
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo4-design-candidates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo5-design-candidates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo51-templates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo35-templates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/fedora-slideshow
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/user-contrib/material-simple
- https://libretemplates.com/en/licenses
