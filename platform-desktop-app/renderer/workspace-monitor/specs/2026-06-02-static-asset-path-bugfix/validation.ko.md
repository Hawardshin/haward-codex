# 검증: Workspace Monitor 정적 asset 경로 버그 수정

## 명령 검증

- `npm --prefix workspace-monitor run check`: 통과
- `npm --prefix workspace-monitor test`: 10개 테스트 통과
- `npm --prefix workspace-monitor run build`: 통과
- `npm --prefix workspace-monitor run perf:budget`: 통과
  - `staticAssetPaths`: `relative`
  - largest chunk: `227,537 bytes`
  - budget: `1,000,000 bytes`

## 브라우저 smoke

- 재현: `file:///.../workspace-monitor/out/index.html`
  - 수정 전: `_next` asset 요청이 `file:///_next/...`로 나가 `ERR_FILE_NOT_FOUND` 발생
  - 수정 후: `_next` asset 요청 실패는 사라졌지만 일반 Chromium은 local JSON `fetch(file://...)`를 막아 `Failed to fetch`를 표시한다.
- 통과 기준: repository root 정적 서버
  - server: `python3 -m http.server 3010 --bind 127.0.0.1 --directory <repo>`
  - URL: `http://127.0.0.1:3010/workspace-monitor/out/index.html`
  - 결과: `hasDesktop=true`, `hasSnapshotUnavailable=false`, `_next`/snapshot request failure 없음
  - server log: `_next` chunks와 `workspace-snapshot.json`이 모두 `/workspace-monitor/out/...` 경로로 `200` 응답
  - cleanup: tracked TTY server session에 `Ctrl-C`를 보내 종료하고 `lsof -ti tcp:3010`로 포트 해제 확인

## 남은 리스크

- 실제 Tauri WebView asset protocol 검증은 Rust/Tauri toolchain 준비 후 별도 smoke가 필요하다.
- snapshot JSON 크기 자체는 후속 sharding/compression 과제로 남아 있다.
