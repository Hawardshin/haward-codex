# 스펙: 전체 워크스페이스 완성도 감사

## 목적

전체 레포지토리에서 미완 작업, 모순, false positive 감사 실패, 오래된 검증 범위를 찾아 고치고, 이후에도 반복 가능한 health gate로 남긴다.

## 요구사항

- `REQ-WS-075`를 따른다.
- `_private/` 내부는 직접 읽거나 인덱싱하지 않는다.
- 기존 audit/test/build를 우선 실행해 실제 실패를 근거로 수정한다.
- health gate는 최신 핵심 설정, privacy audit, browser validation, desktop readiness, frontend build까지 포함한다.
- 문서에서 계획 섹션이 미완처럼 보이지 않도록 heading을 정리한다.

## 비범위

- 실제 secret manager 설치
- 대규모 폴더 이동
- 제품 기능 추가
