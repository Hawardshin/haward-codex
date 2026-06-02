# 계획: Human Process Capability Promotion

## 요청 요약

사용자는 capability promotion과 아이디어 평가 흐름이 “직접 사람이 하는 것처럼” 동작해야 한다고 요청했다.

## 실행 계획

1. 웹 검색으로 human-centered design, human-AI task decomposition, design thinking, human-in-the-loop 근거를 확인한다.
2. 기존 `REQ-WS-070`, capability promotion registry, agent spec, policy, workflow, prompt를 확인한다.
3. 새 에이전트가 아니라 기존 capability promotion 계약에 `human_process_model`을 추가한다.
4. persistent instructions, 철학, governance 문서, README, 요구사항, 스펙을 갱신한다.
5. 검색/근거/계획/요청 추적/평가 산출물을 저장한다.
6. 검증 후 commit/push한다.

## 선택한 접근

“사람처럼”을 말투나 역할극이 아니라 작업 순서와 작업 흔적의 재현으로 해석했다. 따라서 자동 기능 후보는 먼저 사람의 직접 수행 모델을 만들고, 그 모델에서 반복되는 단계만 아이디어화하고 평가한다.

