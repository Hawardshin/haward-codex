# Terminal Command Center Usability 요구사항

날짜: 2026-06-06
프로젝트: `platform-desktop-app`

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
|---|---|---:|---|
| REQ-PDA-130 | native PTY terminal은 scrollback 검색과 이전/다음 결과 이동을 제공해야 한다. | must | `@xterm/addon-search`, `SearchAddon.findNext/findPrevious` static test |
| REQ-PDA-131 | terminal은 선택/출력 복사, clipboard paste, clear screen, fit/resize 같은 기본 조작을 버튼과 단축키로 제공해야 한다. | must | `data-terminal-action`, `attachCustomKeyEventHandler` static test |
| REQ-PDA-132 | 사용자는 자주 쓰는 진단 명령을 직접 타이핑하지 않고 quick command로 보낼 수 있어야 한다. | should | `nativePtyQuickActions`, `data-terminal-quick-command` static test |
| REQ-PDA-133 | 새 terminal control은 main tab/page scroll owner를 만들지 않고 native PTY bounded surface 안에서 동작해야 한다. | must | scroll contract check, CSS stage layout |
| REQ-PDA-134 | 새 dependency는 project-local install audit, license/security review, rollback path를 남겨야 한다. | must | installation record, registry contract |

## 결정

- 이번 slice는 terminal interaction layer를 근본적으로 보강한다.
- Rust PTY process lifecycle은 기존 구현을 유지하고, split panes/profile persistence는 별도 backend slice로 둔다.
