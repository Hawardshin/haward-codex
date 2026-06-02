# 요구사항 리뷰: 질문 보류 기능

## 검토 결과

- `PDA-UX-006`, `PDA-UX-011`, `PDA-UX-014`, `PDA-UX-016`, `PDA-UX-020`과 충돌하지 않는다.
- 새 요구사항은 기존 answer/resume 구조를 재사용한다.
- optional CLI를 필수화하지 않는다.

## 승인 조건

- 자동 보류는 기본 켜짐이지만 UI에서 끌 수 있어야 한다.
- 중복 질문 저장을 방지해야 한다.
- 보류 메시지는 승인/거절을 대신하지 않아야 한다.
- resource lifecycle 검증에 active polling과 child process pipe 상태를 포함해야 한다.
