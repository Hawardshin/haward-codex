# Spec: Command Palette Usability

날짜: 2026-06-07

## 목표

명령 팔레트에서 사용자가 “검색이 되는지”, “결과가 없는지”, “다음에 무엇을 눌러야 하는지”를 즉시 알 수 있게 한다.

## 동작

- `trimmedCommandQuery`와 `normalizedCommandQuery`를 분리해 표시 문자열과 검색 문자열을 명확히 구분한다.
- `filteredCommandItems`는 기존 검색 기준과 18개 기본 노출 제한을 유지한다.
- `recommendedCommandItems`는 핵심 연결 흐름인 `connect-chatbot`, `provider-accounts`, `terminal-drawer-open`, `settings-execution`을 명령 id 기준으로 선택한다.
- `commandResultStatusText`는 기본 상태에서는 추천/빠른 실행 개수를, 검색 상태에서는 검색어별 결과 개수를 표시한다.
- 추천 버튼은 `runCommandItem`을 통해 기존 명령 실행/팔레트 닫기/검색어 초기화 lifecycle을 재사용한다.

## UI 계약

- 결과 상태 텍스트는 `.command-palette-live-status`와 `role="status"` 및 `aria-live="polite"`를 가진다.
- 추천 명령 버튼은 `data-command-palette-recommendation={item.id}`를 가진다.
- 결과가 없을 때 `.command-palette-empty-state`와 `data-command-palette-empty-state="true"`가 렌더링된다.
- 빈 결과 상태에서도 추천 명령 버튼이 제공된다.
- 추천 버튼과 빈 결과 안내는 좁은 화면에서 텍스트가 컨테이너를 밀어내지 않아야 한다.

## 안전 경계

- 추천 명령은 기존 command item만 실행한다.
- 새 프로세스, 새 설치, 새 secret 접근, 새 native permission을 만들지 않는다.
- Browser smoke는 renderer fallback에서 DOM/interaction 계약을 검증하고, packaged Tauri secret store까지 검증하지 않는다.
