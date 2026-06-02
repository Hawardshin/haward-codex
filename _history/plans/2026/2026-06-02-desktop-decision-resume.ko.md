# 계획: Desktop Decision Resume

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 선택 이유: desktop runtime command, CLI stdin lifecycle, human decision inbox 상태, 요구사항/스펙을 변경한다.

## 실행 계획

1. web-first intake로 Tauri state/stdin과 HITL resume pattern을 확인한다.
2. 기존 `answer_human_decision`, CLI session store, decision metadata 구조를 검토한다.
3. Tauri backend에 `DecisionResumeReport`와 `answer_and_resume_human_decision` command를 추가한다.
4. 기존 answer 저장 로직을 helper로 분리해 answer-only와 answer-and-resume이 같은 persistence contract를 공유하게 한다.
5. Workspace Monitor decision inbox에 linked session id/status와 `Answer & Resume` action을 추가한다.
6. readiness/test, requirements, spec, architecture, history/evaluation을 갱신한다.
7. TypeScript, platform desktop tests/readiness, static build, omission/resource/grounding/evaluation을 실행한다.

## 통제

- 자동 resume은 하지 않는다.
- session이 active가 아니면 answer만 저장하고 resume status/detail을 표시한다.
- Rust/Cargo 미설치 환경에서는 Tauri compile을 주장하지 않는다.
