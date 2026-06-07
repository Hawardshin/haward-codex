# 2026-06-07 소스 에디터 문서 helper 분리 누락 점검

## 체크리스트

- [x] 새 helper 파일을 source-editor barrel export에 연결했다.
- [x] `MonitorShell.tsx`에서 inline AGENTS starter 문자열을 제거했다.
- [x] `MonitorShell.tsx`에서 inline patch context 문자열을 제거했다.
- [x] 구조 계약 테스트가 새 helper와 제거된 inline 문자열을 확인한다.
- [x] readiness source map이 새 helper 파일을 monitor workbench source aggregate에 포함한다.
- [x] TypeScript와 workspace-monitor 테스트를 실행했다.
- [x] platform-desktop-app 테스트를 실행했다.
- [x] 내부 패키징 검증 결과를 최종 평가에 반영한다.
