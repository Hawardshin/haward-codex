# 2026-06-07 Runtime Data Support panel split 리소스 점검

## 리소스 영향

- 새 long-running process, timer, subscription, worker, stream 없음.
- 기존 Tauri command 호출은 상위 상태 관리에 남기고 UI 렌더링만 분리했다.

## 검증

- workspace monitor check/test 통과.
- desktop app test/check 통과.

## 판단

- 리소스 누수 위험은 낮다.
