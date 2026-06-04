# 계획: AgentCore Resource Topology

## 목표

- AgentCore Quick Builder에서 선택된 capability를 AgentCore식 resource topology와 lifecycle로 보여준다.

## 작업 순서

1. 공식 AgentCore 리소스/capability 범위를 확인한다.
2. Workspace Monitor 기존 Quick Builder 구조를 읽는다.
3. capability option에 resource/lifecycle metadata를 추가한다.
4. resource topology UI와 responsive CSS를 추가한다.
5. 정적 테스트와 Browser smoke로 desktop/mobile overflow를 확인한다.
6. 요구사항, 스펙, 검증, 평가, 요청 추적을 갱신한다.

## 롤백 경계

- `MonitorShell.tsx`의 AgentCore topology 섹션과 capability metadata
- `globals.css`의 `.agentcore-resource-*` 스타일
- `tool-studio.test.mjs`의 정적 계약
