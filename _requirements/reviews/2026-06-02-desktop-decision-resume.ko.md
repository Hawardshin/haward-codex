# 요구사항 검토: Desktop Decision Resume

- 날짜: 2026-06-02
- 검토 대상: `PDA-REQ-023`, `PDA-UX-016`

## 판단

요구사항은 사용자 요청과 기존 multi-CLI desktop 흐름에 부합한다. 사용자는 CLI 질문을 보류했다가 복귀 후 처리하기를 원했고, 이전 구현은 answer 저장까지만 제공했다. 이번 변경은 사용자의 명시적 재개 action을 요구해 자동 실행 리스크를 줄인다.

## 수용 조건

- `answer_human_decision`은 answer-only 경로로 유지한다.
- `answer_and_resume_human_decision`은 answer 저장 후 linked active session에만 stdin write를 시도한다.
- session이 없거나 inactive이면 answer 저장은 유지하고 resume detail을 돌려준다.
- readiness/test는 새 command와 UI action을 확인해야 한다.

## 리스크

- Rust/Cargo 미설치로 Tauri compile 검증은 보류된다.
- 실제 CLI별 답변 protocol은 다를 수 있어 free-form answer stdin injection만 지원한다.
