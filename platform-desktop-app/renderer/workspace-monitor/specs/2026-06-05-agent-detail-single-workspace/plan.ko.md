# Agents Detail Single Workspace 계획

## 근거

- Material guidance는 tabs를 같은 위계의 서로 다른 content group 간 이동에 사용한다.
- Carbon disclosure guidance는 중첩 disclosure와 stacking이 초점을 흐릴 수 있다고 본다.
- 이번 Agents 세부 화면은 여러 기능이 한 화면에 모두 쌓여 있어 사용자의 “한 기능은 하나를 한다” 요구와 충돌한다.

## 실행

1. Agents 세부 기능 ID와 label/icon/detail metadata를 정의한다.
2. `agentDetailView` 상태를 추가하고 기본값을 `collaboration`으로 둔다.
3. 세부 기능 disclosure 내부에 `role="tablist"` 선택기를 추가한다.
4. active workspace 영역에서 선택된 기능만 조건부 렌더링한다.
5. CSS로 desktop 7열, 960px 이하 2열, 720px 이하 1열 레이아웃을 제공한다.
6. 정적 테스트와 Browser/Playwright smoke로 one-active-workspace 계약을 검증한다.
