# 구현 계획

1. `RuntimeTerminalDrawer`에 재사용 가능한 `RuntimeTextChoice` 타입과 선택 그리드 props를 추가한다.
2. `DesktopRuntimePanel`에서 세션 프롬프트, 작업 폴더, 파이프라인 요청 선택지를 생성한다.
3. 작업 파이프라인 요청 UI를 텍스트 전용 label에서 선택 카드 + textarea 구조로 바꾼다.
4. 검색 에이전트의 provider select와 model datalist를 명시적 선택 버튼으로 바꾼다.
5. CSS에서 선택 카드, 긴 텍스트 줄바꿈, 터미널 테마 오버라이드, 모바일 레이아웃을 보강한다.
6. 정적 테스트로 선택 UI 계약과 datalist 제거를 고정한다.
7. 렌더러 검사, 앱 검사, 내부 패키징 빌드, 리소스 정리를 실행한다.
