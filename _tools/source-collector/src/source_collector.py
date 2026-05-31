from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


JsonMap = dict[str, Any]

SOURCE_TYPES = {
    "official",
    "paper",
    "standard",
    "open_source",
    "tech_blog",
    "analysis",
    "community",
    "social",
    "news",
    "internal",
    "contrary",
    "other",
}

DEFAULT_REQUIRED_BUNDLE = {
    "official": 1,
    "paper": 1,
    "tech_blog": 2,
    "open_source": 1,
    "community_or_social": 1,
    "contrary": 1,
}

SOURCE_BASE_SCORE = {
    "official": 45,
    "paper": 43,
    "standard": 43,
    "open_source": 36,
    "tech_blog": 28,
    "analysis": 27,
    "news": 23,
    "community": 14,
    "social": 12,
    "internal": 25,
    "contrary": 20,
    "other": 10,
}


@dataclass(frozen=True)
class SearchQuery:
    query: str
    channel: str = "web"
    purpose: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "SearchQuery":
        return cls(
            query=required_string(data, "query"),
            channel=optional_string(data.get("channel", "web"), "channel"),
            purpose=optional_string(data.get("purpose", ""), "purpose"),
        )


@dataclass(frozen=True)
class Source:
    title: str
    url: str
    source_type: str = "other"
    publisher: str = ""
    author: str = ""
    published_date: str = ""
    accessed_date: str = ""
    key_claim: str = ""
    reliability_notes: str = ""
    plan_impact: str = ""
    contrary: bool = False
    signals: JsonMap = field(default_factory=dict)

    @classmethod
    def from_dict(cls, data: JsonMap) -> "Source":
        source_type = optional_string(data.get("source_type", "other"), "source_type")
        if source_type == "auto":
            source_type = infer_source_type(optional_string(data.get("url", ""), "url"))
        return cls(
            title=required_string(data, "title"),
            url=required_string(data, "url"),
            source_type=source_type,
            publisher=optional_string(data.get("publisher", ""), "publisher"),
            author=optional_string(data.get("author", ""), "author"),
            published_date=optional_string(data.get("published_date", ""), "published_date"),
            accessed_date=optional_string(data.get("accessed_date", ""), "accessed_date"),
            key_claim=optional_string(data.get("key_claim", ""), "key_claim"),
            reliability_notes=optional_string(data.get("reliability_notes", ""), "reliability_notes"),
            plan_impact=optional_string(data.get("plan_impact", ""), "plan_impact"),
            contrary=optional_bool(data.get("contrary", False), "contrary"),
            signals=optional_map(data.get("signals", {}), "signals"),
        )


@dataclass(frozen=True)
class SourceCollectionInput:
    topic: str
    purpose: str
    access_date: str
    queries: tuple[SearchQuery, ...] = ()
    sources: tuple[Source, ...] = ()
    required_bundle: JsonMap = field(default_factory=lambda: dict(DEFAULT_REQUIRED_BUNDLE))
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "SourceCollectionInput":
        return cls(
            topic=required_string(data, "topic"),
            purpose=required_string(data, "purpose"),
            access_date=required_string(data, "access_date"),
            queries=tuple(SearchQuery.from_dict(item) for item in list_of_maps(data.get("queries", []), "queries")),
            sources=tuple(Source.from_dict(item) for item in list_of_maps(data.get("sources", []), "sources")),
            required_bundle=optional_map(data.get("required_bundle", dict(DEFAULT_REQUIRED_BUNDLE)), "required_bundle"),
            notes=tuple_of_strings(data.get("notes", []), "notes"),
        )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Normalize and score broad source bundles for research.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="Create a source collection input template.")
    init_parser.add_argument("path", type=Path)
    init_parser.add_argument("--topic", default="Research topic")
    init_parser.add_argument("--purpose", default="Why this source collection is needed.")
    init_parser.add_argument("--access-date", default="YYYY-MM-DD")

    report_parser = subparsers.add_parser("report", help="Render a source collection report.")
    report_parser.add_argument("input", type=Path)
    report_parser.add_argument("--output", type=Path, help="Markdown output path.")
    report_parser.add_argument("--json-output", type=Path, help="JSON summary output path.")
    report_parser.add_argument("--language", choices=("ko", "en"), default="ko")

    check_parser = subparsers.add_parser("check", help="Validate that a source bundle meets its target.")
    check_parser.add_argument("input", type=Path)
    check_parser.add_argument("--strict", action="store_true", help="Fail when the bundle is incomplete.")

    args = parser.parse_args(argv)

    if args.command == "init":
        data = template(args.topic, args.purpose, args.access_date)
        write_json(args.path, data)
        print(f"created: {args.path}")
        return 0

    if args.command == "report":
        collection_input = load_input(args.input)
        result = analyze(collection_input)
        markdown = render_markdown(collection_input, result, args.language)
        if args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(markdown.rstrip() + "\n", encoding="utf-8")
            print(f"wrote: {args.output}")
        else:
            print(markdown)
        if args.json_output:
            write_json(args.json_output, result)
            print(f"wrote: {args.json_output}")
        return 0

    if args.command == "check":
        collection_input = load_input(args.input)
        result = analyze(collection_input)
        print(json.dumps(result, indent=2, ensure_ascii=False))
        if args.strict and result["status"] != "ready_to_use":
            return 1
        return 0

    raise ValueError(f"Unknown command: {args.command}")


