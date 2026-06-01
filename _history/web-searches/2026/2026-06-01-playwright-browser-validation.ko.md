# 웹 검색 기록: Playwright 브라우저 검증 설치

## 요청

Playwright 검증을 실제로 할 수 있게 설치하고 설정한다.

## 작업 모드

`standard`

## 검색 시각

2026-06-01

## 검색 쿼리

- `Playwright official installation npm @playwright/test install chromium`
- `Playwright official accessibility testing @axe-core/playwright`
- `Playwright official visual comparisons test snapshots toHaveScreenshot`
- `Playwright official configuration webServer file URLs html testing`

## 확인한 주요 출처

- Playwright Getting Started: https://playwright.dev/docs/intro
- Playwright Browsers: https://playwright.dev/docs/browsers
- Playwright Accessibility Testing: https://playwright.dev/docs/accessibility-testing
- Playwright Visual Comparisons: https://playwright.dev/docs/test-snapshots
- Playwright GitHub: https://github.com/microsoft/playwright
- axe-core Playwright package: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright
- Playwright MachPort 관련 이슈 검색: https://github.com/microsoft/playwright/issues?q=MachPortRendezvousServer

## 판단

- `presentation-agent`의 HTML 산출물은 실제 browser DOM, viewport, keyboard navigation, accessibility scan이 필요하므로 Playwright Test가 맞다.
- `@axe-core/playwright`는 같은 Playwright page에서 자동 접근성 위반을 검사할 수 있어 함께 설치한다.
- screenshot baseline은 Playwright가 지원하지만 OS/browser/font 차이가 영향을 줄 수 있으므로 이번 작업에서는 도입하지 않는다.
- Codex sandbox 안에서는 Chromium이 macOS Mach port 권한 오류로 실행되지 않았으나, 승인된 외부 실행에서는 통과했다.

## 계획 영향

- `presentation-agent/package.json`, `package-lock.json`, `playwright.config.ts`, `tests/browser/html-deck.spec.ts`를 추가한다.
- Chromium desktop/mobile viewport에서 실제 `.pa-slide` 덱만 검사한다.
- 설치 기록과 설치 레지스트리를 갱신한다.

## 불확실성

- 다른 머신에서는 `cd presentation-agent && npm install && npm run install:browsers`가 필요하다.
- 자동 accessibility scan은 발표 품질, 설득력, 내러티브를 보장하지 않는다.
