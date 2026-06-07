# 2026-06-07 사용자 요청 요약: 이어서 구현

## 요청 요약

Task Run Store panel split 이후 계속 구현을 이어 달라는 요청.

## 선택한 구현

- `MonitorShell.tsx`의 `Runtime Data & Support` 패널을 `RuntimeDataSupportPanel.tsx`로 분리한다.
- 런타임 루트, installer payload audit, support diagnostic bundle UI 기능은 유지한다.
- readiness script/test와 service readiness script가 새 feature 파일을 함께 검사하도록 갱신한다.

## 제외

- runtime data Tauri command 자체와 public release credential 설정은 변경하지 않는다.
