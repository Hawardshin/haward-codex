# 작업 요약: 두 데스크톱 앱 제품 경계

- 날짜: 2026-06-08
- 범위: 제품 경계 기록과 root project scaffold

## 결과

- `agent-tool-desktop-app/`를 별도 desktop product home으로 추가했다.
- `platform-desktop-app/`과 `agent-tool-desktop-app/`을 peer desktop apps로 기록했다.
- `agent-platform/`은 agent/tool desktop app의 engine/contract layer로 정리했다.
- config contract, JSON, docs audit, platform desktop test/check, customer renderer build/audit, omission/evaluation close-out을 통과했다.

## 제약

- runnable desktop shell은 이번 변경에 추가하지 않았다.
- provider credential, Ollama process, tool install, cloud runtime은 별도 보안/rollback gate가 필요하다.
