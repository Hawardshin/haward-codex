# 스펙: Workspace Monitor View Mode Selector

## 요구사항

- `REQ-WM-011`
- `REQ-WS-061`

## 목표

Workspace Monitor가 플랫폼의 `view-mode-registry.json`을 읽어 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 선택할 수 있게 한다.

## 범위

- snapshot에 `viewModeCatalog` 추가
- 상단 view mode selector 추가
- 선택 모드에 따른 섹션과 문서 필터링
- 슈퍼어드민 개발 모드를 기본값으로 유지

## 비범위

- 인증, 로그인, 사용자 계정
- 서버 권한 강제
- public snapshot redaction 완성
