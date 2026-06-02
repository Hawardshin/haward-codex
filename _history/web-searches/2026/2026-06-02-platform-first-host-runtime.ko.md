# Platform-First Host Runtime Web Search

- 날짜: 2026-06-02
- 요청 요약: 플랫폼이 먼저 실행되고 Codex/Gemini CLI/Claude Code CLI 같은 도구를 그 위에 올리는 구조로 전환해 달라는 요청.
- 작업 모드 영향: `governance`

## Queries

- `Tauri v2 sidecar command plugin process official docs`
- `Tauri v2 shell plugin sidecar official docs`
- `Claude Code CLI official docs setup`
- `Google Gemini CLI official GitHub`

## Checked Sources

- Tauri Shell plugin: `https://v2.tauri.app/plugin/shell/`
- Tauri sidecar / external binaries: `https://v2.tauri.app/develop/sidecar/`
- Claude Code CLI docs: `https://code.claude.com/docs/en/cli-usage`
- Google Gemini CLI official repository: `https://github.com/google-gemini/gemini-cli`

## Plan Impact

- Tauri shell/sidecar 문서는 플랫폼이 로컬 명령이나 sidecar를 실행할 수 있더라도 명시적 권한 경계와 lifecycle이 필요하다는 근거로 사용했다.
- Claude Code/Gemini CLI는 제품 host가 아니라 플랫폼 위의 guest adapter target으로 유지한다.
- CLI 누락/인증/버전 문제는 플랫폼 실패가 아니라 해당 adapter lane의 `capability_missing` 또는 setup-later 상태로 처리해야 한다.

## Uncertainty

- 실제 public-ready Tauri packaging, signing, notarization, sidecar bundling은 Rust/Tauri 설치 감사와 OS별 smoke 이후에만 주장할 수 있다.
