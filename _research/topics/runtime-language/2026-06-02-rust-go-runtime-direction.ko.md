# Rust/Go 런타임 방향 조사

## 질문

플랫폼과 설치형 소프트웨어를 만들 때 Rust, Go, Python, TypeScript/Next.js, Electron을 어떤 위치에 쓰는 것이 효율적인가?

## 확인한 출처

- Rust 공식 사이트: Rust는 runtime/garbage collector 없이 빠르고 메모리 효율적인 시스템 프로그래밍, memory/thread safety를 강조한다.
- Rust Book concurrency 장: ownership/type system이 memory safety와 concurrency 문제 관리에 도움을 준다는 설명을 확인했다.
- Go 공식 문서: Go는 compiled, statically typed, concise/efficient language이며 tooling 문서와 PGO 경로를 제공한다.
- Go at Google: Go는 큰 규모의 software engineering 문제, build, dependency, readability, tooling을 해결하기 위해 설계되었다는 근거를 확인했다.
- Tauri 공식 문서: Tauri는 system webview를 사용해 작은 desktop/mobile binary를 만드는 방향을 제공한다.
- Wails 공식 문서: Wails는 Go backend와 web technology를 이용한 desktop app 후보이다.
- Electron 공식 성능 문서: Electron은 성능과 보안을 함께 고려해야 하며 main process와 renderer resource usage를 관리해야 한다.
- Python 공식 Extending/Embedding 문서: Python을 유지하면서 native extension 또는 embedding boundary를 둘 수 있는 근거를 확인했다.

## 판단

현재 플랫폼은 단일 언어 통일보다 hybrid 구조가 효율적이다.

- Python은 agent workflow와 조사/평가 생태계 때문에 유지한다.
- TypeScript/Next.js는 이미 `workspace-monitor`와 Vercel-ready UI에 맞다.
- Rust/Tauri는 작은 desktop shell, native command boundary, security-sensitive operation, stable hot path에 맞다.
- Go는 local daemon, file watcher, operational CLI, network bridge 같은 단순 장기 실행 프로세스에 맞다.
- Electron은 JavaScript desktop 생태계와 Chromium consistency가 더 중요할 때 fallback으로 둔다.

## 계획 반영

- `agent-platform/configs/runtime/language-decision-registry.json`에 컴포넌트별 언어 기본값과 decision gate를 추가한다.
- `platform-desktop-app`에는 Tauri-first를 유지하되 Go local service/Wails 비교 후보를 추가한다.
- 성능 목적 Rust/Go 전환은 측정값과 prototype 결과 없이 실행하지 않는다.

## 한계

- 현재 조사는 방향 설정이다. 실제 선택 전에는 로컬 prototype으로 cold start, memory, binary/installer size, build time, indexing/search latency를 측정해야 한다.
- Reddit/커뮤니티 의견은 참고 신호로만 보고 이번 결정의 직접 근거로 쓰지 않았다.
