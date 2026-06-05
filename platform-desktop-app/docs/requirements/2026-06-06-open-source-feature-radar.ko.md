# 오픈소스 기능 레이더 요구사항

## 배경

사용자는 유사 오픈소스를 기능별로 더 조사하고, 가능하면 기능을 추가하며, 설치가 필요하면 설치하라고 요청했다. 직전 작업에서 기능별 오픈소스 맵은 research 기록으로 남았지만, 앱 안에서 다음 구현 후보와 설치 정책을 볼 수 있는 제품 기능은 없었다.

## 요구사항

| ID | 요구사항 | 우선순위 | 판정 기준 |
| --- | --- | --- | --- |
| REQ-OSR-001 | 플랫폼은 제품 기능 layer별 오픈소스 후보 repo, 직접 탐구 대상, 이식 후보 기능을 self-documenting config로 관리해야 한다. | must | `open-source-feature-reference-registry.json`이 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함하고 config contract를 통과한다. |
| REQ-OSR-002 | Workspace Monitor snapshot은 오픈소스 기능 레이더 데이터를 수집하고 developer/customer snapshot에 안전하게 전달해야 한다. | must | `openSourceFeatureReferences`와 stats가 생성되고 customer sanitizer가 내부 reference link와 watch target을 제거한다. |
| REQ-OSR-003 | Product Structure 화면은 기능별 오픈소스 후보와 설치 정책을 카드형 UI로 보여줘야 한다. | must | `data-open-source-feature-radar="feature-reference-install-policy"` 보드가 표시되고 카드 클릭이 관련 section으로 이동한다. |
| REQ-OSR-004 | 설치는 필요한 경우에만 수행하며, 새 dependency/CLI/MCP/server 설치 전 install audit와 rollback 계획이 있어야 한다. | must | 이번 변경은 새 dependency가 필요 없으므로 `installation_occurred=false`로 평가 기록을 남긴다. |
| REQ-OSR-005 | 구현 완료 후 테스트, snapshot 수집, check, package build를 자동 실행해야 한다. | must | validation record에 renderer/platform tests, check, package build 결과가 남는다. |

## 범위 제외

- 외부 repo를 source tree에 vendoring하지 않는다.
- 새 package를 필요 없이 설치하지 않는다.
- candidate repo의 라이선스/보안 검토 없이 코드를 복사하지 않는다.
