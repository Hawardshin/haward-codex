# Web Search: Runtime Setup Check

## 질의

- `Tauri command invoke check installed CLI PATH official docs`
- `Node.js child_process execFile command path check official docs`
- `macOS shell PATH GUI app command line tools Tauri official docs`

## 확인한 주요 출처

- Node.js child process documentation: https://nodejs.org/api/child_process.html
- Tauri macOS bundle documentation: https://v1.tauri.app/v1/guides/building/macos/

## 계획 영향

- command lookup은 런타임의 `PATH`에 좌우되므로 renderer-only 체크가 아니라 Tauri/Rust runtime에서 점검한다.
- shell command를 실제로 실행하지 않고 command/cwd 해석만 확인해 shell injection 및 장기 프로세스 위험을 피한다.
- Tauri 문서는 macOS/Linux GUI 앱이 shell dotfile `PATH`를 상속하지 않을 수 있음을 알려, 설정 화면의 점검 결과를 “앱 런타임 기준”으로 표시하게 했다.

## 무시한 약한 근거

- Stack Overflow, Reddit, 일반 블로그 글은 이번 구현 판단의 근거로 사용하지 않았다.

## 불확실성

- Tauri v1 macOS bundle 문서를 PATH 주의점 근거로 사용했다. 현재 앱은 Tauri v2지만 GUI 앱 PATH 상속 문제는 제품 리스크 판단에 충분히 관련 있다.

## 공개 결정 요약

선택된 CLI adapter는 기존 health check를 재사용하고, terminal shell은 새 Rust command로 command/cwd 해석만 확인한다.
