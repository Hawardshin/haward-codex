# 2026-06-07 리소스 점검: 물개형 3D 에이전트

## 런타임 리소스

- 개발 서버: `corepack pnpm run dev --port 3020`로 검증 후 `Ctrl-C`로 종료했다.
- Browser: in-app Browser로 DOM/렌더 준비 상태를 확인했다. 개발 서버 종료 후 localhost 탭 닫기는 Browser URL policy로 생략됐지만, 서버 프로세스는 종료됐다.
- Playwright: headless Chromium을 열어 desktop/mobile WebGL pixel sample을 검사했고 `browser.close()`로 종료했다.
- 패키징: `desktop:package:internal`은 정상 종료했다.

## 확인 결과

- 장기 실행 dev server 세션은 남기지 않았다.
- Tauri package pipeline은 Rust test/build, Tauri release build, codesign verify, DMG verify까지 완료했다.
