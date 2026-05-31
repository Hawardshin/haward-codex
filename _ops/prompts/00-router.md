# Prompt Router

Use when: 작업 성격에 맞는 재사용 프롬프트를 빠르게 선택해야 할 때.

## Route

| Situation | Use |
| --- | --- |
| 새 작업을 시작한다 | [10-start-work.md](10-start-work.md) |
| 새 프로젝트를 만든다 | [20-create-project.md](20-create-project.md) |
| Python 에이전트나 플랫폼 기능을 만든다 | [30-build-agent.md](30-build-agent.md) |
| 반복 작업을 스킬, 도구, 템플릿으로 승격한다 | [40-promote-capability.md](40-promote-capability.md) |
| 컨텍스트가 길어졌다 | [50-compress-context.md](50-compress-context.md) |
| 작업을 마무리한다 | [60-close-work.md](60-close-work.md) |
| 완료 결과를 초기 지시와 비교 평가한다 | [70-evaluate-work.md](70-evaluate-work.md) |

## Operating Prompt

```text
현재 요청을 저장소의 지속 규칙과 _ops/index.md 기준으로 분류한다.
필요한 프롬프트와 워크플로를 선택하고, 새 반복 패턴이 보이면 문서/도구/스킬 후보로 남긴다.
작업 후 평가 에이전트로 초기 지시 대비 결과를 확인하고, 히스토리, 맵, 커밋, push 상태를 확인한다.
```
