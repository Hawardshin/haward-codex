# 작업 요약: workspace tracker product split

- 데스크톱 앱의 제품 중심을 `agent_capability_platform`에서 `workspace_tracker`로 바꿨다.
- 기본 사용자 화면은 Git 작업공간, 터미널/AI 실행, 작업 타임라인, 보고서/근거, 문서/요구사항을 우선하도록 바꿨다.
- Codex, Claude Code, Cursor, Antigravity 등은 선택형 guest AI 도구로 모델링했다.
- agent factory, root tool management, Ollama, provider direct agent run, AWS AgentCore식 runtime lifecycle은 separated advanced platform 기능으로 분리했다.
- product split registry, snapshot 타입/collector, customer snapshot, UI panel, tests, README, 프로젝트 registry, requirements/spec/evaluation 기록을 업데이트했다.

## 남은 후속 후보

- 실제 Git clone/create/import UX를 runtime action으로 연결한다.
- 각 guest AI 도구의 설치/계정/PTY 상태를 도구별 어댑터로 진단한다.
- `MonitorShell.tsx`를 더 작은 도메인 컴포넌트로 계속 분해한다.
- 사용자 프로젝트별 별도 remote repository 생성/연결 정책을 구현한다.
