# 조사 노트: 사용자용 설치와 개발자용 설치 분리

## 핵심 결론

플랫폼 설치는 `work_mode`와 분리된 `install_mode`로 관리해야 한다.

- `user`: 플랫폼을 쓰거나 보기 위한 설치. regular install, 기존 산출물, Vercel/Next.js 빌드 같은 최소 사용 경로를 우선한다.
- `developer`: 플랫폼을 개선하기 위한 설치. editable install, devDependencies, 테스트, 브라우저 검증, governance check를 포함한다.

## 확인한 근거

- pip local project installs: regular install은 실제 배포 설치와 유사하고, editable install은 development installation으로 적합하다.
- Python `pyproject.toml` 명세: dependency/optional dependency 표현 구조.
- npm docs: lockfile 기반 `npm ci`, dev dependency omit 동작.
- Vercel Next.js docs: Next.js 프로젝트의 Vercel 배포 경로.

## 플랫폼 적용

- `agent-platform/configs/installations/install-mode-registry.json`을 source of truth로 추가했다.
- CLI는 다음을 제공한다.
  - `check-install-modes`
  - `list-install-modes`
  - `show-install-mode`
- 실제 설치가 발생하면 이 registry가 아니라 `_ops/installations/registry.json`과 `_history/installations/YYYY/`가 실제 변경 감사 기록이다.

## 주의점

- `install_mode` 선택은 설치 실행이 아니다.
- `user` 설치도 source build를 수행하면 build tooling이 필요할 수 있다.
- `developer` 설치는 편리하지만 dependency 변경, lock 변경, 전역 설치는 여전히 감사 기록이 필요하다.
