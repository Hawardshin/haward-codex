# 웹 검색 기록: 작업 모드 강제화

## 검색 목적

작업 모드를 프롬프트 안내가 아니라 강제 가능한 실행 계약으로 만들 때 참고할 수 있는 정책/스키마/가드레일 근거를 확인했다.

## 검색어

- `policy as code enforcement workflow governance Open Policy Agent official documentation`
- `JSON Schema validate configuration official documentation`
- `guardrails AI structured outputs validation enforcement official documentation`
- `Open Policy Agent policy as code official docs enforcement point`

## 확인한 주요 출처

| 출처 | URL | 사용 이유 |
| --- | --- | --- |
| Open Policy Agent docs | https://www.openpolicyagent.org/docs/latest | 정책을 코드/설정으로 분리하고 소프트웨어가 정책 결정을 위임하는 구조 참고 |
| JSON Schema Specification | https://json-schema.org/specification | 구조 계약을 기계적으로 검증하는 방식 참고 |
| Akka Guardrails docs | https://doc.akka.io/sdk/agents/guardrails.html | guardrail을 설정과 runtime enforcement로 다루는 사례 참고 |
| Azure Prompt Shields docs | https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/content-filter-prompt-shields | 프롬프트 공격을 모델 입력 경계에서 감지/완화하는 guardrail 사례 참고 |

## 계획 반영

- 작업 모드는 프롬프트만으로 두지 않고 `work-mode-registry.json`에 enforcement layer를 둔다.
- `check-work-modes` CLI로 registry와 evaluator target policy drift를 잡는다.
- non-`quick` 작업은 `mode_selection_record_targets`를 evaluator input에 포함한다.
- evaluator는 누락된 mode selection record를 blocking gap으로 만든다.

## 남은 불확실성

- OPA 같은 외부 policy engine은 이번 작업에는 설치하지 않았다. 현재는 Python 내부 validator가 충분하다.
- guardrail 문서는 AI safety 사례라 작업 모드 강제화와 완전히 같은 도메인은 아니다. 다만 prompt-only가 약하고 runtime/boundary check가 필요하다는 설계 근거로 사용했다.
