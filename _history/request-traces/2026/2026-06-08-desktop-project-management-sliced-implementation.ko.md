# 요청-결과 추적: desktop project management sliced implementation

- 날짜: 2026-06-08
- 요청 요약: 프로젝트 관리 플랫폼 기능을 slice로 나누어 구현하고, 사용자가 Git 작업공간과 현재 작업 보고/근거를 쉽게 볼 수 있게 하라는 요청.

## 결과

- 프로젝트 관리 snapshot에 실행 준비도, 보고 준비도, 진행률, 액션 큐, 보고서 묶음을 추가했다.
- 프로젝트 관리 UI를 `project-management/` 하위 컴포넌트로 분리했다.
- 프로젝트 상세 패널에서 액션 큐와 요구사항/보고서/근거/최근 기록 묶음을 보여준다.
- 프로젝트 액션 라우터를 추가해 `desktop` 액션은 하단 터미널 drawer까지 바로 연다.
- readiness source map과 검사 스크립트를 분리된 파일 구조에 맞게 갱신했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/project-management/`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/specs/2026-06-08-desktop-project-management-sliced-implementation/`
- `_history/evaluations/2026/2026-06-08-desktop-project-management-sliced-implementation-evaluation-input.json`

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect --best-effort`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`: 통과
- `corepack pnpm --dir platform-desktop-app run renderer:build`: 통과, customer bundle 감사 경고 없음
- `corepack pnpm --dir platform-desktop-app run test`: 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과
- omission/resource/evaluation close-out: 통과
- Browser smoke: desktop/mobile 프로젝트 탭, 액션 큐, 보고서 묶음, 터미널 실행 라우팅 확인
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `git diff --check`: 통과

## 남은 후속 후보

- `MonitorShell.tsx`, `snapshot.ts`, `collect-workspace.mjs`의 추가 feature module 분리
- 프로젝트 Browser smoke 자동화 스크립트화
- 원격 repository 생성/clone UX의 별도 runtime slice
