# 자가 설명형 설정 파일 레퍼런스

## 목적

설정 파일 안에 참고 링크, 구조 규칙, 필드 설명을 함께 두는 정책의 근거를 정리한다.

## 접근일

- 2026-05-31

## 확인한 출처

| 출처 | 유형 | 핵심 참고점 | 적용 |
| --- | --- | --- | --- |
| JSON Schema Annotations: https://json-schema.org/understanding-json-schema/reference/annotations | 공식 문서 | `title`, `description`, `default`, `examples` 같은 annotation은 검증보다 설명과 도구 활용을 위한 메타데이터이며 self-documenting에 도움이 된다. | 설정 파일에 `reader_guide`, `field_guide` 같은 설명 메타데이터를 둔다. |
| Azure App Configuration best practices: https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices | 공식 문서 | Configuration as Code는 설정을 source control로 관리하고 validation/testing step을 둘 수 있게 한다. | 공유 설정 파일에 `check-config-contract` 검증을 붙인다. |
| The Twelve-Factor App Config: https://www.12factor.net/config | 방법론 문서 | config와 code의 분리, 설정을 한 곳에서 관리하기 어려운 문제를 다룬다. | 이 저장소에서는 운영 규칙 설정을 코드와 분리하되, git으로 추적하고 설명을 파일 안에 둔다. |

## 인사이트

- 설정은 값만 있으면 나중에 왜 그런 값인지 잊기 쉽다.
- 설정 파일 내부에 참고 링크와 구조 규칙을 두면 사용자가 파일만 열어도 판단 기준을 확인할 수 있다.
- 문서만 따로 두면 drift가 생기므로, 중요한 설정 자체에 `reference_links`, `structure_rules`, `field_guide`를 둔다.
- 반복 검증은 CLI로 자동화해야 한다.

## 적용 결과

- `check-config-contract` CLI 추가
- `config-contract-agent` 추가
- 핵심 설정 파일 3개에 `reader_guide`, `reference_links`, `structure_rules`, `field_guide` 추가
- 자가 설명형 설정 파일 정책 추가
