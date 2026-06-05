# 웹 검색 기록: 소스 워크벤치 컨트롤 프리미티브

- 날짜: 2026-06-05
- 작업: Workspace Monitor 소스 작업 화면의 네이티브 파일 선택 드롭다운과 기본 버튼 느낌 제거

## 검색

- `Radix UI Dropdown Menu React docs DropdownMenu.Trigger Content Item official`
- `MDN HTML select element styling customizable select limitations`

## 확인한 출처

- Radix UI Dropdown Menu 공식 문서: `https://www.radix-ui.com/primitives/docs/components/dropdown-menu`
- MDN Customizable select elements: `https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select`
- MDN `<select>` HTML element: `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select`

## 작업 반영

- Radix 공식 문서는 `Trigger`, `Content`, `Item`, 포털 기반 메뉴 구성을 제공하므로 파일 선택기를 `@radix-ui/react-dropdown-menu`로 구현했다.
- MDN은 `<select>`가 기본 옵션 메뉴 역할을 하며, 커스텀 선택 UI가 필요한 경우 별도 스타일/구조가 필요함을 설명한다. 사용자가 지적한 네이티브 드롭다운 느낌을 제거하기 위해 소스 파일 목록에서 native `<select>`를 제거했다.
- 이미 프로젝트에 `Button`, `ActionGroup`, Radix DropdownMenu가 있으므로 새 라이브러리 설치 없이 기존 프리미티브로 통일했다.

## 무시한 약한 출처

- Reddit/블로그 검색 결과는 공식 API와 브라우저 동작 근거로 쓰지 않았다.
