# 웹 검색 기록: IntelliJ식 실행 작업대

## 검색

- `JetBrains IntelliJ IDEA UI tool windows run configurations search everywhere status bar official UI docs`
- `IntelliJ IDEA user interface tool windows run configurations official JetBrains documentation`
- `JetBrains IDE UI guidelines tool window run widget official`

## 확인한 출처

- JetBrains IntelliJ IDEA Help: Tool windows  
  URL: `https://www.jetbrains.com/help/idea/tool-windows.html`  
  신뢰도: 공식 문서, 높음  
  사용 이유: IDE에서 작업 영역 주변에 도구 창을 배치하고 Run, Services, Problems 같은 실행/점검 창을 사용하는 패턴 확인
- IntelliJ Platform UI Overview  
  URL: `https://plugins.jetbrains.com/docs/intellij/ui-overview.html`  
  신뢰도: 공식 문서, 높음  
  사용 이유: 중앙 작업대, tool windows, settings/dialog 분리 원칙을 기존 registry 근거와 연결

## 반영

- Desktop Runtime 상단을 `Run Configuration`, `Services`, `Problems`, 상태바 구조로 바꿨다.
- 사용자가 긴 스크롤을 하기 전에 검색 에이전트, CLI 세션, 다중 CLI pipe, readiness 점검을 실행할 수 있게 했다.
- 레퍼런스는 UI asset 복사가 아니라 제품 패턴 전이로만 사용했다.

## 불확실성

- JetBrains 문서는 일반 IDE 사용 흐름이므로 agent orchestration 의미는 로컬 제품 요구에 맞춰 해석했다.
