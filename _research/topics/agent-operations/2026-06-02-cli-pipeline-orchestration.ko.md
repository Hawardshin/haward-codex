# CLI Pipeline Orchestration 조사 노트

- 날짜: 2026-06-02
- 주제: 여러 CLI 프로세스와 pipe를 플랫폼 실행 계약으로 모델링하는 방법
- 상태: 재사용 가능

## 핵심 요약

여러 CLI를 한 번에 실행하는 구조는 단일 명령 문자열이 아니라 process graph로 관리하는 편이 낫다. 그래야 process별 adapter, cwd, env allowlist, timeout, output bound, pipe edge, cancellation, cleanup, merge strategy를 검증할 수 있다.

## 근거 출처

- Python subprocess: https://docs.python.org/3/library/subprocess.html
- Node.js child_process: https://nodejs.org/api/child_process.html
- Bash pipelines: https://www.gnu.org/software/bash/manual/html_node/Pipelines.html
- OWASP OS Command Injection Defense: https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html
- 내부 정책: `agent-platform/configs/integrations/cli-adapter-registry.json`

## 설계 원칙

- CLI adapter는 개별 CLI의 availability/version/input/output/fallback을 맡는다.
- CLI pipeline은 여러 adapter process를 연결하는 상위 graph 계약을 맡는다.
- shell string은 기본값에서 제외하고, pipe는 `pipes` 배열로 표현한다.
- fan-out/fan-in은 merge strategy와 verification으로 닫는다.
- 실제 runner 구현 전에도 validator와 evaluator target을 먼저 둬야 누락을 줄일 수 있다.

## 적용 위치

- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`

## 한계

이 노트는 실행 계획 검증 설계에 관한 것이다. 실제 runner 구현, OS별 desktop permission, Tauri/Rust/Go/Node 선택, process group kill 구현은 별도 조사와 prototype measurement가 필요하다.
