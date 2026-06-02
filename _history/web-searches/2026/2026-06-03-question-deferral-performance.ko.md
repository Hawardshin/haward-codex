# 웹 검색 기록: 질문 보류 성능

## 목적

CLI 질문 보류 기능의 polling, interval cleanup, child process lifecycle, static rendering 성능 방향을 공식 문서로 확인했다.

## 확인 소스

- React `useEffect`: https://react.dev/reference/react/useEffect
  - 영향: active session polling은 effect cleanup, request 중복 방지, throttle을 직접 관리해야 한다.
- React `memo`: https://react.dev/reference/react/memo
  - 영향: memoization은 보장책이 아니라 성능 최적화이므로, 우선 state 병합과 불필요한 object 교체를 줄인다.
- Rust `std::process::Child`: https://doc.rust-lang.org/std/process/struct.Child.html
  - 영향: child process lifecycle은 명시적으로 wait/cleanup해야 하며, 기존 kill/wait/reader join 경계를 유지한다.
- Rust `std::process`: https://doc.rust-lang.org/stable/std/process/index.html
  - 영향: stdin/stdout/stderr pipe 모델을 유지하되 bounded output과 bounded scan을 적용한다.
- Next.js rendering docs: https://nextjs.org/docs/14/pages/building-your-application/rendering
  - 영향: Workspace Monitor는 static output/performance budget 검증을 계속 유지한다.

## 계획 영향

- 전체 output scan 대신 최근 output tail scan으로 CPU 상한을 둔다.
- polling overlap guard와 inbox refresh throttle을 둔다.
- React state update는 session report signature 기준으로 병합한다.
