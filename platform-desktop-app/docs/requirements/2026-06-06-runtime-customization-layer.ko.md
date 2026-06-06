# Requirement: Runtime Customization Layer

## 배경

실사용자는 기본 provider, 모델, API 주소, 셸, 터미널 시작 명령, 빠른 명령을 자신의 로컬 환경과 계정 구조에 맞게 바꿀 수 있어야 한다. 설정 화면에 값이 보이더라도 실제 provider 호출이나 native PTY 시작 경로에 반영되지 않으면 커스텀 기능으로 볼 수 없다.

## 요구사항

- `REQ-RCL-001`: 데스크톱 preferences는 provider별 기본 모델과 API base URL override를 저장하고 앱 재시작 뒤에도 유지해야 한다.
- `REQ-RCL-002`: provider 직접 실행은 저장된 기본 모델과 base URL override를 실제 HTTP endpoint 생성에 사용해야 한다.
- `REQ-RCL-003`: provider 모델 목록 확인은 Ollama 같은 로컬 런타임의 커스텀 base URL을 사용해야 한다.
- `REQ-RCL-004`: native PTY 시작은 사용자가 지정한 셸 명령을 Tauri command에 전달해야 한다.
- `REQ-RCL-005`: native PTY 시작 후 사용자가 지정한 시작 명령을 stdin으로 전송할 수 있어야 한다.
- `REQ-RCL-006`: 터미널 빠른 명령은 설정에서 편집 가능해야 하며 드로어의 실제 버튼 목록에 반영되어야 한다.
- `REQ-RCL-007`: 커스텀 설정 UI는 기본 `<select>`에 의존하지 않고 기존 앱 버튼/카드/입력 스타일을 사용해야 한다.
- `REQ-RCL-008`: 저장값은 등록된 provider, 길이 제한, 모델 id 문자 제한, http/https base URL 제한으로 정규화되어야 한다.

## 비범위

- OAuth 자동 로그인, 브라우저 세션 cookie 저장, API key 자동 발급.
- OS keychain으로 secret 저장소를 교체하는 작업.
- 모든 provider의 전체 모델 카탈로그 API를 새로 구현하는 작업.
- 새 Tauri store plugin 설치. 현재 앱의 Rust preferences JSON 저장 경로를 확장한다.

## 수용 기준

- 설정의 `실행 커스텀` 섹션에서 provider 모델/base URL, 터미널 셸/시작 명령, 빠른 명령을 편집할 수 있다.
- `run_provider_agent_task`는 커스텀 모델과 base URL을 사용한다.
- `start_native_pty_terminal` 호출은 커스텀 셸 명령을 포함한다.
- 시작 명령은 PTY 생성 후 `write_native_pty_terminal_input`으로 전송된다.
- `RuntimeTerminalDrawer`는 저장된 빠른 명령을 우선 렌더링한다.
- renderer test/check, Rust check, internal package build가 통과한다.
