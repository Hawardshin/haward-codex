# 작업 평가 보고서: 출처 수집 정책

## 초기 지시

- "웹 검색의 경우 공신력이 높은 자료들을 최대한 많이 모아서 진행하고 특히 외국 기술블로그 그런 것들 조사 아티클 조사 좋아요 수가 많은 아티클이나 링크드인 논문등이나 그런 것들도 있지 그런걸 모으는거야."

## 결과 요약

- 웹 검색 시 공신력 높은 자료와 현업 신호를 폭넓게 수집하는 출처 수집 정책을 한국어/영어 문서로 추가했다.
- 공식 자료, 논문, 오픈소스 repo, 외국 기술 블로그, 조사 아티클, 커뮤니티/소셜 신호, 반대 사례를 출처 묶음 기준으로 정의했다.
- 좋아요, 공유, 댓글, GitHub stars, Hacker News 점수, Reddit 활동, LinkedIn 반응은 adoption/discovery 신호로만 보고 단독 사실 근거로 쓰지 않는 규칙을 추가했다.
- web-first intake와 research insight planning 프롬프트/워크플로를 갱신했다.
- 리서치 노트, 계획 히스토리, 평가 보고서를 저장했다.

## References Checked

- Harvard Evaluating Web Sources: https://usingsources.fas.harvard.edu/evaluating-web-sources-0
- Google E-E-A-T update: https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Google Helpful Reliable Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Multivocal literature review guidelines: https://arxiv.org/abs/1707.02553
- OpenAI Academy Web Search: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/
- 계획 기록: `_history/plans/2026/2026-05-31-source-collection-policy.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collection-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 검증

- 웹 검색을 먼저 수행한 뒤 로컬 파일을 수정했다.
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/source-collection-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collection-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/source-collection-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23개 테스트 통과
- `python3 _tools/workspace-index/src/workspace_index.py`: 맵 갱신
- `python3 _tools/task-board/src/task_board.py`: 조정 보드 갱신

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 공신력 높은 자료와 다양한 실무/소셜 신호를 모으는 규칙을 정책, 프롬프트, 워크플로, 지속 지시에 반영했다.

## Gaps

- 없음

## Improvements

- 출처 품질 점수화가 반복되면 `agent-platform`에 source-quality evaluator를 추가할 수 있다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Rework Result

- 재작업 필요 없음

## Report File

- Path: `_history/evaluations/2026/2026-05-31-source-collection-policy.ko.md`
- Created: 2026-05-31
