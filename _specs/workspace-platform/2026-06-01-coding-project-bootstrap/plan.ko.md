# 계획: 코딩 프로젝트 bootstrap

1. 웹 검색으로 프로젝트 스캐폴딩과 generator 구조를 확인한다.
2. 요구사항 `REQ-WS-038`을 기준선과 변경/검토 기록에 추가한다.
3. `_tools/coding-project-bootstrap/`에 blueprint config, Python CLI, README, tests를 만든다.
4. 새 workflow와 prompt를 추가하고 prompt router, operations index, memory bootstrap에 연결한다.
5. workspace index, task board, workspace-monitor snapshot을 갱신한다.
6. 단위 테스트, config/memory checks, workspace-health, grounding, evaluation을 실행한다.
7. 커밋하고 `origin/main`에 push한다.

## 결정

- 외부 generator를 직접 실행하지 않고 로컬 최소 blueprint 방식을 선택한다.
- 프로젝트 낭비를 줄이기 위해 `create`도 `--apply` 없이는 dry-run만 출력한다.
- 실제 dependency 설치는 기존 installation audit 흐름으로 분리한다.
