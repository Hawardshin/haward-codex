# 작업 요약: desktop project management platform

- 날짜: 2026-06-08
- 범위: `platform-desktop-app/`

## 완료한 작업

- 프로젝트 관리 snapshot model을 추가했다.
- collector가 프로젝트 registry, requirements, documents, history, tasks를 결합해 portfolio/milestone/workflow/recent trail을 만든다.
- 고객용 snapshot에서 내부 project portfolio/resource/recent trail을 제거한다.
- `projects` section을 `ProjectManagementPanel`로 교체했다.
- 패널은 Git 작업공간 가져오기, 프로젝트별 현재 상태, 마일스톤, 최근 보고/근거, 기본 액션을 제공한다.
- 제품 분리 registry에 project portfolio와 milestone status를 desktop tracker 핵심 산출물로 추가했다.
- renderer/platform tests, build, Browser smoke를 실행했다.

## 검증 결과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect --best-effort`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 116개 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`: 통과
- `corepack pnpm --dir platform-desktop-app run test`: 30개 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과, public release signing/updater/clean-machine warning은 기존 게이트
- Browser smoke: desktop 프로젝트 탭과 모바일 폭에서 프로젝트 패널/레인/카드 확인, 모바일 가로 overflow 없음

## 남은 큰 과제

- 실제 Git remote clone/create 실행 flow 강화
- guest AI tool별 진단/연결 경험 강화
- 큰 `MonitorShell.tsx`와 CSS의 지속적 componentization
