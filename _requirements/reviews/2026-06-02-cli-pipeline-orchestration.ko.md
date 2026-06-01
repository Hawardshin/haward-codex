# 요구사항 검토: CLI Pipeline Orchestration

- 검토일: 2026-06-02
- 요구사항: `REQ-WS-058`
- 상태: 승인

## 검토

사용자 요청은 기존 `REQ-WS-053` CLI adapter boundary의 확장이다. `REQ-WS-053`은 외부 CLI를 교체 가능한 adapter로 쓰는 원칙을 다루지만, 여러 CLI를 동시에 실행하고 pipe로 연결하는 실행 그래프, fan-in merge, cancellation, cleanup까지는 별도 계약으로 충분히 다루지 않는다.

## 수용 기준

| 항목 | 판정 | 메모 |
| --- | --- | --- |
| 기존 요구사항과 충돌 없음 | 통과 | adapter registry 위에 pipeline graph 계약을 추가한다. |
| 강제 가능성 | 통과 | `check-cli-pipeline`과 evaluator의 `cli_pipeline_targets` 조건부 gap으로 확인 가능하다. |
| 안전성 | 통과 | shell string 대신 argv/process graph, allowlist, timeout, output bound, cleanup을 요구한다. |
| 추적성 | 통과 | source provenance, plan evidence, verification, rollback을 pipeline input에 포함한다. |

## 결정

`REQ-WS-058`을 workspace/platform 공통 요구사항 기준선에 추가한다.
