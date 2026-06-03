# 요청-결과 추적: 데스크톱 README와 릴리즈 원샷 명령

- 요청 ID: `UR-2026-06-03-038`
- 날짜: 2026-06-03
- 소유 프로젝트: `platform-desktop-app/`
- 결과 상태: validated

## 요청 요약

- 데스크톱 앱 README가 영어라 보기 불편하므로 한국어/영어 버전을 모두 만들어야 한다.
- 빌드/테스트/배포를 위해 여러 명령을 하나씩 치지 않도록 한 번에 실행되는 명령을 제공해야 한다.
- 실제 배포법의 위치와 현재 public release gate를 명확히 해야 한다.

## 산출물

- `platform-desktop-app/README.md`
- `platform-desktop-app/README.ko.md`
- `platform-desktop-app/README.en.md`
- `platform-desktop-app/docs/release-runbook.ko.md`
- `platform-desktop-app/docs/release-runbook.en.md`
- `platform-desktop-app/scripts/desktop-pipeline.mjs`
- `package.json`
- `platform-desktop-app/package.json`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/specs/2026-06-03-desktop-release-runbook/`

## 검증

- `corepack pnpm run desktop:verify` 통과
- `corepack pnpm run desktop:release:report` 통과, public gate blocked 유지
- `corepack pnpm run desktop:package:internal` 통과, `.app`/DMG 생성 및 macOS artifact verification 통과
- `corepack pnpm --filter platform-desktop-app test` 통과
- `corepack pnpm --filter platform-desktop-app run check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-omission-input.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-resource-input.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-cli-pipeline.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-desktop-release-runbook-evaluation-input.json` 통과
- `git diff --check` 통과

## 결과 요약

- README 기본 언어를 한국어로 바꾸고 영어판을 분리했다.
- 실제 배포 절차를 한/영 runbook으로 만들었다.
- root에서 실행하는 원샷 명령을 추가했다.
- public distribution은 여전히 signing/notarization/updater/clean-machine gate 때문에 blocked로 표시한다.
