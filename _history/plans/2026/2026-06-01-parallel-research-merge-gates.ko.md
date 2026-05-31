# 계획 기록: 병렬 조사 merge gate

## 요청

- 병렬 조사 lane을 실행한 뒤, 모든 결과를 기다려 합치는 구조를 마련한다.

## 조사와 근거

- GitHub Actions `needs`, Prefect concurrent work/task dependency, Airflow dynamic task mapping, LangGraph branching/reducer 문서를 확인했다.
- 공통 패턴은 fan-out으로 독립 작업을 실행하고, fan-in 단계에서 결과를 모아 downstream work를 release하는 것이다.

## 실행 계획

1. `REQ-WS-024`를 추가한다.
2. `ParallelMergeGate`를 구현한다.
3. 병렬 research lane이 merge gate 없이 실행되면 gap으로 처리한다.
4. merge task가 모든 `wait_for` task에 dependency를 갖는지 검사한다.
5. 템플릿과 문서를 `research-synthesis` 중심으로 갱신한다.

## 결정

- 구현은 partial research lane output에 의존하지 않는다.
- merge gate acceptance checks가 통과한 후에만 downstream implementation을 release한다.
