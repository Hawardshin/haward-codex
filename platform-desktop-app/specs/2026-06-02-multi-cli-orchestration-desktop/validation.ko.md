# 다중 CLI 오케스트레이션 데스크톱 검증

## 명령

```bash
python3 -m json.tool agent-platform/configs/integrations/cli-adapter-registry.json
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/user-flow-registry.json
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-evaluation-input.json
git diff --check
```

## 수동 확인

- 실제 dependency 설치가 없음을 확인한다.
- 실제 CLI 실행 구현이 없음을 확인한다.
- public installer readiness를 주장하지 않는다.

## 결과

- `check-config-contract`: `self_documenting`
- `npm --prefix platform-desktop-app run check`: `ready_for_dependency_install_audit`, Rust toolchain 설치 경고 있음
- `npm --prefix platform-desktop-app test`: 6 tests passed
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`
- `check-cli-pipeline`: `pipeline_ready`

## Supervisor MVP 1 추가 검증

```bash
npm --prefix workspace-monitor run check
npm --prefix workspace-monitor test
npm --prefix workspace-monitor run build
npm --prefix platform-desktop-app test
npm --prefix platform-desktop-app run check
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/user-flow-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-cli-pipeline.json
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-desktop-cli-supervisor-mvp.json
git diff --check
```

예상 결과:

- Workspace Monitor TypeScript check, unit tests, static build가 통과해야 한다.
- `platform-desktop-app` Node tests는 7 tests passed여야 한다.
- `platform-desktop-app run check`는 `ready_for_dependency_install_audit`를 유지하되 Rust toolchain warning을 낼 수 있다.
- view mode registry는 `desktop` section을 모든 mode에 포함해야 한다.
- omission, resource, grounding, cli pipeline check는 각각 ready 상태여야 한다.
- Rust compile, `tauri:dev`, `tauri:build`는 Rust toolchain 미설치 상태에서 검증하지 않는다.

## Pipe Session / Source Editor MVP 2 추가 검증

```bash
npm --prefix workspace-monitor run check
npm --prefix workspace-monitor test
npm --prefix workspace-monitor run build
npm --prefix platform-desktop-app test
npm --prefix platform-desktop-app run check
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-cli-pipeline.json
```

예상 결과:

- Workspace Monitor check/test/build가 통과해야 한다.
- `platform-desktop-app` Node tests는 새 command 이름을 확인해야 한다.
- readiness check는 session/editor command 이름, human decision inbox persistence, Desktop tab inbox item count 표시를 확인해야 한다.
- readiness check는 setup guide, 작업 모드 프리셋, decision inbox 조회/답변 command와 UI 문자열을 확인해야 한다.
- readiness check는 `answer_and_resume_human_decision` command와 `Answer & Resume` UI 문자열을 확인해야 한다.
- readiness check는 reference-app UI 적용 문자열인 `Command Palette`, `Capability Center`, `Run Board`, process graph, terminal event, decision replay, `Source Review`, `Evidence / Promotion`을 확인해야 한다.
- Rust compile과 Tauri dev/build는 Rust toolchain 설치 전에는 검증하지 않는다.
- source editor는 `_private/`, `outputs/`, workspace 밖 경로, symlink escape를 차단하고 저장 전 backup을 만드는 계약을 가져야 한다.
- defer command는 감지된 질문을 `_ops/coordination/human-decision-inbox.json`에 중복 없이 append하는 계약을 가져야 한다.
- decision answer command는 선택된 decision의 status를 `answered`로 바꾸고 answer와 decision_history를 저장하는 계약을 가져야 한다.
- answer-and-resume command는 session metadata가 있는 decision에서 answer 저장 후 같은 답변을 linked active CLI session stdin으로 보내고 session report를 갱신하는 계약을 가져야 한다.
