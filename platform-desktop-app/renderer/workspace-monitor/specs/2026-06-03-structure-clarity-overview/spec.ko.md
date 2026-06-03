# 스펙: 구조 명료화 Overview

## 목적

Workspace Monitor의 Structure 화면은 폴더 목록을 나열하기 전에 플랫폼의 실제 운영 계층과 소유 경계를 먼저 보여줘야 한다. 사용자는 `_ops`, `_history`, `agent-platform`, `platform-desktop-app`, `workspace-monitor`, domain projects, runtime/local data가 무엇을 소유하는지 한 화면에서 판단할 수 있어야 한다.

## 범위

- snapshot에 `structureOverview`를 추가한다.
- `structureOverview`는 계층, boundary rule, source hotspot, pressure point를 포함한다.
- Structure 탭은 Architecture Backbone, Pressure, Boundary Rules를 루트 폴더 표보다 먼저 보여준다.
- Overview에도 압축된 Architecture Backbone을 노출해 첫 화면에서 구조를 볼 수 있게 한다.
- customer snapshot은 내부 구조 개요, 소스 hotspot, pressure point를 비운다.

## 비목표

- 루트 폴더나 durable path를 대규모로 이동하지 않는다.
- `MonitorShell.tsx`와 Tauri `lib.rs` 전체 모듈 분리는 이번 slice에서 하지 않는다.
- client-side 구조 표시를 보안 경계로 취급하지 않는다.

## 수용 기준

- `snapshot.structureOverview.summary.totalPlanes`가 developer snapshot에서 0보다 크다.
- Structure 탭에 Architecture Backbone, 복잡도 압력점, Boundary Rules가 렌더링된다.
- customer snapshot의 `structureOverview`는 비어 있다.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, `npm run check:intent-map`, `npm run check:intent-map:customer`가 통과한다.
