# 비정형 데이터 정형화 정책

## 목적

AI의 중요한 강점 중 하나는 비정형 또는 반정형 입력을 사람이 검토할 수 있는 구조로 바꾸는 것이다. 이 플랫폼은 그 능력을 단순 요약이 아니라 요구사항, 스펙, 태스크, evidence item, 테이블, JSON, 설정 파일, 평가 입력처럼 재사용 가능한 구조로 승격한다.

## 원칙

- 먼저 목표 schema를 정하고 추출한다.
- 직접 추출한 값과 모델이 해석한 값은 분리한다.
- 중요한 값에는 출처 위치, 접근일, 원문 조각 또는 관찰 위치를 남긴다.
- 모르는 값은 추측하지 말고 `unknown`, `not_provided`, `ambiguous`, `conflicting`처럼 표시한다.
- 정형화된 결과가 자동화나 의사결정에 쓰이면 schema validation, provenance audit, sample review를 거친다.

## 사용 경로

- profile: `agent-platform/configs/usage/unstructured-data-structuring-profile.json`
- workflow: `_ops/workflows/67-structure-unstructured-data.md`
- prompt: `_ops/prompts/98-structure-unstructured-data.md`

## 주의

정형화된 데이터는 보기 때문에 더 믿기 쉬워진다. 그러나 보기 좋은 표나 JSON도 근거가 없으면 추정일 뿐이다. 이 플랫폼에서는 정형화 결과를 근거로 쓰기 전에 출처와 검증 단계를 확인한다.
