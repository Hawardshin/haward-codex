# 설치 앱 Shell Bootstrap

## 목적

설치된 앱이 직접 띄우는 shell/runtime은 이 저장소의 지식과 규칙을 임의로 추측하지 않는다. 먼저 `installer-shell-runtime-contract.json`을 읽고, 그 계약에 따라 읽기 대상, 실행 게이트, 데이터 축적 위치를 확정한 뒤 작업을 시작한다.

## 부트 순서

1. `runtime-contracts/installer-shell-runtime-contract.json`을 읽는다.
2. `configs/runtime-data-boundary-registry.json`으로 앱 데이터, 로그, agent workspace, support bundle 위치를 확정한다.
3. workspace boundary와 sensitive boundary를 적용한다.
4. 작업 종류에 맞는 mode, view mode, install mode를 고른다.
5. 외부 CLI가 필요하면 CLI adapter registry를 읽고 누락 CLI는 `capability_missing`으로 처리한다.
6. task run, decision, evidence, validation, evaluation 기록을 구조화해 축적한다.
7. omission/resource/work evaluation gate를 통과하기 전까지 meaningful work를 완료로 취급하지 않는다.

## 금지

- `_private/`, `outputs/`, `.git/`을 기본 지식원으로 읽거나 번들하지 않는다.
- 외부 AI CLI를 플랫폼의 주 런타임으로 만들지 않는다.
- shell output만 남기고 task, decision, evidence, validation 기록을 생략하지 않는다.
- signing, updater, clean-machine smoke test 없이 public-ready로 부르지 않는다.
