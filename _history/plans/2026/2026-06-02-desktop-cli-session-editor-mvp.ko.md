# 계획: Desktop CLI Session / Source Editor MVP

## 작업 모드

- 선택: `governance`
- 이유: subprocess session, stdin, file write, backup, source editing surface, resource/CLI pipeline gate를 추가한다.

## 범위

- Tauri backend에 allowlist CLI pipe session command 추가
- session start/poll/stdin/defer/cancel 구현
- workspace-scoped text file read/write와 backup 구현
- Workspace Monitor Desktop 탭에 session console과 scoped source editor 추가
- readiness/test/spec/evaluation 갱신

## 비범위

- Rust/Tauri toolchain 설치
- shell plugin permission 추가
- xterm.js, Monaco, node-pty 설치
- autonomous source-affecting multi-CLI merge/release
- public installer readiness

## 언어 선택

- 옵션: Rust/Tauri command, Node sidecar, Python sidecar
- 선택: Rust/Tauri command
- 이유: 현재 scaffold에 맞고, 추가 dependency 없이 process/file boundary를 강제할 수 있다.

## 아키텍처 선택

- 옵션: pipe session MVP, Tauri shell plugin, PTY sidecar
- 선택: pipe session MVP
- 이유: 실제 stdout/stderr/stdin/cancel을 구현하되, PTY와 shell permission은 설치 감사 전까지 보류한다.

## 구현 순서

1. web-first intake와 memory bootstrap을 실행한다.
2. 기존 Desktop MVP source와 spec을 확인한다.
3. Rust backend command와 helper를 추가한다.
4. Workspace Monitor UI를 추가한다.
5. requirements/spec/history/evaluation을 갱신한다.
6. tests/build/policy checks를 실행한다.
