# Work Timing: Core Feature Connections

날짜: 2026-06-07

| 단계 | 대략 시간 | 메모 |
| --- | ---: | --- |
| 웹 우선 조사와 기존 구조 확인 | 10분 | 공식 문서와 홈/task-intent 구조 확인 |
| 구현 | 20분 | connection contract, helper, CSS, tests |
| 1차 검증 | 8분 | 테스트 실패 1건 후 반응형 중단점 테스트 조정 |
| 기록 작성 | 15분 | 요구사항, spec, history records |
| 최종 검증 | 25분 | collect/build/platform check, Browser smoke, resource/omission/evaluation guard 완료 |

## 병목

- 기존 CSS 중단점이 `960px`이 아니라 `1080px`였기 때문에 static test를 한 번 조정했다.
