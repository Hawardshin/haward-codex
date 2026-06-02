# 계획 기록: 구조 명료화 Overview

## 목표

전체 구조가 조잡하고 복잡해 보인다는 문제를 줄이기 위해, Workspace Monitor가 플랫폼의 운영 계층, 소유 경계, 주요 경로, 금지 경계, 복잡도 압력점을 먼저 보여주게 한다.

## Large Scope Decomposition Packet

- objective: 구조 이해 가능성 개선
- work_mode: `governance`
- trigger_conditions: `broad_language`, `large_file_set`, `context_pressure`, `unknown_blast_radius`
- source_inventory:
  - root 프로젝트: 5개 active project
  - 큰 source surface: `MonitorShell.tsx`, `globals.css`, Tauri `lib.rs`, collector script
  - generated/vendor/local exclusions: `_private/`, `outputs/`, `node_modules/`, `.next/`, `out/`, `target/`, generated snapshots
- representative_samples:
  - `_ops/projects/registry.json`
  - `workspace-monitor/scripts/collect-workspace.mjs`
  - `workspace-monitor/lib/snapshot.ts`
  - `workspace-monitor/components/MonitorShell.tsx`
  - `workspace-monitor/app/globals.css`
  - `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- slices:
  - S1: `structureOverview` snapshot contract
  - S2: Overview/Structure UI 재배치
  - S3: requirements/spec/history/evaluation 기록
- merge_gate: snapshot developer/customer sanitization, TypeScript check, Node tests, Next build, customer bundle audit
- deferred_work:
  - `MonitorShell.tsx` feature-panel module split
  - Tauri `lib.rs` Rust module split
  - Playwright screenshot smoke dependency 추가 여부 검토

## 결정

대규모 폴더 이동은 하지 않았다. 현재 문제의 첫 원인은 물리적 위치보다 사용자가 구조를 읽는 첫 화면과 source hotspot visibility가 약한 데 있다고 판단했다.
