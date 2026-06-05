# 요구사항: Workspace Monitor OS 자원 기반 워크스페이스 캐시

- 요청일: 2026-06-05
- 소유 프로젝트: `platform-desktop-app`
- 대상: Tauri 데스크톱 런타임, Workspace Monitor 소스 워크벤치

## 요구사항

| ID | 요구사항 | 우선순위 | 수용 기준 | 검증 |
| --- | --- | --- | --- | --- |
| REQ-DESKTOP-OS-2026-06-05-001 | 소스 탭 진입 시 렌더러가 매번 파일 목록을 새로 불러오는 구조가 아니라, 데스크톱 앱의 OS 파일시스템 접근과 Rust 메모리 상태를 사용해 워크스페이스 자원을 미리 준비해야 한다. | must | `prepare_workspace_os_resources` Tauri 명령이 워크스페이스 파일 목록과 제한된 텍스트 내용을 Rust 메모리 캐시에 올린다. | Rust check, runtime contract, readiness/test |
| REQ-DESKTOP-OS-2026-06-05-002 | 캐시는 오래된 워크스페이스나 저장 전 파일 내용을 계속 쓰지 않아야 한다. | must | 워크스페이스 선택, import, clone, 파일 저장 시 캐시가 비워지고 다음 준비 호출이 OS에서 다시 읽는다. | Rust check, 정적 테스트 |
| REQ-DESKTOP-OS-2026-06-05-003 | 사용자는 현재 소스 워크벤치가 네이티브 캐시를 쓰는지 확인할 수 있어야 한다. | should | Workspace Monitor에 `OS 캐시` 상태와 캐시된 파일/바이트 수가 표시된다. | workspace-monitor test/check |
| REQ-DESKTOP-OS-2026-06-05-004 | 구현 완료 후 사용자가 직접 빌드하지 않아도 되도록 실제 내부 데스크톱 패키징까지 실행해야 한다. | must | `.app`와 `.dmg` 내부 빌드가 성공하고 산출물 경로가 기록된다. | `corepack pnpm --dir platform-desktop-app run package:internal` |

## 범위

- 포함: Tauri Rust 메모리 캐시, OS 파일시스템 scan/read 선준비, 렌더러 invoke 연결, 런타임 계약/테스트 갱신, 내부 패키지 빌드.
- 제외: 공개 배포용 Developer ID signing/notarization 자격 증명 설정, 대용량 전체 파일 내용 무제한 메모리 적재, 외부 파일 watcher 도입.
