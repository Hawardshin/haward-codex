# 데스크톱 릴리즈 Runbook과 원샷 명령 추적성

| 요구 | 산출물 | 검증 |
| --- | --- | --- |
| 한국어 README가 기본이어야 한다 | `platform-desktop-app/README.md`, `README.ko.md` | `platform-desktop-app/tests/readiness.test.mjs` |
| 영어 README도 별도로 있어야 한다 | `platform-desktop-app/README.en.md` | `platform-desktop-app/tests/readiness.test.mjs` |
| 실제 배포법 위치가 명확해야 한다 | `docs/release-runbook.ko.md`, `docs/release-runbook.en.md` | readiness/test |
| 하나씩 명령어 치지 않게 해야 한다 | root scripts `desktop:setup:verify`, `desktop:verify`, `desktop:package:internal`, `desktop:release:report` | `scripts/desktop-pipeline.mjs`, dry-run, actual verify/package |
| 공개 배포 gate를 숨기면 안 된다 | `desktop:release:report`, release runbook | public report output |
| 제품 요구사항으로 남아야 한다 | `PDA-REQ-038` | requirements/readiness/test |

## 공개 배포 상태

- 내부 테스트용 `.app`/DMG build는 가능하다.
- 공개 배포는 Developer ID signing/notarization, signed updater, clean-machine smoke 때문에 blocked로 유지한다.
