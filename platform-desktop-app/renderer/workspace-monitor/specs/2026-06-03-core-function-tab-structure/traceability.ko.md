# 추적성: 핵심 기능 탭 구조

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-024 | `core-feature-rail`, `section-tab-groups`, `Core Functions` Overview 패널 | `npm test`, `npm run check`, `npm run build`, desktop customer bundle |

## 출처

- 사용자 요청: 핵심 기능 위치를 딱 봐도 알 수 있고 탭으로 잘 나뉜 구조가 필요하다는 지적.
- 웹 근거: tabs는 동등한 위계의 관련 콘텐츠에 쓰고, 중요한 상위 행동/구조는 primary navigation 성격으로 분리한다는 design-system guidance.
