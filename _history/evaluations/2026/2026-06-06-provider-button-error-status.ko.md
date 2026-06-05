# 평가: Provider 버튼 오류 상태

## 결과

- Provider 설정 오류가 visible paragraph로 삽입되어 버튼 위치를 밀어내는 흐름을 제거했다.
- 오류/완료/정보 상태는 해당 버튼 내부 badge, tooltip title, `aria-label`로 연결했다.
- hidden live region을 둬서 화면 레이아웃은 고정하면서도 상태 변경을 보조기술에 전달한다.

## 검증

- `corepack pnpm --filter workspace-monitor test` - passed
- `corepack pnpm --filter platform-desktop-app test` - passed
- `corepack pnpm --filter workspace-monitor run collect` - passed
- `corepack pnpm --filter workspace-monitor check` - passed
- `corepack pnpm --filter platform-desktop-app check` - passed
- `corepack pnpm --filter workspace-monitor build` - passed
- in-app Browser provider button layout smoke - passed
- `corepack pnpm run desktop:package:internal` - passed

## 남은 리스크

- 이 패턴은 provider account 설정 패널에 한정된다.
- 버튼 badge는 짧은 상태 표시이므로 상세 메시지는 title/aria-label/live region에 의존한다.
