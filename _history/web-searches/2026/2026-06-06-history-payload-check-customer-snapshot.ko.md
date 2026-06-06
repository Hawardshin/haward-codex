# Web Search: History Payload Check Customer Snapshot

- 날짜: 2026-06-06
- 요청: "오류 해결"
- 검색 순서:
  - `Tauri v2 calling Rust commands invoke handler official documentation`
  - `Next.js TypeScript noEmit build error official docs`
  - `Rust cargo check compile errors modules official documentation`
- 확인 출처:
  - Tauri v2 Calling Rust: https://v2.tauri.app/develop/calling-rust/
  - Next.js TypeScript configuration: https://nextjs.org/docs/pages/api-reference/config/typescript
  - Cargo check command: https://doc.rust-lang.org/nightly/cargo/commands/cargo-check.html
- 판단:
  - 외부 문서는 TypeScript/check/build 재현 순서와 Tauri command 변경 영향 여부 확인에만 사용했다.
  - 실제 오류 원인은 로컬 재현으로 확인했다. `build:customer`가 `public/admin-history-index.json`을 customer용 empty index로 바꾼 뒤 `check-history-payload.mjs`가 같은 `public` 파일을 developer admin index로 가정해 실패했다.
- 계획 영향:
  - `public/`을 검증 원본으로 쓰지 않고 `src/generated/admin-history-index.json`을 developer 검증 원본으로 분리한다.
