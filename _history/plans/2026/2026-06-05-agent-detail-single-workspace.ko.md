# 계획: Agents Detail Single Workspace

## 범위

- 대상: Workspace Monitor Agents 세부 기능 disclosure
- 목표: 한 화면에 여러 세부 기능을 모두 쌓지 않고, 선택된 하나의 기능만 렌더링한다.
- 제외: 기본 채팅 화면, 각 세부 panel 내부 기능 전체 재설계, backend/runtime 변경

## 분해

- Slice 1: 세부 기능 선택기와 active surface 구조
- Slice 2: 선택되지 않은 panel DOM unmount 검증
- Slice 3: 모바일 한 열 reflow와 screenshot 검증

## 근거

- 사용자는 “한 탭에 여러 기능을 넣으려 하지 말고 차라리 depth를 더 깊게”를 반복 요청했다.
- Agents detail stack은 현재 그 요청과 직접 충돌하는 구간이다.
