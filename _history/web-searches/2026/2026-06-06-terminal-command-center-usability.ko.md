# Web Search: Terminal Command Center Usability

날짜: 2026-06-06

## Queries

- `terminal emulator UX best practices command palette tabs scrollback search copy paste split panes xterm.js`
- `xterm.js addons search fit web links serialize unicode official documentation`
- `Windows Terminal features command palette panes tabs profiles search`
- `GNOME Terminal keyboard shortcuts profiles search terminal official docs`
- `xterm.js SearchAddon findNext findPrevious official addon-search`

## 확인한 출처

- xterm.js Using addons: https://xtermjs.org/docs/guides/using-addons/
- xterm.js GitHub README/addons list: https://github.com/xtermjs/xterm.js
- Windows Terminal overview: https://learn.microsoft.com/en-us/windows/terminal/
- Windows Terminal panes: https://learn.microsoft.com/en-au/windows/terminal/panes
- GNOME Terminal keyboard shortcuts: https://help.gnome.org/users/gnome-terminal/stable/adv-keyboard-shortcuts.html.en
- GNOME Terminal help index: https://help.gnome.org/gnome-terminal/index.html

## 판단

- xterm.js는 `Terminal.loadAddon`으로 addon을 붙이는 구조를 공식적으로 안내하고, `@xterm/addon-search`를 terminal buffer search용 addon으로 제공한다.
- Windows Terminal은 profiles, tabs, panes, command palette, customization을 현대 terminal의 핵심 UX로 다룬다.
- GNOME Terminal은 copy/paste, search, shortcuts, profiles, scroll behavior를 기본 terminal preference와 help surface로 제공한다.

## 구현 영향

- 기존 native PTY surface는 유지하고, xterm SearchAddon으로 search previous/next를 추가했다.
- terminal control을 command center로 묶어 copy, paste, clear, fit, quick command를 바로 실행할 수 있게 했다.
- GNOME Terminal의 관례와 맞게 `Ctrl/Meta+F`, `Ctrl/Meta+Shift+C`, `Ctrl/Meta+Shift+V`, `Ctrl/Meta+L` 단축키를 surface에 연결했다.

## 불확실성

- 이번 slice는 split panes, profile editor, terminal transcript persistence까지 한 번에 넣지 않았다. 해당 기능은 Rust store와 pane focus routing까지 건드리는 별도 slice가 안전하다.
