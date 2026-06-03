# Spec: Responsive Text Wrapping

## 목표

반응형 UI에서 텍스트가 의도보다 자주 글자 단위로 깨지는 문제를 줄이고, 긴 기계적 값만 안전하게 분리하는 CSS 정책과 회귀 검사를 추가한다.

## 설계

- 기본 UI 텍스트는 `--text-natural-wrap: break-word`와 `word-break: keep-all`을 사용한다.
- 긴 토큰은 `--text-long-token-wrap: anywhere`를 별도 rule에만 적용한다.
- `button` 및 generic button label children은 긴 토큰 정책을 쓰지 않고 자연스러운 wrapping 정책만 사용한다.
- readiness script/test는 버튼에 `anywhere`가 들어오는 회귀를 명시적으로 실패시킨다.

## Acceptance

- global `button` rule에 `overflow-wrap: anywhere`가 없다.
- generic `.desktop-app-root button > span/strong/small` rule에 `overflow-wrap: anywhere`가 없다.
- `code`, `pre`, 경로/로그/상태 값에는 긴 토큰 예외가 존재한다.
- desktop/mobile browser QA에서 horizontal overflow가 0이다.
