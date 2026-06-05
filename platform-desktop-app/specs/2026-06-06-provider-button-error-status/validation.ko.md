# 검증: Provider 버튼 오류 상태

## 예정 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor check`
- `corepack pnpm --filter platform-desktop-app check`
- in-app Browser provider button layout smoke
- `corepack pnpm run desktop:package:internal`

## 현재 상태

- `corepack pnpm --filter workspace-monitor test` - passed
- `corepack pnpm --filter platform-desktop-app test` - passed
- `corepack pnpm --filter workspace-monitor run collect` - passed; wrote 650 inline documents and 2435 admin history records.
- `corepack pnpm --filter workspace-monitor check` - passed.
- `corepack pnpm --filter platform-desktop-app check` - passed.
- `corepack pnpm --filter workspace-monitor build` - passed for static Browser smoke.
- in-app Browser smoke at `http://127.0.0.1:4173/` - passed. Gemini model check button gained `완료` status while relative position inside `.provider-account-actions` stayed `x=374.875`, `y=0`, `width=113.8203125`, `height=44`; visible provider error/notice paragraphs stayed 0.
- `corepack pnpm run desktop:package:internal` - passed; generated `.app` and `.dmg`, codesign verification passed, and `hdiutil verify` reported a valid DMG checksum.

## 수동 확인 항목

- 저장 버튼을 빈 API key로 클릭해도 provider row 아래 visible error paragraph가 생기지 않는다.
- 저장 버튼의 좌표와 크기는 오류 상태 전후로 유지된다.
- 오류 상태는 버튼 내부 `provider-button-status` badge와 `aria-label`에 반영된다.
