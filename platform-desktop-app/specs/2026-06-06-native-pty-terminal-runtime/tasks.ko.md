# 작업 목록

| 작업 | 상태 | 산출물 |
| --- | --- | --- |
| 공식 문서와 dependency metadata 확인 | 완료 | web search record, cargo info |
| Rust PTY dependency 추가 | 완료 | `src-tauri/Cargo.toml`, `Cargo.lock` |
| PTY session store와 Tauri command 구현 | 완료 | `src-tauri/src/lib.rs` |
| xterm 기반 PTY view 구현 | 완료 | `RuntimeTerminalDrawer.tsx`, `globals.css` |
| 상위 런타임 패널 상태/폴링 연결 | 완료 | `MonitorShell.tsx` |
| 기존 pipe-first supervisor 보존 | 완료 | 기존 CLI command 유지, architecture docs |
| readiness/registry/runtime contract 갱신 | 완료 | `check-readiness.mjs`, `readiness.test.mjs`, contract, gap registry |
| 검증과 내부 패키징 빌드 | 완료 | `validation.ko.md` |
