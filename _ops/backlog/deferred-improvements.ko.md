# 지연 개선 목록

## 목적

빠른 작업이나 `ship_first` 모드에서 지금 당장 막지는 않지만 나중에 정리해야 하는 개선을 잊지 않기 위해 관리한다.

## 상태

| ID | 상태 | 소유 범위 | 개선 내용 | 미룬 이유 | 다시 볼 조건 | 관련 산출물 |
| --- | --- | --- | --- | --- | --- | --- |
| DI-2026-05-31-001 | completed | `_ops`, `agent-platform` | 실제 mode-selection 기록 219개를 검토해 `quick`/`ship_first` 기준 보정 필요성을 판단했다. 반복 evaluator gap은 확인되지 않아 registry 변경 없이 종료한다. | 실제 사용 데이터가 충분히 쌓일 때까지 보류했었다. | 완료: `_history/mode-selections/2026/`에 219개 기록 확인 | `_history/mode-selections/2026/2026-06-08-work-mode-usage-tuning-review.ko.md` |
| DI-2026-06-01-001 | completed | `workspace-monitor`, `agent-platform` | `reconcile-spec` 산출물에서 열린 `clarification_needed` 질문을 수집해 `workspace-monitor` 홈 Decision Inbox의 답변 대기 패널로 보여준다. | 알림 형식과 CLI/운영 규칙 구축 이후 별도 UI 기능 범위로 남아 있었다. | 완료: collector, snapshot type, UI panel, tests 추가 | `platform-desktop-app/renderer/workspace-monitor/components/features/ClarificationQueuePanel.tsx`, `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs` |
| DI-2026-06-03-001 | blocked_external_gate | `platform-desktop-app` | clean macOS account smoke와 Windows msi/nsis build lane은 별도 OS/계정/서명 환경이 필요하다. Monaco/xterm은 이미 lazy/runtime 경계와 audit surface가 있으므로 공개 배포 전 외부 gate로 추적한다. | 로컬 구현만으로 public distribution readiness를 검증할 수 없다. | Developer ID/notarization credential, Windows host, clean-machine test account가 준비될 때 | `_history/evaluations/2026/2026-06-08-deferred-implementation-closure.ko.md`, `platform-desktop-app/configs/macos-execution-profile.json` |

## 사용 규칙

- 항목을 닫을 때는 관련 요구사항, 스펙, 평가 또는 작업 요약에 결과를 연결한다.
- `ship_first` 평가 입력의 `deferred_improvement_targets`에는 이 파일이나 프로젝트별 동등 파일을 넣는다.
