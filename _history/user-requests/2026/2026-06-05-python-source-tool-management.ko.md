# 사용자 요청 요약: Python source 기반 tool 만들기

## 요청

- Tool Studio에서 툴을 쉽게 만들 수 있게 한다.
- Python source를 관리하기 쉬운 방식으로 보여준다.
- 한 탭에 여러 기능을 섞지 않고 기능별로 명확하게 분리한다.

## 해석

- `툴 만들기` 화면 내부에 Python package/source/pyproject 전용 하위 작업대를 추가한다.
- 실제 file write나 dependency install은 별도 실행 경계로 남기고, source path와 command plan을 먼저 명확하게 한다.
