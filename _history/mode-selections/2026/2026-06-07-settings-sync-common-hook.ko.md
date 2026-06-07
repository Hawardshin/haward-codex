# 2026-06-07 설정 동기화 공통 훅 모드 선택

- 선택 모드: `standard`
- 소유 프로젝트: `platform-desktop-app`
- 선택 이유:
  - 사용자 요청이 기존 기능의 동작 일관성과 소스 분할을 요구했다.
  - 새 런타임 명령이나 외부 의존성 설치 없이 TypeScript UI 로직을 정리하는 범위다.
- 관련 워크플로:
  - web-first intake 완료.
  - desktop user flow와 installable app 경계는 기존 `platform-desktop-app` 범위 안에서 유지.
  - runtime-risk는 debounce timer와 async refresh queue가 있으므로 resource check 기록을 남긴다.
- 제외:
  - 공개 배포 signing/notarization/updater secret 구성은 이번 변경 범위 밖이다.

