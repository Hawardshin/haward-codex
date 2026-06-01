# CLI Pipeline 파일/아티팩트 Handoff 계획 기록

## 요청 해석

사용자의 “파일과 기타 등등”은 이전 multi-CLI pipe orchestration 요구에 이어 파일, 임시 파일, cache, log, report 같은 handoff까지 포함하라는 추가 요구로 해석한다.

## 작업 모드

- 선택: `governance`
- 이유: shared config, validator, requirements, workflow, persistent instructions, memory bootstrap에 영향을 준다.

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-cli-pipeline-file-artifact-handoffs.ko.md`
- 요구사항: `REQ-WS-059`
- 스펙: `_specs/workspace-platform/2026-06-02-cli-pipeline-file-artifact-handoffs/`

## 계획

1. `cli_pipeline.py`에 artifact model과 검증을 추가한다.
2. template, docs, workflow, prompt, persistent instructions를 artifact handoff 중심으로 확장한다.
3. path traversal, missing artifact id, unknown producer, ready artifact handoff 테스트를 추가한다.
4. unit/config/memory/work-mode/resource/omission/grounding/evaluator를 검증한다.
