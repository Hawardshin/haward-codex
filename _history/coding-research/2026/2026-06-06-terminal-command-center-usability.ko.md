# Coding Research: Terminal Command Center Usability

날짜: 2026-06-06
프로젝트: `platform-desktop-app`

## Technology Stack

- Renderer: TypeScript, React 19, Next.js 16, xterm.js 6
- Desktop runtime: Tauri v2, Rust, `portable-pty`
- Package manager: pnpm 10.34.1

## Source Types

- official docs: xterm.js addon guide, Microsoft Windows Terminal docs, GNOME Terminal help
- open-source repository: xterm.js GitHub repository
- local source/spec: `RuntimeTerminalDrawer.tsx`, native PTY runtime spec, Rust PTY commands
- package metadata: `pnpm view @xterm/addon-search@0.16.0`

## Technology Official Docs

- xterm.js addon guide confirms the addon lifecycle: import addon, `Terminal.loadAddon(addon)`, dispose through addon/terminal lifecycle.
- xterm.js repository lists `@xterm/addon-search` as the search functionality addon.
- Microsoft and GNOME terminal docs establish expected terminal features: search, copy/paste, shortcuts, profiles/tabs/panes, command palette.

## Language Options

| Option | 장점 | 단점 | 판정 |
|---|---|---|---|
| TypeScript/React renderer | 기존 xterm surface와 직접 연결, 빠른 UI 개선, 테스트 가능 | persistent transcript나 PTY process ownership은 다루지 않음 | selected |
| Rust/Tauri backend | process/profile/persistence를 강하게 소유 가능 | 이번 usability control만 위해 Rust를 바꾸면 리소스 위험과 테스트 범위가 커짐 | deferred |

## Selected Language

TypeScript/React renderer. 이번 slice는 existing PTY runtime 위의 terminal interaction layer를 강화하는 것이므로 renderer가 가장 유지보수 비용이 낮다.

## Architecture Options

| Option | 장점 | 단점 | 판정 |
|---|---|---|---|
| xterm addon-based command center | xterm buffer와 selection/search API를 그대로 사용, 기존 PTY session 유지 | 새 dependency 필요 | selected |
| 직접 문자열 search + 별도 output panel | dependency는 줄지만 xterm viewport와 search position이 어긋남 | terminal emulator 동작과 괴리 | rejected |
| Rust-side terminal multiplexer | panes/profile/persistence까지 가능 | 큰 작업, process lifecycle 위험 증가 | future slice |

## Code Reference Sources

- `xterm.js` addon guide: `Terminal.loadAddon` pattern.
- `xterm.js` repository: search addon is part of the xterm addon ecosystem.
- local `RuntimeTerminalDrawer.tsx`: existing xterm host, fit addon, web-links addon, delta output write.
- local `src-tauri/src/lib.rs`: existing PTY start/list/poll/write/resize/cancel command set.

## Implementation Decision

- `@xterm/addon-search@0.16.0`을 exact project-local dependency로 추가한다.
- `NativePtyTerminalSurface`에 command center를 추가한다.
- SearchAddon, clipboard fallback helper, clipboard read, clear, fit, quick command actions를 xterm instance lifecycle과 같은 component 안에 둔다.
- Rust process lifecycle은 변경하지 않는다.

## Community/Issue Signal Notes

- Windows Terminal/GNOME Terminal 문서는 search/copy/paste/shortcuts/tabs/panes/profiles가 terminal usability의 기본 기대치임을 보여준다.
- xterm.js addon structure를 따르면 직접 buffer parser를 만들지 않아도 되어 유지보수 위험이 줄어든다.

## Validation Plan

- dependency audit
- workspace-monitor check/test/build
- platform-desktop-app test/check
- internal package build
