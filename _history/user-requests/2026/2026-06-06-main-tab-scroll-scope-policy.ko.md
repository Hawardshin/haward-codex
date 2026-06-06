# 사용자 요청 요약: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## 요지

사용자는 코드, 기능 목록, popup 같은 제한된 영역에서만 scroll을 쓰고, 메인 화면이나 tab 전체에 scroll 영역을 거는 것을 기본적으로 자제하라고 지시했다.

## 의도

- 데스크톱 앱의 넓은 화면을 main surface로 활용한다.
- 전체 tab scroll과 nested scroll이 겹쳐 생기는 불편함을 줄인다.
- code/log/list/dialog처럼 실제로 overflow가 필요한 bounded 영역만 scroll owner가 되게 한다.

## 처리 방향

- 지속 지침과 UI tone policy에 scroll ownership 원칙을 추가한다.
- `workspace-monitor` scroll contract 검사에 main tab/page scroll owner 회귀 방지 규칙을 추가한다.
