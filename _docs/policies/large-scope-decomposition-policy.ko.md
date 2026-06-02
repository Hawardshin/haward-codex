# Large Scope Decomposition Policy

큰 작업은 큰 컨텍스트로 밀어붙이지 않는다. 범위가 너무 크거나 파일이 너무 많으면 먼저 작업을 줄이고, 쪼개고, 검증 가능한 단위로 만든다.

## 정책

- “전체를 보고”, “모든 것 개선”, “소스가 너무 많다” 같은 요청은 `large-scope-decomposer-agent`를 먼저 사용한다.
- 모든 파일을 열기 전에 후보 파일 인벤토리와 제외 기준을 만든다.
- 대량 파생 파일, generated output, build/dist, vendor성 폴더는 기본적으로 제외하고 필요한 경우에만 샘플링한다.
- 대표 샘플은 이해를 위한 입력일 뿐 전체 검증이 아니다.
- 작업 slice는 `touch_paths`, 의존성, 산출물, 검증 계획을 가져야 한다.
- 병렬 작업은 slice가 만들어진 뒤에만 계획한다.
- 컨텍스트가 커지면 요약과 context archive를 남긴다.
- 최종 close-out에서는 누락 방지, 근거 확인, 평가를 수행한다.

## 관련 파일

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `agent-platform/configs/agents/large-scope-decomposer-agent.json`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
