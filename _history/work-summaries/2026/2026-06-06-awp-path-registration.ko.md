# Work Summary: awp PATH Registration

날짜: 2026-06-06

## 완료

- `configure-awp-path.mjs` 추가
- `cli:install`이 PATH 등록까지 수행하도록 변경
- `cli:path` 추가
- `.zprofile`, `.zshrc`에 관리 block 실제 적용
- 새 zsh 세션에서 `awp` 확인
- 지속 지시와 memory bootstrap manifest 반영
- test, docs audit, config contracts, desktop check, internal package 검증 통과

## 주의

현재 실행 중인 부모 shell의 PATH는 자식 프로세스에서 바꿀 수 없다. 새 Terminal 또는 새 zsh 세션에서는 `awp`가 바로 잡힌다.
