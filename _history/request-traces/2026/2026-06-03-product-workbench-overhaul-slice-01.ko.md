# 요청 추적: 제품 Workbench 대공사 Slice 01

## 요청

- 요청 ID: `UR-2026-06-03-045`
- 요약: 전체 변경이 크다고 멈추지 말고, 대공사를 계획하고 실제 구현으로 시작한다.

## 결정

- 한 번에 전체 renderer를 교체하지 않고, 기능별 slice로 분해해 매 slice마다 빌드와 browser smoke를 통과시킨다.
- 첫 slice는 사용자 첫 화면과 반복 path disclosure를 분리해 `MonitorShell.tsx` 책임을 줄인다.
- VS Code OSS/Theia 전체 도입은 설치, license, 보안, bundle audit가 필요한 후속 decision으로 둔다.

## 구현

- `platform-desktop-app/specs/2026-06-03-product-workbench-overhaul/`에 spec, plan, tasks, validation, traceability를 작성했다.
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/CoreFeatureTabs.tsx`를 추가했다.
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/PathDisclosure.tsx`를 추가했다.
- `MonitorShell.tsx`는 핵심 기능 탭 설정과 shell state만 갖고, 탭 UI 렌더링은 component에 위임한다.
- 홈/제품 기능 패널의 고정 밝은 배경을 테마 변수 기반 표면색으로 바꿨다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 17 tests 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 17 tests 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `git diff --check`: 통과
- Browser smoke: 메인 탭 4개, `작업 실행` 전환, 하단 터미널 drawer 진입, activity rail 1개, desktop sidebar 0개, 다크 테마 표면색 확인
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-product-workbench-overhaul-slice-01/core-feature-tabs-componentized.png`

## 결과

- 대공사는 계획 문서에서 멈추지 않고 첫 구조 slice 구현으로 시작됐다.
- 다음 slice는 `slice-02-workspace-explorer-module`이다.
