from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen


JsonMap = dict[str, Any]

PLATFORM_BASE = {
    "naver_map": 38,
    "naver_search_local": 34,
    "kakao_map": 33,
    "kakao_local": 31,
    "naver_blog": 29,
    "naver_search_blog": 28,
    "official_site": 36,
    "google_maps": 22,
    "google_search": 20,
    "youtube": 18,
    "instagram": 14,
    "community": 16,
    "news": 18,
    "other": 10,
}

SOURCE_KIND_WEIGHT = {
    "official_place": 18,
    "map_place": 14,
    "visitor_review_summary": 13,
    "blog_review": 10,
    "local_article": 8,
    "community_thread": 5,
    "social_post": 3,
    "other": 0,
}


@dataclass(frozen=True)
class ReviewCandidate:
    title: str
    url: str
    platform: str
    source_kind: str = "other"
    publisher: str = ""
    author: str = ""
    accessed_date: str = ""
    published_date: str = ""
    language: str = "ko"
    region: str = ""
    category: str = ""
    rating: float | None = None
    review_count: int = 0
    blog_review_count: int = 0
    has_photos: bool = False
    receipt_verified: bool = False
    owner_response: bool = False
    ad_disclosure: bool = False
    freshness_days: int | None = None
    user_fit_notes: str = ""
    key_claim: str = ""
    caveats: tuple[str, ...] = field(default_factory=tuple)

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ReviewCandidate":
        return cls(
            title=required_string(data, "title"),
            url=required_string(data, "url"),
            platform=optional_string(data.get("platform", "other"), "platform"),
            source_kind=optional_string(data.get("source_kind", "other"), "source_kind"),
            publisher=optional_string(data.get("publisher", ""), "publisher"),
            author=optional_string(data.get("author", ""), "author"),
            accessed_date=optional_string(data.get("accessed_date", ""), "accessed_date"),
            published_date=optional_string(data.get("published_date", ""), "published_date"),
            language=optional_string(data.get("language", "ko"), "language"),
            region=optional_string(data.get("region", ""), "region"),
            category=optional_string(data.get("category", ""), "category"),
            rating=optional_float_or_none(data.get("rating"), "rating"),
            review_count=optional_int(data.get("review_count", 0), "review_count"),
            blog_review_count=optional_int(data.get("blog_review_count", 0), "blog_review_count"),
            has_photos=optional_bool(data.get("has_photos", False), "has_photos"),
            receipt_verified=optional_bool(data.get("receipt_verified", False), "receipt_verified"),
            owner_response=optional_bool(data.get("owner_response", False), "owner_response"),
            ad_disclosure=optional_bool(data.get("ad_disclosure", False), "ad_disclosure"),
            freshness_days=optional_int_or_none(data.get("freshness_days"), "freshness_days"),
            user_fit_notes=optional_string(data.get("user_fit_notes", ""), "user_fit_notes"),
            key_claim=optional_string(data.get("key_claim", ""), "key_claim"),
            caveats=tuple_of_strings(data.get("caveats", []), "caveats"),
        )


