# 평가: Text Wrapping Contract

## 결과

- REQ-WM-069 충족: 문장형 텍스트, 버튼/컨트롤 라벨, 긴 경로/명령/코드 토큰을 분리한 공통 줄바꿈 계약을 `globals.css`에 추가했다.
- 한글/한영 prose는 `word-break: keep-all`과 자연 줄바꿈을 사용하고, 긴 토큰은 `overflow-wrap: anywhere` 계열로 레이아웃을 밀지 않게 했다.
- 버튼 자식 텍스트는 `max-width: 100%`를 갖도록 고정했다.
- 새 설치 없음.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 44개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes
- in-app Browser smoke와 Playwright desktop/mobile screenshot smoke: 통과, body/root overflowX 0
- `git diff --check`: 통과

## 잔여 리스크

- 이번 slice는 전역 줄바꿈 계약을 세운 작업이다. 화면별 카피 길이 자체가 과도한 경우에는 별도 정보구조/문구 정리가 필요하다.
