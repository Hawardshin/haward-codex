# 검증: 플랫폼 소스 에디터 커스터마이징

## 실행 검증

- `git diff --check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 16개 통과.
- `corepack pnpm --filter workspace-monitor run build`: 통과, developer snapshot으로 Browser smoke에 사용.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`, largest initial chunk 227542 bytes.
- `corepack pnpm --filter workspace-monitor run check:intent-map`: 통과.
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과, customer bundle audit ready.
- `corepack pnpm --filter platform-desktop-app test`: 13개 통과.
- Browser smoke: developer static snapshot에서 Runtime Source Review의 `source-customization-bar` 표시, 템플릿 6개 표시, insert/context 버튼은 Tauri runtime 미연결 상태에서 disabled, body/viewport overflow 0 확인.

## 참고

- customer snapshot에서는 Source Review가 의도적으로 redacted되어 User View만 보인다. Browser smoke는 developer/superadmin snapshot build로 확인했고, 최종 산출물은 다시 customer build로 되돌렸다.
