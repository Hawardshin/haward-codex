# 구현 계획: 기본 사용자 인터페이스 단순화

## 조사 반영

- Apple HIG와 Microsoft UX 가이드는 자주 쓰는 핵심 기능을 상위에 두고 고급 옵션은 필요할 때 드러내는 progressive disclosure를 권장한다.
- 이번 변경은 고급 기능을 삭제하지 않고 기본 사용자 렌즈에서만 뒤로 보낸다.

## 실행 순서

1. `view_mode` 기본값과 validator를 `user` 기준으로 바꾼다.
2. 기본 고정 섹션과 fallback user allowed sections를 `overview`, `desktop`, `eval`로 줄인다.
3. Overview 첫 화면에 단순 작업 요청 입력과 자동 시작 액션을 추가한다.
4. 사용자 보기에서 운영 센터 레일 버튼을 숨긴다.
5. 요구사항, 정책, 스펙, 테스트 기대값을 새 기준으로 맞춘다.
6. config 검증, renderer 테스트, 타입 검사, build를 실행한다.

## 롤백 경계

- `view-mode-registry.json`의 `default_mode`와 `MonitorShell` fallback default를 이전 값으로 되돌리면 기본 렌즈만 복구된다.
- 홈 단순 작업면은 `data-simple-user-start` 섹션 단위로 되돌릴 수 있다.
