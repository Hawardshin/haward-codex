# 웹 검색 기록: 코딩 프로젝트 bootstrap

## 검색 목적

새 코딩 프로젝트를 만들 때 기술별 구조와 project registry를 반복 수작업하지 않도록, 신뢰 가능한 스캐폴딩/템플릿/워크스페이스 generator 설계 기준을 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `standard`

## 검색 쿼리

- `Backstage software templates scaffolder best practices project creation documentation official`
- `Copier project templates documentation official generate projects`
- `Nx monorepo project structure generators official documentation`
- `Cookiecutter project templates official documentation`
- `Backstage software templates scaffolder documentation official`
- `Copier templates documentation official project scaffolding`
- `Nx generators create projects official documentation`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Backstage Software Templates, https://backstage.io/docs/features/software-templates | 공식 문서 | Software Templates는 skeleton code, variables, actions, publish target을 통해 컴포넌트 생성을 표준화한다. | 프로젝트 생성도 입력값, blueprint, 출력물, registry update로 나눠 설계 |
| Backstage Writing Templates, https://backstage.io/docs/features/software-templates/writing-templates/ | 공식 문서 | 템플릿 정의는 metadata, input variables, action list로 구성된다. | `blueprints.json`에 metadata, required fields, generated files를 명시 |
| Copier generating projects, https://copier.readthedocs.io/en/stable/generating/ | 공식 문서 | 템플릿과 destination, data를 명시해 프로젝트를 생성한다. | 로컬 config 기반으로 `project_name`, `blueprint`, `target_dir`를 렌더링 |
| Nx workspace generators, https://nx.dev/docs/reference/workspace/generators | 공식 문서 | workspace generator는 프로젝트 생성과 설정을 반복 가능한 명령으로 다룬다. | 루트 workspace 안의 기술별 project bootstrap 도구로 구현 |
| Backstage software-templates GitHub, https://github.com/backstage/software-templates | 오픈소스 예시 | community template는 starting point이며 자체 fork/관리 필요성이 있다. | 외부 템플릿을 그대로 복사하지 않고 로컬 최소 blueprint로 관리 |

## 약한 출처와 제외

- Reddit 글은 사용성 리스크 신호로만 보았고 설계 근거로 직접 사용하지 않았다.
- 일반 블로그의 “최고 프로젝트 구조” 글은 기술별 취향이 강해 공통 요구사항 근거로 사용하지 않았다.

## 계획 영향

- 생성 도구는 기본 dry-run이고 `--apply`가 있어야 파일을 만든다.
- registry update는 root project target일 때만 허용한다.
- blueprint는 완전한 framework installer가 아니라 최소 project contract와 공식 문서 체크리스트를 만든다.
- 기술별 실제 구현은 생성 후 `coding-research-agent` 기준으로 공식 문서와 아키텍처를 다시 확인해야 한다.

## 불확실성

- 실제 프로젝트별 dependency는 목적과 버전에 따라 달라진다. 따라서 이번 도구는 의존성을 설치하지 않고, 설치가 필요한 경우 별도 설치 감사 기록을 요구하는 방향으로 제한했다.
