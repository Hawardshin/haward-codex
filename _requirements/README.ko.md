# 요구사항 관리

이 폴더는 사용자 요청에서 도출된 요구사항을 정의, 검토, 변경, 기준선화하고 그 요구사항을 기반으로 구현하도록 관리한다.
의미 있는 구현 작업은 요구사항을 `_specs/` 또는 프로젝트별 `specs/`의 스펙 산출물로 연결한 뒤 진행한다.

## 목적

- 사용자의 작업 요청을 요구사항 후보로 바꾼다.
- 요구사항을 계속 수정하고 검토하며, 변경 이유와 영향을 남긴다.
- 구현과 평가가 요구사항을 기준으로 진행되게 한다.
- 프로젝트별 요구사항과 공통 workspace 요구사항을 분리한다.

## 경로 규칙

공통 workspace 요구사항:

```text
_requirements/baselines/YYYY-MM-DD-workspace-platform.ko.md
_requirements/changes/YYYY-MM-DD-<slug>.ko.md
_requirements/reviews/YYYY-MM-DD-<slug>.ko.md
```

프로젝트 전용 요구사항:

```text
project-name/docs/requirements/
```

## 요구사항 생명주기

1. `candidate`: 사용자 요청이나 조사에서 요구사항 후보를 만든다.
2. `draft`: 요구사항 문장, 근거, 검증 방법을 정리한다.
3. `reviewed`: 충돌, 누락, 검증 가능성, 프로젝트 경계를 검토한다.
4. `baseline`: 현재 구현 기준으로 승인한다.
5. `implemented`: 산출물과 커밋이 연결됐다.
6. `verified`: 테스트, 문서 검토, 평가 보고서로 확인됐다.
7. `changed`: 새 요청이나 검토 결과로 수정됐다.
8. `superseded`: 더 나은 요구사항으로 대체됐다.

## 필수 필드

- 요구사항 ID
- 요구사항 문장
- 출처 요청 ID
- 근거와 의도
- 우선순위
- 상태
- 소유 영역
- 검증 방법
- 관련 산출물
- 변경 이력

## 종료 평가 규칙

의미 있는 작업의 `work-evaluator-agent` 입력에는 `requirements_targets`와 `spec_targets`를 포함한다. 누락되면 blocking gap이다.
