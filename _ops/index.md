# Operations Index

## What Is Where

| Path | Role |
| --- | --- |
| `_ops/` | 운영 허브, 프롬프트 라우터, 워크플로, 저장소 맵 |
| `_research/` | 인터넷 조사와 외부 레퍼런스 중 재사용 가능한 내용 |
| `_docs/` | 장기 운영 규칙, 의사결정, 컨텍스트 관리 |
| `_history/` | 날짜별 작업 히스토리와 압축된 맥락 |
| `_skills/` | git으로 추적하는 커스텀 Codex 스킬 원본 |
| `_templates/` | 새 프로젝트, HTML 산출물, Python 에이전트 템플릿 |
| `_tools/` | 반복 작업을 줄이는 로컬 도구 |
| `agent-platform/` | 개인 에이전트 구축 플랫폼 중심 프로젝트 |

## Navigation

- 작업을 시작할 때: [_ops/workflows/00-start-here.md](workflows/00-start-here.md)
- 프롬프트를 고를 때: [_ops/prompts/00-router.md](prompts/00-router.md)
- 진행 중인 에이전트/병렬 작업을 볼 때: [_ops/coordination/board.ko.md](coordination/board.ko.md), [_ops/coordination/board.html](coordination/board.html)
- 재사용 가능한 조사 내용을 볼 때: [_research/index.ko.md](../_research/index.ko.md)
- 저장소 구조를 볼 때: [_ops/maps/repository-map.md](maps/repository-map.md)
- 프롬프트 목록을 볼 때: [_ops/maps/prompt-map.md](maps/prompt-map.md)
- 반복 작업을 줄일 때: [_docs/capability-governance.md](../_docs/capability-governance.md)
- 지속 지시를 확인할 때: [_docs/persistent-instructions.md](../_docs/persistent-instructions.md)
- 문서 언어 정책을 확인할 때: [_docs/documentation-language-policy.ko.md](../_docs/documentation-language-policy.ko.md), [_docs/documentation-language-policy.en.md](../_docs/documentation-language-policy.en.md)

## Update Rule

새 폴더, 새 프롬프트, 새 워크플로, 새 운영 규칙을 추가하면 다음을 함께 확인한다.

- 관련 문서가 업데이트됐는가
- `_history/YYYY/YYYY-MM-DD.md`에 맥락이 남았는가
- `_ops/maps/`가 현재 구조를 반영하는가
