# 스펙: 코딩 프로젝트 bootstrap

## 목표

새 코딩 프로젝트를 만들 때 기술별 구조, 프로젝트 경계, registry 연결, coding research 시작점을 한 번에 준비하는 재사용 도구와 운영 흐름을 만든다.

## 요구사항

- `REQ-WS-038`

## 범위

- `_tools/coding-project-bootstrap/` 도구를 추가한다.
- 기술별 blueprint 설정을 자기 설명형 JSON으로 관리한다.
- 기본 실행은 dry-run이어야 하며, 실제 생성은 `--apply`가 필요하다.
- root project 생성 시 `--register`로 `_ops/projects/registry.json`에 등록할 수 있어야 한다.
- nested target은 생성할 수 있지만 root registry에 자동 등록하지 않는다.
- 생성 프로젝트는 `README.md`, `docs/`, `specs/`, `configs/project-context.json`, `src/`, `tests/`, `tools/`, `artifacts/`를 가진다.
- 운영 workflow/prompt/router/memory/navigation에 연결한다.

## 비범위

- 실제 dependency 설치
- 외부 framework generator 실행
- 특정 제품 프로젝트를 지금 생성

## 수용 기준

- blueprint 목록 조회, plan, create dry-run, apply, registry update가 테스트된다.
- workspace-health가 통과한다.
- workspace-monitor snapshot에 새 도구와 문서가 반영된다.
- 평가 보고서가 `ready_to_close`로 남는다.
