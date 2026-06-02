# 요청-결과 추적: 구조 명료화 Overview

## 요청

- 요약: 전체 구조가 조잡하고 복잡해서 알아보기 어렵다는 지적과, 구조를 제대로 만들라는 요청.
- 소유 프로젝트: `workspace-monitor/`
- 관련 프로젝트: `platform-desktop-app/`, `agent-platform/`, `_ops/`, `_history/`

## 결과

- `workspace-monitor` snapshot에 `structureOverview`를 추가했다.
- Structure 탭을 Architecture Backbone, Pressure, Boundary Rules, Root Inventory 순서로 재배치했다.
- Overview에도 압축된 Architecture Backbone 패널을 추가했다.
- source catalog에 `src-tauri`와 Rust `.rs`를 포함하고, `target/` 및 generated Tauri schema를 제외했다.
- customer snapshot에서는 내부 structure overview, pressure point, source hotspot이 제거됨을 확인했다.

## 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/specs/2026-06-03-structure-clarity-overview/`
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`

## 검증

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
