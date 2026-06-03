# Requirements: Responsive Text Wrapping

## 배경

버튼 반응형 개선 이후 일부 UI 텍스트가 의도보다 자주 글자 단위로 깨지는 문제가 확인되었다. 데스크톱 앱 UI 문구는 자연스러운 단어/어절 단위 줄바꿈을 우선해야 하며, 파일 경로, URL, 코드, 로그처럼 긴 토큰만 예외적으로 강제 분리해야 한다.

## 요구사항

- `PDA-REQ-058-1`: 버튼, 내비게이션, 카드 제목, 일반 설명문은 전역 `overflow-wrap: anywhere`에 의해 글자 단위로 쉽게 분해되지 않아야 한다.
- `PDA-REQ-058-2`: 한국어 UI 문구는 가능한 한 어절 단위 줄바꿈을 유지해야 하며, 작은 화면에서 임의의 한글 음절 단위 파편화를 줄여야 한다.
- `PDA-REQ-058-3`: 파일 경로, code/pre, 로그, Git remote, workspace state 값처럼 긴 토큰은 overflow를 막기 위해 별도 긴 토큰 wrapping 규칙을 유지해야 한다.
- `PDA-REQ-058-4`: readiness script와 unit test는 global button rule과 generic button label children에 `overflow-wrap: anywhere`가 재도입되는 것을 막아야 한다.
- `PDA-REQ-058-5`: 브라우저 QA는 mobile viewport에서 버튼 target size, horizontal overflow, visible button text wrapping policy를 확인해야 한다.

## 비범위

- 전체 component design-system 추출은 이번 slice에서 하지 않는다.
- 특정 화면별 문구 축약/copywriting은 이번 slice에서 하지 않는다.
