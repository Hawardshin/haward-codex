# Resource Check: Storage Architecture Review

작성일: 2026-06-06

## Resource Risk

`resource_risk_occurred=false` for this documentation/config change. No long-running daemon, process supervisor, database connection, worker, file watcher, or server was added.

## Future DB Resource Requirements

- SQLite connections must be opened through a bounded runtime-owned pool or command boundary.
- Migrations must be idempotent.
- Corrupt or missing DB must degrade to rebuild/fallback, not crash.
- Large logs should remain file artifacts; DB should store metadata and bounded previews.
- Retention and cleanup must be user-visible for telemetry and raw CLI IO.
