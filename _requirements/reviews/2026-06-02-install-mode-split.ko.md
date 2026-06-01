# 설치 모드 분리 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-049`
- 변경 기록: `_requirements/changes/2026-06-02-install-mode-split.ko.md`

## 검토 결과

채택한다.

## 판단

기존 `work_mode`는 작업을 어떻게 계획하고 닫을지 정하는 구조다. 사용자가 말한 사용 모드와 개선 모드는 설치 환경의 범위에 관한 것이므로 `work_mode`에 섞으면 의미가 흐려진다.

따라서 별도 `install_mode`로 분리한다.

- 사용자용 설치는 플랫폼을 쓰는 데 필요한 최소 regular/runtime 경로를 제공한다.
- 개발자용 설치는 플랫폼 개선에 필요한 editable install, devDependencies, tests, governance checks를 제공한다.
- 설치 명령을 문서화하는 것과 실제 설치 실행은 분리한다.
- 실제 설치가 발생하면 설치 감사 기록을 유지한다.

## 검증 기준

- self-documenting install mode registry가 존재해야 한다.
- CLI가 install mode registry를 검증하고 모드를 조회할 수 있어야 한다.
- 지속 지시와 memory bootstrap에서 install mode가 발견되어야 한다.
- workflow/prompt/router/index에서 설치 모드 선택 경로가 보여야 한다.
