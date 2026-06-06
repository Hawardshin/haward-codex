# Parallel Snapshot Collector 요구사항

작성일: 2026-06-06
소유 프로젝트: `platform-desktop-app`

## 사용자 요구

병렬 구조, 멀티스레드, 멀티프로세스로 속도를 늘릴 수 있는 방법을 고려하라는 요청이 있었다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PSC-001 | 독립적인 Workspace Monitor 문서 변환 작업은 bounded worker thread pool로 처리해야 한다. | must | `collect`, `test` |
| REQ-PSC-002 | source preview는 읽기 전 후보를 정렬/상한 적용하고, 선택된 후보만 worker pool로 읽어야 한다. | must | collector test |
| REQ-PSC-003 | worker 실패 또는 작은 작업에서는 기존 동기 경로로 fallback해야 한다. | must | source contract test |
| REQ-PSC-004 | generated snapshot은 실제 worker 수를 stats로 노출해야 한다. | should | snapshot stats |
| REQ-PSC-005 | Rust/Tauri 병렬 구조는 중복 구현보다 기존 Rayon/background warmup 구조를 유지하고 관측한다. | should | package verification |

## 비범위

- UI render thread 자체를 강제로 멀티스레드화하지 않는다.
- permission, install, destructive command가 있는 multi-process runner는 별도 승인 gate 없이 자동화하지 않는다.
