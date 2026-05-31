# Korean Local Review Research

## Purpose

This tool helps research Korean user-facing places, products, services, and offline experiences by comparing Naver Map, Kakao Map, Naver Blog/Search, official pages, articles, and community candidates.

It does not scrape review text. By default, it creates human-like search plans and scores candidate sources. When API keys are available, it can fetch official API candidates, but full map review text is not always available through official APIs. Record the exact source page and access date before using a candidate as evidence.

## Commands

Create a search plan:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py query-plan --topic "Seongsu brunch" --region "Seongsu" --category "brunch"
```

Create an input template:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py init /tmp/korean-review.json --topic "Seongsu brunch" --region "Seongsu" --category "brunch" --access-date 2026-05-31
```

Score candidates:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py score /tmp/korean-review.json --output /tmp/korean-review.md --json-output /tmp/korean-review-score.json
```

Fetch official API candidates when credentials exist:

```bash
KAKAO_REST_API_KEY=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-kakao --query "성수동 브런치" --output /tmp/kakao-local.json
NAVER_CLIENT_ID=... NAVER_CLIENT_SECRET=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-naver --kind blog --query "성수동 브런치 후기" --output /tmp/naver-blog.json
NAVER_CLIENT_ID=... NAVER_CLIENT_SECRET=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-naver --kind local --query "성수동 브런치" --output /tmp/naver-local.json
```

## Scoring

- `korean_user_fit_score`: likely usefulness for Korean users, based on platform fit, Korean language, locality, freshness, photos, receipts, and review counts.
- `evidence_strength_score`: how useful the candidate is as evidence.
- `bias_risk_score`: ad, single-source, low-review-count, and suspicious rating risks.

Map and blog reviews are user-experience signals, not proof. Facts such as hours, prices, and location should be checked against official pages or map place information; satisfaction, atmosphere, crowding, and usability should be cross-checked across Naver, Kakao, blogs, and communities.
