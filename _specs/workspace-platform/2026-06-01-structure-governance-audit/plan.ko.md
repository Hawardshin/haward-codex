# 계획: 구조 거버넌스 감사

## 작업 모드

- `governance`

## 근거

- 사용자 요청이 durable repository structure와 project boundary 규칙을 바꾸는 작업이다.
- 웹 검색에서 monorepo는 ownership과 boundary를 명확히 하고, 문서 구조는 source와 generated output을 분리하며, 책임 경계를 코드/문서로 드러내는 방향이 중요하다는 점을 확인했다.

## 단계

1. 현재 root folder와 project registry를 감사한다.
2. 구조 개선점을 문서로 정리한다.
3. root folder class를 self-documenting JSON policy로 만든다.
4. deterministic `structure-audit` tool과 테스트를 만든다.
5. `.gitignore`, project boundary docs, workflow, memory bootstrap을 갱신한다.
6. `workspace-monitor` snapshot 범위를 `_docs`와 `_philosophy`까지 확장한다.
7. 도구, config, monitor, memory, map, evaluation 검증을 실행한다.
