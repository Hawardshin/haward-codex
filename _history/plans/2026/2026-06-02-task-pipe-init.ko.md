# Task Pipe Init Plan

## 목표

단일 CLI session 시작을 넘어, 하나의 task intake가 여러 optional CLI lane을 pipe graph 기준으로 init하는 구조를 구현한다.

## 범위

1. Rust/Tauri backend에 task pipe preset 조회와 multi-lane init command를 추가한다.
2. Workspace Monitor Desktop 탭에 `Task Pipe Init` 패널을 추가한다.
3. CLI adapter registry, desktop registry, user-flow registry, 요구사항, 스펙, readiness test를 갱신한다.
4. TypeScript, readiness, config contract, build, CLI pipeline 검증을 실행한다.

## 비범위

- 외부 CLI 설치 또는 자동 설치.
- Tauri shell plugin, sidecar, PTY, xterm.js, Monaco 설치.
- provider 인증 관리 또는 public installer ready 주장.
