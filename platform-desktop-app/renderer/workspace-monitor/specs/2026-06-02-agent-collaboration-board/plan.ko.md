# 계획: 에이전트 협업 작업판

## 작업 모드

- `governance`

## 계획

1. 웹 검색으로 multi-agent tracing/workflow UI 패턴을 확인한다.
2. 기존 Workspace Monitor의 agent/task snapshot 구조를 검토한다.
3. collector에서 `collaborationBoard`를 생성한다.
4. snapshot TypeScript 타입과 collector 테스트를 갱신한다.
5. Agents 탭에 협업 lane과 agent-task-project 흐름도를 추가한다.
6. 요구사항, README, 히스토리, 평가를 갱신한다.
7. 테스트, 타입 검사, build, evaluator로 검증한다.

## 결정

- 실시간 처리는 후속으로 둔다.
- 현재는 정적 snapshot에서 “현재/최근 coordination 상태”를 보여준다.
- 사용자가 나중에 여러 에이전트/병렬 작업을 추가하면 같은 UI가 자동으로 lane과 flow에 반영된다.
