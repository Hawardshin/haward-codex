# 2026-06-05 설치 기록: workspace-monitor Playwright browser validation

## 상태

- 상태: installed
- 설치 대상: `@playwright/test`, Chromium browser binary
- 소유 프로젝트/도구: `platform-desktop-app/renderer/workspace-monitor`
- 설치 범위: project devDependency
- 환경 경로: `platform-desktop-app/renderer/workspace-monitor/node_modules/`, Playwright browser cache

## 설치 이유

- Agent Core UI 검증에서 standalone Playwright가 없어 in-app Browser로만 정적 export audit를 수행했다.
- 앞으로 390px/720px/desktop viewport, click-to-paint, overflow, target-size 회귀를 자동화하려면 프로젝트 로컬 Playwright가 필요하다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| https://playwright.dev/docs/browsers | 2026-06-05 | Playwright browser binary 설치 방식과 Chromium headless shell 선택 기준 확인 |
| https://playwright.dev/docs/next/intro | 2026-06-05 | Playwright Test 설치 방식 확인 |
| https://v2.tauri.app/ko/plugin/updater/ | 2026-06-05 | public release updater warning은 별도 제품/서명 결정이 필요한 항목임을 구분 |
| https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution | 2026-06-05 | notarization warning은 Apple Developer ID/credential이 필요한 항목임을 구분 |

## 설치 계획

- 정확한 설치 명령:
  - `corepack pnpm --filter workspace-monitor add -D -E @playwright/test@1.60.0`
  - `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec playwright install chromium --only-shell`
- dependency 기록 파일:
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `pnpm-lock.yaml`
- lock/SBOM 상태: pnpm lockfile에 exact devDependency 추가 예정.
- 권한 승인 필요 여부: 현재 정책상 승인 요청 없이 진행 가능. 전역 설치는 하지 않는다.

## 보안/라이선스 검토

- 보안 검토: 프로젝트 로컬 devDependency로 제한한다. 설치 후 `pnpm audit --prod=false`와 기존 check/test/build를 실행한다.
- 라이선스 검토: `@playwright/test`와 `playwright` metadata는 Apache-2.0, repository는 `microsoft/playwright`.
- 알려진 위험: browser binary 다운로드 용량, host OS/font 차이에 따른 visual/flaky 차이. 이번 설치는 Chromium headless shell 중심 검증에 제한한다.

## 설치 후 실제 결과

- 실행한 명령:
  - `corepack pnpm --filter workspace-monitor add -D -E @playwright/test@1.60.0`
  - `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec playwright install chromium --only-shell`
- 설치된 버전:
  - `@playwright/test@1.60.0`
  - `playwright@1.60.0`
  - `playwright-core@1.60.0`
- 변경된 파일:
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `pnpm-lock.yaml`
- 생성/갱신된 lock 파일: `pnpm-lock.yaml`
- browser binary 상태:
  - Chromium headless shell 설치 명령 통과
  - `chromium.launch({ headless: true })` smoke 통과
- 검증 명령과 결과:
  - `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec playwright --version`: `Version 1.60.0`
  - `node -e "import('@playwright/test')..."`: import 통과
  - Chromium launch smoke: `{"status":"chromium-launch-ok","buttonHeight":44}`
  - `corepack pnpm audit --prod=false`: No known vulnerabilities found
  - `corepack pnpm --filter workspace-monitor run check`: 통과
  - `corepack pnpm --filter workspace-monitor test`: 17개 통과
  - `corepack pnpm --filter workspace-monitor run build:customer`: 통과
  - `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 332555 bytes
  - `corepack pnpm --filter platform-desktop-app run check`: 통과, public release warning은 기존 signing/updater/clean-machine 항목만 유지

## Rollback

- 제거 명령:
  - `corepack pnpm --filter workspace-monitor remove @playwright/test`
  - `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec playwright uninstall chromium`
- 되돌릴 파일:
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `pnpm-lock.yaml`
- 복구 검증:
  - `corepack pnpm --filter workspace-monitor run check`
  - `corepack pnpm --filter workspace-monitor test`

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-05.ko.md`
- 커밋: pending