def template(topic: str, purpose: str, access_date: str) -> JsonMap:
    return {
        "topic": topic,
        "purpose": purpose,
        "access_date": access_date,
        "queries": build_queries(topic),
        "required_bundle": dict(DEFAULT_REQUIRED_BUNDLE),
        "sources": [
            {
                "title": "Official documentation or primary source",
                "url": "https://example.com/docs",
                "source_type": "official",
                "publisher": "Publisher",
                "author": "",
                "published_date": "",
                "accessed_date": access_date,
                "key_claim": "What this source supports.",
                "reliability_notes": "Why this source is reliable.",
                "plan_impact": "How this changes the plan.",
                "contrary": False,
                "signals": {},
            }
        ],
        "notes": [
            "Popularity signals are adoption or discovery signals, not standalone proof.",
            "Do not search sensitive project details verbatim.",
        ],
    }


def build_queries(topic: str) -> list[JsonMap]:
    clean_topic = topic.strip() or "research topic"
    return [
        {"query": f"{clean_topic} official documentation", "channel": "web", "purpose": "official or primary source"},
        {"query": f"{clean_topic} arxiv paper OR conference paper", "channel": "web", "purpose": "papers and technical reports"},
        {"query": f"{clean_topic} engineering blog architecture case study", "channel": "web", "purpose": "international tech blogs and field examples"},
        {"query": f"{clean_topic} GitHub open source implementation", "channel": "web", "purpose": "open-source implementation evidence"},
        {"query": f"{clean_topic} benchmark analysis article survey", "channel": "web", "purpose": "analysis and benchmark articles"},
        {"query": f"{clean_topic} Hacker News Reddit LinkedIn", "channel": "web", "purpose": "community and social adoption signals"},
        {"query": f"{clean_topic} failure case limitations criticism", "channel": "web", "purpose": "contrary or failure cases"},
    ]


def load_input(path: Path) -> SourceCollectionInput:
    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    return SourceCollectionInput.from_dict(data)


def analyze(collection_input: SourceCollectionInput) -> JsonMap:
    validate_sources(collection_input.sources)
    source_results = [score_source(source) for source in collection_input.sources]
    coverage = bundle_coverage(collection_input.sources, collection_input.required_bundle)
    missing = [key for key, item in coverage.items() if not item["met"]]
    status = "ready_to_use" if not missing and collection_input.sources else "more_sources_required"

    return {
        "status": status,
        "topic": collection_input.topic,
        "source_count": len(collection_input.sources),
        "query_count": len(collection_input.queries),
        "coverage": coverage,
        "missing_bundle_items": missing,
        "source_scores": source_results,
        "top_sources": sorted(source_results, key=lambda item: item["quality_score"], reverse=True)[:10],
        "adoption_signal_count": sum(1 for source in collection_input.sources if adoption_signal_score(source.signals) > 0),
        "contrary_source_count": sum(1 for source in collection_input.sources if source.contrary or source.source_type == "contrary"),
    }


def validate_sources(sources: tuple[Source, ...]) -> None:
    for index, source in enumerate(sources, start=1):
        if source.source_type not in SOURCE_TYPES:
            raise ValueError(f"source {index} has unknown source_type: {source.source_type}")
        if not source.url.strip():
            raise ValueError(f"source {index} is missing url")
        if not source.title.strip():
            raise ValueError(f"source {index} is missing title")


def score_source(source: Source) -> JsonMap:
    quality_score = SOURCE_BASE_SCORE[source.source_type]
    if source.publisher.strip():
        quality_score += 8
    if source.author.strip():
        quality_score += 5
    if source.published_date.strip():
        quality_score += 4
    if source.accessed_date.strip():
        quality_score += 5
    if source.key_claim.strip():
        quality_score += 8
    if source.reliability_notes.strip():
        quality_score += 8
    if source.plan_impact.strip():
        quality_score += 5
    if source.contrary or source.source_type == "contrary":
        quality_score += 3

    adoption_score = adoption_signal_score(source.signals)
    domain = urlparse(source.url).netloc
    return {
        "title": source.title,
        "url": source.url,
        "domain": domain,
        "source_type": source.source_type,
        "quality_score": min(100, quality_score),
        "adoption_signal_score": adoption_score,
        "contrary": source.contrary or source.source_type == "contrary",
        "key_claim": source.key_claim,
        "plan_impact": source.plan_impact,
    }


