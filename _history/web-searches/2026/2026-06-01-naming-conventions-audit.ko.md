# 웹 검색 기록: 네이밍 규칙과 감사

## 검색 목적

사용자의 “이름 구조 네이밍 규칙” 요청을 구현하기 전에, 저장소/소스/문서/커밋 네이밍 규칙을 어떻게 나누고 검증할지 외부 근거를 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `governance`

## 검색 쿼리

- `repository naming conventions folder file names kebab case docs monorepo best practices`
- `Google naming conventions file names project structure style guide`
- `monorepo naming conventions package folder names best practices`
- `Conventional Commits specification commit message naming`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Python Packaging User Guide, `src` layout vs flat layout, https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | 공식 문서 | Python importable package와 source layout의 경계 | Python package/module은 `snake_case`, tool folder는 `kebab-case`로 분리 |
| Google Style Guides, https://google.github.io/styleguide/ | 공식 스타일 가이드 모음 | 언어/프로젝트별 style guide를 유지하는 관행 | 네임스페이스별 규칙을 분리하고 ecosystem convention을 우선할 수 있게 함 |
| Conventional Commits 1.0.0, https://www.conventionalcommits.org/en/v1.0.0/ | 명세 | `type(scope): summary` 형태의 commit message 구조 | 기존 git rule을 naming policy의 commit namespace에 명시 |
| Refactoring Guru, Refactoring, https://refactoring.guru/refactoring | 교육 자료 | 구조 개선은 외부 동작 보존이 중요 | 기존 durable path를 대량 rename하지 않고 새 규칙/audit부터 도입 |

## 약한 출처와 제외

- 일반 블로그의 “best naming” 글은 프로젝트 맥락 의존성이 커서 참고만 하고 규칙 근거로 쓰지 않았다.
- 커뮤니티 의견은 adoption 신호로만 보고 사실 근거로 사용하지 않았다.

## 계획 영향

- 하나의 전역 case style을 강제하지 않고, namespace별 규칙을 둔다.
- 새 naming source of truth는 `_ops/naming/naming-policy.json`에 둔다.
- 사람이 읽는 문서는 `_docs/governance/naming-governance.ko.md`와 `.en.md`로 만든다.
- 기계적으로 검증 가능한 규칙은 `_tools/naming-audit/`로 검사하고 `workspace-health`에 연결한다.

## 불확실성

- 기존 파일을 즉시 rename하면 링크와 snapshot이 깨질 수 있어 이번 작업은 규칙과 audit를 우선한다. 실제 rename은 별도 migration plan이 필요하다.
