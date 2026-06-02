# Privacy Audit

`privacy-audit`는 `_private/`의 실제 내용을 읽지 않고 민감 파일 경계가 지켜지는지 확인하는 도구다.

## 확인하는 것

- `.gitignore`가 `_private/`, `outputs/`, `.env`, key/certificate/container 파일 패턴을 제외하는지 확인한다.
- `repository-map.md`와 `workspace-monitor` snapshot이 `_private/` 내부 경로를 포함하지 않는지 확인한다.
- `workspace-index`와 `workspace-monitor` 수집기가 `_private/`를 명시적으로 제외하는지 확인한다.
- `agent-platform/configs/security/sensitive-file-boundary.json`이 존재하는지 확인한다.

## 실행

```bash
python3 _tools/privacy-audit/src/privacy_audit.py --check
```

## 원칙

이 도구는 `_private/` 안을 열람하지 않는다. 민감 파일은 존재 여부, 경계, 제외 규칙만 검증한다.
