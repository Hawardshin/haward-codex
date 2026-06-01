# 요구사항 변경: 구조 거버넌스 감사

## 변경 ID

- `REQ-WS-026`

## 출처 요청

- `UR-2026-06-01-009`

## 변경 내용

- root folder는 등록된 project, reserved operational folder, local-only folder, generated output으로 분류되어야 한다.
- `_private/`와 `outputs/`는 local-only ignored folder로만 사용한다.
- durable artifact는 root `outputs/`가 아니라 owning project의 `artifacts/` 아래에 둔다.
- root folder나 project registry, reserved folder 규칙을 바꾼 뒤에는 deterministic structure audit를 실행해야 한다.
- workspace monitor는 구조 규칙을 찾기 쉽도록 `_docs`와 `_philosophy` 문서를 snapshot에 포함해야 한다.

## 근거

- 기존 구조는 project registry와 reserved folder policy가 있었지만 local-only folder 예외가 명확하지 않았다.
- root `outputs/`는 이름상 durable artifact 위치로 오해될 수 있다.
- 사람이 문서만 읽는 방식은 누락된 root folder를 자동으로 잡지 못한다.

## 검증

- `root-structure-policy.json`이 self-documenting config contract를 통과해야 한다.
- `structure-audit`가 등록되지 않은 root folder와 README 없는 project를 gap으로 잡아야 한다.
- 현재 저장소 root 구조가 `structure-audit --check`를 통과해야 한다.
