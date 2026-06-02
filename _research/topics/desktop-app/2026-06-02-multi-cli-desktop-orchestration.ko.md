# 다중 CLI 데스크톱 오케스트레이션 조사 메모

## 요약

공식 문서 기준으로 네 AI CLI는 모두 플랫폼 위의 optional adapter 후보로 다룰 수 있다. 다만 각 CLI의 인증, interactive prompt, output contract는 provider별로 다르므로 adapter 계약이 먼저 필요하다.

## 재사용 가능한 판단

- Claude Code, Gemini CLI, Codex CLI, OpenCode는 모두 "플랫폼 필수 런타임"이 아니라 "실행 제공자"로 둔다.
- Tauri shell plugin과 sidecar 문서는 desktop-originated process 실행과 외부 binary boundary의 근거가 되지만, interactive PTY 완성 경로는 별도 POC가 필요하다.
- xterm.js는 terminal UI 후보, Monaco Editor는 code editing 후보로 적절하다. 둘 다 dependency audit 전 설치하지 않는다.
- Agent Client Protocol은 장기적으로 editor-agent interoperability 후보지만, 현재 우선순위는 CLI supervisor다.

## 계획 영향

- `cli-adapter-registry.json`에 concrete adapter 후보와 interactive contract를 추가했다.
- `platform-desktop-app`에 multi-CLI architecture 문서와 스펙을 추가했다.
- vector DB는 기본값이 아니라 측정된 retrieval 병목 이후 비교하는 후보로 둔다.
