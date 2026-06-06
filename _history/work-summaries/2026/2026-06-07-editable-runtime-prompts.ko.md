# Work Summary: Editable Runtime Prompts

날짜: 2026-06-07

## 결과

Desktop Runtime의 세션 프롬프트와 작업 파이프라인 프롬프트를 선택지별로 수정할 수 있게 했다.

## 구현

- `RuntimeCustomization.prompts`에 `sessionPrompts`, `taskPipePrompts` override map을 추가했다.
- 세션 prompt choice와 task-pipe prompt choice에 `promptKey`, `defaultValue`, `customized` 상태를 추가했다.
- 선택 프롬프트 저장/기본값 액션과 `.prompt-edit-actions` UI를 추가했다.
- 저장 후 현재 선택 key가 초기 프리셋으로 돌아가지 않도록 effect를 분리했다.
- Rust preferences 정규화에 `DesktopPromptCustomization`과 prompt key whitelist를 추가했다.

## 검증

- renderer check/test 통과.
- Rust prompt normalization unit test 통과.
- collect, renderer build, platform check 통과.
- Browser smoke에서 task/session prompt 저장과 reset 모두 확인.

## 남은 경계

- public release signing/updater/clean-machine smoke gate는 기존대로 남아 있다.
- packaged Tauri preferences file write smoke는 후속 검증 후보로 남겼다.
