# 요구사항 변경: 사람형 웹 검색 강화

## 배경

사용자는 웹검색이 더 좋아져야 하며, 사람이 실제로 검색하듯 더 많은 소스를 찾아내고 좋은 것은 요약하는 방향을 요청했다.

## 변경

- `REQ-WS-041` 추가.
- 검색 품질이 중요한 작업은 `human-search-profile.json`을 사용해 query ladder, 검색 연산자, source lane, community/contrary/regional 검색, snowballing을 수행한다.
- 좋은 출처는 답변, 계획, 위험 모델, 출처 목록, 재사용 지식에 영향을 줄 때만 요약한다.

## 영향

- `agent-platform/configs/research/human-search-profile.json`이 새 shared config가 된다.
- `_ops/workflows/54-human-like-source-discovery.md`와 `_ops/prompts/84-human-like-source-discovery.md`가 검색 확장 진입점이 된다.
- `_tools/source-collector/`는 query-plan 생성 기능을 제공한다.
