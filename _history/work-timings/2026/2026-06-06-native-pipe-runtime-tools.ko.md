# Work Timing: Native Pipe Runtime Tools

| Phase | Approx Duration | Notes |
| --- | ---: | --- |
| Web-first intake and local context | 10m | 공식 docs/crate metadata, existing PTY/session code 확인 |
| Requirements/spec/install draft | 12m | 요구사항, spec, install audit draft 생성 |
| Dependency install | 2m | `cargo add os_pipe@1.2.3`, cargo tree 확인 |
| Implementation | 18m | `run_native_pipe_probe`, helpers, unit test |
| Debug/rework | 8m | Command builder FD retention으로 인한 timeout 수정 |
| Validation | 20m | Rust/frontend/check/package pipeline |
| Close-out records | 8m | evaluation, trace, summary, validation updates |

## Bottleneck

- pipe writer FD가 parent `Command` builder에 남아 consumer EOF를 막는 문제가 focused test에서 드러났다. spawn 직후 `drop(producer_command)`/`drop(consumer_command)`로 해결했다.
