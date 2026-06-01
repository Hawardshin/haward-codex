# 웹 검색 기록: Workspace Health 사용성/유지보수성

## 검색 정보

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-017`
- 작업 모드: `governance`
- 목적: 운영 CLI의 사용성과 유지보수성을 개선하기 위한 출력, 필터, JSON 지원 근거 확인

## 검색 쿼리

- `CLI usability best practices command line interface design JSON output filters`
- `software maintainability documentation checklist developer experience repository tooling best practices`
- `command line interface guidelines subcommands flags json output human readable output`
- `developer experience internal tools health check usability maintainability best practices`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://clig.dev/ | guide | CLI는 사람이 쓰는 기본 출력과 구조화된 JSON 출력의 목적을 분리해야 함 | `--json` 출력 추가 |
| https://www.patternfly.org/developer-resources/cli-handbook | guide | CLI 출력은 명확하고 구조적이어야 하며 filter/status 같은 flags가 유용함 | category label과 `--category` 추가 |
| https://learn.microsoft.com/en-us/dotnet/standard/commandline/design-guidance | official docs | 일반적인 CLI option pattern과 사용자가 익숙한 동작을 지원해야 함 | `--list`, `--category`, `--json`을 명시적 flag로 유지 |
| https://devcenter.heroku.com/articles/cli-style-guide | official docs | machine-readable output은 필요할 때 `--json`으로 제공하는 것이 좋음 | JSON 출력이 순수 JSON만 출력하도록 수정 |

## 계획 영향

- 기본 출력은 사람이 읽는 pass/fail summary로 유지한다.
- `--list`는 category와 상대 경로 기반 command를 보여준다.
- `--json`은 후속 agent, dashboard, CI가 parse할 수 있도록 순수 JSON만 출력한다.
- `--category`는 `governance`, `projects`, `tools`, `frontend` 단위로 빠른 부분 점검을 가능하게 한다.

## 불확실성

- CI는 아직 범위 밖이다. JSON 출력은 추후 CI나 `workspace-monitor` integration의 준비 단계로 둔다.

## 공개 결정 요약

Workspace Health는 사람용 기본 출력, 자동화용 JSON 출력, category filter를 모두 제공해야 한다.
