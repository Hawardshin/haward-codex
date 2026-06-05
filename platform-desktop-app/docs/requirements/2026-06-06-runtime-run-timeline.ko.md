# Runtime Run Timeline 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-140 | Desktop Runtime의 실행 기록/결정함 disclosure는 raw 로그보다 먼저 실행 기록, 열린 결정, 활성 세션, 파이프라인, 출력 신호를 한 타임라인으로 묶어 보여야 한다. | must | `runtime-run-timeline-panel`, `runtimeRunTimelineItems` |
| REQ-PDA-141 | 타임라인 항목은 결정 대기, 활성 세션, decision-bearing task run을 우선 배치해 사용자가 무엇을 재개해야 하는지 바로 판단하게 해야 한다. | must | pending/active priority 계산 |
| REQ-PDA-142 | 타임라인 항목은 장식이 아니라 기존 동작에 연결되어야 한다. 실행 기록은 로그 열기, 결정은 선택, 활성 세션은 터미널 열기로 이어져야 한다. | must | item `onAction` wiring |
| REQ-PDA-143 | 새 패널은 기존 성능 정책을 따라 `runRecordsOpen`이 열릴 때만 계산/렌더링되어야 한다. | must | `runRecordsOpen` guard |
| REQ-PDA-144 | 새 UI는 기존 색상/spacing 토큰을 재사용하고 긴 task id, path, question text가 버튼 폭을 밀어내지 않아야 한다. | must | CSS wrapping, renderer check, browser smoke |
| REQ-PDA-145 | 내부 패키징 경로는 직전 customer build가 남긴 public snapshot 상태와 무관하게 developer snapshot을 자체 준비한 뒤 history payload check를 실행해야 한다. | must | `Workspace Monitor developer snapshot collect`, `package:internal` |

## 결정

- 새 dependency는 도입하지 않는다.
- raw log viewer를 대체하지 않고, 그 위에 판단용 timeline summary를 추가한다.
- Work Visibility 제품 레이어의 surface로 등록한다.
- 패키징 중 발견된 snapshot mode residue 문제는 빌드 파이프라인의 self-prepare 계약으로 고친다.
