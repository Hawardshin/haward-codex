# 설치 모드 분리 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-003`
- 추가 요구사항: `REQ-WS-049`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 플랫폼에 사용 모드와 개선 모드가 있으므로, 사용자용 설치와 이 플랫폼을 개선하는 개발자용 설치가 따로 있어야 한다고 요청했다.

## 변경 내용

`REQ-WS-049`를 추가해 설치 목적을 `install_mode`로 분리한다.

- `user`: 플랫폼을 사용, 보기, 실행, 배포하기 위한 최소 설치 경로.
- `developer`: 플랫폼을 개선, 소스 수정, 검증 harness 변경, 공통 규칙 변경하기 위한 개발 설치 경로.
- `install_mode`는 환경 준비 범위이고, `work_mode`는 작업 계획/평가 강도다.
- 실제 설치 명령이 실행되어 dependency나 환경 상태가 바뀌면 기존 설치 감사 기록을 따른다.

## 근거

- pip 공식 문서는 local project install을 regular install과 editable install로 분리하고, regular install은 배포/CI에 가까운 설치, editable install은 development installation에 적합하다고 설명한다.
- Python Packaging User Guide의 `pyproject.toml` 명세는 project dependencies와 optional dependencies 구조를 제공한다.
- npm 공식 문서는 lockfile 기반 `npm ci`와 dev dependency omit 동작을 설명한다.
- Vercel Next.js 문서는 Next.js 프로젝트의 Vercel 배포 경로를 공식적으로 설명한다.

## 영향

- `agent-platform/configs/installations/install-mode-registry.json`을 추가한다.
- `agent-platform` CLI에 `check-install-modes`, `list-install-modes`, `show-install-mode`를 추가한다.
- 설치 모드 정책, workflow, prompt, README, 지속 지시, memory bootstrap, router, index를 갱신한다.
