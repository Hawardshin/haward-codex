# 계획: Workspace Monitor 정적 asset 경로 버그 수정

## 범위

- `workspace-monitor` 정적 build output path 안전성
- `SnapshotLoader` public JSON fetch URL
- 성능 예산 script의 회귀 검사

## 단계

1. web-first intake로 Next.js static export/assetPrefix, Fetch URL, Tauri asset context를 확인한다.
2. build output과 Playwright smoke로 absolute path 버그를 재현한다.
3. Next static asset path와 snapshot fetch를 상대 경로로 수정한다.
4. `perf:budget`에 absolute `/_next` 회귀 검사를 추가한다.
5. type check, unit test, build, budget, subpath Playwright smoke를 실행한다.
6. 요구사항, 스펙, 히스토리, 평가 기록을 갱신한다.

## 판단

- 새 dependency 설치는 필요하지 않다.
- Rust/Tauri toolchain 부재는 이번 web static bugfix 검증을 막지 않는다.
- 일반 브라우저 `file://` fetch 실패는 별도 Tauri asset protocol 검증 과제로 남긴다.
