# 2026-06-07 최근 구현 코드 한국어 주석 웹 검색 기록

## 목적

최근 Rust/TypeScript/Node 구현 코드에 한국어 주석을 추가할 때 모든 줄을 설명하는 방식이 아니라 유지보수 의도와 경계 조건을 설명하는 방식이 적절한지 확인했다.

## 검색어

- `official code comments best practices comments explain why not what`
- `Google developer documentation code comments explain why not what`
- `Rust documentation comments best practices code comments`

## 확인한 출처

- Google Developers Style Guide, API reference code comments: https://developers.google.com/style/api-reference-comments
- Rust By Example, Comments: https://doc.rust-lang.org/rust-by-example/hello/comment.html

## 판단 요약

주석은 API/공개 계약, 실패 조건, 안전 경계, 반복 실행 이유처럼 코드만으로 의도를 바로 알기 어려운 부분에 붙이는 방향으로 적용했다. 단순 대입이나 함수 호출을 다시 말하는 주석은 추가하지 않았다.

## 계획 영향

최근 변경 파일 전체를 무차별 주석화하지 않고, 앱 셸, 앱 업데이트, DMG cleanup/recovery, readiness source aggregate의 의도와 경계 조건에 한국어 주석을 추가했다.
