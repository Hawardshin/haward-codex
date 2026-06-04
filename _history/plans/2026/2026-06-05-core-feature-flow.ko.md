# 2026-06-05 Core Feature Flow 계획

## 목표

목표 기반 작업 흐름 단계가 실제 Tool Studio 핵심 mode 전환을 수행하게 한다.

## 작업

- task flow step을 문자열에서 action object로 바꾼다.
- 현재 flow step state와 `aria-current="step"`을 추가한다.
- Tool Studio가 외부 mode request를 받아 내부 mode를 동기화하게 한다.
- `툴 만들기` 3단계를 build/environment/deploy mode에 연결한다.
- desktop/mobile click-through smoke로 mode 전환과 overflow를 검증한다.
