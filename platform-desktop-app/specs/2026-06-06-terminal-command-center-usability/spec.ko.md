# Spec: Terminal Command Center Usability

## 목표

하단 native PTY terminal을 단순 출력 화면에서 실제 desktop terminal에 가까운 조작면으로 개선한다.

## 범위

- `@xterm/addon-search@0.16.0` 설치.
- `RuntimeTerminalDrawer.tsx`의 native PTY surface command center.
- 검색, copy, paste, clear, fit, quick command.
- CSS bounded terminal control/stage.
- static regression tests.

## 비범위

- split panes.
- persistent transcript store.
- profile editor/shell selector.
- Rust PTY process lifecycle 변경.
- 공개 release signing/notarization/updater.

## 설계

- Search는 xterm.js official addon 계열인 `SearchAddon`을 동적 import하고 `Terminal.loadAddon`으로 연결한다.
- Clipboard write는 기존 `writeClipboardText` helper를 재사용한다.
- Clipboard read는 browser clipboard API가 있을 때만 시도하고, 실패하면 status message를 보여준다.
- Clear는 xterm viewport를 지우고 running PTY에는 form-feed를 보내 shell 화면도 정리한다.
- Fit은 기존 `FitAddon`과 resize command path를 재사용한다.
- Quick commands는 `pwd`, `ls -la`, `git status --short`처럼 읽기 중심 진단 명령으로 제한한다.
- Timer, ResizeObserver, xterm instance는 component unmount에서 정리한다.
