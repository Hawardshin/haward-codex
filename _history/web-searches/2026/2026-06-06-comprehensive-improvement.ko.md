# 2026-06-06 종합 개선 웹 검색 기록

## 요청 요약

- 사용자는 기존 성능, UI, 기능, 사용성, 디자인, 운영체제 자원 활용, 오픈소스 참고, EVAL, 기록 기반 개선 요구를 종합해 전체 개선을 요구했다.
- 범위가 넓으므로 바로 전 파일을 훑지 않고 웹 기준과 저장소 대표 샘플을 결합해 첫 구현 slice를 선정했다.

## 검색 쿼리

- `desktop app UX performance accessibility design system best practices official`
- `Tauri desktop app performance memory process management best practices official`
- `software maintenance architecture continuous improvement evaluation dashboard best practices official`
- `WCAG 2.2 accessibility focus target size user interface official`
- `site:google.github.io/eng-practices/review developer small CLs`

## 확인한 주요 출처

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
  - 신뢰도: 높음. 플랫폼 UI 원칙의 공식 출처.
  - 적용 영향: 레이아웃, 입력, 컨트롤 명확성은 별도 점수 차원으로 두고 UI 개선을 추적한다.
- Tauri Process Model: https://tauri.app/concept/process-model/
  - 신뢰도: 높음. 현재 데스크톱 앱의 Tauri/Rust 방향과 직접 관련된 공식 문서.
  - 적용 영향: 네이티브 Core process, WebView 분리, 글로벌 상태/리소스 소유권을 개선 차원에 포함한다.
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
  - 신뢰도: 높음. 접근성 기준의 공식 권고.
  - 적용 영향: focus, target size, 상태 표현, 클릭 가능한 선택형 컨트롤을 UI 계약으로 유지한다.
- Google Engineering Practices, Small CLs: https://google.github.io/eng-practices/review/developer/small-cls.html
  - 신뢰도: 높음. 넓은 변경을 검토 가능한 slice로 나누는 실무 기준.
  - 적용 영향: 이번 요청은 `platform-desktop-app` EVAL/종합 개선 cockpit slice로 제한하고 검증/기록/빌드까지 닫는다.

## 약한 출처와 제외

- Reddit, 일반 블로그, SEO형 WCAG 요약 문서는 사용자 신호나 발견 경로로만 보고 구현 근거에서 제외했다.
- 벤치마크 수치가 환경별로 달라지는 Tauri/Electron 비교 글은 현재 앱에서 직접 측정해야 하므로 근거로 쓰지 않았다.

## 계획 영향

- 종합 개선의 첫 실행 단위는 새 대형 아키텍처 전환이 아니라, 이미 존재하는 EVAL surface에 성능, UI, 리소스, 패키징, 오픈소스, 자동화 점수를 통합하는 것이다.
- 구현 산출물은 사용자 화면, CSS, 정적 계약 검사, 테스트, snapshot, build/package 검증을 포함한다.

## 불확실성

- 현재 UI 점수는 기록과 도구 사용 신호 기반의 운영 점수이며 실제 사용자의 체감 UX 점수는 Browser smoke와 별도 계측으로 계속 보강해야 한다.
- 외부 EVAL runner 설치는 이번 slice에서 하지 않는다. 설치가 필요한 후보는 별도 audit, license, rollback 기록이 필요하다.

## 공개 의사결정 요약

이번 작업은 넓은 요구를 “종합 개선을 반복 가능하게 만드는 EVAL cockpit와 정적 계약”으로 축소했다. 이는 사용자의 성능/UX/자원/기능/디자인 요구를 하나의 화면과 검증 파이프라인에서 계속 비교할 수 있게 만드는 기반 작업이다.
