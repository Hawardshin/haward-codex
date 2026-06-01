# 계획: 모델별 프롬프팅 전략

## 작업 순서

1. 웹 검색으로 다중 샘플/반복 개선과 reasoning model prompting 근거를 확인한다.
2. `REQ-WS-044` 요구사항과 변경/검토 기록을 추가한다.
3. `ai-usage-gap-profile.json`에 모델 capability profile과 2-pass 정책을 추가한다.
4. 운영 모델, workflow, prompt, 지속 지시, 메모리 부트스트랩을 같은 규칙으로 갱신한다.
5. 연구 노트, 웹 검색 기록, 요청 요약, request trace, work summary, timing, evaluation을 남긴다.
6. JSON/config/docs/governance 검증을 실행하고 커밋/push한다.

## 근거

- `Self-Consistency Improves Chain of Thought Reasoning in Language Models`
- `Self-Refine: Iterative Refinement with Self-Feedback`
- `Reflexion: Language Agents with Verbal Reinforcement Learning`
- OpenAI reasoning best practices
- Microsoft Foundry prompt engineering guidance
