# Traceability: Responsive Button Design

## User Request

- `UR-2026-06-03-057`: 디자인적 버튼 반응형 전반을 더 다듬으라는 요청.
- `UR-2026-06-03-062`: 편집 파일을 누를 때 나오는 버튼이 너무 기본 버튼처럼 보이고 디자인적으로 아쉽다는 요청.
- `UR-2026-06-03-063`: 수정된 결과 같은 것도 예쁘지 않다는 요청.

## Requirement Mapping

- `PDA-REQ-044` -> `app/globals.css` control tokens and global button target contract.
- `PDA-REQ-045` -> `button:focus-visible`, `button:not(:disabled):active`, hover border feedback.
- `PDA-REQ-046` -> 720px action group full-width rules and terminal drawer mobile stack.
- `PDA-REQ-047` -> `MonitorShell.tsx` Source action/tool button classes, `app/globals.css` Source action bar/toolbar/file row/tab styling, compact Source layout media rules, `check-source-control-design.mjs`.
- `PDA-REQ-048` -> `MonitorShell.tsx` Source inline receipt and save result receipt markup, `app/globals.css` Source result hero/summary/card/lozenge/path styling, `check-source-control-design.mjs` result receipt tokens.

## Validation Mapping

- Browser smoke desktop/mobile target and overflow checks.
- `check-readiness.mjs` and `readiness.test.mjs` responsive button token assertions.
- Browser smoke Source desktop `1366x900`, compact `900x620`, mobile `390x844` action/tool/tab viewport checks.
- `workspace-monitor run check` includes `check-source-control-design.mjs`.
- `check-source-control-design.mjs` checks Source result receipt design tokens.
