# 계획 히스토리: 자가 설명형 설정 파일

## 초기 요청

- "세팅파일로 한다는게 참고하는 링크라던가 뭔가 구조적인 규칙은 내가 그 파일만 봐도 알 수 있는게 필요하다는거지"

## 계획 목적

- 공유 설정 파일을 단순 값 저장소가 아니라, 참고 링크와 구조 규칙이 파일 내부에 있는 운영 계약으로 만든다.
- 사람이 설정 파일 하나만 열어도 왜 이 설정이 있는지, 무엇을 참고했는지, 어떤 규칙으로 유지되는지 알 수 있게 한다.

## 검색 질문

- JSON 설정이나 schema를 self-documenting하게 만드는 일반적인 방법은 무엇인가?
- Configuration as Code에서 설정 변경을 어떻게 검증 가능한 단위로 다루는가?
- 설정 파일 내부에 참고 링크와 구조 규칙을 두는 것이 왜 필요한가?

## 검색 채널

- 웹 검색
- 공식 문서 검색
- 저장소 검색
- 코드 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| JSON Schema Annotations | https://json-schema.org/understanding-json-schema/reference/annotations | annotation keywords can make schemas self-documenting |
| Azure App Configuration best practices | https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices | configuration as code can be versioned and validated |
| The Twelve-Factor App Config | https://www.12factor.net/config | config/code separation and config scattering risks |
| 기존 source registry | `agent-platform/configs/research/source-registry.json` | 기존 참고 출처 설정 |
| 기존 memory manifest | `agent-platform/configs/memory/bootstrap-manifest.json` | 기존 메모리 부트스트랩 설정 |

## 도출한 인사이트

- 설정 파일은 `purpose`만으로 부족하다. 참고 링크, 구조 규칙, 필드 설명이 함께 있어야 한다.
- 별도 문서만 두면 drift가 생길 수 있으므로 핵심 설정 파일 내부에 최소 설명 계약을 둔다.
- 반복 검증은 `check-config-contract` 같은 CLI로 자동화해야 한다.
- 모든 설정 파일을 즉시 바꾸기보다, 우선 미래 세션과 조사 품질에 직접 영향을 주는 핵심 설정부터 적용한다.

## 계획 단계

- `config-contract-agent`와 `check-config-contract` CLI 추가
- `agent-platform/configs/memory/bootstrap-manifest.json`에 `reader_guide`, `reference_links`, `structure_rules`, `field_guide` 추가
- `agent-platform/configs/research/source-registry.json`과 `coding-research-profile.json`에 같은 구조 추가
- 자가 설명형 설정 파일 정책 한국어/영어 문서 추가
- 리서치 노트와 운영 문서, persistent instructions, manifest 갱신
- 테스트, config contract check, memory bootstrap check, evaluation 후 커밋/push

## 제외하거나 보류한 선택지

- 모든 agent spec JSON까지 즉시 같은 계약으로 바꾸는 것은 보류했다. 먼저 핵심 공유 설정 파일 3개에 적용한다.
- JSON Schema 파일을 별도로 만들기보다, 현재는 Python 검사기로 최소 계약을 강제한다.

## 검증 방법

- `agent-platform` unit test
- `check-config-contract`
- `check-memory-bootstrap`
- `list-agents`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board check
- `git diff --check`
