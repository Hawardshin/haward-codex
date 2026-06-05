# 웹 검색 기록: Workspace Monitor 탭 전환과 소스 편집 UX

- 일시: 2026-06-05
- 목적: 탭 전환 지연과 숨김/선로딩 UX 개선 전 외부 공식 근거 확인.

## 확인한 출처

- React `lazy`: https://react.dev/reference/react/lazy
- React `Suspense`: https://react.dev/reference/react/Suspense
- MDN `content-visibility`: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility

## 판단 요약

- React lazy/dynamic import는 처음 렌더 시점까지 코드 로딩이 지연될 수 있으므로, 사용자가 탭 전환에서 로딩감을 느끼는 경우 idle 선로딩이나 마운트 유지가 타당하다.
- Suspense fallback은 지연 상태를 보여주는 수단이지만, 이번 요청은 fallback을 더 잘 보여주는 것이 아니라 전환 지연을 줄이는 것이 목표다.
- 숨김 상태 렌더링은 브라우저 렌더링 비용과 접근성 상태를 함께 고려해야 하므로, 소스 패널은 `hidden`으로 시각 표시를 막고 리소스 side effect는 `surfaceActive`로 분리한다.

## 계획 영향

- 전체 탭을 모두 실행하는 방식 대신 소스 편집 상태 보존과 모듈 선로딩을 결합했다.
- 외부 문서는 보조 근거로만 사용했고, 실제 구현은 기존 Workspace Monitor 구조와 테스트 계약을 기준으로 결정했다.
