# Web Search: deferred queue final closure

- 날짜: 2026-06-08

## 확인한 공식 기준

- Git submodules: https://git-scm.com/book/en/v2/Git-Tools-Submodules
- Electron security checklist: https://www.electronjs.org/docs/latest/tutorial/security
- Tauri code signing/distribution: https://v2.tauri.app/distribute/sign/

## 계획 영향

- Git으로 분리된 project는 root에서 submodule/gitlink로 추적한다.
- Electron shell은 context isolation, sandbox, Node integration 제한을 유지한다.
- public macOS/Windows release readiness는 signing/notarization/OS host가 없는 로컬 구현에서 완료로 주장하지 않는다.
