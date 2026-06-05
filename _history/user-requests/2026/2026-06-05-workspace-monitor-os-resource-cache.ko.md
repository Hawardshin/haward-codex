# 사용자 요청 요약: Workspace Monitor OS 자원 사용

- 날짜: 2026-06-05
- 요약: 사용자는 이전 렌더러 중심 최적화가 충분하지 않다고 지적하고, 실제 데스크톱 앱이므로 운영체제 자원과 네이티브 런타임을 사용해 탭 이동/소스 워크벤치 지연을 줄이라고 요구했다.
- 지속 지시: 구현이 끝나면 사용자가 직접 빌드하지 않도록 자동으로 빌드까지 실행해야 한다.
- 반영 위치: `platform-desktop-app` Tauri Rust runtime, Workspace Monitor source workbench, desktop package pipeline.
