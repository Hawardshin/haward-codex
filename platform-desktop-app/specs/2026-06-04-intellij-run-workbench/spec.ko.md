# IntelliJ식 실행 작업대 스펙

## 목표

`작업 실행` 탭을 긴 웹 대시보드처럼 보이지 않게 만들고, 사용자가 IntelliJ식 실행 구성과 도구 창 구조 안에서 에이전트 작업을 바로 시작하고 막힌 상태를 해소하게 한다.

## 범위

- Desktop Runtime 상단에 Run Configuration toolbar와 실행 구성 카드를 추가한다.
- 실행 구성은 검색 에이전트 채팅, CLI 세션, 다중 CLI pipe, workspace readiness 점검에 연결한다.
- Services 영역은 runtime, workspace, CLI adapter, provider account, session 상태를 요약한다.
- Problems 영역은 오류, 누락 CLI, provider 미설정, pending decisions, dirty drafts, public blockers를 조치 가능한 형태로 보여준다.
- 상태바는 runtime, CLI, model, session, inbox, terminal 상태를 노출한다.
- 레지스트리, readiness script, 요구사항, 히스토리에 기능 계약을 남긴다.

## 비범위

- IntelliJ UI asset 또는 소스 복사
- 새로운 CLI adapter backend 추가
- 실제 provider live call 자동 실행
- OS installer signing/notarization 개선

## 수용 기준

- `MonitorShell.tsx`에 `intellij-run-workbench-panel`, `ide-run-config-list`, `ide-services-window`, `ide-problems-strip`, `ide-status-bar`가 있다.
- 실행 구성 버튼이 기존 runtime 함수에 연결된다.
- CSS는 `var(--surface)`, `var(--surface-raised)`, `var(--line)`, `var(--text)`, `var(--muted)` 같은 테마 토큰을 사용한다.
- product feature, user flow, reference advantage registries가 IntelliJ식 Run/Services/Problems 패턴을 추적한다.
- renderer check, platform check, tests, customer build, browser smoke가 통과한다.
