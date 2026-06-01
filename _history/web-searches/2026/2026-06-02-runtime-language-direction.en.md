# Runtime Language Direction Web Search Record

## Request

The user asked to find a good direction for efficient languages such as Rust and Go when building the platform and installable software.

## Queries

- `Rust official website performance safety productivity systems programming`
- `Go official documentation why Go fast reliable efficient software`
- `Tauri official documentation Rust desktop app security bundle size`
- `Wails official documentation Go desktop apps`
- `Electron official documentation process model desktop app security performance`
- `Python official documentation extending embedding C API performance packages`
- `Go at Google language design in the service of software engineering official paper`
- `Go official documentation pprof profile guided optimization PGO`

## Sources Checked

- Rust official site and Rust Book concurrency chapter
- Go official docs, Go PGO docs, and Go at Google
- Tauri official start/distribution docs
- Wails official introduction docs
- Electron official process/performance docs
- Python official Extending/Embedding docs

## Plan Impact

- Keep Python as the default agent/research/evaluation layer.
- Keep TypeScript/Next.js as the monitor/dashboard/web UI default.
- Treat Rust/Tauri as the first candidate for desktop shell/native command boundary/stable hot paths.
- Treat Go as the first candidate for local daemons/file watchers/operational CLIs.
- Treat Electron as fallback when JavaScript desktop ecosystem depth matters more.
- Move to Rust or Go only with measured bottlenecks, prototype measurements, release gates, and rollback plans.

## Weak Sources Ignored

- Reddit, individual blogs, and GitHub star counts were treated only as adoption or problem signals, not direct proof for this policy.

## Remaining Uncertainty

- Actual desktop prototypes or local services still need local measurements.
- Wails is a Go desktop shell candidate, but its release gates and ecosystem fit must be validated separately against Tauri.
