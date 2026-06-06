# 최종 평가: Terminal Agent Bridge

날짜: 2026-06-06

## 평가

사용자의 “터미널 연결 기능, 에이전트 기능을 제대로” 요구에 대해 Desktop Runtime에서 PTY 연결과 agent CLI session 시작을 한 흐름으로 묶는 첫 slice를 구현했다.

## 충족

- PTY, CLI adapter, agent session 상태를 bridge 카드로 표시한다.
- 연결 실행 버튼은 runtime/adapter/prompt가 준비된 경우에만 활성화된다.
- PTY 연결이 writable 상태가 아니면 agent session을 시작하지 않는다.
- 기존 start-selected-lane action도 실패를 action feedback에 전파하도록 보강했다.
- 새 dependency나 daemon은 추가하지 않았다.

## 검증

- workspace-monitor check/test 통과.
- desktop renderer build와 customer bundle audit 통과.
- Browser smoke에서 bridge 표시, step 3개, terminal drawer open action을 확인했다.
- developer snapshot collect 및 `platform-desktop-app` check 통과.
- `evaluate-work`는 `ready_to_close`, `git diff --check` 통과.

## 남은 경계

- Browser preview에는 Tauri runtime이 없어 실제 PTY spawn은 desktop app runtime에서 추가 smoke가 필요하다.
- 기존 desktop shell 최소 폭 1280px 정책은 이번 변경에서 유지했다.
