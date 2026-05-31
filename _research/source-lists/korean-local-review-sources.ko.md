# 한국 사용자 리뷰/로컬 조사 소스

## 목적

한국 사용자를 기준으로 장소, 서비스, 오프라인 경험, 로컬 제품을 평가할 때 우선 확인할 검색 원천과 품질 기준이다.

## 우선순위

| 우선순위 | 소스 | 사용 방식 | 주의 |
| --- | --- | --- | --- |
| 1 | 공식 페이지/사업자 페이지 | 영업시간, 가격, 위치, 정책 같은 사실 확인 | 최신성 확인 필요 |
| 2 | Naver Map | 한국 사용자의 지도/방문자 리뷰/사진/검색 신호 | 리뷰 본문은 원문 확인 |
| 3 | Naver Blog/Search | 장문 후기, 내돈내산, 웨이팅/주차/혼잡도 신호 | 광고/협찬 표시 확인 |
| 4 | Kakao Map | 대체 지도 리뷰와 위치/길찾기 교차 확인 | Naver와 충돌하면 둘 다 기록 |
| 5 | 커뮤니티/뉴스 | 이슈, 불만, 장기 경험, 실패 사례 | 단독 사실 근거로 쓰지 않음 |
| 6 | Google/Instagram/YouTube | 보조 신호, 외국인 관점, 이미지/영상 맥락 | 한국 로컬 신호보다 보조로 사용 |

## 도구

```bash
python3 _tools/korean-local-review/src/korean_local_review.py query-plan --topic "조사 주제" --region "지역" --category "분류"
python3 _tools/korean-local-review/src/korean_local_review.py score /tmp/korean-review.json --output /tmp/korean-review.md
```

## 원칙

- 리뷰는 사용자 경험 신호다. 사실 주장은 공식 페이지나 지도 장소 정보로 확인한다.
- 하나의 플랫폼만 보고 결론을 내리지 않는다.
- 한국 사용자가 실제로 보는 검색 경로를 우선한다.
- 광고/협찬/체험단/오래된 글은 caveat로 남긴다.
- 근거로 쓸 값은 정확한 URL, 접근일, 플랫폼, key claim을 함께 기록한다.
