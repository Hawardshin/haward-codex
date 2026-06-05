# Runtime Run Timeline 계획

1. 웹 검색으로 local-first agent workbench와 work visibility 패턴을 확인한다.
2. `Temporal UI`, `Langfuse` source를 임시 clone해 event grouping, pending ordering, trace/timeline 패턴을 확인한다.
3. 기존 Desktop Runtime의 `Task Run Store`, `Decision Inbox`, session/output event 상태를 읽는다.
4. 새 데이터 저장소 없이 기존 상태를 `RuntimeRunTimelineItem`으로 정규화한다.
5. disclosure 내부 최상단에 timeline panel을 추가하고 CSS를 국소화한다.
6. readiness token과 product registry validation gate를 갱신한다.
7. package 경로에서 customer snapshot 잔여 상태가 developer history check를 깨지 않도록 developer snapshot self-prepare를 추가한다.
8. snapshot 재생성, renderer/platform checks, build, internal package를 실행한다.

## 결정

- 언어 선택: 기존 renderer가 TypeScript/React이므로 TypeScript를 선택한다. Rust는 새 native command가 필요할 때만 사용한다.
- 구조 선택: 별도 component 파일보다 `MonitorShell.tsx` 내부 계산과 패널로 둔다. 이번 slice는 existing state를 묶는 UI이며 새 독립 모듈보다 기존 disclosure lifecycle을 따르는 편이 안전하다.
- 폴더 구조: 기존 `platform-desktop-app/specs/YYYY-MM-DD-slug/` 구조를 따른다.
