# Python Source Tool Management 스펙

## 요구사항

- REQ-WM-056: Tool Studio의 `툴 만들기` 화면은 Python tool source 관리를 별도 하위 작업대로 제공해야 한다.

## 사용자 결과

- 사용자는 `툴 만들기` 모드에서 template를 선택하면 package name, module name, `pyproject.toml`, console entry point, smoke test path를 바로 확인한다.
- 사용자는 `src/` 편집 대상 큐에서 현재 고칠 파일을 하나 선택할 수 있다.
- 사용자는 init/run/package command와 소스 checklist를 한 곳에서 확인하고, source plan JSON을 복사할 수 있다.
- 860px 이하 화면에서는 source file queue, pyproject, entry point, checklist, action 영역이 한 열로 접혀 수평 overflow를 만들지 않는다.

## 비목표

- 실제 Python 파일 자동 생성
- dependency 설치 또는 package build 실행
- 원격 registry 배포
- 브라우저 단독 source write
