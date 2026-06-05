# 웹 검색 기록: shared workspace resource cache

## 쿼리

- `React large component performance split lazy boundary useMemo deferred value tab switching dashboard 2026`
- `desktop app workbench React performance tab switch lazy load keep alive panels 2026`
- `Tauri React desktop app performance large dashboard lazy modules memory CPU best practices`
- `React official documentation lazy Suspense memo useMemo performance large lists virtualize`
- `React official docs useMemo memo useDeferredValue performance optimizing re-rendering`
- `Tauri v2 official docs process model Rust frontend performance architecture`

## 확인한 강한 출처

- React official docs: `useMemo`, `memo`, `useDeferredValue`, `lazy`
- Tauri official docs: Process Model, Architecture

## 계획 영향

- React docs는 memo/useMemo/lazy가 의미 보장이 아니라 렌더 비용 최적화 도구임을 명확히 하므로, 무차별 memo보다 측정 가능한 중복 native 요청 제거를 선택했다.
- Tauri docs는 frontend와 Rust core process를 message passing으로 나누고, 무거운 시스템 작업은 core process로 보내는 방향을 제시한다. 따라서 source catalog와 OS warmup은 Rust 명령을 유지하되, React resident panel 두 개가 같은 명령을 동시에 중복 호출하지 않게 공유 in-flight/cache를 둔다.

## 약한 출처 처리

- 블로그와 커뮤니티 글은 발견 신호로만 보고 구현 근거로 사용하지 않았다.
