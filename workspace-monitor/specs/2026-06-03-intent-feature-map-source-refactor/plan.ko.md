# 계획: Intent Feature Map 소스 구조 리팩터링

## 선택한 작업 모드

- `standard`

## 구조 후보

| 후보 | 설명 | 판단 |
| --- | --- | --- |
| 기존 collector 안에서 함수 순서만 정리 | 파일 이동이 없어 빠르지만 collector 비대화가 계속된다. | 기각 |
| 기능별 lib 모듈로 추출 | 의도 지도 파싱 책임을 독립 모듈에 두고 기존 collector API를 유지한다. | 선택 |

## 실행 순서

1. 웹 검색과 memory bootstrap으로 refactoring 기준과 hot anchor를 확인한다.
2. `intentFeatureMap` 파싱/빈 상태 생성 로직을 `scripts/lib/intent-feature-map.mjs`로 옮긴다.
3. `collect-workspace.mjs`는 import/re-export로 연결한다.
4. 지속 지침, 요구사항, spec, 히스토리를 갱신한다.
5. collector/test/build/docs/config 검증을 실행한다.

## 리스크와 통제

- API 호환성: `collect-workspace.mjs`에서 `collectIntentFeatureMap` re-export를 유지한다.
- snapshot 회귀: developer/customer intent-map checker를 실행한다.
- 문서 구조 회귀: `_docs` 변경 후 docs audit을 실행한다.
