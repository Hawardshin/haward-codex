# 웹 검색 기록: Dark foreground and product font

- 날짜: 2026-06-05
- 요청: 어두운 배경에는 흰색 텍스트를 쓰고, 더 좋은 폰트로 교체하라는 UI 피드백을 Workspace Monitor에 반영.

## 검색

- `WCAG contrast text dark background white text accessibility`
- `MDN CSS color contrast accessibility dark background text`
- `KRDS typography Pretendard GOV font family`

## 확인한 출처

- W3C WAI Understanding SC 1.4.3 Contrast Minimum: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- MDN font-family CSS reference: https://developer.mozilla.org/docs/Web/CSS/font-family
- Pretendard repository: https://github.com/orioncactus/pretendard

## 계획 영향

- Dark theme의 `--text`와 `--muted`는 회색 계열 대신 흰색으로 올렸다.
- Dark rail, primary action, active tab, code/source/terminal surface는 `--text-on-dark: #ffffff` foreground token을 쓰게 했다.
- 제품 sans stack은 `Pretendard Variable`, `Pretendard`, `Noto Sans KR`, Apple/Windows/system sans 순서로 정리했다.
- 새 외부 font request나 font asset download는 추가하지 않았다. 현재 변경은 설치된 폰트와 시스템 fallback을 사용하는 CSS 교체다.

## 불확실성

- 사용자의 OS에 `Pretendard`가 설치되어 있지 않으면 `Noto Sans KR` 또는 시스템 sans로 fallback된다.
- 완전히 동일한 렌더링을 보장하려면 다음 단계에서 로컬 font file 번들링과 라이선스/설치 기록이 필요하다.

## 공개 판단 요약

- 어두운 표면 위 visible text는 반투명 회색 대신 흰색 token을 사용한다.
- 제품 font stack은 Pretendard를 우선하지만, 오프라인/desktop 안정성을 위해 외부 네트워크 폰트 로딩은 추가하지 않는다.
