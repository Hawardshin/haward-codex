# 런타임/언어 방향 웹 검색 기록

## 요청

플랫폼과 설치형 소프트웨어를 만들 때 Rust, Go 같은 효율적인 언어 중 좋은 방향을 찾아 달라는 요청.

## 검색어

- `Rust official website performance safety productivity systems programming`
- `Go official documentation why Go fast reliable efficient software`
- `Tauri official documentation Rust desktop app security bundle size`
- `Wails official documentation Go desktop apps`
- `Electron official documentation process model desktop app security performance`
- `Python official documentation extending embedding C API performance packages`
- `Go at Google language design in the service of software engineering official paper`
- `Go official documentation pprof profile guided optimization PGO`

## 확인한 출처

- Rust 공식 사이트와 Rust Book concurrency 장
- Go 공식 문서, Go PGO 문서, Go at Google
- Tauri 공식 시작/배포 문서
- Wails 공식 소개 문서
- Electron 공식 process/performance 문서
- Python 공식 Extending/Embedding 문서

## 계획 반영

- Python은 agent/research/evaluation layer 기본값으로 유지한다.
- TypeScript/Next.js는 monitor/dashboard/web UI 기본값으로 유지한다.
- Rust/Tauri는 desktop shell/native command boundary/stable hot path 1차 후보로 둔다.
- Go는 local daemon/file watcher/operational CLI 1차 후보로 둔다.
- Electron은 JavaScript desktop ecosystem이 더 중요할 때 fallback으로 둔다.
- Rust/Go 전환은 측정 가능한 병목, prototype measurement, release gate, rollback plan이 있을 때만 진행한다.

## 제외한 약한 출처

- Reddit, 개인 블로그, GitHub star 숫자는 채택/문제 신호로만 보고 이번 정책의 직접 근거로 쓰지 않았다.

## 남은 불확실성

- 실제 desktop prototype이나 local service를 만들 때는 로컬 측정값으로 다시 판단해야 한다.
- Wails는 Go desktop shell 후보지만 Tauri만큼 release gate와 ecosystem fit을 별도 검증해야 한다.
