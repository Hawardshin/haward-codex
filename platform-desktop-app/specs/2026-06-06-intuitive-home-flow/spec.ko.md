# Spec: Intuitive Home Flow

## 목적

Workspace Monitor 홈 화면에서 사용자가 준비 상태를 확인한 뒤 작업 목표를 선택하고 실행, 평가로 이어지는 경로를 더 직관적으로 만든다.

## 범위

- `overview` 홈 첫 화면에 4단계 start flow를 추가한다.
- 단계는 준비, 선택, 실행, 평가로 구성한다.
- 준비 단계는 실행 설정으로, 실행 단계는 Desktop Runtime으로, 평가 단계는 AI Eval로 이동한다.
- 선택 단계는 현재 추천 intent를 실행한다.

## 비범위

- 전체 IA 재설계, 섹션 삭제, activity rail 재구성은 이번 slice에서 하지 않는다.
- 공개 release gate, signing, notarization, updater 설정은 변경하지 않는다.

## 수용 기준

- 홈에 `data-home-start-flow`와 4개의 `data-home-flow-step`이 렌더링된다.
- 각 단계 버튼은 안정적인 크기와 overflow 없는 grid를 가진다.
- `실행` 단계를 누르면 `desktop` 섹션이 활성화되고 `run-work` handoff가 표시된다.
