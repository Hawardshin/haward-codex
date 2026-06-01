# Presentation Reference Index

This folder stores source metadata for presentation design, PPT/HTML templates, reusable assets, theory, and research. The default is to keep provenance and evaluation metadata, not copied source files.

## Rules

- Always record source URL, access date, source type, license status, and HTML conversion path.
- Do not store raw PPT/PPTX/image files when `download_allowed=false`.
- Treat likes, views, and community activity as discovery or quality signals, not standalone proof.
- Before storing or converting a PPTX file, pass the license gate in `configs/collection-policy.json`.

## Starter Data

- `starter-reference-catalog.json`: initial reference bundle for repeated presentation-agent research.

## PPT Reference Expansion Rules

- Store template sources such as MiriCanvas, Canva, Slidesgo, Microsoft Create, Pitch, Figma, and Adobe Express as metadata first.
- Do not store raw PPT/PPTX files until usage rights, storage permission, and attribution requirements are checked.
- When the user provides a PPT, do not copy it directly. Extract colors, typography, spacing, layout archetypes, repeated components, and section rhythm into an internal template profile.
- Treat the Genspark-style generation flow as `strategy -> substance -> structure -> design -> build`, but keep final outputs tied to source references and design tokens.
