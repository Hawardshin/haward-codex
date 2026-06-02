# 웹 검색 기록: Desktop Decision Resume

- 날짜: 2026-06-02
- 작업: 보류된 human decision answer를 linked active CLI session으로 재개하는 Desktop flow 구현
- 검색 목적: HITL pause/decide/resume 패턴과 Tauri shared state/stdin 관련 현재 참고 자료 확인

## 검색어

- `Tauri v2 command State shared state Rust official docs`
- `human in the loop agent resume after user approval CLI session stdin orchestration`
- `Tauri v2 shell plugin permissions subprocess stdin stdout official docs`
- `AI agent decision inbox resume workflow human approval`

## 확인한 출처

- Tauri `State` Rust docs: https://docs.rs/tauri/latest/tauri/struct.State.html
- Tauri shell/stdin permission reference: https://v2.tauri.app/reference/javascript/shell/
- LangChain HITL docs: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- LangChain frontend HITL docs: https://docs.langchain.com/oss/python/langchain/frontend/human-in-the-loop
- RunAgents approval timeline product signal: https://runagents.io/
- Nuvrail approval/audit product signal: https://nuvrail.com/

## 무시하거나 약하게 본 출처

- Reddit/제품 마케팅 페이지는 approval UX와 audit trail 필요성의 현업 신호로만 봤다.
- 비공식 Tauri subprocess 가이드는 구현 아이디어 신호로만 보고, command contract는 현재 저장소의 Rust code와 Tauri 공식 자료를 우선했다.

## 계획 영향

- answer 저장만으로 끝내지 않고 사용자가 명시적으로 선택한 경우에만 resume action을 제공한다.
- answer-and-resume은 linked session metadata가 있는 decision에만 동작해야 한다.
- session이 없거나 끝났거나 stdin이 없으면 answer 저장은 유지하고 resume status/detail로 이유를 보여준다.
- shell plugin/PTY 설치 없이 기존 bounded pipe session stdin을 재사용한다.

## 불확실성

- Rust/Cargo가 없는 현재 환경에서는 Tauri Rust compile을 직접 검증하지 못한다.
- 실제 CLI별 prompt/approval protocol은 provider마다 다를 수 있으므로, 이번 구현은 사용자가 입력한 free-form answer를 그대로 session stdin에 보내는 최소 계약이다.
