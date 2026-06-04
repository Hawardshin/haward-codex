# 스펙: 탭 전환 무지연 계약

## 목표

Workspace Monitor의 탭 클릭은 어떤 대상 섹션으로 가더라도 active 탭, 제목, 전환 피드백을 먼저 paint해야 한다. Agents, Desktop, Source, Tool Studio 같은 무거운 body는 첫 paint 이후 staged mount로 붙인다.

## 요구사항

- `REQ-WM-039`: 닫힌 보조 기능군 때문에 주요 탭 전환이 느려지면 안 된다.
- `REQ-WM-041`: 버튼 클릭은 heavy workbench mount나 대량 필터링 때문에 첫 응답 paint를 막으면 안 된다.
- `REQ-WM-054`: 섹션 body는 staged mount로 지연하고, Source 검색 같은 대량 스캔은 대상 섹션 body 준비 후 실행한다.

## 설계

- `section`은 사용자의 클릭 순간 즉시 갱신한다.
- `readySection`은 `scheduleAfterFirstPaint` 뒤에만 갱신한다.
- `sectionContentReady = readySection === section`일 때만 실제 섹션 body를 mount한다.
- 전환 중에는 `section-transition-shell`만 렌더링해 active 탭과 제목이 먼저 보이게 한다.
- Source query는 `sectionContentReady && section === "source"`일 때만 대량 source content 검색을 실행한다.

## 근거

- web.dev INP 문서는 사용자 상호작용을 input delay, processing duration, presentation delay로 나누고, 긴 main-thread task를 쪼개 첫 paint를 빠르게 만드는 것을 권장한다.
- React 공식 문서는 `useTransition`을 UI 일부를 background에서 렌더링하는 Hook으로 설명하고, `lazy`는 컴포넌트 코드를 실제 렌더 시점까지 지연할 수 있음을 설명한다.

## 비범위

- 실제 데이터 수집기 구조 변경
- 새 dependency 설치
- 모든 섹션의 완전한 코드 splitting
