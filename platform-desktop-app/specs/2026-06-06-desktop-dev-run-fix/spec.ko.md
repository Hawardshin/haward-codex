# 스펙: desktop dev/run fix

## 목표

README에 있는 desktop app 경로가 실제로 빌드와 실행까지 이어지도록 한다. 개발 실행과 내부 패키지 실행을 별도 명령으로 제공하고, public updater gate가 internal/dev 실행을 막지 않게 한다.

## 설계 결정

- `tauri.conf.json`의 `beforeDevCommand`는 `platform-desktop-app` cwd 기준 `renderer/workspace-monitor`를 사용한다.
- root `package.json`은 `desktop:dev`, `desktop:run:internal`, `desktop:package:run:internal`을 제공한다.
- `open-internal-app.mjs`는 macOS internal `.app` artifact를 열고, `--dry-run`/`--check`로 CI-safe 확인도 지원한다.
- Rust `run()`은 내장 config의 `plugins.updater`가 object일 때만 updater plugin을 등록한다.

## 제외

- public signing/notarization/updater credential 준비는 하지 않는다.
- Windows installer 실행 명령은 이번 macOS failure fix 범위 밖이다.

## 수용 기준

- dev 실행 smoke가 `GET / 200`까지 도달한다.
- internal app open dry-run이 artifact path를 반환한다.
- readiness tests와 doctor가 새 명령을 검사한다.
- internal package와 post-package smoke가 통과한다.
