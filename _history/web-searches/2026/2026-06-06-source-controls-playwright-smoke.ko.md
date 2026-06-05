# 웹 검색 기록: 소스 컨트롤 Playwright 스모크

- 날짜: 2026-06-06
- 작업: Next dev 검증 한계 분리와 정적 export 기반 Playwright 스모크 추가

## 검색

- `Next.js app router client component useEffect not running hydration official docs`
- `Next.js static export output export official docs app router`
- `Playwright page waitForSelector official docs locator wait timeout`

## 확인한 출처

- Next.js Server and Client Components 공식 문서: `https://nextjs.org/docs/app/getting-started/server-and-client-components`
- Next.js Static Exports 공식 문서: `https://nextjs.org/docs/14/app/building-your-application/deploying/static-exports`
- Playwright Auto-waiting 공식 문서: `https://playwright.dev/docs/actionability`
- Playwright Locator 공식 문서: `https://playwright.dev/docs/api/class-locator`

## 작업 반영

- Next.js 문서상 Client Component는 hydration 이후 브라우저 이벤트와 lifecycle 로직이 활성화된다. dev 서버 Playwright 경로에서 fetch/useEffect가 시작되지 않는 현상은 앱 static export 산출물 검증으로 분리했다.
- Next.js static export 문서상 `next build`는 `out/` 정적 HTML/CSS/JS 산출물을 만든다. Tauri가 실제로 임베드하는 이 산출물을 정적 서버에서 검증 대상으로 삼았다.
- Playwright 문서상 locator click은 표시, 안정성, 이벤트 수신, enabled 상태를 자동 확인한다. 새 스모크는 파일 선택 트리거를 실제 클릭하고 메뉴와 항목 수, bounding box, page error를 확인한다.

## 무시한 약한 출처

- 블로그와 커뮤니티 글은 이번 판단 근거로 쓰지 않았다. 구현/검증 판단은 공식 문서와 로컬 실행 결과만 사용했다.
