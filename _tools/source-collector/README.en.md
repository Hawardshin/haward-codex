# Source Collector

## Purpose

Python tool for repeatedly organizing many sources collected during web search.

At this stage, the tool does not crawl the web directly. It accepts JSON results from web search, OpenAI web search, SearXNG, Tavily, SerpApi, or manual research, then:

- normalizes search queries and sources
- generates a human-like query ladder
- checks source bundle coverage
- checks whether official sources, papers, tech blogs, open-source references, community/social signals, and contrary examples are present
- calculates source quality scores and adoption signal scores
- renders Markdown research reports and JSON summaries

The goal is to stabilize the input/output format first so provider adapters can be added later.

## Input

Create a template:

```bash
python3 _tools/source-collector/src/source_collector.py init /tmp/source-bundle.json --topic "agent search automation" --purpose "Choose source collection automation." --access-date 2026-05-31
```

Input files include:

- `topic`
- `purpose`
- `access_date`
- `queries`
- `required_bundle`
- `sources`
- `notes`

Source types:

- `official`
- `paper`
- `standard`
- `open_source`
- `tech_blog`
- `analysis`
- `community`
- `social`
- `news`
- `internal`
- `contrary`
- `other`

## Commands

Generate a human-like search query ladder:

```bash
python3 _tools/source-collector/src/source_collector.py query-plan "agent search automation" --depth deep --output /tmp/query-plan.md --json-output /tmp/query-plan.json
```

Render a report:

```bash
python3 _tools/source-collector/src/source_collector.py report _tools/source-collector/examples/source-bundle-template.json --output /tmp/source-report.md --json-output /tmp/source-report.json
```

Check bundle coverage:

```bash
python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json
```

Strict mode:

```bash
python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json --strict
```

## Score Meaning

- `quality_score`: source type, author/publisher, dates, claims, reliability notes, and plan impact
- `adoption_signal_score`: likes, shares, comments, GitHub stars, Hacker News points, Reddit score, LinkedIn reactions, and similar popularity/practitioner signals

Important: adoption signals are not proof. They are signals for what deserves more investigation.

## Verification

```bash
python3 -m unittest discover -s _tools/source-collector/tests
```

## Future Extensions

- SearXNG adapter
- Tavily adapter
- SerpApi adapter
- OpenAI web search result importer
- adapter that turns query plans into provider-specific search requests
- source-quality evaluator agent integration
