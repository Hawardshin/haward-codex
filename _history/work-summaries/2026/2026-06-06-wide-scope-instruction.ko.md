# 작업 요약: 넓은 범위 작업 지시

## 완료 내용

- 사용자의 “범위가 넓다고 두려워하지마” 지시를 지속 지시로 반영했다.
- `_docs/instructions/persistent-instructions.md`, `.ko.md`, `.en.md`에 동일 의미의 원칙을 추가했다.
- `agent-platform/configs/memory/bootstrap-manifest.json`의 persistent instruction anchor와 large-scope rule을 갱신했다.
- 웹 검색 기록과 사용자 요청 요약을 남겼다.

## 해석

앞으로 넓은 범위 작업은 회피하거나 임의 축소하지 않는다. 대신 large-scope decomposition, bounded slices, parallel lanes, merge gates, 검증, rollback 경계로 실제 사용자 목표가 처리될 때까지 진행한다.
