# 사용자 요청 요약: Terminal Command Center Usability

날짜: 2026-06-06

## 요지

사용자는 현재 터미널 기능이 너무 부족하므로 근본적으로 수정하고 사용성을 전부 개선하라고 요청했다.

## 해석

- 단순 출력 패널이 아니라 실제 desktop terminal처럼 검색, 복사/붙여넣기, 빠른 조작, 단축키, 상태 피드백이 필요하다.
- 전체 backend multiplexer까지 한 번에 바꾸는 것은 위험하므로, 기존 native PTY runtime 위에 즉시 체감되는 command center를 먼저 구현한다.
