# 2026-05-31 컨텍스트 아카이브: 컨텍스트 아카이브 정책

## 현재 작업 목표

컨텍스트가 길어질 때 에이전트가 스스로 요약/아카이빙하고, 다음 작업은 문서 기반으로 재개하도록 저장소 구조와 평가 규칙을 강화한다.

## 현재 상태 요약

- 웹 검색 우선, 메모리 부트스트랩, 작업 요약, 평가 보고서, 웹 검색 기록 구조는 이미 존재한다.
- 이번 작업은 그 위에 `_history/context-archives/` 재개 패킷 계층을 추가했다.
- 컨텍스트 아카이빙이 실제로 발생하면 `work-evaluator-agent`가 `context_archive_targets`를 확인하도록 바꿨다.

## 최근 완료한 결정과 변경

| 항목 | 요약 | 근거 |
| --- | --- | --- |
| 아카이브 위치 | `_history/context-archives/YYYY/`를 컨텍스트 재개 패킷 저장소로 둔다. | `_history/context-archives/README.ko.md` |
| 템플릿 | 한영 context archive 템플릿을 추가했다. | `_templates/context-archive/` |
| 정책 | 컨텍스트 포화 신호, 표준 절차, 저장하지 않을 내용을 정책화했다. | `_docs/context-archive-policy.ko.md` |
| 워크플로 | 컨텍스트 아카이빙 절차를 `_ops/workflows/45-context-archive.md`로 추가했다. | `_ops/workflows/45-context-archive.md` |
| 평가 | 아카이빙 발생 시 `context_archive_targets` 누락을 gap으로 잡는다. | `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |

## 반드시 읽을 파일

| 우선순위 | 파일 | 이유 |
| --- | --- | --- |
| 1 | `_docs/context-archive-policy.ko.md` | 컨텍스트 아카이빙의 기준과 절차 |
| 2 | `_history/context-archives/README.ko.md` | archive packet 저장 규칙 |
| 3 | `_ops/workflows/45-context-archive.md` | 실제 실행 순서 |
| 4 | `_ops/prompts/50-compress-context.md` | 프롬프트 기반 압축 지시 |
| 5 | `agent-platform/docs/work-evaluator-agent.md` | 평가 입력 요구사항 |

## 남은 작업

| 순서 | 작업 | 소유 위치 | 상태 |
| --- | --- | --- | --- |
| 1 | 검증 실행 | `agent-platform/`, `_tools/` | 완료 |
| 2 | 평가 보고서 저장 | `_history/evaluations/2026/` | 완료 |
| 3 | 커밋 및 push | git | 예정 |

## 검증 상태

- 통과: 웹 검색, 메모리 부트스트랩 사전 확인, 51개 단위 테스트, JSON 검증, memory bootstrap, config contract, map/task board check, `git diff --check`, knowledge validation, grounding, work evaluation
- 남은 검증: 커밋 및 push

## 연결

- 웹 검색 기록: `_history/web-searches/2026/2026-05-31-context-archive-policy.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-context-archive-policy.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-context-archive-policy.ko.md`
- 관련 커밋: 커밋 후 갱신

## 저장하지 않은 내용

- 내부 추론 원문: 저장하지 않음
- 임시 로그: 검증에 필요한 명령 결과만 평가 보고서에 요약
- 민감 정보: 없음

## 재개 지침

1. `_history/work-summaries/2026/2026-05-31.ko.md`에서 오늘 작업 흐름을 먼저 확인한다.
2. 이 파일의 `반드시 읽을 파일`만 우선 연다.
3. 최신 상태가 필요하면 `git status`, memory bootstrap, maps check를 다시 실행한다.
4. 오래된 내용으로 판단할 때는 `knowledge-skeptic-agent`를 실행한다.
