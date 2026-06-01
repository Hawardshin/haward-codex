# 요구사항 변경: CLI 어댑터 경계

## 변경 ID

- `REQ-CHANGE-2026-06-02-CLI-ADAPTER-BOUNDARY`

## 배경

사용자는 플랫폼이 설치형이지만 다양한 CLI를 사용할 수 있어야 하며, 특정 CLI에 종속되지 않고 플랫폼 위에서 CLI들을 이용하는 방식이어야 한다고 했다.

## 변경 내용

- `REQ-WS-053`을 추가한다.
- 설치형 플랫폼과 외부 CLI 사이를 optional adapter capability로 정의한다.
- missing CLI는 전체 실패가 아니라 `capability_missing`으로 처리하도록 요구한다.
- CLI를 required/bundled/global install 대상으로 승격하기 전 설치 감사, 보안 경계, rollback, 검증 명령을 요구한다.

## 영향 범위

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `_docs/policies/cli-adapter-policy.ko.md`
- `_ops/workflows/66-cli-adapter-integration.md`
- `_ops/prompts/97-cli-adapter-integration.md`
- `platform-desktop-app/configs/desktop-distribution-registry.json`

## 상태

- 적용 완료
