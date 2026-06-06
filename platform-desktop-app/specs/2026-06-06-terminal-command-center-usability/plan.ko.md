# Plan: Terminal Command Center Usability

1. web-first intake로 terminal UX와 xterm addon 방식을 확인한다.
2. 기존 native PTY runtime과 drawer 구조를 읽는다.
3. large-scope request를 terminal command center slice와 future backend slices로 나눈다.
4. `@xterm/addon-search` 설치 감사 기록을 남기고 project-local dependency로 설치한다.
5. native PTY surface에 search/copy/paste/clear/fit/quick command를 구현한다.
6. CSS를 bounded terminal control/stage로 정리한다.
7. static tests, audit, check/test/build/package를 실행한다.
8. requirements/spec/trace/evaluation/install/resource 기록을 닫고 commit/push한다.
