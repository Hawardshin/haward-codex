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
- `PDA-UX-009` - `PDA-UX-012`: UI 흐름과 코드 편집 surface.
- `PDA-UX-013`: Desktop 탭에 runtime, CLI, terminal result, decision prompt, source editing readiness 표시.
- `PDA-UX-014`: Desktop 탭에 CLI session console, decision inbox item 수, scoped source editor 표시.
- `PDA-UX-015`: Desktop 탭에 setup guide, mode preset, decision answer UI 표시.
