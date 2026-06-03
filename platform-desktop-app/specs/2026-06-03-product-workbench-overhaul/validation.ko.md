# 제품 Workbench 대공사 검증

## 정적 검증

- TypeScript: `corepack pnpm --filter workspace-monitor run check`
- Renderer tests: `corepack pnpm --filter workspace-monitor test`
- Desktop tests: `corepack pnpm --filter platform-desktop-app test`
- Desktop readiness: `corepack pnpm --filter platform-desktop-app run check`
- Whitespace: `git diff --check`

## 빌드 검증

- Customer renderer: `corepack pnpm --filter workspace-monitor run build:customer`
- Customer bundle audit는 `platform-desktop-app run check` 안에서 실행한다.

## Browser Smoke

- Overview에 `핵심 기능` 메인 탭 4개가 보인다.
- 기본 탭은 `파일 가져오기`다.
- `작업 실행` 탭으로 전환된다.
- `activity-rail`은 1개, `desktop-sidebar`는 0개다.
- 기본 Overview에는 raw runtime path code가 노출되지 않는다.
- path disclosure는 runtime/operator surface에서 details로만 노출된다.

## 대공사 진행 지표

- `MonitorShell.tsx`에서 user-facing surface 책임이 component로 이동한다.
- readiness token은 새 구조를 강제한다.
- screenshot artifact와 evaluation record를 남긴다.

## Slice 01 결과

- `CoreFeatureTabs.tsx`로 Overview 핵심 기능 탭 렌더링을 이동했다.
- `PathDisclosure.tsx`로 raw path details 렌더링을 공용화했다.
- 다크 테마 첫 화면에서 홈/제품 기능 카드가 고정 흰색으로 보이는 문제를 테마 변수 기반 표면색으로 수정했다.
- Browser smoke 결과: 메인 탭 4개, `작업 실행` 탭 전환, activity rail 1개, desktop sidebar 0개, 하단 터미널 drawer 진입 확인.
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-product-workbench-overhaul-slice-01/core-feature-tabs-componentized.png`
