# Platform Desktop App 리서치 기반 UX 개선

## 목적

설치형 앱의 UX 목표는 모든 설정을 한 번에 끝내는 것이 아니라, 사용자가 앱을 열었을 때 현재 상태와 다음 행동을 즉시 이해하고 막힘을 복구할 수 있게 하는 것이다.

## 사용자 여정

1. 워크스페이스를 선택한다.
2. 읽기/제외/민감 파일 경계를 확인한다.
3. 보기 모드를 선택한다.
4. 필수 준비 검사를 통과한다.
5. command center에서 status, attention, evidence, decision inbox를 본다.

## 핵심 UX 원칙

- 선택 CLI가 없어도 전체 앱은 실패하지 않는다.
- 사용자 결정 대기는 전체 작업을 멈추지 않고 decision inbox로 모은다.
- public deploy나 snapshot은 privacy review 상태를 명확히 보여준다.
- 실패한 검증은 숨기지 않고 rework lane으로 보여준다.

## 산출물

- `platform-desktop-app/artifacts/user-flow-map.html`
