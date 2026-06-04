# 스펙: 버튼 클릭 무지연 계약

## 목표

Workspace Monitor에서 버튼이나 버튼형 컨트롤을 누를 때 실제 action이 무겁더라도 사용자는 즉시 눌림 피드백을 봐야 한다. React click handler, 섹션 이동, modal open, native 호출, clipboard 작업, workbench mount는 첫 피드백 paint를 막으면 안 된다.

## 요구사항

- `REQ-WM-041`: 버튼 클릭은 heavy workbench mount나 evidence assembly 때문에 첫 응답 paint를 막으면 안 된다.
- `REQ-WM-055`: 모든 버튼/버튼형 컨트롤은 capture-phase 즉시 눌림 피드백을 제공해야 한다.

## 설계

- `.desktop-app-root`에 capture-phase `pointerdown`/`keydown` listener를 설치한다.
- 대상은 `button`, `[role='button']`, `summary`, `a[href]`로 잡는다.
- 비활성 버튼과 `aria-disabled="true"` 대상은 제외한다.
- 이벤트 capture 단계에서 `data-instant-button-feedback="active"`를 즉시 부여한다.
- 첫 paint 이후 `data-instant-button-painted="true"`를 기록하고 짧은 시간 후 정리한다.
- CSS는 데이터 속성 기반으로 가벼운 눌림 상태를 표시한다.
- `scripts/audit-button-response.mjs`는 정적 export + CPU throttle 6에서 67개 representative press sample과 실제 nav click sample p95를 측정한다.

## 근거

- web.dev INP 문서는 interaction을 input delay, processing duration, presentation delay로 나누며, 긴 작업이 사용자의 다음 paint를 막지 않도록 작업을 줄이거나 분리할 것을 권장한다.
- web.dev long task 문서는 main thread 긴 작업을 쪼개고 yield하여 interaction이 더 빨리 처리될 기회를 만들 것을 권장한다.
- React `useTransition` 문서는 일부 UI 렌더링을 non-blocking update로 다루는 방향을 제공한다. 이 스펙은 React update 이전 capture 단계의 즉시 피드백으로 더 앞단을 보강한다.

## 비범위

- 모든 개별 버튼 action의 완료 시간을 60ms 이하로 만드는 것
- native command 자체의 실행 시간 최적화
- clipboard, browser permission, external URL 동작 변경
