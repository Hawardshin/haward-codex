# User Request: Popup Overlay Audit

날짜: 2026-06-06

## 요약
- 사용자는 팝업류 UI를 전부 검토하라고 요청했다.
- 이전 맥락의 주요 불편은 스크롤 때문에 팝업이 안 보임, 범용/기본 팝업 느낌, 탭/터미널/설정 UI 사용성, 데스크톱 앱답게 안정적인 화면 자원 사용이었다.

## 이번 처리 범위
- 명령 팔레트, 설정 모달, 운영 센터, 터미널 드로어의 viewport 기준 배치와 focus 처리를 검토/패치한다.
- 기존 Radix dropdown/context menu clipping 계약은 유지하되 z-index hierarchy를 재정렬한다.
- 구현 뒤 renderer build, internal package, app open까지 자동 수행한다.
