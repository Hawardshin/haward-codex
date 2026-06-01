# Workspace Monitor 히스토리/구조 UI 웹 검색 기록

## 검색 정보

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-015`
- 작업 모드: `standard`
- 목적: 히스토리를 날짜별로 모으고 웹에서 보여주는 방식과 정적 Next.js monitor 구현 근거 확인

## 검색 쿼리

- `documentation site changelog history timeline date archive UI best practices`
- `Next.js static site markdown documents timeline search filter best practices`
- `information architecture history archive date-based navigation documentation website`
- `Next.js static exports official docs App Router static export`
- `Next.js App Router data fetching static JSON import official docs`
- `React official docs conditional rendering lists rendering`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://nextjs.org/docs/app/guides/static-exports | official docs | `next build` 기반 static export와 정적 hosting 가능성 | 기존 `output: "export"` 유지, snapshot 기반 UI 확장 |
| https://react.dev/learn/rendering-lists | official docs | 배열 데이터를 `map()`/`filter()`로 렌더링하는 패턴 | 날짜별 history list와 folder structure list 렌더링 |
| https://react.dev/learn/conditional-rendering | official docs | 조건부 UI 렌더링 | 비어 있는 history filter 결과와 섹션별 렌더링 |
| https://diataxis.fr/ | documentation framework | 문서 목적별 분리와 탐색 구조 | History와 Structure를 별도 navigation section으로 분리 |

## 약한 출처와 제외

- 일반 블로그의 Next.js markdown search 구현은 이 프로젝트가 이미 자체 static snapshot collector를 가지고 있어 주요 근거로 사용하지 않았다.
- Reddit 논의는 static export caveat 파악에는 참고 가능하지만, 공식 기능 판단 근거로 쓰지 않았다.

## 계획 영향

- 런타임 DB나 API를 추가하지 않고 build-time snapshot을 확장한다.
- `_history` 문서는 `historyDays`로 날짜 index를 만들고 UI에서는 날짜/유형 filter로 탐색한다.
- 폴더 구조는 `_ops/projects/root-structure-policy.json`, `_docs/registry.json`, `_ops/projects/registry.json`을 읽어 `folderStructure`로 만든다.

## 불확실성

- 날짜가 없는 history 문서는 날짜 timeline에 포함되지 않는다.
- snapshot에 포함하는 문서 수 상한은 현재 `1200`으로 늘렸지만, public 배포 전에는 여전히 snapshot 공개 범위 검토가 필요하다.

## 공개 결정 요약

히스토리 웹 표시는 서버 기능을 늘리지 않고 기존 Next.js static export와 snapshot 구조를 유지한다. 사용자는 History 탭에서 날짜별 기록을 보고, Structure 탭에서 폴더 경계와 history source root를 확인한다.
