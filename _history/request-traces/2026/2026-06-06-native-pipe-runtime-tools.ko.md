# Request Trace: Native Pipe Runtime Tools

## 요청

- 파이프와 터미널 직접 제어에 필요한 네이티브 도구/기능 추가.

## 결정

- `platform-desktop-app` 소유.
- work_mode: `standard`
- install_mode: `developer`
- 설치 대상: `os_pipe@1.2.3`
- 선택 이유: Rust/Tauri가 packaged desktop runtime의 process ownership, cwd boundary, timeout, cleanup을 직접 소유해야 한다.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-native-pipe-runtime-tools.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-native-pipe-runtime-tools/`
- 설치 기록: `_history/installations/2026/2026-06-06-native-pipe-runtime-tools-os-pipe.ko.md`
- CLI pipeline: `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-cli-pipeline.json`
- resource check: `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-resource.json`
- omission check: `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-omission.json`
- 평가: `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools.ko.md`

## 검증

- `cargo check`, `cargo test`, `platform-desktop-app test/check`, `workspace-monitor test/check`, `package:internal` 통과.

## 결과

- 완료. commit은 close-out 단계에서 기록한다.
