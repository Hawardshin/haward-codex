# 설치 모드 정책

## 목적

이 저장소는 작업을 수행하는 `work_mode`와 환경을 준비하는 `install_mode`를 분리한다.

- `work_mode`: 작업의 계획, 검증, 히스토리, 평가 강도를 정한다.
- `install_mode`: 플랫폼을 사용할 사람인지, 플랫폼을 개선할 개발자인지에 따라 설치 범위와 검증 범위를 정한다.

## 설치 모드

### 사용자용 설치

사용자용 설치는 플랫폼을 실행하거나 산출물을 보기 위한 설치다.

- regular install, 기존 HTML 산출물, Vercel/Next.js 빌드처럼 사용에 필요한 최소 경로를 우선한다.
- editable install, 브라우저 검증 harness, 전체 governance test suite는 기본으로 요구하지 않는다.
- 사용자가 플랫폼을 수정하지 않는다면 개발자 도구를 설치하지 않는다.

### 개발자용 설치

개발자용 설치는 플랫폼 자체를 개선하기 위한 설치다.

- Python 플랫폼 코드는 필요할 때 editable install을 사용한다.
- 수정 대상 프로젝트의 devDependencies, 테스트, 브라우저 검증, governance check를 포함한다.
- dependency나 환경 상태가 실제로 바뀌면 설치 감사 기록을 남긴다.

## Source Of Truth

- 설치 모드 레지스트리: `agent-platform/configs/installations/install-mode-registry.json`
- CLI 검증:
  - `PYTHONPATH=src python3 -m agent_platform.cli check-install-modes configs/installations/install-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli list-install-modes configs/installations/install-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli show-install-mode configs/installations/install-mode-registry.json developer`

## 규칙

- 설치 모드를 고르는 것은 설치 명령을 실행했다는 뜻이 아니다.
- 실제 설치, 업그레이드, 제거, 전역 설정이 발생하면 `_ops/workflows/58-installation-record.md`를 따른다.
- 사용자용 설치는 사용 편의성과 최소 의존성을 우선한다.
- 개발자용 설치는 변경 가능성, 빠른 반복, 검증 가능성을 우선한다.
- 설치 모드는 작업 모드보다 약한 close-out을 허용하지 않는다. 작업의 평가 강도는 여전히 `work_mode`가 정한다.
