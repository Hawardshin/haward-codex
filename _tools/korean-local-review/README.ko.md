# Korean Local Review Research

## 목적

한국 사용자를 기준으로 장소, 제품, 서비스, 오프라인 경험을 조사할 때 Naver Map, Kakao Map, Naver Blog/Search, 공식 페이지, 기사/커뮤니티 후보를 함께 비교하기 위한 도구다.

이 도구는 리뷰 텍스트를 무단 크롤링하지 않는다. 기본 기능은 검색 계획 생성과 후보 소스 품질 점수화다. API 키가 있으면 공식 API로 검색 결과 후보를 가져올 수 있지만, 지도 리뷰 본문 전체는 공식 API에서 항상 제공되는 데이터가 아니므로 증거로 쓸 때는 원문 페이지와 접근일을 별도로 기록한다.

## 언제 쓰나

- 한국 사용자 리뷰, 장소 평가, 매장/병원/학원/숙박/맛집/지역 서비스 조사가 필요할 때
- Google 검색보다 Naver Blog/Search, Naver Map, Kakao Map 쪽의 현지 신호가 더 강할 때
- 광고성 후기, 오래된 후기, 단일 플랫폼 편향을 줄이고 싶을 때
- 어떤 페이지를 근거로 쓸지 품질을 비교해야 할 때

## 명령

검색 계획 생성:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py query-plan --topic "성수동 브런치" --region "성수동" --category "브런치"
```

입력 템플릿 생성:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py init /tmp/korean-review.json --topic "성수동 브런치" --region "성수동" --category "브런치" --access-date 2026-05-31
```

후보 점수화:

```bash
python3 _tools/korean-local-review/src/korean_local_review.py score /tmp/korean-review.json --output /tmp/korean-review.md --json-output /tmp/korean-review-score.json
```

Kakao Local API 후보 수집:

```bash
KAKAO_REST_API_KEY=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-kakao --query "성수동 브런치" --output /tmp/kakao-local.json
```

Naver Search API 후보 수집:

```bash
NAVER_CLIENT_ID=... NAVER_CLIENT_SECRET=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-naver --kind blog --query "성수동 브런치 후기" --output /tmp/naver-blog.json
NAVER_CLIENT_ID=... NAVER_CLIENT_SECRET=... python3 _tools/korean-local-review/src/korean_local_review.py fetch-naver --kind local --query "성수동 브런치" --output /tmp/naver-local.json
```

## 점수 원칙

- `korean_user_fit_score`: 한국 사용자가 실제로 참고할 가능성이 높은 플랫폼, 한국어성, 지역성, 최신성, 사진/영수증/리뷰 수를 반영한다.
- `evidence_strength_score`: 근거로 쓰기 좋은 정도다. 공식 페이지, 지도 장소 페이지, 리뷰 수, 최신성, 광고 위험, caveat를 반영한다.
- `bias_risk_score`: 광고성, 단일 출처 의존, 낮은 리뷰 수, 지나치게 높은 평점 같은 편향 가능성이다.

지도/블로그 리뷰는 사실 증명이 아니라 사용자 경험 신호다. 영업시간, 가격, 위치 같은 사실은 공식 페이지나 지도 장소 정보로 확인하고, 만족도/분위기/혼잡도 같은 경험 판단은 Naver/Kakao/블로그/커뮤니티를 교차 확인한다.

## 검증

```bash
python3 -m unittest discover -s _tools/korean-local-review/tests
```
