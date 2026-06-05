# 작업 타이밍: 네이티브 PTY 터미널 런타임

| 단계 | 기록 |
| --- | --- |
| 웹/코드 조사 | 공식 문서 검색, 기존 pipe-first 구현과 PTY deferred decision 확인 |
| 구현 | Rust PTY command/store, xterm surface, renderer state/polling 연결 |
| 검증 | Rust/frontend/readiness/package/internal artifact verification |
| 기록 | requirements/spec/history/install/resource/evaluation 기록 |

## 병목

- 패키징 빌드는 release compile과 DMG verification 때문에 가장 오래 걸렸다.
- Browser plugin 도구가 직접 노출되지 않아 Playwright 대체 smoke와 서버 상태 확인에 추가 시간이 들었다.
