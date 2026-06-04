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

## 확인 기준

- `.desktop-app-shell`은 `height: 100dvh`와 `overflow: hidden`을 강제하지 않는다.
- `.desktop-viewport`는 자연스러운 page reflow를 허용한다.
- 첫 화면의 secondary panel은 기본 접힘 상태다.
- desktop/tablet/mobile viewport에서 body horizontal overflow가 없다.
