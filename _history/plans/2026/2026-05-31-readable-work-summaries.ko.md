# 작업 요약 인덱스 계획 기록

## 초기 지시

사용자는 "너가 어떤걸 했는지 내가 나중에 문서를 보고 쉽게 알 수 있게 해줘야해"라고 지시했다.

## 조사 먼저

- 웹 검색으로 changelog, ADR, documentation information architecture 자료를 확인했다.
- Keep a Changelog는 사람이 읽을 변경 기록이 raw git log와 달라야 한다는 관점을 제공했다.
- ADR 자료는 결정과 이유, 결과를 시간이 지나도 추적할 수 있게 남기는 방식을 제공했다.
- Diataxis는 사용자가 문서를 읽는 목적에 맞춰 정보 계층을 나누는 관점을 제공했다.

## 로컬 확인

- `_history/README.md`는 날짜별 상세 히스토리만 안내하고 있었다.
- `_ops/workflows/30-close-and-index.md`와 `_ops/prompts/60-close-work.md`는 작업 요약을 요구하지만, 빠른 요약 전용 폴더는 없었다.
- `work-evaluator-agent`는 평가 보고서와 레퍼런스는 확인했지만, 사용자가 읽을 요약 파일 존재 여부를 강제하지 않았다.

## 계획

1. `_history/work-summaries/`를 빠른 요약 전용 계층으로 추가한다.
2. 한국어/영어 README, 날짜별 요약, HTML 인덱스, 템플릿을 만든다.
3. 운영 문서와 지속 지시에 "작업 요약 갱신"을 넣는다.
4. `work-evaluator-agent` 입력과 테스트에 `work_summary_targets`를 추가해 종료 평가에서 누락을 잡는다.
5. memory bootstrap manifest에 요약 정책 anchor를 추가한다.
6. 리서치 노트, 평가 보고서, 상세 일지를 저장하고 검증 후 커밋/push한다.

## 적용 결정

- 요약은 상세 일지의 대체물이 아니라 탐색 라우터로 둔다.
- HTML은 대시보드처럼 빠르게 보는 용도로 추가하되, source of truth는 Markdown 요약과 상세 일지로 둔다.
- 작업 완료 평가에서 요약 파일 경로를 입력하도록 만들어 미래 작업에서도 누락을 줄인다.
