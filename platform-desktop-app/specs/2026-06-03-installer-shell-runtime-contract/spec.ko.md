# 스펙: Installer Shell Runtime Contract

## 목적

`platform-desktop-app/`의 전체 구조를 설치 프로그램과 설치 앱 shell/runtime 중심으로 재정렬한다. 설치 앱이 직접 띄운 shell은 이 저장소의 기능, 사용법, 정책을 흩어진 문서로 추측하지 않고, 번들된 runtime contract를 읽어 실행 게이트와 데이터 축적을 강제해야 한다.

## 범위

- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/runtime-contracts/installer-shell-bootstrap.*.md`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- Tauri bundle resource mapping
- Tauri command `get_installer_shell_runtime_contract`
- README, architecture docs, requirements, readiness/test

## 요구사항

- runtime contract는 self-documenting config 구조를 갖춰야 한다.
- runtime contract는 required read targets, denied read targets, shell boot sequence, enforcement gates, data accumulation targets를 포함해야 한다.
- Tauri bundle은 runtime contract와 bootstrap docs를 resource로 포함해야 한다.
- Rust backend는 bundle resource 또는 개발 repo 경로에서 runtime contract를 읽는 command를 제공해야 한다.
- default `platform-desktop-app check`는 runtime contract validator를 먼저 실행해야 한다.
- 데이터 축적 대상은 user request, request trace, decision inbox, task run, source provenance, evaluation, work timing, support diagnostic을 포함해야 한다.

## 비범위

- 외부 shell sidecar 설치.
- plugin-shell capability 추가.
- public release signing/updater 구현.
- shared governance 폴더를 `platform-desktop-app/` 안으로 이동.

## 수용 기준

- `check-runtime-contract.mjs`가 `installer_shell_runtime_contract_ready`를 반환한다.
- `check-config-contract`가 runtime contract를 `self_documenting`으로 판정한다.
- `platform-desktop-app` test/check와 Rust check가 통과한다.
- omission/resource/work evaluation이 close-out gap 없이 통과한다.
