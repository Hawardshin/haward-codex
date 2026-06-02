# Web Search: Runtime Data Boundary

- 날짜: 2026-06-03
- 목적: 설치형 플랫폼에서 repository source, installed app bundle, runtime data/log/cache/agent workspace를 분리하기 위한 공식 근거 확인
- 작업 영향: `platform-desktop-app/configs/runtime-data-boundary-registry.json`의 reference_links, runtime_data_roots, installer_payload_policy에 반영

## 검색어

- `Tauri v2 official documentation application bundle resources frontend assets source code distribution`
- `Apple developer app sandbox containers user data logs application support official documentation`
- `Tauri v2 official documentation filesystem app data directory logs`
- `Microsoft Windows app data local appdata roaming official documentation packaged desktop app`

## 확인한 출처

- [Tauri Distribute](https://v2.tauri.app/distribute/): installer/package, signing/distribution gate를 확인했다.
- [Tauri Configuration Reference](https://v2.tauri.app/reference/config/): frontendDist, bundle resources, app resource boundary를 확인했다.
- [Tauri File System Plugin](https://v2.tauri.app/plugin/file-system/): app-specific data/cache/log directory class와 permission-scoped filesystem access 방향을 확인했다.
- [Apple Protecting User Data with App Sandbox](https://developer.apple.com/documentation/security/protecting-user-data-with-app-sandbox): macOS app container와 user data protection 방향을 확인했다.
- [Microsoft Store and Retrieve Settings and Other App Data](https://learn.microsoft.com/en-us/windows/apps/develop/data/store-and-retrieve-app-data): Windows app data/local/roaming store 방향을 확인했다.

## 무시한 약한 출처

- 비공식 블로그, 오래된 Stack Overflow 답변, vendor 비교 글은 이번 steering의 근거로 사용하지 않았다.

## 불확실성

- 실제 public distribution readiness는 signing, notarization, SmartScreen/download trust, clean-machine smoke test가 필요하다.
- 이번 기록은 경계 steering이며, 실제 storage adapter 구현과 payload scanner 구현은 별도 slice가 필요하다.

## 공개 결정 요약

- 개발 repository는 platform source와 governance를 보관한다.
- 설치형 제품은 compiled app, static frontend assets, approved helpers, user-selected workspace, runtime data/log/cache/agent workspace를 사용한다.
- 고객에게 platform source tree, `_private/`, `outputs/`, unredacted logs, private snapshots, developer-only monitor snapshots를 제품 기능으로 노출하지 않는다.
