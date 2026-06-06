# 작업 계획: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## 계획

- web-first intake로 scroll/nested scroll 기준을 확인한다.
- 사용자 지시를 durable UI rule로 정리한다.
- policy, persistent instructions, memory bootstrap, renderer static checker를 같은 방향으로 맞춘다.
- 새 화면 구현은 하지 않고 회귀 방지 계약을 강화한다.
- docs/config/renderer checks를 통과시키고 기록/commit/push로 마감한다.

## 범위

포함: scroll ownership 정책, memory anchor, static regression checker.

제외: 새 UI 리레이아웃, 새 dependency 설치, 내부 package build.
