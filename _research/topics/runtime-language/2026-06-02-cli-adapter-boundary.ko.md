# CLI 어댑터 경계 조사 메모

## 핵심 결론

설치형 플랫폼은 특정 CLI에 종속되지 않아야 한다. 플랫폼 코어는 의도, 작업 기록, 문서, 평가, 설정, UI를 소유하고, CLI는 필요할 때만 붙는 외부 capability로 다룬다.

## 근거 역할

- Python subprocess와 Node child_process 문서는 외부 명령 실행이 단순 문자열 실행이 아니라 인자, shell, timeout, stdout/stderr, 보안 고려가 필요한 경계임을 보여준다.
- Tauri command scope는 desktop shell이 로컬 명령을 다룰 때 권한 범위를 명시해야 한다는 근거다.
- GitHub CLI extensions는 CLI가 자체적으로 확장될 수 있는 생태계임을 보여주지만, extension과 외부 terms/support는 별도 경계가 있음을 시사한다.
- Twelve-Factor backing services와 ports/adapters 관점은 외부 도구를 내부 본체가 아니라 attach/detach 가능한 adapter로 다루는 설계 근거가 된다.

## 플랫폼 적용

- `cli-adapter-registry.json`으로 CLI adapter contract를 둔다.
- 설치형 앱은 missing CLI에도 기본 UI와 문서 탐색이 가능해야 한다.
- CLI를 required나 bundled로 승격할 때만 설치 감사와 release gate를 강화한다.
- desktop-originated CLI 실행은 command allowlist, workspace path allowlist, permission UI, timeout, redaction이 필요하다.

## 재사용 주의

이 메모는 일반 원칙이다. 실제 Codex CLI, Claude Code, GitHub CLI, Vercel CLI 같은 adapter를 만들 때는 각 도구의 최신 공식 문서를 다시 확인한다.
