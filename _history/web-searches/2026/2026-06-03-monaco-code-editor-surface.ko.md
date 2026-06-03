# 2026-06-03 Monaco 코드 편집 surface 웹 검색 기록

## 요청 요약

코드 복사와 코드 편집 기능이 결국 필요하므로, VS Code가 오픈소스인 점을 고려해 VS Code 또는 다른 오픈소스 코드 편집 기능을 설치/적용한다.

## 검색어

- `Monaco Editor GitHub license MIT VS Code editor component official`
- `Visual Studio Code source code license Code OSS MIT official GitHub`
- `@monaco-editor/react npm Monaco Editor React official GitHub license`
- `CodeMirror 6 license official GitHub`

## 확인한 출처

- VS Code GitHub repository: `Code - OSS` source는 MIT license이고, Visual Studio Code 제품 배포판은 Microsoft product license와 별도라는 점을 확인했다.
- VS Code license page와 repository/product 차이 문서: 제품 배포판에는 Microsoft-specific customization, marketplace, telemetry, trademark 요소가 있으므로 앱에 그대로 설치/복제하는 방식은 이번 목적에 비해 과하다.
- Monaco Editor GitHub repository: Monaco는 VS Code의 fully featured code editor이고 MIT license이며, browser 기반 editor로 제공된다.
- `@monaco-editor/react` GitHub repository: React 19를 지원하고 Next.js 같은 React 환경에서 Monaco를 쉽게 붙이는 wrapper이며 MIT license다.
- CodeMirror 6 관련 검색: MIT 계열의 가벼운 대안이지만, 사용자가 VS Code 계열 기능을 직접 언급했으므로 이번 선택지는 Monaco가 더 적합하다.

## 약한 출처 또는 제외한 출처

- Reddit/일반 블로그는 발견 신호로만 취급하고 구현 근거로 쓰지 않았다.
- Visual Studio Code 제품 바이너리 설치는 trademark/product license/telemetry/marketplace 경계 때문에 이번 앱 내 편집기 구현 근거로 채택하지 않았다.

## 계획 반영

- 새 OSS 앱을 클론하지 않고, 이미 workspace dependency에 있는 `@monaco-editor/react`와 `monaco-editor`를 실제 desktop runtime editor에 연결한다.
- Tauri의 `read_workspace_text_file`/`write_workspace_text_file` 명령과 기존 backup save gate는 유지한다.
- `<textarea>` 기반 scoped editor를 Monaco 기반 다중 파일 editor로 바꾸고, copy current draft 기능을 추가한다.

## 불확실성

- Monaco worker는 브라우저/Next bundling과 상호작용하므로 `pnpm build`와 실제 Browser 렌더링으로 확인해야 한다.
