# 요구사항: Workspace Monitor 공격적 네이티브 메모리 워밍

- 요청일: 2026-06-05
- 소유 프로젝트: `platform-desktop-app`
- 대상: Tauri 데스크톱 런타임, Workspace Monitor source workbench

## 요구사항

| ID | 요구사항 | 우선순위 | 수용 기준 | 검증 |
| --- | --- | --- | --- | --- |
| REQ-DESKTOP-WARM-2026-06-05-001 | 앱은 사용자가 소스 탭에 들어갈 때까지 기다리지 말고, 시작 시점부터 OS thread로 워크스페이스 파일 자원을 메모리에 올려야 한다. | must | Tauri setup과 renderer runtime bootstrap이 `warm_workspace_os_resources`를 호출하고, Rust background thread가 cache를 채운다. | Rust check, package build |
| REQ-DESKTOP-WARM-2026-06-05-002 | 메모리 사용은 실제 체감 개선을 만들 만큼 충분히 커야 하되, bounded limit로 안전해야 한다. | must | preload 한도는 512개 텍스트 파일, 128MB이고 scan entry 한도는 40,000개다. | readiness/test |
| REQ-DESKTOP-WARM-2026-06-05-003 | UI는 네이티브 warmup 상태와 메모리 예산을 보여야 한다. | should | `OS 캐시`, `메모리 예산`, `native warming` 상태가 Workspace Monitor에 노출된다. | workspace-monitor test/check |
| REQ-DESKTOP-WARM-2026-06-05-004 | 저장 후 캐시 재준비는 사용자를 막는 foreground 작업보다 background warmup으로 처리해야 한다. | should | save 후 `warm_workspace_os_resources(forceRefresh=true)`가 호출된다. | workspace-monitor test |

## 범위

- 포함: Rust `Arc` shared state, background OS thread warmup, larger bounded memory cache, renderer startup warmup, warmup polling/status display.
- 제외: 파일 watcher, public notarization 자격 증명 설정, 무제한 full repository memory load.
