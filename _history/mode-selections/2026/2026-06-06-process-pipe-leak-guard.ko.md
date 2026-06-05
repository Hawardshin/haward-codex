# 작업 모드 선택: 프로세스/파이프 누수 방지

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- Tauri/Rust runtime process lifecycle과 dependency manifest를 바꾸는 의미 있는 구현이다.
- 장기 실행 child process, pipe, reader thread, PTY master/writer를 다뤄 resource-risk work로 분류한다.
- 새 global install은 없지만 `Cargo.toml` 직접 의존성 선언이 있어 installation audit을 남긴다.

## close-out targets

- requirements/spec/validation/traceability 작성.
- coding research, web search, resource check, omission check 작성.
- internal package build 실행.
- evaluation, request trace, commit, push 완료.
