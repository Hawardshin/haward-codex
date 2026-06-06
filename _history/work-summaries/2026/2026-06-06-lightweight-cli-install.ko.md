# Work Summary: Lightweight CLI Install

날짜: 2026-06-06

## 완료

- `awp` Python stdlib CLI 추가
- user-local symlink installer 추가
- `cli:install`, `cli:doctor` package scripts 추가
- CLI tests/readiness 추가
- `/Users/shinjoungeun/.local/bin/awp` 설치 완료
- `test`, 설치 registry contract, `check`, `package:internal` 검증 통과

## 주의

`~/.local/bin`은 현재 PATH에 없다. 명령은 절대경로로 바로 실행 가능하며, shell PATH 등록은 사용자가 원할 때 별도 변경으로 처리한다.
