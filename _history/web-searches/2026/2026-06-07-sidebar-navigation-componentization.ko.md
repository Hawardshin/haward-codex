# 웹 검색 기록: Sidebar Navigation Componentization

- 날짜: 2026-06-07
- 작업: 미뤘던 `componentized_desktop_ui_architecture` 구현의 첫 조각으로 Workspace Monitor의 사이드바 네비게이션을 분리한다.

## 검색

- `Tauri v2 shell plugin sidecar command official documentation`
- `Tauri v2 command invoke official documentation`
- `Next.js 16 App Router official documentation client components`

## 확인한 출처

- Tauri Shell plugin: https://v2.tauri.app/plugin/shell/
- Tauri Sidecar documentation: https://v2.tauri.app/develop/sidecar/
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components

## 계획 반영

- 이번 조각은 외부 CLI 실행이나 sidecar 설치가 아니라 renderer UI 구조 분리다.
- Next.js 문서 기준 상호작용 UI는 Client Component 경계 안에서 유지한다.
- Tauri shell/sidecar 문서는 다음 CLI 실행 경계 구현의 기준으로만 확인했고, 이번 작업에서 새 native process 실행은 추가하지 않는다.

## 약한 출처 제외

- 블로그, 커뮤니티 글, Reddit 검색 결과는 이번 구현 결정에 필요하지 않아 사용하지 않았다.
