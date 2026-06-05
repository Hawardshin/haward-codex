# 코딩 리서치: 네이티브 PTY 터미널 런타임

## 기술 스택

- Tauri v2 Rust backend
- React/Next.js renderer
- `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-web-links`
- Rust `portable-pty`

## 공식/강한 출처

- Tauri shell/plugin reference: command invocation boundary 확인.
- xterm.js docs: terminal emulator surface와 addon 구조 확인.
- portable-pty docs/cargo metadata: PTY open/spawn/read/write/resize/kill API와 MIT license 확인.
- node-pty repository: Electron/Node reference로 확인했지만 Tauri Rust backend에는 직접 채택하지 않음.

## source_types

- official docs
- crate metadata
- open-source repository
- existing local architecture docs/source

## 언어 옵션 비교

| 옵션 | 장점 | 단점 | 결론 |
| --- | --- | --- | --- |
| Rust backend `portable-pty` | Tauri runtime과 같은 process boundary, native lifecycle 소유, Node sidecar 불필요 | PTY lifecycle을 직접 관리해야 함 | 선택 |
| Node sidecar `node-pty` | 검증된 terminal reference, Electron 생태계 풍부 | Tauri 앱에 Node process/sidecar 추가, packaging/security boundary 증가 | 미선택 |

## 아키텍처 옵션 비교

| 옵션 | 장점 | 단점 | 결론 |
| --- | --- | --- | --- |
| 기존 pipe-first supervisor 확장 | task-run/decision inbox 재사용 쉬움 | TTY/raw input/ANSI/resize 문제 해결 안 됨 | 미선택 |
| 별도 PTY session store + xterm view | 기존 agent-run 기록 경로 보존, live terminal fidelity 확보 | 세션 store와 polling이 하나 더 생김 | 선택 |

## 폴더/소유권 결정

- Rust runtime 변경은 `platform-desktop-app/src-tauri/`에 둔다.
- Renderer UI는 기존 터미널 소유 파일인 `RuntimeTerminalDrawer.tsx`와 상위 상태 소유 파일인 `MonitorShell.tsx`에 둔다.
- 스펙/검증은 `platform-desktop-app/specs/2026-06-06-native-pty-terminal-runtime/`에 둔다.

## 구현 준비 판정

- 공식 API와 local source가 충분히 확인됐고, dependency install audit와 rollback plan이 기록되어 implementation-ready로 판단했다.
