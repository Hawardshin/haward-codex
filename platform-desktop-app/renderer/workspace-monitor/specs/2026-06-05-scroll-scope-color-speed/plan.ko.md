# Scroll Scope Color Speed 계획

## 구현 순서

1. 공식 스크롤/색상/응답성 기준을 확인한다.
2. 현재 Workspace Monitor의 scroll container와 색상 token, 3D animation 경로를 확인한다.
3. CSS에 scroll scope token/selector/containment 계약을 추가한다.
4. Tool Studio 3D canvas가 offscreen/reduced-motion 상태에서 pause되도록 변경한다.
5. static test, check, build, perf, Browser smoke와 screenshot으로 검증한다.

## 근거

- MDN `overscroll-behavior`는 스크롤 컨테이너 경계에 도달했을 때 부모 영역으로 스크롤이 이어지는 scroll chaining을 제어하는 속성으로 설명한다.
- WCAG Reflow는 작은 폭에서도 정보와 기능 손실 없이 content가 reflow되어야 한다는 기준을 둔다.
- Material Design color roles는 surface/on-surface/accent 관계로 색을 역할화해 일관성을 유지하는 접근을 제공한다.
- web.dev INP guidance는 long task와 상호작용 처리 비용을 줄여 다음 paint를 빠르게 하는 것을 권장한다.

## 리스크와 대응

- 리스크: 모든 스크롤 영역에 같은 containment를 적용하면 sticky header나 dialog 내부 동작을 깰 수 있다.
- 대응: sticky를 포함할 수 있는 설정 panel은 scrollbar/overscroll만 적용하고, containment는 리스트/터미널/소스/Tool Studio 내부 영역에만 적용한다.
- 리스크: 스크롤바가 너무 강하면 UI가 산만해진다.
- 대응: surface에 가까운 낮은 대비 token을 사용하고 hover에서만 조금 더 진하게 한다.
