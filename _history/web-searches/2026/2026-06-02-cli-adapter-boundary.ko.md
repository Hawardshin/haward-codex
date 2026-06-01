# 웹 검색 기록: CLI 어댑터 경계

## 요청

설치형 플랫폼이지만 다양한 CLI를 사용할 수 있고, 특정 CLI에 종속되지 않으며, 플랫폼 위에서 그런 CLI를 이용하는 방식으로 동작해야 한다는 요청.

## 검색어

- `Python subprocess official documentation run external command security considerations`
- `Node.js child_process official documentation spawn exec external command`
- `Tauri shell plugin official documentation execute commands scope`
- `GitHub CLI extensions official documentation`
- `12 factor app backing services attached resources official`
- `ports and adapters architecture Alistair Cockburn official`

## 확인한 출처

- Python subprocess: `https://docs.python.org/3/library/subprocess.html`
- Node.js child_process: `https://nodejs.org/api/child_process.html`
- Tauri command scopes: `https://v2.tauri.app/security/scope/`
- GitHub CLI extensions: `https://docs.github.com/github-cli/github-cli/using-github-cli-extensions`
- Twelve-Factor App backing services: `https://www.12factor.net/backing-services`
- Alistair Cockburn hexagonal architecture: `https://alistair.cockburn.us/hexagonal-architecture`

## 제외한 약한 출처

- 일반 블로그의 `spawn`/`exec` 설명은 공식 문서로 충분해 채택하지 않았다.
- Reddit/Stack Overflow 토론은 이번 작업이 코드 구현보다 운영 경계 정의이므로 보조 신호로만 보았다.

## 계획 반영

- CLI 호출은 shell string이 아니라 argv-style 실행, timeout, cwd, env allowlist, stdout/stderr 처리 계약을 가져야 한다.
- desktop shell에서 로컬 명령을 실행하면 command/path permission scope가 필요하다.
- 외부 CLI는 플랫폼 내부가 아니라 ports/adapters 방식의 교체 가능한 adapter capability로 다룬다.
- missing CLI는 전체 실패가 아니라 `capability_missing`으로 degrade해야 한다.

## 불확실성

- 이번 작업은 실행기 구현이 아니라 경계 설계다.
- 실제 adapter 구현 시 각 CLI의 최신 공식 문서와 설치/인증/업데이트 정책을 다시 확인해야 한다.
