# Security Operations

## 어디에 무엇을 두는가

| 구분 | 위치 | git 추적 | AI 기본 접근 |
| --- | --- | --- | --- |
| 실제 민감 파일 | `_private/sensitive/` | 안 함 | 금지 |
| 임시 민감 작업물 | `_private/tmp/` | 안 함 | 금지 |
| redacted extract | `_private/redacted-extracts/` 또는 사용자가 직접 전달 | 안 함 | 사용자가 직접 제공한 범위만 |
| 보안 정책/계약 | `agent-platform/configs/security/sensitive-file-boundary.json` | 함 | 허용 |
| 운영 안내 | `_docs/policies/sensitive-file-boundary-policy.ko.md` | 함 | 허용 |
| 검증 도구 | `_tools/privacy-audit/` | 함 | 허용 |

## 기본 원칙

- `_private/`는 “보이지 않는 작업 폴더”가 아니라 “존재는 보이지만 내용은 보지 않는 보호 경계”다.
- AI가 민감 파일을 직접 봐야 한다고 판단하면, 먼저 redacted extract를 요청한다.
- 직접 열람은 사용자의 명시적 1회 허가가 있을 때만 가능하다.
- monitor snapshot, repository map, source collector, installer, public artifact는 `_private/` 내용을 포함하면 안 된다.

## 검증

```bash
python3 _tools/privacy-audit/src/privacy_audit.py --check
```
