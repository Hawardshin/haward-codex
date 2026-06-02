# 계획 기록: Intent Feature Map UI

## 요청

- 요청 ID: `UR-2026-06-03-016`
- 목표: 이전 단계에서 정리한 사용자 의도 기반 기능 지도를 Workspace Monitor의 실제 제품 표면으로 연결한다.

## 선택한 범위

- 소유 프로젝트: `workspace-monitor/`
- 공유 설정: `agent-platform/configs/access/view-mode-registry.json`
- 입력 산출물: `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md`

## 실행 계획

1. web-first intake와 memory bootstrap을 완료한다.
2. 기존 collector/type/UI 구조를 읽고 기존 패널 패턴을 유지한다.
3. Markdown 기능 지도에서 테마와 Now/Next/Later 표를 구조화한다.
4. customer snapshot에서는 내부 의도 맵을 제거한다.
5. developer/superadmin view에 `Intent Map` 섹션을 추가한다.
6. 요구사항, 스펙, 테스트, build, customer snapshot, perf, HTTP smoke로 검증한다.

## 계획 변경

- in-app Browser MCP 도구가 노출되지 않아 실제 클릭/스크린샷 검증은 실행하지 못했다.
- 대체 검증으로 dev server HTTP 200과 `/workspace-snapshot.json`의 `themes=12`, `now=4`, developer view `intent` 허용을 확인했다.

