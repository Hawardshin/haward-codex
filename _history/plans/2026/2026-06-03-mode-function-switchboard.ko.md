# 계획: 모드와 기능 선택 위치 스위치보드

- 작업 모드: `standard`
- 소유 프로젝트: `workspace-monitor/`
- view_mode: `superadmin_developer`
- install_mode: `developer`

## 계획

1. web-first intake와 memory bootstrap을 수행한다.
2. 기존 view/language/work/install/CLI registry와 desktop UI 모드 위치를 확인한다.
3. `modeFunctionCatalog`를 snapshot collector에 추가한다.
4. Overview에 `Mode & Function Switchboard`를 추가하고 가능한 항목은 실제 선택/이동 동작에 연결한다.
5. 요구사항 `REQ-WM-019`, project spec, readiness check를 추가한다.
6. collect/test/check/build/perf/static smoke와 close-out gate를 통과시킨다.

## 범위 통제

- 포함: `workspace-monitor` collector/type/UI/CSS/test, `platform-desktop-app` readiness check, 관련 요구사항/스펙/히스토리.
- 제외: 새 CLI 자동 설치, work/install mode의 browser persistence, 보안 경계 변경.
