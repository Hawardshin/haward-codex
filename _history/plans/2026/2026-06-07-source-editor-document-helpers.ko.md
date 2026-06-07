# 2026-06-07 소스 에디터 문서 helper 분리 계획

## 실행 조각

1. `MonitorShell.tsx` 안의 AGENTS starter 문서와 patch context 문자열 생성 위치 확인.
2. `components/workbench/source-editor/sourceDocuments.ts`로 순수 helper 분리.
3. `source-editor/index.ts`와 `MonitorShell.tsx` import 경계 갱신.
4. 구조 계약 테스트와 readiness source map 갱신.
5. workspace-monitor check/test, platform-desktop-app test, 내부 패키징으로 회귀 확인.

## 제외

- 저장/로드 이벤트 hook 분리는 다음 조각에서 다룬다.
- 공개 배포 signing/notarization 준비 상태는 이번 조각의 주장 범위가 아니다.
