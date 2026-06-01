# CLI 어댑터 정책

## 목적

이 플랫폼은 설치형으로 발전하더라도 특정 CLI에 종속되지 않는다. 플랫폼은 작업 공간, 히스토리, 문서, 평가, 설정, UI, 운영 원칙을 제공하고, Codex CLI, Claude Code, Cursor, GitHub CLI, package manager, 배포 CLI 같은 외부 명령은 필요할 때 교체 가능한 adapter로 사용한다.

## 핵심 원칙

- 설치형 앱은 열리고 읽히고 탐색되는 데 특정 외부 CLI를 요구하지 않는다.
- CLI는 플랫폼의 본체가 아니라 추가 능력이다.
- 플랫폼 코어는 “무엇을 하려는지”와 출력 계약을 소유하고, CLI adapter는 그것을 provider별 명령으로 번역한다.
- CLI adapter는 availability check, version check, permission scope, timeout, 출력 계약, fallback을 가져야 한다.
- missing CLI는 전체 플랫폼 실패가 아니라 `capability_missing`으로 처리한다.
- shell string 대신 argv-style 실행, 명시적 cwd, timeout, 환경변수 allowlist, stdout/stderr redaction을 기본으로 한다.
- 여러 CLI를 한 번에 실행하면 shell string pipeline이 아니라 process graph로 모델링한다. 각 CLI는 process node, stdout/stderr/stdin 연결은 pipe edge, fan-in은 merge strategy로 기록한다.
- desktop shell에서 로컬 명령을 실행하면 command allowlist, workspace path allowlist, 사용자 승인/설정 경계를 먼저 문서화한다.
- CLI가 required, bundled, global install, auto-install 대상이 되면 설치 감사 계획과 rollback을 먼저 남긴다.

## Source Of Truth

- CLI adapter registry: `agent-platform/configs/integrations/cli-adapter-registry.json`
- CLI pipeline template: `agent-platform/configs/integrations/cli-pipeline-template.json`
- 설치형 앱 경계: `platform-desktop-app/configs/desktop-distribution-registry.json`
- 설치 감사: `_ops/workflows/58-installation-record.md`
- 제품화 정책: `_docs/policies/installable-software-policy.ko.md`

## 적용 예

- AI assistant CLI: Codex, Claude Code, Cursor, Antigravity는 실행 provider로 붙일 수 있지만 플랫폼 원칙의 원본이 아니다.
- Git/GitHub CLI: history와 remote 작업을 도울 수 있지만 문서/히스토리 탐색 자체가 `gh`에 의존하면 안 된다.
- package manager: 설치나 검증에 사용할 수 있지만 dependency 상태가 바뀌면 설치 감사 기록이 필요하다.
- deployment CLI: Vercel, Docker, cloud CLI는 배포 adapter가 될 수 있지만 credential, target, rollback, preview 경계가 있어야 한다.
- multi-CLI pipeline: source collector, planner, document converter 같은 여러 CLI를 연결할 수 있지만 `cli-pipeline-agent`가 process graph, pipe edge, timeout, output bound, cleanup, merge strategy를 먼저 확인해야 한다.

## 검증

중요한 CLI adapter 설정을 만들거나 바꾸면 다음을 실행한다.

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-pipeline-template.json
PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json
```
