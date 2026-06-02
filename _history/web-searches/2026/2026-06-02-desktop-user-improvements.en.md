# Web Search Record: Desktop User Improvements

- Date: 2026-06-02
- Work: Find and implement user-side improvements for the installable multi-CLI desktop app
- Purpose: Select the next implementation slice by user value

## Queries

- `Tauri v2 command read write JSON file permissions official docs`
- `human in the loop AI agent decision inbox UX official docs LangGraph LangChain`
- `Tauri v2 capabilities permissions filesystem plugin official docs`
- `AI coding assistant desktop app user experience CLI orchestration decision inbox terminal editor`
- `Claude Code CLI install official docs`
- `Gemini CLI install official GitHub npm`
- `OpenAI Codex CLI install official GitHub`
- `OpenCode CLI install official docs`
- `OpenCode CLI install official docs opencode npm install`

## Checked Sources

- LangChain human-in-the-loop docs: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- Tauri scope/security docs: https://v2.tauri.app/security/scope/
- Tauri shell plugin docs: https://v2.tauri.app/plugin/shell/
- Claude Code setup docs: https://docs.claude.com/en/docs/claude-code/setup
- Gemini CLI repository/docs: https://github.com/google-gemini/gemini-cli
- OpenAI Codex CLI help: https://help.openai.com/en/articles/11096431
- OpenCode official CLI docs: https://opencode.ai/docs/cli/
- OpenCode CLI listing used as a secondary discovery signal: https://opencli.co/cli/opencode
- Competitor/reference signals: CodeSplash AI, Omni Code, Crest, Kata, Hariari, Friendly Terminal

## Weak Sources Ignored

- Unofficial install guides and blogs were treated only as package-name discovery signals.
- Reddit and marketing pages were treated only as feature-demand and UX-pattern signals, not factual proof.
- Security news was used as a risk signal for avoiding auto-install and showing official links plus verification commands.

## Plan Impact

- Do not auto-install CLIs. Show setup hints, verification commands, and official reference links in the UI.
- Reflect HITL approve/edit/reject patterns in decision answer types: `instruction`, `approve`, `edit`, and `reject`.
- Add session mode presets so users can choose task intent before launching a CLI session.
- Add Tauri commands and UI so returning users can inspect pending decisions and save answers.

## Uncertainty

- Latest install and auth flows vary by provider and user environment.
- This implementation provides setup guidance and PATH verification support, not installer execution.
