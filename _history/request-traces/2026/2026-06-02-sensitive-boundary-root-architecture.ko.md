# 요청-결과 추적: 민감 파일 경계와 최상위 폴더 아키텍처

## 요청

민감 파일을 한곳에 모아 처리하되 AI가 직접 보지 않도록 하는 구조가 보이지 않는다고 지적했다. 또한 최상위 폴더가 많아 운영성/프로젝트성 폴더의 아키텍처 추상화가 부족하다고 지적했다.

## 결과

- `REQ-WS-074` 추가
- `sensitive-file-boundary.json` 추가
- `_private/` AI default-deny 정책 추가
- `_ops/security/` 운영 안내 추가
- `privacy-audit` 도구 추가
- workspace index와 Workspace Monitor collector에서 `_private/` 제외
- root structure policy에 논리 계층 추가

## 주요 산출물

- `agent-platform/configs/security/sensitive-file-boundary.json`
- `_docs/policies/sensitive-file-boundary-policy.ko.md`
- `_ops/security/README.ko.md`
- `_tools/privacy-audit/`
- `_ops/projects/root-structure-policy.json`
- `_specs/workspace-platform/2026-06-02-sensitive-boundary-root-architecture/`

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-02-sensitive-boundary-root-architecture.ko.md`
- 커밋: 완료 후 최종 응답에 기록
