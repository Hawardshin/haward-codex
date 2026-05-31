# Codex Agent Workspace

이 저장소는 개인 에이전트 구축 플랫폼과 관련 프로젝트를 장기적으로 관리하는 작업 공간이다.

## 운영 원칙

- 모든 작업 산출물은 이 저장소의 git 이력으로 추적한다.
- 의미 있는 변경 단위가 끝날 때마다 커밋한다.
- 커밋이 만들어지면 바로 원격 저장소에 push한다.
- 여러 프로젝트는 저장소 최상단의 개별 폴더로 관리한다.
- 공통 문서, 템플릿, 보관 자료처럼 프로젝트가 아닌 폴더는 `_` 접두어를 사용한다.
- 반복되는 작업은 필요한 경우 스킬, 도구, 템플릿으로 승격한다.
- 긴 대화에서 중요한 결정과 작업 내용은 저장소 문서와 히스토리 로그로 압축한다.

## 최상단 폴더 규칙

프로젝트 폴더는 루트에 직접 만든다.

```text
codex/
  agent-platform/
  browser-agent/
  research-agent/
  _docs/
  _history/
  _skills/
  _templates/
  _tools/
  _archive/
```

프로젝트 폴더 이름은 다음 규칙을 따른다.

- `kebab-case`를 사용한다.
- 목적이 드러나는 짧은 이름을 쓴다.
- 실험용 프로젝트는 `experiment-` 접두어를 붙인다.
- 더 이상 진행하지 않는 프로젝트는 `_archive/`로 옮긴다.

## 예약 폴더

- `_docs/`: 저장소 전체 운영 문서와 의사결정 기록
- `_history/`: 날짜별 작업 히스토리와 요약
- `_skills/`: git으로 추적할 커스텀 Codex 스킬 원본과 레지스트리
- `_templates/`: 새 프로젝트를 만들 때 복사할 기본 구조
- `_tools/`: 여러 프로젝트에서 재사용할 로컬 도구와 스크립트
- `_archive/`: 중단, 폐기, 보류된 프로젝트

## 새 프로젝트 기본 구조

```text
project-name/
  README.md
  artifacts/
  docs/
  src/
  tests/
```

프로젝트 성격에 따라 `src/`와 `tests/`가 필요 없을 수 있지만, `README.md`는 반드시 둔다.

## 문서와 산출물 형식

- Markdown은 규칙, 로그, 결정 기록, 간단한 설명에 기본으로 사용한다.
- HTML은 대시보드, 시각적 보고서, 제품 명세, 리뷰 가능한 산출물처럼 브라우저에서 보는 편이 나은 경우 적극 검토한다.
- 프로젝트별 HTML 산출물은 기본적으로 `project-name/artifacts/` 아래에 둔다.
- 장기적으로 재사용할 HTML 패턴은 `_templates/html-artifact/`에 템플릿으로 정리한다.

## 작업 히스토리

- 날짜별 작업 로그는 `_history/YYYY/YYYY-MM-DD.md`에 기록한다.
- 로그에는 목적, 변경 파일, 주요 결정, 커밋 해시를 남긴다.
- 컨텍스트가 길어지면 대화 내용을 요약해 히스토리와 관련 프로젝트 문서에 반영한다.

## 스킬과 도구 승격 기준

- 반복되는 판단 절차나 도메인 지식은 스킬 후보로 본다.
- 반복 실행되는 명령, 변환, 검증, 생성 작업은 도구 후보로 본다.
- 새 스킬 원본은 `_skills/`에, 재사용 도구는 `_tools/`에 추적한다.
- 실제 Codex 스킬 설치가 필요하면 `$CODEX_HOME/skills`에 반영하되, 원본은 이 저장소에서 관리한다.

## 커밋 규칙

커밋 메시지는 다음 형식을 기본으로 한다.

```text
type(scope): summary
```

예시:

- `docs(workspace): define project folder rules`
- `feat(agent-platform): add first workflow runner`
- `fix(browser-agent): handle empty page title`

권장 타입:

- `docs`: 문서 변경
- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 구조 개선
- `test`: 테스트 추가 또는 수정
- `chore`: 설정, 빌드, 기타 관리 작업

커밋 후에는 별도 지시가 없어도 즉시 `origin/main`에 push한다.
