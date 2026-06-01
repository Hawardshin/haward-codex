# 요구사항 관리 정책

## 목적

사용자가 하는 작업과 대화에서 요구사항을 정의하고, 그 요구사항을 계속 수정/검토하면서 구현과 평가의 기준으로 사용한다.

## 원칙

- 사용자 요청은 요구사항 후보가 될 수 있다.
- 요구사항은 원문 요청이 아니라 검증 가능한 문장으로 다시 쓴다.
- 요구사항마다 출처 요청 ID, 근거, 상태, 우선순위, 검증 방법, 관련 산출물을 남긴다.
- 공통 workspace 요구사항은 `_requirements/`에 둔다.
- 프로젝트별 요구사항은 해당 프로젝트의 `docs/requirements/`에 둔다.
- 요구사항 변경은 `_requirements/changes/` 또는 프로젝트 요구사항 변경 기록에 남긴다.
- 요구사항 검토는 `_requirements/reviews/` 또는 프로젝트 요구사항 검토 기록에 남긴다.
- 의미 있는 구현 작업은 요구사항을 spec-driven 산출물로 변환한 뒤 진행한다.
- 의미 있는 작업은 평가 입력에 `requirements_targets`와 `spec_targets`를 포함한다.

## 요구사항 생명주기

1. 요청/조사에서 후보 요구사항을 만든다.
2. 요구사항 문장을 검증 가능하게 정리한다.
3. 기존 요구사항과 충돌, 중복, 누락을 검토한다.
4. 영향 범위와 소유 프로젝트를 정한다.
5. 기준선에 반영한다.
6. 관련 스펙, 계획, 작업 목록, 검증, traceability 산출물을 만든다.
7. 구현한다.
8. 검증하고 평가 보고서에 연결한다.
9. 새 요청이나 검토 결과에 따라 변경한다.

## 관련 파일

- [_requirements/README.ko.md](../../_requirements/README.ko.md)
- [_requirements/baselines/2026-05-31-workspace-platform.ko.md](../../_requirements/baselines/2026-05-31-workspace-platform.ko.md)
- [_templates/requirements/requirement-baseline.ko.md](../../_templates/requirements/requirement-baseline.ko.md)
- [_ops/workflows/35-requirements-lifecycle.md](../../_ops/workflows/35-requirements-lifecycle.md)
- [_ops/workflows/36-spec-driven-development.md](../../_ops/workflows/36-spec-driven-development.md)
- [agent-platform/docs/requirements-manager-agent.ko.md](../../agent-platform/docs/requirements-manager-agent.ko.md)
