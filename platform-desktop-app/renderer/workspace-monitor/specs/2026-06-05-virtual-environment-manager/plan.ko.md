# 구현 계획

## 범위

- `ToolStudioPanel`에 가상환경 lifecycle step 모델을 추가한다.
- `파이썬 환경` workbench 내부에 가상환경 전용 관리 패널을 추가한다.
- 단계 선택, command preview, evidence, command/workflow copy action을 구현한다.
- CSS와 static test로 marker, grid, 모바일 접힘 계약을 고정한다.
- check/build/Browser smoke로 검증한다.

## 결정

- 새 top-level tab을 만들지 않고 `파이썬 환경` 모드 안의 deeper panel로 둔다.
- 실제 실행은 terminal 진입점으로 두고, UI는 재현 가능한 명령과 evidence를 먼저 제공한다.
- 공식 `venv` 문서의 disposable/recreate 원칙을 UI 문구와 rebuild step에 반영한다.

## 위험과 대응

- 긴 rebuild 명령이 깨질 수 있다: terminal code block에 `overflow-wrap: anywhere`를 적용한다.
- `pyproject.toml`에 `pip install -r`를 잘못 안내할 수 있다: dependency file에 따라 install/rebuild command를 분기한다.
- 액션이 과다해질 수 있다: terminal, command copy, workflow copy 세 가지로 제한한다.
