# Workspace Docs

## 목적

`_docs/`는 저장소 전체에 적용되는 운영 문서와 의사결정 문서를 보관한다. 프로젝트 전용 문서는 해당 프로젝트의 `docs/`에 둔다.

## 카테고리

| 폴더 | 용도 |
| --- | --- |
| `instructions/` | 앞으로도 계속 적용해야 하는 지속 지시와 기본 workspace rule |
| `policies/` | 검증, 리서치, 설치, 요구사항, 스펙, 문서 언어 같은 실행 정책 |
| `operating-models/` | 플랫폼 운영 모델, 컨텍스트 모델, 도구 독립형 assistant 운영 모델 |
| `governance/` | capability 승격, 저장소 구조 거버넌스 같은 관리 기준 |

## 중요한 보안 경계

- 민감 파일은 `_private/sensitive/` 또는 외부 secret manager에 둔다.
- AI 에이전트는 `_private/` 내부를 기본적으로 직접 읽거나 색인하지 않는다.
- 관련 정책: [_docs/policies/sensitive-file-boundary-policy.ko.md](policies/sensitive-file-boundary-policy.ko.md)
- 운영 안내: [_ops/security/README.ko.md](../_ops/security/README.ko.md)

## 누락 방지

- 새 문서를 만들 때는 `_docs/registry.json`의 category 규칙을 확인한다.
- 새 문서는 root가 아니라 category 폴더에 넣는다.
- 중요한 한영 문서는 `.ko.md`와 `.en.md`를 함께 만든다.
- `_docs` 구조를 바꾼 뒤에는 다음을 실행한다.

```bash
python3 _tools/docs-audit/src/docs_audit.py --check
```

## 관련 파일

- `_docs/registry.json`
- `_tools/docs-audit/README.ko.md`
- `_ops/index.md`
