# Workspace Monitor 소스 코드 뷰어 조사 메모

## 결론

현재 단계에서는 Monaco나 Shiki를 설치하지 않고, build-time snapshot에 소스 파일 preview를 담아 읽기 전용으로 보여주는 방식이 가장 적합하다. 이미 `workspace-monitor`가 정적 snapshot을 기반으로 동작하므로 코드도 같은 경로로 수집하면 Vercel/static export 구조와 잘 맞고, 의존성 증가도 피할 수 있다.

## 선택지

- Plain `<pre><code>`: 빠르고 작고 안전하다. 현재 선택.
- Shiki: 정적 syntax highlighting이 좋지만 dependency와 build 비용이 생긴다.
- Monaco: 강력하지만 편집기 성격이 강하고 bundle, 보안, 권한, 저장 동작 설계가 필요하다.

## 적용 기준

- developer/superadmin view에서만 Source 탭 표시
- source root allowlist
- generated/build/dependency/큰 파일 제외
- public 배포 전 `sourceFiles` 검토

## 주요 출처

- Node.js File system docs: https://nodejs.org/api/fs.html
- Next.js Static Exports: https://nextjs.org/docs/app/guides/static-exports
- Shiki install docs: https://shiki.style/guide/install
- Monaco Editor: https://microsoft.github.io/monaco-editor/
