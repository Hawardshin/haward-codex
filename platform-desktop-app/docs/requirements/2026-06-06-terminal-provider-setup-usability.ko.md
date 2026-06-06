# 요구사항: 터미널 사용법과 AI 제공자 설정 단순화

날짜: 2026-06-06

## 사용자 요구

- 터미널 기능의 사용법과 설정법을 기능적으로 알 수 있어야 한다.
- GPT/OpenAI와 Gemini/Google 설정은 단순 로그인 흐름처럼 시작할 수 있어야 한다.
- 공식 인증 경계를 위반하거나 비공식 웹 세션을 저장하지 않아야 한다.
- 구현 후 빌드까지 자동으로 수행해야 한다.

## 요구사항

- REQ-TPS-001: 터미널 시작 화면은 PTY, 작업 폴더, 검색/클립보드, AI 계정 설정의 사용 경로를 즉시 보여야 한다.
- REQ-TPS-002: OpenAI와 Gemini 설정에는 공식 API key 페이지로 바로 이동하는 `로그인/키 발급` fast lane이 있어야 한다.
- REQ-TPS-003: provider row는 중복된 `키 발급`/`로그인` 버튼을 제거하고 하나의 primary setup action으로 정리해야 한다.
- REQ-TPS-004: OpenAI/Gemini URL과 문서는 공식 API key/authentication 경로를 사용해야 한다.
- REQ-TPS-005: 터미널 세팅, 단축키, OpenAI/Gemini 설정 절차를 durable 문서로 남겨야 한다.
- REQ-TPS-006: 변경은 기존 credential 저장/삭제/env injection contract를 깨지 않아야 한다.
