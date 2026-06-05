# 평가: Agents Detail Single Workspace

## 결과

- Agents 세부 기능 disclosure의 긴 스택을 세부 기능 선택기와 단일 active workspace 구조로 바꿨다.
- 기본 세부 화면은 Collaboration 3D 작업판으로 시작한다.
- 생성기 선택 시 Collaboration theater와 3D canvas가 DOM에서 사라지고 생성기 panel만 남는다.
- 모바일에서는 선택기가 한 열로 접히며 버튼 텍스트가 깨지지 않는다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 40 tests 통과
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734,386 bytes
- in-app Browser: Collaboration 기본, Builder 전환, selected tab 1개, overflowX 0 확인
- 390px Playwright: Collaboration/Builder 전환 모두 overflowX 0, Builder에서 canvas false 확인

## 판단

- 이 변경은 Agents 탭의 정보 밀도 문제를 직접 줄인다.
- 기본 채팅 화면은 그대로 보존했고, 세부 기능도 선택기로 발견 가능하게 남겼다.
- 이후 같은 패턴을 Desktop Runtime이나 Source 보조 도구에도 적용할 수 있다.
