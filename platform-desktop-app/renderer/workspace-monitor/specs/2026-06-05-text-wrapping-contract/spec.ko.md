# Text Wrapping Contract 스펙

## 요구사항

- REQ-WM-069: 문장형 텍스트, 버튼/컨트롤 라벨, 긴 경로/명령/코드 토큰은 공통 줄바꿈 계약을 따라야 한다.

## 사용자 결과

- 한글과 한영 혼합 문장은 좁은 화면에서도 글자 단위로 어색하게 깨지지 않는다.
- 버튼 내부 라벨은 부모 폭을 넘지 않고 ellipsis/줄바꿈 계약 안에서 안정적으로 보인다.
- 경로, 명령, 코드, 긴 식별자는 레이아웃을 가로로 밀지 않고 필요한 지점에서만 잘린다.

## 설계 결정

- 문장형 텍스트에는 `word-break: keep-all`, 자연 줄바꿈용 `overflow-wrap`, `text-wrap: pretty`, 읽기 폭 토큰을 적용한다.
- `code`, `kbd`, `samp`, `.path` 같은 긴 토큰에는 `overflow-wrap: anywhere` 계열과 `word-break: normal`을 적용한다.
- 버튼 자식 텍스트에는 `max-width: 100%`를 명시해 버튼 폭 계산 밖으로 튀지 않게 한다.
- 전역 root에는 CJK 줄바꿈 품질을 위해 `line-break: strict`를 적용한다.

## 비목표

- 모든 개별 컴포넌트 문구 재작성
- 특정 화면의 레이아웃 정보구조 변경
- generated snapshot 내용 정리
- 새 폰트 또는 새 UI 라이브러리 설치
