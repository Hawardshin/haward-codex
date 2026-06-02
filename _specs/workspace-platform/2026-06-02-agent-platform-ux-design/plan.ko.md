# 에이전트 플랫폼 UX/디자인 개선 계획

## 전략

1. 딥리서치 결과를 통과 가능한 `deep-research-input.json`으로 기록한다.
2. 요구사항 `REQ-WS-077`을 기준선에 추가한다.
3. `workspace-monitor` overview에 command center, UX spine, attention/evidence panels를 추가한다.
4. CSS를 조정해 정보 위계, 색상 역할, 모바일 안정성을 개선한다.
5. `platform-desktop-app/artifacts/user-flow-map.html`을 설치형 제품 UX 흐름으로 재구성한다.
6. 프로젝트별 UX 문서를 추가한다.
7. tests/typecheck/build와 Playwright screenshot smoke로 검증한다.

## 파일 범위

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/docs/research-backed-ux.*.md`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `platform-desktop-app/docs/research-backed-ux.*.md`
- `_research/topics/ux/`
- `_requirements/`
- `_specs/workspace-platform/2026-06-02-agent-platform-ux-design/`
- `_history/`

## 리스크

- first viewport에 너무 많은 정보를 넣으면 오히려 복잡해질 수 있다.
- 디자인 개선이 실제 사용자 테스트로 검증된 것은 아니다.
- Playwright screenshot은 겹침과 렌더링을 잡지만 실제 사용성 전체를 보장하지 않는다.

## 검증

- `complete-deep-research`
- `npm run test`
- `npm run check`
- `npm run build`
- Playwright screenshot smoke for `workspace-monitor/out/index.html`
- `platform-desktop-app npm run check`
- `workspace-health --include-build`
