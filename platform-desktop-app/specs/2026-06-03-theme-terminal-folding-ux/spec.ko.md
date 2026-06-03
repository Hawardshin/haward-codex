# Spec: Theme, Terminal Overlay, Code Folding UX

## 목표

`platform-desktop-app` renderer의 데스크톱 workbench UX에서 다크모드 표면 불일치, 터미널 drawer 가림 방식, 코드 편집 접기 기능 누락을 한 slice로 해결한다.

## 결정

- CSS는 MDN `color-scheme`/`prefers-color-scheme`의 원칙에 맞춰 라이트 전용 배경값을 theme token으로 이동한다.
- Monaco는 이미 프로젝트에 포함되어 있으므로 새 editor library를 도입하지 않고 기존 `IStandaloneCodeEditor` action surface를 사용한다.
- 터미널 drawer는 fixed overlay로 유지하되 열린 상태에서 작업 영역 대부분을 덮고 backdrop을 제공한다.
- Explorer folder folding은 React local state로 처리한다. 폴더 접기는 저장 대상이 아닌 화면 탐색 상태다.

## 수용 기준

- `app/globals.css`에 `background: #ffffff`, `background: #fbfcfd`, `background: white`가 남지 않는다.
- 다크모드 Browser smoke에서 설정/홈/파일/터미널 표면에 큰 흰 패널이 보이지 않는다.
- 터미널 open 상태에서 `.terminal-drawer-backdrop`과 `.terminal-drawer.open`이 존재한다.
- 코드 편집 toolbar에 `코드 접기`/`코드 펼치기`가 노출된다.
- Explorer folder tree item은 `aria-expanded`를 바꾸며 접고 펼 수 있다.

## 잔여 후보

- 실제 packaged Tauri app에서 OS theme 전환과 persisted theme 전환을 반복 smoke한다.
- Monaco command palette와 folding shortcuts를 네이티브 menu/shortcut로 연결한다.
