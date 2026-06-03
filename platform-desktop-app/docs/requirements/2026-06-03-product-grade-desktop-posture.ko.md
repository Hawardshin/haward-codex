# 제품급 데스크톱 구조 요구사항

## 범위

`platform-desktop-app/`의 현재 방향을 초기 UI 후보나 PoC가 아니라 판매 가능한 설치형 데스크톱 제품 구조로 다루기 위한 요구사항이다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-PROD-001 | 선택된 데스크톱 제품 경로는 Tauri v2/Rust shell, `workspace-monitor` 제품 UI 원천, `agent-platform` Python layer 구조로 고정해야 한다. | must | desktop distribution registry, README |
| PDA-PROD-002 | `platform-desktop-app/`의 현재 제품 구조를 PoC, prototype, initial UI candidate, scaffold 후보로 표현하지 않아야 한다. | must | 정책/지속 지침/search check |
| PDA-PROD-003 | Electron, Wails, native packaging-only는 새 release blocker나 유지보수 근거가 기록될 때만 fallback/comparison route로 재평가해야 한다. | should | distribution registry |
| PDA-PROD-004 | readiness 스크립트 성공 상태는 제품 구조 준비와 public release gate를 분리해 표현해야 하며, dependency audit 후보나 public release candidate로 오해시키지 않아야 한다. | must | `check-readiness.mjs`, `check-service-readiness.mjs`, Tauri report |
| PDA-PROD-005 | 공개 배포 readiness는 signing, notarization, signed updater, clean-machine smoke test, privacy/dependency review가 끝나기 전까지 blocked 또는 gated로 남겨야 한다. | must | service readiness, release preflight |

## 비범위

- 공개 signing/notarization credential 생성
- 새 데스크톱 UI 구현
- Electron/Wails 재비교 실행
