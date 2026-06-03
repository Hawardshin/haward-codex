# Evaluation: Local Agent Execution Boundary

날짜: 2026-06-04
요청 ID: UR-2026-06-04-010

## 결과

통과. AgentCore-style blueprint는 이제 Lambda/cloud function 실행 호스트가 아니라 로컬 Python/process runtime 실행 경계를 명시한다.

## 구현 확인

- `Gateway Tool Agent` UI 설명에서 Lambda 실행 호스트 오해를 제거했다.
- `buildAgentFactoryFormFromAgentCoreBlueprint`가 `local_python_agent_runtime`과 `local_process_execution`을 proposal tools에 포함한다.
- Guardrail이 로컬 실행, remote connector, optional AgentCore adapter를 구분한다.
- Service readiness에 `local_python_execution_boundary` check가 추가됐고 통과했다.

## 검증 결과

- 통과: `corepack pnpm --filter workspace-monitor run check`
- 통과: `corepack pnpm --filter workspace-monitor test`
- 통과: `corepack pnpm --filter workspace-monitor run build:customer`
- 통과: `corepack pnpm --filter platform-desktop-app test`
- 통과: `corepack pnpm --filter platform-desktop-app run check`
- 통과: product/user-flow/service-readiness/reference config contract checks
- 통과: Browser smoke, screenshot `outputs/local-agent-execution-boundary-smoke.png`

## 재작업 사항

- 첫 platform check에서 새 readiness gate가 정확한 registry 문구를 찾지 못해 실패했다.
- Service readiness registry 문구를 `local Python execution`으로 맞춘 뒤 재검증을 통과했다.

## 남은 리스크

- Public desktop release는 여전히 signing, notarization, updater, clean-machine smoke gate가 남아 있다.
- Remote APIs/cloud functions는 connector로 사용할 수 있으므로 권한/출처/기록 정책은 계속 필요하다.

