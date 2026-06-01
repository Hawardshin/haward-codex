# 설치형 앱 사용자 플로우 웹 검색 기록

## 요청

사용자가 보는 플로우를 잘 설계해 손쉽게 쓸 수 있는 설치형 프로그램을 만들 수 있게 하라는 요청.

## 검색 시각

- 2026-06-02

## 검색어

- `Tauri v2 official distribution installer updater desktop app documentation`
- `Electron Forge official makers distributable apps documentation`
- `Nielsen Norman Group onboarding UX progressive disclosure user flow`
- `Microsoft Fluent design onboarding setup desktop app guidance`
- `Apple Human Interface Guidelines onboarding macOS app setup official`
- `Tauri v2 process command sidecar official documentation`
- `Electron utilityProcess child process official documentation security`
- `Tauri v2 permissions security official documentation`
- `site:developer.apple.com/design/human-interface-guidelines onboarding permissions only when needed app setup`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Apple Human Interface Guidelines: Onboarding | 공식 디자인 가이드 | 온보딩은 빠르고 선택 가능해야 하며, 필수 아닌 설정은 뒤로 미루고, 권한 요청은 필요한 기능과 연결해 설명해야 한다. | 첫 실행에서 optional setup을 강제하지 않는 규칙 |
| Microsoft Fluent 2: Onboarding | 공식 디자인 가이드 | 온보딩은 관련성 있고 방해가 적고 선택 가능해야 하며, 사용자가 ready일 때 맥락 안에서 알려야 한다. | 대시보드 도착 전 과도한 설명을 줄이고 capability card로 지연 |
| Tauri v2: Distribute | 공식 문서 | Tauri는 OS별 배포, signing, installer, updater 같은 distribution 주제를 별도로 관리한다. | desktop distribution registry와 release gate 유지 |
| Tauri v2: Updater | 공식 문서 | 업데이트는 별도 플러그인/정책으로 다뤄야 한다. | update failure recovery와 release gate 반영 |
| Electron Forge | 공식 문서 | Electron 앱 패키징/배포 후보로 비교할 수 있다. | Electron을 fallback candidate로 유지 |
| Electron utilityProcess | 공식 문서 | Electron에서 child process 성격의 유틸리티 프로세스를 다룰 수 있다. | CLI/subprocess orchestration fallback 비교 근거 |

## 제외하거나 낮게 본 출처

- 일반 블로그의 온보딩 팁: 이번 작업은 durable platform rule이므로 공식 디자인 시스템과 공식 배포 문서를 우선했다.
- 설치 도구 비교 광고성 페이지: 특정 tool lock-in 위험이 있어 배제했다.
- 검색 결과만 있고 원문 접근성이 낮은 일부 페이지: 보조 확인으로만 사용했다.

## 계획 반영

- 설치형 앱은 “전체 설정 완료”보다 “워크스페이스 대시보드 도착”을 첫 가치로 둔다.
- 첫 실행은 open/create/demo workspace, workspace boundary review, view mode selection, readiness scan, dashboard arrival 순서로 둔다.
- 선택 CLI, 알림, 브라우저 자동화, 고급 검증은 누락돼도 대시보드와 히스토리를 막지 않는다.
- 사용자 질문은 decision inbox에 모으고, 독립 작업은 계속 진행한다.
- 배포 패키징 판단과 사용자 플로우 판단을 분리하되, desktop implementation 전 user-flow registry를 필수로 확인한다.

## 불확실성

- 실제 Tauri/Electron 설치와 installer UX 구현은 아직 하지 않았다.
- macOS/Windows/Linux 실제 installer 동작, signing, updater, uninstall은 추후 prototype과 smoke test가 필요하다.
- UI 접근성 검증은 HTML artifact 수준만 만들었고, 실제 desktop shell 검증은 후속 작업이다.
