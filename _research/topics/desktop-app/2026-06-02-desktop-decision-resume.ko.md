# 연구 메모: Desktop Decision Resume

- 날짜: 2026-06-02
- 신뢰도: 중간. 공식 Tauri 자료와 HITL pattern 문서를 우선하고, 제품/커뮤니티 신호는 UX risk signal로만 사용했다.

## 요약

보류 decision은 저장만으로는 사용자의 작업 복귀 경험을 완성하지 못한다. 다만 자동 재개는 위험하므로, 사용자가 명시적으로 `Answer & Resume`를 선택한 경우에만 linked active CLI session stdin으로 답변을 보낸다.

## 적용한 판단

- answer-only와 answer-and-resume은 다른 action이어야 한다.
- resume 대상은 decision metadata의 `session_id`로 찾고, 현재 앱 runtime에 active session이 있어야 한다.
- session이 없거나 끝났거나 stdin이 없으면 답변 저장은 유지하고 resume 실패 사유를 UI에 보여준다.
- 이번 slice는 shell plugin/PTY 없이 기존 pipe session을 재사용한다.

## 한계

- 실제 Tauri Rust compile은 Rust/Cargo 미설치로 검증하지 못했다.
- CLI별 응답 형식은 통일되어 있지 않으므로 free-form answer를 그대로 stdin으로 보낸다.
