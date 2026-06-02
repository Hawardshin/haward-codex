# 다중 CLI 오케스트레이션 데스크톱 추적

| 항목 | 경로 |
| --- | --- |
| 공유 요구사항 | `_requirements/baselines/2026-05-31-workspace-platform.ko.md` |
| 요구사항 변경 | `_requirements/changes/2026-06-02-multi-cli-desktop-orchestration.ko.md` |
| 요구사항 검토 | `_requirements/reviews/2026-06-02-multi-cli-desktop-orchestration.ko.md` |
| 프로젝트 요구사항 | `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md` |
| UX 요구사항 | `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.ko.md` |
| 아키텍처 | `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.ko.md` |
| CLI registry | `agent-platform/configs/integrations/cli-adapter-registry.json` |
| Desktop registry | `platform-desktop-app/configs/desktop-distribution-registry.json` |
| User-flow registry | `platform-desktop-app/configs/user-flow-registry.json` |
| View mode registry | `agent-platform/configs/access/view-mode-registry.json` |
| Tauri backend | `platform-desktop-app/src-tauri/src/lib.rs` |
| Desktop UI | `workspace-monitor/components/MonitorShell.tsx` |
| 웹 검색 기록 | `_history/web-searches/2026/2026-06-02-multi-cli-desktop-orchestration.ko.md` |
| 평가 입력 | `_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-evaluation-input.json` |

## 요구사항 매핑

- `REQ-WS-085`: 네 CLI를 optional adapter로 두고 platform supervisor가 다중 실행과 데이터 축적을 소유한다.
- `PDA-REQ-014`: multi-CLI supervisor와 process graph.
- `PDA-REQ-015`: 질문 보류와 decision inbox.
- `PDA-REQ-016`: terminal output의 structured data 승격.
- `PDA-REQ-018`: allowlist CLI 탐지와 bounded health/version check.
- `PDA-REQ-019`: browser fallback degrade.
- `PDA-REQ-020`: allowlist CLI pipe session, stdin, defer, cancel, human decision inbox append.
- `PDA-REQ-021`: workspace-scoped source file read/write와 backup.
- `PDA-REQ-022`: CLI setup guide, 작업 모드 프리셋, human decision inbox 조회/답변.
- `PDA-REQ-023`: linked active CLI session decision의 answer-and-resume.
- `PDA-REQ-024`: reference-app UI 적용 surface.
- `PDA-REQ-025`: multi-file source editing draft queue, dirty state, save-all/revert/close, backup result surface.
- `PDA-REQ-026`: platform-first host runtime과 외부 AI CLI guest adapter lane 계약.
- `PDA-REQ-027`: task intake 기준 pipe-first multi-CLI lane 초기화.
- `PDA-UX-009` - `PDA-UX-012`: UI 흐름과 코드 편집 surface.
- `PDA-UX-013`: Desktop 탭에 runtime, CLI, terminal result, decision prompt, source editing readiness 표시.
- `PDA-UX-014`: Desktop 탭에 CLI session console, decision inbox item 수, scoped source editor 표시.
- `PDA-UX-015`: Desktop 탭에 setup guide, mode preset, decision answer UI 표시.
- `PDA-UX-016`: Desktop 탭에 linked session 상태와 `Answer & Resume` action 표시.
- `PDA-UX-017`: Desktop 탭에 command palette, capability card, run board, process graph, terminal event rail, grouped decision, replay, diff review, evidence/promotion 표시.
- `PDA-UX-018`: Desktop 탭 source editing 화면에 열린 드래프트 큐, direct path open, indexed browser, dirty 파일 저장/되돌리기/닫기 흐름 표시.
- `PDA-UX-019`: 첫 실행과 Desktop 탭에 플랫폼 먼저 실행, 외부 AI CLI guest lane, missing CLI setup-later/capability_missing 흐름 표시.
- `PDA-UX-020`: Desktop 탭에 task pipe preset 선택, lane 수, adapter 목록, pipe edge, merge gate, missing lane 상태 표시.

## Task Pipe Init Trace

- 요구사항: `PDA-REQ-027`, `PDA-UX-020`
- 구현/설정: `platform-desktop-app/src-tauri/src/lib.rs`, `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css`, `agent-platform/configs/integrations/cli-adapter-registry.json`, `platform-desktop-app/configs/desktop-distribution-registry.json`
- UI 토큰: `Task Pipe Init`, `Init task pipe`, `Init Pipe`, `merge gate`
- 검증: `platform-desktop-app/tests/readiness.test.mjs`, Workspace Monitor TypeScript/build

## Platform-First Runtime Trace

- 요구사항: `PDA-REQ-026`, `PDA-UX-019`
- 구현/설정: `agent-platform/configs/integrations/cli-adapter-registry.json`, `platform-desktop-app/configs/desktop-distribution-registry.json`, `platform-desktop-app/configs/user-flow-registry.json`, `workspace-monitor/components/MonitorShell.tsx`
- 문서: `_docs/operating-models/platform-identity-operating-model.ko.md`, `platform-desktop-app/README.md`, `platform-desktop-app/docs/architecture/cross-platform-installable-runtime-decision.ko.md`, `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.ko.md`
- 검증: `platform-desktop-app/tests/readiness.test.mjs`, `check-config-contract`, Workspace Monitor TypeScript/build

## Multi-File Source Editing Trace

- 요구사항: `PDA-REQ-025`, `PDA-UX-018`
- 구현: `workspace-monitor/components/MonitorShell.tsx`
- 스타일: `workspace-monitor/app/globals.css`
- 회귀 테스트: `platform-desktop-app/tests/readiness.test.mjs`
- 검증: `npm --prefix workspace-monitor run check`, `npm --prefix platform-desktop-app test`, visual QA screenshot
