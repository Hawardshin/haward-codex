# Claude Code 공개 설계 패턴 전이

## 목적

이 문서는 Claude Code의 공개 공식 문서에서 확인되는 설계 패턴 중 이 플랫폼에 차용할 가치가 있는 요소를 정리한다. 유출 자료, 비공개 시스템 프롬프트, 내부 설계 문서, 검증 불가능한 스크린샷은 설계 근거로 사용하지 않는다.

## 채택 원칙

- 플랫폼은 Claude Code CLI를 복제하지 않는다. 설치형 앱은 platform-first host runtime이며 Claude Code CLI는 선택 가능한 guest adapter 중 하나다.
- 메모리와 지시는 행동을 유도하지만 강제 경계가 아니다. 파일 접근, 도구 실행, 훅, 커넥터, 파괴적 작업은 policy, allowlist, decision inbox, validation으로 통제한다.
- plan-before-edit, subagent isolation, skills, MCP, hooks 같은 패턴은 제품 코드보다 먼저 registry, workflow, tool, skill, task pipe 같은 작은 durable asset으로 전이한다.
- 여러 agent나 CLI lane이 동시에 움직이면 worktree, touch-path lock, merge gate, contradiction resolution을 먼저 기록한다.

## 즉시 반영한 것

- `platform-desktop-app/configs/claude-code-design-transfer-registry.json`에 공개 출처, 전이 원칙, 구현 타깃, 위험 통제를 기록했다.
- `workspace-monitor` snapshot에 `claudeCodeDesignTransfer`를 추가했다.
- Overview에 `Claude Code Design Transfer` 패널을 추가해 공개 출처 경계와 패턴 상태를 확인할 수 있게 했다.

## 다음 구현 후보

- Desktop task pipe에 Plan Gate 상태를 표시한다.
- CLI adapter와 connector 카드에 permission summary를 붙인다.
- Hook registry를 disabled-by-default로 설계하고 resource guard와 rollback을 필수화한다.
- Worktree-aware parallel lane 실행 옵션을 추가하기 전에 touch-path conflict warning을 먼저 구현한다.

## 검증

- registry는 `check-config-contract`를 통과해야 한다.
- Workspace Monitor collector/test/build가 `claudeCodeDesignTransfer` snapshot을 생성해야 한다.
- readiness check는 `public_sources_only`, `Permissioned Tool Execution`, `Plan Before Edit`, `Subagent Context Isolation`, `Skill On-Demand Packaging`을 확인해야 한다.
