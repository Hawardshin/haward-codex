# Reference Platform Advantage Transfer Spec

- 날짜: 2026-06-03
- 대상: `platform-desktop-app/`, `renderer/workspace-monitor/`

## 배경

사용자는 현재 앱이 여전히 웹 UI처럼 보이며 Codex 앱, IntelliJ, Discord, VS Code, Cursor/Windsurf류의 데스크톱 앱 장점을 깊게 조사한 뒤 제품에 녹이라고 요구했다.

## 요구사항

- RPA-001: 유사 플랫폼 조사는 공식 문서, 오픈소스 문서, 보안 기준을 우선 근거로 기록한다.
- RPA-002: 각 플랫폼의 장점은 단순 문서 요약이 아니라 제품 기능 패턴으로 전환한다.
- RPA-003: 적용 패턴은 출처, 적용 상태, 구현 목표, 위험 제어, 제품 섹션을 포함해야 한다.
- RPA-004: Workspace Monitor Overview는 조사 결과를 “레퍼런스 장점 적용 지도”로 보여주고 핵심 섹션으로 이동할 수 있어야 한다.
- RPA-005: customer snapshot은 내부 연구 source path와 raw reference link를 의존하지 않아야 한다.
- RPA-006: readiness/test는 registry, collector, UI token 누락을 회귀로 잡아야 한다.

## 비범위

- 실제 OpenHands/Cline/Aider/OpenCode 설치 또는 bundling.
- 실제 permission dialog/checkpoint rollback native store 완성.
- public release signing/notarization 완료.

## 승인 기준

- `reference-platform-advantage-registry.json`가 10개 이상의 전환 패턴을 담는다.
- snapshot에 `referencePlatformAdvantages`가 생성된다.
- Overview 제품 패널에 “레퍼런스 장점 적용 지도”가 렌더링된다.
- `check-readiness`, `node --test`, workspace monitor typecheck/build가 통과한다.
