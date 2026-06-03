# 계획: Provider 계정 연결

## Request

- `UR-2026-06-04-006`

## 범위

- OpenAI/ChatGPT, Anthropic/Claude, Google/Gemini provider 계정 연결을 데스크톱 앱 설정으로 구현한다.
- 비공식 웹 세션 임베드는 배제하고 공식 API key/인증 문서 기반으로 구현한다.

## 단계

1. 공식 인증 문서와 현재 Tauri/renderer 구조 확인.
2. Tauri credential store/commands/open URL/env injection 구현.
3. Settings > Initialize > Provider accounts UI 구현.
4. Runtime contract, registries, readiness/test 갱신.
5. 빌드, check, Browser smoke, history/evaluation/trace 정리.

## 결정

- 이번 slice는 local app config secret file을 사용한다.
- report/UI/support export는 raw secret을 노출하지 않는다.
- public release 전 OS keychain/credential manager adapter 전환은 별도 남은 리스크다.
