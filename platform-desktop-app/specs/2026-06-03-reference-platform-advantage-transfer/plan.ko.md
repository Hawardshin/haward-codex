# Plan

1. 공식/오픈소스/보안 중심으로 유사 플랫폼을 조사한다.
2. 조사 결과를 제품 적용 패턴으로 정리해 새 registry에 저장한다.
3. snapshot collector와 TypeScript snapshot type에 `referencePlatformAdvantages`를 추가한다.
4. Overview 제품 기능 패널에 레퍼런스 장점 적용 지도를 추가한다.
5. customer snapshot sanitizer와 readiness/test 회귀 검사를 추가한다.
6. build/test/browser smoke로 UI와 데이터 경로를 검증한다.

## 선택한 구조

- 별도 registry: `configs/reference-platform-advantage-registry.json`
- 이유: 제품 feature registry에 외부 레퍼런스와 적용 상태를 섞지 않고, 출처와 전환 상태를 독립 추적하기 위함.

## 위험

- direct fetch가 제한된 Cursor 문서는 중간 신뢰도 처리.
- 조사 결과만 쌓고 제품에 반영하지 않는 회귀.
- customer snapshot에 내부 research/source path가 노출되는 회귀.
