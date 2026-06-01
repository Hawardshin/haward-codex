# 스펙: View Mode Selection

## 요구사항

- `REQ-WS-061`

## 목표

플랫폼 전반에서 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 `view_mode`로 분리한다. 이 모드는 화면과 운영 렌즈이며, 설치 범위(`install_mode`)나 작업 평가 강도(`work_mode`)를 대체하지 않는다.

## 범위

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- CLI: `check-view-modes`, `list-view-modes`, `show-view-mode`
- `view-mode-router-agent` 설정과 문서
- 정책, 워크플로, 프롬프트, 메모리 부트스트랩 연결

## 비범위

- 실제 로그인, 인증, 서버-side authorization
- public snapshot redaction 구현
- multi-user permission model 완성

## 설계 결정

- 모드 ID는 `user`, `developer`, `superadmin_developer`만 허용한다.
- 현재 기본값은 `superadmin_developer`다.
- 보안 해석은 명확히 제한한다. UI 숨김은 보안 경계가 아니며, 향후 public/multi-user 배포는 snapshot collector나 server authz에서 강제해야 한다.
