# 요청-결과 추적: 실제 서비스 준비도 표면

## 요청

- ID: `UR-2026-06-03-012`
- 요약: 실제 서비스라고 하기엔 부족한 부분을 찾아 자세히 개선.
- 소유 프로젝트: `platform-desktop-app/`, 공유 의존 `workspace-monitor/`

## 결과

- 서비스 준비도 registry를 추가했다.
- CLI service readiness 검사와 public report 명령을 추가했다.
- Tauri `get_service_readiness_report` command를 추가했다.
- Workspace Monitor Desktop에 Service Readiness 패널을 추가했다.
- public blocker를 signed updater, Developer ID signing/notarization, clean-machine smoke, runtime workspace chooser enforcement로 명확히 노출했다.

## 산출물

- `platform-desktop-app/configs/service-readiness-registry.json`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/specs/2026-06-03-service-readiness/`

## 검증

- 최종 검증 결과는 `platform-desktop-app/specs/2026-06-03-service-readiness/validation.ko.md`와 `_history/evaluations/2026/2026-06-03-service-readiness-*`에 기록한다.
