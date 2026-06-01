# 스펙: Playwright 브라우저 검증

## 목표

`presentation-agent`가 생성한 HTML 발표 덱을 실제 Chromium browser에서 자동 검증한다.

## 요구사항

- `REQ-PA-015`를 추가한다.
- Playwright Test와 `@axe-core/playwright`를 project-local devDependency로 설치한다.
- Chromium desktop/mobile viewport를 모두 검증한다.
- `.pa-slide`가 있는 HTML만 덱 테스트 대상으로 삼는다.
- test result와 report output은 git에 넣지 않는다.
- 설치 감사 기록과 registry를 남긴다.

## 비목표

- 시각 회귀 screenshot baseline은 이번 작업에서 만들지 않는다.
- 모든 브라우저(WebKit/Firefox)를 설치하지 않는다.
- 발표 품질의 미학적 판단을 axe-core로 대체하지 않는다.

## 성공 기준

- `npm run test:browser`가 20개 browser/accessibility test를 통과한다.
- `npm audit --json`에서 취약점 0개를 확인한다.
- 기존 Python 테스트와 config/registry 검증이 깨지지 않는다.
