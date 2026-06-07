# Web Search: 미뤄둔 구현 큐 폐쇄

- 날짜: 2026-06-08
- 목적: Git 분리, Electron shell 보안, dependency lock, public release gate 기준 확인

## 확인한 공식 자료

- Git Book, Submodules: https://git-scm.com/book/en/v2/Git-Tools-Submodules
- Electron Security Tutorial: https://www.electronjs.org/docs/latest/tutorial/security
- npm package-lock.json docs: https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/
- Tauri signing guide: https://v2.tauri.app/distribute/sign/

## 계획 영향

- root workspace는 submodule gitlink로 project repository를 추적하고, project 변경은 각 child repository에서 commit/push한다.
- Electron shell은 `contextIsolation`, `nodeIntegration: false`, `sandbox`를 기본 보안 경계로 둔다.
- 설치된 Electron은 `package-lock.json`과 `npm audit`로 재현성과 기본 취약점 검사를 남긴다.
- public release signing/notarization은 구현 완료가 아니라 외부 release credential gate로 분리한다.

## 불확실성

- public macOS 배포 readiness는 실제 Developer ID certificate, notarization credential, update signing key가 없으면 검증할 수 없다.
- CLI adapter별 실제 실행 가능성은 사용자의 로컬 설치 상태와 권한에 따라 capability_missing으로 degrade해야 한다.