def adoption_signal_score(signals: JsonMap) -> int:
    score = 0
    weights = {
        "likes": 1,
        "shares": 2,
        "comments": 2,
        "github_stars": 1,
        "hn_points": 1,
        "reddit_score": 1,
        "linkedin_reactions": 1,
        "bookmarks": 1,
    }
    for key, weight in weights.items():
        value = signals.get(key, 0)
        if isinstance(value, int | float) and value > 0:
            if value >= 1000:
                score += 10 * weight
            elif value >= 100:
                score += 6 * weight
            elif value >= 10:
                score += 3 * weight
            else:
                score += weight
    return min(100, score)


def bundle_coverage(sources: tuple[Source, ...], required_bundle: JsonMap) -> JsonMap:
    type_counts = {source_type: 0 for source_type in SOURCE_TYPES}
    contrary_count = 0
    for source in sources:
        type_counts[source.source_type] = type_counts.get(source.source_type, 0) + 1
        if source.contrary or source.source_type == "contrary":
            contrary_count += 1

    coverage: JsonMap = {}
    for key, required in required_bundle.items():
        if not isinstance(required, int):
            raise TypeError(f"required_bundle.{key} must be an integer")
        if key == "community_or_social":
            count = type_counts.get("community", 0) + type_counts.get("social", 0)
        elif key == "paper":
            count = type_counts.get("paper", 0) + type_counts.get("standard", 0)
        elif key == "contrary":
            count = contrary_count
        else:
            count = type_counts.get(key, 0)
        coverage[key] = {"required": required, "actual": count, "met": count >= required}
    return coverage


def infer_source_type(url: str) -> str:
    domain = urlparse(url).netloc.lower()
    if any(part in domain for part in ("github.com", "gitlab.com")):
        return "open_source"
    if any(part in domain for part in ("arxiv.org", "aclanthology.org", "ieee.org", "acm.org", "neurips.cc")):
        return "paper"
    if any(part in domain for part in ("docs.", "developer.", "developers.", "w3.org", "ietf.org")):
        return "official"
    if any(part in domain for part in ("reddit.com", "news.ycombinator.com", "stackoverflow.com")):
        return "community"
    if "linkedin.com" in domain:
        return "social"
    return "other"


def render_markdown(collection_input: SourceCollectionInput, result: JsonMap, language: str) -> str:
    ko = language == "ko"
    title = "출처 수집 보고서" if ko else "Source Collection Report"
    lines = [
        f"# {title}: {collection_input.topic}",
        "",
        f"- {'목적' if ko else 'Purpose'}: {collection_input.purpose}",
        f"- {'접근일' if ko else 'Access date'}: {collection_input.access_date}",
        f"- Status: `{result['status']}`",
        f"- {'출처 수' if ko else 'Sources'}: {result['source_count']}",
        f"- {'검색어 수' if ko else 'Queries'}: {result['query_count']}",
        "",
        "## Search Queries",
        "",
    ]

    if collection_input.queries:
        lines.extend(["| Query | Channel | Purpose |", "| --- | --- | --- |"])
        for query in collection_input.queries:
            lines.append(f"| {md(query.query)} | {md(query.channel)} | {md(query.purpose)} |")
    else:
        lines.append("- None")

    lines.extend(["", "## Bundle Coverage", "", "| Item | Required | Actual | Met |", "| --- | ---: | ---: | --- |"])
    for key, item in result["coverage"].items():
        lines.append(f"| `{key}` | {item['required']} | {item['actual']} | {item['met']} |")

    lines.extend(["", "## Sources", "", "| Score | Adoption | Type | Title | Claim | Plan Impact |", "| ---: | ---: | --- | --- | --- | --- |"])
    for source in result["source_scores"]:
        title_link = f"[{md(source['title'])}]({source['url']})"
        lines.append(
            "| {score} | {adoption} | `{type}` | {title} | {claim} | {impact} |".format(
                score=source["quality_score"],
                adoption=source["adoption_signal_score"],
                type=source["source_type"],
                title=title_link,
                claim=md(source["key_claim"]),
                impact=md(source["plan_impact"]),
            )
        )

    lines.extend(["", "## Missing Bundle Items", ""])
    if result["missing_bundle_items"]:
        for item in result["missing_bundle_items"]:
            lines.append(f"- `{item}`")
    else:
        lines.append("- None")

    lines.extend(["", "## Notes", ""])
    if collection_input.notes:
        for note in collection_input.notes:
            lines.append(f"- {note}")
    else:
        lines.append("- None")

    return "\n".join(lines)


def write_json(path: Path, data: JsonMap) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str) or not value.strip():
        raise TypeError(f"{field_name} must be a non-empty string")
    return value


def optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string")
    return value


def optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a boolean")
    return value


def optional_map(value: Any, field_name: str) -> JsonMap:
    if not isinstance(value, dict):
        raise TypeError(f"{field_name} must be an object")
    return value


def list_of_maps(value: Any, field_name: str) -> list[JsonMap]:
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list")
    if not all(isinstance(item, dict) for item in value):
        raise TypeError(f"{field_name} must contain only objects")
    return value


def tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings")
    return tuple(value)


def md(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ")


if __name__ == "__main__":
    raise SystemExit(main())
