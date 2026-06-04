# 웹 검색 기록: Agent Core chat familiar UI

- 날짜: 2026-06-05
- 목적: 에이전트 코어 채팅 UI를 사용자가 익숙한 AI 채팅 구조로 바꾸기 전, ChatGPT/Claude/Gemini의 공식 도움말에서 공통 상호작용 패턴을 확인한다.

## 검색어

- `site:openai.com ChatGPT overview chat interface composer message official`
- `site:support.google.com/gemini Gemini apps chat interface prompt official`
- `site:support.anthropic.com Claude web app chat interface prompt submit official`
- `site:support.claude.com Claude chat interface prompt official`

## 확인한 출처

- OpenAI Help Center, [What is ChatGPT: FAQ](https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq): ChatGPT는 message box에 입력하고 전송해 대화를 시작하며, 같은 chat 안에서 follow-up을 이어간다는 점을 확인했다.
- OpenAI Academy, [Getting started with ChatGPT](https://openai.com/academy/getting-started/): ChatGPT interface가 chat window와 입력 아이콘 중심으로 구성된다는 점을 확인했다.
- Google Gemini Apps Help, [Use Gemini Apps](https://support.google.com/gemini/answer/13275745?hl=en): Gemini web app은 하단 text box에 prompt를 입력하고 submit하며, model selector는 별도 선택 흐름으로 제공된다는 점을 확인했다.
- Claude Help Center, [Get started with Claude](https://support.claude.com/en/articles/8114491-get-started-with-claude): Claude는 chat interface에 prompt를 입력하고 submit button으로 대화를 시작하며, 모델은 입력창 주변/상단에서 선택하는 구조라는 점을 확인했다.

## 무시한 약한 출처

- 블로그/디자인 갤러리/비공식 UI 캡처는 공식 제품 구조 확인보다 신뢰도가 낮아 구현 근거로 사용하지 않았다.
- 제품별 시각 디테일은 수시로 바뀔 수 있으므로, 색상/정확한 배치 복제가 아니라 공통 interaction 구조만 반영했다.

## 계획 영향

- 채팅의 주 작업면은 중앙 대화 로그와 하단 composer로 둔다.
- provider/model 선택은 대화 입력보다 앞서지 않는 compact 보조 컨트롤로 둔다.
- 작업 컨텍스트와 실행 계약 정보는 기본 입력 흐름을 밀어내지 않는 drawer/요약 영역으로 낮춘다.
- 검증은 특정 제품과 픽셀 일치가 아니라 작은 창에서 `conversation log`, `composer`, `send action`, `provider/model controls`, `closed context drawer`가 안정적으로 보이는지 확인한다.

## 불확실성

- 공식 도움말은 제품 UI의 모든 픽셀 구조를 문서화하지 않는다.
- 따라서 이번 기록은 “익숙한 AI 채팅 패턴”의 상호작용 구조를 정하는 근거이며, 최종 품질은 로컬 UI audit와 사용자 피드백으로 확인한다.

## 공개 결정 요약

- Agent Core 채팅을 일반 작업대 레이아웃에서 AI 채팅 레이아웃으로 바꾼다.
- 중앙 로그와 하단 입력창을 우선하고, 모델/계정/컨텍스트는 보조로 둔다.