@dataclass(frozen=True)
class ReviewResearchInput:
    topic: str
    region: str
    category: str
    access_date: str
    user_context: str = "Korean user decision support"
    candidates: tuple[ReviewCandidate, ...] = ()
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ReviewResearchInput":
        return cls(
            topic=required_string(data, "topic"),
            region=optional_string(data.get("region", ""), "region"),
            category=optional_string(data.get("category", ""), "category"),
            access_date=required_string(data, "access_date"),
            user_context=optional_string(data.get("user_context", "Korean user decision support"), "user_context"),
            candidates=tuple(ReviewCandidate.from_dict(item) for item in list_of_maps(data.get("candidates", []), "candidates")),
            notes=tuple_of_strings(data.get("notes", []), "notes"),
        )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Plan and score Korean local review research sources.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    query_plan_parser = subparsers.add_parser("query-plan", help="Print Korean local review search queries.")
    query_plan_parser.add_argument("--topic", required=True)
    query_plan_parser.add_argument("--region", default="")
    query_plan_parser.add_argument("--category", default="")

    init_parser = subparsers.add_parser("init", help="Create a review research input template.")
    init_parser.add_argument("path", type=Path)
    init_parser.add_argument("--topic", required=True)
    init_parser.add_argument("--region", default="")
    init_parser.add_argument("--category", default="")
    init_parser.add_argument("--access-date", default="YYYY-MM-DD")

    score_parser = subparsers.add_parser("score", help="Score review source candidates.")
    score_parser.add_argument("input", type=Path)
    score_parser.add_argument("--output", type=Path)
    score_parser.add_argument("--json-output", type=Path)

    kakao_parser = subparsers.add_parser("fetch-kakao", help="Fetch Kakao Local keyword candidates when KAKAO_REST_API_KEY exists.")
    kakao_parser.add_argument("--query", required=True)
    kakao_parser.add_argument("--output", type=Path, required=True)

    naver_parser = subparsers.add_parser("fetch-naver", help="Fetch Naver Search API candidates when NAVER_CLIENT_ID and NAVER_CLIENT_SECRET exist.")
    naver_parser.add_argument("--kind", choices=("blog", "local"), required=True)
    naver_parser.add_argument("--query", required=True)
    naver_parser.add_argument("--output", type=Path, required=True)

    args = parser.parse_args(argv)

    if args.command == "query-plan":
        print(json.dumps(query_plan(args.topic, args.region, args.category), indent=2, ensure_ascii=False))
        return 0

    if args.command == "init":
        write_json(args.path, template(args.topic, args.region, args.category, args.access_date))
        print(f"created: {args.path}")
        return 0

    if args.command == "score":
        review_input = load_input(args.input)
        report = analyze(review_input)
        markdown = render_markdown(review_input, report)
        if args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(markdown.rstrip() + "\n", encoding="utf-8")
            print(f"wrote: {args.output}")
        else:
            print(markdown)
        if args.json_output:
            write_json(args.json_output, report)
            print(f"wrote: {args.json_output}")
        return 0

    if args.command == "fetch-kakao":
        write_json(args.output, fetch_kakao(args.query))
        print(f"wrote: {args.output}")
        return 0

    if args.command == "fetch-naver":
        write_json(args.output, fetch_naver(args.kind, args.query))
        print(f"wrote: {args.output}")
        return 0

    raise ValueError(f"Unknown command: {args.command}")


def query_plan(topic: str, region: str = "", category: str = "") -> JsonMap:
    tokens = " ".join(unique_query_tokens(region, category, topic)).strip()
    topic_only = topic.strip()
    region_category = " ".join(unique_query_tokens(region, category)).strip() or topic_only
    return {
        "topic": topic,
        "recommended_order": [
            "official_site_or_place_profile",
            "naver_map",
            "naver_search_local",
            "naver_blog",
            "kakao_map",
            "kakao_local",
            "community_or_news_if_needed",
            "google_maps_or_google_search_as_supplement",
        ],
        "queries": [
            {"platform": "naver_map", "query": tokens, "purpose": "place identity, photos, visitor reviews, Korean user behavior"},
            {"platform": "kakao_map", "query": tokens, "purpose": "cross-check local place signal and negative/alternate reviews"},
            {"platform": "naver_blog", "query": f"{region_category} 후기", "purpose": "long-form Korean user experience"},
            {"platform": "naver_blog", "query": f"{region_category} 내돈내산", "purpose": "reduce ad-heavy blog risk"},
            {"platform": "naver_search", "query": f"{tokens} 영업시간 메뉴 가격 위치", "purpose": "facts to verify against official/map pages"},
            {"platform": "naver_search", "query": f"{region_category} 웨이팅 주차 혼잡", "purpose": "practical Korean user constraints"},
            {"platform": "google_search", "query": f"{topic_only} review official", "purpose": "supplemental international or official signal"},
        ],
        "quality_questions": [
            "Is the exact page current enough for the decision?",
            "Is the source a firsthand review, official profile, or copied aggregator?",
            "Are ad disclosure and sponsorship visible?",
            "Do Naver and Kakao signals conflict?",
            "Does the evidence match the Korean user's location, language, and use case?",
        ],
    }


def template(topic: str, region: str, category: str, access_date: str) -> JsonMap:
    return {
        "topic": topic,
        "region": region,
        "category": category,
        "access_date": access_date,
        "user_context": "Korean user decision support",
        "query_plan": query_plan(topic, region, category),
        "candidates": [
            {
                "title": "Naver Map place page or Naver local result",
                "url": "https://map.naver.com/",
                "platform": "naver_map",
                "source_kind": "map_place",
                "publisher": "NAVER",
                "accessed_date": access_date,
                "language": "ko",
                "region": region,
                "category": category,
                "rating": null_value(),
                "review_count": 0,
                "blog_review_count": 0,
                "has_photos": false,
                "receipt_verified": false,
                "owner_response": false,
                "ad_disclosure": false,
                "freshness_days": null_value(),
                "user_fit_notes": "Korean local discovery and review signal.",
                "key_claim": "What this page supports.",
                "caveats": ["Open the exact place page before citing."]
            }
        ],
        "notes": [
            "Use map and blog reviews as user-experience signals, not standalone proof.",
            "Use official or map profile pages for factual claims such as address, hours, phone, or menu.",
            "Record exact source URL/path and access date before using a claim as evidence."
        ]
    }


