# Core Feature Flow 스펙

## 요구사항

- REQ-WM-047: 목표 기반 작업 흐름 단계는 가능한 경우 실제 핵심 mode를 전환해야 한다.

## 사용자 결과

- 사용자는 `툴 만들기` 선택 후 `입력과 venv 확인`을 누르면 Tool Studio가 `파이썬 환경` mode로 전환되는 것을 본다.
- 사용자는 `검증 후 배포`를 누르면 Tool Studio가 `툴 배포` mode로 전환되는 것을 본다.
- 현재 단계는 `aria-current="step"`과 visual active 상태를 갖는다.

## 비목표

- 실제 Python 파일 생성/저장 실행
- Tool Studio mode별 세부 wizard 완성
- 모든 task intent의 deep mode 구현
