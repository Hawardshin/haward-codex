# Plan: Split Scroll Usability

## 단계

1. MDN overflow/sticky 기준을 확인한다.
2. 파일/코드 workbench shell, Explorer, editor pane의 height/min-height/overflow를 정리한다.
3. terminal drawer의 session list, output, event rail을 독립 스크롤로 분리한다.
4. settings dialog에서 header/tab navigation과 content scroll을 분리한다.
5. focusable scroll pane과 focus-visible 스타일을 추가한다.
6. readiness/test, build, Browser smoke로 검증한다.

## 선택한 접근

- resizable splitter는 이번 slice에서 제외한다.
- 현재 React component 구조를 유지하고 CSS layout contract를 강화한다.
- 중요한 스크롤 영역은 source token과 Browser smoke 모두로 확인한다.
