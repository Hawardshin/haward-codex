# Security Configs

민감 파일, secret, private file 처리 경계를 정의하는 설정을 둔다.

## 파일

- `sensitive-file-boundary.json`: `_private/sensitive/`와 외부 secret manager로 민감 파일을 라우팅하고, AI 에이전트의 `_private/` 기본 접근을 금지하는 source of truth.

## 검증

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/security/sensitive-file-boundary.json
cd ..
python3 _tools/privacy-audit/src/privacy_audit.py --check
```
