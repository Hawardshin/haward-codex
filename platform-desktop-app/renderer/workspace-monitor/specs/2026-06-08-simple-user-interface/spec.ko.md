# 스펙: 기본 사용자 인터페이스 단순화

## 요구사항

- `REQ-WM-011`
- `REQ-WM-076`
- `REQ-WS-061`

## 목표

Workspace Monitor의 첫 실행 화면을 사용자 작업 시작 중심으로 바꾸고, 커스텀 에이전트, 툴, 소스, 운영/거버넌스 기능은 developer 또는 `superadmin_developer` 보기에서 명시적으로 선택하게 한다.

## 범위

- `view-mode-registry.json`의 기본 모드를 `user`로 변경한다.
- `user` 보기의 기본 섹션을 `overview`, `desktop`, `eval`로 줄인다.
- 홈 첫 화면에 작업 요청 입력, 자동 시작, 실행 상태, 결과 확인으로 이어지는 단순 작업면을 추가한다.
- 사용자 보기에서는 좌측 레일의 운영 센터 버튼을 숨긴다.
- 기존 developer와 `superadmin_developer` 보기에서는 고급 섹션을 유지한다.
- 요구사항, 정책, 스펙, 검증 기준을 새 기본값과 맞춘다.

## 비범위

- 실제 인증/인가 구현
- public snapshot redaction 완성
- 기존 고급 기능 삭제
- 새 CLI 어댑터 설치

## 설계 결정

- 기본 사용자 화면은 새 landing page가 아니라 실제 작업 입력과 실행 버튼을 첫 표면에 둔다.
- 자동 시작은 기존 `RuntimeLaunchRequest`와 `DesktopRuntimePanel` 실행 경로를 재사용한다.
- 사용자 보기의 고급 기능 숨김은 보안 경계가 아니며, 접근 제어는 별도 future work로 남긴다.
