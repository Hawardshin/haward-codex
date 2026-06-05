# 2026-06-05 Python Source Tool Management 웹 검색

## 질의

- `Python Packaging User Guide src layout pyproject.toml official`
- `Python Packaging User Guide creating pyproject.toml official`
- `uv Python project tool official documentation package scripts pyproject`
- `Hatch Python packaging build scripts official docs pyproject`

## 확인한 출처

- Python Packaging User Guide `src layout vs flat layout`: import 가능한 package를 `src/` 아래로 두는 구조와 editable install/testing 차이를 확인했다.
- Python Packaging User Guide `Writing your pyproject.toml`: `[build-system]`, `[project]`, `[tool]` 테이블 역할과 build backend 선언 필요성을 확인했다.
- uv 공식 문서 `Working on projects`: `uv init`, `pyproject.toml`, `.venv`, `uv.lock`, `uv run`, `uv build` 기반 project workflow를 확인했다.
- Hatch 공식 문서: Python packaging backend와 environment/script 설정이 `pyproject.toml`에 모이는 방향을 보조 참고로 확인했다.

## 계획 영향

- Tool Studio `툴 만들기` 화면의 Python source manager는 `src/` edit target, `pyproject.toml`, console entry point, smoke test path를 기본 표시 항목으로 둔다.
- 실제 설치나 build를 자동 실행하지 않고, init/run/package command를 preview와 copy payload로 제공한다.
- Python source 관리는 `build` 모드 내부 하위 작업대로 두고, venv/배포는 기존 전용 모드로 유지한다.

## 불확실성

- 실제 tool skeleton 생성기, dependency resolver, lockfile 관리, editable install 실행은 후속 구현 범위다.
- `uv` 채택은 UI preview 기본값이며 repository 전체 Python packaging 표준으로 확정한 것은 아니다.
