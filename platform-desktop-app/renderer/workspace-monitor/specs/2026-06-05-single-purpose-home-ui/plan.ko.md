# 계획: Single Purpose Home UI

## work_mode

- 선택: `governance`
- 이유: 사용자 지시가 앞으로의 UI 원칙으로 지속되어야 하며 `_docs/instructions/`, UI 정책, memory bootstrap, Workspace Monitor 요구사항과 구현을 함께 바꾼다.
- view_mode: `superadmin_developer`
- install_mode: 해당 없음

## 단계

1. 웹 기준 확인: W3C/WAI cognitive accessibility, labels/purpose, progressive disclosure 출처를 확인한다.
2. 영속 원칙 반영: persistent instructions, UI tone policy, memory bootstrap에 단일 목적 UI 기준을 추가한다.
3. 구현 반영: Overview home의 중복/복합 버튼, 핵심 기능 탭 secondary CTA, 복합 disclosure panel을 단일 목적 단위로 분리한다.
4. 검증: check, test, build, docs audit, config contract, responsive Browser smoke를 실행한다.
5. 기록: 요구사항, 스펙, 히스토리, 평가, 요청 추적을 갱신한다.

## 의사결정

- 대안 A: 홈의 보조 정보를 모두 제거한다.
- 대안 B: 보조 정보는 유지하되 기본 접힘 상태에서 한 패널 한 역할로 분리한다.
- 선택: B. 사용자가 필요할 때 근거와 상태를 볼 수 있어야 하므로 정보를 없애지 않고 인지 단위를 작게 만든다.