def analyze(review_input: ReviewResearchInput) -> JsonMap:
    candidate_scores = [score_candidate(candidate) for candidate in review_input.candidates]
    sorted_scores = sorted(candidate_scores, key=lambda item: item["overall_score"], reverse=True)
    platforms = {candidate.platform for candidate in review_input.candidates}
    warnings = []
    if "naver_map" not in platforms and "naver_search_local" not in platforms:
        warnings.append("Naver local signal is missing for Korean user review research.")
    if "kakao_map" not in platforms and "kakao_local" not in platforms:
        warnings.append("Kakao local signal is missing; add it when local review cross-check matters.")
    if not any(candidate.source_kind == "official_place" or candidate.platform == "official_site" for candidate in review_input.candidates):
        warnings.append("Official place or owner-controlled source is missing for factual claims.")
    if len(platforms) < 2 and review_input.candidates:
        warnings.append("Only one platform is represented; cross-check another platform before using review evidence.")

    status = "ready_to_compare" if review_input.candidates and len(platforms) >= 2 else "more_sources_required"
    return {
        "status": status,
        "topic": review_input.topic,
        "region": review_input.region,
        "category": review_input.category,
        "candidate_count": len(review_input.candidates),
        "platforms": sorted(platforms),
        "warnings": warnings,
        "top_candidates": sorted_scores[:10],
        "candidate_scores": candidate_scores,
        "recommended_query_plan": query_plan(review_input.topic, review_input.region, review_input.category),
    }


def score_candidate(candidate: ReviewCandidate) -> JsonMap:
    platform_score = PLATFORM_BASE.get(candidate.platform, PLATFORM_BASE["other"])
    kind_score = SOURCE_KIND_WEIGHT.get(candidate.source_kind, SOURCE_KIND_WEIGHT["other"])
    korean_fit = platform_score + kind_score
    evidence = kind_score + 20
    bias_risk = 12

    if candidate.language.lower().startswith("ko"):
        korean_fit += 10
    if candidate.region.strip():
        korean_fit += 6
    if candidate.category.strip():
        korean_fit += 4
    if candidate.review_count >= 1000:
        korean_fit += 14
        evidence += 10
    elif candidate.review_count >= 100:
        korean_fit += 10
        evidence += 7
    elif candidate.review_count >= 10:
        korean_fit += 5
        evidence += 3
    elif candidate.review_count == 0 and candidate.source_kind in {"map_place", "visitor_review_summary"}:
        bias_risk += 12

    if candidate.blog_review_count >= 100:
        korean_fit += 8
        evidence += 5
    elif candidate.blog_review_count >= 10:
        korean_fit += 5
        evidence += 3

    if candidate.rating is not None:
        if 3.7 <= candidate.rating <= 4.8:
            korean_fit += 5
            evidence += 3
        elif candidate.rating > 4.8 and candidate.review_count < 20:
            bias_risk += 10
        elif candidate.rating < 3.0:
            evidence += 4

    if candidate.freshness_days is not None:
        if candidate.freshness_days <= 30:
            korean_fit += 10
            evidence += 7
        elif candidate.freshness_days <= 90:
            korean_fit += 7
            evidence += 5
        elif candidate.freshness_days <= 365:
            korean_fit += 3
            evidence += 2
        else:
            bias_risk += 6

    if candidate.has_photos:
        korean_fit += 5
        evidence += 3
    if candidate.receipt_verified:
        korean_fit += 7
        evidence += 6
    if candidate.owner_response:
        evidence += 3
    if candidate.publisher.strip():
        evidence += 3
    if candidate.author.strip():
        evidence += 2
    if candidate.accessed_date.strip():
        evidence += 4
    if candidate.key_claim.strip():
        evidence += 5
    if candidate.user_fit_notes.strip():
        korean_fit += 3

    if candidate.ad_disclosure:
        bias_risk += 8
    if candidate.caveats:
        bias_risk += min(12, len(candidate.caveats) * 3)

    korean_fit = clamp(korean_fit)
    evidence = clamp(evidence)
    bias_risk = clamp(bias_risk)
    overall = clamp(round((korean_fit * 0.45) + (evidence * 0.45) - (bias_risk * 0.25)))
    return {
        "title": candidate.title,
        "url": candidate.url,
        "platform": candidate.platform,
        "source_kind": candidate.source_kind,
        "korean_user_fit_score": korean_fit,
        "evidence_strength_score": evidence,
        "bias_risk_score": bias_risk,
        "overall_score": overall,
        "key_claim": candidate.key_claim,
        "caveats": list(candidate.caveats),
    }


