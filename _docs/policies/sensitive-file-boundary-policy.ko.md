# 민감 파일 경계 정책

## 목적

민감 파일은 플랫폼 안에서 한곳으로 라우팅하되, AI 에이전트가 기본적으로 직접 보거나 색인하지 않게 한다.

## 핵심 규칙

- 실제 민감 파일은 `_private/sensitive/` 또는 외부 secret manager에 둔다.
- `_private/`는 git ignored local-only vault이며, 요구사항/히스토리/평가/지식 베이스의 근거로 쓰지 않는다.
- 에이전트는 `_private/` 내부를 기본적으로 `find`, `rg`, `cat`, `sed`, 요약, 임베딩, 스냅샷, 브라우저 캡처 대상으로 삼지 않는다.
- 필요한 정보는 사용자가 최소한의 redacted extract로 제공하는 것이 기본이다.
- 직접 열람이 꼭 필요하면 특정 경로, 작업, 목적, 보존 범위, redaction 규칙에 대한 명시적 1회 허가가 필요하다.
- `.env`, key, certificate, keystore, password vault 파일은 저장소에 커밋하지 않는다.
- repository map, workspace monitor snapshot, source collector, public artifact, installer는 `_private/`와 raw secret을 포함하면 안 된다.

## 보이는 위치

- 실제 로컬 민감 파일 위치: `_private/sensitive/` (ignored, 기본 접근 금지)
- 추적 가능한 보안 계약: `agent-platform/configs/security/sensitive-file-boundary.json`
- 운영 안내: `_ops/security/README.ko.md`
- 검증 도구: `_tools/privacy-audit/`

## 검증

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/security/sensitive-file-boundary.json
python3 _tools/privacy-audit/src/privacy_audit.py --check
python3 _tools/structure-audit/src/structure_audit.py --check
```

## 근거

- OWASP Secrets Management Cheat Sheet는 secret 저장, provisioning, audit, rotation, 접근 제어를 중앙화하라고 권고한다.
- OWASP DevSecOps 지침은 secret이 repository history에 들어가기 전에 차단해야 한다고 설명한다.
- GitHub 문서는 secret scanning과 push protection으로 leak prevention을 다룬다.
- 1Password 개발자 문서는 secret reference와 `op run`처럼 평문을 저장소에 남기지 않는 방식을 제공한다.
