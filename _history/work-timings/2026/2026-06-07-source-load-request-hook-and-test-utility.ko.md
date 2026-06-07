# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 작업 타이밍

## 기록

- 21:42-21:45 KST: 웹 검색, source editor request gate 위치 확인, 작업 범위 확정.
- 21:45-21:47 KST: `useSourceLoadRequestGate.ts`와 테스트 import 유틸 추가.
- 21:47-21:49 KST: `MonitorShell.tsx`, source editor index, 구조 테스트, Tool Studio 테스트, readiness map 갱신.
- 21:49-21:51 KST: 좁은 테스트, Workspace Monitor check/test, platform-desktop-app test 실행.
- 21:52-21:54 KST: 내부 패키징, Rust 테스트, Tauri build, codesign, DMG verify 실행.
- 21:55-22:00 KST: 반복 내부 실행 인스턴스 누적 확인, `open-internal-app.mjs` 기본 재사용 모드 적용, 누적 프로세스 정리, 재패키징 실행.

## 병목

- 기존 작업트리가 여러 슬라이스의 staged/unstaged/untracked 변경을 함께 포함하고 있어 안전한 단일 커밋 경계가 없다.
- 패키징은 통과했지만 공개 배포용 signing/notarization/updater 입력은 별도 블로커로 남아 있다.
- `desktop:package:run:internal`은 앱을 여는 명령까지 포함하므로 반복 검증 시 기존 인스턴스 재사용이 필요했다.
