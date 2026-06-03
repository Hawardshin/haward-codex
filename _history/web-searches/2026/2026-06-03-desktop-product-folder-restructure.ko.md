# 2026-06-03 데스크톱 제품 폴더 구조 재편 웹 검색 기록

## 목적

루트 웹 프로젝트를 설치형 데스크톱 제품의 renderer 소스로 이동할 때, Tauri/Electron 같은 데스크톱 앱 구조에서 frontend assets, app resources, app data boundary를 어떻게 다루는지 확인했다.

## 검색 쿼리

- `Tauri v2 frontendDist beforeDevCommand app data official docs`
- `Electron application distribution app user data directory official docs project structure`

## 확인한 출처

- Tauri official docs, Configuration Files: https://v2.tauri.app/develop/configuration-files/
- Tauri official docs, Configuration reference/build config: https://v2.tauri.app/reference/config/
- Electron official docs, Application Packaging: https://www.electronjs.org/docs/latest/tutorial/application-distribution
- Electron official docs, Distribution Overview: https://www.electronjs.org/docs/latest/tutorial/distribution-overview
- Electron official docs, `app` API/userData path: https://www.electronjs.org/docs/latest/api/app

## 반영한 판단

- Tauri는 production에서 `frontendDist`가 가리키는 frontend assets를 앱에 포함한다. 따라서 제품 renderer source/build output은 `platform-desktop-app`의 release gate 안에 있어야 한다.
- Electron도 app resources와 per-user app data를 분리한다. 이 구조 원칙은 설치 앱이 source tree, runtime data, generated customer payload를 같은 폴더처럼 취급하지 않아야 한다는 현재 정책과 맞다.
- 루트 `workspace-monitor/`를 독립 프로젝트로 유지하면 제품 host runtime이 UI authority를 소유한다는 요구와 충돌한다. 새 source of truth는 `platform-desktop-app/renderer/workspace-monitor/`다.

## 약한 출처

- Reddit/Stack Overflow/비공식 PDF는 검색 결과에 있었지만 이번 구조 결정의 근거로 사용하지 않았다.

## 불확실성

- public distribution readiness는 이번 폴더 구조와 별개다. signing, notarization/code signing, updater, clean-machine smoke는 계속 별도 release gate로 남는다.
