# 2026-06-01 설치 기록: presentation-agent Playwright browser validation

## 상태

- 상태: installed
- 설치 대상: `@playwright/test`, `@axe-core/playwright`, Chromium browser binary
- 소유 프로젝트/도구: `presentation-agent`
- 설치 범위: project
- 환경 경로: `presentation-agent/node_modules/`, Playwright browser cache

## 설치 이유

- 사용자가 "검증 못한다고 하는데 플레이 라이트 검증 할 수 있게 알아서 설치"하라고 요청했다.
- `presentation-agent`의 생성 HTML 덱은 실제 브라우저 렌더링, 키보드 이동, 발표자 노트, 접근성 자동 검사가 필요하다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| https://playwright.dev/docs/intro | 2026-06-01 | npm 기반 Playwright Test 설치와 실행 방식 확인 |
| https://playwright.dev/docs/browsers | 2026-06-01 | Chromium browser 설치 방식 확인 |
| https://playwright.dev/docs/accessibility-testing | 2026-06-01 | `@axe-core/playwright`를 이용한 접근성 scan 방식 확인 |
| https://playwright.dev/docs/test-snapshots | 2026-06-01 | 시각 회귀는 환경 고정 후 별도 단계로 둬야 함을 확인 |
| `presentation-agent/configs/evaluation/harness-candidates.json` | 2026-06-01 | 이전 하네스 검토에서 Playwright/axe-core가 근시일 후보로 기록됨 |

## 설치 계획

- 정확한 설치 명령:
  - `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`
  - `npx playwright install chromium`
- dependency 기록 파일:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
- lock/SBOM 상태: npm lock 파일 생성 예정.
- 예상 변경 파일:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
  - `.gitignore`
- 권한 승인 필요 여부: 네트워크 다운로드와 browser binary 설치가 필요하므로 승인 필요.

## 보안/라이선스 검토

- 보안 검토: 프로젝트 로컬 npm devDependency로 제한하고, 설치 후 `npm audit --json`을 실행한다.
- 라이선스 검토: `@playwright/test`는 Apache-2.0 계열, `@axe-core/playwright`/`axe-core`는 MPL-2.0 계열로 알려져 있으나 설치 후 package metadata로 재확인한다.
- 유지보수/커뮤니티 신호: Playwright와 axe-core는 공식 문서와 널리 쓰이는 자동화/접근성 검사 생태계를 가진다.
- 알려진 위험: browser binary 다운로드 용량, host OS/font 차이에 따른 screenshot flake, axe 자동 검사의 한계.

## 설치 후 실제 결과

- 실행한 명령:
  - `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`
  - `npx playwright install chromium`
- 설치된 버전:
  - `@playwright/test@1.60.0`
  - `@axe-core/playwright@4.11.3`
  - `axe-core@4.11.4`
  - Chrome for Testing `148.0.7778.96` (`playwright chromium v1223`)
  - Chrome Headless Shell `148.0.7778.96` (`playwright chromium-headless-shell v1223`)
  - FFmpeg `playwright ffmpeg v1011`
- 변경된 파일:
  - `.gitignore`
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
- 생성/갱신된 lock 파일: `presentation-agent/package-lock.json`
- 검증 명령과 결과:
  - `npm ls --depth=0`: `@axe-core/playwright@4.11.3`, `@playwright/test@1.60.0`
  - `npm audit --json`: 취약점 0개
  - `npx playwright --version`: `Version 1.60.0`
  - `npm run test:browser`: 20개 Playwright browser/accessibility tests 통과
  - sandbox 기본 실행은 macOS Mach port 권한 때문에 실패했고, 승인된 외부 실행에서 통과했다.

## Rollback

- 제거 명령:
  - `npm uninstall @playwright/test @axe-core/playwright`
  - `npx playwright uninstall chromium`
- 되돌릴 파일:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
  - `.gitignore`
- 복구 검증:
  - `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-01.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-06-01-presentation-agent-playwright-validation.ko.md`
- 커밋: pending
