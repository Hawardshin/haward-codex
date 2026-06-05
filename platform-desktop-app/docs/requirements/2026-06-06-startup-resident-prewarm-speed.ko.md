# 요구사항: startup resident prewarm 속도 최적화

## 사용자 요구

Workspace Monitor 탭 전환이 아직 느리므로, 데스크톱 앱의 RAM/CPU 활용 이점을 살려 탭 간 이동 시 느껴지는 mount 지연을 더 줄여야 한다.

## 기능 요구사항

- 앱 시작 후 유휴 시간에 자주 쓰는 핵심 섹션을 bounded resident set에 미리 넣는다.
- resident section 수는 기존 최대 5개 제한을 유지한다.
- `source`는 editor state 보존 우선순위 때문에 resident retention 대상에 남긴다.
- `overview`는 비활성 상태에서 계속 resident로 붙잡지 않아야 한다.
- Tool Studio는 parent shell rerender에 끌려 불필요하게 다시 그려지지 않도록 memo boundary와 stable callbacks를 갖는다.
- 구현 후 성능 수치를 이전 bounded resident baseline과 비교한다.

## 비기능 요구사항

- React tree 전체를 다시 무제한 상주시켜서는 안 된다.
- startup prewarm은 사용자 입력을 막지 않도록 idle callback 또는 짧은 timeout fallback으로 예약한다.
- renderer, desktop, Rust/Tauri package 검증을 자동 실행한다.
- 결과와 tradeoff를 history/spec/evaluation 기록에 남긴다.

## 제외

- public signing/notarization, updater, clean-machine smoke는 이번 속도 최적화 범위가 아니다.
- 전체 MonitorShell 분해 refactor는 후속 구조 개선 후보로 남긴다.
