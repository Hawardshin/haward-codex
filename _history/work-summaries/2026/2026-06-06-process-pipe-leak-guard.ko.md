# 작업 요약: 프로세스/파이프 누수 방지

## 변경

- CLI adapter/command spawn에 Unix process group 설정을 추가했다.
- timeout/error/store cleanup에서 child kill만 하지 않고 process group kill과 wait를 통합했다.
- `CliSession`과 `NativePtySession`에 Drop guard를 추가했다.
- CLI/PTY finished cleanup에서 stdin, writer, PTY master, reader thread를 정리하는 finalize/dispose helper를 추가했다.
- readiness tests와 check-readiness에 lifecycle contract token을 추가했다.

## 검증

- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `cd platform-desktop-app/src-tauri && cargo check`: 통과.
- `cd platform-desktop-app/src-tauri && cargo test`: 통과.
- `corepack pnpm --filter workspace-monitor run collect`: 통과.
- `corepack pnpm run desktop:package:internal`: 통과, `.app`와 `.dmg` 생성 및 검증 완료.

## 남은 후속

- Windows process tree cleanup.
- 반복 세션 stress harness로 FD/RSS/child count delta 측정.
