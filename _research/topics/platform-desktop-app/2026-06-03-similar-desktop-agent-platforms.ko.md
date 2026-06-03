# 유사 데스크톱 에이전트 플랫폼 심층 조사

- 작성일: 2026-06-03
- 대상 프로젝트: `platform-desktop-app/`
- 사용자 요청: 현재 데스크톱 플랫폼과 유사한 제품을 깊게 조사한 뒤, 각 플랫폼의 장점을 현재 제품에 녹인다.
- 결과 산출물: `platform-desktop-app/configs/reference-platform-advantage-registry.json`

## 결론

현재 제품은 “모니터링 사이트”가 아니라 설치형 에이전트 작업 플랫폼으로 재정의되어야 한다. 강한 레퍼런스의 공통점은 하나의 긴 웹 화면이 아니라, 데스크톱 워크벤치 안에서 파일, 코드, 터미널, 에이전트 작업, 권한, 검증, 히스토리, 설정을 분리된 도구창과 작업 루프로 다룬다는 점이다.

이번 조사의 제품 반영 방향은 다음 5개다.

1. VS Code/IntelliJ/OpenHands식 워크벤치 구조: 단일 activity rail, 파일/소스 중심 작업대, 하단 터미널/출력 panel.
2. Cursor/GitHub Copilot/Claude식 비동기 에이전트 작업 생명주기: 작업 시작, 격리 작업공간/브랜치, 상태, follow-up, takeover, 검증, diff/PR/commit handoff.
3. Windsurf/Devin/Claude/OpenCode식 규칙 체계: rules, memories, workflows, skills, agents를 구분하고 설정 팝업/탭에서만 다루게 한다.
4. Claude/OpenHands/Cline/OWASP/MCP식 권한과 보안 경계: pre-tool hook, permission, checkpoint, rollback, least privilege, untrusted content label.
5. Docker Desktop/GitHub Desktop/Raycast식 네이티브 제품 UX: one-click setup, settings/troubleshoot/update, visual change confirmation, command palette, extension/adapter catalog.

## 소스 랭킹

강한 근거:

- VS Code 공식 UI 문서: Activity Bar와 Panel의 역할을 확인했다. https://code.visualstudio.com/docs/editing/userinterface
- IntelliJ Platform 공식 UI 문서: tool windows, editor area, status bar, tabs, split view를 확인했다. https://plugins.jetbrains.com/docs/intellij/ui-overview.html
- GitHub Copilot cloud agent 공식 문서: repository research, plan, branch changes, PR lifecycle, background work, metrics를 확인했다. https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
- GitHub Copilot risk 문서: prompt injection, tool control, untrusted events, human approval boundaries를 확인했다. https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations
- Claude Code 공식 문서: terminal/desktop/web/IDE surface, MCP, hooks, skills, subagents, scheduled tasks, multiple sessions를 확인했다. https://code.claude.com/docs/en/overview
- Claude Code subagents/hooks/MCP 문서: 별도 context, scoped tools, permission decision, MCP trust를 확인했다. https://code.claude.com/docs/en/sub-agents / https://code.claude.com/docs/en/hooks / https://code.claude.com/docs/en/mcp
- OpenHands docs: chat, changes, embedded VS Code, terminal, app, browser lanes와 SDK/tool/runtime 방향을 확인했다. https://docs.openhands.dev/openhands/usage/key-features / https://docs.openhands.dev/sdk
- Cline docs: editor/terminal agent, file/command/browser tools, explicit approval, checkpoints, agent teams를 확인했다. https://docs.cline.bot/cline-overview
- Devin Desktop Cascade docs: Memories, Rules, Workflows, Skills, AGENTS.md의 역할 분리를 확인했다. https://docs.devin.ai/desktop/cascade/memories
- Tauri docs: sidecar, permission, signing/distribution boundary를 확인했다. https://v2.tauri.app/develop/sidecar/ / https://v2.tauri.app/distribute/
- OWASP LLM01: prompt injection, indirect injection, least privilege, human approval, external content separation을 확인했다. https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- MCP security best practices: confused deputy, token passthrough, SSRF, local server compromise, scope minimization을 확인했다. https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices

중간 근거:

- Cursor docs는 direct open 시 redirect/빈 본문이 있었고, 검색 캐시에서 Agent overview/background agents 내용을 확인했다. 따라서 제품 패턴에는 반영하되, 사실 주장에는 중간 신뢰도로 표시했다. https://docs.cursor.com/en/agent/overview / https://docs.cursor.com/background-agent
- Raycast/Docker/GitHub Desktop docs는 네이티브 앱 UX 참고로 사용했다. https://manual.raycast.com/extensions / https://docs.docker.com/desktop/ / https://docs.github.com/desktop

약한 근거 또는 참고만 한 소스:

- Reddit/community 글은 adoption/friction signal로만 보았고 제품 결론의 직접 근거로 쓰지 않았다.
- PDF/블로그/비공식 비교 문서는 추가 발견에는 유용하지만, 이번 구현 기준은 공식 문서와 오픈소스 문서 위주로 제한했다.

## 제품군별 장점

### VS Code / IntelliJ

핵심 장점은 navigation, file explorer, editor, tool windows, bottom terminal/output, status bar가 역할별로 분리된 데스크톱 워크벤치다. 현재 플랫폼에 이미 activity rail, workspace explorer, Monaco source editor, terminal drawer가 있으므로, 이를 “모니터 탭”이 아니라 작업 중심 shell의 기본 뼈대로 강화해야 한다.

