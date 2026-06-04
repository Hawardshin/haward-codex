# 2026-06-05 Virtual Environment Manager 웹 검색

## 질의

- `Python venv official documentation virtual environments pyvenv.cfg pip requirements`
- `Python Packaging User Guide install packages virtual environment pip venv`
- `pip freeze official documentation requirements lock`

## 확인한 출처

- Python `venv` 공식 문서: virtual environment는 base Python 위에 생성되고, `.venv`/`venv` 경로를 관례로 사용하며, source control에 넣지 않고 삭제 후 재생성 가능한 대상으로 설명된다.
- Python Packaging User Guide: pip와 venv를 함께 사용해 가상환경 안에 패키지를 설치하는 흐름을 확인했다.
- pip `freeze` 공식 문서: 현재 설치 패키지 상태를 requirements 형식으로 출력하는 명령을 확인했다.

## 계획 영향

- 가상환경 관리 패널에 create, activate/direct-run, install, freeze, rebuild 단계를 분리했다.
- `pyvenv.cfg`, `sys.prefix`, `pip check`, lock/report diff, smoke output 같은 evidence를 UI에 표시한다.
- 환경 이동 대신 삭제 후 재생성하는 원칙을 rebuild step에 반영한다.

## 불확실성

- Windows activation 명령은 이번 UI 범위에서 자동 분기하지 않았다.
- 실제 `.venv` 생성/삭제는 terminal 또는 후속 runner 작업 범위다.
