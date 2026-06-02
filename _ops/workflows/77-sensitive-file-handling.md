# Sensitive File Handling

## Purpose

민감 파일, secret, token, key, credential, private note, browser cookie, user-provided private file을 다룰 때 AI가 직접 내용을 보지 않도록 경계를 먼저 세운다.

## Steps

1. 웹 검색이 필요한 새 지시라면 먼저 web-first intake를 완료한다. 민감값은 검색어에 넣지 않는다.
2. `agent-platform/configs/security/sensitive-file-boundary.json`을 확인한다.
3. 실제 민감 파일은 `_private/sensitive/` 또는 외부 secret manager에 둔다.
4. 에이전트는 `_private/` 내부를 열람, 검색, 요약, 색인, snapshot 생성 대상으로 삼지 않는다.
5. 필요한 정보가 있으면 사용자에게 최소 redacted extract를 요청한다.
6. 직접 열람이 불가피하면 특정 경로, 작업, 목적, 보존 범위, redaction 규칙에 대한 명시적 1회 허가를 받아야 한다.
7. 산출물에는 raw secret을 남기지 않는다. 필요한 경우 env var 이름, secret reference, redacted metadata만 기록한다.
8. map, monitor snapshot, source collector, public artifact, installer를 갱신했다면 privacy audit를 실행한다.

```bash
python3 _tools/privacy-audit/src/privacy_audit.py --check
```

## Rule

`_private/`는 존재는 보이는 보호 경계지만, 내용은 AI의 기본 작업 컨텍스트가 아니다.
