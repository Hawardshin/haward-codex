# 지연 개선 목록

## 목적

빠른 작업이나 `ship_first` 모드에서 지금 당장 막지는 않지만 나중에 정리해야 하는 개선을 잊지 않기 위해 관리한다.

## 상태

| ID | 상태 | 소유 범위 | 개선 내용 | 미룬 이유 | 다시 볼 조건 | 관련 산출물 |
| --- | --- | --- | --- | --- | --- | --- |
| DI-2026-05-31-001 | open | `_ops`, `agent-platform` | 며칠간 실제 작업에서 `quick`/`ship_first` 모드가 너무 느슨하거나 너무 엄격한지 사례를 모아 모드 기준을 보정한다. | 모드 체계가 오늘 도입되어 실제 사용 데이터가 아직 없다. | 3개 이상의 작업에서 모드 선택 기록이 쌓였거나 evaluator gap이 반복될 때 | `agent-platform/configs/workflows/work-mode-registry.json`, `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |
| DI-2026-06-01-001 | open | `workspace-monitor`, `agent-platform` | `reconcile-spec` 산출물에서 열린 `clarification_needed` 질문을 수집해 `workspace-monitor`에 답변 대기 패널로 보여준다. | 현재 요청은 알림 형식과 CLI/운영 규칙 구축이 핵심이며, UI 수집 패널은 별도 기능 범위다. | 여러 프로젝트에서 `clarification_needed` 결과 파일이 쌓이거나 사용자가 대시보드에서 질문을 보고 답하고 싶다고 요청할 때 | `agent-platform/src/agent_platform/planning/spec_reconciliation.py`, `workspace-monitor/` |
| DI-2026-06-03-001 | open | `platform-desktop-app` | local/internal Tauri build 다음 단계로 clean macOS account smoke, Windows msi/nsis build lane, Monaco/xterm lazy-load 또는 bundle/audit surface 검토를 진행한다. | 이번 요청은 필수 설치와 Rust/Tauri local build/test 완료가 우선인 `ship_first` 작업이었다. | 내부 테스트 앱 흐름을 검증하거나 Windows 호스트를 사용할 수 있거나 Workspace Monitor bundle/audit surface가 다시 커질 때 | `_history/evaluations/2026/2026-06-03-platform-desktop-tauri-rust-build-evaluation-input.json`, `platform-desktop-app/configs/macos-execution-profile.json` |

## 사용 규칙

- 항목을 닫을 때는 관련 요구사항, 스펙, 평가 또는 작업 요약에 결과를 연결한다.
- `ship_first` 평가 입력의 `deferred_improvement_targets`에는 이 파일이나 프로젝트별 동등 파일을 넣는다.
