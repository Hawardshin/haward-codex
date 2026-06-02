# 계획 기록: Language Mode Selector

## 요청

- ID: `UR-2026-06-02-032`
- 요약: Workspace Monitor와 플랫폼 문서 표시에서 한국어만 보기, 영어만 보기, 전체 보기 모드를 추가한다.

## 모드 선택

- 선택 모드: `governance`
- 이유: 공유 설정, memory bootstrap, persistent instruction, 요구사항 baseline, monitor snapshot/UI를 함께 바꾸는 durable platform behavior다.

## 근거

- Next.js 공식 i18n 문서: route-level locale은 가능하지만 현재 요청은 URL routing이 아니라 repository snapshot data filtering이다.
- Next.js static export 공식 문서: static monitor 구조에서는 서버/요청 의존 기능보다 collector-generated data lens가 단순하다.
- W3C BCP 47 설명: 문서 언어 id는 `ko`, `en` 같은 표준 primary tag로 관리한다.
- 기존 collector: `.ko.md`, `.en.md`, `.ko.json`, `.en.json` language detection이 이미 존재한다.

## 실행 계획

1. `language-mode-registry.json`을 self-documenting shared config로 추가한다.
2. Workspace Monitor snapshot에 `languageModeCatalog`를 포함한다.
3. UI toolbar에 언어 selector를 추가한다.
4. 문서, 히스토리, 최근 히스토리, metric count에 같은 필터를 적용한다.
5. 요구사항, 스펙, persistent instruction, memory bootstrap, README를 갱신한다.
6. config contract, memory bootstrap, collector test, type check, build, local smoke check를 실행한다.

## 결정

- 기본 모드: `all`
- 모드 ID: `all`, `ko`, `en`
- 단일 언어 모드의 `unknown` 문서: 숨김
- 보안 해석: 표시 렌즈일 뿐 redaction 또는 authorization 아님