def render_markdown(review_input: ReviewResearchInput, report: JsonMap) -> str:
    lines = [
        "# Korean Local Review Research Report",
        "",
        f"- Topic: {review_input.topic}",
        f"- Region: {review_input.region}",
        f"- Category: {review_input.category}",
        f"- Status: `{report['status']}`",
        "",
        "## Warnings",
        "",
    ]
    if report["warnings"]:
        lines.extend(f"- {warning}" for warning in report["warnings"])
    else:
        lines.append("- None")
    lines.extend(["", "## Top Candidates", "", "| Score | Platform | Kind | Title | Caveat |", "| --- | --- | --- | --- | --- |"])
    for candidate in report["top_candidates"]:
        caveat = "; ".join(candidate["caveats"]) if candidate["caveats"] else ""
        lines.append(f"| {candidate['overall_score']} | {candidate['platform']} | {candidate['source_kind']} | {candidate['title']} | {caveat} |")
    lines.extend(["", "## Recommended Query Plan", ""])
    for item in report["recommended_query_plan"]["queries"]:
        lines.append(f"- `{item['platform']}`: {item['query']} - {item['purpose']}")
    lines.extend(["", "## Evidence Rule", "", "Use review sources as user-experience signals. Re-open exact source pages and record access dates before citing specific claims."])
    return "\n".join(lines)


def fetch_kakao(query: str) -> JsonMap:
    key = os.environ.get("KAKAO_REST_API_KEY")
    if not key:
        return {"status": "missing_credentials", "required_env": ["KAKAO_REST_API_KEY"], "query": query}
    url = "https://dapi.kakao.com/v2/local/search/keyword.json?" + urlencode({"query": query, "size": 15})
    request = Request(url, headers={"Authorization": f"KakaoAK {key}"})
    data = request_json(request)
    return {"status": "fetched", "provider": "kakao_local", "query": query, "raw": data}


def fetch_naver(kind: str, query: str) -> JsonMap:
    client_id = os.environ.get("NAVER_CLIENT_ID")
    client_secret = os.environ.get("NAVER_CLIENT_SECRET")
    if not client_id or not client_secret:
        return {"status": "missing_credentials", "required_env": ["NAVER_CLIENT_ID", "NAVER_CLIENT_SECRET"], "kind": kind, "query": query}
    endpoint = "blog" if kind == "blog" else "local"
    url = f"https://openapi.naver.com/v1/search/{endpoint}.json?" + urlencode({"query": query, "display": 10})
    request = Request(url, headers={"X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret})
    data = request_json(request)
    return {"status": "fetched", "provider": f"naver_{kind}", "query": query, "raw": data}


def request_json(request: Request) -> JsonMap:
    with urlopen(request, timeout=15) as response:
        return json.loads(response.read().decode("utf-8"))


def load_input(path: Path) -> ReviewResearchInput:
    with path.open("r", encoding="utf-8") as file:
        return ReviewResearchInput.from_dict(json.load(file))


def write_json(path: Path, data: JsonMap) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def clamp(value: int | float) -> int:
    return max(0, min(100, int(value)))


def null_value() -> None:
    return None


def unique_query_tokens(*parts: str) -> list[str]:
    seen = set()
    result = []
    for part in parts:
        for token in part.strip().split():
            if token in seen:
                continue
            seen.add(token)
            result.append(token)
    return result


def required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str) or not value.strip():
        raise TypeError(f"{field_name} must be a non-empty string.")
    return value


def optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
    return value


def optional_int(value: Any, field_name: str) -> int:
    if not isinstance(value, int):
        raise TypeError(f"{field_name} must be an integer.")
    return value


def optional_int_or_none(value: Any, field_name: str) -> int | None:
    if value is None:
        return None
    return optional_int(value, field_name)


def optional_float_or_none(value: Any, field_name: str) -> float | None:
    if value is None:
        return None
    if isinstance(value, int | float):
        return float(value)
    raise TypeError(f"{field_name} must be a number or null.")


def list_of_maps(value: Any, field_name: str) -> list[JsonMap]:
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list.")
    if not all(isinstance(item, dict) for item in value):
        raise TypeError(f"{field_name} must contain only objects.")
    return value


def tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
