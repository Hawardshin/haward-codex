# 검증: Responsive Workflow Layout

## 수행 검증

- `pnpm run check`: 통과
- `pnpm test`: 17개 통과
- `pnpm exec next build`: 통과
- `pnpm run perf:budget`: 통과, largest chunk 362384 bytes
- `curl http://localhost:3213/`: `200`, 0.037714s
- in-app Browser responsive smoke:
  - 1280x720: horizontal overflow 0, disclosure 3개 기본 접힘
  - 900x720: horizontal overflow 0, disclosure 3개 기본 접힘
  - 390x844: horizontal overflow 0, disclosure 3개 기본 접힘
  - disclosure open interaction: 1개 열림, horizontal overflow 0
- 정적 export Playwright audit:
  - 대상: `overview`, `agents`, `desktop`, `source`, `intent`
  - viewport: 1280x820, 900x720, 720x720, 540x720, 390x720
  - 결과: 25개 조합 모두 `rootOverflow=0`, `bodyOverflow=0`, viewport 밖 offender 0, 44px 미만 visible target 0
- `pnpm run build:customer`: 통과
- `platform-desktop-app run check`: 통과, customer bundle ready
- `globals.css` typography token audit: 직접 숫자 기반 `font-size: <number>` 선언 없음
- in-app Browser typography smoke:
  - 390x844: rendered font sizes `11/12/13/14/16/18/20px`, horizontal overflow 0
- 정적 export Playwright typography audit:
  - 대상: `overview`, `agents`, `desktop`, `source`, `intent`
  - viewport: 1280x820, 900x720, 720x720, 540x720, 390x720
  - 결과: 25개 조합 모두 failures 없음, visible text font size는 11px 이상 24px 이하의 typography scale 안에 있음

## 확인 기준

- `.desktop-app-shell`은 `height: 100dvh`와 `overflow: hidden`을 강제하지 않는다.
- `.desktop-viewport`는 자연스러운 page reflow를 허용한다.
- 첫 화면의 secondary panel은 기본 접힘 상태다.
- desktop/tablet/mobile viewport에서 body horizontal overflow가 없다.
- 비전체화면 주요 섹션에서 한 화면에 여러 기능을 압축하지 않고 1열/깊이 기반으로 reflow한다.
- 초기 JS 성능 예산은 `maxInitialChunkBytes=1000000` 아래에 있어야 한다.
- 텍스트 크기는 역할 기반 token으로만 선언하고, 브라우저 기본 `<small>` 축소처럼 scale 밖으로 빠지는 visible text가 없어야 한다.
