# 2026-06-07 소스 에디터 catalog helper 분리 계획

## 단계

1. `MonitorShell.tsx`의 source catalog 파생 계산을 확인한다.
2. `sourceCatalog.ts`에 catalog 선택, AGENTS.md 경로, 필터, 선택 파일, root label helper를 추가한다.
3. `MonitorShell.tsx`를 helper 호출로 교체한다.
4. 구조 계약 테스트와 기존 Tool Studio 계약 테스트를 새 경계에 맞춘다.
5. check, test, package/run을 실행한다.

## 제외

- 파일 읽기/쓰기 async handler hook 이동은 이번 조각에서 제외한다.
- Rust command와 UI copy는 변경하지 않는다.
