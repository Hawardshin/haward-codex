# 데스크톱 제품 폴더 구조 재편 스펙

## 배경

설치형 플랫폼은 더 이상 루트의 웹 UI 후보를 Tauri가 감싸는 구조가 아니다. 데스크톱 제품이 먼저 실행되고, 작업 상태, 런타임 데이터, 쉘 계약, workspace host, source editor, CLI adapter, accumulated data surface를 소유한다. 따라서 제품 UI도 루트 독립 프로젝트가 아니라 `platform-desktop-app/renderer/workspace-monitor/` 아래의 renderer package여야 한다.

## 요구사항

- `PDA-REQ-034`: 루트 `workspace-monitor/` 독립 프로젝트를 제거하고 `platform-desktop-app/renderer/workspace-monitor/`를 제품 renderer 소스 경로로 강제한다.

## 설계 결정

- Language/runtime option A: 기존 TypeScript/Next.js renderer, Rust/Tauri shell, Python platform tools를 유지하고 경계만 제품 중심으로 이동한다.
- Language/runtime option B: renderer를 Rust/native UI나 Electron main/renderer 구조로 새로 작성한다.
- 선택: option A. 이미 구현된 workbench, Monaco, CLI supervisor, runtime data UI를 유지하면서 제품 소유권만 바로잡는 것이 가장 낮은 위험과 유지보수 비용을 가진다.

- Architecture option A: `workspace-monitor/`를 루트 프로젝트로 유지하고 Tauri가 외부 프로젝트를 참조한다.
- Architecture option B: renderer를 `platform-desktop-app/renderer/workspace-monitor/`로 이동하고 Tauri, pnpm, readiness, registry가 같은 제품 경계를 바라보게 한다.
- 선택: option B. 설치형 앱의 primary host runtime이 제품 상태와 UI authority를 소유한다는 요구에 맞고, 사용자가 개발자식 git clone/workdir 흐름으로 이해하지 않게 만든다.

## 범위

- `workspace-monitor/` tracked source를 `platform-desktop-app/renderer/workspace-monitor/`로 이동한다.
- `pnpm-workspace.yaml`, `pnpm-lock.yaml`, Tauri `frontendDist`, dev command, build/audit scripts를 새 renderer 경로로 갱신한다.
- project registry, root structure policy, repository map, docs/policies/operating models에서 루트 프로젝트 경계를 갱신한다.
- snapshot collector와 readiness checks가 새 root 계산과 renderer path를 사용하게 한다.

## 비범위

- public signing/notarization, signed updater, clean-machine install smoke는 이번 구조 변경의 완료 조건이 아니다.
- historical specs에 기록된 과거 `workspace-monitor/` 경로를 모두 재작성하지 않는다. 새 구조의 source of truth는 요구사항, registry, current docs, generated maps, readiness checks다.
