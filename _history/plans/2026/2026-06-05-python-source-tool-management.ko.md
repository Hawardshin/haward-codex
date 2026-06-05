# Python Source Tool Management 계획

## 목표

Tool Studio의 `툴 만들기` 화면에서 Python tool을 만들 때 필요한 package/source/pyproject 정보를 한 하위 작업대에서 명확하게 관리하게 한다.

## 단계

1. 현재 Tool Studio build mode, CSS, static test 구조를 확인한다.
2. Python source metadata를 blueprint에 추가한다.
3. build mode에 source manager UI, target 선택, copy source plan action을 추가한다.
4. 요구사항, spec, traceability, validation 기록을 갱신한다.
5. static test, check, customer build, performance budget, Browser smoke로 검증한다.
6. 평가와 request trace를 남기고 commit/push한다.

## 구현 기준

- 한 화면에 여러 기능을 섞지 않고 source/package 관리 하위 작업대에 집중한다.
- 실제 설치/빌드는 하지 않고 사용자가 확인할 수 있는 명령과 계획을 제공한다.
- 버튼은 44px 계열 control target을 유지하고 좁은 화면에서 한 열로 접힌다.
- 긴 파일 경로와 명령어가 수평 overflow를 만들지 않아야 한다.
