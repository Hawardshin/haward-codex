# Evaluation: Runtime Customization Layer

## 평가 기준

- 커스텀 설정이 저장되는가.
- UI에서 사용자가 어떤 값을 바꿔야 하는지 알 수 있는가.
- provider 실행과 terminal 실행의 실제 경로에 반영되는가.
- 기존 provider credential, PTY, quick command 기능을 깨뜨리지 않는가.
- 빌드 검증까지 완료되는가.

## 현재 평가

- `runtimeCustomization`이 preferences에 포함되어 저장/로드된다.
- provider 모델/base URL, terminal shell/startup command, quick command UI가 추가됐다.
- `run_provider_agent_task`와 `list_provider_models`가 preferences override를 읽는다.
- `start_native_pty_terminal` args에 shell command가 들어가고 startup command는 PTY stdin으로 전송된다.
- `RuntimeTerminalDrawer`는 외부 quick command prop을 우선 사용한다.

## 검증 상태

- renderer test/check, Rust fmt/check, desktop service test/check 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal` 통과.
- 내부 macOS `.app`와 `.dmg` 생성 및 `codesign --verify --deep --strict`, `hdiutil verify` 통과.

## 잔여 리스크

- provider별 인증/호환 proxy 차이는 사용자가 입력한 base URL의 실제 서버 구현에 따라 달라진다.
- Anthropic/Gemini 전체 모델 목록 API는 이번 범위에서 구현하지 않았다.
- public 배포 readiness의 기존 경고인 Developer ID 서명, notarization, updater, clean-machine smoke test는 별도 공개 배포 범위로 남아 있다.
