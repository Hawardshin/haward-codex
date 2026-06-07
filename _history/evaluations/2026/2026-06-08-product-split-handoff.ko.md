# Evaluation: product split handoff

- 날짜: 2026-06-08
- 범위: `platform-desktop-app`, `agent-tool-desktop-app`, workspace 기록

## 결과

- `platform-desktop-app`의 `agents`/`tools` 섹션은 직접 Tool Studio/AgentCore/Agent Detail 런타임을 렌더링하지 않고, 별도 앱 핸드오프 패널을 렌더링한다.
- Tauri command `open_agent_tool_desktop_app`를 추가해 workspace root의 `agent-tool-desktop-app/`를 `corepack pnpm --dir <path> start`로 실행한다.
- `agent-tool-desktop-app`는 제품 경계, handoff, owned surfaces, runtime gates, workflow lanes를 런타임 스냅샷과 UI로 표시한다.
- 테스트 계약은 직접 운영 패널 로드가 아니라 분리 앱 핸드오프와 tracker 중심 제품 경계를 검증하도록 변경됐다.

## 검증

- 통과: `corepack pnpm --filter workspace-monitor test`
- 통과: `corepack pnpm --filter workspace-monitor run check`
- 통과: `corepack pnpm --filter workspace-monitor run build`
- 통과: `corepack pnpm --filter platform-desktop-app run renderer:build`
- 통과: `cargo check` in `platform-desktop-app/src-tauri/`
- 통과: `corepack pnpm --dir agent-tool-desktop-app test`

## 남은 위험

- 공개 배포 가능 상태는 아직 아니다. 설치 프로그램, 서명, notarization, 업데이트/롤백, clean-machine smoke가 필요하다.
- legacy source인 `MonitorShell.tsx`와 `ToolStudioPanel.tsx`는 여전히 크다. 이번 slice는 런타임 결합을 끊었고, 완전 파일 이동/분리는 다음 구조 개선 slice가 맡아야 한다.
