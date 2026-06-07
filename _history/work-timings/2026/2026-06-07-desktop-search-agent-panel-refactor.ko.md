# 2026-06-07 데스크톱 검색 에이전트 패널 분리 작업 시간

## 단계별 기록

- intake 및 검색 확인: 공식 React, TypeScript, Rust 문서 확인.
- 소스 조사: `MonitorShell.tsx`의 검색 에이전트 UI/라우팅 블록과 관련 테스트/readiness 스크립트 확인.
- 구현: `SearchAgentWorkChatPanel.tsx` 추가, `MonitorShell.tsx` import/호출 경계 정리, 테스트/readiness 갱신.
- 검증 1차: workspace monitor check/test, platform desktop test, Rust cargo check 통과.
- 검증 2차: service readiness 검사 범위 누락 수정 후 platform desktop check 통과.
- 검증 3차: 최종 internal package/run 통과.

## 병목

- readiness 스크립트가 `MonitorShell.tsx` 단일 파일 토큰 검사에 의존해, 컴포넌트 이동 후 provider/model UI가 사라진 것으로 오판했다.

## 개선 후보

- readiness/test 스크립트에서 UI 토큰 검사 대상 파일을 명시적 배열로 관리하면 다음 분리 작업 때 누락 가능성이 줄어든다.
