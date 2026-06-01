# macOS 실행 구조 계획 근거

| 계획 결정 | 근거 | 산출물 |
| --- | --- | --- |
| 실행 단계를 세 단계로 나눈다. | local prototype과 public Gatekeeper-friendly distribution은 신뢰/서명 요구가 다르다. | `macos-execution-profile.json` `execution_levels` |
| Tauri-first를 유지한다. | 기존 UI가 Next.js이고 Tauri 공식 문서가 App Bundle/DMG/signing/notarization 경로를 제공한다. | `desktop-distribution-registry.json`, packaging docs |
| Python agent layer는 sidecar/local service/command boundary 뒤에 둔다. | agent-platform은 Python-first이고 desktop shell은 native window/entry point를 담당해야 유지보수 경계가 분명하다. | `process_model`, `runtime_boundaries` |
| optional CLI는 capability-level degrade로 처리한다. | 플랫폼은 특정 CLI wrapper가 아니며 CLI adapter registry가 optional capability를 전제로 한다. | `runtime_boundaries`, smoke tests |
| public macOS ready는 signing/notarization/stapling/smoke test 없이는 주장하지 않는다. | Apple/Xcode/Tauri 공식 문서가 signing, hardened runtime, notarization, launch test를 안내한다. | release gates |

