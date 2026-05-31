# 계획: 병렬 조사 merge gate

## 모드

- 작업 모드: `governance`
- 이유: 공통 운영 규칙, planner, template, docs가 바뀐다.

## 단계

1. 웹 검색으로 fan-out/fan-in, map/reduce, job dependency 패턴을 확인한다.
2. `REQ-WS-024`와 변경/검토 기록을 추가한다.
3. `parallel_work.py`에 merge gate 모델과 검증을 추가한다.
4. 템플릿을 병렬 조사 lane과 `research-synthesis` 구조로 바꾼다.
5. 테스트와 운영 문서를 갱신한다.
6. 전체 검증, 평가, 커밋, push를 수행한다.

## 결정

- merge gate는 실행 엔진이 아니라 dependency graph 위의 검증 계약이다.
- 병렬 조사는 가능하지만 구현은 합성 결과가 나온 뒤 시작한다.
