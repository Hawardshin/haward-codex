# 2026-06-07 Task Run Store panel split 리소스 점검

## 리소스 영향

- 새 long-running process, subscription, timer, worker, stream 없음.
- Task Run Store UI를 props 기반 컴포넌트로 이동했으며, 기존 refresh/load/prune command 호출은 상위 상태 관리에 그대로 남겼다.

## 검증

- workspace monitor check/test 통과.
- desktop app test/check 통과.

## 판단

- 리소스 누수 위험은 낮다.
