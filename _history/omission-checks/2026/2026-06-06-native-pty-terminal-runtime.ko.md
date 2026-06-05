# 누락 점검: 네이티브 PTY 터미널 런타임

## 사용자 요구 대응

- 터미널 기능 재검토: 기존 구현이 pipe-first 로그/입력 패널임을 확인하고 PTY 런타임으로 전환했다.
- 운영체제 자원 활용: Rust `portable-pty`로 OS pseudo terminal을 사용한다.
- 기존 기능 보존: pipe-first CLI supervisor, task-run store, decision inbox command를 유지했다.
- UI 직관성: 터미널 드로어에 `PTY` 탭과 실제 xterm surface를 추가했다.
- 빌드 자동 실행: `package:internal`까지 실행해 `.app`와 `.dmg`를 생성했다.

## 검증 누락 여부

- Rust check/test/build: 완료.
- Renderer type/check/test/customer build: 패키징 파이프라인에서 완료.
- Readiness/runtime contract/customer bundle/internal release/service readiness: 완료.
- Browser tool: 직접 노출되지 않아 Playwright DOM/CSS smoke로 대체.

## 보류된 후속

- 설치 앱에서 실제 PTY shell start/input/resize를 눈으로 확인하는 수동 smoke.
- PTY transcript를 task-run store에 영구 저장할지 여부는 별도 제품 결정.
