# 누락 방지 점검: 소스 워크벤치 패널 분리

- 사용자 요구: 큰 파일을 계속 쪼개고, 기능 이슈 없이 일관된 동작을 유지한다.
- 포함한 작업:
  - 소스 워크벤치 UI 패널 분리
  - Monaco editor/diff editor dynamic component 소유권 이동
  - 테스트와 구조 검사 스크립트의 새 파일 경계 반영
  - 타입 체크와 패키징 검증 예정
- 제외한 작업:
  - unrelated dirty worktree 정리
  - 사용자 변경으로 보이는 기존 staged/untracked 파일 되돌리기

