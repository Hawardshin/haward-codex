# 계획: Playwright 브라우저 검증 설치

## 목적

`presentation-agent`가 생성한 HTML 발표 덱을 실제 Chromium에서 검증할 수 있게 한다.

## 결정

- 작업 모드: `standard`
- 설치 범위: `presentation-agent` project-local npm devDependency
- 선택 기술: TypeScript Playwright Test + `@axe-core/playwright`
- 브라우저: Chromium만 설치

## 실행 단계

1. 웹 검색과 공식 문서 확인.
2. 설치 감사 초안 작성.
3. `package.json`, `playwright.config.ts`, `tests/browser/html-deck.spec.ts` 추가.
4. `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`.
5. `npx playwright install chromium`.
6. `npm run test:browser`로 desktop/mobile Chromium 검증.
7. 실패한 sandbox 권한 문제와 통과한 외부 실행을 설치 기록에 남김.
8. 요구사항, workflow, registry, history, evaluation 갱신.

## 검증 범위

- HTML 덱 렌더링
- `.pa-slide` 존재와 nonblank 내용
- 키보드 이동
- progress count
- 발표자 노트 토글
- axe-core 자동 접근성 위반

## 보류

- screenshot baseline
- Playwright webServer 기반 dev server 테스트
- LLM prompt regression
