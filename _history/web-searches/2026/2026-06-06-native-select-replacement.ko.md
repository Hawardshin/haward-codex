# Web Search: Native Select 교체

날짜: 2026-06-06

## Queries

- `WAI ARIA listbox pattern select replacement accessibility official`
- `MDN select element styling limitations native dropdown`
- `Apple Human Interface Guidelines pop-up buttons menus macOS design`
- `Material Design menus selection controls dropdown official`

## 확인한 출처

- W3C WAI-ARIA APG Listbox Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
- MDN `<select>` reference: https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/select
- Apple HIG Pop-up buttons: https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons?language=objc
- Material Design Menus: https://m1.material.io/components/menus.html

## 판단

- MDN은 native `<select>`가 생산적인 CSS 스타일링이 어렵고, 완전한 시각 제어가 필요하면 커스텀 위젯과 WAI-ARIA 의미 부여가 필요하다고 설명한다.
- WAI-ARIA APG는 선택 가능한 목록을 `listbox`/`option` 패턴으로 표현하는 기준을 제공한다.
- Apple/Material 가이드는 사용자가 선택 후 현재 선택 상태를 명확히 인지할 수 있어야 함을 뒷받침한다.

## 구현 영향

- 짧은 선택지는 버튼형 listbox로 바꿨다.
- 긴 선택지는 Radix 기반 앱 스타일 menu로 바꿨다.
- 재발 방지를 위해 `<select>` 정적 테스트를 추가했다.

## 불확실성

- 브라우저 smoke는 로컬 snapshot loader가 본문까지 진입하지 못해 visual confirmation이 제한되었다. 대신 DOM count, source tests, type checks, internal package build로 보완했다.
