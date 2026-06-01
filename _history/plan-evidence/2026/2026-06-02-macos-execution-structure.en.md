# macOS Execution Structure Plan Evidence

| Plan Decision | Evidence | Artifact |
| --- | --- | --- |
| Split execution into three levels. | Local prototypes and public Gatekeeper-friendly distribution have different trust/signing requirements. | `macos-execution-profile.json` `execution_levels` |
| Keep Tauri-first. | The existing UI is Next.js, and Tauri official docs provide App Bundle, DMG, signing, and notarization paths. | `desktop-distribution-registry.json`, packaging docs |
| Keep Python agent layer behind a sidecar/local service/command boundary. | `agent-platform` is Python-first, while the desktop shell should own native window and entry-point concerns. | `process_model`, `runtime_boundaries` |
| Treat optional CLIs as capability-level degradation. | The platform is not a single CLI wrapper, and the CLI adapter registry assumes optional capabilities. | `runtime_boundaries`, smoke tests |
| Do not claim public macOS readiness without signing/notarization/stapling/smoke tests. | Apple/Xcode/Tauri official docs point to signing, hardened runtime, notarization, and launch testing. | Release gates |

