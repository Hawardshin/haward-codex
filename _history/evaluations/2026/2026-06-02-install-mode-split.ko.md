# 작업 평가: 설치 모드 분리

## 평가 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요구사항: `REQ-WS-049`
- 평가 입력: `_history/evaluations/2026/2026-06-02-install-mode-split-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-02-install-mode-split-grounding.json`

## 초기 지시 대비 결과

사용자는 사용 모드와 개선 모드가 있으므로, 사용자용 설치와 플랫폼 개선 개발자용 설치를 구현하라고 요청했다.

반영 결과:

- `REQ-WS-049`로 `install_mode`를 기준선화했다.
- `agent-platform/configs/installations/install-mode-registry.json`에 `user`와 `developer` 설치 프로필을 추가했다.
- `agent-platform` CLI에 `check-install-modes`, `list-install-modes`, `show-install-mode`를 추가했다.
- 설치 모드 정책, workflow, prompt, README, persistent instructions, memory bootstrap에 연결했다.
- 실제 dependency 설치는 실행하지 않았으므로 설치 감사 기록은 만들지 않았다.

## 확인한 근거

- pip Local project installs
- Python Packaging User Guide: pyproject.toml specification
- npm Docs: npm ci/npm install
- Vercel Docs: Next.js on Vercel
- 기존 installation audit workflow와 registry

## 검증

- JSON syntax: 통과
- Install mode CLI check/list/show: 통과
- Agent-platform install mode unit tests: 통과
- Agent-platform 전체 unittest: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과, 단 기존 `presentation-agent/playwright-report`, `presentation-agent/test-results` 경고는 유지
- Workspace index/task board freshness: 통과
- Workspace health governance: 통과
- Grounding check: `ready_to_publish`
- Work timer: `ready`
- Work evaluator: `ready_to_close`
- `git diff --check`: 통과

## 남은 개선 후보

- 실제 설치 사례가 쌓이면 install profile별 smoke test runner를 추가한다.
- setup workflow가 사용자 화면에 필요해지면 workspace-monitor에 선택된 install mode를 표시한다.