적용:

- `workbench-activity-rail-editor-terminal`
- 하나의 sidebar만 유지하고, 중복처럼 보이는 좌우 탭 구조를 줄인다.
- 터미널은 아래에서 올라오는 panel 또는 전체 overlay로 유지한다.

### Cursor / GitHub Copilot cloud agent

핵심 장점은 에이전트 작업을 독립 세션/백그라운드 task로 다룬다는 점이다. GitHub Copilot cloud agent는 repository research, plan, branch changes, PR handoff를 명확히 보여준다. Cursor background agents는 상태 보기, follow-up, takeover, isolated machine setup, branch handoff가 강점이다.

적용:

- `background-agent-task-lifecycle`
- task-run record에 workspace, CLI lane, stdout/stderr, validation, evidence, handoff를 저장한다.
- 다음 P0는 branch/workspace isolation UI, takeover, follow-up prompt, PR/commit handoff다.

### Claude Code / OpenHands / Cline

핵심 장점은 hooks, permission, subagents, skills, tool approval, changes tab, embedded editor/terminal/browser lane이다. 특히 Cline의 explicit approval, Claude hooks의 allow/deny/ask/defer 모델, OpenHands의 changes/editor/terminal/app/browser 분리는 데스크톱 플랫폼에 직접 적용 가능하다.

적용:

- `permission-hooks-checkpoints`
- `agent-factory-subagents`
- `embedded-editor-diff-review`
- 권한 팝업, pre-tool hook registry, checkpoint list, rollback action을 P0로 남긴다.

### Windsurf / Devin Desktop

핵심 장점은 Memories, Rules, Workflows, Skills를 분리해서 사용자가 “어디에 무엇을 저장해야 하는지” 알 수 있게 하는 점이다. 현재 사용자가 설정과 init이 어렵다고 지적했으므로, 설정 버튼 하나 안에서 provider, workspace, rules, memory, workflow, skill, permission을 탭으로 분리하는 방향이 맞다.

적용:

- `rules-memory-workflows-skills`
- Agent Factory wizard는 AGENTS.md/rules/skills/workflows를 분리 저장해야 한다.

### Docker Desktop / GitHub Desktop / Raycast / Discord

Docker Desktop은 설치, settings, troubleshooting, update, integrated terminal, extension을 네이티브 앱으로 묶는다. GitHub Desktop은 branch/commit/push/pull/PR를 visual confirmation 중심으로 단순화한다. Raycast는 command palette와 extensions로 기능 진입 비용을 낮춘다. Discord식 spaces/channels는 여러 작업과 결정함을 분리하는 참고 구조다.

적용:

- `native-install-runtime-boundary`
- `command-palette-extension-catalog`
- `workspace-spaces-and-decision-inbox`

## 아키텍처 선택

옵션 A: 기존 `product-feature-registry.json`에 레퍼런스 패턴을 직접 섞는다.

- 장점: 파일 수가 적다.
- 단점: 제품 기능과 외부 레퍼런스 근거/적용 상태가 섞여 추적성이 낮아진다.

옵션 B: 별도 `reference-platform-advantage-registry.json`를 만들고 snapshot/UI에서 제품 기능 패널에 연결한다.

- 장점: 출처, 신뢰도, 장점, 적용 상태, 구현 목표를 분리해 관리할 수 있다.
- 단점: collector/type/UI/test를 추가해야 한다.

선택: 옵션 B. 조사 결과는 독립 레지스트리로 두고, Overview 제품 패널에서 바로 노출한다.

## 구현에 반영한 항목

- `platform-desktop-app/configs/reference-platform-advantage-registry.json`: 4개 플랫폼 그룹, 24개 근거 링크, 13개 전환 패턴.
- `referencePlatformAdvantages` snapshot: summary, reference links, platform groups, transfer patterns.
- customer snapshot redaction: 내부 source path와 reference links를 제거하고 제품 요약만 남기도록 설계.
- Overview 제품 패널: “레퍼런스 장점 적용 지도”를 추가해 `applied`, `contract`, `p0 queued` 상태를 노출.
- readiness/test: 새 registry, collector, UI token을 회귀 검사에 추가.

## 남은 P0

- 권한/훅/체크포인트를 실제 네이티브 permission dialog와 rollback store로 연결.
- background agent task lifecycle에 branch/workspace isolation, takeover, follow-up, PR/commit handoff 추가.
- command palette와 adapter/extension catalog 구현.
- 설정 팝업을 provider/workspace/rules/memory/workflows/skills/permissions 탭으로 재구성.

## Skeptic Review

- Cursor 문서는 direct fetch가 빈 본문으로 돌아와 검색 캐시를 사용했다. 따라서 Cursor 기반 세부 기능은 중간 신뢰도로 기록했다.
- “Discord식” 패턴은 공식 개발 문서보다 일반 UX 패턴 참고에 가깝다. 이번 레지스트리에서는 spaces/decision inbox 수준의 보조 패턴으로만 반영했다.
- 오픈소스 엔진을 실제로 설치/번들하지 않았다. 현재는 적용 후보와 제품 패턴으로 정리했으며, 실제 설치 전에는 license/security/dependency audit가 필요하다.
- 고객용 앱에 내부 연구 링크가 과하게 노출되지 않도록 customer snapshot sanitizer를 추가했지만, 최종 public release 전 customer bundle audit가 필요하다.
