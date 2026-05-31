# 코딩 조사 에이전트

`coding-research-agent`는 구현 전에 코딩 관련 조사를 끝낼 수 있는지 판정하는 에이전트다. API 문서, 라이브러리 선택, 버그 원인, 아키텍처, 성능, 보안, 마이그레이션, 테스트 전략, 오픈소스 후보, 구현 패턴 조사를 다룬다.

## 목적

- 모든 코딩 조사도 웹 검색으로 시작한다.
- 웹 검색 외에 저장소 검색, 공식 문서, 코드 검색, package registry, 논문, 오픈소스 repo 중 하나 이상을 함께 확인한다.
- 조사 결과를 바로 구현으로 넘기기 전에 표준 종료 질문에 답한다.
- 다양한 출처 유형을 명시한다. 최소 3개 이상의 `other`가 아닌 source type이 필요하며, 권위 출처와 실무/채택 신호를 함께 포함한다.
- 어떤 출처 설정을 참고했는지 `reference_config_paths`로 기록한다.
- 구현 전 관련 오픈소스 저장소, 참고 구현, 잘 작성된 코드 구조와 테스트를 조사하고 `code_reference_sources`, `code_reference_notes`에 기록한다.
- 설치가 필요한 오픈소스라면 설치 범위, 설치 명령, dependency 기록 파일, 보안/라이선스 검토, 검증 방법, rollback 계획을 기록한다.
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

## 출처 유형 규칙

`complete-coding-research`는 `source_types`를 확인한다. 코딩 조사가 `ready_to_implement`가 되려면 다음 조건이 필요하다.

- `source_types`를 비워두지 않는다.
- `official`, `paper`, `standard`, `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `contrary`, `internal` 등 다양한 유형을 기록한다.
- `other`를 제외하고 최소 3개 이상의 서로 다른 source type을 사용한다.
- `official`, `paper`, `standard`, `open_source` 중 1개 이상의 권위 출처를 포함한다.
- `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `news`, `contrary` 중 1개 이상의 실무/채택/반대 신호 출처를 포함한다.

## 코드 참고 규칙

구현으로 넘어가기 전 다음을 기록한다.

- `code_reference_sources`: 참고한 GitHub/GitLab 저장소, source tree, source file, test file, example app, code search result
- `code_reference_notes`: 해당 코드에서 배운 구조, 모듈 경계, API 사용 패턴, 예외 처리, 테스트 구성, 재사용하지 않을 부분

오픈소스 코드는 그대로 복사하지 않는다. 라이선스, 유지보수 상태, 프로젝트 적합성, 보안 위험, 테스트 품질을 확인한 뒤 로컬 설계에 맞게 적용한다.

오픈소스 설치가 필요하면 [_docs/open-source-installation-policy.ko.md](../../_docs/open-source-installation-policy.ko.md)와 [_ops/workflows/58-installation-record.md](../../_ops/workflows/58-installation-record.md)를 따른다. 실제 설치가 발생하면 `_history/installations/YYYY/`와 `_ops/installations/registry.json`을 갱신한다.

## 참고 설정 파일

조사 입력에는 `reference_config_paths`를 넣는다. 최소 하나는 `agent-platform/configs/research/` 아래 JSON 파일이어야 한다.

기본 설정은 다음과 같다.

- `agent-platform/configs/research/source-registry.json`: 출처 유형과 재사용 reference catalog
- `agent-platform/configs/research/coding-research-profile.json`: 코딩 조사 기본 coverage profile

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
- 리서치 설정: `agent-platform/configs/research/`
- Python 구현: `agent-platform/src/agent_platform/planning/coding_research.py`
- 운영 프롬프트: `_ops/prompts/86-coding-research.md`
- 운영 워크플로: `_ops/workflows/56-coding-research.md`
