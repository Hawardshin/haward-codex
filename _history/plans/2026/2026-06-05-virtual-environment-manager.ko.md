# Virtual Environment Manager 계획

## 목표

- Tool Studio `파이썬 환경` 안에 가상환경 lifecycle 관리 패널을 추가한다.

## 단계

1. 공식 Python venv, Python Packaging, pip freeze 문서 확인
2. create/activate/install/freeze/rebuild 단계 모델 정의
3. React/CSS/static test 구현
4. 요구사항, 스펙, 이력 기록 추가
5. check/build/Browser smoke 검증
6. 평가, 요청 추적, 작업 요약 후 commit/push

## 검증 게이트

- static test가 lifecycle step/action/data marker를 고정해야 한다.
- `workspace-monitor check`와 `build:customer`가 통과해야 한다.
- desktop/mobile smoke에서 수평 overflow가 없어야 한다.
