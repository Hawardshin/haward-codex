# Shared Workspace Resource Cache 요청 추적

## 요청

- 사용자는 계속 개발하라고 지시했다.
- 이전 대화 맥락상 데스크톱 앱의 탭 이동 지연, native resource 활용, 메모리/CPU 사용, 구현 후 자동 빌드가 지속 요구사항이다.

## 결정

- 전면 재작성 대신 현재 resident `desktop`/`source` panel 경계에서 확인 가능한 중복 native workspace 요청을 먼저 제거했다.
- Rust command schema와 source editor UX는 유지했다.
- 새 dependency는 설치하지 않았다.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-shared-workspace-resource-cache.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-shared-workspace-resource-cache/spec.ko.md`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`, `platform-desktop-app/tests/readiness.test.mjs`
- 제품 계약: `platform-desktop-app/configs/product-feature-registry.json`
- 평가: `_history/evaluations/2026/2026-06-06-shared-workspace-resource-cache.ko.md`

## 결과

- 요청은 이번 slice 범위에서 완료.
- 내부 package까지 완료.
