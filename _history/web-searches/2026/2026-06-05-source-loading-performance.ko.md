# 웹 검색 기록: Source Loading Performance

## 사용자 지시 요약

사용자는 코드 불러오는 쪽이 다시 너무 느리다고 지적하고 해결을 요청했다.

## 검색어

- `React large file viewer performance virtualized list code editor lazy loading best practices`
- `Monaco editor large file performance load model lazy syntax highlighting`
- `web.dev virtualize large lists react-window official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| web.dev, Virtualize large lists with react-window, https://web.dev/articles/virtualize-long-lists-react-window | Google web performance guidance | 긴 리스트는 화면에 보이는 항목 중심으로 렌더링하는 windowing/virtualization 접근이 필요하다. | Source file list의 중복 렌더와 전체 기본 전개를 줄였다. |
| Monaco Editor API, `largeFileOptimizations`, https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IGlobalEditorOptions.html | API documentation | Monaco는 large file optimization 옵션을 제공하며 큰 파일에서는 editor 기능 비용을 의식해야 한다. | editor 자체보다 먼저 catalog/list 렌더 병목을 줄였고, 기존 Monaco lazy dynamic import는 유지했다. |

## 제외한 약한 출처

- 일반 블로그와 Reddit 결과는 discovery signal로만 보고 직접 근거로 쓰지 않았다.

## 계획 영향

- source catalog scan은 필요한 화면에서만 실행한다.
- 파일 목록은 중복 DOM으로 만들지 않는다.
- tree는 필요한 단계만 펼쳐 렌더링한다.

## 불확실성

- 실제 사용자 기기에서의 네이티브 Tauri source scan 시간은 측정하지 못했다. 이번 변경은 명확한 프런트 렌더/스캔 타이밍 병목을 제거하는 slice다.
