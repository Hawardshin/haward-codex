# Spec-Driven 개발

이 폴더는 요구사항을 실제 구현 가능한 스펙, 계획, 작업 목록, 검증 기록으로 바꾸는 spec-driven 작업 계층이다.

## 목적

- 요구사항을 바로 코드로 넘기지 않고 구현 가능한 스펙으로 정리한다.
- 스펙을 설계, 작업 분해, 구현, 검증과 연결한다.
- AI가 단일 프롬프트에서 추측으로 구현하지 않도록 산출물 기준을 고정한다.
- 프로젝트별 스펙과 공통 workspace 스펙을 분리한다.

## 경로 규칙

공통 workspace/platform 스펙:

```text
_specs/<scope>/YYYY-MM-DD-<slug>/
  spec.ko.md
  plan.ko.md
  tasks.ko.md
  validation.ko.md
  traceability.ko.md
```

프로젝트 전용 스펙:

```text
project-name/specs/YYYY-MM-DD-<slug>/
```

## 생명주기

1. `intake`: 사용자 요청, 요구사항, 조사 결과를 모은다.
2. `clarify`: 모호함, 충돌, 누락된 acceptance criteria를 확인한다.
3. `spec`: 무엇을 만들지, 왜 필요한지, 성공 기준을 쓴다.
4. `plan`: 구현 설계, 파일 범위, 검증 전략을 정한다.
5. `tasks`: 실행 가능한 작업 목록으로 나눈다.
6. `implement`: 작업 목록 순서로 구현한다.
7. `validate`: 테스트, 문서 검토, 평가 결과를 기록한다.
8. `trace`: 요청, 요구사항, 스펙, 작업, 산출물, 평가, 커밋을 연결한다.

## 필수 산출물

- `spec.*.md`: 사용자 관점의 동작, 범위, acceptance criteria
- `plan.*.md`: 구현 전략, 영향 범위, 검증 전략
- `tasks.*.md`: 작업 ID가 있는 체크리스트
- `validation.*.md`: 실행한 검증과 결과
- `traceability.*.md`: 요청/요구사항/스펙/작업/파일/평가 연결

## 종료 평가 규칙

의미 있는 작업의 `work-evaluator-agent` 입력에는 `spec_targets`를 포함한다. 누락되면 blocking gap이다.
