# User Request: CLI Adapter Test Fix

## 요약

사용자는 붙여넣은 파일에 담긴 실패 로그를 읽고 조치해 달라고 요청했다.

## 해석한 요구

- `platform-desktop-app`의 internal package pipeline 실패를 재현 가능한 테스트 실패로 해석한다.
- 실패한 `tool-studio.test.mjs` assertion을 현재 소스 계약에 맞게 수정한다.
- 수정 후 관련 테스트와 owning package pipeline을 검증한다.

## 소유 프로젝트

- `platform-desktop-app`
