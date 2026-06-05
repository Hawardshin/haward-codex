# 데스크톱 앱 셸 UI 요구사항

## 배경

현재 설치형 플랫폼 UI는 Tauri로 감쌌더라도 브라우저 대시보드처럼 보인다. 설치형 앱은 설정, 탐색, 작업 실행, decision inbox, runtime 상태를 데스크톱 앱답게 분리해야 한다.

## 요구사항

- `REQ-PDA-UI-001`: 앱은 웹 페이지형 상단 히어로/필터 중심 구조가 아니라 titlebar, activity rail, sidebar, content viewport를 가진 데스크톱 앱 셸로 보여야 한다.
- `REQ-PDA-UI-002`: view mode, language mode, pinned section 같은 구성 설정은 기본 화면에 길게 노출하지 않고 설정 대화상자에서 바꿀 수 있어야 한다.
- `REQ-PDA-UI-003`: 홈 화면은 모든 내부 기능을 한 번에 펼치지 않고 workspace, task timeline, decision inbox, recent artifacts, optional capability 상태를 우선 보여야 한다.
- `REQ-PDA-UI-004`: 개발자/슈퍼어드민 기능은 activity rail과 sidebar에서 접근 가능해야 하며, 사용자용 기본 작업 흐름과 시각적으로 분리되어야 한다.
- `REQ-PDA-UI-005`: 화면은 1280x800 이상 데스크톱 최소 창에서 텍스트 겹침 없이 사용할 수 있어야 하며, 모바일 폭 전용 UI는 제품 요구사항으로 유지하지 않는다.

## 비범위

- 실제 OS 파일 선택 dialog 구현
- 새 Tauri command 추가
- 외부 오픈소스 앱 코드 복사 또는 라이선스 이식
- `MonitorShell.tsx` 대규모 컴포넌트 분리
