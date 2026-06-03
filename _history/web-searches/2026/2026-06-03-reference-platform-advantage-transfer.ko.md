# Web Search Record: Reference Platform Advantage Transfer

- 날짜: 2026-06-03
- 요청: 유사 데스크톱 에이전트 플랫폼을 깊게 조사하고 각 장점을 현재 플랫폼에 반영.

## Queries

- `AI coding agent desktop app IDE Cursor Windsurf GitHub Copilot Workspace Claude Code Devin OpenHands open source agent IDE 2026`
- `open source AI agent IDE desktop app VS Code fork Continue Cline Aider OpenHands SWE-agent architecture`
- `desktop developer workbench multi terminal task orchestration app Warp terminal Raycast Docker Desktop GitHub Desktop Linear desktop UX architecture`
- `Cursor docs Agent mode background agents rules memories MCP official`
- `Windsurf docs Cascade memories rules MCP official`
- `OpenHands open source AI software development agent official docs GitHub`
- `VS Code workbench layout activity bar side bar panel terminal official docs`
- `JetBrains IntelliJ UI tool windows settings dialogs official docs`
- `Tauri sidecar updater code signing official docs desktop app architecture`
- `AI coding agent IDE security risks prompt injection tool execution official GitHub Copilot risks mitigations`
- `MCP security risks prompt injection tool execution official Anthropic Model Context Protocol security`
- `Docker Desktop dashboard integrated terminal extensions official docs`
- `GitHub Desktop official docs branches changes history pull requests`
- `Raycast official docs extensions command palette AI tools`

## Checked Sources

- VS Code UI: https://code.visualstudio.com/docs/editing/userinterface
- IntelliJ UI: https://plugins.jetbrains.com/docs/intellij/ui-overview.html
- GitHub Copilot cloud agent: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
- GitHub Copilot risks: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations
- Claude Code overview/subagents/hooks/MCP: https://code.claude.com/docs/en/overview, https://code.claude.com/docs/en/sub-agents, https://code.claude.com/docs/en/hooks, https://code.claude.com/docs/en/mcp
- OpenHands key features/SDK/hooks: https://docs.openhands.dev/openhands/usage/key-features, https://docs.openhands.dev/sdk, https://docs.openhands.dev/openhands/usage/customization/hooks
- Cline overview: https://docs.cline.bot/cline-overview
- Devin Desktop Cascade memories/rules: https://docs.devin.ai/desktop/cascade/memories
- Continue docs: https://docs.continue.dev/
- Aider docs: https://aider.chat/docs/
- OpenCode docs: https://opencode.ai/docs/
- Tauri sidecar/distribution: https://v2.tauri.app/develop/sidecar/, https://v2.tauri.app/distribute/
- OWASP LLM01: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- MCP security: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
- Docker Desktop: https://docs.docker.com/desktop/
- GitHub Desktop: https://docs.github.com/desktop
- Raycast extensions: https://manual.raycast.com/extensions

## Weak Sources Ignored Or Downgraded

- Cursor docs direct open returned redirect/empty body, so search cache was used and reliability was marked medium.
- Reddit/community posts were treated only as friction/adoption signals, not factual proof.
- Informal comparison PDFs/blogs were not used as primary implementation evidence.

## Plan Impact

- Created `platform-desktop-app/configs/reference-platform-advantage-registry.json`.
- Added `referencePlatformAdvantages` to Workspace Monitor snapshot.
- Added Overview `레퍼런스 장점 적용 지도`.
- Added readiness/test guards for registry, collector, and UI.

## Uncertainty

- Cursor background agent docs should be re-checked if direct docs access becomes available.
- Open-source engine installation was not performed; separate license/security/dependency audit is required before bundling.
