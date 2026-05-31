# Prompt Router

Use when: 작업 성격에 맞는 재사용 프롬프트를 빠르게 선택해야 할 때.

## Route

| Situation | Use |
| --- | --- |
| 새 작업을 시작한다 | [10-start-work.md](10-start-work.md) |
| 새 프로젝트를 만든다 | [20-create-project.md](20-create-project.md) |
| 작업이나 관심사의 프로젝트 소유 경계를 정한다 | [25-scope-project-boundary.md](25-scope-project-boundary.md) |
| Python 에이전트나 플랫폼 기능을 만든다 | [30-build-agent.md](30-build-agent.md) |
| 반복 작업을 스킬, 도구, 템플릿으로 승격한다 | [40-promote-capability.md](40-promote-capability.md) |
| 컨텍스트가 길어졌다 | [50-compress-context.md](50-compress-context.md) |
| 작업을 마무리한다 | [60-close-work.md](60-close-work.md) |
| 완료 결과를 초기 지시와 비교 평가한다 | [70-evaluate-work.md](70-evaluate-work.md) |
| 진행 중인 에이전트와 병렬 작업을 확인하거나 갱신한다 | [80-coordinate-work.md](80-coordinate-work.md) |
| 에이전트 운영 철학이나 세계관을 정리한다 | [_philosophy/agent-operating-philosophy.ko.md](../../_philosophy/agent-operating-philosophy.ko.md) |
| 웹/문서/저장소 검색에서 인사이트를 도출해 계획한다 | [85-research-insight-plan.md](85-research-insight-plan.md) |
| 인터넷 조사에서 재사용 가치가 있는 내용을 문서화한다 | [90-capture-research.md](90-capture-research.md) |
| 지식 베이스 내용을 근거로 쓰기 전에 검증한다 | [95-validate-knowledge.md](95-validate-knowledge.md) |

## Operating Prompt

```text
Classify the current request using the repository's persistent rules and _ops/index.md.
Select the relevant prompt and workflow.
If the request expresses a durable worldview or operating philosophy, update _philosophy/ and link policy docs to it.
If the request creates or touches a specific project, decide the owning project folder before editing files.
If a reusable pattern appears, record it as a documentation, tool, template, skill, prompt, or workflow candidate.
After the work, run the evaluator against the initial instruction, then verify history, maps, commit, and push status.
```
