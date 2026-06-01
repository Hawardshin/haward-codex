# 계획 기록: CLI Pipeline Orchestration

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 관련 요구사항: `REQ-WS-058`

## 모드 선택

`governance`를 선택했다. 이유는 사용자 요청이 플랫폼의 실행 계약, CLI adapter 정책, evaluator close-out target, memory bootstrap, workflow/prompt navigation을 바꾸는 durable behavior이기 때문이다.

## 이전 참고

- 기존 `REQ-WS-053`: 플랫폼은 특정 CLI에 종속되지 않고 CLI adapter를 통해 외부 CLI를 붙인다.
- 기존 `_ops/workflows/66-cli-adapter-integration.md`: 단일 CLI adapter 경계와 설치/permission/fallback을 정의한다.
- 기존 `REQ-WS-057`: subprocess와 stream이 포함된 런타임 위험은 resource check target을 남긴다.

## 외부 근거

- Python subprocess 공식 문서: process, pipe, timeout, argv-style args
- Node child_process 공식 문서: spawned process streams
- Bash pipeline 공식 문서: stdout/stdin 연결 의미
- OWASP command injection guidance: allowlist와 argument handling

## 실행 계획

1. 요구사항 `REQ-WS-058` 추가
2. `check-cli-pipeline` 검증기와 template 추가
3. evaluator에 `cli_pipeline_occurred`, `cli_pipeline_targets` 조건부 gap 추가
4. work mode registry에 `cli_pipeline_record` enforcement layer 추가
5. CLI adapter 정책, workflow/prompt, router/index, persistent instructions, memory bootstrap 갱신
6. history/evaluation/timing 기록 후 검증, commit, push

## 결정

실제 runner는 이번 범위에서 제외한다. 지금은 실행 전에 process graph를 정형화하고 안전/리소스/근거/검증 누락을 막는 구조를 먼저 만든다.
