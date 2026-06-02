# External SVG Actual Collection Plan Record

## Request Summary

- Collect many real external SVG files, not only generated SVGs or source candidate links.

## Planning Basis

- The previous work produced 600 generated SVGs and external source candidates, but the user requested actual collected files.
- Storing external files requires license, source URL, resolved commit, upstream path, local path, and validation records.
- The first collection tranche uses official GitHub repositories only.

## Execution Plan

1. Confirm official source and license paths through web search and `git ls-remote`.
2. Use pinned commit tarballs instead of moving branch archives.
3. Define per-source allowlist paths so documentation, preview, and build SVGs are not mixed into the asset set.
4. Add a collector that writes SVG files, per-source `LICENSE`, per-source `SOURCE.json`, and a registry.
5. Extend `asset_browser.py` so generated and external registries both support search, snippets, and gallery generation.
6. Update docs, requirements, specs, history, memory bootstrap, and project boundary rules.
7. Run unit tests, XML parse checks, config contract checks, browser smoke, workspace health, omission, grounding, and work evaluation.

## Expected Bottlenecks

- Thousands of SVG files can increase workspace indexing and health-check time.
- Public release needs a fresh license, trademark, and attribution review.
- Registry search and gallery filters become more important as the number of sources grows.
