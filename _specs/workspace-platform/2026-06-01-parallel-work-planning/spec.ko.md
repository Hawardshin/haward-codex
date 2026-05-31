# 스펙: 병렬 작업 계획 구조

## 목표

작업 속도가 느려질 수 있는 경우, 작업을 안전하게 병렬 lane으로 나눌 수 있는지 검증하는 공통 구조를 만든다.

## 요구사항

- `REQ-WS-023`
- 작업은 `task_id`, 의존성, touch paths, 산출물, 검증 단계를 가진다.
- 독립 batch는 의존성이 없고 touch paths가 겹치지 않는 작업으로만 구성한다.
- 공유 자원, 충돌 제어, coordination target, merge 전략, rollback 계획을 기록한다.

## 구현 범위

- Python planner와 CLI: `plan-parallel-work`
- agent spec과 planning template
- 운영 프롬프트/워크플로/문서
- 요구사항, 스펙, 히스토리, 평가 기록

## 제외 범위

- 실제 멀티프로세스 실행 엔진
- 자동 git worktree 생성
- 원격 agent runner
