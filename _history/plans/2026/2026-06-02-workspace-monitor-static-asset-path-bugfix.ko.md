# 계획: Workspace Monitor 정적 asset 경로 버그 수정

## 목적

버그/기능 이슈 점검 중 재현된 Workspace Monitor 정적 export 경로 문제를 해결하고, desktop/subpath context에서 같은 문제가 재발하지 않게 한다.

## 범위

- 포함: `workspace-monitor` Next static asset path, snapshot JSON fetch URL, `perf:budget` 회귀 검사, Playwright subpath smoke
- 제외: Rust/Tauri toolchain 설치, packaged `.app` smoke, snapshot JSON sharding/compression

## 실행 순서

1. web-first intake와 memory bootstrap
2. 기존 check/test/build/perf baseline 확인
3. `file://` smoke로 `_next` root-relative asset path 실패 재현
4. relative `assetPrefix`와 document-relative snapshot fetch 적용
5. `perf:budget` absolute `/_next` 회귀 검사 추가
6. check/test/build/perf와 repository-root subpath Playwright smoke 검증
7. 요구사항/스펙/히스토리/평가 기록 업데이트

## 리스크 관리

- 일반 Chromium `file://` local JSON fetch 실패는 Tauri asset protocol 실패로 단정하지 않는다.
- 검증용 HTTP 서버는 smoke 후 PID를 확인해 종료한다.
