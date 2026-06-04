# 2026-06-05 Python Environment Workbench 웹 검색

## 질의

- `Python venv official documentation virtual environments pyvenv.cfg pip requirements`
- `Python packaging pyproject.toml dependency groups official documentation`
- `pip requirements files official documentation repeatable installs`
- `Amazon Bedrock AgentCore Code Interpreter sandbox code execution official docs`

## 확인한 출처

- Python `venv` 공식 문서: virtual environment는 독립 패키지와 interpreter를 갖고, `.venv`/`venv` 같은 project directory 경로를 관례로 사용하며, 삭제 후 재생성 가능한 대상으로 설명된다.
- Python Packaging User Guide `pyproject.toml`: project metadata와 dependency 선언의 표준 진입점으로 확인했다.
- pip requirements file 공식 문서: `pip install -r requirements.txt` 형태의 파일 기반 설치 계약을 확인했다.
- AWS AgentCore Code Interpreter 공식 문서: agent가 격리 환경에서 code 실행과 데이터 분석을 수행하는 built-in tool 방향을 확인했다.

## 계획 영향

- Tool Studio `파이썬 환경` 화면에 `.venv`, `requirements.txt`, `pyproject.toml`, lock/report, 설치 명령, 실행 명령을 직접 노출한다.
- 실제 실행은 아직 연결하지 않고, 사용자가 환경 경계와 재현 명령을 먼저 이해하는 UI 계약으로 제한한다.
- Agent sandbox 프로필은 network, secret, browser credential, host path 차단을 명시한다.

## 불확실성

- 실제 dependency resolver, lockfile 생성기, remote sandbox executor는 별도 구현 범위다.
- 현재 명령은 실행 계획 preview이며 terminal action과 command runner 연결은 후속 작업이다.
