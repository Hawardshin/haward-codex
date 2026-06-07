# 사용자 요청 요약: project repository submodule visibility 계속 구현

- 날짜: 2026-06-08
- 요약: Git 분리 이후에도 구현을 계속해, 사용자가 분리된 repository와 작업공간 상태를 쉽게 확인하고 다음 작업을 시작할 수 있게 하라는 요청.

## 요구사항 후보

- 프로젝트 관리 화면은 각 project의 실제 repository URL과 submodule path를 보여야 한다.
- 터미널/CLI 진단은 submodule 초기화/권한 문제를 확인할 수 있어야 한다.
- 기존 import/clone UI와 연결될 수 있는 repository metadata가 snapshot에 있어야 한다.
- 자동 credential 저장이나 destructive Git 명령은 실행하지 않아야 한다.
