# 평가: 오픈소스 Agent Platform Landscape

## 판정

충족. 현재 플랫폼 특징을 로컬 제품 레지스트리와 Tauri 설정 기준으로 정리했고, 유사 오픈소스를 여러 제품군으로 나눠 대량 조사했다.

## 증거

- 현재 플랫폼 특징 11개를 `Agent Workspace Platform`, Agent Core, CLI orchestration, work environment, development environment, root tool management, work visibility, learning/evaluation loop, observability support layer로 정리했다.
- 60개 이상의 오픈소스/인접 프로젝트를 coding agent, agent framework, builder, local desktop, workflow orchestration, developer platform, eval/observability, sandbox/runtime으로 분류했다.
- 현재 플랫폼의 차별 포지션을 "local Agent Workspace OS / Agent Workbench"로 정리했다.
- 다음 구현 후보를 guest CLI adapter cockpit, resident workspace prewarm, Agent Factory wizard, Decision Inbox, Run Record timeline, Provider Account Center, Evaluation cockpit으로 정리했다.

## 검증

- 웹 검색 기록 작성: `_history/web-searches/2026/2026-06-06-open-source-agent-platform-landscape.ko.md`
- 연구 보고서 작성: `_research/topics/platform-desktop-app/2026-06-06-open-source-agent-platform-landscape.ko.md`
- 누락 점검 작성: `_history/omission-checks/2026/2026-06-06-open-source-agent-platform-landscape.json`
- `git diff --check`: close-out에서 실행 대상.

## 빌드 판단

앱 source, Rust/Tauri runtime, renderer, package script는 변경하지 않았다. 이번 작업은 research/docs only이므로 internal desktop package build는 실행하지 않는다.

## 남은 리스크

- GitHub stars는 조사 시점 adoption signal이며 이후 바뀔 수 있다.
- API rate limit 때문에 일부 후반 후보의 metadata는 별도 재확인이 필요하다.
- 라이선스가 `NOASSERTION`, AGPL, fair-code인 프로젝트는 source copy나 dependency adoption 전 별도 license/security review가 필요하다.
