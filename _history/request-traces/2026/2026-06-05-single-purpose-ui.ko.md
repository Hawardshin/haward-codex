# 요청 추적: Single Purpose UI

## 요청

- 기능 하나가 명확히 한 가지 일만 하도록 Workspace Monitor UI를 조정한다.

## 결과

- Workspace Monitor 홈의 핵심 기능 상세 CTA를 하나로 줄였다.
- 홈 action 버튼을 `에이전트 만들기`, `CLI 작업 시작`, `루트 파일 열기`, `설정 점검`처럼 중복 없는 단일 목적 행동으로 바꿨다.
- 보조 disclosure를 실행 순서, 결정함, 작업 지표, 제품 구조, 최근 기록, 옵션 상태로 분리했다.
- 영속 지침, UI 정책, memory bootstrap, Workspace Monitor 요구사항에 단일 목적 UI 원칙을 반영했다.

## 연결 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-single-purpose-home-ui/`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-05-single-purpose-ui.ko.md`
- 평가: `_history/evaluations/2026/2026-06-05-single-purpose-ui-evaluation-input.json`

## 검증

- `pnpm run check`: 통과
- `pnpm test`: 17개 통과
- `pnpm exec next build`: 통과
- `pnpm run perf:budget`: 통과
- docs audit, config contract, JSON syntax check: 통과
- Browser smoke: 1280/900/390px horizontal overflow 0, disclosure 6개 기본 접힘, active feature CTA 1개, mobile disclosure open 후 overflow 0
