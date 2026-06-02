# Web Search Record: Language Mode Selector

## Search Time

- Date: 2026-06-02
- Work mode: `governance`
- Related request: `UR-2026-06-02-032`

## Queries

- `Next.js internationalization routing locale official docs App Router`
- `Next.js static export unsupported features internationalized routing official docs`
- `W3C language tags BCP 47 official documentation`

## Strong Sources Checked

| Source | Type | Checked Point | Applied Decision |
| --- | --- | --- | --- |
| Next.js Internationalization, https://nextjs.org/docs/app/building-your-application/routing/internationalization | official docs | Confirmed that App Router can use locale-based routing. | This task is a repository snapshot document-language filter, not URL locale routing, so route-level i18n stayed out of scope. |
| Next.js Static Exports, https://nextjs.org/docs/pages/guides/static-exports | official docs | Confirmed static export constraints around server/request-dependent features. | A collector-generated data lens is simpler and more maintainable for the current static monitor. |
| W3C Understanding the New Language Tags, https://www.w3.org/International/articles/bcp47/index.en | standard reference | Confirmed BCP 47 language-tag vocabulary and stable ids such as `ko` and `en`. | `language-mode-registry.json` uses `ko` and `en` as supported language ids. |

## Weak Or Excluded Sources

- General blog i18n examples were redundant with official Next.js docs.
- Translation or locale-management library articles were excluded because this request is not a translation feature.

## Plan Impact

- `language_mode` is a document display lens, separate from `view_mode`, `work_mode`, `install_mode`, and source-code language filters.
- Korean-only and English-only modes show only documents tagged `ko` and `en` respectively.
- Unknown-language documents are hidden from single-language modes and shown only in all-language mode.
- Data-level filtering fits the current static snapshot UI better than route-level locale routing.

## Remaining Uncertainty

- Multilingual URL routing, translation, and per-account locale preference remain unimplemented.
- Public deployments that must exclude a language need collector/redaction changes, not only a selector.
