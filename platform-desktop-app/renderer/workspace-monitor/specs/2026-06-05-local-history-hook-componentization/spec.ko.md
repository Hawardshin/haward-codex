# Local History Hook Componentization Spec

## 목적

Workspace Monitor에 누적된 로컬 기록 데이터 처리와 UI 문구가 `MonitorShell.tsx`에 계속 쌓이는 문제를 줄인다. 로컬 generated resource는 필요한 시점과 idle 시점에 캐시해 탭 진입 지연을 낮추고, 핵심 History 화면의 한국어 문구를 자연스럽게 정리한다.

## 요구사항

- 관리자 기록 색인 fetch, 모듈 캐시, idle preload, 문서 병합, 날짜별 그룹 생성은 `MonitorShell.tsx` 밖의 전용 hook/module이 소유한다.
- History/Documents 섹션 진입 시 즉시 로드하고, 그 전에는 브라우저 idle 시간에 local `admin-history-index.json`을 미리 캐시할 수 있어야 한다.
- `MonitorShell.tsx`는 관리자 기록 로딩 구현 세부사항 대신 hook 결과만 사용한다.
- History 핵심 화면의 한국어 기본 UI는 `History Days`, `History Docs`, `Unified Ops`, `stream`, `docs` 같은 불필요한 영어식 표현을 피한다.
- 회귀 테스트는 분리된 hook, 로컬 캐시, idle preload, 한국어 문구를 검증해야 한다.

## 비범위

- `MonitorShell.tsx` 전체 componentization 완료는 이번 slice의 범위가 아니다.
- public distribution gate, signing/notarization, external smoke test는 다루지 않는다.
