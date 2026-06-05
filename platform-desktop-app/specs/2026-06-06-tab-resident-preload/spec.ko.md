# 스펙: 탭 상주 선마운트 최적화

## 목표

Workspace Monitor의 탭 전환에서 React component mount 비용을 클릭 시점에 지불하지 않도록, 주요 탭을 renderer 메모리에 resident로 유지한다. 초기 진입 후 idle 시간에 탭들을 순차 마운트하고, 숨겨진 탭은 state를 유지한 채 비활성화한다.

## 언어/런타임 선택

- 옵션 A: React renderer resident tree. 현재 병목이 탭 클릭 시 React tree 생성과 component mount 비용이므로 가장 직접적이다. 선택.
- 옵션 B: Rust/Tauri native cache 확장. 파일 IO와 text preload에는 적합하지만 React component mount 비용을 직접 줄이지 못한다. 이전 native resource slice는 유지하되 이번 선택은 아님.
- 옵션 C: Web Worker/IndexedDB cache. 데이터 계산에는 도움이 되지만 UI component state와 mount 비용을 해결하지 못하고 동기화 코드가 늘어난다.

## 아키텍처 선택

- 옵션 A: `residentSectionIds` 전역 상태와 `MountedSectionPanel`을 사용해 모든 주요 탭을 한 shell 안에 상주시킨다. 기존 패널 컴포넌트와 source state preservation 패턴을 확장하므로 선택했다.
- 옵션 B: 모든 탭을 앱 시작 렌더에서 즉시 마운트한다. 전환은 빠르지만 초기 프레임과 CPU spike가 커져 미선택.
- 옵션 C: 탭별 lazy import만 강화한다. bundle load에는 좋지만 사용자가 지적한 mount/recompute 비용은 남아 미선택.

## 폴더 구조 선택

- 옵션 A: 기존 Workspace Monitor shell 파일과 테스트/CSS만 좁게 수정한다. 탭 생명주기 책임이 `MonitorShell`에 있어 선택했다.
- 옵션 B: 새 resident section manager component로 분리한다. 장기적으로 가능하지만 이번 변경은 기존 탭 조건부 렌더를 좁게 치환하는 것이 더 안전하다.

## 설계

- `residentSectionIds`는 초기 섹션과 `source`를 기본 resident로 시작한다.
- `residentSectionMountPlan`은 현재 보이는 섹션을 우선순위 순서로 정렬한다.
- `useEffect`는 `requestIdleCallback`이 있으면 idle callback으로, 없으면 짧은 timeout fallback으로 한 섹션씩 resident로 전환한다.
- `primeSectionActivation`과 `activateSection`은 클릭 전후 모두 `markSectionResident`를 호출한다.
- 각 탭 내용은 `shouldRenderSection("<id>") && <MountedSectionPanel ...>`로 감싼다.
- `DesktopRuntimePanel`은 `surfaceActive={section === ...}`와 active tab gated `launchRequest`를 받는다.
- CSS는 `.mounted-section-panel`에 `contain: layout paint style`을 둬 hidden resident panel의 layout/paint 영향을 줄인다.

## 수용 기준

- `overview`, `desktop`, `tools`, `projects`, `history`, `intent`, `structure`, `documents`, `source`, `requirements`, `agents`가 resident panel 패턴을 사용한다.
- 기존 `{sectionContentReady && section === "..."} ` 기반 주요 탭 mount gate가 남지 않는다.
- workspace-monitor tests/check가 통과한다.
- platform-desktop-app tests/check와 `package:internal`이 통과한다.

## 근거

- React state preservation guidance: https://react.dev/learn/preserving-and-resetting-state
- React memoization reference: https://react.dev/reference/react/useMemo
- React lazy/code splitting reference: https://react.dev/reference/react/lazy
- MDN CSS containment and rendering performance reference: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
- MDN content-visibility reference: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility

## 제한

- 이 변경은 전환 시 mount 비용을 줄이는 것이며, 각 탭 내부의 비싼 effect가 활성 상태와 무관하게 실행되면 별도 최적화가 필요하다.
- 메모리를 더 쓰는 설계이므로 저사양 환경에서는 resident section count와 idle scheduling을 설정화할 여지가 있다.
