# 요구사항 리뷰: 모드와 기능 선택 위치 스위치보드

## 리뷰 결과

- 상태: `accepted`
- 요구사항: `REQ-WM-019`
- 범위: `workspace-monitor` user-facing monitor UI와 snapshot schema

## 판단

- 요구사항은 기존 view/language/work/install/CLI adapter registry를 대체하지 않고, 사용자가 찾을 수 있는 명시적 선택 표면을 추가한다.
- work/install mode는 task/setup 절차에 속하므로 브라우저 상태로 저장하지 않는 비목표가 적절하다.
- CLI adapter는 optional guest capability이므로 switchboard에서 자동 설치 또는 필수화하지 않는 것이 적절하다.

## 수용 기준

- snapshot catalog, Overview UI, readiness checks, build validation이 연결되어야 한다.
