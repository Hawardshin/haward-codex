# 웹 검색 기록: Workspace Monitor Playwright Install

- 날짜: 2026-06-05
- 사용자 요청 요약: 부족한 설치 항목을 진행한다.
- 검색어:
  - `Playwright official install browsers pnpm @playwright/test chromium`
  - `Playwright official documentation installation pnpm install @playwright/test`
  - `Tauri official updater plugin install configure updater v2`
  - `Apple Developer ID notarization official notarize app command line`

## 확인한 출처

- Playwright Browsers documentation: Playwright package install과 browser binary install이 별도 단계임을 확인했다.
- Playwright installation docs: Playwright Test 설치 경로 확인에 사용했다.
- Tauri updater docs: updater warning은 plugin 설치뿐 아니라 endpoint/signature 설정이 필요한 별도 제품 작업임을 확인했다.
- Apple Developer documentation: notarization warning은 Developer ID/credential과 release workflow가 필요한 항목임을 확인했다.

## 계획 영향

- 자동 진행 가능한 부족 설치 항목은 `workspace-monitor`의 project-local Playwright devDependency와 Chromium headless shell로 한정했다.
- public signing/notarization, updater endpoint/signing key, clean-machine smoke는 설치만으로 해결되지 않으므로 이번 설치 범위에서 제외하고 검증 warning으로 유지한다.

## 공개 판단 요약

이번 설치는 UI 회귀/viewport/click audit를 자동화할 수 있게 하는 개발 검증 의존성 추가다. 전역 설치는 하지 않았고, pnpm lockfile과 설치 audit record에 추적했다.
