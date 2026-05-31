# Korean Local Review Sources

## Purpose

These are the search origins and quality rules for Korean user-facing place, service, offline-experience, and local product research.

## Priority

| Priority | Source | Use | Caveat |
| --- | --- | --- | --- |
| 1 | Official page or owner profile | Facts such as hours, price, address, policy | Check freshness |
| 2 | Naver Map | Korean map, visitor review, photo, and search signals | Re-open exact review/place page |
| 3 | Naver Blog/Search | Long-form reviews and practical signals such as waiting, parking, crowding | Check ad/sponsorship disclosure |
| 4 | Kakao Map | Cross-check local map and alternate review signals | Record conflicts with Naver |
| 5 | Community/news | Issues, complaints, long-term experience, failure cases | Do not use alone as factual proof |
| 6 | Google/Instagram/YouTube | Supplemental signal, foreigner perspective, visual context | Secondary to Korean local signals |

## Tool

```bash
python3 _tools/korean-local-review/src/korean_local_review.py query-plan --topic "topic" --region "region" --category "category"
python3 _tools/korean-local-review/src/korean_local_review.py score /tmp/korean-review.json --output /tmp/korean-review.md
```

## Rules

- Reviews are user-experience signals. Verify factual claims through official pages or map place information.
- Do not close from a single platform.
- Prefer the search paths Korean users actually use.
- Record ad/sponsorship/tester/outdated-post caveats.
- For any value used as evidence, record exact URL, access date, platform, and key claim.
