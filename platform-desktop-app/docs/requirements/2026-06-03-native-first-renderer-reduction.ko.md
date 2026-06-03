# Native-first renderer reduction 요구사항

## 배경

사용자는 데스크톱 앱다운 제품을 만들려면 native runtime을 더 많이 건드려야 하며, 프론트 코드가 앱 상태와 실행 책임을 과하게 들고 있는 구조를 덜어내야 한다고 지시했다. 이 요구는 “웹 UI를 Tauri로 감싼 앱”이 아니라 설치 앱이 설정, 파일, 프로세스, 작업공간, 데이터 저장을 소유하고 renderer는 화면과 전문 editor UI를 담당하는 구조를 목표로 한다.

## 요구사항

- `PDA-REQ-049`: 설치형 데스크톱 앱의 사용자 설정은 브라우저 `localStorage`가 아니라 Tauri native command와 앱 config 경로에서 관리해야 한다.
- `PDA-REQ-050`: renderer는 설정값을 영구 저장하지 않고 native preference command를 읽고 변경 요청을 보내는 얇은 클라이언트로 동작해야 한다.
- `PDA-REQ-051`: 테마, 화면 언어, 좌측 rail, 하단 터미널 열림 상태, CLI/session/task pipe 초기화 기본값, pinned section은 native preference schema로 저장해야 한다.
- `PDA-REQ-052`: 설정 UI는 사용자가 native app config 저장 상태와 경로를 확인할 수 있게 해야 한다.
- `PDA-REQ-053`: readiness/test는 다시 `localStorage` 기반 desktop preference persistence로 회귀하지 못하게 검증해야 한다.

## 비범위

- 이번 slice에서 React/Next renderer 전체를 제거하지 않는다.
- Monaco editor, workbench layout, terminal drawer 같은 전문 UI는 renderer에 남긴다.
- macOS public signing, notarization, updater gate 완료를 주장하지 않는다.
