# Work Summary: Chatbot Connection

날짜: 2026-06-07

## 요약

에이전트 채팅 화면에 `챗봇 연결` 상태 스트립을 추가했다. 이제 사용자는 모델 API, 모델 라우팅, 터미널 대체 실행, 작업 실행 저장소 연결을 한 화면에서 확인하고 계정 설정, 터미널, 모델 갱신으로 바로 이동할 수 있다.

## 구현

- `connect-chatbot` 명령 팔레트 항목 추가.
- `SearchAgentWorkChatPanel`에 `chatbotConnectionItems` 추가.
- provider 설정, terminal drawer, model refresh 액션 연결.
- 연결 상태 CSS와 테스트 contract 추가.

## 검증 상태

- renderer check 통과.
- renderer test 90개 통과.
- collect, renderer production build, customer bundle audit, platform check 통과.
- Browser smoke에서 desktop/mobile 연결 strip, provider 설정 액션, terminal drawer 액션, dev server lifecycle을 확인했다.
- resource guard, omission guard, work evaluator 통과.
- platform check에는 기존 public release signing/notarization/updater/clean-machine smoke gate와 developer snapshot stale warning이 report로 남았다.
