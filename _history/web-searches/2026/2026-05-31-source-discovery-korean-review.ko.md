# 웹 검색 기록: 출처 discovery와 한국 로컬 리뷰

## 검색 목적

원천값 출처와 계획 근거를 명확히 하고, 더 넓은 검색 원천과 한국 사용자 리뷰/로컬 조사 채널을 운영 구조에 추가한다.

## 검색어

- `Naver Search API blog local search official documentation Korean`
- `Kakao Local API search places official documentation reviews Kakao Map`
- `Naver Map reviews API official documentation place reviews`
- `Kakao Map reviews API official documentation place reviews`
- `한국 빅테크 공식 기술 블로그 네이버 카카오 라인 쿠팡 우아한형제들 토스`
- `Naver D2 official tech blog Kakao Tech Line Engineering Coupang Engineering Toss Tech`
- `Swiggy Engineering Blog official Zerodha Tech Blog official Razorpay Engineering Blog official India`
- `OpenAlex API official works search documentation`
- `Semantic Scholar API official Graph API paper search`
- `arXiv API official documentation`
- `W3C PROV provenance data model official documentation source attribution`

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| NAVER Search API | 공식 문서 | 2026-05-31 | Naver blog/local 검색을 공식 API 기반 후보 수집 채널로 기록 |
| Kakao Local API | 공식 문서 | 2026-05-31 | Kakao place search와 Kakao Map detail URL discovery 채널로 기록 |
| NAVER D2 | 공식/기술 블로그 | 2026-05-31 | 한국 빅테크 기술 블로그 seed |
| Kakao Tech | 공식/기술 블로그 | 2026-05-31 | 한국 빅테크 기술 블로그 seed |
| LINE Engineering | 공식/기술 블로그 | 2026-05-31 | 한국/글로벌 메신저 플랫폼 엔지니어링 seed |
| Toss Tech | 공식/기술 블로그 | 2026-05-31 | 한국 fintech/product engineering seed |
| Woowa Tech Blog | 공식/기술 블로그 | 2026-05-31 | 한국 배달/커머스 엔지니어링 seed |
| Zerodha Tech Blog | 기술 블로그 | 2026-05-31 | 인도 fintech engineering seed |
| Razorpay Blog | 기술/회사 블로그 | 2026-05-31 | 인도 payments/agentic SDLC source seed |
| Semantic Scholar API | 공식 문서 | 2026-05-31 | paper search와 citation graph |
| OpenAlex Works API | 공식 문서 | 2026-05-31 | scholarly graph와 paper metadata |
| arXiv API | 공식 문서 | 2026-05-31 | preprint metadata search |
| Papers with Code | 검색/오픈소스 | 2026-05-31 | paper-to-code, benchmark, dataset discovery |

## 제외하거나 약한 출처

- 지도 리뷰 전체 본문 scraping 방식: 공식 API/약관 범위가 불명확해 도구 기본 동작에서 제외했다.
- SEO식 “best tech blogs” 목록: seed discovery에는 참고 가능하지만 registry 근거는 공식/1차 페이지를 우선했다.
- 소셜/개인 글: discovery 신호로만 사용하고 사실 근거로 격상하지 않는다.

## 계획에 반영한 인사이트

- 한국 사용자 리뷰/로컬 판단은 Google보다 Naver Map, Naver Blog/Search, Kakao Map이 더 강한 시작점일 수 있다.
- 지도/블로그 리뷰는 사용자 경험 신호이며, 사실 claim은 공식 페이지나 지도 장소 정보로 교차 검증해야 한다.
- 논문 근거는 단일 검색엔진보다 Semantic Scholar/OpenAlex/arXiv/Papers with Code를 조합해야 유명도, 최신성, 코드 존재를 더 잘 볼 수 있다.
- source discovery는 일반 taxonomy와 겹치지 않도록 별도 registry로 관리한다.

## 남은 불확실성

- Naver/Kakao 리뷰 접근 범위는 API 정책과 서비스 약관 변화에 따라 달라질 수 있다.
- 일부 회사 블로그 URL은 개편될 수 있으므로 사용 전 exact page를 다시 확인한다.
