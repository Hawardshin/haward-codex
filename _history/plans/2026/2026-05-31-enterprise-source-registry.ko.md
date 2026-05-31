# 계획 기록: 대기업/고신뢰 출처 registry

## 목표

대기업과 높은 수준의 사이트 목록을 별도 관리 구조로 만든다.

## 조사 기반 판단

- 공식 engineering blog와 research lab은 반복 조사에서 seed로 유용하다.
- 일반 source taxonomy에 모든 URL을 섞으면 분류 목적과 curated site list 목적이 흐려진다.
- 목록은 proof가 아니므로 freshness/caveat/last_checked를 필드로 남겨야 한다.

## 실행 계획

1. `enterprise-source-registry.json`을 만든다.
2. `_research/source-lists/`에 한영 요약 목록을 만든다.
3. source collection policy, research configs, workflows, prompts, memory bootstrap을 갱신한다.
4. 요구사항, 스펙, 요청 요약, 요청-결과 추적, 작업 요약, 평가 파일을 갱신한다.
5. JSON, config contract, memory bootstrap, grounding/evaluation, maps를 검증한다.
6. 커밋하고 push한다.

## 변경 중 결정

- 자동 수집기는 만들지 않았다. 지금은 curated seed list가 요구에 충분하다.
- RSS/자동 scoring은 반복 갱신 비용이 커질 때 `_tools/source-collector/` 확장 후보로 둔다.
