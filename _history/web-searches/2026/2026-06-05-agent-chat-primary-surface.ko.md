# 웹 검색 기록: Agent Chat Primary Surface

- 날짜: 2026-06-05
- 사용자 요청 요약: 이어서 구현하라는 요청에 따라 Agent Core 채팅 UI가 한 기능 중심 화면으로 보이도록 재작업한다.
- 검색어:
  - `web.dev optimize interaction to next paint long tasks UI responsiveness`
  - `Nielsen Norman Group progressive disclosure complex interfaces reduce cognitive load`
  - `MDN CSS responsive typography clamp font-size best practices`
  - `xterm.js terminal emulator addons fit web terminal UI documentation`

## 확인한 출처

- web.dev, Optimize Interaction to Next Paint: 사용자 입력 뒤 첫 paint를 막는 long task를 줄이는 기준으로 사용.
- web.dev, Optimize long tasks: 클릭 핸들러와 긴 메인 스레드 작업 분리 기준으로 사용.
- MDN, `clamp()`: 반응형 크기 제한과 CSS token 기반 크기 조정 기준으로 참고.
- xterm.js documentation: 터미널 UI 관련 이전 작업 맥락 유지용으로 확인.
- Progressive disclosure reference: 한 화면에 보조 정보를 모두 펼치지 않는 방향을 재확인.

## 계획 영향

- Agents 화면은 공통 상태 strip, 문서 필터, 지표, 계약 카드가 기본 채팅 작업면을 밀어내지 않도록 한다.
- 보조 정보는 열기 전에는 렌더하지 않거나 닫힌 disclosure 아래로 둔다.
- 390px 모바일 폭에서 composer가 first viewport 안에 들어오는지를 acceptance로 둔다.

## 무시한 약한 출처

- Reddit 결과는 현업 신호로만 보고 구현 근거로 사용하지 않았다.

## 공개 판단 요약

채팅은 익숙한 중앙 대화 로그와 하단 composer가 주 작업이다. 상태/검색/계약/지표는 운영자에게 유용하더라도 기본 first viewport를 밀어내면 사용자의 인지 부하와 조작 지연이 커지므로 접힘 또는 primary surface 밖으로 내려야 한다.
