# 런타임 데이터와 플랫폼 코드 경계

## 목적

이 플랫폼은 이 레포지토리 안에서 개발되지만, 최종 고객은 레포지토리 소스코드를 보는 방식으로 사용하지 않는다. 고객은 설치형 앱, 고객이 선택한 workspace, 앱이 관리하는 데이터 저장소, 로그 요약, export/import 표면을 사용한다.

소스 경계의 기준 파일은 `platform-desktop-app/configs/runtime-data-boundary-registry.json`이다.

## 핵심 경계

- 개발 레포지토리: 플랫폼 source, requirements, specs, docs, tests, generated developer snapshots를 관리한다.
- 설치 앱 bundle: compiled Rust/Tauri executable, static frontend assets, 승인된 bundled resources만 포함한다.
- 사용자 workspace: 고객이 선택한 프로젝트/작업 파일이며 플랫폼 source와 다르다.
- platform data store: task records, decision inbox state, structured evidence, settings metadata 같은 누적 데이터다.
- log store: runtime health, CLI IO, task execution, agent work, support diagnostic log로 분류한다.
- agent workspace: agent task input/output/log/handoff/temp work를 모으는 런타임 작업 영역이다.

## 제품 원칙

- 설치 고객에게 플랫폼 개발 레포지토리 source tree를 제품 기능으로 노출하지 않는다.
- source map, internal history, specs, unredacted logs는 public/support build에서 별도 승인 없이는 노출하지 않는다.
- 데이터 저장소와 로그는 source code가 아니라 runtime data plane이다.
- raw log를 장기 보존하거나 모델 입력으로 쓰기 전에 분류, provenance, redaction, retention을 거친다.
- agent definition은 `agent-platform/configs/agents/`에 두고, agent runtime work는 설치 앱의 agent workspace plane에 둔다.

## 구현 순서

1. runtime store schema를 먼저 정의한다.
2. OS-aware app data/log/cache directory adapter를 만든다.
3. task record, decision inbox, evidence, logs, agent work packet을 분리한다.
4. retention, redaction, support export를 구현한다.
5. installer payload audit로 source tree, `_private`, unredacted logs, private snapshots가 번들되지 않음을 확인한다.

## 현재 상태

- 이 레포는 아직 개발 레포지토리이며, 일부 generated snapshot과 history가 개발/검증 목적으로 tracked 상태다.
- Tauri local/internal build는 가능하지만 public distribution은 signing, notarization, privacy review, payload audit 전까지 준비 완료로 부르지 않는다.
- 다음 구현은 runtime data directory adapter와 installer payload audit 쪽으로 이어져야 한다.
