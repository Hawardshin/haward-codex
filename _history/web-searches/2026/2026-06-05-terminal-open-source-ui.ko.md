# Web Search: Terminal Open Source UI

## 질문

터미널/CLI 실행 UI를 사용자가 익숙하게 인지할 수 있도록 오픈소스/개발 도구형 terminal surface의 공통 구조를 확인한다.

## 검색어

- `xterm.js official terminal emulator tabs fit addon theme`
- `Visual Studio Code integrated terminal official docs tabs terminal panel`
- `GNOME Terminal official help terminal tabs profile appearance`

## 확인한 출처

- xterm.js docs, Using addons: https://xtermjs.org/docs/guides/using-addons/
- xterm.js API docs, Terminal: https://xtermjs.org/docs/api/terminal/classes/terminal/
- Visual Studio Code docs, Getting started with the terminal: https://code.visualstudio.com/docs/terminal/getting-started
- Visual Studio Code docs, Terminal Appearance: https://code.visualstudio.com/docs/terminal/appearance
- GNOME Terminal Help: https://help.gnome.org/gnome-terminal/index.html
- GNOME Terminal Help, Windows and tabs: https://help.gnome.org/gnome-terminal/pref-tab-window.html

## 약한 출처 제외

- Stack Overflow, Reddit, marketplace extension, PDF mirrors는 사용자가 익숙한 사용 패턴의 커뮤니티 신호로만 볼 수 있어 구현 근거로 채택하지 않았다.

## 계획 영향

- 실제 PTY/xterm runtime을 도입하지 않고도 UI surface는 terminal chrome, tab strip, dark emulator output, monospace content, cwd/status metadata, prompt input 구조를 따라야 한다.
- VS Code terminal docs는 terminal tab/title/appearance, open terminals list, workspace root 개념을 UI 힌트로 삼았다.
- GNOME Terminal docs는 terminal tabs/window/profile appearance가 일반 터미널 앱의 기본 사용 구조임을 확인하는 보조 근거로만 사용했다.

## 불확실성

- 이번 slice는 visual/interaction surface 개선이다. true terminal emulator fidelity, shell integration, escape sequence handling은 별도 제품 범위로 남긴다.
