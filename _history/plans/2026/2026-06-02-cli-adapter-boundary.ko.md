# CLI 어댑터 경계 계획

## 요청

플랫폼은 설치형이지만 다양한 CLI를 사용할 수 있고, 특정 CLI에 종속되지 않으며, 플랫폼 위에서 CLI들을 이용하는 방식으로 동작해야 한다는 요청.

## 작업 모드

- `governance`

## 근거

- 외부 명령 실행 공식 문서: shell/인자/timeout/stdout/stderr 경계가 필요하다.
- Tauri command scope: desktop shell의 로컬 명령 실행은 권한 경계가 필요하다.
- Ports/adapters와 attached resources: CLI는 플랫폼 내부가 아니라 attachable adapter로 다루는 것이 맞다.

## 계획

1. `REQ-WS-053` 추가.
2. CLI adapter registry 작성.
3. CLI adapter policy, workflow, prompt 작성.
4. installable platform/desktop app 문서와 설정에 CLI-neutral 경계 반영.
5. memory bootstrap, router, index에 탐색 경로 연결.
6. 히스토리/평가/검증 후 커밋 및 push.
