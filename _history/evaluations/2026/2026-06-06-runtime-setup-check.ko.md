# Evaluation: Runtime Setup Check

## 평가 기준

- 설정 화면에서 터미널/CLI 설정 점검을 바로 실행할 수 있는가.
- CLI 점검은 기존 Tauri runtime health 경로를 재사용하는가.
- 터미널 점검은 startup command를 실행하지 않고 command/cwd 해석만 확인하는가.
- UI에서 상태, 경로, 오류를 구분해 볼 수 있는가.
- 검증과 internal package build가 통과하는가.

## 현재 평가

- `check_runtime_terminal_setup` command를 추가해 terminal shell command, fallback shell, working dir 해석 결과를 반환한다.
- settings > CLI adapter 섹션에 `설정 점검` 버튼과 terminal/CLI 결과 패널을 추가했다.
- selected CLI는 `run_cli_adapter_health`와 `list_cli_adapters`로 실제 PATH/version 상태를 확인한다.
- 브라우저 preview에서는 Tauri runtime 없음 fallback error가 정상 표시됐다.

## 검증 상태

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
- Browser 확인: `http://localhost:3100`에서 설정 모달 > CLI 어댑터 섹션의 check UI 렌더링과 fallback error 확인.

## 잔여 리스크

- settings modal은 Desktop Runtime panel의 임시 working dir state를 직접 쓰지 않는다. 현재 check는 앱 workspace default 기준이다.
- startup command는 안전상 실행하지 않으므로 `.venv` 활성화나 `nvm use` 성공 여부는 사용자가 실제 terminal start로 확인해야 한다.
- public release readiness의 기존 경고는 이번 범위가 아니다.
