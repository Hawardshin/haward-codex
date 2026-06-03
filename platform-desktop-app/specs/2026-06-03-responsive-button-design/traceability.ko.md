# Traceability: Responsive Button Design

## User Request

- `UR-2026-06-03-057`: 디자인적 버튼 반응형 전반을 더 다듬으라는 요청.

## Requirement Mapping

- `PDA-REQ-044` -> `app/globals.css` control tokens and global button target contract.
- `PDA-REQ-045` -> `button:focus-visible`, `button:not(:disabled):active`, hover border feedback.
- `PDA-REQ-046` -> 720px action group full-width rules and terminal drawer mobile stack.

## Validation Mapping

- Browser smoke desktop/mobile target and overflow checks.
- `check-readiness.mjs` and `readiness.test.mjs` responsive button token assertions.
