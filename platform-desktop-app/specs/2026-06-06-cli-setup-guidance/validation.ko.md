# 검증 계획

## 명령

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm run desktop:package:internal`

## UI 계약

- `data-cli-setup-step`
- `data-cli-command-copy`
- `data-agent-cli-setup-ladder`
- `cli-adapter-setup-guide`
- `agent-cli-command-stack`

## 리소스 체크

- 새 장기 실행 프로세스, interval, subscription, worker를 만들지 않는다.
- 명령 복사는 clipboard API만 사용하며 CLI 실행과 분리한다.
- 기존 PTY/세션 시작 흐름은 변경하지 않는다.
