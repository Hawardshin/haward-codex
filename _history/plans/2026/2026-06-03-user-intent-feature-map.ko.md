# 작업 계획 기록: 사용자 의도 기반 기능 지도

## 작업 모드

- 선택 모드: `research`
- 이유: 구현보다는 히스토리, 요청 요약, work summary, registry/spec representative sample을 종합해 기능군과 우선순위를 정리하는 작업이다.

## Large Scope Decomposition

### 범위 분류

- broad language: 히스토리의 사용자 의도를 “하나씩” 다시 보라는 요청이다.
- large file set: `_history`, `_requirements`, `_specs`, project docs/configs 전체가 후보가 된다.
- context pressure: 전체 파일 열람보다 요약/registry/spec 대표 샘플이 더 적절하다.
- unknown blast radius: 기능 정리 자체는 문서 산출물이지만 향후 roadmap 결정에 영향을 준다.

### Source Inventory

| Source lane | 포함 | 제외 |
| --- | --- | --- |
| request summaries | `_history/user-requests/2026/*.ko.md` | raw chat transcript |
| work summaries | `_history/work-summaries/2026/*.ko.md` | generated/dependency folders |
| representative registries | `agent-platform/configs/**`, `platform-desktop-app/configs/**` | `_private/`, secrets |
| representative specs | `_specs/workspace-platform/**/spec.ko.md`, project `specs/**/spec.ko.md` | every plan/tasks/validation file unless needed |
| release/service evidence | service readiness evaluation and registry | public release claims not backed by validation |

### Representative Samples

- `_history/user-requests/2026/2026-05-31.ko.md`
- `_history/user-requests/2026/2026-06-01.ko.md`
- `_history/user-requests/2026/2026-06-02.ko.md`
- `_history/user-requests/2026/2026-06-03.ko.md`
- `_history/work-summaries/2026/2026-06-01.ko.md`
- `_history/work-summaries/2026/2026-06-02.ko.md`
- `_history/work-summaries/2026/2026-06-03.ko.md`
- `_philosophy/agent-operating-philosophy.ko.md`
- `_docs/operating-models/platform-identity-operating-model.ko.md`
- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
- `platform-desktop-app/configs/service-readiness-registry.json`

### Slices

| Slice | 내용 | output |
| --- | --- | --- |
| UIF-001 | 요청 수와 날짜별 흐름 확인 | count and timeline |
| UIF-002 | 반복 의도 cluster 추출 | 12 feature themes |
| UIF-003 | 구현된 기능과 남은 후보 분리 | Now/Next/Later roadmap |
| UIF-004 | 출처/한계/검증 기록 | web search, omission, grounding, evaluation |

### Merge Gate

- 기능 지도에는 “모든 파일을 읽었다”는 표현을 쓰지 않는다.
- 히스토리 요약과 대표 registry/spec를 기반으로 했음을 명시한다.
- public release나 고객 경계 같은 상태 주장은 repository validation 기록에 근거한다.

## 결과물

- `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md`
- `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.en.md`
