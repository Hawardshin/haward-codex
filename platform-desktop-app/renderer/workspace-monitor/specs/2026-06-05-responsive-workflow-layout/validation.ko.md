# 검증: Responsive Workflow Layout

## 수행 검증

- `pnpm run check`: 통과
- `pnpm test`: 17개 통과
- `pnpm exec next build`: 통과
- `pnpm run perf:budget`: 통과, largest chunk 326615 bytes
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
- Playwright readable font smoke:
  - 390x844: body/root font family에 `Pretendard Variable`, `Pretendard`, `Noto Sans KR` fallback 포함
  - small samples: 11px, line-height 15.95px 이상, horizontal overflow 0
- Playwright dark foreground smoke:
  - dark/theme rail, active controls, source/code/terminal dark surfaces use `--text-on-dark`/computed white foreground
- 정적 export Playwright typography audit:
  - 대상: `overview`, `agents`, `desktop`, `source`, `intent`
  - viewport: 1280x820, 900x720, 720x720, 540x720, 390x720
  - 결과: 25개 조합 모두 failures 없음, body font stack에 `Pretendard`/`Noto Sans KR` 포함, 어두운 배경 direct text는 computed white, 22px direct text 없음
- 정적 export Playwright information-density audit:
  - 대상: `overview`, `agents`, `desktop`, `source`, `intent`
  - viewport: 1280x820, 900x720, 720x720, 540x720, 390x720
  - 결과: 25개 조합 모두 failures 없음
  - 390x720 `agents`: section disclosure 1개 기본 닫힘, 보조 패널 visible 0, top panels 2, agent work context 기본 닫힘, overflow 0
  - 390x720 `desktop`: section disclosure 2개 기본 닫힘, 보조 패널 visible 0, top panels 4, overflow 0
  - interaction: 390x720에서 Agents 1개, Desktop 2개 disclosure summary click/open/close 및 overflow 0 확인
- Agent Core chat audit:
  - 대상: `agents`
  - viewport: 1280x820, 900x720, 720x720, 540x720, 390x720
  - 결과: 5개 조합 모두 failures 없음
  - 확인: root/body horizontal overflow 0, central conversation log visible, message 2개 visible, bottom composer visible, send/terminal visible, provider/model controls inside composer, context drawer 기본 닫힘, visible action/input target 40px 이상

## 확인 기준

- `.desktop-app-shell`은 `height: 100dvh`와 `overflow: hidden`을 강제하지 않는다.
- `.desktop-viewport`는 자연스러운 page reflow를 허용한다.
- 첫 화면의 secondary panel은 기본 접힘 상태다.
- desktop/tablet/mobile viewport에서 body horizontal overflow가 없다.
- 비전체화면 주요 섹션에서 한 화면에 여러 기능을 압축하지 않고 1열/깊이 기반으로 reflow한다.
- 초기 JS 성능 예산은 `maxInitialChunkBytes=1000000` 아래에 있어야 한다.
- 텍스트는 `Pretendard Variable`/`Pretendard` 우선 sans fallback stack과 역할 기반 token으로만 선언하고, 작은 보조 텍스트는 11px small token으로 유지하되 브라우저 기본 `<small>` 축소처럼 scale 밖으로 빠지는 visible text가 없어야 한다.
- 어두운 배경 위 visible text는 반투명 회색 foreground가 아니라 흰색 foreground token을 사용해야 한다.
- Agents/Desktop Runtime의 보조 기능군은 기본 닫힌 section-level disclosure 아래에 있어야 하며, 닫힌 상태에서 해당 보조 패널이 visible로 계산되면 실패다.
- Agent Core 채팅은 중앙 대화 로그와 하단 composer가 같은 주 작업면에 보여야 하며, provider/model/context 컨트롤이 대화 입력보다 우선 노출되어 화면을 밀어내면 실패다.
