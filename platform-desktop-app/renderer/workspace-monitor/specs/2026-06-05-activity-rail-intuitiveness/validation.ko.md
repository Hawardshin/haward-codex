# 검증: Activity Rail Intuitiveness

## 수행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes, chunk count 12
- in-app Browser: `http://127.0.0.1:3352/#section-overview`에서 desktop rail label span position `static`, active current `page`, utility `aria-label`, horizontal overflow 0 확인
- Playwright static export smoke: 1280x820, 390x720에서 nav label span visible, button target desktop 58x56/mobile 58x48, horizontal overflow 0 확인
- `git diff --check`: 통과

## 브라우저 관찰

- Desktop shell columns: `76px 1204px`
- Desktop labels: `홈`, `에이전트`, `CLI`, `툴스`, `툴`, `개선`
- Mobile rail height: 64px
- Mobile labels: span position `static`, width/height nonzero, document horizontal overflow 0
- 스크린샷:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-activity-rail-intuitiveness-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-activity-rail-intuitiveness-mobile.png`

## 통과 기준

- 기본 레일 nav 버튼의 label span이 visible computed style을 갖는다.
- 모바일 390px에서 상단 rail이 수평 문서 overflow를 만들지 않는다.
- active section의 `aria-current="page"`가 유지된다.
- 기존 build/check/perf budget이 통과한다.
