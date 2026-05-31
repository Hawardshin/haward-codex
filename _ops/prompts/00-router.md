# Prompt Router

Use when: 작업 성격에 맞는 재사용 프롬프트를 빠르게 선택해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Route

| Situation | Use |
| --- | --- |
| 모든 새 지시를 처리하기 전에 웹 검색을 먼저 한다 | [05-web-first-intake.md](05-web-first-intake.md) |
| 새 세션에서 저장소 규칙과 설정을 잊지 않도록 메모리 anchor를 로드한다 | [01-memory-bootstrap.md](01-memory-bootstrap.md) |
| 새 작업을 시작한다 | [10-start-work.md](10-start-work.md) |
| 새 프로젝트를 만든다 | [20-create-project.md](20-create-project.md) |
| 작업이나 관심사의 프로젝트 소유 경계를 정한다 | [25-scope-project-boundary.md](25-scope-project-boundary.md) |
| Python 에이전트나 플랫폼 기능을 만든다 | [30-build-agent.md](30-build-agent.md) |
| 반복 작업을 스킬, 도구, 템플릿으로 승격한다 | [40-promote-capability.md](40-promote-capability.md) |
| 컨텍스트가 길어졌다 | [50-compress-context.md](50-compress-context.md) |
| 다음 세션이 문서만 보고 재개하도록 컨텍스트 아카이브를 만든다 | [_ops/workflows/45-context-archive.md](../workflows/45-context-archive.md) |
| 작업을 마무리한다 | [60-close-work.md](60-close-work.md) |
| 완료 결과를 초기 지시와 비교 평가한다 | [70-evaluate-work.md](70-evaluate-work.md) |
| 진행 중인 에이전트와 병렬 작업을 확인하거나 갱신한다 | [80-coordinate-work.md](80-coordinate-work.md) |
| 에이전트 운영 철학이나 세계관을 정리한다 | [_philosophy/agent-operating-philosophy.ko.md](../../_philosophy/agent-operating-philosophy.ko.md) |
| 웹/문서/저장소 검색에서 인사이트를 도출해 계획한다 | [85-research-insight-plan.md](85-research-insight-plan.md) |
| API, 라이브러리, 버그, 아키텍처, 성능, 보안, 마이그레이션 등 코딩 조사를 완료한다 | [86-coding-research.md](86-coding-research.md) |
| 오픈소스/도구/런타임/스킬 설치를 기록한다 | [58-installation-record.md](58-installation-record.md) |
| 인터넷 조사에서 재사용 가치가 있는 내용을 문서화한다 | [90-capture-research.md](90-capture-research.md) |
| 지식 베이스 내용을 근거로 쓰기 전에 검증한다 | [95-validate-knowledge.md](95-validate-knowledge.md) |
| 최종 산출물의 사실 주장을 근거로 검증한다 | [96-ground-output.md](96-ground-output.md) |

## Operating Prompt

```text
Classify the current request using the repository's persistent rules and _ops/index.md.
Run web-first intake before planning, repository exploration, or file edits.
Run memory-bootstrap-agent after web-first intake and before local planning.
Select the relevant prompt and workflow.
If the request expresses a durable worldview or operating philosophy, update _philosophy/ and link policy docs to it.
If the request creates or touches a specific project, decide the owning project folder before editing files.
For research-heavy work, use research-insight-planner-agent with agent-platform/configs/research/research-agent-profile.json and record the answer-engine stages plus citation requirements.
If the request needs coding research before implementation, use coding-research-agent and answer every post-research question before coding.
If the request installs, upgrades, removes, or globally configures software, create an installation record and update _ops/installations/registry.json.
If a reusable pattern appears, record it as a documentation, tool, template, skill, prompt, or workflow candidate.
Ground factual claims with hallucination-guard-agent before publishing final outputs that contain facts.
After the work, update work summaries, run the evaluator against the initial instruction, then verify history, maps, commit, and push status.
```
