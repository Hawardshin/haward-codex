# 검증 계획

## 실행한 검증

- `npm ls --depth=0`
- `npm audit --json`
- `npx playwright --version`
- `npm run test:browser`

## 추가 검증

- Python unit test를 계속 통과시킨다.
- 설치 레지스트리 self-documenting config 계약을 확인한다.
- Workspace Monitor snapshot과 workspace health를 갱신한다.
- work evaluator와 hallucination guard를 실행한다.

## 환경 주의

Codex sandbox 기본 실행에서는 Chromium이 macOS Mach port 권한 때문에 실패했다. 실제 browser validation은 승인된 외부 실행 또는 일반 터미널에서 수행한다.
