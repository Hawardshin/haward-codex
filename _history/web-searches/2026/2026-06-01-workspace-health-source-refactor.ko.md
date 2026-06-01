# 웹 검색 기록: Workspace Health 소스 구조 리팩터링

## 검색 목적

사용자의 “리팩토링 폴더구조 소스 구조” 요청을 구현하기 전에, 폴더/소스 구조 개선 방향을 외부 근거와 비교했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `standard`

## 검색 쿼리

- `Python src layout best practices package structure official PyPA`
- `software project structure refactoring maintainability best practices`
- `monorepo folder structure maintainability best practices`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Python Packaging User Guide, `src` layout vs flat layout, https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | 공식 문서 | import 가능한 패키지를 `src/` 아래에 두는 구조와 CLI 실행 시 `sys.path` 보정 방식 | `workspace_health` package를 `src/` 아래에 두고 legacy script wrapper를 유지 |
| pyOpenSci Python Package Guide, https://www.pyopensci.org/python-package-guide/package-structure-code/python-package-structure.html | 가이드 | `src/package` 구조 예시와 테스트/패키지 경계의 장점 | 단일 스크립트보다 package module import 테스트를 선호 |
| Refactoring Guru, Refactoring, https://refactoring.guru/refactoring | 교육 자료 | 외부 동작을 보존하며 내부 구조를 개선하는 refactoring 원칙 | 기존 `workspace_health.py` 명령 호환성 유지 |
| Martin Fowler, Monorepo, https://martinfowler.com/bliki/Monorepo.html | 전문가 글 | monorepo는 공유 코드와 운영 경계를 명확히 관리해야 한다는 맥락 | `_tools/workspace-health` 안에서만 책임 분리, root 재배치는 제외 |

## 약한 출처와 제외

- 최근 SEO성 “2026 best structure” 글은 공식성이나 검증 가능성이 낮아 주요 근거로 쓰지 않았다.
- Reddit/커뮤니티 의견은 이번 구현 근거가 아니라 보조 신호로만 보았다.

## 계획 영향

- 전체 루트 폴더를 즉시 재배치하지 않는다.
- 현재 가장 직접적인 문제인 `workspace-health` 단일 파일 구조를 책임별 package module로 분리한다.
- 기존 운영 명령을 깨지 않기 위해 `_tools/workspace-health/src/workspace_health.py`는 wrapper로 남긴다.

## 불확실성

- Python import resolution에서 같은 `src` 아래 `workspace_health.py`와 `workspace_health/` package가 공존할 때 package가 우선 import되는지 로컬 smoke test로 확인했다. wrapper는 `workspace_health.cli`를 import해도 package를 찾을 수 있다.
