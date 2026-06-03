# Installer Shell Runtime Contract

## 결정

`platform-desktop-app/`의 중심 목적은 설치 프로그램과 설치된 데스크톱 앱 shell/runtime을 만드는 것이다. 이 shell은 이 저장소를 느슨한 문서 묶음으로 해석하지 않고, 번들된 `runtime-contracts/installer-shell-runtime-contract.json`을 먼저 읽은 뒤 작업을 시작한다.

## 구조

- `runtime-contracts/installer-shell-runtime-contract.json`: 설치 shell이 읽는 source of truth. required read targets, enforcement gates, data accumulation targets를 정의한다.
- `runtime-contracts/installer-shell-bootstrap.ko.md`: shell bootstrap 순서를 사람이 읽는 형태로 설명한다.
- `scripts/check-runtime-contract.mjs`: 계약 파일, Tauri resource mapping, Rust command, 필수 gate, 데이터 축적 대상이 빠지지 않았는지 검사한다.
- `src-tauri/tauri.conf.json`: runtime contract와 bootstrap 문서를 app resource로 번들한다.
- `src-tauri/src/lib.rs`: `get_installer_shell_runtime_contract` command로 bundle resource 또는 개발 repo 경로에서 계약을 읽는다.

## 실행 원칙

설치 앱이 직접 띄우는 shell/runtime은 platform-first host다. Codex CLI, Claude Code CLI, Gemini CLI, OpenCode 같은 외부 도구는 guest adapter lane이며, 누락되면 `capability_missing`으로 degrade한다. task state, decision inbox, evidence, validation, evaluation, UI authority는 플랫폼이 소유한다.

## 데이터 축적

작업 결과는 shell output으로만 남기지 않는다. 사용자 요청, request trace, decision inbox, task run store, structured evidence, validation/evaluation, work timing, support diagnostic bundle로 구조화해 축적한다. 각 기록은 provenance와 retention/visibility boundary를 가져야 한다.

## 배포 경계

계약은 Tauri resource로 번들되지만 `_private/`, `outputs/`, `.git/`, 개발 source tree 전체는 번들 대상이 아니다. public-ready 주장은 signing, updater, clean-machine smoke, privacy/dependency review가 끝난 뒤에만 가능하다.
