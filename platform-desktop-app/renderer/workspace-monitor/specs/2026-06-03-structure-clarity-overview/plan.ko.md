# 계획: 구조 명료화 Overview

## 모드

- work_mode: `governance`
- 이유: 플랫폼 구조와 화면 정보 구조를 바꾸는 durable 변경이다.

## Large Scope Decomposition

- trigger_conditions: `broad_language`, `large_file_set`, `context_pressure`, `unknown_blast_radius`
- source_inventory: root project registry, Workspace Monitor collector/UI, README/requirements, large source file counts
- exclusions: `_private/`, `node_modules/`, `.next/`, `out/`, Rust `target/`, generated output은 reasoning source가 아니라 verification output으로 취급
- representative_samples:
  - `workspace-monitor/scripts/collect-workspace.mjs`
  - `workspace-monitor/components/MonitorShell.tsx`
  - `workspace-monitor/lib/snapshot.ts`
  - `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
  - `_ops/projects/registry.json`

## Slices

| slice_id | 범위 | touch_paths | 검증 |
| --- | --- | --- | --- |
| S1 | 구조 개요 snapshot 모델 | `workspace-monitor/lib/`, `workspace-monitor/scripts/`, `workspace-monitor/tests/` | `npm test`, `npm run check` |
| S2 | Structure/Overview UI 재배치 | `workspace-monitor/components/`, `workspace-monitor/app/globals.css` | `npm run check`, `npm run build`, screenshot smoke |
| S3 | 요구사항/spec/history/evaluation 기록 | `workspace-monitor/docs/requirements/`, `workspace-monitor/specs/`, `_history/` | omission/evaluate-work |

## 결정

- 이번 slice에서는 대규모 폴더 이동이나 소스 모듈 분리를 하지 않는다.
- 사용자 가시성 개선을 먼저 하고, source hotspot은 향후 리팩토링 후보로 명시한다.
