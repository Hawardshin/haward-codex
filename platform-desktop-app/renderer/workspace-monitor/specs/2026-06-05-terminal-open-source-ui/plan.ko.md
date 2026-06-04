# Plan: Terminal Open Source UI

1. 공식/고신뢰 reference에서 terminal UI의 공통 구조를 확인한다.
2. `RuntimeTerminalDrawer`를 terminal chrome + tab strip + emulator surface 중심으로 재배치한다.
3. `globals.css`에서 terminal surface를 dark/monospace/compact tab/prompt 형태로 스코프한다.
4. 전역 터미널 버튼이 터미널이 마운트된 화면으로 이동한 뒤 열리게 한다.
5. TypeScript, scroll contract, tests, customer build, bundle budget, platform check를 실행한다.
6. in-app Browser와 정적 export viewport smoke로 실제 렌더링과 overflow를 확인한다.
