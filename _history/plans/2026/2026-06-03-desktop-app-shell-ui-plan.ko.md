# 2026-06-03 데스크톱 앱 셸 UI 계획

## 작업 모드

- `work_mode`: `standard`
- 이유: 사용자 체감 UI와 제품 흐름을 바꾸는 의미 있는 구현 작업이지만, 저장소 전역 운영 규칙이나 평가기 정책을 바꾸지는 않는다.
- `view_mode`: `superadmin_developer`
- 이유: 현재 앱은 저장소 소유자가 플랫폼 자체를 만들고 검증하는 데 쓰는 데스크톱 표면이다.

## 코딩 조사 요약

### 기술 스택

- React 19.2.6
- Next.js 16.2.6
- TypeScript 6.0.3
- Tauri 2.11.2 shell embedding `workspace-monitor`

### 공식/강한 출처

- JetBrains IntelliJ IDEA 문서: settings dialog와 tool window 구조.
- Discord 공식 블로그: 데스크톱 display/settings 표면 분리.
- Tauri 문서와 Terax 오픈소스 검색 결과: React/Tauri 데스크톱 앱 패턴.
- 내부 레지스트리: `platform-desktop-app/configs/user-flow-registry.json`, `agent-platform/configs/access/view-mode-registry.json`.

### 출처 유형

- `official_docs`
- `open_source`
- `internal_registry`
- `community_signal`

### 언어/런타임 선택

- 후보 A: 기존 TypeScript/React/Next UI를 데스크톱 앱 셸로 재구성한다.
- 후보 B: Electron 또는 외부 오픈소스 데스크톱 앱을 클론해 수정한다.
- 선택: 후보 A.
- 결정 이유: 현재 Tauri 프로젝트가 `workspace-monitor`를 UI source로 삼고 있고, 기존 타입/스냅샷/검증을 유지할 수 있다. 외부 앱 클론은 라이선스 확인, 데이터 모델 이식, Tauri bridge 재연결 비용이 커서 이번 UI 개선의 핵심 병목을 줄이지 못한다.

### 아키텍처 옵션

- 옵션 A: 기존 단일 컴포넌트 안에서 앱 셸, 좌측 활동 바, 설정 대화상자, 홈 정보 구조를 재배치한다.
- 옵션 B: `MonitorShell`을 여러 컴포넌트로 대규모 분리한 뒤 디자인을 바꾼다.
- 선택: 옵션 A.
- 결정 이유: 이번 사용자의 핵심 불만은 체감 UI다. 대규모 파일 분리는 이후 유지보수 개선으로 가능하지만, 지금은 동작하는 화면과 검증을 깨지 않는 범위에서 데스크톱 앱 구조를 먼저 제공하는 것이 안전하다.

### 코드 레퍼런스

- `workspace-monitor/components/MonitorShell.tsx`: 현재 탭, 명령 팔레트, Desktop runtime, snapshot 기반 UI.
- `workspace-monitor/app/globals.css`: 기존 디자인 토큰, 반응형 규칙, Desktop panel CSS.
- `platform-desktop-app/docs/user-flow.ko.md`: workspace chooser, task timeline, decision inbox, settings/capability 요구.

### 폴더 구조 결정

- 후보 A: 기존 `workspace-monitor` 컴포넌트와 CSS만 수정한다.
- 후보 B: `platform-desktop-app/src`에 별도 UI 앱을 새로 만든다.
- 선택: 후보 A.
- 결정 이유: `platform-desktop-app`는 Tauri shell이며 실제 UI source는 `workspace-monitor`로 결정돼 있다. 별도 UI 앱은 중복 상태와 검증 비용을 만든다.

## 구현 범위

- `MonitorShell`에 설정 대화상자 상태와 `Ctrl/Cmd+,` 단축키를 추가한다.
- 웹형 topbar/view-mode bar를 데스크톱 앱 titlebar, activity rail, sidebar, viewport로 바꾼다.
- View mode, language, pinned sections 같은 설정을 설정 대화상자 안으로 이동한다.
- Overview를 workspace home, run timeline, decision inbox, recent artifacts, optional capabilities 중심으로 축소한다.
- CSS를 데스크톱 앱 셸 레이아웃과 모바일 대응에 맞게 조정한다.

## 검증 계획

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- 브라우저 또는 스크린샷으로 데스크톱/모바일 레이아웃 확인

## 보류 개선

- `MonitorShell.tsx`를 `DesktopShell`, `SettingsDialog`, `OverviewHome`, `DesktopRuntimePanel` 등으로 분리하는 구조 개선은 별도 리팩터링으로 미룬다.
