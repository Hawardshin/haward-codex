# 요구사항 변경: deferred queue final closure

- 날짜: 2026-06-08
- 변경 유형: backlog closure / workspace monitor UX / componentization

## 요구사항

사용자가 다시 “미뤄둔 것 전부 구현”을 요청했으므로, 실제 deferred queue와 backlog에서 로컬 구현 가능한 항목을 닫고, 외부 자격 증명이나 OS 환경이 필요한 항목은 명확한 external gate로 분리한다.

## 승인 기준

- `reconcile-spec`의 `clarification_needed` 질문이 workspace monitor snapshot과 UI에서 보인다.
- home Decision Inbox drilldown은 runtime decision뿐 아니라 spec/source clarification queue도 보여준다.
- `MonitorShell.tsx`에서 독립 가능한 패널을 별도 feature module로 추가 추출한다.
- mode tuning backlog는 실제 mode selection 기록을 근거로 닫는다.
- deferred/backlog 파일은 `completed` 또는 `blocked_external_gate`로 정리되고, 로컬 구현 가능한 `open` 항목을 남기지 않는다.
- TS legacy file size는 사실대로 기록하고, 500줄 이하를 완료했다고 거짓 주장하지 않는다.
