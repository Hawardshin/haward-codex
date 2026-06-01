# 계획: 런타임/언어 방향

## 근거 요약

- Rust 공식 문서는 memory efficiency, no garbage collector/runtime, safety를 강조한다.
- Go 공식 자료는 large-scale software engineering, build/dependency/readability/tooling 문제를 해결하기 위한 언어 설계를 설명한다.
- Tauri 공식 문서는 system webview 기반 작은 desktop/mobile binary 방향을 제공한다.
- Wails 공식 문서는 Go backend와 web technology를 결합한 desktop app 후보를 제공한다.
- Electron 공식 문서는 resource usage와 security를 함께 고려해야 함을 설명한다.

## 실행 순서

1. `REQ-WS-051` 요구사항을 추가한다.
2. language decision registry를 만든다.
3. runtime language selection policy를 한영으로 작성한다.
4. desktop distribution registry와 packaging strategy에 Go/Wails/local service 비교와 언어 방향을 반영한다.
5. memory bootstrap에 새 registry/policy anchor를 연결한다.
6. 조사/히스토리/평가 기록을 작성한다.
7. 검증 후 커밋하고 push한다.

## 위험과 대응

- 위험: Rust/Go 선호가 불필요한 rewrite로 이어질 수 있다.
- 대응: 측정 가능한 병목과 prototype measurement 없이는 전환하지 않는 gate를 둔다.
- 위험: Tauri와 Wails가 desktop shell 경쟁 후보로 혼동될 수 있다.
- 대응: Tauri-first는 유지하되 Go는 local service/CLI의 1차 후보로 구분한다.
