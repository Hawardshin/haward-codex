# Web Search Record: Question Deferral Performance

## Purpose

Check official references for polling, interval cleanup, child-process lifecycle, and static rendering performance around CLI question deferral.

## Sources Checked

- React `useEffect`: https://react.dev/reference/react/useEffect
  - Impact: active session polling needs explicit effect cleanup, request dedupe, and throttling.
- React `memo`: https://react.dev/reference/react/memo
  - Impact: memoization is a performance optimization rather than a guarantee, so this change first reduces state replacement and unnecessary object churn.
- Rust `std::process::Child`: https://doc.rust-lang.org/std/process/struct.Child.html
  - Impact: child process lifecycle needs explicit wait/cleanup, so the existing kill/wait/reader join boundaries remain.
- Rust `std::process`: https://doc.rust-lang.org/stable/std/process/index.html
  - Impact: keep stdin/stdout/stderr pipe modeling while adding bounded output scanning.
- Next.js rendering docs: https://nextjs.org/docs/14/pages/building-your-application/rendering
  - Impact: continue validating Workspace Monitor through static output and performance budget checks.

## Plan Impact

- Bound CPU cost by scanning recent output tails instead of full accumulated output.
- Add polling overlap prevention and inbox refresh throttling.
- Merge React session state by render signature to reduce unnecessary rerenders.
