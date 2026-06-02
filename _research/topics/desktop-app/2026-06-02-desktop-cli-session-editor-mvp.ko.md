# Desktop CLI Session / Source Editor MVP Research

## 요약

이번 구현은 full PTY나 shell plugin으로 가지 않고, Tauri command 안에서 직접 allowlist와 scope를 enforcement하는 pipe 기반 MVP를 선택했다.

## 근거

- Tauri command scope 문서는 scope enforcement가 command 구현 책임임을 명시한다.
- Tauri shell plugin과 sidecar는 권한과 packaging 판단이 필요하므로 설치 감사 전에는 보류한다.
- xterm.js는 terminal UI 후보지만 PTY가 아니다.
- Monaco Editor는 source editor 후보지만 dependency audit 전에는 설치하지 않는다.

## 언어 옵션

| 옵션 | 장점 | 단점 |
| --- | --- | --- |
| Rust/Tauri command | 현재 scaffold와 맞고 native process/file boundary를 강제하기 쉽다. | Rust toolchain 미설치로 compile 검증이 지연된다. |
| Node sidecar | node-pty/xterm과 결합하기 쉽다. | sidecar packaging, permission, lifecycle, signing 부담이 크다. |
| Python sidecar | 기존 agent-platform 검증 계층과 잘 맞는다. | interactive terminal/PTY와 desktop packaging은 별도 설계가 필요하다. |

선택: Rust/Tauri command. 이유는 현재 scaffold와 ownership에 맞고, shell plugin 설치 없이도 allowlist process와 scoped file boundary를 구현할 수 있기 때문이다.

## 아키텍처 옵션

| 옵션 | 장점 | 단점 |
| --- | --- | --- |
| Pipe session MVP | dependency 설치 없이 stdout/stderr/stdin/cancel을 구현한다. | PTY가 필요한 CLI에는 제한적이다. |
| Tauri shell plugin | 공식 plugin과 permission model을 활용한다. | 권한 scope와 설치 감사가 필요하다. |
| PTY sidecar | 실제 terminal UX에 가깝다. | dependency, resource cleanup, packaging, signing, rollback 리스크가 크다. |

선택: Pipe session MVP. 다음 단계에서 PTY sidecar/xterm을 비교한다.

## 코드 참고

- 기존 `platform-desktop-app/src-tauri/src/lib.rs` health check command
- 기존 `workspace-monitor/components/MonitorShell.tsx` Desktop tab
- Tauri official command/scope 문서

## 한계

- Rust compile은 아직 검증하지 못했다.
- 실제 설치된 CLI smoke test가 필요하다.
- textarea editor는 Monaco 대체 구현이 아니라 dependency audit 전 안전한 bridge MVP다.
