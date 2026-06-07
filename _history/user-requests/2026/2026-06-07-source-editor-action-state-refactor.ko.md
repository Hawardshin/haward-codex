# 2026-06-07 소스 에디터 액션 상태 분리 요청

## 요청 요약

- 이전 히스토리를 기준으로 범위를 너무 좁게 잡지 말고 더 넓은 기능 흐름까지 구현한다.
- 큰 `MonitorShell.tsx`의 중복 상태 전환과 소스 에디터 동작 로직을 계속 분리한다.
- 기능 이슈가 생기지 않도록 TypeScript와 Rust를 포함한 내부 패키징 흐름까지 확인한다.

## 적용 범위

- 소유 프로젝트: `platform-desktop-app`
- 주요 대상: Workspace Monitor source editor open/select/save/save-all/revert/close 상태 전환
- 작업 모드: `standard`

## 수용 기준

- 소스 에디터의 draft 액션 상태 전환을 `MonitorShell.tsx` 밖의 재사용 가능한 모듈로 이동한다.
- 저장 report 병합과 저장 대상 생성 로직을 공통 helper로 통일한다.
- 테스트용 TypeScript 모듈 importer가 새 helper의 상대 import를 처리할 수 있어야 한다.
- Workspace Monitor check/test, platform-desktop-app test, 내부 패키징 명령이 통과해야 한다.
