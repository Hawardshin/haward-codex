# 데스크톱 릴리즈 Runbook과 원샷 명령 계획

## 작업 모드

- `governance`

## 근거와 선택

- Tauri 공식 배포 문서는 앱 빌드를 `tauri build` 경로로 설명한다.
- Tauri macOS signing/notarization 문서와 Apple 보안 문서는 공개 macOS 배포에서 signing/notarization gate가 별도임을 확인한다.
- Tauri updater 문서는 update artifact signature가 필요하다는 점을 확인한다.
- 로컬 구현은 이미 Tauri-first product shell이므로 새 배포 framework를 도입하지 않고 현재 pnpm/Tauri 경로를 원샷화한다.

## 구현 계획

- README를 한국어 기본으로 바꾸고 `README.ko.md`, `README.en.md`를 추가한다.
- `docs/release-runbook.ko.md`, `docs/release-runbook.en.md`를 추가한다.
- root `package.json`에 `desktop:setup:verify`, `desktop:verify`, `desktop:package:internal`, `desktop:release:report`를 추가한다.
- `platform-desktop-app/package.json`에 `verify`, `package:internal`, `deploy:public:report`, `pipeline:dry-run`을 추가한다.
- `scripts/desktop-pipeline.mjs`를 추가해 명령 순서를 코드로 관리한다.
- readiness/test가 문서와 script를 검증하게 한다.

## 검증 계획

- pipeline dry-run
- `desktop:verify`
- `desktop:release:report`
- `desktop:package:internal`
- artifact `codesign`/`hdiutil verify`
- `platform-desktop-app test`
- `platform-desktop-app run check`
- omission/evaluation/diff check
