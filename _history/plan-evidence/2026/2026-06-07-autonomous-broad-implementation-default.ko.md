# 계획 근거: 자율 넓은 구현 기본값

- 공식 근거: OpenAI Codex 문서는 `AGENTS.md`가 저장소 안에서 Codex에게 탐색, 테스트, 프로젝트 관행을 알려주는 지침 표면이라고 설명한다.
- 공식 근거: GitHub Docs는 저장소 custom instruction이 반복 입력 없이 저장소 맥락의 응답을 조정하는 데 쓰인다고 설명한다.
- 내부 근거: 기존 지속 지침에는 큰 범위 작업을 회피하지 말고 decomposition으로 실행하라는 규칙이 있었지만, 반복 후속 구현 명령을 명시적으로 넓은 multi-slice loop로 해석하는 규칙은 없었다.
- 결정: 새 규칙은 별도 workflow 신설보다 기존 large-scope decomposition 규칙 바로 옆에 추가해 후속 구현 지시와 넓은 범위 실행 정책이 함께 읽히게 한다.
