# 요구사항 변경: 병렬 조사 merge gate

## 변경 ID

- `REQ-CHANGE-2026-06-01-PARALLEL-RESEARCH-MERGE-GATES`

## 배경

사용자는 하나의 작업이 끝나기 전에 다른 작업이 끝나지 않아 문제가 생길 수 있으며, 조사는 병렬 처리한 뒤 합치는 구조가 필요하다고 요청했다.

## 변경 사항

- `REQ-WS-024`를 추가한다.
- 여러 조사 lane이 같은 batch에서 병렬 실행되면 `merge_gates`를 요구한다.
- merge gate는 `wait_for`, `merge_task_id`, `merge_outputs`, `acceptance_checks`를 가진다.
- downstream 구현은 partial 조사 note가 아니라 merge task의 synthesis output에 의존해야 한다.

## 검증

- `plan-parallel-work`가 parallel research lanes without merge gate를 gap으로 처리한다.
- merge task가 모든 `wait_for` task에 dependency를 갖는지 검사한다.
- 템플릿은 공식 문서 조사, 커뮤니티 신호 조사, 오픈소스 참고 조사 후 `research-synthesis`를 거쳐 구현한다.
