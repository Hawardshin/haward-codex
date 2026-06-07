# 2026-06-07 작업 요약: 물개형 3D 에이전트

## 변경

- `AgentCollaborationScene`의 사람형 파츠를 `agent-seal-*` 메쉬로 교체했다.
- 손, 발, 귀, 바이저, 가슴 패널을 제거했다.
- 둥근 몸통, 배색, 둥근 머리, 앞/뒤 지느러미, 꼬리, 수염, 코, 볼, 점무늬, 작은 상태 태그를 추가했다.
- Tool Studio의 수동 Three.js 씬도 동일하게 둥근 물개형 구조로 정리했다.
- 중복 `codex-primary` 에이전트 ID가 React key 경고를 만들지 않도록 render key에 index를 포함했다.
- 테스트는 물개형 파츠와 사람형 파츠 부재를 검증하도록 갱신했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test -- tests/tool-studio.test.mjs`
- `corepack pnpm --filter workspace-monitor run build`
- Browser로 `http://localhost:3020/?section=agents` 확인
- 로컬 Playwright headless Chromium으로 desktop 1280x720, mobile 390x844 WebGL pixel sample 확인
- `corepack pnpm run desktop:package:internal`

## 산출물

- 내부 `.app`와 `.dmg` 패키징이 성공했다.
- public release readiness의 signing/notarization/updater/clean-machine smoke 경고는 기존 public 배포 게이트로 남아 있다.
