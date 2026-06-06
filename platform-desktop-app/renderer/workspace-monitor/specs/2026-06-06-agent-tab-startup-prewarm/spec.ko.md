# Agent 탭 시작 선로딩 Spec

## 목표

시작 로딩 시간을 의도적으로 더 사용해 모든 주요 탭을 먼저 resident/mounted 상태로 만들고, Agent 탭 첫 진입 지연을 줄인다.

## 범위

- `SnapshotLoader` lightweight bootstrap 분리
- heavy `MonitorShell` dynamic boundary 분리
- 12개 section startup resident set
- shell 내부 2.6초 warmup overlay
- dev/prod Next config 분리
- section latency audit 예산 현실화

## 제외

- Agent 3D scene 자체 로직 교체
- Tauri Rust command 변경
- 추가 dependency 설치
