# 아키텍처 우선 코딩 정책

## 목적

소스 코드는 단순 구현 결과가 아니라 선택한 아키텍처의 표현이어야 한다. 코드를 작성하기 전에는 검증된 아키텍처 프레임워크, reference architecture, 잘 구조화된 오픈소스 구조를 먼저 확인하고 선택 근거를 남긴다.

## 지속 규칙

- 소스 코드 작성 전 `coding-research-agent`를 사용한다.
- 웹 검색으로 최신/외부 근거를 확인한다.
- 최소 두 개의 아키텍처 옵션을 비교한다.
- `architecture_reference_sources`에 아키텍처 프레임워크, reference architecture, ADR, C4/arc42/SEI 자료, 프로젝트 `docs/architecture` 예시를 기록한다.
- `architecture_options`에 후보 구조와 trade-off를 기록한다.
- `architecture_decision_notes`에 선택한 구조, 제외한 대안, 모듈/서비스 경계, 품질 속성, 검증 영향을 기록한다.
- 구현 참고 코드는 별도로 `code_reference_sources`, `code_reference_notes`에 남긴다.

## 우선 참고 범주

| 범주 | 예시 | 사용 목적 |
| --- | --- | --- |
| Well-Architected Framework | AWS, Azure, Google Cloud | 품질 속성, 운영성, 보안, 신뢰성 질문 |
| Architecture Documentation | C4, arc42, SEI Views and Beyond | 구조를 설명하고 검토 가능한 형태로 남김 |
| Reference Architecture | 공식 reference architecture, 성숙한 프로젝트 architecture 문서 | 구조 후보와 경계 비교 |
| Source Architecture | 유지보수되는 오픈소스의 `src/`, `tests/`, `docs/architecture` | 실제 코드 경계와 테스트 구조 확인 |
| ADR | architecture decision record | 선택 근거와 대안 추적 |

## 금지

- 문서 하나나 예제 하나만 보고 바로 구현하지 않는다.
- 인기, 별표, 좋아요를 아키텍처 정답으로 취급하지 않는다.
- reference architecture를 그대로 복제하지 않는다.
- 로컬 프로젝트 범위, 데이터 흐름, 운영 복잡도, 테스트 가능성에 맞지 않는 구조를 도입하지 않는다.

## 검증

- `complete-coding-research`가 `architecture_reference_sources`, `architecture_options`, `architecture_decision_notes` 누락을 gap으로 잡는다.
- 구현 후 테스트 계획은 선택한 아키텍처의 경계, 에러 처리, 통합점, 회귀 위험을 검증해야 한다.

