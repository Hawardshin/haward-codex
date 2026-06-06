# Plan: awp PATH Registration

1. zsh 시작 파일과 PATH 설정 근거를 공식/강한 자료로 확인한다.
2. PATH 등록 script를 만들고 dry-run/rollback/backup을 포함한다.
3. `cli:install`, `cli:path`, readiness, tests를 연결한다.
4. 실제 `.zprofile`, `.zshrc`에 적용한다.
5. 새 zsh 세션에서 `awp` 명령을 검증한다.
6. 지속 지시, 설치 감사, 레지스트리, 평가 기록을 업데이트한다.
7. 테스트/check/package, docs/config audits, commit/push를 완료한다.
