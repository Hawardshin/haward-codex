# 계획: Agents 3D Collaboration Characters

## 범위

- 대상 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- 대상 화면: Agents 세부 기능 disclosure 내부 Collaboration panel
- 제외: 실시간 agent runtime, backend data model, 기본 chat first screen 재배치

## 실행

1. 웹 검색으로 R3F/Drei/Three.js 적합성, peer dependency, license를 확인한다.
2. 설치 감사 초안을 작성하고 project-local pnpm install을 수행한다.
3. React Three Fiber/Drei scene을 새 컴포넌트로 구현한다.
4. 기존 Collaboration board 위에 3D scene을 추가하고 board/flow 상세 데이터는 아래에 유지한다.
5. static tests, build/check/perf, in-app Browser, Playwright pixel smoke를 통과시킨다.
6. 설치 감사와 요구사항/스펙/평가/추적 기록을 닫는다.

## 근거

- 한 탭에 기능을 과하게 얹지 말라는 사용자 요구 때문에 기본 Agents 화면에는 채팅만 유지한다.
- 3D는 시각적 이해에 도움이 되지만 무거운 기능이므로 닫힌 disclosure 안에서만 lazy mount한다.
- 공개 snapshot에는 내부 agent 데이터가 없을 수 있으므로 empty state가 필요하다.
