# 2026-06-07 desktop runtime type boundary refactor 웹 검색 기록

- 요청 요약: 앞선 패키징 오류 수정 이후 구현을 계속 진행하라는 요청.
- 검색 시각: 2026-06-07
- 검색어:
  - `React official docs importing and exporting components split component file`
  - `Rust book modules official packages crates modules`
  - `Tauri official docs commands modular Rust state invoke`
- 확인한 출처:
  - React 공식 문서, 컴포넌트 import/export: https://react.dev/learn/importing-and-exporting-components
  - Rust 공식 Book, packages/crates/modules: https://doc.rust-lang.org/stable/book/ch07-01-packages-and-crates.html
  - Tauri command guide: https://v1.tauri.app/v1/guides/features/command
- 계획 영향:
  - 컴포넌트/타입을 명시 import/export 경계로 분리하는 방향을 유지함.
  - Rust는 이번 slice에서 새 로직 이동보다 이미 분리한 service readiness 모듈의 build/test 검증을 우선하고, 다음 Rust 분리는 별도 작은 slice로 남김.
- 제외:
  - 커뮤니티 검색 결과는 구현 근거로 사용하지 않음.

