# 누락 방지 게이트 계획

## 작업 모드

- 선택: `governance`
- 이유: evaluator target, 작업 모드 registry, 지속 지시, memory bootstrap을 바꾸는 durable platform rule 변경이다.
- 모드 선택 기록: 이 파일

## 계획

1. 웹 검색으로 체크리스트, 요구사항 traceability, Definition of Done 관련 근거를 확인하고 검색 기록을 남긴다.
2. `omission_guard.py`, CLI, template, agent config, 문서를 추가한다.
3. `work_evaluator.py`와 `work-mode-registry.json`에 `omission_check_targets`를 추가한다.
4. 정책/워크플로/프롬프트/지속 지시/메모리 부트스트랩을 갱신한다.
5. 요구사항, 스펙, 히스토리, 평가, timing record를 남긴다.
6. 단위 테스트, config contract, work mode check, memory bootstrap, docs/workspace map check를 실행한다.

## 근거

- `_history/web-searches/2026/2026-06-02-omission-prevention.ko.md`
- `_research/topics/agent-operations/2026-06-02-omission-prevention.ko.md`
