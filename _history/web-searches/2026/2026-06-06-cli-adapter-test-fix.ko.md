# Web Search: CLI Adapter Test Fix

## 질의

- `OpenAI Codex AGENTS.md repository instructions`

## 확인한 주요 출처

- OpenAI Codex AGENTS.md documentation: https://github.com/openai/codex/blob/main/docs/agents_md.md

## 계획 영향

- 검색은 작업 시작 규칙 확인용이었다.
- 실제 실패 원인은 외부 라이브러리나 최신 API 변화가 아니라 로컬 테스트 계약과 `MonitorShell.tsx`의 현재 타입 정의 차이였다.
- 따라서 구현 판단은 로컬 소스와 테스트 결과를 기준으로 했다.

## 무시한 약한 근거

- 비공식 AGENTS.md 가이드, 커뮤니티 글, Reddit 글은 이번 테스트 수정 판단에 사용하지 않았다.

## 불확실성

- 없음. 테스트 실패와 수정 범위는 로컬 파일에서 재현 및 검증됐다.

## 공개 결정 요약

`AdapterSetupGuide`의 CLI 설정 안내 필드가 localized object인 `LocalizedText`로 유지되는 현재 소스 계약에 맞춰 정적 테스트 assertion만 갱신한다.
