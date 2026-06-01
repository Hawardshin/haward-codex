# 웹 검색 기록: Subtle Cute UI Tone

## 목적

사용자가 “은근히 귀여운 것도 좋다”고 한 UI 선호를 운영 도구 UI에 적용할 때, 과한 장식이 아니라 명확성과 신뢰를 유지하는 기준으로 정리하기 위해 조사했다.

## 검색어

- `Nielsen Norman Group delight UX emotional design subtle design official`
- `Material Design delightful moments motion design official guidelines`
- `Apple Human Interface Guidelines motion design delight official`
- `Microsoft Fluent 2 design principles delight official`
- `Material Design 3 motion guidance official expressive delightful UI`
- `Fluent 2 design principles official UI delightful`

## 확인한 출처

| 출처 | URL | 신뢰도 | 사용한 이유 |
| --- | --- | --- | --- |
| Apple Human Interface Guidelines: Motion | https://developer.apple.com/design/Human-Interface-Guidelines/motion | 공식 | motion은 status/feedback에 유용하지만 과하면 방해가 되며 접근성 대응이 필요하다는 기준 |
| Microsoft Fluent 2 Design Principles | https://fluent2.microsoft.design/design-principles | 공식 | focus, 낮은 clutter, trust, personality 균형 |
| Material Design: Understanding motion | https://m2.material.io/design/motion/understanding-motion.html | 공식 | motion을 관계, action availability, outcome 전달 수단으로 보는 기준 |
| Don Norman, Emotional Design | https://ubiquity.acm.org/article.cfm?id=966013 | 학술/저자 글 | 즐거움과 사용성이 분리되지 않는다는 배경 근거 |

## 제외하거나 낮게 본 출처

- Reddit/커뮤니티 글은 Material 3 Expressive 호불호를 확인하는 discovery signal로만 유용했고, 이번 정책의 직접 근거로 쓰지 않았다.
- 일반 UX 블로그는 방향은 유사하지만 공식/원저자 근거가 충분해 핵심 근거에서 제외했다.

## 계획 반영

- “귀여움”은 mascot, emoji, 장식 중심이 아니라 작은 accent, status signal, friendly empty state, restrained micro-interaction으로 정의했다.
- Workspace Monitor에는 데이터 모델 변경 없이 CSS 계층에서만 적용한다.
- 반복 hover/motion은 짧게 두고 `prefers-reduced-motion`을 추가한다.

## 남은 불확실성

- 실제 사용자가 선호하는 귀여움의 강도는 아직 visual review와 사용 피드백이 필요하다.
- Browser screenshot 검증이 가능하면 색상/hover/밀도 균형을 추가 확인하는 것이 좋다.
