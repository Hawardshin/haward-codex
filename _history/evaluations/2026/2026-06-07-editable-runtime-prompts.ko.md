# Evaluation: Editable Runtime Prompts

날짜: 2026-06-07

## 판정

통과.

## 근거

- 사용자 요구의 핵심인 "각 프롬프트 변경 가능"을 세션 prompt와 작업 파이프라인 prompt 양쪽에 적용했다.
- 저장/초기화가 같은 정규화 경로를 타도록 조정해 Browser smoke에서 발견된 task prompt reset 불일치를 해결했다.
- Rust preferences 정규화가 허용 key만 보존하도록 테스트를 추가했다.
- renderer check/test, Rust unit test, collect/build/platform check, Browser smoke, resource/omission/evaluator guard를 통과했다.

## 잔여 리스크

- Browser smoke는 browser fallback mode에서 UI state를 검증했다. native preferences file write는 기존 save path와 Rust 정규화 테스트로 보강했지만, packaged Tauri write/reload smoke는 후속으로 남는다.
- public release signing/updater/clean-machine smoke gate는 이번 변경 범위 밖의 기존 경고다.
