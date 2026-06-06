# Web Search: Subagent Tool Selection

날짜: 2026-06-07

## Queries

- `Tauri v2 commands invoke state official documentation`
- `VS Code Copilot subagents tools official documentation`
- `Claude Code subagents official documentation`
- `OpenAI Agents SDK agents as tools official documentation`

## 확인한 강한 출처

- OpenAI Agents SDK agents/tools docs: manager가 agents-as-tools 형태로 전문 agent를 호출하는 패턴을 확인했다.
- Claude Code subagents docs: focused subagent와 tool 제한/구성 경계를 확인했다.
- VS Code Copilot subagents docs: main agent가 subagent를 invoke하고 결과를 받는 모델을 확인했다.
- Tauri v2 calling Rust docs: frontend invoke와 Rust command/state 패턴을 확인했다.

## Plan Impact

이번 slice는 native command를 새로 늘리지 않고, manager UI가 어떤 saved tool을 invoke할지 명시적으로 선택하게 하는 방향으로 결정했다. 실행 cap과 Rust validation은 이전 bounded fan-out command의 경계를 재사용한다.

## 불확실성

Browser preview는 Tauri native command를 실행하지 못한다. DOM contract와 static tests를 우선 검증하고, 실제 process start는 별도 packaged runtime smoke로 남긴다.
