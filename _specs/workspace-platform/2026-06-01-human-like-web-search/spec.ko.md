# 스펙: 사람형 웹 검색 강화

## 목표

웹 검색을 단순 키워드 검색에서 query ladder, source lane, snowballing, selective summary capture 기반의 반복 조사 구조로 승격한다.

## 범위

- `human-search-profile.json` 추가
- web-first workflow와 prompt router 연결
- source collector에 query-plan 명령 추가
- 요구사항, 히스토리, 평가 연결

## 요구사항

- `REQ-WS-041`

## 비범위

- 실제 검색 provider API adapter 구현
- 자동 웹 크롤링
- 장문 리포트 자동 생성
