# 사용자 요청 요약: 미뤘던 구현

- 날짜: 2026-06-07
- 원문 요지: “미뤘던 구현 해줘”
- 해석: 최근 제품 gap 중 외부 자산 없이 닫을 수 있는 `componentized_desktop_ui_architecture` 구조 부채를 이어서 구현한다.
- 선택한 조각: `MonitorShell`의 좌측 activity rail/sidebar navigation을 `DesktopActivityRail` 컴포넌트로 분리한다.
- 비범위: 공개 배포 signing/notarization/updater/clean-machine smoke는 외부 자산이 필요해 이번 로컬 구현으로 닫지 않는다.
