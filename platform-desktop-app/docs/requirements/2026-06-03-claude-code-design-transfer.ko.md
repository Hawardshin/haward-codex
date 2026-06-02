# Claude Code 공개 설계 전이 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-031 | 플랫폼은 Claude Code 관련 개선을 공개 공식 또는 검증 가능한 출처로만 근거화해야 하며, 유출/비공개 자료를 설계 근거로 사용하지 않아야 한다. | must | registry `source_boundary.policy`와 web-search 기록 확인 |
| REQ-PDA-032 | Claude Code에서 차용할 설계 패턴은 전이 원칙, 플랫폼 mapping, 구현 target, risk controls를 함께 가져야 한다. | must | `claude-code-design-transfer-registry.json` `transfer_patterns` 확인 |
| REQ-PDA-033 | Workspace Monitor는 공개 설계 전이 상태와 패턴 수를 snapshot과 Overview UI에 표시해야 한다. | must | collector test, `npm --prefix workspace-monitor run build` |
| REQ-PDA-034 | Claude Code CLI는 platform host가 아니라 optional guest adapter로 유지되어야 한다. | must | README, registry, readiness check 확인 |
| REQ-PDA-035 | 다음 단계 후보는 plan gate, permission summary, hook registry, worktree-aware parallel lane처럼 risk control이 선행되는 작은 단위로 남겨야 한다. | should | architecture doc, spec tasks, omission check 확인 |
