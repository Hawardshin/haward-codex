# 스펙: 실제 서비스 준비도 표면

## 목적

기능이 있어도 실제 서비스라고 부르려면 운영자가 출시/지원/업데이트/개인정보 위험을 앱 안에서 볼 수 있어야 한다. 이번 개선은 internal build는 계속 개발 가능하게 유지하면서, public service release blocker를 숨기지 않고 기계적으로 보고하는 서비스 준비도 표면을 추가한다.

## 기능 범위

- `platform-desktop-app/configs/service-readiness-registry.json`를 추가한다.
- `scripts/check-service-readiness.mjs`는 internal/public 모드에서 서비스 준비도 score, group status, blocker, warning, next action을 보고한다.
- `package.json`은 `service:readiness`, `service:readiness:public:report`를 제공하고 기본 `check`에 internal service readiness를 포함한다.
- Tauri는 `get_service_readiness_report` command를 제공한다.
- Workspace Monitor Desktop은 `Service Readiness` 패널에서 도메인 chip, score, public blockers, group checks, next actions를 표시한다.

## 비목표

- Developer ID 인증서 발급, notarization secret 저장, updater endpoint 운영은 이번 slice에서 수행하지 않는다.
- public release ready라고 주장하지 않는다.
- 고객 workspace chooser의 영구 저장까지 구현하지 않는다. 해당 항목은 public blocker로 노출한다.

## 수용 기준

- internal readiness는 blocker 없이 통과하되 public blockers를 보고한다.
- public readiness report는 signing/notarization, signed updater, clean-machine smoke, runtime workspace chooser blocker를 표시한다.
- Desktop UI는 Service Readiness, Public blockers, Signed Distribution, Update & Recovery를 표시한다.
- Node/TypeScript/Rust/Tauri 검증이 통과한다.
