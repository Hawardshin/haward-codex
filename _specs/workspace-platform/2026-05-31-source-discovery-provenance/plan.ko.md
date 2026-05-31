# 계획: 출처 discovery, provenance, 한국 로컬 리뷰

## 실행 계획

1. 웹 검색으로 Naver/Kakao API, 한국/세계 기술 블로그, 인도 기술 소스, 논문 검색 원천을 확인한다.
2. planner/evaluator에 provenance/evidence 필드를 추가한다.
3. `source-discovery-registry.json`과 source list를 만든다.
4. `_tools/korean-local-review/`를 만들어 한국 사용자 기준 query plan과 후보 품질 점수화를 제공한다.
5. 기존 source collection, prompt, workflow, persistent instruction, memory bootstrap에 연결한다.
6. 겹치는 구조와 source of truth를 audit 문서로 정리한다.
7. 테스트, JSON/config 검증, 평가를 실행한다.

## 검증 전략

- Python unit tests
- JSON syntax validation
- config contract
- memory bootstrap
- tool CLI smoke tests
- work evaluation
- workspace index/task board checks
