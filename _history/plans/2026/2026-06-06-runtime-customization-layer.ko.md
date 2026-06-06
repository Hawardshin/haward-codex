# Plan Record: Runtime Customization Layer

## 작업 모드

- `ship_first` 성격의 구현 작업으로 처리했다.
- 새 dependency 설치 없이 기존 runtime과 preferences를 확장했다.

## 작업 분해

1. web-first intake로 Tauri persistent settings, xterm.js terminal surface, provider API endpoint 근거 확인.
2. renderer preferences schema와 settings UI 확장.
3. native PTY shell/startup/quick command 경로 연결.
4. Rust provider base URL/model override 경로 연결.
5. 테스트와 패키지 빌드로 검증.

## 병렬/리소스 고려

- renderer와 Rust 변경은 같은 preferences schema를 공유하므로 병렬 파일 편집 대신 순차 변경했다.
- long-running server는 띄우지 않았다.
- build/package 단계에서 Tauri bundling이 생성물을 갱신할 수 있음을 기록한다.
