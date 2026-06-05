# 요구사항: Workbench lazy boundary 확장

## 사용자 요구

사용자는 탭 전환이 아직 느리고, 데스크톱 앱이므로 메모리와 OS 자원을 적극 활용해 근본적인 성능 구조를 개선하라고 요청했다. 이전 resident/prewarm 및 Tool Studio 분리 이후 남은 Shell-local heavy panels도 계속 분리해야 한다.

## 기능 요구사항

- `DesktopRuntimePanel`, home feature panels, Agents detail/build panels처럼 탭 진입 때 큰 비용을 만드는 workbench UI는 `MonitorShell.tsx` runtime static import에서 제거한다.
- lazy 분리된 panel은 `next/dynamic` top-level boundary와 명시적 props type export를 가져야 한다.
- startup/idle prewarm은 heavy imports를 한 번에 몰아 실행하지 않고 순차적으로 분산해야 한다.
- 버튼 반응성 측정은 실제 click feedback과 synthetic press feedback을 모두 안정적으로 측정해야 한다.
- readiness/check/test 계약은 새 lazy panel source 위치를 인식해야 한다.

## 비기능 요구사항

- resident/mounted panel cap 5를 유지한다.
- 기존 source editor state, terminal drawer, provider/runtime command 연결은 유지한다.
- customer snapshot과 내부 패키징 산출물은 build 후 customer-safe 상태여야 한다.
- 구현 후 `check`, `test`, renderer build, performance audits, Tauri internal package build를 자동으로 실행한다.

## 제외

- 공개 배포용 Developer ID signing, notarization, signed updater, clean-machine smoke는 기존 public release blocker로 유지한다.
- 전체 `MonitorShell.tsx` route-level 재작성은 다음 큰 migration 후보로 남긴다.
