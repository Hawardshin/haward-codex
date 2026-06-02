# 크로스 플랫폼 설치형 런타임 의사결정

## 결론

`platform-desktop-app`의 1차 설치형 제품 구조는 **Tauri v2 + Rust 데스크톱 셸**, **workspace-monitor 정적 UI**, **agent-platform Python 계층**, **선택형 외부 CLI 어댑터**로 고정한다.

이 결정은 현재 코덱스 위에서 개발하더라도 최종 제품이 Codex, Claude Code, Cursor, Antigravity 같은 특정 AI 코딩 도구에 종속되지 않고, 그 도구들을 플랫폼 위의 설정 가능한 기능으로 붙이기 위한 구조다.

## 전문가 토론 요약

| 관점 | 주장 | 반론 | 반영 |
| --- | --- | --- | --- |
| 제품 책임자 | 사용자는 “레포 설치”가 아니라 앱 설치 후 바로 열리는 경험을 원한다. | 설치형 앱만 만들면 내부 운영 규칙과 히스토리 구조가 흐려질 수 있다. | 데스크톱 셸은 진입점만 맡고, 지식/히스토리/평가 구조는 기존 문서와 플랫폼 계층을 유지한다. |
| 데스크톱 패키징 전문가 | macOS와 Windows는 서명, 공증, 설치/삭제, 업데이트가 제품 신뢰의 핵심이다. | 초기에는 서명 인증서와 Windows 빌드 환경이 없다. | public-ready를 주장하지 않고, 내부 테스트와 공개 배포 게이트를 분리한다. |
| 런타임/언어 전문가 | Tauri/Rust는 시스템 WebView를 활용해 Electron보다 작은 셸을 기대할 수 있고, native command boundary를 분명히 만들기 좋다. | Rust toolchain이 현재 머신에 없고 학습/빌드 비용이 있다. | 최종 셸은 Tauri-first로 고정하되, dependency 설치는 감사 기록 후 진행한다. Go는 장기 실행 local service 후보로 남긴다. |
| 인프라 전문가 | CLI 실행, 파일 감시, 업데이트, 백그라운드 에이전트는 누수와 좀비 프로세스 위험이 있다. | 모든 기능을 처음부터 막으면 제품이 느려진다. | v1 스캐폴드는 UI 셸과 readiness에 집중하고, sidecar/local service/CLI 실행은 명시적 lifecycle 계약 이후에만 붙인다. |
| 보안/프라이버시 전문가 | 앱 설치물에 토큰, 쿠키, private snapshot, 서명 키를 넣으면 안 된다. | 편의성을 위해 자동 설정 욕구가 생긴다. | 설정은 OS credential/env/runtime input으로 주입하고, installer에는 기본값만 넣는다. |
| UX 전문가 | 사용자는 첫 실행에서 workspace 선택, 모드 선택, 누락된 기능 상태, 작업 타임라인을 한 번에 이해해야 한다. | 설정 질문이 많으면 흐름이 막힌다. | optional CLI는 나중에 설정 가능한 capability card로 둔다. 질문은 decision inbox로 모으고, 막히지 않는 작업은 계속한다. |
| 원칙 수호자 | 플랫폼은 프롬프트가 아니라 강제 가능한 구조여야 한다. | 너무 많은 게이트는 느리다. | work_mode로 무게를 조절하고, 설치형 제품은 release gate와 readiness test로 강제한다. |
| 비용/효율 전문가 | 사람의 반복 업무 시간을 줄이는 것이 목적이므로 중복 UI나 중복 런타임을 피해야 한다. | 기존 monitor UI가 데스크톱 UX에 부족할 수 있다. | 첫 버전은 workspace-monitor를 재사용하고, 데스크톱 전용 UI는 실제 필요가 확인될 때만 추가한다. |

## 후보 비교

| 후보 | 장점 | 위험 | 결정 |
| --- | --- | --- | --- |
| Tauri v2 + Rust | 작은 데스크톱 셸 방향, Rust native boundary, macOS/Windows installer 문서화, sidecar 패턴 존재 | Rust toolchain 필요, OS별 빌드/서명 학습 비용 | 선택 |
| Electron | 성숙한 JS 생태계, updater/packager 예시 풍부, Node 통합이 쉬움 | Chromium 포함으로 크기/메모리 부담, shell/file access hardening 필요 | fallback |
| Wails + Go | Go backend와 web UI 결합, local service 친화적 | 기존 Next.js monitor를 재사용할 때 Tauri보다 이점이 확실하지 않음 | local daemon 후보 |
| Native packaging only | 데스크톱 셸 없이 웹/CLI를 배포해 단순화 가능 | 사용자가 기대하는 설치형 앱 경험이 약함 | 비교 후보 |

## 선택한 아키텍처

```text
사용자
  -> Tauri desktop shell (Rust)
      -> workspace-monitor static export (TypeScript/Next.js)
      -> selected workspace snapshot/docs/history
      -> future local platform boundary
          -> agent-platform Python commands/service/sidecar
          -> optional CLI adapters
              -> Codex / Claude Code / Cursor / Antigravity / 기타 CLI
```

## 현재 현실 상태

- Node/npm은 현재 머신에 존재한다.
- Go는 현재 머신에 존재한다.
- Rust toolchain은 현재 머신에 없다.
- 따라서 이번 변경은 실제 signed installer를 생성하지 않는다.
- 대신 Tauri 스캐폴드, readiness test, macOS/Windows execution profile, release gate를 추가해서 다음 단계에서 Rust/Tauri dependency 설치와 빌드 감사로 넘어갈 수 있게 한다.

## 공개 배포 전 필수 게이트

- macOS: Developer ID signing, hardened runtime, notarization, 필요 시 stapling, clean Mac smoke test.
- Windows: code signing, SmartScreen/download trust plan, MSI/NSIS/MSIX 선택, clean Windows smoke test.
- 공통: install/open/update/uninstall/rollback test, privacy review, dependency/license review, optional CLI missing behavior, workspace boundary test.

## 근거

- Tauri v2 배포 문서는 platform-specific installer와 code signing 필요성을 명시한다.
- Tauri Windows installer 문서는 MSI/NSIS 선택과 MSI가 Windows에서 생성되어야 한다는 제약을 명시한다.
- Tauri sidecar 문서는 Python CLI/API server 같은 외부 바이너리 번들링 패턴을 제시한다.
- Apple notarization 문서는 외부 배포 macOS 앱의 Developer ID, hardened runtime, notarization 흐름을 요구한다.
- Microsoft MSIX 문서는 패키지 서명과 배포 신뢰 모델을 강조한다.

## 다음 단계

1. Rust toolchain과 Tauri CLI를 프로젝트 로컬 설치 계획으로 감사 기록한다.
2. macOS에서 `npm run monitor:build`, `npm run check`, `npm test`를 먼저 통과시킨다.
3. Rust 설치 후 `npm run tauri:dev`를 developer-local run으로 검증한다.
4. Windows 빌드 host 또는 CI를 별도로 정의한다.
5. signing/notarization/certificate가 준비되기 전에는 public-ready 표현을 금지한다.
