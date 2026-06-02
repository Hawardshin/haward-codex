# 2026-06-02 에이전트 플랫폼 UX/디자인 딥리서치 보고서

## 결론

이 플랫폼의 UX는 “예쁜 관리 페이지”보다 “사람이 에이전트 작업을 이해하고 통제하는 운영 화면”이어야 한다. 따라서 첫 화면은 프로젝트/문서 숫자보다 현재 상태, 막힘, 다음 행동, 근거, 보기 모드를 먼저 보여줘야 한다.

## 리서치 질문

에이전트 구축/오케스트레이션 플랫폼의 디자인과 UX는 어떤 원칙을 따라야 하며, 현재 `workspace-monitor`와 `platform-desktop-app`에 무엇을 반영해야 하는가?

## 핵심 근거

| 근거 | 해석 | 적용 |
| --- | --- | --- |
| Microsoft HAX는 AI UX에서 capability와 limitation을 초기에 명확히 하라고 한다. | 사용자는 에이전트가 무엇을 할 수 있고 어디서 멈추는지 알아야 한다. | 상단 command center에 현재 mode, capability gap, blocker 상태를 둔다. |
| HAX는 현재 작업/환경에 맞는 정보를 보여주라고 한다. | 모든 문서를 다 보여주는 것보다 지금 다음에 해야 할 일이 중요하다. | next action과 blockers를 overview 첫 viewport에 둔다. |
| HAX는 AI가 왜 그렇게 동작했는지 설명 가능해야 한다고 한다. | 근거 없는 에이전트 결과는 신뢰할 수 없다. | web search, evaluation, requirement/spec link를 evidence trail로 묶는다. |
| HAX와 Google PAIR는 자동화와 사용자 통제를 함께 다룬다. | 설치형 플랫폼은 자동으로 진행하되 사용자가 중요한 결정을 회수할 수 있어야 한다. | decision inbox와 mode controls를 desktop UX spine에 포함한다. |
| Carbon dashboard guidance는 hierarchy, 제한된 metric, whitespace를 강조한다. | 숫자를 많이 보여주는 것은 좋은 dashboard가 아니다. | overview를 `command center -> action/evidence -> metrics -> drill-down` 순서로 재배치한다. |
| Material data table guidance는 large data를 query/filter/manipulate 가능한 구조로 다루라고 한다. | 문서/소스/요구사항은 예쁜 카드보다 탐색 가능한 목록과 필터가 중요하다. | 기존 search/filter를 유지하되 command center가 사용자의 방향을 잡아준다. |
| NN/g heuristics는 system status visibility, user control, recognition rather than recall, minimalist design을 강조한다. | 사용자가 기억해서 찾아가게 만들지 말고 필요한 상태와 선택지를 노출해야 한다. | 첫 화면에 “상태, 다음, 근거, 통제”를 고정된 구조로 노출한다. |
| USWDS site alert guidance는 중요한 상태를 상단에 배치하되 과도한 경고색을 피하라고 한다. | 운영 경고는 보이되 불안감을 만들지 않아야 한다. | public readiness와 blocked task를 조용한 alert panel로 표현한다. |

## 현재 구조 진단

- `workspace-monitor`는 이미 프로젝트, 문서, 히스토리, 에이전트, 소스, 요구사항을 보여준다.
- 하지만 overview의 첫 인상은 metric과 panel의 나열에 가깝고, 사용자가 당장 봐야 할 운영 상태가 한 곳에 묶여 있지 않다.
- `platform-desktop-app/artifacts/user-flow-map.html`은 첫 실행 흐름과 모드 구분은 있지만, 설치형 제품이 사용자를 어떻게 안심시키고 막힘을 처리하는지 충분히 시각화하지 않는다.

## 설계 방향

1. 첫 화면에 `Command Center`를 둔다.
2. `Now`, `Needs Attention`, `Evidence Trail`, `Mode Control`을 한 줄의 운영 spine으로 보여준다.
3. 메트릭은 맥락 아래에 놓고, 드릴다운 tab으로 이어지게 한다.
4. 사용자 모드와 개발자 모드를 같은 화면에서 자연스럽게 전환하되, raw source/config는 developer/superadmin에서만 보이게 유지한다.
5. 데스크톱 UX artifact는 첫 실행, 준비 검사, decision inbox, recoverability, evidence review를 하나의 사용자 여정으로 표현한다.

## 적용 대상

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `workspace-monitor/docs/research-backed-ux.ko.md`
- `platform-desktop-app/docs/research-backed-ux.ko.md`

## 한계와 후속 검증

- 실제 사용성 테스트는 아직 하지 않았다.
- Playwright screenshot으로 desktop/mobile에서 텍스트 겹침, first viewport hierarchy, nonblank render를 확인한다.
- 이후 실제 사용 중 클릭 경로, 가장 자주 보는 섹션, decision inbox 사용 빈도를 기록하면 더 정확한 UX 개선이 가능하다.
