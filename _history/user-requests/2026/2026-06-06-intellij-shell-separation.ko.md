# User Request: IntelliJ Shell Separation

## 요약

사용자는 IntelliJ UI 특징과 원칙을 이용해 앱의 메인 영역과 사이드 영역을 확실히 분리해 달라고 요청했다.

## 해석

- 좌측 activity rail이 메인 작업 화면과 시각적으로 섞이지 않아야 한다.
- 메인 작업 영역은 editor/content plane처럼 별도 크롬과 경계를 가져야 한다.
- 기존 기능과 빌드 흐름은 유지해야 한다.

## 소유 프로젝트

- `platform-desktop-app/`
