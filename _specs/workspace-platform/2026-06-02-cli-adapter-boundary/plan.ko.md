# 계획: CLI 어댑터 경계

## 작업 모드

- `governance`

## 근거

- Python/Node 공식 문서는 외부 명령 실행에서 shell 사용, 인자 처리, timeout, stdout/stderr 처리가 중요한 경계임을 보여준다.
- Tauri command scope 자료는 데스크톱 앱에서 로컬 명령 실행 시 권한 범위가 명시되어야 함을 보여준다.
- Ports and adapters와 attached resources 관점은 외부 CLI를 플랫폼 내부가 아니라 교체 가능한 외부 capability로 다루는 설계 근거다.

## 순서

1. `REQ-WS-053`을 요구사항 기준선에 추가한다.
2. `cli-adapter-registry.json`을 만든다.
3. CLI adapter policy, workflow, prompt를 만든다.
4. platform identity, installable product policy, desktop product boundary를 갱신한다.
5. memory bootstrap, router, index, README를 갱신한다.
6. 히스토리, 평가, 타이밍 기록을 남긴다.
7. 검증 후 커밋/push한다.
