# 스펙: 런타임 조사/설계

## 목적

`REQ-WS-052`를 반영해 Rust, Go, Tauri, Wails, Electron, Python, TypeScript/Next.js 같은 런타임/언어 선택을 조사에서 설계와 결정 기록으로 이어지게 한다.

## 요구사항

- `REQ-WS-052`

## 동작 원칙

- 언어 선택은 웹 검색과 기존 지식만으로 끝나지 않는다.
- 공식 문서, ADR/architecture 참고, 오픈소스 구현, 이슈/토론 신호, 반대 사례를 분리해 조사한다.
- 의미 있는 변경은 최소 두 후보 설계를 비교한다.
- 선택 또는 보류 사유는 ADR-style 결정 기록으로 남긴다.
- 성능/packaging이 이유라면 prototype measurement plan이 필요하다.

## 변경 대상

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_ops/workflows/64-runtime-language-research-design.md`
- `_ops/prompts/94-runtime-language-research-design.md`
- `_templates/runtime-language-decision/`
- `_docs/policies/runtime-language-selection-policy.*.md`
- `_ops/prompts/00-router.md`
- `_ops/index.md`
- 요구사항, 스펙, 히스토리, 평가 기록

## 수용 기준

- registry가 research/design process, decision record contract, prototype design contract를 포함한다.
- workflow/prompt/template이 존재하고 route에서 찾을 수 있다.
- config contract와 memory bootstrap이 통과한다.
- docs/naming/structure audit와 evaluator가 통과한다.
