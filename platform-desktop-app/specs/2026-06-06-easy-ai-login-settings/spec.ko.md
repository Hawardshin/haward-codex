# 스펙: 쉬운 AI 로그인 설정

## 목적

사용자가 AI provider 설정을 “어디서 로그인하고, 어디서 key를 만들고, 저장 후 어떤 모델을 쓰는지” 한 화면에서 판단하고 실행하게 한다.

## 기능 범위

- Settings > Execution > provider accounts 패널에 `AI 로그인 설정` 가이드 영역을 추가한다.
- provider 목록에 전체, 설정 필요, 연결됨, 로컬 필터를 추가한다.
- provider card에 연결 출처, app/env/local 상태 pill, 공식 로그인/키 발급/문서 링크, 저장/삭제, 모델 확인, 작업 기본값 선택을 배치한다.
- model catalog 결과를 같은 card 안에서 chip 형태로 보여주고, chip 클릭으로 에이전트 작업 provider/model을 선택한다.
- 기존 Tauri commands와 fallback provider registry를 재사용한다.

## 비목표

- OpenAI/Anthropic/Google OAuth client를 새로 등록하지 않는다.
- ChatGPT/Claude/Gemini 웹앱 세션 cookie를 저장하거나 WebView로 로그인 상태를 훔치지 않는다.
- 이번 slice에서 OS keychain 저장소를 새로 도입하지 않는다.

## 수용 기준

- 설정 화면 source에 `AI 로그인 설정`, `provider-login-guide`, `provider-filter-choice`, `provider-model-strip`가 존재한다.
- 사용자는 provider별 공식 로그인/키 발급/문서 링크를 열 수 있다.
- 사용자는 provider key 저장/삭제/새로고침을 기존 native command로 실행할 수 있다.
- 사용자는 모델 확인 후 provider/model을 작업 기본값으로 선택할 수 있다.
- 기존 native select 금지와 compact tonal hierarchy 테스트가 유지된다.
