# 검증: Tab Transition Performance

## 수행 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 17개 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 327881 bytes
- `corepack pnpm --filter platform-desktop-app run check`: 통과, public release 관련 기존 signing/updater/clean-machine warning은 유지
- in-app Browser smoke: `http://127.0.0.1:3223/`, nav ids `overview/agents/desktop/source/intent`, home visible, horizontal overflow 0

## 탭 전환 측정

- 기준: 정적 export, viewport 1280x820, CPU throttle 6, 탭 클릭부터 주 기능 패널 visible까지
- 이전 기준:
  - `agents`: 311.4ms
  - `desktop`: 280.9ms
  - `source`: 182.2ms
  - `intent`: 133.3ms
  - `overview`: 133.5ms
  - 평균: 208.3ms
- 최종 결과:
  - `agents`: 194.3ms
  - `desktop`: 177.9ms
  - `source`: 136.0ms
  - `intent`: 86.5ms
  - `overview`: 92.5ms
  - 평균: 137.4ms
- 개선: 평균 34.0% 감소, `agents` 37.6% 감소, `desktop` 36.7% 감소

## Disclosure Mount Audit

- 390x720 `agents` 닫힘: heavy agent panels 0, overflow 0
- 390x720 `agents` 열림: heavy agent panels 3, open details 1, overflow 0
- 390x720 `agents` 이탈 후 재진입: heavy agent panels 0, open details 0, overflow 0
- 390x720 `desktop` 닫힘: diagnostics 0, run records 0, open details 0, overflow 0
- 390x720 `desktop` 운영 진단 열림: diagnostics 3, run records 0, open details 1, overflow 0
- 390x720 `desktop` 실행 기록/결정함 열림: diagnostics 3, run records 3, open details 2, overflow 0

## 확인 기준

- 닫힌 보조 disclosure의 heavy panel DOM count가 0이면 통과다.
- summary click 후 기존 세부 패널이 visible이면 통과다.
- CPU throttle 6 평균 탭 전환 시간이 이전 208.3ms보다 낮으면 통과다.
- 모바일 폭에서 disclosure를 열어도 horizontal overflow가 0이면 통과다.
