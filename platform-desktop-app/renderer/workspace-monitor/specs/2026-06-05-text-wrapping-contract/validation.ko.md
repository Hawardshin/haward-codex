# Text Wrapping Contract 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- static export Browser smoke: 문장형 텍스트, 긴 토큰, 버튼 라벨 computed style과 root/body overflow 확인
- screenshot smoke: desktop/mobile 캡처
- `git diff --check`

## 기대 기준

- 문장형 텍스트는 `word-break: keep-all`과 자연 줄바꿈을 사용한다.
- 긴 토큰은 `overflow-wrap: anywhere` 계열을 사용하고 root horizontal overflow를 만들지 않는다.
- 버튼 자식 텍스트는 `max-width: 100%`를 유지한다.
- desktop 1440x1000과 mobile 390x844에서 root/body horizontal overflow가 0이다.

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 44개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과, `scroll_contract_ok`, `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes / budget 1,000,000 bytes
- in-app Browser smoke: 통과, Tools 화면에서 body/root overflowX 0, root `line-break: strict`, prose `word-break: keep-all`, long token `overflow-wrap: anywhere`, button child `max-width: 100%` 확인
- Playwright static export smoke: 통과, desktop 1440x1000과 mobile 390x844에서 body/root overflowX 0, prose/token/button child computed style 확인
- visual screenshot review: 통과, desktop/mobile 캡처에서 텍스트가 글자 단위로 깨지거나 버튼 라벨이 부모 폭을 넘는 현상 없음
- `git diff --check`: 통과

## 산출물

- `artifacts/screenshots/2026-06-05-text-wrapping-contract-desktop.png`
- `artifacts/screenshots/2026-06-05-text-wrapping-contract-mobile.png`
