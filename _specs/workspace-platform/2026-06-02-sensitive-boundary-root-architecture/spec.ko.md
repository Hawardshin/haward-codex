# 스펙: 민감 파일 경계와 최상위 폴더 논리 계층

## 배경

기존 구조에는 `_private/`가 local-only로 존재했지만, 사용자가 바로 확인할 수 있는 민감 파일 운영 계약과 AI 기본 접근 금지 규칙이 약했다. 또한 루트 폴더가 많아지면서 운영성 폴더, 프로젝트 폴더, 런타임 adapter, local-only 폴더의 추상화가 부족했다.

## 목표

- 민감 파일을 `_private/sensitive/` 또는 외부 secret manager로 중앙 라우팅한다.
- AI 에이전트가 `_private/` 내부를 기본적으로 읽거나 색인하지 않도록 명시한다.
- 지도, 스냅샷, source collector, public artifact, installer가 `_private/` 내용을 포함하지 않도록 한다.
- 최상위 폴더를 논리 계층으로 설명한다.

## 비목표

- 실제 secret 값을 저장소로 가져오지 않는다.
- `_private/` 내용을 읽거나 감사하지 않는다.
- 기존 프로젝트를 대량 이동하지 않는다.

## 산출물

- `agent-platform/configs/security/sensitive-file-boundary.json`
- `_docs/policies/sensitive-file-boundary-policy.ko.md`
- `_ops/security/README.ko.md`
- `_ops/workflows/77-sensitive-file-handling.md`
- `_ops/prompts/107-sensitive-file-handling.md`
- `_tools/privacy-audit/`
- `_ops/projects/root-structure-policy.json`의 논리 계층
