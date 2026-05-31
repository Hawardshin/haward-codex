# 병렬 작업 계획 요구사항 변경

## 요청 요약

사용자는 현재 운영 루프가 속도상 느릴 수 있으므로 작업을 병렬로 처리할 수 있는 구조도 고려해 달라고 요청했다.

## 변경 요구사항

- `REQ-WS-023`을 공유 요구사항 baseline에 추가한다.
- 병렬 작업 전 `task_id`, 의존성, `touch_paths`, 산출물, 검증, 공유 자원, 충돌 제어, coordination target, merge 전략, rollback 계획을 기록한다.
- 같은 파일/폴더/설정/생성 맵/git 상태를 건드리는 작업은 dependency나 lock 없이 같은 batch에서 병렬 실행하지 않는다.
- 병렬 작업 상태는 `_ops/coordination/status.json`과 생성 board에서 확인할 수 있어야 한다.

## 근거

- Airflow, Prefect, Dagster, GitHub Actions 같은 워크플로 도구는 작업 단위, 의존성, 준비된 작업 실행, 상태/검증을 명시한다.
- 이 저장소는 단일 git workspace를 공유하므로 파일 경계와 merge 검증을 별도 규칙으로 둬야 한다.

## 영향

- `parallel-work-planner-agent`와 `plan-parallel-work` CLI를 추가한다.
- 병렬 작업 프롬프트, 워크플로, 템플릿, 문서, 메모리 anchor를 추가한다.
