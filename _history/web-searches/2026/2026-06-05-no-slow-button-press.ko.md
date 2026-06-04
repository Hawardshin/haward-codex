# 웹 검색 기록: 버튼 클릭 무지연 계약

## 검색어

- `web.dev Interaction to Next Paint optimize input delay presentation delay official`
- `web.dev optimize long tasks yield to main thread official`
- `React useTransition official docs non-blocking updates`
- `React memo useCallback official docs performance`

## 확인한 출처

- web.dev `Optimize Interaction to Next Paint`: https://web.dev/articles/optimize-inp
- web.dev `Optimize long tasks`: https://web.dev/articles/optimize-long-tasks
- React 공식 문서 `useTransition`: https://react.dev/reference/react/useTransition
- React 공식 문서 `memo`: https://react.dev/reference/react/memo

## 무시한 약한 출처

- Reddit/일반 블로그/임의 PDF는 구현 기준을 바꾸지 않아 근거로 사용하지 않았다.

## 계획 영향

- 버튼 클릭의 실제 작업 완료 시간이 아니라 첫 피드백 paint를 별도 계약으로 분리한다.
- React click handler보다 앞선 capture phase에서 버튼 눌림 피드백을 먼저 표시한다.
- CPU throttle 6에서 representative button press p95를 반복 측정하는 audit script를 추가한다.

## 불확실성

- 실제 native command 완료 시간은 환경별로 달라질 수 있다. 이 작업의 기준은 버튼을 누른 사용자가 첫 시각 피드백을 느끼는 시간이다.

## 공개 판단 요약

사용자는 “버튼을 눌렀는데 느리다”를 체감 문제로 말하고 있으므로, 모든 버튼류 컨트롤에 공통 instant feedback layer를 설치해 heavy action과 첫 반응 paint를 분리한다.
