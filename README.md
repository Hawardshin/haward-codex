# Codex Agent Workspace

이 저장소는 개인 에이전트 구축 플랫폼과 관련 프로젝트를 장기적으로 관리하는 작업 공간이다.

## 운영 원칙

- 모든 작업 산출물은 이 저장소의 git 이력으로 추적한다.
- 의미 있는 변경 단위가 끝날 때마다 커밋한다.
- 여러 프로젝트는 저장소 최상단의 개별 폴더로 관리한다.
- 공통 문서, 템플릿, 보관 자료처럼 프로젝트가 아닌 폴더는 `_` 접두어를 사용한다.

## 최상단 폴더 규칙

프로젝트 폴더는 루트에 직접 만든다.

```text
codex/
  agent-platform/
  browser-agent/
  research-agent/
  _docs/
  _templates/
  _archive/
```

프로젝트 폴더 이름은 다음 규칙을 따른다.

- `kebab-case`를 사용한다.
- 목적이 드러나는 짧은 이름을 쓴다.
- 실험용 프로젝트는 `experiment-` 접두어를 붙인다.
- 더 이상 진행하지 않는 프로젝트는 `_archive/`로 옮긴다.

## 예약 폴더

- `_docs/`: 저장소 전체 운영 문서와 의사결정 기록
- `_templates/`: 새 프로젝트를 만들 때 복사할 기본 구조
- `_archive/`: 중단, 폐기, 보류된 프로젝트

## 새 프로젝트 기본 구조

```text
project-name/
  README.md
  docs/
  src/
  tests/
```

프로젝트 성격에 따라 `src/`와 `tests/`가 필요 없을 수 있지만, `README.md`는 반드시 둔다.

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

