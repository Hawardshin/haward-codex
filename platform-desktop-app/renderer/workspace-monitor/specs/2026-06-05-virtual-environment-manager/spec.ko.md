# Virtual Environment Manager 스펙

## 요구사항

- REQ-WM-053: Tool Studio `파이썬 환경` 화면 안에서 가상환경 lifecycle 관리를 별도 패널로 제공해야 한다.

## 사용자 결과

- 사용자는 가상환경만 다루는 `가상 환경만 관리` 패널을 본다.
- create, activate, install, freeze, rebuild 단계 중 하나를 선택한다.
- 선택 단계에 맞는 command, 설명, 검증 evidence를 확인한다.
- `터미널 열기`, `명령 복사`, `workflow 복사` 액션을 분리해서 사용한다.
- 860px 이하 화면에서는 단계 버튼과 액션 버튼이 한 열로 접혀 수평 overflow를 만들지 않는다.

## 비목표

- 실제 `.venv` 생성 또는 삭제 실행
- dependency resolver 구현
- lockfile diff viewer 구현
- Windows PowerShell activation 명령 자동 분기
