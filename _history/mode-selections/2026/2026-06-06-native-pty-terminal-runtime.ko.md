# 작업 모드 선택: 네이티브 PTY 터미널 런타임

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- Tauri/Rust runtime, frontend UI, dependency manifest, runtime contract, packaging build를 함께 바꾸는 의미 있는 구현 작업이다.
- 새 Rust crate 설치와 장기 실행 process/resource lifecycle이 있어 quick이 아니라 standard로 처리했다.

## close-out targets

- requirements/spec/validation/traceability 작성.
- installation audit 작성.
- resource check 작성.
- omission check 작성.
- internal package build 실행.
