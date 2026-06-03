# Web Search: Theme, Terminal Overlay, Code Folding UX

## 검색 시각

- 2026-06-03 KST

## Queries

- `MDN color-scheme CSS dark mode form controls background official`
- `MDN CSS custom properties dark theme prefers-color-scheme official`
- `Monaco Editor folding actions official documentation`
- `CodeMirror code folding official documentation`
- `Monaco Editor API IStandaloneCodeEditor getAction foldAll official`
- `Monaco Editor options folding official API IStandaloneEditorConstructionOptions`

## 확인한 강한 출처

- MDN `color-scheme`: `https://developer.mozilla.org/docs/Web/CSS/color-scheme`
- MDN `prefers-color-scheme`: `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme`
- Monaco Editor API `IStandaloneEditorConstructionOptions`: `https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor_editor_api.editor.IStandaloneEditorConstructionOptions.html`
- CodeMirror reference manual: `https://codemirror.com/docs/ref/`

## 계획 영향

- 다크/라이트 대응은 browser/OS 색 구성과 component token을 모두 고려해야 하므로 `color-scheme`과 theme custom properties를 함께 유지한다.
- 프로젝트는 이미 Monaco를 사용하므로 CodeMirror를 새로 도입하지 않고 Monaco editor action과 folding option surface를 활용한다.
- 터미널 overlay는 library research보다 현재 desktop workbench 구조와 사용자 피드백을 기준으로 구현한다.

## 약한 출처 처리

- 일반 블로그, Reddit, 비공식 Monaco mirror 문서는 계획 근거로 쓰지 않았다.
- CodeMirror는 대체 editor option 확인 용도였고, 구현 근거는 현재 프로젝트의 Monaco 구조를 우선했다.
