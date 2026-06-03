# 웹 검색 기록: 플랫폼 소스 에디터 커스터마이징

## 검색 목적

데스크톱 source editor를 우리 플랫폼 작업에 맞게 커스터마이징하기 전에 기존 Monaco 기반을 유지해도 되는지, theme/options/action 계열 API가 공식적으로 제공되는지 확인했다.

## 검색 일시

- 날짜: 2026-06-03
- 작업 모드: `ship_first`

## 검색 쿼리

- `Monaco Editor custom theme actions snippets API official docs`
- `Monaco Editor addAction insert text getModel official docs`
- `Monaco Editor IStandaloneEditorConstructionOptions official docs`
- `Monaco Editor options defineTheme @monaco-editor/react beforeMount official`
- `Monaco Editor GitHub actions snippets API editor official`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Microsoft Monaco Editor GitHub, https://github.com/microsoft/monaco-editor | 공식 저장소 | Monaco는 browser-based code editor이며 public API는 `monaco.d.ts`를 기준으로 versioned된다. | VS Code 전체 제품 클론 대신 기존 Monaco dependency를 유지하는 결정을 재확인했다. |
| Monaco Editor API, https://microsoft.github.io/monaco-editor/typedoc/ | 공식 API 문서 | editor options, command/action, theme 관련 API가 제공된다. | `IStandaloneEditorConstructionOptions`, `defineTheme`, editor selection 기반 insertion에 맞춰 구현했다. |
| Monaco Editor API `EditorOptions`, https://microsoft.github.io/monaco-editor/typedoc/variables/editor_editor_api.editor.EditorOptions.html | 공식 API 문서 | bracket pair, copy, guides, rulers, sticky scroll 등 editor option을 구성할 수 있다. | 데스크톱 workbench 옵션에 bracket guide, ruler, sticky scroll, syntax copy를 추가했다. |

## 약한 출처와 제외

- Stack Overflow와 Reddit 사례는 발견했지만, 이번 구현의 근거로는 공식 Monaco GitHub/API 문서만 사용했다.
- `react-monaco-editor` 저장소는 현재 dependency인 `@monaco-editor/react`와 다르므로 핵심 근거로 삼지 않았다.

## 계획 영향

- 새 오픈소스 앱을 클론하거나 전역 설치하지 않고, 이미 설치된 `monaco-editor`와 `@monaco-editor/react`를 플랫폼에 맞게 커스터마이징한다.
- 기능은 VS Code 전체 임베드가 아니라 템플릿 삽입, 경로 기반 프로필, 패치 컨텍스트 복사, workbench theme/options로 좁힌다.

## 불확실성

- 언어 서버, Git staging, extension host 수준의 VS Code 기능은 이번 범위에 포함하지 않았다. 다음 제품 slice에서 필요하면 별도 아키텍처 비교가 필요하다.
