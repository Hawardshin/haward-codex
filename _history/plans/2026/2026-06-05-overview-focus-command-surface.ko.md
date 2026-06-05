# Overview Focus Command Surface 계획

## 목표

`UI 근본 변화 대혁신` 요청을 전체 UI 전면 재작성 대신, 사용자가 가장 먼저 보는 Overview를 작업 중심 command surface로 바꾸는 slice로 실행한다.

## 단계

1. 공식/고신뢰 UI 레퍼런스를 확인한다.
2. 현재 Overview 홈 구조와 static test를 확인한다.
3. 추천 작업, 단계 preview, primary action을 첫 surface로 만든다.
4. 나머지 목표와 상태는 dock/strip으로 낮춘다.
5. requirements/spec/test/history를 갱신한다.
6. check/build/perf와 Browser smoke로 desktop/mobile을 검증한다.

## 제외

- 전체 CSS/컴포넌트 재작성
- 새 UI framework 설치
- 실행 runtime/agent behavior 변경
