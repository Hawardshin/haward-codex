# 구현 계획

1. 기존 버튼 액션과 notice 상태를 조사한다.
2. 버튼별 피드백 데이터 타입, 상태, wrapper, 렌더러를 추가한다.
3. Quick Start와 Command Palette의 주요 버튼을 wrapper에 연결한다.
4. 반복 버튼이 많은 Workspace Host, Runtime Data, Service Readiness, Task Run, Agent CLI Cockpit도 같은 피드백 계약에 연결한다.
5. CSS 상태 카드와 현재 버튼 강조 스타일을 추가한다.
6. 문자열 기반 계약 테스트를 추가한다.
7. check/test/build/package를 실행하고 validation 문서를 갱신한다.

## 결정

별도 모달이나 toast queue를 추가하지 않고, 현재 패널 안에 passive status card를 둔다. 사용자가 이미 보고 있는 명령 표면 안에서 피드백을 받는 것이 interruption을 줄이고, 현재 앱의 패널형 구조와도 맞는다.
