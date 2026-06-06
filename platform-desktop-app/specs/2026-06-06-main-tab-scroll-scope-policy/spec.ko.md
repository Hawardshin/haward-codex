# Spec: Main Tab Scroll Scope Policy

## 목표

Workspace Monitor와 플랫폼 UI에서 main tab/page 전체가 기본 scroll owner가 되는 회귀를 막고, scroll을 bounded child surface로 제한한다.

## 범위

- persistent instructions와 `AGENTS.md` runtime adapter.
- `_docs/policies/ui-tone-policy.*.md`.
- `agent-platform/configs/memory/bootstrap-manifest.json`.
- `workspace-monitor` scroll contract checker.
- 요구사항, trace, evaluation 기록.

## 비범위

- 새 화면 layout 대규모 리팩터링.
- 기존 source editor, terminal, file tree, timeline, tool detail 같은 bounded scroll surface 제거.
- 새 dependency 설치.

## 설계

- 정책은 “main tab/page 전체가 기본 scroll owner가 아니다”로 긍정 행동을 정의한다.
- 허용 scroll surface를 code, terminal/log, 긴 function/file list, popup/dialog/flyout, inspector로 명명한다.
- 검증기는 `.desktop-viewport`와 `.mounted-section-panel`에서 `overflow: auto/scroll`, `overflow-y: auto/scroll`, fixed viewport height/max-height 패턴을 금지한다.
