# 웹 검색 기록: CLI Pipeline Orchestration

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 요청: CLI 한 번으로 내부에서 여러 프로세스가 돌고, 여러 CLI를 pipe 등으로 실행하는 구조를 만들기.

## 검색어

- `Python subprocess Popen pipeline official documentation pipe stdout stdin`
- `Node.js child_process spawn pipe official documentation stdio`
- `Bash manual pipelines official documentation pipe`
- `OWASP command injection prevention cheat sheet command execution`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| https://docs.python.org/3/library/subprocess.html | 공식 문서 | Python 표준 라이브러리는 child process 생성, stdin/stdout/stderr pipe, timeout, argv-style args를 다룬다. | `check-cli-pipeline`의 process node에 cwd, timeout, output bound, argv args를 둔다. |
| https://nodejs.org/api/child_process.html | 공식 문서 | Node child process는 stream 기반 stdout/stderr/stdin과 spawn 계열 실행을 제공한다. | UI/desktop/daemon 쪽 구현이 TypeScript/Node가 되더라도 동일한 process graph 계약을 유지한다. |
| https://www.gnu.org/software/bash/manual/html_node/Pipelines.html | 공식 문서 | shell pipeline은 명령들의 stdout/stdin 연결이다. | 이 의미를 shell string이 아니라 `pipes` 배열로 명시한다. |
| https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html | 보안 가이드 | command injection 방어에는 allowlist와 argument handling이 중요하다. | adapter allowlist, argv args, shell disabled by default, secret/output redaction을 필수 safety control로 둔다. |
| `agent-platform/configs/integrations/cli-adapter-registry.json` | 내부 근거 | CLI-neutral adapter boundary와 shell string 회피 원칙이 이미 있다. | 기존 adapter registry 위에 pipeline graph 계약을 얹는다. |

## 제외한 약한 출처

- 일반 블로그의 shell pipeline 예제는 공식 문서보다 근거력이 낮아 설계 근거로 쓰지 않았다.
- Stack Overflow/Reddit 토론은 이번 작업이 특정 CLI 버그 해결이 아니라 실행 계약 설계이므로 보조 신호로도 필요성이 낮았다.

## 계획 반영 인사이트

- 실제 runner보다 먼저 process graph validator가 필요하다.
- shell string을 그대로 받는 구조는 검증과 취소/정리에 취약하므로 기본값에서 제외한다.
- pipeline 검증은 resource leak 검증과 겹치지만 동일하지 않다. 따라서 `resource_check_targets`와 별도로 `cli_pipeline_targets`를 둔다.

## 남은 불확실성

- 실제 runner 구현 시 Python `subprocess`, Node `child_process`, Go `os/exec`, Rust `std::process` 중 어느 runtime이 최적인지는 별도 런타임 결정 기록이 필요하다.
- desktop app에서 실행할 때는 OS별 permission/sandbox 정책을 별도 제품화 단계에서 확인해야 한다.
