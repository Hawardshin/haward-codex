# Python Environment Workbench 스펙

## 요구사항

- REQ-WM-052: Tool Studio의 `파이썬 환경` 화면은 전용 Python 실행환경 작업대를 제공해야 한다.

## 사용자 결과

- 사용자는 `파이썬 환경` 모드에서 Local venv, Isolated runner, Agent sandbox 프로필을 선택한다.
- 선택 프로필에 따라 interpreter, venv path, dependency file, lock/report, 설치 명령, 실행 명령, 격리 경계, cache 정책, health check가 즉시 바뀐다.
- 주요 액션은 `venv 생성`, `의존성 설치`, `Smoke 실행`, `환경 계획 복사`로 분리된다.
- 860px 이하 화면에서는 profile, canvas, action 영역이 한 열로 접혀 수평 overflow를 만들지 않는다.

## 비목표

- 실제 Python 패키지 설치 실행
- host credential 또는 secret 주입
- 원격 sandbox 인프라 생성
- lockfile 생성기 또는 dependency resolver 구현
