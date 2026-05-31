# 작업 요약 인덱스

이 폴더는 나중에 문서만 보고도 "Codex가 무엇을 했는지" 빠르게 파악하기 위한 요약 계층이다.

## 위치

- 날짜별 상세 일지: `_history/YYYY/YYYY-MM-DD.md`
- 한눈에 보는 요약: `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`
- 영어 companion: `_history/work-summaries/YYYY/YYYY-MM-DD.en.md`
- 계획 과정: `_history/plans/YYYY/`
- 종료 평가: `_history/evaluations/YYYY/`
- 브라우저용 요약: `_history/work-summaries/index.html`

## 작성 규칙

- 의미 있는 작업을 닫기 전에 오늘 날짜의 작업 요약 파일을 갱신한다.
- 한 항목은 사용자의 의도, 실제 변경, 주요 위치, 검증, 평가 보고서를 포함한다.
- 상세한 맥락은 날짜별 상세 일지와 평가 보고서에 두고, 이 파일은 빠른 탐색에 맞춘다.
- 중요한 운영 규칙이나 플랫폼 기능 변경은 한국어/영어 요약을 함께 남긴다.
- 커밋 전에는 "이번 변경 커밋"으로 표시할 수 있지만, 최종 답변에는 실제 커밋 해시와 push 상태를 보고한다.

## 읽는 방법

1. `index.html` 또는 최신 날짜 요약 파일을 먼저 연다.
2. 관심 있는 작업의 "주요 위치" 링크로 이동한다.
3. 왜 그렇게 했는지는 계획 파일과 평가 파일을 확인한다.
4. 실제 변경 이력은 연결된 커밋 메시지와 `git log`로 확인한다.
