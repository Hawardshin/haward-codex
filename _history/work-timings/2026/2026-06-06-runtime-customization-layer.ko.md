# Work Timing: Runtime Customization Layer

## 단계별 기록

| 단계 | 대략 소요 | 메모 |
| --- | ---: | --- |
| web-first intake | 5분 | Tauri, xterm.js, provider API 공식 문서 확인 |
| 코드 경로 분석 | 10분 | preferences, provider task, native PTY 경로 확인 |
| 구현 | 35분 | renderer UI/state, Rust schema/API, CSS, tests |
| 1차 검증 | 10분 | test/check/cargo check, history collect |
| 문서화 | 10분 | 요구사항, 스펙, 히스토리 기록 |
| 패키지 빌드 | 12분 | desktop pipeline, Tauri release build, macOS app/DMG 검증 |

## 병목

- renderer/Rust preferences schema를 동시에 맞추는 작업이 가장 큰 병목이었다.
- `workspace-monitor check`는 public admin-history index 상태에 민감해 `collect -- --best-effort` 재실행이 필요했다.
