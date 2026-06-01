# Web Search Record: CLI Adapter Boundary

## Request

The user said the platform is installable but should be able to use many CLIs without becoming dependent on any one CLI. The platform should operate by using those CLIs on top.

## Queries

- `Python subprocess official documentation run external command security considerations`
- `Node.js child_process official documentation spawn exec external command`
- `Tauri shell plugin official documentation execute commands scope`
- `GitHub CLI extensions official documentation`
- `12 factor app backing services attached resources official`
- `ports and adapters architecture Alistair Cockburn official`

## Checked Sources

- Python subprocess: `https://docs.python.org/3/library/subprocess.html`
- Node.js child_process: `https://nodejs.org/api/child_process.html`
- Tauri command scopes: `https://v2.tauri.app/security/scope/`
- GitHub CLI extensions: `https://docs.github.com/github-cli/github-cli/using-github-cli-extensions`
- Twelve-Factor App backing services: `https://www.12factor.net/backing-services`
- Alistair Cockburn hexagonal architecture: `https://alistair.cockburn.us/hexagonal-architecture`

## Weak Sources Ignored

- General blog posts about `spawn`/`exec` were unnecessary because official docs covered the implementation boundary.
- Reddit and Stack Overflow discussions were treated only as secondary signals because this task defined operating boundaries rather than implementing code.

## Plan Impact

- CLI invocation should have argv-style execution, timeout, cwd, env allowlist, and stdout/stderr handling contracts instead of raw shell strings.
- Desktop-originated local command execution needs command/path permission scopes.
- External CLIs should be treated as replaceable adapter capabilities using ports-and-adapters framing, not platform internals.
- Missing CLIs should degrade as `capability_missing`, not whole-platform failure.

## Uncertainty

- This task designs the boundary; it does not implement a runner.
- Concrete adapters still need fresh official docs and installation/auth/update checks for each CLI.
