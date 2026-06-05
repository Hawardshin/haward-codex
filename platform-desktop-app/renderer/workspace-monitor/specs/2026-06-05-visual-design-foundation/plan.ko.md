# Visual Design Foundation 계획

1. 공식 디자인 레퍼런스를 확인해 shell, typography, color, minimalism 기준을 추출한다.
2. Workspace Monitor 요구사항에 visual design foundation 요구사항을 추가한다.
3. `MonitorShell.tsx`의 Overview meta-copy를 실제 작업 목표/상세 문구로 교체한다.
4. `globals.css`에 surface, line, shadow, type rhythm, accent token을 추가하고 app shell/titlebar/rail/home focus surface에 적용한다.
5. 정적 테스트, 타입 검사, customer build, 성능 예산, desktop/mobile visual smoke로 회귀를 확인한다.

## 선택

- 범위는 `workspace-monitor`의 앱 셸과 Overview first surface로 제한한다.
- 설치 없이 기존 Pretendard, lucide, CSS token 체계를 확장한다.
- 색상은 운영 도구에 맞는 neutral dark/light base를 유지하되 green/blue/amber accent로 역할을 나눈다.
