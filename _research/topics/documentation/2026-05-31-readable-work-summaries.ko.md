# 읽기 쉬운 작업 요약 구조

## 목적

사용자가 나중에 대화 내용을 다시 읽지 않아도 어떤 작업이 끝났고 어디를 보면 되는지 빠르게 찾을 수 있는 작업 요약 구조를 만들기 위해 조사했다.

## 확인한 자료

| 자료 | 유형 | 확인일 | 참고한 점 |
| --- | --- | --- | --- |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | 문서화 관행 | 2026-05-31 | git log 자체가 아니라 사람이 읽을 수 있는 "notable changes" 중심의 변경 기록이 필요하다는 원칙을 참고했다. |
| [Architectural Decision Records](https://adr.github.io/) | 의사결정 기록 | 2026-05-31 | 결정 하나와 그 이유, trade-off, consequence를 남기면 시간이 지나도 방향을 이해할 수 있다는 구조를 참고했다. |
| [Microsoft Learn: Maintain an architecture decision record](https://learn.microsoft.com/da-dk/azure/well-architected/architect-role/architecture-decision-record) | 공식 문서 | 2026-05-31 | 의사결정 기록을 공개된 저장소의 단일 참조점으로 유지하고, append-only log처럼 다루라는 원칙을 참고했다. |
| [Diataxis](https://diataxis.fr/) | 문서 정보 구조 | 2026-05-31 | 문서 사용자의 필요에 맞춰 설명, reference, how-to 성격을 나누는 접근을 참고했다. |

## 적용한 인사이트

- `git log`는 사실 이력이고, 사용자가 읽을 작업 요약은 별도 계층이어야 한다.
- 하루 단위 요약은 상세 일지, 계획, 평가, 커밋으로 가는 빠른 라우터 역할을 해야 한다.
- 작업 요약은 길면 다시 읽기 어려우므로 "사용자 의도, 결과, 주요 위치, 검증/평가 링크"로 제한한다.
- 더 깊은 이유는 계획 히스토리와 평가 보고서에 남긴다.
- 브라우저에서 한눈에 보는 용도에는 HTML 인덱스가 유용하다.

## 이 저장소에 반영한 규칙

- `_history/work-summaries/`를 빠른 작업 요약 계층으로 둔다.
- `_history/YYYY/YYYY-MM-DD.md`는 상세 일지로 유지한다.
- `_history/plans/YYYY/`와 `_history/evaluations/YYYY/`를 요약에서 연결한다.
- `work-evaluator-agent` 입력에 `work_summary_targets`를 포함해 요약 누락을 종료 평가에서 잡는다.
