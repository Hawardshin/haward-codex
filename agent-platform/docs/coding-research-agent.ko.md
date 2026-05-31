# 코딩 조사 에이전트

`coding-research-agent`는 구현 전에 코딩 관련 조사를 끝낼 수 있는지 판정하는 에이전트다. API 문서, 라이브러리 선택, 버그 원인, 아키텍처, 성능, 보안, 마이그레이션, 테스트 전략, 오픈소스 후보, 구현 패턴 조사를 다룬다.

## 목적

- 모든 코딩 조사도 웹 검색으로 시작한다.
- 웹 검색 외에 저장소 검색, 공식 문서, 코드 검색, package registry, 논문, 오픈소스 repo 중 하나 이상을 함께 확인한다.
- 조사 결과를 바로 구현으로 넘기기 전에 표준 종료 질문에 답한다.
- 내부 지식 베이스를 근거로 쓰면 `knowledge-skeptic-agent`로 검증한다.
- 계획 과정은 `_history/plans/YYYY/`에 남기고, 재사용 가능한 지식은 `_research/`, `_templates/`, `_tools/` 중 알맞은 곳에 기록한다.

## 조사 타입

- `api_docs`: API, SDK, 프레임워크 문서 확인
- `library_selection`: 라이브러리나 프레임워크 선택
- `bug_root_cause`: 버그 원인 조사
- `architecture`: 구조와 경계 결정
- `performance`: 성능 병목과 개선안
- `security`: 보안 위험과 대응
- `migration`: 버전 업그레이드나 기술 이전
- `testing`: 테스트 전략과 검증 경로
- `open_source`: 오픈소스 후보 평가
- `implementation_pattern`: 구현 패턴과 사례 조사

## 조사 완료 질문

조사가 끝났다고 판단하려면 다음 질문에 모두 답해야 한다.

| ID | 질문 |
| --- | --- |
| `what_was_verified` | 정확히 무엇을 검증했는가? |
| `best_option` | 지금 가장 나은 선택지는 무엇인가? |
| `why_this_option` | 왜 이 선택지가 대안보다 나은가? |
| `alternatives_rejected` | 어떤 대안을 제외했고 이유는 무엇인가? |
| `implementation_impact` | 어떤 파일, 모듈, API, 워크플로가 바뀌는가? |
| `risks_and_unknowns` | 남은 위험, 미확인 가정, 오래된 정보 가능성은 무엇인가? |
| `validation_plan` | 구현 후 어떻게 검증할 것인가? |
| `reusable_knowledge` | 다음에도 쓸 지식은 어디에 기록할 것인가? |
| `next_action` | 다음 구체 행동은 무엇인가? |

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

결과가 `ready_to_implement`일 때만 구현 계획으로 넘긴다. `more_research_required`면 `gaps`를 해결한 뒤 다시 실행한다.

## 관련 파일

- 설정: `agent-platform/configs/agents/coding-research-agent.json`
- 입력 템플릿: `agent-platform/configs/planning/coding-research-template.json`
- Python 구현: `agent-platform/src/agent_platform/planning/coding_research.py`
- 운영 프롬프트: `_ops/prompts/86-coding-research.md`
- 운영 워크플로: `_ops/workflows/56-coding-research.md`
