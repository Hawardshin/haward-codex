# 조사 요약: Workspace Monitor 정적 asset 경로 버그 수정

## 기술 스택

- Next.js static export
- React client component
- Browser Fetch API
- Tauri desktop shell target

## 언어/런타임 옵션

- TypeScript/Next.js 설정 수정: 선택. 기존 프로젝트 경계 안에서 generated asset URL과 client fetch를 바로 고칠 수 있다.
- Rust/Tauri backend 수정: 보류. 현재 문제는 WebView가 로드하는 static frontend asset path 문제이며, Rust toolchain도 아직 없다.

## 아키텍처 옵션

- 상대 URL static export: 선택. desktop/subpath context에서 별도 서버 rewrite 없이 동작하고 현재 Next export 구조를 유지한다.
- basePath/subpath 고정: 보류. 특정 subpath에는 맞지만 desktop/file-like packaging과 여러 배포 경로에 덜 유연하다.
- Tauri backend API로 snapshot 제공: 보류. 향후 가능하지만 이번 버그는 static export 경로 문제라 범위가 커진다.

## 참조 근거

- Next.js static export 공식 문서: 정적 HTML/CSS/JS asset serving 전제 확인
- Next.js `assetPrefix` 공식 문서: `_next/static` asset path에 영향 확인
- MDN `Window.fetch()` 공식 문서: URL object resource 인자 확인
- Tauri asset protocol 공식 문서: 일반 browser file URL과 packaged WebView asset serving의 차이 확인

## 구현 결정

- `assetPrefix: "./"`로 `_next` asset path를 상대화한다.
- `SnapshotLoader`는 `new URL("workspace-snapshot.json", window.location.href)`로 snapshot을 문서 위치 기준 fetch한다.
- 성능 예산 검사에 absolute `/_next` 회귀 탐지를 추가한다.

## 검증 결정

- repository-root 정적 서버에서 `/workspace-monitor/out/index.html`을 열어 subpath scenario를 검증한다.
- 일반 Chromium `file://` JSON fetch 실패는 기록하되 Tauri asset protocol 실패로 단정하지 않는다.
