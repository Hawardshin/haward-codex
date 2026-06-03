# 작업 평가: 핵심 기능 메인 탭 UX

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-044`
- 범위: Overview 핵심 기능 탭, 기능별 3단계 흐름, primary action, 설치형 데이터 path disclosure, readiness/browser smoke

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| 사용자가 첫 화면에서 핵심 기능을 고를 수 있다 | 통과 | `파일 가져오기`, `에이전트 만들기`, `작업 실행`, `학습/개선` 메인 탭 구현 |
| 각 기능이 다음 행동을 알려준다 | 통과 | `main-feature-detail`에 목적, 3단계 steps, primary/secondary action 배치 |
| 기본 진입이 작업공간/파일 가져오기 중심이다 | 통과 | `activeHomeTab` 기본값을 `files`로 설정 |
| 설치형 데이터 raw path가 기본 UX를 압도하지 않는다 | 통과 | accumulated/runtime/support path를 `path-disclosure` details 안으로 이동 |
| readiness가 새 구조를 강제한다 | 통과 | `check-readiness.mjs`와 `readiness.test.mjs`에 핵심 탭/path disclosure token 추가 |
| 브라우저에서 탭 구조와 전환이 동작한다 | 통과 | Browser smoke에서 탭 4개, 기본 detail, `작업 실행` 전환, quick action 확인 |

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed before records
- Browser static-build smoke: passed
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-core-main-tabs-ux/core-main-tabs.png`

## 리소스 정리

- 정적 서버 `python3 -m http.server 3217`은 검증 후 종료했다.
- Browser automation은 screenshot 저장 후 추가 loop 없이 종료했다.
- Customer static build output은 tracked snapshot regeneration 범위만 포함했다.

## 잔여 위험

- 실제 신규 사용자의 이해도는 packaged app first-run smoke와 사용성 테스트로 계속 확인해야 한다.
- 앱 전체의 모든 운영성/path 문구를 완전히 재작성한 것은 아니며, 이번 slice는 Overview와 설치형 데이터 영역의 기본 노출을 우선 개선했다.
