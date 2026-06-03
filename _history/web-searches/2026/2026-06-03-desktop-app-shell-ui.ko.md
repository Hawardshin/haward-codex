# 2026-06-03 데스크톱 앱 셸 UI 웹 검색 기록

## 요청 요약

설치형 플랫폼 UI가 웹 대시보드처럼 보이는 문제를 줄이고, Codex 앱, IntelliJ, Discord 같은 데스크톱 앱 패턴에 맞춰 화면과 설정 흐름을 재설계한다.

## 검색어

- `IntelliJ IDEA UI settings dialog project tool window desktop app design patterns JetBrains UI guidelines`
- `Discord desktop app settings modal sidebar navigation UI patterns`
- `Tauri desktop app UI examples open source settings dialog sidebar layout`
- `open source desktop app React Tauri settings modal sidebar GitHub`

## 확인한 출처

- JetBrains IntelliJ IDEA 문서: settings dialog, appearance, tool window 구조를 확인했다. 데스크톱 앱은 작업 영역과 설정 대화상자를 분리하고, 도구 창/활동 바를 통해 기능 위치를 유지한다는 점을 계획에 반영했다.
- Discord 공식 블로그: 데스크톱 display/settings 흐름이 별도 설정 표면에서 density, text size, 색상 강도 같은 보기 설정을 다룬다는 점을 확인했다.
- Tauri 관련 문서/검색 결과와 Terax 오픈소스 결과: Tauri 2 + React 기반 데스크톱 앱이 설정, 터미널, 파일 탐색, 에이전트 패널을 앱 셸 안에 배치하는 방향을 확인했다.
- Reddit/커뮤니티 결과: IntelliJ 새 UI와 Tauri 앱 개발 관련 사용자 반응은 발견 신호로만 사용했고 사실 근거로 사용하지 않았다.

## 약한 출처 또는 제외한 출처

- Reddit 의견은 선호와 마찰 신호로만 취급했다.
- 라이선스와 통합 범위를 확인하지 않은 임의 오픈소스 UI 코드는 직접 복사하지 않았다.
- 기존 프로젝트가 이미 `workspace-monitor`를 Tauri에 임베드하도록 결정돼 있어, 새 OSS 앱을 클론해 갈아끼우는 방식은 이번 변경에서 제외했다.

## 계획 반영

- 상단 웹 대시보드형 구조를 데스크톱 앱 셸 구조로 바꾼다.
- 전역 보기/언어/고정 섹션 같은 설정은 화면 상단에 늘어놓지 않고 설정 대화상자에서 처리한다.
- 좌측 활동 바와 보조 내비게이션, 상단 타이틀바, 콘텐츠 뷰포트로 구획을 나눈다.
- 홈 화면은 모든 정보를 펼치는 것이 아니라 workspace, task timeline, decision inbox, recent artifact 중심으로 제한한다.

## 불확실성

Codex 앱의 내부 디자인 자료는 공개 출처로 검증하지 않았다. 따라서 특정 제품을 복제하지 않고, 공개적으로 확인 가능한 데스크톱 앱 패턴만 반영한다.
