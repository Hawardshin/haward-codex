# 요청-결과 추적: 핵심 기능 메인 탭 UX

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-044`
- 소유 프로젝트: `platform-desktop-app/`
- 렌더러: `platform-desktop-app/renderer/workspace-monitor/`
- 작업 모드: `quick`

## 요청 요약

사용자는 설치형 데이터 경로와 전체 사용 흐름이 너무 불편하고, 사용자가 앱을 어떻게 쓰는지 모르겠다는 피드백이 들어온다고 지적했다. 핵심 기능을 당연히 메인에 두고, 그 메인 탭 기준으로 다양한 기능을 전개하는 방향을 요구했다.

## 결과

- Overview 첫 화면의 기존 quick start 영역을 `핵심 기능` 메인 탭 workbench로 바꿨다.
- 메인 탭은 `파일 가져오기`, `에이전트 만들기`, `작업 실행`, `학습/개선`으로 구성했다.
- 각 탭은 기능 목적, 3단계 진행 흐름, primary action, secondary action, 현재 metric을 보여준다.
- 기본 탭은 `파일 가져오기`로 두어 사용자가 먼저 작업공간/파일을 가져오고 Explorer를 열게 했다.
- `작업 실행` 탭은 하단 터미널을 열고, `에이전트 만들기`는 에이전트 화면, `학습/개선`은 intent/accumulated data 흐름으로 연결한다.
- 누적 데이터 store path, accumulated index path, runtime root path, payload audit path, support bundle export paths를 기본 노출에서 빼고 `세부 경로` details disclosure 안으로 옮겼다.
- readiness script와 Node test가 핵심 탭/경로 disclosure token을 검증하게 했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/public/workspace-snapshot.json`
- `platform-desktop-app/renderer/workspace-monitor/src/generated/workspace-snapshot.json`
- `platform-desktop-app/artifacts/2026-06-03-core-main-tabs-ux/core-main-tabs.png`
- `_history/web-searches/2026/2026-06-03-core-main-tabs-ux.ko.md`
- `_history/evaluations/2026/2026-06-03-core-main-tabs-ux.ko.md`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed before records
- Browser static-build smoke: 메인 탭 4개, 기본 `파일 가져오기` detail, `작업 실행` 탭 전환, quick action, activity rail 1개, desktop sidebar 0개 확인

## 잔여 위험

- 이 변경은 메인 IA와 path disclosure의 renderer 개선이다. 실제 신규 사용자의 이해도는 packaged app에서 첫 실행 사용자 테스트로 계속 확인해야 한다.
- 완전한 제품 onboarding wizard는 별도 first-run flow slice에서 이어서 구현할 수 있다.
