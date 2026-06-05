# 구현 계획

1. Web-first intake로 오픈소스 기능 후보와 설치 정책 요구를 확인한다.
2. 기존 Workspace Monitor snapshot, Product Structure, customer sanitizer 구조를 확인한다.
3. self-documenting open-source feature registry를 추가한다.
4. collector와 snapshot type에 `openSourceFeatureReferences`를 연결한다.
5. Product Structure 화면에 Open Source Feature Radar 보드를 추가한다.
6. CSS를 추가해 기본 버튼 느낌을 줄이고 compact desktop card로 보이게 한다.
7. collector/static UI tests를 추가한다.
8. config contract, renderer tests/check/perf/build, platform tests/check, package build, smoke를 실행한다.
9. history, validation, evaluation, request trace를 기록하고 commit/push한다.

## 언어와 구조 결정

- 선택 언어: TypeScript/React + Node ESM collector.
- 대안: Rust/Tauri command로 candidate repo registry를 읽는 방법이 있으나, 현재 데이터는 build-time snapshot 성격이라 renderer collector가 더 작고 유지보수 비용이 낮다.
- 폴더 구조: config는 `platform-desktop-app/configs/`, collector는 기존 `scripts/lib/`, UI는 기존 `components/features/`, tests는 기존 `tests/`에 둔다.
