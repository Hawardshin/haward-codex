# 설치 상세 기록

이 폴더는 실제 설치, 업그레이드, 제거, 전역 설정 변경을 날짜별로 기록한다.

## 경로 규칙

```text
_history/installations/YYYY/YYYY-MM-DD-<slug>.ko.md
_history/installations/YYYY/YYYY-MM-DD-<slug>.en.md
```

## 언제 작성하나

- `pip`, `uv`, `poetry`, `npm`, `pnpm`, `yarn`, `brew`, `cargo install`, `go install` 등으로 무언가를 설치할 때
- `pyproject.toml`, `requirements.txt`, `package.json`, lock 파일 등 dependency 상태가 바뀔 때
- Codex skill/plugin/connector를 설치하거나 전역 경로를 바꿀 때
- 설치된 도구를 제거하거나 업그레이드할 때

## 필수 내용

- 설치 이유와 대안
- 설치 전 조사 링크
- 정확한 설치 명령
- 설치 범위와 환경 경로
- 변경된 dependency/lock 파일
- 설치된 버전 또는 lock 상태
- 보안/라이선스 검토
- 설치 후 검증
- rollback 방법
- 연결된 평가 보고서와 커밋
