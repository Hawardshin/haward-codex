# 2026-06-05 Snapshot Loader Error State Web Search

## Trigger

- 사용자 지시: 버그개선.
- 목적: Workspace Monitor snapshot fetch 실패 처리와 static export asset 경계의 공식 기준을 확인한다.

## Queries

- `React useEffect fetch abort error handling official docs`
- `MDN AbortController fetch timeout error handling`
- `Next.js static export public assets official docs`
- `Node.js test runner official docs`

## Checked Sources

- React `useEffect`: https://react.dev/reference/react/useEffect
- MDN AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
- Next.js static assets/static export: https://nextjs.org/docs/pages/guides/static-exports
- Node.js test runner: https://nodejs.org/api/test.html

## Decision Impact

- Snapshot fetch는 `useEffect` cleanup에서 abort/timeout timer를 정리한다.
- Fetch 실패나 timeout은 loading 상태로 방치하지 않고 explicit error 상태로 전환한다.
- Next.js static export에서 `public/workspace-snapshot.json`이 없거나 실패할 수 있으므로 실제 정적 output을 HTTP server로 띄워 404 error UI를 확인한다.
- Node test runner 기반 source contract regression test를 추가한다.

## Weak Or Unused Sources

- Stack Overflow와 Reddit은 보조 신호로만 봤고, 구현 판단은 React/MDN/Next.js/Node 공식 문서에 맞췄다.

## Public Summary

- Workspace Monitor snapshot loader가 fetch 실패를 사용자에게 명확히 보여주도록 수정한다.
