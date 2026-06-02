# 다중 CLI 오케스트레이션 데스크톱 스펙

## 목표

설치형 데스크톱 앱이 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode를 선택형 capability로 설정하고, 여러 CLI를 동시에 감독하며, 질문/결정/출력/코드 편집/데이터 축적을 플랫폼 상태로 관리할 수 있는 제품 계약을 만든다.

## 요구사항

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-017`
- `PDA-UX-009` - `PDA-UX-012`

## 범위

- `cli-adapter-registry.json`의 concrete AI CLI adapter 후보
- `user-flow-registry.json`의 AI CLI orchestration flow
- `desktop-distribution-registry.json`의 multi-CLI supervisor release gate
- project-local architecture 문서
- readiness/test가 새 문서를 확인하도록 보강

## 비범위

- 실제 Claude/Gemini/Codex/OpenCode 실행
- Rust/Tauri, xterm.js, Monaco, PTY dependency 설치
- provider 인증 관리
- public installer 생성 또는 release-ready 주장

## 기능 계약

- 네 CLI는 optional adapter로 표시되고, 누락 시 `capability_missing`으로 해당 lane만 비활성화한다.
- 여러 CLI를 실행하는 기능은 process graph와 merge gate를 가진 supervisor가 준비되기 전까지 구현하지 않는다.
- CLI 질문은 decision inbox로 route하고 dependent lane만 pause한다.
- 터미널 output은 bounded/redacted raw log와 structured durable records를 분리한다.
- 코드 편집은 Monaco Editor 같은 오픈소스 editor surface를 우선 검토한다.
- 데이터 축적은 파일 시스템 index와 structured records를 기본으로 하고, vector DB는 측정된 병목 이후 비교한다.

## 수용 기준

- JSON config가 문법과 self-documenting config contract를 통과한다.
- desktop readiness test가 multi-CLI architecture doc과 orchestration registry fields를 확인한다.
- 요구사항, 스펙, traceability가 새 기능을 연결한다.
- 평가 기록에 resource risk와 CLI pipeline risk가 실제 구현 전 설계 리스크로 기록된다.
