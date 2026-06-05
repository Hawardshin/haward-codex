# 작업 요약: Native Select 교체

날짜: 2026-06-06
프로젝트: `platform-desktop-app`

## 완료

- Workspace Monitor의 남은 native `<select>`를 제거했다.
- 문서 필터와 기록 필터를 앱 스타일 Radix 메뉴로 교체했다.
- Learning Loop 처리/자산 유형과 Decision Inbox 답변 유형을 앱 스타일 버튼 선택지로 교체했다.
- 공통 `AppChoiceMenu`, `AppChoiceButtonGroup`을 추가했다.
- 선택/hover/active 상태 음영을 CSS 토큰 기반으로 추가했다.
- `<select>` 재발 방지 테스트를 추가했다.

## 검증

- workspace-monitor test/check 통과.
- platform-desktop-app test/check 통과.
- `package:internal` 통과, `.app`과 `.dmg` 생성.
- Browser DOM check에서 native `select` count는 0이었으나 snapshot loading 상태 때문에 본문 visual smoke는 제한됨.
