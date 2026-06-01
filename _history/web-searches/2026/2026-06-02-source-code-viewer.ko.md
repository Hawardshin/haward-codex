# Source Code Viewer 웹 검색 기록

## 요청

사용자가 설치형/모니터링 프로그램에서 소스 코드도 볼 수 있게 하라고 요청했다.

## 검색 시각

- 2026-06-02

## 검색어

- `Next.js official documentation static files read local file system build time Node fs`
- `React official documentation rendering lists and conditional rendering code blocks`
- `Shiki official documentation syntax highlighting code blocks`
- `Monaco Editor official documentation browser code editor read only`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Node.js File system docs | 공식 문서 | build-time collector가 파일을 읽고 stat 정보를 얻는 데 `fs` API를 사용할 수 있다. | `collectSourceFiles`를 Node script에 구현 |
| Next.js Static Exports docs | 공식 문서 | 정적 export 기반 UI에서는 build-time/generated data를 포함하는 방식이 현재 구조와 맞다. | snapshot에 `sourceFiles`를 넣고 정적 UI에서 표시 |
| Shiki install docs | 공식 문서 | syntax highlighting dependency 후보로 확인했다. | 지금은 dependency를 추가하지 않고 후속 후보로 보류 |
| Monaco Editor docs | 공식 문서 | 브라우저 코드 편집/뷰어 후보로 확인했다. | 현재 요구는 보기이므로 비범위로 보류 |

## 계획 반영

- 의존성 없는 `<pre><code>` 읽기 전용 뷰어를 먼저 구현한다.
- source root를 `src`, `tests`, `app`, `components`, `lib`, `scripts`, `_tools/*/src|tests|scripts`로 제한한다.
- generated snapshot, build output, dependency 폴더, 큰 파일은 수집하지 않는다.
- `source` 섹션은 developer와 superadmin 개발 보기에만 노출한다.
- public 배포 전에는 `sourceFiles` snapshot 범위를 검토해야 한다.

## 불확실성

- 고급 syntax highlighting, symbol navigation, search index, diff viewer는 구현하지 않았다.
- 실제 desktop shell에서는 파일 열기/편집과 OS 권한 모델을 별도로 설계해야 한다.
