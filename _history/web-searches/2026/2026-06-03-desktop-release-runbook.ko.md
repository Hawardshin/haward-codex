# 웹 검색 기록: 데스크톱 릴리즈 Runbook

- 날짜: 2026-06-03
- 관련 요청: `UR-2026-06-03-038`
- 작업 모드: `governance`

## 검색 쿼리

- `Tauri v2 build distribution signing notarization official docs`
- `Tauri v2 updater signing official docs`
- `Tauri v2 macOS notarization code signing official docs`

## 확인한 출처

| 출처 | URL | 사용 방식 |
| --- | --- | --- |
| Tauri v2 Distribute | https://v2.tauri.app/distribute/ | `tauri build`가 기본 desktop distribution build 경로임을 확인 |
| Tauri v2 macOS signing/notarization | https://v2.tauri.app/distribute/sign/macos/ | macOS public distribution에서 signing/notarization credential과 stapling 관련 gate 확인 |
| Tauri updater | https://v2.tauri.app/plugin/updater/ | updater artifact signature와 private key 경계 확인 |
| Apple app code signing process | https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web | macOS 외부 배포에서 Developer ID signing과 notarization이 별도 trust gate임을 확인 |

## 계획 영향

- README와 release runbook은 내부 테스트 build와 공개 배포 readiness를 분리한다.
- 원샷 `desktop:package:internal`은 내부 `.app`/DMG build까지 처리한다.
- 공개 배포 명령은 release를 수행하지 않고 blocked gate를 report-only로 보여준다.

## 불확실성

- 실제 공개 배포는 signing/notarization/updater credential과 clean-machine test 환경이 필요하므로 이번 작업에서 완료 처리하지 않는다.
