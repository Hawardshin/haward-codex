# Evaluation: AgentCore Blueprint Transfer

## 완료 기준 점검

- 사용자 제공 repo를 웹 우선으로 확인했다.
- 공식 AWS docs와 repo README/license를 근거로 삼았다.
- AgentCore를 optional deployment adapter로 유지했다.
- 샘플 소스 코드를 복사하지 않았다.
- Agents 화면에 실제 blueprint UI를 추가했다.
- Blueprint 적용 시 runnable input과 Agent Factory input을 변경한다.
- Readiness/test가 누락을 잡도록 갱신했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- Config contract checks: 통과
- Browser smoke: 통과. `Production 에이전트 블루프린트`가 보이고, Memory blueprint 적용 후 Search Agent Work Chat과 Agent Factory 입력값이 바뀌는 것을 확인했다.

## 남은 위험

- AWS AgentCore CLI 설치, AWS credentials, Bedrock model access는 사용자가 선택할 때 별도 setup/preflight가 필요하다.
- 공개 배포는 signing/notarization/updater/clean-machine smoke가 여전히 차단 상태다.
