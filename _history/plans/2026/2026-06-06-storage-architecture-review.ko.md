# Storage Architecture Review Plan

작성일: 2026-06-06

## 실행 계획

1. 웹 검색으로 공식 근거 확인
2. 현재 Workspace Monitor collector와 Tauri runtime persistence 조사
3. 파일 유지 대상과 DB 후보 대상 분류
4. 하이브리드 저장소 registry 작성
5. 요구사항, 아키텍처 리뷰, 스펙, traceability 작성
6. 관련 제품 registry 업데이트
7. collect/check/test/build/package 검증
8. 평가/요약/trace 작성 후 commit/push

## 주요 판단

전체 DB 전환이 아니라 embedded operational DB를 추가하는 방식이 맞다. durable repository knowledge는 파일로 유지한다.
