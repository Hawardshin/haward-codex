# 제품 Workbench 대공사 스펙

## 목표

- 설치형 데스크톱 앱을 웹 대시보드가 아니라 agent-building workbench로 재구성한다.
- 사용자는 첫 화면에서 `파일 가져오기`, `에이전트 만들기`, `작업 실행`, `학습/개선` 중 하나를 고르고, 각 기능 안에서 필요한 세부 기능만 보아야 한다.
- 운영자용 경로, payload, runtime root, audit path 같은 정보는 기본 사용자 흐름에서 숨기고, 필요할 때만 disclosure 또는 Operator Center에서 확인한다.
- `MonitorShell.tsx`와 `globals.css`에 누적된 UI 책임을 기능 모듈, surface component, registry data, adapter hook으로 분리한다.

## 범위

- Overview main workbench, workspace explorer, runtime terminal, agent factory, learning loop, data/operator surfaces를 기능 단위로 재배치한다.
- Tauri command 호출과 renderer state는 기존 기능을 유지하면서 slice별로 typed adapter/hook으로 이동한다.
- readiness/test/browser smoke는 각 slice가 다시 dashboard 형태로 후퇴하지 않도록 핵심 token과 DOM 구조를 검증한다.
- 고객용 static snapshot은 source payload를 싣지 않는 기존 경계를 유지한다.

## 비범위

- 이 slice에서 VS Code OSS/Theia 전체를 즉시 임베드하지 않는다. 별도 dependency, license, security, bundle-size audit가 필요하다.
- 이 slice에서 public signing/notarization/updater/clean-machine gate 완료를 주장하지 않는다.
- 이 slice에서 모든 runtime command를 한 번에 재작성하지 않는다. UI 모듈화 이후 adapter 단위로 이동한다.

## 수용 기준

- 대공사는 slice 목록, touch paths, dependency, verification gate가 있는 decomposition packet으로 관리된다.
- 첫 구현 slice는 `MonitorShell.tsx`에서 하나 이상의 사용자-facing surface 책임을 별도 component/config로 분리한다.
- 첫 구현 slice 후 `workspace-monitor check`, `workspace-monitor test`, `workspace-monitor build:customer`, `platform-desktop-app test`, `platform-desktop-app check`, `git diff --check`, Browser smoke가 통과한다.
- path/raw runtime details는 기본 user-facing flow에 직접 노출하지 않고 disclosure 또는 operator surface로만 노출한다.
