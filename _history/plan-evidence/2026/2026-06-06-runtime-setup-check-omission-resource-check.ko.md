# Omission and Resource Check: Runtime Setup Check

## 누락 방지 체크

- 사용자 요청: 터미널 설정과 자동 CLI 설정이 되었는지 확인하는 기능 추가.
- 반영: settings > CLI adapter 섹션에 `설정 점검` 액션과 결과 패널 추가.
- CLI 확인: 기존 `run_cli_adapter_health`와 `list_cli_adapters`를 사용.
- 터미널 확인: 새 `check_runtime_terminal_setup` command로 shell/cwd 해석만 확인.
- UI 확인: `data-runtime-setup-check="settings"` 패널, terminal/CLI 결과 카드, fallback error 표시.
- 비범위 확인: CLI 자동 설치, 로그인 자동화, startup command 실행은 하지 않음.
- 검증 확인: renderer test/check, Rust check, package internal, browser 렌더링 확인.

## 리소스 체크

- resource_risk_occurred: true
- 새 장기 실행 세션: 없음.
- 새 native PTY session 생성: 없음.
- 새 terminal setup check는 command/cwd 해석만 수행하고 child process를 만들지 않음.
- 기존 CLI health check는 bounded version command만 실행하며 timeout/output bound가 기존 `HEALTH_TIMEOUT_MS`, `MAX_HEALTH_OUTPUT_BYTES`를 따른다.
- 개발 서버: browser 확인용 Next dev server를 `http://localhost:3100`에서 시작했고 확인 후 `Ctrl-C`로 종료했다.
- Browser tab: 확인 후 닫았다.
- package pipeline: Tauri app/DMG 생성 후 pipeline이 정상 종료했다.

## 결론

- coverage_ready.
- resource_ready.
