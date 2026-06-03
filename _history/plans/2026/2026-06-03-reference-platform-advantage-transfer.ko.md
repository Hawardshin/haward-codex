# Plan: Reference Platform Advantage Transfer

- 날짜: 2026-06-03
- 모드: research + standard implementation
- 소유: `platform-desktop-app/`

## 진행 순서

1. web-first로 유사 플랫폼 공식/오픈소스/보안 소스 수집.
2. 현재 플랫폼 포지션과 비교 축 정리.
3. 제품군별 장점을 전환 패턴으로 분류.
4. 별도 registry를 만들고 snapshot/UI에 연결.
5. readiness/test/browser smoke로 검증.
6. research, request trace, evaluation, work summary 저장.

## 결정

- 조사 결과는 `product-feature-registry.json`에 직접 섞지 않고 `reference-platform-advantage-registry.json`로 분리한다.
- Overview 제품 패널에 보이게 해서 문서-only 회귀를 막는다.
- 실제 엔진 설치는 이번 범위 밖으로 두고, 향후 license/security/dependency audit 후 결정한다.

## 계획 변경

- deep-research-agent tool은 직접 사용 가능한 에이전트 도구로 노출되지 않아 수동 deep research 절차와 공식 문서 검증으로 대체했다.
