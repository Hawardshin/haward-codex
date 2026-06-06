# Work Summary: Native Pipe Runtime Tools

## 한 일

- `os_pipe@1.2.3`을 `platform-desktop-app/src-tauri`에 project-local Cargo dependency로 추가했다.
- `run_native_pipe_probe` Tauri command를 추가해 producer stdout을 consumer stdin에 직접 OS pipe로 연결한다.
- timeout, output bound, cwd boundary, PATH command resolution, process-group cleanup, reader thread join, FD drop 처리를 포함했다.
- runtime contract, readiness checks, tests, installation registry, CLI pipeline/resource/omission records를 갱신했다.

## 검증

- Rust focused/full test, cargo check, desktop tests/check, workspace-monitor tests/check, package:internal 통과.
- `.app`/`.dmg` 생성과 `codesign`/`hdiutil verify` 통과.

## 남은 점

- 생성 스냅샷 네 개는 collect/package 과정에서 갱신됐으나 이번 기능 커밋 범위에서는 제외한다.
- public release signing/notarization/updater/clean-machine smoke는 기존 public release gate다.
