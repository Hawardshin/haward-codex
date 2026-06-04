# 웹 검색 기록: 탭 전환 무지연 계약

## 검색어

- `React lazy Suspense code splitting official docs`
- `React useTransition official docs performance`
- `web.dev optimize Interaction to Next Paint long tasks`

## 확인한 출처

- React 공식 문서 `useTransition`: https://react.dev/reference/react/useTransition
- React 공식 문서 `lazy`: https://react.dev/reference/react/lazy
- web.dev `Optimize Interaction to Next Paint`: https://web.dev/articles/optimize-inp
- web.dev `Optimize long tasks`: https://web.dev/articles/optimize-long-tasks

## 무시한 약한 출처

- 일반 블로그, Reddit 논의, PDF 모음은 구현 결정을 바꾸지 않아 근거로 사용하지 않았다.

## 계획 영향

- 탭 클릭 핸들러에서 heavy section body를 즉시 mount하지 않고 첫 paint 이후로 미룬다.
- active 탭/제목/전환 shell은 즉시 렌더링해 사용자가 클릭 반응을 바로 인지하게 한다.
- Source 검색처럼 대량 문자열 검색이 발생하는 작업은 대상 section body 준비 이후로 제한한다.

## 불확실성

- 실사용 기기 INP는 환경별로 달라질 수 있으므로 정적 export + CPU throttle 6 audit를 로컬 회귀 기준으로 삼는다.

## 공개 판단 요약

탭 전환은 체감 즉시성이 중요하므로 전체 body 완료 시간보다 active-response paint를 별도로 측정하고, 무거운 body mount는 staged 작업으로 분리한다.
