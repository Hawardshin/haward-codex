# 평가: Tool Studio Source Separation

## 판정

- 결과: 통과
- 요구사항: REQ-WM-071
- 범위: Tool Studio 타입/정적 데이터 모듈 분리와 기존 export 호환성 유지

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734386 bytes / 1000000 bytes
- `git diff --check`: 통과

## 잔여 리스크

- `MonitorShell.tsx`는 아직 13k줄 대형 파일이다.
- Tool Studio의 3D effect와 pane별 렌더링은 후속 slice에서 추가 분리할 수 있다.
