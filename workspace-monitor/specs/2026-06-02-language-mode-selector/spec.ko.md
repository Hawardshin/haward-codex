# 스펙: Workspace Monitor Language Mode Selector

## 요구사항

- `REQ-WS-072`
- `REQ-WM-015`

## 목표

Workspace Monitor가 플랫폼의 `language-mode-registry.json`을 읽어 전체, 한국어만, 영어만 문서 보기 모드를 선택할 수 있게 한다.

## 범위

- snapshot에 `languageModeCatalog` 추가
- 문서와 히스토리에 기존 `language` 태그를 유지하고 언어 모드 필터로 사용
- toolbar에 language mode selector 추가
- 문서, 히스토리, 최근 히스토리, metric count에 동일한 언어 렌즈 적용
- language mode를 view mode, work mode, install mode, source code language filter와 분리

## 비범위

- 문서 번역
- route-level i18n
- 인증/권한/보안 redaction
- source code programming language filter 변경
