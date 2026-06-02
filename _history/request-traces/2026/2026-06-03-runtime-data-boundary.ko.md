# Request Trace: Runtime Data Boundary

- 요청 요약: 레포지토리는 플랫폼 자체를 만드는 개발 원천으로 쓰되, 설치형 고객은 플랫폼 소스코드를 보지 않게 하고, desktop app source 외 runtime data/log/agent work plane을 분리해 계속 축적할 수 있게 해 달라는 steering.
- 소유 프로젝트: `platform-desktop-app/`
- 작업 모드: `governance`

## 산출물

- `platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `platform-desktop-app/docs/architecture/runtime-data-boundary.ko.md`
- `platform-desktop-app/docs/architecture/runtime-data-boundary.en.md`
- `platform-desktop-app/docs/requirements/2026-06-03-runtime-data-boundary.*.md`
- `platform-desktop-app/specs/2026-06-03-runtime-data-boundary/`
- `_docs/instructions/persistent-instructions*.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증

- 검증 결과는 `platform-desktop-app/specs/2026-06-03-runtime-data-boundary/validation.*.md`와 evaluation record에 기록한다.

## 상태

- 구현 중.
