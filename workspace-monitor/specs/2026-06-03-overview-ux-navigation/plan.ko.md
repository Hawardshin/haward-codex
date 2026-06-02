# 계획: Overview UX 내비게이션 개선

## 작업 순서

1. 웹 검색으로 dashboard, macOS, Fluent, visibility/status UX 기준을 확인한다.
2. 기존 `MonitorShell` Overview 구조와 `globals.css` responsive rule을 읽는다.
3. 기존 snapshot 데이터만 사용해 tab badge와 operator strip을 구현한다.
4. 요구사항, 스펙, 추적, 검증 기록을 갱신한다.
5. TypeScript, 테스트, Next build, customer bundle, Tauri/Rust 검증을 실행한다.
6. 브라우저 또는 정적 smoke로 렌더링 토큰을 확인한다.

## 결정

- 데이터 모델 확장은 보류한다. 이번 개선은 이미 수집된 snapshot과 collaboration board 데이터를 더 잘 노출하는 UI 작업이다.
- `superadmin_developer` 기본 운영 화면의 밀도를 유지하고, marketing hero나 설명성 text block은 추가하지 않는다.
