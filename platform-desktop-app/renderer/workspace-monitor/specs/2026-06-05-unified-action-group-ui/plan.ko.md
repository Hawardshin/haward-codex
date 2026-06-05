# Unified Action Group UI 계획

## 단계

1. 외부 기준 확인: 일관성, 익숙한 컨트롤, 버튼 상태, 접근 가능한 primitive 기준을 확인한다.
2. 요구사항 확정: 반복 액션 묶음 통일을 REQ-WM-067로 추가한다.
3. 구현: `ActionGroup` primitive를 추가하고 대표 액션 묶음을 migration한다.
4. 반응형 보강: 720px/860px 이하에서 titlebar, task handoff, Tool Studio 액션 묶음이 stretch되게 한다.
5. 검증: 정적 테스트, 타입체크, 린트, 빌드, customer build, perf budget, Browser smoke, screenshot smoke를 수행한다.
6. 마감: 검증 결과, 평가, 요청-결과 추적, 작업 요약, 일일 히스토리를 갱신하고 커밋/푸시한다.

## 범위 제어

- 이번 slice는 반복 액션 묶음 primitive와 대표 migration만 다룬다.
- 대규모 레이아웃 재설계, 새 설치, generated snapshot 정리는 제외한다.
