# 구현 계획: 터미널 탭 개혁

1. 현재 터미널 드로어, 시작 패널, PTY surface, copy, CSS, 테스트를 확인한다.
2. 시작 패널을 실행 허브로 재구성하고 고급 시작 옵션을 접는다.
3. 드로어 상단에 readiness strip을 추가해 런타임/어댑터/실제 셸/작업 폴더 상태를 표시한다.
4. 기존 PTY search/copy/paste/fit/quick command 기능이 유지되는지 정적 테스트로 묶는다.
5. 요구사항, 기존 터미널 스펙, 새 스펙, 이력, 평가 기록을 갱신한다.
6. check/test/build와 guard를 통과시킨 뒤 commit/push한다.
