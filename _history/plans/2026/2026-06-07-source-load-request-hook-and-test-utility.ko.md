# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 계획

## 목표

- `MonitorShell.tsx`의 비동기 source load 요청 순번 관리 코드를 source editor 모듈로 이동한다.
- 테스트 파일 간 반복되던 TypeScript 모듈 import shim을 공통 유틸로 이동한다.

## 실행 슬라이스

1. `useSourceLoadRequestGate.ts`를 추가하고 source editor index에서 내보낸다.
2. `MonitorShell.tsx`에서 inline request sequence ref와 callback을 제거하고 새 훅을 사용한다.
3. 테스트용 `import-type-script-module.mjs`를 추가하고 기존 helper 테스트에 적용한다.
4. source editor 구조 테스트와 Tool Studio 계약 테스트가 새 경계를 확인하도록 갱신한다.
5. readiness source structure 집계에 새 hook 파일을 등록한다.
6. 내부 앱 실행 스크립트가 반복 실행 시 새 인스턴스를 누적하지 않도록 기본 실행을 기존 인스턴스 재사용으로 바꾼다.
7. 좁은 테스트, 전체 workspace-monitor 검증, platform-desktop-app 테스트, 내부 패키징을 실행한다.

## 제외

- source editor 전체 reducer 전환은 다음 슬라이스 후보로 남긴다.
- 공개 배포 서명, notarization, updater endpoint 설정은 이번 작업 범위가 아니다.
