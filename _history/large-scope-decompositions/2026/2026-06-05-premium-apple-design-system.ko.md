# 대범위 분해: Premium Apple Design System

## 요청

- Workspace Monitor 전체 디자인을 Apple HIG 참고 수준의 고급스럽고 정돈된 방향으로 맞춘다.

## source inventory

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-visual-design-foundation/`
- 구현: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 검증: `platform-desktop-app/renderer/workspace-monitor/package.json`, `tests/*.test.mjs`, `scripts/check-performance-budget.mjs`
- 시각 QA: `platform-desktop-app/renderer/workspace-monitor/out/` static export

## exclusions

- 모든 컴포넌트 구조 전면 재작성
- Apple 브랜드/OS UI 직접 복제
- 새 UI 라이브러리, 폰트, 3D asset 설치
- 생성 snapshot 정리 또는 runtime logic 변경

## selected slices

- `slice-01-design-reference`: Apple HIG, Apple Design Resources, Apple Fonts 공식 문서 확인
- `slice-02-token-material`: light/dark color, surface, line, shadow, terminal token 조정
- `slice-03-repeated-surfaces`: titlebar, activity rail, repeated panel, primary action, 3D/terminal dark surface polish
- `slice-04-validation`: test/check/build/build:customer/perf와 desktop/mobile Playwright screenshot smoke
- `slice-05-records`: 요구사항, 스펙, history/evaluation/request trace 업데이트

## touch_paths

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-visual-design-foundation/`
- `_history/**/2026-06-05-premium-apple-design-system*`

## dependencies

- 기존 Pretendard, lucide, Radix/CVA Button, React Three Fiber/Drei 유지
- 새 설치 없음

## merge gates

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- desktop/mobile static export screenshot smoke, overflow 0, canvas nonblank

## source provenance

- 공식 Apple Developer 문서와 로컬 source/test/build 결과를 1차 근거로 사용한다.
- 비공식 mirror/blog/community 자료는 근거로 채택하지 않는다.
